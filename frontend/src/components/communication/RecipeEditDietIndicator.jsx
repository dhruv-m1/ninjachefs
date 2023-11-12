/**
 * Collects Recipe Title with appropriate validation
 */

import { useEffect, useRef } from "react";

export default function RecipeEditDietIndicator({watch}) {
    
    let diet = useRef(null);
    useEffect(() => {

        const ingredients = watch.ingredients;

        if (!ingredients) return;

        const meat = ingredients.filter((ingredient) => ingredient.category.toLowerCase() === 'meat');
        const dairy = ingredients.filter((ingredient) => ingredient.category.toLowerCase() === 'dairy');

        if (meat.length === 0 && dairy.length === 0) diet.current.value = "Vegan";
        
        else if (meat.length === 0) diet.current.value = "(Lacto) Vegetarian";
        
        else diet.current.value = "Non-Vegetarian";
        

    }, [watch]);

    return (

        <>
            <p className="text-ninja-blue text-sm font-medium rounded-lg px-3 py-2">
                <i className="fa-solid fa-circle-info"/>&nbsp;
                This value is automatically computed based on the categorisation of the ingredients you've used.
            </p>
            <input
                type='text' 
                className='focus:outline-none focus:ring-0 border-0 flex items-center h-10 grow capitalize cursor-not-allowed
                bg-slate-300 text-gray-500 italic font-semibold font-poppins rounded-lg py-2 px-3' 
                placeholder="(auto-computed)"
                ref={diet}
                disabled
            />
        </>
        
    );
}