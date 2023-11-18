/* 
    Service for adding, deleting & viewing recipes.
*/

import db from '../config/db.config.js';
import ai from '../utils/ai.js';
import asyncHandlers from '../utils/asyncHandlers.js'
import axios from 'axios';
import helpers from '../utils/helpers.js';
const recipes = {};

recipes.add = async(obj) => {

    return new Promise(async(resolve) => {

        try {
            
            // Preparing Prompt

            let stepsString = '';
            obj.steps.forEach((step, i) => stepsString += `[STEP ${i+1}] ${step} `);
    
            let unprocessedData = `Recipe Name: ${obj.name}, Author: ${obj.author}, Steps: ${stepsString}`;
            unprocessedData = unprocessedData.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
            let promptTemplate = process.env.ADDRECIPE_SPAM_PROMPT;
            let prompt = JSON.parse(promptTemplate.replace('_RECIPE_DATA_', unprocessedData));
    
            // Spam Analysis

            const spamAnalysis = await ai.gpt(prompt);
            
            console.log(spamAnalysis);

            if (spamAnalysis.spam_score >= 5) {
                resolve({ code: 200, spam: true, msg: `${spamAnalysis.score_reason}`});
                return;
            }

            // Initiating background processing chain, if submission is not spam.

            if (obj.submission_id) { // Submission ID already exists (when user has submitted a cover image)

                await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {stage: "Identifying & sorting ingredients..."});
                obj.generateImage = false;

            } else { // No Submission ID; cover image also needs to be generated
                
                let newPendingSubmission = {
                    is_pending: true,
                    success: true,
                    stage: "Identifying & sorting ingredients..."
                }

                const submission = await db.PendingSubmission.create(newPendingSubmission);

                obj.submission_id = submission._id;
                obj.generateImage = true;

            }

            asyncHandlers.addRecipe(stepsString, obj);

            resolve({code: 200, msg: "Submission sent for further processing.", submission_id: obj.submission_id})
            
        } catch (error) {
            console.log(error)
            return { code: 500, msg: "Could not add item"};
    
        }

    })

}

recipes.addImage = async(obj) => {

    return new Promise(async(resolve) => {
        try {

            let newPendingSubmission = {
                img_url: `https://imagedelivery.net/CwcWai9Vz5sYV9GCN-o2Vg/${obj.destination}`,
                is_pending: true,
                success: true,
                stage: "Image Uploaded by User"
            }
            
            const submission = await db.PendingSubmission.create(newPendingSubmission);

            resolve({code: 201, submission_id: submission._id});
            
        } catch (error) {
            
            console.log(error);
            resolve({ code: 500, msg: "Could not create submission."});
    
        }
    })

}

recipes.update = async(obj) => {

    return new Promise(async(resolve) => {

        try {

            // fetch old recipe data

            const oldRecipe = await db.Recipe.findOne({_id: obj._id});

            // check if recipe belongs to user

            if (oldRecipe.userId !== obj.userId) throw new Error("401");
            
            // Preparing Prompt

            let stepsString = '';
            obj.steps.forEach((step, i) => stepsString += `[STEP ${i+1}] ${step} `);
    
            let unprocessedData = `Recipe Name: ${obj.name}, Author: ${obj.author}, Steps: ${stepsString}`;
            unprocessedData = unprocessedData.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

            let promptTemplate = process.env.ADDRECIPE_SPAM_PROMPT;
            let prompt = JSON.parse(promptTemplate.replace('_RECIPE_DATA_', unprocessedData));
    
            // Spam Analysis

            const spamAnalysis = await ai.gpt(prompt);
            
            console.log(spamAnalysis);

            if (spamAnalysis.spam_score >= 5) {
                resolve({ code: 200, spam: true, msg: `${spamAnalysis.score_reason}`});
                return;
            }

            // use helper to validate and sanitise ingredients

            let areIngredientsValid = await helpers.validateIngredients(obj.ingredients, obj.steps);

            if (!areIngredientsValid) throw new Error("Validation Failed.");

            // use helper to get diet type

            obj.diet = helpers.getRecipeDietType(obj.ingredients);

            // use helper to validate recipe output

            if (!helpers.isRecipeOutputValid(obj)) throw new Error("Validation Failed.");

            // update steps, ingredients, name, desc, intro, cooking_time

            await db.Recipe.findOneAndUpdate({_id: obj._id}, {
                steps: obj.steps,
                ingredients: obj.ingredients,
                name: obj.name,
                desc: obj.desc,
                intro: obj.intro,
                cooking_time: obj.cookingTime
            });

            // compare old recipe data with new recipe data

            let areStepsChanged = oldRecipe.steps.toString() !== obj.steps.toString();
            let areIngredientsChanged = oldRecipe.ingredients.toString() !== obj.ingredients.toString();

            // Initiating background processing chain to update insights, if steps or ingredients have changed.

            if (areStepsChanged || areIngredientsChanged) {

                asyncHandlers.updateRecipeInsights(stepsString, obj);

            }

            resolve({code: 200, msg: "Edit has been saved."})
            
        } catch (error) {
            console.log(error)

            if (error.message === "401") { 

                resolve({ code: 401, msg: "You are not authorised to edit this recipe."});
                return;
                
            };
            
            resolve({ code: 500, msg: "Could not update recipe"});
    
        }

    })

}

