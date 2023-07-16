/* 
    Data Store 
*/

const fs = require('fs').promises;

const db = require('../db/db.config');

const recipes = {};

recipes.add = async(obj) => {

    try {

        let newRecipe = {
            name: obj.name,
            chef: obj.chef,
            preptime: parseInt(obj.preptime),
            type: obj.type.toLowerCase(),
            preplist: obj.preplist,
            steps: obj.steps
        }

        let addedRecipe = await db.Recipe.create(newRecipe);

        return { code: 201, msg: "Item added", _id: addedRecipe._id};
        
    } catch (error) {
        
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
    
            await db.Img.create(newImg);

            await db.Recipe.updateOne({ _id: obj.idx }, 
                { "img":`https://ninjachefs-api.dhruv.tech/api/v1/recipes/thumbnails/${obj.idx}`});

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