/*
 * Utility for realtime data processing after a HTTP response is served.
 */

const ai = require("./ai");
const db = require("../config/db.config");

const axios = require("axios").default;

const asyncHandlers = {}

asyncHandlers.addRecipe = async(unprocessedData, obj) => {

    try {

        const promptTemplate = obj.generateImage ? process.env.ADDRECIPE_GPT_PROMPTS_3 : process.env.ADDRECIPE_GPT_PROMPTS_2;
        const prompt = JSON.parse(promptTemplate.replace('_RECIPE_DATA_', unprocessedData));
    
        let newRecipe = await ai.gpt(prompt);
    
        newRecipe.name = obj.name;
        newRecipe.author = obj.author;
        newRecipe.cooking_time = obj.cookingTime;
        newRecipe.steps = obj.steps;
    
        let ingredients = newRecipe.ingredients;

        if (ingredients.meat.length == 0 && ingredients.dairy.length == 0) {
            newRecipe.diet = "Vegan";
        } else if (ingredients.meat.length == 0) {
            newRecipe.diet = "Vegetarian";
        } else {
            newRecipe.diet = "Non-Vegetarian";
        }

        if (!obj.generateImage) {
            const submissionData = await db.PendingSubmission.findOne({_id: obj.submission_id});
            newRecipe.img_url = submissionData.img_url;

            const submittedRecipe = await db.Recipe.create(newRecipe);
            await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
                stage: "AI Assisted Recipe Analysis",
                is_pending: false,
                success: true,
                recipeId: submittedRecipe._id
            });
        } else {
            asyncHandlers.generateRecipeImage(newRecipe, obj);
        }

    } catch (error) {
        console.log(error)
        await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
            stage: "AI Assisted Recipe Analysis",
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
            stage: "Image Generation",
            is_pending: false,
            success: true,
            recipeId: submittedRecipe._id
        });

    } catch (error) {
        await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {
            stage: "Processed without Image Generation",
            is_pending: false,
            success: true,
            log: error,
            recipeId: submittedRecipe._id
        });
    }
}

module.exports = asyncHandlers;