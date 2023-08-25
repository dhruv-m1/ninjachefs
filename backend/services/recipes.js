/* 
    Service for adding, deleting & viewing recipes.
*/

const db = require('../config/db.config');
const ai = require('../utils/ai');
const asyncHandlers = require('../utils/asyncHandlers')
const axios = require("axios").default;

const recipes = {};

recipes.add = async(obj) => {

    return new Promise(async(resolve) => {

        try {
            
            // Preparing Prompt

            let stepsString = '';
            obj.steps.forEach((step, i) => stepsString += `[STEP ${i+1}] ${step} `);
    
            const unprocessedData = `Recipe Name: ${obj.name}, Author: ${obj.author}, Steps: ${stepsString}`;
            let promptTemplate = process.env.ADDRECIPE_GPT_PROMPTS_1;
            let prompt = JSON.parse(promptTemplate.replace('_RECIPE_DATA_', unprocessedData));
    
            // Spam Analysis

            const spamAnalysis = await ai.gpt(prompt);
    
            if (spamAnalysis.spam_score >= 5) {
                resolve({ code: 200, msg: "Submission rejeced by spam filter. Please try again.", _id: addedRecipe._id})
                return;
            }

            // Initiating background processing chain, if submission is not spam.

            if (obj.submission_id) { // Submission ID already exists (when user has submitted a cover image)

                await db.PendingSubmission.findOneAndUpdate({_id: obj.submission_id}, {status_message: "AI Assist is analysing & formatting your recipe."});
                obj.generateImage = false;

            } else { // No Submission ID; cover image also needs to be generated
                
                let newPendingSubmission = {
                    is_pending: true,
                    success: true,
                    stage: "AI Assisted Spam Review"
                }

                const submission = await db.PendingSubmission.create(newPendingSubmission);

                obj.submission_id = submission._id;
                obj.generateImage = true;

            }

            asyncHandlers.addRecipe(unprocessedData, obj);

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
                stage: "User Image Upload"
            }
            
            const submission = await db.PendingSubmission.create(newPendingSubmission);

            resolve({code: 201, submission_id: submission._id});
            
        } catch (error) {
            
            console.log(error);
            resolve({ code: 500, msg: "Could not create submission."});
    
        }
    })

}

recipes.generateImage = async(idx) => {

    return new Promise(async(resolve) => {
        try {
            
            const img = await db.Img.findOne(
                {recipeId: idx}
            )

            resolve({data: img.thumbnail, format: img.format});
            
        } catch (error) {
            
            console.log(error);
            resolve({ code: 500, msg: "Could not get image"});
    
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

recipes.delete = async(idx, image_id) => {

    try {

        await db.Recipe.deleteOne({ _id: idx });

        try {

            const options = {
                method: 'DELETE',
                url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${image_id}`,
                headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`}
            };


            await axios.request(options);

        } catch (e) {
            console.time("RECIPE IMAGE DELETE ERROR")
            console.log(`[> RECIPE IMAGE DELETE ERROR DETAILS] ${e}`)
        }
        
        return {code: 200, msg: `Deleted item with _id ${idx}. ${thumbnailStatus}`};

    } catch (error) {

        console.time("RECIPE DELETE ERROR")
        console.log(`[> RECIPE DELETE ERROR DETAILS] ${e}`)
        
        return { code: 404, msg: "Could not delete item, please try again later."};

    }

}

module.exports = recipes;