recipes.updateImage = async(obj, idx, userId) => {

    return new Promise(async(resolve) => {
        try {

            const recipe = await db.Recipe.findOne({_id: idx});

            if (recipe.userId !== userId) throw new Error("401");

            await db.Recipe.findOneAndUpdate({_id: idx}, {img_url: `https://imagedelivery.net/CwcWai9Vz5sYV9GCN-o2Vg/${obj.destination}`});

            // Delete old image from cloudflare

            if (!recipe.img_url) return;

            const imgInfo = recipe.img_url.split('/');
            const options = {
                method: 'DELETE',
                url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${imgInfo[4]}`,
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`}
            };

            await axios.request(options);

            resolve({code: 200});
            
        } catch (error) {
            
            console.log(error);

            if (error.message === "401") { 

                resolve({ code: 401, msg: "You are not authorised to edit this recipe."});
                return;

            };

            resolve({ code: 500, msg: "Could not create submission."});
    
        }
    })

}

recipes.get = async(args = {}) => {
    
    try {

        let recipeData = []
        let count = 0;
        let data = {};

        if (args['idx']) { 
            
            recipeData = await db.Recipe.findOne({ _id: args['idx'] });
            data = recipeData

        } else {

            recipeData = await db.Recipe.find()
            .select('_id name author diet img_url desc').sort({_id: -1})
            .skip(args.skip).limit(args.limit);

            count = await db.Recipe.count();
            data = {count: count, recipes: recipeData}

        }

        return {code: 200, data: data};

    } catch (error) {
        
        return { code: 500, msg: "Could not retrive data from data store"};

    }
    
}

recipes.delete = async(idx) => {

    try {

        const recipeData = await db.Recipe.findOne({ _id: idx });

        try {

            // Delete image from cloudflare

            if (!recipeData.img_url) return;

            const imgInfo = recipeData.img_url.split('/');
            const options = {
                method: 'DELETE',
                url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${imgInfo[4]}`,
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`}
            };


            await axios.request(options);

        } catch (e) {
            console.time("RECIPE IMAGE DELETE ERROR")
            console.log(`[> RECIPE IMAGE DELETE ERROR DETAILS] ${e}`)
        }
        
        await db.Recipe.deleteOne({ _id: idx });

        return {code: 200, msg: `Deleted item with _id ${idx}.`};

    } catch (error) {

        console.time("RECIPE DELETE ERROR")
        console.log(`[> RECIPE DELETE ERROR DETAILS] ${error}`)
        
        return { code: 404, msg: "Could not delete item, please try again later."};

    }

}

recipes.getByUser = async({userId, limit, skip}) => {

    try {

        let recipeData = []
        let count = 0;
        let data = {};

        console.log(userId)

        recipeData = await db.Recipe.find({userId: userId})
            .select('_id name author diet img_url desc').sort({_id: -1})
            .skip(skip).limit(limit);

            count = await db.Recipe.find({userId: userId}).count();
            data = {count: count, recipes: recipeData}
            
        return {code: 200, data: data};

    } catch (error) {
        
        return { code: 500, msg: "Could not retrive data from data store"};

    }

}

export default recipes;