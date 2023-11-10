import { useEffect, useState, useRef } from 'react';
import { useRecipes } from '../../../providers/recipeContext';
import { useParams, useNavigate } from "react-router-dom";

import { useUser } from '@clerk/clerk-react';
import { useDialogs } from '../../../providers/dialogContext';
import RecipeBanner from '../../../components/recipe_display/RecipeBanner';
import RecipeInsights from '../../../components/recipe_display/RecipeInsights';
import RecipeIngredients from '../../../components/recipe_display/RecipeIngredients';
import RecipeSteps from '../../../components/recipe_display/RecipeSteps';

export default function ViewRecipe() {

    const recipes = useRecipes();
    const userData = useUser();
    let { idx } = useParams();

    const navigate = useNavigate();

    let [currentRecipe, setCurrentRecipe] = useState({});
    let [user, setUser] = useState({id: "unset"});

    const dialogs = useDialogs();

    const deleteAction = async() => {

        if (!await dialogs.awaitConfirmation("Confirmation Required", `Are you sure you want to delete "${currentRecipe.name}"?`)) return;

        dialogs.showLoading("Deleting...");

        await recipes.io.delete({idx: currentRecipe._id})
        dialogs.showMessage("Confirmation", `Your recipe "${currentRecipe.name}" has been deleted.`);

        navigate('/account/recipes');
    }

    const editAction = async() => {

        dialogs.showLoading("Unlocking Recipe...");

        navigate('/recipe/edit/' + idx);
    }

    useEffect(()=> {

        window.scrollTo(0, 0);
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

        setCurrentRecipe(recipe);
    }


    return (

        <div className="flex flex-col">
            
            <RecipeBanner currentRecipe={currentRecipe} />

            <article className='container mx-auto flex flex-col gap-4 font-poppins'>
            

            {
                (user.id === currentRecipe?.userId) && 
                <section className='relative flex justify-between items-center bg-green-100 
                px-3 py-2 md:mt-[-15px] rounded-lg md:w-[49%] flex-col lg:flex-row gap-2'>
                    <h2 className='text-green-800 font-bold text-lg font-poppins'>
                        <i className="fa-solid fa-lock text-lg mr-1"></i>
                        Ownership Controls
                    </h2>
                    <div className='flex gap-2'>
                        <button className="bg-[#0F7556] px-3 py-2 rounded-lg font-poppins font-semibold text-center text-white hover:opacity-90 cursor-pointer" type="button" onClick={editAction}>
                            <span className="fa-solid fa-pen-to-square"></span>&nbsp;
                            Edit
                        </button>
                        <button className="bg-[#0F7556] px-3 py-2 rounded-lg font-poppins font-semibold text-center text-white hover:opacity-90 cursor-pointer" type="button" onClick={deleteAction}>
                            <i className="fa-solid fa-trash"/>&nbsp;
                            Delete
                        </button>
                    </div>

                </section>
                
            }

            <h3 className='text-ninja-blue font-bold text-2xl'>Introduction</h3>

            {
            
                !currentRecipe.intro &&
                <>
                    <div className="h-5 w-[90%] rounded bg-slate-200 animate-pulse"/>
                    <div className="h-5 w-[60%] rounded bg-slate-200 animate-pulse"/>
                </>
            }
            <p className='text-ninja-blue font-medium text-md'>{currentRecipe?.intro}</p>

            <h3 className='text-ninja-blue font-bold text-2xl'>Good to know</h3>

            <RecipeInsights currentRecipe={currentRecipe}/>

            <section className='italic font-poppins font-medium text-slate-500 text-sm'>
                <p>Disclaimer: AI Insights are experimental and may, at times, contain inaccurate or controversial information.</p>
            </section>

            <h3 className='text-ninja-blue font-bold text-2xl'>What you'll need</h3>

            <RecipeIngredients currentRecipe={currentRecipe} />

            <h3 className='text-ninja-blue font-bold text-2xl'>Steps</h3>

            <RecipeSteps currentRecipe={currentRecipe}/>

            </article>

        </div>
    );
  }