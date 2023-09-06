/*
    Helpers for Async Handlers
*/

const helpers = {};

helpers.isRecipeOutputValid = (output) => {

    const schema = [

        {
            prop: "ingredients",
            type: Object
        
        },
        {
            prop: "diet",
            type: String
        
        },
        {
            prop: "allergies",
            type: Array
        },
        {
            prop: "intro",
            type: String
        
        },
        {
            prop: "desc",
            type: String
        
        },
        {
            prop: "health_score",
            type: Number
        
        },
        {
            prop: "health_reason",
            type: String
        
        }
    ]

    for (let schemaItem of schema) {

        if (!Object.hasOwn(output, schemaItem.prop)) return false;

        else if (!typeof(output[schemaItem.prop]) === schemaItem.type) return false;

        else return true;
    }

}

helpers.validateAndSanitiseIngredients = async(ingredients, steps) => {

    return new Promise (resolve => {

        const lists = ['veggies', 'dairy', 'meat', 'other'];

        console.log(ingredients);

        for (let list of lists) {

            // Validation
            if (!Object.hasOwn(ingredients, list)) { 
                console.log("A")
                resolve({valid: false});
                return;

            } else if (!typeof(ingredients[list]) === Array) {
                console.log("B")
                resolve({valid: false});
                return;

            }

            // Sanitisation

            let unusedIngredients = [];

            for (let i = 0; i < ingredients[list].length; i++) {

                let ingredient = ingredients[list][i];
                let isUsed = false;

                for (let step of ingredient.steps) {

                    if (steps[step-1].includes(ingredient.name)) {
                        isUsed = true;
                        break;
                    }

                }

                if (!isUsed) {
                    unusedIngredients.push(i);
                    console.log("Removable: " + ingredient.name);
                }

            }

            unusedIngredients.sort((val1, val2) => val2 - val1 );

            console.log(unusedIngredients);
            
            for (let index of unusedIngredients) {
                console.log(index);
                let r = ingredients[list].splice(index, 1);
                console.log("R")
                console.log(r)
                console.log("L")
                console.log(ingredients[list]);
            }

        }
        
        resolve({valid: true, list: ingredients});

    })

}

helpers.getRecipeDietType = (ingredients) => {

    if (ingredients.meat.length == 0 && ingredients.dairy.length == 0) {
        return "Vegan";
    } else if (ingredients.meat.length == 0) {
        return "Vegetarian";
    } else {
        return "Non-Vegetarian";
    }

}

module.exports = helpers;