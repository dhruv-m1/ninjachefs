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
        
        },
        {
            prop: "prompt",
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

        // Validation

        const schema = ['name', 'steps', 'category'];

        if (!typeof(ingredients) === Array) {
            
            resolve({valid: false});
            return;

        }

        for (let property of schema) {

            if (!Object.hasOwn(ingredients[0], property)) { 
                
                resolve({valid: false});
                return;

            }

        }

        if (!typeof(ingredients.steps) === Array) {
            
            resolve({valid: false});
            return;

        }

        // Sanitisation

        let unusedIngredients = [];

        for (let i = 0; i < ingredients.length; i++) {

            let ingredient = ingredients[i];
            let isUsed = false;

            for (let step of ingredient.steps) {

                if (steps[step-1].toLowerCase().includes(ingredient.name.toLowerCase())) {
                    isUsed = true;
                    break;
                }

            }

            if (!isUsed) unusedIngredients.push(i);

        }

        unusedIngredients.sort((val1, val2) => val2 - val1 );

        for (let index of unusedIngredients) ingredients.splice(index, 1);
        
        resolve({valid: true, list: ingredients});

    })

}

helpers.getRecipeDietType = (ingredients) => {

    const meat = ingredients.filter((ingredient) => ingredient.category.toLowerCase() === 'meat');
    const dairy = ingredients.filter((ingredient) => ingredient.category.toLowerCase() === 'dairy');

    if (meat.length == 0 && dairy.length == 0) return "Vegan";
    
    if (meat.length == 0) return "Vegetarian";
    
    return "Non-Vegetarian";

}

export default helpers;