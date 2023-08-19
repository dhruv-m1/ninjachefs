import { useEffect, useState } from 'react';
import { useRecipes } from '../../../providers/recipeContext';
import { useParams } from "react-router-dom";

import { useUser } from '@clerk/clerk-react';

export default function ViewRecipe() {

    const recipes = useRecipes();
    const userData = useUser();
    let { idx } = useParams(); 

    let [currentRecipe, setCurrentRecipe] = useState({});
    let [user, setUser] = useState({id: "unset"});

    const deleteAction = async() => {

        recipes.delete({idx: currentRecipe._id})
        alert('Deleted');
    }

    useEffect(()=> {
        
        const loadRecipe = async() => {

            let recipe = await recipes.getSpecific(idx)

            if (recipe.health_score < 3) recipe.health_category = "Unhealthy";
            else if (recipe.health_score < 5) recipe.health_category = "Somewhat Unhealthy";
            else if (recipe.health_score == 5) recipe.health_category = "Some health implications";
            else if (recipe.health_score < 8) recipe.health_category = "Fairly Healthy";
            else recipe.health_category = "Healthy";

            setCurrentRecipe(recipe);
        }

        loadRecipe();

    }, [])

    useEffect(() => {
        
        if (userData.user) setUser(userData.user);

    }, [userData])

    return (

        <div className="flex flex-col">
            
            <section className='flex bg-ninja-blue'>
                <section className='grow flex items-center pl-[7vw] text-white'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold font-poppins text-xl'>{currentRecipe.name}</h1>
                        <h2 className='font-medium font-poppins text-lg italic'>By {currentRecipe.author}</h2>
                    </div>
                    {
                        (user.id === currentRecipe.owner) ?
                        (<input className="red-btn btn btn-del" type="button" value="Delete" onClick={deleteAction}/>)
                        :
                        ("")
                    }
                </section>

                <section className='bg-slate-300 h-[37vh] w-[55%] bg-cover bg-center' style={{backgroundImage: `url('${currentRecipe.img_url}/ncHeader')`}}>
                </section>
            </section>
            
            <section className='pl-[7vw] flex relative top-[-25px] gap-3 font-poppins'>
                <div className='shadow-ninja bg-white py-2 px-3 rounded-2xl'>
                    <p className='font-semibold capitalize'>{currentRecipe.cooking_time} mins</p>
                </div>
                <div className='shadow-ninja bg-white py-2 px-3 rounded-2xl'>
                    <p className='font-semibold capitalize'>{currentRecipe.diet}</p>
                </div>
            </section>
            <article className='container mx-auto flex flex-col gap-4'>
            
                {
                    currentRecipe['_id'] ? 
                    (
                        <>
                        <h3 className='text-ninja-blue font-bold text-2xl'>Introduction</h3>
                        <p className='text-ninja-blue font-medium text-md'>{currentRecipe.intro}</p>

                        <h3 className='text-ninja-blue font-bold text-2xl'>Good to know</h3>
                        <section className='font-medium text-ninja-blue flex gap-3'>
                            <div className='bg-white w-[40%] shadow-ninja rounded-2xl px-5 py-4'>
                                <span className='font-semibold bg-slate-300 text-ninja-blue py-1 px-3 rounded-lg mr-2'>
                                    <i class="fa-solid fa-wand-magic-sparkles"></i>&nbsp;
                                    AI Insights
                                </span>
                                <span className='font-semibold bg-slate-300 text-ninja-blue py-1 px-3 rounded-lg mr-2'>
                                    <i class="fa-solid fa-notes-medical"></i>&nbsp;
                                    Health Impact
                                </span>
                                <h4 className='font-semibold mt-3 mb-2 text-xl'>
                                    {currentRecipe.health_category}&nbsp;
                                    <small>({currentRecipe.health_score}/10)</small>
                                </h4>
                                <p> {currentRecipe.health_reason} </p>
                            </div>

                            <div className='bg-white w-[40%] shadow-ninja rounded-2xl px-5 py-4'>
                                <span className='font-semibold bg-slate-300 text-ninja-blue py-1 px-3 rounded-lg mr-2'>
                                    <i class="fa-solid fa-wand-magic-sparkles"></i>&nbsp;
                                    AI Insights
                                </span>
                                <span className='font-semibold bg-slate-300 text-ninja-blue py-1 px-3 rounded-lg mr-2'>
                                    <i class="fa-solid fa-triangle-exclamation"></i>&nbsp;
                                    Allergy Information
                                </span>
                                <h4 className='font-semibold mt-3 mb-2 text-xl'>
                                    { currentRecipe.allergies.length > 0 ? "Warning" : "No Common Allergens"}
                                </h4>
                                <p>{ currentRecipe.allergies.length > 0 ? "[List]" : "We didn't find any common food allergens in this recipe. However, if you are cooking for a guest, we recommend asking them about any allergies that they may have."}</p>
                            </div>

                        </section>

                        <h3 className='text-ninja-blue font-bold text-2xl'>What you'll need</h3>

                        {currentRecipe.ingredients.veggies.length > 0 ? 
                            (
                            <>
                                <h4 className='text-ninja-blue font-bold text-lg'>Veggies & Fruits</h4>
                                <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                                    {currentRecipe.ingredients.veggies.map((ingredient, i) => (
                                        <li className="text-ninja-blue font-medium text-md bg-white 
                                        border-2 border-ninja-blue/25 border-dashed
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

                        {currentRecipe.ingredients.dairy.length > 0 ? 
                            (
                            <>
                                <h4 className='text-ninja-blue font-bold text-lg'>Dairy</h4>
                                <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                                    {currentRecipe.ingredients.dairy.map((ingredient, i) => (
                                        <li className="text-ninja-blue font-medium text-md bg-white 
                                        border-2 border-ninja-blue/25 border-dashed
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
                        
                        {currentRecipe.ingredients.meat.length > 0 ? 
                            (
                            <>
                                <h4 className='text-ninja-blue font-bold text-lg'>Meat & Eggs</h4>
                                <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                                    {currentRecipe.ingredients.meat.map((ingredient, i) => (
                                        <li className="text-ninja-blue font-medium text-md bg-white 
                                        border-2 border-ninja-blue/25 border-dashed
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

                        {currentRecipe.ingredients.other.length > 0 ? 
                            (
                            <>
                                <h4 className='text-ninja-blue font-bold text-lg'>Spices, condiments, nuts & everything else</h4>
                                <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                                    {currentRecipe.ingredients.other.map((ingredient, i) => (
                                        <li className="text-ninja-blue font-medium text-md bg-white 
                                        border-2 border-ninja-blue/25 border-dashed
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

                        <h3 className='text-ninja-blue font-bold text-2xl'>Steps</h3>

                        <ol className='flex flex-wrap flex-col gap-x-6 gap-y-3 text-ninja-blue font-poppins'>
                            {currentRecipe.steps.map((step, i) => (

                                <div className='bg-white shadow-chef mt-3 py-5 px-3 max-w-[50%] rounded-[30px] flex items-center gap-3 border-s-2 border-ninja-blue'>
                                    <div className='bg-white relative t-[50%] font-medium text-2xl shadow-ninja border-2 border-[#63b890]
                                    h-[50px] w-[50px] min-w-[50px] rounded-[50%] flex justify-center items-center'>
                                        {i+1}
                                    </div>
                                    <div>
                                        <li className="font-medium text-md"  
                                        key={`${currentRecipe._id}-step-${i}`}>
                                            {step}
                                        </li> 
                                    </div>  
                                </div>
                                
                            ))}
                        </ol>
                        </>
                    ) : ""
                }
            </article>
        </div>
    );
  }