/* 
    Service for adding, deleting & viewing recipes.
*/

const db = require('../config/db.config');
const ai = require('../utils/ai');
const fetch = require('node-fetch');
const recipes = {};

recipes.add = async(obj) => {

    try {

        let stepsString = '';
        obj.steps.forEach((step, i) => stepsString += `[STEP ${i+1}] ${step} `);

        const unprocessedData = `Recipe Name: ${obj.name}, Author: ${obj.author}, Steps: ${stepsString}`;
        const promptTemplate = process.env.ADDRECIPE_GPT_PROMPTS;
        const prompt = JSON.parse(promptTemplate.replace('_RECIPE_DATA_', unprocessedData));

        let newRecipe = await ai.gpt(prompt);

        newRecipe.name = obj.name;
        newRecipe.author = obj.author;
        newRecipe.cookingTime = obj.cookingTime;
        newRecipe.steps = obj.steps;

        if (newRecipe.meat.length == 0 && newRecipe.dairy.length == 0) {
            newRecipe.diet = "Vegan";
        } else if (newRecipe.meat.length == 0) {
            newRecipe.diet = "Vegetarian";
        } else {
            newRecipe.diet = "Non-Vegetarian";
        }

        const addedRecipe = await db.Recipe.create(newRecipe);

        //console.log(addedRecipe);

        return { code: 201, msg: "Item added", _id: addedRecipe._id};
        
    } catch (error) {
        console.log(error)
        return { code: 500, msg: "Could not add item"};

    }

}

recipes.addImage = async(obj) => {

    return new Promise(async(resolve) => {
        try {

            let newPendingSubmission = {
                img_url: `https://imagedelivery.net/CwcWai9Vz5sYV9GCN-o2Vg/${obj.destination}`,
                is_published: false
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
        if (args['idx']) recipeData = await db.Recipe.findOne({ _id: args['idx'] });
        else recipeData = await db.Recipe.find().select('_id name preptime chef type img');

        return {code: 200, data: recipeData};

    } catch (error) {
        
        return { code: 500, msg: "Could not retrive data from data store"};

    }
    
}

recipes.delete = async(idx, image_id) => {

    try {

        await db.Recipe.deleteOne({ _id: idx });

        try {
            const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/${image_id}`;

            const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'X-Auth-Email': ''}
            };

            await fetch(url, options).then(res => res.json())

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