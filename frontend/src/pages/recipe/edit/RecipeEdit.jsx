import { useRef } from "react";
import { useRecipes } from "../../../providers/recipeContext"
import { useNavigate  } from "react-router-dom";

import { useForm, useFieldArray } from "react-hook-form";
import { useDialogs } from '../../../providers/dialogContext';
import RecipeDescriptionInput from "../../../components/recipe_manipulation/RecipeDescriptionInput";
import RecipeIngredientsInput from "../../../components/recipe_manipulation/RecipeIngredientsInput";
import RecipeTitleInput from "../../../components/recipe_manipulation/RecipeTitleInput";
import RecipeTimeInput from "../../../components/recipe_manipulation/RecipeTimeInput";
import RecipeStepsInput from "../../../components/recipe_manipulation/RecipeStepsInput";
import RecipeImageInput from "../../../components/recipe_manipulation/RecipeImageInput";

import { useParams } from "react-router-dom";
import { DevTool } from '@hookform/devtools';
import RecipeEditDietIndicator from "../../../components/communication/RecipeEditDietIndicator";
import { useUser } from '@clerk/clerk-react';
import ManualModeBanner from "../../../components/communication/ManualModeBanner";
import RecipeIntroductionInput from "../../../components/recipe_manipulation/RecipeIntroductionInput";

export default function RecipeEdit({form, setForm}) {

    const dialogs = useDialogs();
    const container = useRef();
    const navigate = useNavigate();
    const userData = useUser();

    let { idx } = useParams();

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors }
      } = useForm({

        defaultValues: async() => {

            dialogs.showLoading("Unlocking Recipe...");
            const recipe = await recipes.specific.get(idx);
            
            for (let ingredient of recipe.ingredients) {
                ingredient.steps = ingredient.steps.toString().split(",");
            }

            if (userData.user?.id !== recipe.userId) {
                dialogs.showMessage("Access Denied", "You do not have permission to edit this recipe.");
                navigate(`/recipe/view/${idx}`);
                return;
            }

            dialogs.close();
            
            return {
                steps: recipe.steps,
                ingredients: recipe.ingredients,
                name: recipe.name, 
                cookingTime: recipe.cooking_time, 
                desc: recipe.desc, 
                intro: recipe.intro,
                diet: recipe.diet,
                _id: recipe._id
            };

        }


      });

      const steps = useFieldArray({
        control,
        name: "steps",
        rules: { minLength: 3} 
      });

      const ingredients = useFieldArray({
        control,
        name: "ingredients",
        rules: { minLength: 1}
      });

      const recipes = useRecipes();

      const cancelEdit = async() => {
        let continueCancel = await dialogs.awaitConfirmation("Discard Changes", "Are you sure you want to cancel editing this recipe?");

        if (continueCancel) navigate(`/recipe/view/${idx}`);
      }

      const onSubmit = async(data) => {

        dialogs.showLoading("Enforcing Spam Policy...");

        data.ingredients = data.ingredients.map((ingredient) => {
            ingredient.steps = ingredient.steps.map(Number);
            return ingredient;
        });

        let image = data.image;
        delete data.image;
        delete data.diet;

        console.log(data);
        const submission = await recipes.io.update(data);

        if (submission.spam) {
            dialogs.showMessage("Spam Policy Violation", `${submission.msg} Please make nessesary corrections and try again.`);
            return;
        }

        let imageError = "";

        if (image.length > 0) {

            dialogs.showLoading("Uploading & Reassigning Image...");
            const imageUpload = await recipes.io.updateImage(image[0], data._id);

            if (imageUpload.code !== 200) imageError = `, however we encountered an error while trying to repalce the image`;

        }

        dialogs.showMessage("Edit Saved", `Your edit has been sucessfully saved${imageError}. AI will review your edit over the next few seconds and update insights for your recipe, if nessesary.`);

        navigate(`/recipe/view/${data._id}`);


      }

    return (

        <main ref={container} className="font-poppins min-h-[69vh]">
            <DevTool control={control} placement="top-right" />

            <div className="bg-ninja-blue h-24 w-full absolute right-0 z-0" aria-hidden />

            <section className="flex flex-col justify-center h-24 text-white font-bold text-xl">
                <h1 className="z-10">Edit Recipe (Beta)</h1>
            </section>

            <section className="py-5 flex flex-col gap-5">

                <ManualModeBanner></ManualModeBanner>

                <form className="flex flex-col gap-3 md:w-[95%]" onSubmit={handleSubmit(onSubmit)}>

                    <label className="font-bold text-xl text-ninja-blue mt-1">Recipe Title</label>

                    <RecipeTitleInput register={register} errors={errors}/>

                    <label className="font-bold text-xl text-ninja-blue mt-1">Estimated Cooking Time</label>

                    <RecipeTimeInput register={register} errors={errors}/>

                    <label className="font-bold text-xl text-ninja-blue mt-1">
                        <small className="fa-solid fa-bolt"></small>&nbsp;
                        Short Description <small className="text-slate-400">(used when featured)</small>
                    </label>
                    
                    <RecipeDescriptionInput register={register} errors={errors}/>

                    <label className="font-bold text-xl text-ninja-blue mt-1">
                        <small className="fa-solid fa-bolt"></small>&nbsp;
                        Introduction
                    </label>

                    <RecipeIntroductionInput register={register} errors={errors} />

                    <label className="font-bold text-xl text-ninja-blue mt-1" id="ingredientLabel">
                        <small className="fa-solid fa-bolt"></small>&nbsp;
                        Ingredients
                    </label>

                    <RecipeIngredientsInput register={register} errors={errors} fields={ingredients.fields} append={ingredients.append} remove={ingredients.remove} steps={steps}/>

                    <label className="font-bold text-xl text-ninja-blue mt-1">
                        <small className="fa-solid fa-bolt"></small>&nbsp;
                        Dietary Classification
                    </label>

                    <RecipeEditDietIndicator watch={watch()} />

                    <label className="font-bold text-xl text-ninja-blue mt-1">Cooking Steps</label>

                    <RecipeStepsInput register={register} errors={errors} fields={steps.fields} append={steps.append} remove={steps.remove} watch={watch()}/>

                    <label className="font-bold text-xl text-ninja-blue">Replace Image</label>
                    
                    <RecipeImageInput register={register} />

                    <div className="flex flex-col md:flex-row gap-2 justify-end">
                        <button className="md:w-[250px] h-[50px] mt-[16px] bg-slate-300 text-ninja-blue rounded-[10px] font-poppins font-bold text-[17px] text-center hover:opacity-90 cursor-pointer" 
                        type="button" onClick={cancelEdit}>
                            <i className="fa-solid fa-ban"></i>&nbsp;
                            Cancel
                        </button>

                        <button className="md:w-[250px] h-[50px] md:mt-[16px] bg-[#0F7556] rounded-[10px] font-poppins font-bold text-[17px] text-center text-white hover:opacity-90 cursor-pointer" 
                        type="submit">
                            <i className="fa-regular fa-floppy-disk"></i>&nbsp;
                            Save Changes
                        </button>
                        
                    </div>

                </form>

            </section>

        </main>

    );
  }