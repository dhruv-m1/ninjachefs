import { useEffect, useState, useRef } from 'react';
import { useRecipes } from '../../../providers/recipeContext';
import { useParams, useNavigate } from "react-router-dom";

import { useUser } from '@clerk/clerk-react';

export default function ViewRecipe() {

    const recipes = useRecipes();
    const userData = useUser();
    let { idx } = useParams(); 
    const navigate = useNavigate();

    const loadingDialog = useRef();
    let [currentRecipe, setCurrentRecipe] = useState({});
    let [user, setUser] = useState({id: "unset"});

    const deleteAction = async() => {

        if (!window.confirm(`Are you sure you want to delete "${currentRecipe.name}"?\n\nPress OK to confirm.`)) return;

        loadingDialog.current.open = true;
        document.querySelector('body').style.overflowY = 'hidden';
        window.scrollTo(0, 0);

        await recipes.io.delete({idx: currentRecipe._id})
        alert(`Your recipe "${currentRecipe.name}" has been deleted.`);
        document.querySelector('body').style.overflowY = 'unset';

        navigate('/account/recipes');
    }

    useEffect(()=> {
        
        loadRecipe();

    }, [])

    useEffect(() => {
        
        if (userData.user) setUser(userData.user);

    }, [userData])

    const loadRecipe = async() => {

        let recipe = await recipes.specific.get(idx);

        if (recipe.health_score < 3) recipe.health_category = "Unhealthy";
        else if (recipe.health_score < 5) recipe.health_category = "Somewhat Unhealthy";
        else if (recipe.health_score === 5) recipe.health_category = "Some health implications";
        else if (recipe.health_score < 8) recipe.health_category = "Fairly Healthy";
        else recipe.health_category = "Healthy";

        let stepWiseIngredients = []
        let ingredients = []

        ingredients = ingredients.concat(recipe.ingredients.veggies, recipe.ingredients.dairy, recipe.ingredients.meat, recipe.ingredients.other);
        
        for (let i = 0; i < recipe.steps.length; i++) {

            let stepIngredientsArr = [];

            for (let ingredient of ingredients) {

                if (ingredient.steps.includes(i+1)) stepIngredientsArr.push(ingredient.name);
            }

            let stepIngredients = stepIngredientsArr.join(', ');
            let lastCommaIdx = stepIngredients.lastIndexOf(",");
            
            if (lastCommaIdx !== -1)
                stepIngredients = stepIngredients.substring(0, lastCommaIdx) + ' &' + stepIngredients.substring(lastCommaIdx + 1);
            
            stepWiseIngredients.push(stepIngredients);
        }

        recipe.stepWiseIngredients = stepWiseIngredients;

        setCurrentRecipe(recipe);
    }


    return (

        <div className="flex flex-col">
            
            <div className="bg-ninja-blue h-80 md:h-72 w-full absolute right-0 z-0" aria-hidden />

            <section className='flex flex-col md:flex-row z-10'>
                <section className='grow flex justify-center md:justify-start items-center text-white'>

                    <div className='flex flex-col gap-2 capitalize'>
                        <div className='h-8 md:hidden'></div>
                        <h1 className='font-semibold font-poppins text-xl'>{currentRecipe.name}</h1>
                        <h2 className='font-medium font-poppins text-lg italic'>By {currentRecipe.author}</h2>
                        <div className='h-0 md:h-8'></div>
                    </div>
                    
                </section>

                <section className='bg-slate-300 w-full h-60 md:h-80 md:w-[50%] bg-cover bg-center rounded-xl 
                mt-5 shadow-ninja' style={{backgroundImage: `url('${currentRecipe.img_url}/ncHeader')`}}>
                </section>

            </section>

            <section className='relative top-[-20px] md:absolute md:top-[22.6rem] flex gap-3 font-poppins z-10 justify-center md:justify-start text-ninja-blue'>
                <div className='shadow-ninja bg-white py-2 px-3 rounded-2xl'>
                    <p className='font-semibold capitalize'>
                        <i className="fa-solid fa-clock"></i>&nbsp;
                        {currentRecipe.cooking_time} mins
                    </p>
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
                        {
                            (user.id === currentRecipe.userId) && 
                            <section className='relative flex justify-between items-center bg-green-100 
                            px-3 py-2 md:mt-[-15px] rounded-lg md:w-[49%] flex-col md:flex-row gap-2'>
                                <h2 className='text-green-800 font-bold text-lg font-poppins'>
                                    <i className="fa-solid fa-lock text-lg mr-1"></i>
                                    Ownership Controls
                                </h2>
                                <button className="bg-[#0F7556] px-3 py-2 rounded-lg font-poppins font-semibold text-center text-white hover:opacity-90 cursor-pointer" type="button" onClick={deleteAction}>
                                    <i className="fa-solid fa-trash"/>&nbsp;
                                    Delete
                                </button>

                            </section>
                            
                        }
                        <h3 className='text-ninja-blue font-bold text-2xl'>Introduction</h3>
                        <p className='text-ninja-blue font-medium text-md'>{currentRecipe.intro}</p>

                        <h3 className='text-ninja-blue font-bold text-2xl'>Good to know</h3>

                        <section className='font-medium text-ninja-blue flex gap-5 mb-2 flex-col md:flex-row'>
                            <div className='bg-white shadow-ninja rounded-2xl px-5 py-4 basis-1/2'>
                                <span className='font-semibold bg-slate-300 text-slate-800 py-1 px-3 rounded-lg mr-2 mb-2 inline-block'>
                                    <i class="fa-solid fa-wand-magic-sparkles"></i>&nbsp;
                                    AI Insights
                                </span>
                                <span className='font-semibold bg-red-100 text-red-900 py-1 px-3 rounded-lg mr-2 inline-block'>
                                    <i class="fa-solid fa-notes-medical"></i>&nbsp;
                                    Health Impact
                                </span>
                                <h4 className='font-semibold mt-1 mb-2 text-xl'>
                                    {currentRecipe.health_category}&nbsp;
                                    <small>({currentRecipe.health_score}/10)</small>
                                </h4>
                                <p> {currentRecipe.health_reason} </p>
                            </div>

                            <div className='bg-white shadow-ninja rounded-2xl px-5 py-4 basis-1/2'>
                                <span className='font-semibold bg-slate-300 text-slate-800 py-1 px-3 rounded-lg mr-2 mb-2 inline-block'>
                                    <i class="fa-solid fa-wand-magic-sparkles"></i>&nbsp;
                                    AI Insights
                                </span>
                                <span className='font-semibold bg-yellow-100 text-yellow-900 py-1 px-3 rounded-lg mr-2 inline-block'>
                                    <i class="fa-solid fa-triangle-exclamation"></i>&nbsp;
                                    Allergy Information
                                </span>
                                <h4 className='font-semibold mt-1 mb-2 text-xl'>
                                    { currentRecipe.allergies.length > 0 ? "Warning" : "No Common Allergens"}
                                </h4>
                                <p>{ currentRecipe.allergies.length > 0 ? "This recipe may not be suitable for individuals with allergic tendencies to the following items: " + currentRecipe.allergies.join(", ") : "We didn't find any common food allergens in this recipe. However, if you are cooking for a guest, we recommend asking them about any allergies that they may have."}</p>
                            </div>

                        </section>

                        <section className='italic font-poppins font-medium text-slate-500 text-sm'>
                            <p>Disclaimer: AI Insights are experimental and may, at times, contain inaccurate or controversial information.</p>
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

                        <div className='flex flex-col gap-x-6 gap-y-5 text-ninja-blue font-poppins'>
                            {currentRecipe.steps.map((step, index) => (

                                <div className='flex flex-col bg-white shadow-chef rounded-[30px]'>

                                    {
                                        currentRecipe.stepWiseIngredients[index] !== '' &&
                                        <div className='flex flex-col min-h-[40px] font-semibold justify-center px-5 my-3'>
                                        <h3 className='text-slate-500'>You'll need to get hold of</h3>
                                        <span className='font-medium capitalize'>{currentRecipe.stepWiseIngredients[index]}</span>
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
                        </div>
                        </>
                    ) : ""
                }
            </article>

            <dialog ref={loadingDialog} className="absolute backdrop-blur-md bg-slate-600/30 h-full w-[100vw] right-0 top-0 z-20">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-white shadow-chef h-32 w-80 rounded-lg flex justify-center items-center gap-3">
                        
                        <i className="animate-spin fa-solid fa-circle-notch text-[#66bd94] text-2xl"></i>
                        
                        <p className="font-poppins font-semibold text-slate-600">
                            Deleting...
                        </p>
                    </div>
                </div>
            </dialog>

        </div>
    );
  }