/**
 * Displays categorised ingredients for a given recipe.
 */

import { useEffect, useState } from "react";

export default function RecipeIngredients({ currentRecipe }) {

    let [veggies, setVeggies] = useState([]);
    let [meats, setMeats] = useState([]);
    let [dairy, setDairy] = useState([]);
    let [others, setOthers] = useState([]);

    let [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    
        if (!currentRecipe.ingredients) return;

        let ingredients = currentRecipe.ingredients;

        setVeggies(ingredients.filter((ingredient) => ingredient.category.toLowerCase() === 'veggies'));
        setMeats(ingredients.filter((ingredient) => ingredient.category.toLowerCase() === 'meat'));
        setDairy(ingredients.filter((ingredient) => ingredient.category.toLowerCase() === 'dairy'));
        setOthers(ingredients.filter((ingredient) => ingredient.category.toLowerCase() === 'other'));
        setIsLoaded(true);

    }, [currentRecipe])

    return (
           <>

            <section className='font-medium text-ninja-blue flex gap-5 mb-2 flex-col'>
                
            {veggies.length > 0 ? 
                (
                <>
                    <h4 className='text-ninja-blue font-bold text-lg'>Veggies & Fruits</h4>
                    <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                        {veggies.map((ingredient, i) => (
                            <li className="text-ninja-blue font-medium text-md bg-white 
                            border-2 border-ninja-blue/25 border-dashed lowercase
                            shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl" 
                            key={`${currentRecipe._id}-veggies-${i}`}>
                                {ingredient.name}
                            </li>
                        ))}
                    </ul>
                </>
                )
                : null
            }

            {dairy.length > 0 ? 
                (
                <>
                    <h4 className='text-ninja-blue font-bold text-lg'>Dairy</h4>
                    <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                        {dairy.map((ingredient, i) => (
                            <li className="text-ninja-blue font-medium text-md bg-white 
                            border-2 border-ninja-blue/25 border-dashed lowercase
                            shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl" 
                            key={`${currentRecipe._id}-diary-${i}`}>
                                {ingredient.name}
                            </li>
                        ))}
                    </ul>
                </>
                )
                : null
            }
            
            {meats.length > 0 ?
                (
                <>
                    <h4 className='text-ninja-blue font-bold text-lg'>Meat & Eggs</h4>
                    <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                        {meats.map((ingredient, i) => (
                            <li className="text-ninja-blue font-medium text-md bg-white 
                            border-2 border-ninja-blue/25 border-dashed lowercase
                            shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl" 
                            key={`${currentRecipe._id}-meat-${i}`}>
                                {ingredient.name}
                            </li>
                        ))}
                    </ul>
                </>
                )
                : null
            }

            {others.length > 0 ? 
                (
                <>
                    <h4 className='text-ninja-blue font-bold text-lg'>Spices, condiments, nuts & everything else</h4>
                    <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                        {others.map((ingredient, i) => (
                            <li className="text-ninja-blue font-medium text-md bg-white 
                            border-2 border-ninja-blue/25 border-dashed lowercase
                            shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl" 
                            key={`${currentRecipe._id}-other-${i}`}>
                                {ingredient.name}
                            </li>
                        ))}
                    </ul>
                </>
                )
                : null
            }

            {
                !isLoaded &&
                <div className='bg-slate-200 animate-pulse h-24 w-full rounded-xl'/>
            }
                
            </section>

            </>
        
    );
}