/**
 * Displays all steps for a given recipe with associated ingredients.
 */

import { useEffect, useState, useRef } from "react";

export default function RecipeSteps({ currentRecipe }) {

    let stepWiseIngredients = useRef([]);

    let [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
    
        if (!currentRecipe.ingredients) return;

        let ingredients = currentRecipe.ingredients;
        let processedIngredientsData = [];

        for (let i = 0; i < currentRecipe.steps.length; i++) {

            let stepIngredientsArr = [];

            for (let ingredient of ingredients) {

                if (ingredient.steps.includes(i+1)) stepIngredientsArr.push(ingredient.name);
            }

            let stepIngredients = stepIngredientsArr.join(', ');
            let lastCommaIdx = stepIngredients.lastIndexOf(",");
            
            if (lastCommaIdx !== -1)
                stepIngredients = stepIngredients.substring(0, lastCommaIdx) + ' &' + stepIngredients.substring(lastCommaIdx + 1);
            
            processedIngredientsData.push(stepIngredients);
        }

        stepWiseIngredients.current = processedIngredientsData;
        setIsLoaded(true);

    }, [currentRecipe])

    return (
           <>

            <section className='flex flex-col gap-x-6 gap-y-5 text-ninja-blue font-poppins'>

                {
                    !isLoaded &&
                    <div className='bg-slate-200 animate-pulse h-24 w-full rounded-xl'/>
                }

                { isLoaded &&
                
                    currentRecipe.steps?.map((step, index) => (

                        <div className='flex flex-col bg-white shadow-chef rounded-[30px]'>

                            {
                                stepWiseIngredients.current[index] !== '' &&
                                <div className='flex flex-col min-h-[40px] font-semibold justify-center px-5 my-3'>
                                    <h3 className='text-slate-500'>You'll need to get hold of</h3>
                                    <span className='font-medium capitalize'>{stepWiseIngredients.current[index]}</span>
                                </div>
                            }

                            <div className='bg-white shadow-ninja py-5 px-3 rounded-[30px] flex items-center gap-3 border-s-2 border-ninja-blue grow'>
                                <div className='bg-white relative t-[50%] font-medium text-2xl shadow-ninja border-2 border-[#63b890]
                                h-[50px] w-[50px] min-w-[50px] rounded-[50%] flex justify-center items-center'>
                                    {index+1}
                                </div>
                                <div>
                                    <p className="font-medium text-md">
                                        {step}
                                    </p> 
                                </div>  
                            </div>
                        </div>
                
                    ))}

            </section>
            </>
        
    );
}