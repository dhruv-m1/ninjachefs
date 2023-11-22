/*
 * Utility for realtime data processing after a HTTP response is served.
 */

import { prompts, ai } from "../config/ai.config.js";
import db from "../config/db.config.js";
import helpers from "./helpers.js";
import axios from "axios";

const asyncHandlers = {}

asyncHandlers.addRecipe = async(stepsString, input, retriesCount = 0) => {

    try {

        let unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

        let instructions = [
            prompts.recipeIngredientsArray, 
            prompts.recipeIngredients, 
            prompts.recipeContext(unprocessedData)
        ];

        let ingredients = await ai.gpt(instructions);

        await helpers.validateIngredients(ingredients);
        let santisedIngredients = await helpers.sanitiseIngredients(ingredients, input.steps);

        if (!santisedIngredients.valid) throw new Error("Invalid Ingredients.")

        await db.PendingSubmission.findOneAndUpdate({_id: input.submission_id}, {
            stage: "Analysing recipe & writing metadata..."
        });

        let ingredientString = '';
        santisedIngredients.list.forEach((ingredient, i) => ingredientString += `(${i+1}) ${ingredient.name} `);
        
        unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Ingredients: ${ingredientString} Steps: ${stepsString}`;

        instructions = [
            prompts.recipeObject, 
            prompts.allRecipeMetadata,
            prompts.recipeContext(unprocessedData)
        ];
    
        let newRecipe = await ai.gpt(instructions);
        
        newRecipe.ingredients = santisedIngredients.list;
        newRecipe.diet = helpers.getRecipeDietType(newRecipe.ingredients);

        if (!helpers.isRecipeOutputValid(newRecipe)) throw new Error("Validation Failed.");

        newRecipe.name = input.name;
        newRecipe.author = input.author;
        newRecipe.cooking_time = input.cookingTime;
        newRecipe.steps = input.steps;
        newRecipe.userId = input.userId;

        if (!input.generateImage) {

            const submissionData = await db.PendingSubmission.findOne({_id: input.submission_id});
            newRecipe.img_url = submissionData.img_url;

            const submittedRecipe = await db.Recipe.create(newRecipe);
            await db.PendingSubmission.findOneAndUpdate({_id: input.submission_id}, {
                stage: "Done - Recipe analysis & writing metadata.",
                is_pending: false,
                success: true,
                recipeId: submittedRecipe._id
            });

            return;

        }

        await db.PendingSubmission.findOneAndUpdate({_id: input.submission_id}, {
            stage: "Visualising recipe & generating image..."
        });

        asyncHandlers.generateRecipeImage(newRecipe, input);

    } catch (error) {


        console.log(error)

        if (retriesCount === 0) {

            asyncHandlers.addRecipe(stepsString, input, retriesCount+1);
            return;

        }

        await db.PendingSubmission.findOneAndUpdate({_id: input.submission_id}, {
            stage: "Error during recipe analysis.",
            is_pending: false,
            success: false,
            log: error
        });
    }

}

asyncHandlers.generateRecipeImage = async(newRecipe, input) => {
    try {
        
        const response = await ai.dalle(newRecipe.prompt);

        const {data} = await axios.post(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1`, {
                url: response[0].url
            }, {
                headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`
                }
            }
        )
        
        if (!data.success) throw new Error("CLOUDFLARE IMAGE UPLOAD ERR0R");

        delete newRecipe.prompt;
        newRecipe.img_url = `https://imagedelivery.net/CwcWai9Vz5sYV9GCN-o2Vg/${data.result.id}/`

        const submittedRecipe = await db.Recipe.create(newRecipe);
        await db.PendingSubmission.findOneAndUpdate({_id: input.submission_id}, {
            stage: "Done - Visualising recipe & generating image...",
            is_pending: false,
            success: true,
            recipeId: submittedRecipe._id
        });

    } catch (error) {

        // TODO: improve error handling

        await db.PendingSubmission.findOneAndUpdate({_id: input.submission_id}, {
            stage: "error during image generation",
            is_pending: false,
            success: false,
            log: error,
        });

    }
}

asyncHandlers.updateRecipeInsights = async(stepsString, input, retries = 0) => {

    try {

        let unprocessedData = `Recipe Name: ${input.name}, Author: ${input.author}, Steps: ${stepsString}`;

        let instruction = [
            prompts.recipeObject, 
            prompts.recipeInsightsOnly, 
            prompts.recipeContext(unprocessedData)
        ];
    
        let updatedInsights = await ai.gpt(instruction);

        if (!helpers.isRecipeOutputValid(updatedInsights, 'insights')) throw new Error("Validation Failed.");

        console.log(updatedInsights);
        console.log(input._id)
        await db.Recipe.findOneAndUpdate({_id: input._id}, {
            allergies: updatedInsights.allergies,
            health_reason: updatedInsights.health_reason,
            health_score: updatedInsights.health_score
        });

    } catch (error) {

        console.log(error)

        if (retries < 1) {

            asyncHandlers.updateRecipeInsights(stepsString, input, retries+1);
            return;

        }
    }

}

export default asyncHandlers;