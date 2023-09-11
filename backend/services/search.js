/* 
    Service for searching.
    This is segregated from recipe service as it will be used to search for author profiles as well in the future.
*/

import db from '../config/db.config.js';

const search = {};

search.query = async(keywords, filters = {}, skip, limit) => {

    try {

        let querySpec = [
            {
                $search: { index: "searchRecipes", count: { type: "total" }, text: { query: keywords, path: ['name', 'author', 'diet'], fuzzy: {} }},
            },
            { 
                $skip : parseInt(skip)
            },
            {
                $limit : parseInt(limit)
            },
            {
                $project: { name: true, author: true, diet: true, img_url: true, meta: "$$SEARCH_META" }
            }
        ]

        console.log(querySpec)

        let recipeData = []
        recipeData = await db.Recipe.aggregate([querySpec]);

        console.log(recipeData)

        return {code: 200, data: recipeData};

    } catch (error) {
        console.log(error)
        return { code: 500, msg: "Could not retrive data from data store"};

    }

}

export default search;