/* 
    Service for adding, deleting & viewing recipes.
*/

const db = require('../config/db.config');
const ai = require('../utils/ai');

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

recipes.addThumbnail = async(obj) => {

    return new Promise(async(resolve) => {
        try {

            let newImg = {
                recipeId: obj.idx,
                thumbnail: Buffer.from(obj.img, "base64"),
                format: obj.format
            }
    
            const imageUpload = new FormData();

            

            resolve({code: 201, url: `https://ninjachefs-api.dhruv.tech/api/v1/recipes/thumbnails/${obj.idx}`});
            
        } catch (error) {
            
            console.log(error);
            resolve({ code: 500, msg: "Could not add image"});
    
        }
    })

}

recipes.getThumbnail = async(idx) => {

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

recipes.delete = async(idx) => {

    try {

        await db.Recipe.deleteOne({ _id: idx });

        let thumbnailStatus = '';
        try {
            await db.Img.deleteOne({ recipeId: idx });
            thumbnailStatus = 'Thumbnail was also deleted.'
        } catch {
            thumbnailStatus = 'Thumbnail was not found for this item.'
        }
        return {code: 200, msg: `Deleted item with _id ${idx}. ${thumbnailStatus}`};

    } catch (error) {

        console.log(error);
        
        return { code: 404, msg: "Could not delete item, please check the _id"};

    }

}

module.exports = recipes;