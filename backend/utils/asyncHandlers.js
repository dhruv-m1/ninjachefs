/*
 * Utility for realtime data processing after a HTTP response is served.
 */

import ai from "./ai.js";
import db from "../config/db.config.js";
import helpers from "./helpers.js";
import axios from "axios";

const asyncHandlers = {}

asyncHandlers.addRecipe = async(stepsString, obj, retries = 0) => {

    try {

        let unprocessedData = `Recipe Name: ${obj.name}, Author: ${obj.author}, Steps: ${stepsString}`;
        unprocessedData = unprocessedData.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

        let promptTemplate = process.env.ADDRECIPE_INGREDIENTS_PROMPT;
        let prompt = JSON.parse(promptTemplate.replace('_RECIPE_DATA_', unprocessedData.replace()));

        let ingredients = await ai.gpt(prompt);

        await helpers.validateIngredients(ingredients);
        let santisedIngredients = await helpers.sanitiseIngredients(ingredients, obj.steps);

        if (!santisedIngredients.valid) throw new Error("Invalid Ingredients.")

        await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
            stage: "Analysing recipe & writing metadata..."
        });

        let ingredientString = '';
        santisedIngredients.list.forEach((ingredient, i) => ingredientString += `(${i+1}) ${ingredient.name} `);
        
        unprocessedData = `Recipe Name: ${obj.name}, Author: ${obj.author}, Ingredients: ${ingredientString} Steps: ${stepsString}`;
        unprocessedData = unprocessedData.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

        promptTemplate = process.env.ADDRECIPE_METADATA_PROMPT;
        prompt = JSON.parse(promptTemplate.replace('_RECIPE_DATA_', unprocessedData));
    
        let newRecipe = await ai.gpt(prompt);
        
        newRecipe.ingredients = santisedIngredients.list;
        newRecipe.diet = helpers.getRecipeDietType(newRecipe.ingredients);

        if (!helpers.isRecipeOutputValid(newRecipe)) throw new Error("Validation Failed.");

        newRecipe.name = obj.name;
        newRecipe.author = obj.author;
        newRecipe.cooking_time = obj.cookingTime;
        newRecipe.steps = obj.steps;
        newRecipe.userId = obj.userId;

        if (!obj.generateImage) {

            const submissionData = await db.PendingSubmission.findOne({_id: obj.submission_id});
            newRecipe.img_url = submissionData.img_url;

            const submittedRecipe = await db.Recipe.create(newRecipe);
            await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
                stage: "Done - Recipe analysis & writing metadata.",
                is_pending: false,
                success: true,
                recipeId: submittedRecipe._id
            });

            return;

        }

        await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
            stage: "Visualising recipe & generating image..."
        });

        asyncHandlers.generateRecipeImage(newRecipe, obj);

    } catch (error) {


        console.log(error)

        if (retries < 1) {

            asyncHandlers.addRecipe(stepsString, obj, retries+1);
            return;

        }

        await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
            stage: "Error during recipe analysis.",
            is_pending: false,
            success: false,
            log: error
        });
    }

}

asyncHandlers.generateRecipeImage = async(newRecipe, obj) => {
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
        await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
            stage: "Done - Visualising recipe & generating image...",
            is_pending: false,
            success: true,
            recipeId: submittedRecipe._id
        });

    } catch (error) {
        await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
            stage: "Processed without image generation",
            is_pending: false,
            success: true,
            log: error,
            recipeId: submittedRecipe._id
        });
    }
}

asyncHandlers.updateRecipeInsights = async(stepsString, obj, retries = 0) => {

    try {

        let unprocessedData = `Recipe Name: ${obj.name}, Author: ${obj.author}, Steps: ${stepsString}`;
        unprocessedData = unprocessedData.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

        let promptTemplate = process.env.ADDRECIPE_INSIGHTS_ONLY_PROMPT;
        let prompt = JSON.parse(promptTemplate.replace('_RECIPE_DATA_', unprocessedData));
    
        let updatedInsights = await ai.gpt(prompt);

        if (!helpers.isRecipeOutputValid(updatedInsights, 'insights')) throw new Error("Validation Failed.");

        console.log(updatedInsights);
        console.log(obj._id)
        await db.Recipe.findOneAndUpdate({_id: obj._id}, {
            allergies: updatedInsights.allergies,
            health_reason: updatedInsights.health_reason,
            health_score: updatedInsights.health_score
        });

    } catch (error) {

        console.log(error)

        if (retries < 1) {

            asyncHandlers.updateRecipeInsights(stepsString, obj, retries+1);
            return;

        }
    }

}

export default asyncHandlers;