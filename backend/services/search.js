/* 
    Service for searching recipes.
*/

const db = require('../config/db.config');

const search = {};

search.query = async(keywords, filters = {}, skip, limit) => {

    try {

        let querySpec = {
            $search: { index: "searchRecipes", text: { query: keywords, path: ['name', 'author', 'diet'], fuzzy: {} } },
        }

        if (filters.diet) querySpec.diet = filters.diet;

        let recipeData = []
        recipeData = await db.Recipe.find(querySpec, ['name', 'img_url', 'author', 'diet'], { skip: skip, limit: limit });

        return {code: 200, data: recipeData};

    } catch (error) {
        console.log(error)
        return { code: 500, msg: "Could not retrive data from data store"};

    }

}

module.exports = search;