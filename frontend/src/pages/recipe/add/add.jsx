import { useRef } from "react";
import { useRecipes } from "../../../providers/recipeContext"
import { useNavigate  } from "react-router-dom";

import { useForm, useFieldArray } from "react-hook-form"

export default function AddRecipe({form, setForm}) {

    const loadingDialog = useRef();
    const loadingDialogMessage = useRef();
    const container = useRef();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
      } = useForm({
        defaultValues: {
            steps: [{step: ""}]
        }
      });

      const { fields, append, remove } = useFieldArray({
        control,
        name: "steps",
        rules: { minLength: 3} 
      });

      const recipes = useRecipes();

      const onSubmit = async(data) => {
        console.log(data);

        loadingDialog.current.open = true;
        document.querySelector('body').style.overflowY = 'hidden';
        window.scrollTo(0, 0);

        let recipeObj = {}

        if (data.image.length > 0) {

            loadingDialogMessage.current.innerHTML = "Uploading Image..."
            const imageUpload = await recipes.io.attachImage(data.image[0]);
            recipeObj.submission_id = imageUpload.submission_id;

        }

        recipeObj.name = data.name;
        recipeObj.cookingTime = data.cookingTime;
        recipeObj.author = "Dhruv Malik"
        recipeObj.steps = [];

        for (let step of data.steps) {
            recipeObj.steps.push(step.step);
        }

        loadingDialogMessage.current.innerHTML = "Validating Recipe..."
        const submission = await recipes.io.add(recipeObj);

        console.log(submission)

        document.querySelector('body').style.overflowY = 'unset';

        navigate(`/submission/${submission.submission_id}`);


      }

    return (

        <main ref={container} className="font-poppins min-h-[69vh]">
            
            <div className="bg-ninja-blue h-24 w-full absolute right-0 z-0" aria-hidden />

            <section className="flex flex-col justify-center h-24 text-white font-bold text-xl">
                <h1 className="z-10">Add Recipe</h1>
            </section>

            <section className="py-5 flex flex-col gap-5">

                <div className="bg-yellow-100 font-medium text-yellow-900 py-3 px-4 rounded-xl flex items-center gap-2 w-[95%]">

                    <p className="font-semibold w-56">
                        <i className="fa-solid fa-triangle-exclamation"/>&thinsp;
                        Spam Policy
                    </p>

                    <p className="text-sm mt-1">
                        Please submit valid food recipes only - this helps maintain a pleasant experiance for everyone and
                        ensure that things work as intended. Expletives are strictly prohibited.
                        <b> If you are testing the application, you may consider copy-pasting a recipe from&nbsp;
                        <a href="https://github.com/dhruv-tech" className="underline" target="_blank" rel="noreferrer">here.</a><br/></b>

                    </p>

                </div>

                <form className="flex flex-col gap-3 w-[95%]" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="font-bold text-xl text-ninja-blue mt-1">What are we cooking, today?</h2>
                    {errors.name && 
                        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2">
                            <i className="fa-solid fa-circle-exclamation"/>&nbsp; {errors.name?.message}
                        </p>
                    }
                    <input
                        type='text' 
                        className='h-full grow focus:outline-none flex items-center h-10 grow capitalize
                        bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3' 
                        placeholder='Title'
                        {...register("name", {
                            required: "Please provide a title for the recipe."
                        })}
                        
                    />

                    <h2 className="font-bold text-xl text-ninja-blue mt-1">How long would this take to cook?</h2>
                    {errors.cookingTime && 
                        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2">
                            <i className="fa-solid fa-circle-exclamation"/>&nbsp; {errors.cookingTime?.message}
                        </p>
                    }
                    <input
                        type='number'
                        min='2'
                        max='720'
                        className='h-full grow focus:outline-none flex items-center h-10 grow
                        bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3' 
                        placeholder='Cooking time (mins)'
                        {...register("cookingTime", {
                            required: "Cooking time is required."
                        })}
                    />


                    <h2 className="font-bold text-xl text-ninja-blue mt-1">Cooking Steps</h2>
                    
                    <div className="bg-[#D6F4EF] font-medium text-[#00654B] py-3 px-4 rounded-xl flex items-center gap-2 mb-1">

                        <p className="font-semibold w-32">
                            <i className="fa-solid fa-bolt"/>&thinsp;
                            AI Assist
                        </p>

                        <p className="text-sm">
                            Time for teamwork. Simply write out the steps & AI Assist will take care of writing the
                             ingredient list, introduction and more. If you don't have an image to upload, it will
                              generate one for you too. 
                        </p>

                    </div>
                    {errors.steps && 
                        <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2">
                            <i className="fa-solid fa-circle-exclamation"/>&nbsp;
                             At least 3 steps are required for submitting a recipe.
                        </p>
                    }
                    {fields.map((field, index) => {
                        
                        let placeholder = "What's next?";

                        if (index === 0) placeholder = "How do we start this recipe?"

                        return (
                        
                        <div className="flex gap-1" key={field.id}>
                            <textarea
                                className='h-full grow focus:outline-none flex items-center h-12 grow
                                bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3 mb-1' 
                                placeholder={placeholder}
                                {...register(`steps.${index}.step`)} 
                            />

                            { index !== 0 && 
                                <button 
                                    type='button' 
                                    onClick={() => remove(index)}
                                    className='font-poppins font-semibold bg-slate-300 
                                    text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer 
                                    px-3 py-2 mb-1'
                                >
                                    <i className="fa-solid fa-trash"></i>

                                </button>
                            }
                        </div>

                        )
                    })}

                    <div>
                        <button type='button' onClick={() => append({step: ""})} className='float-right w-36 font-poppins font-semibold bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-4 py-2'>
                            <i className="fa-solid fa-plus"></i> Add Step
                        </button>
                    </div>

                    <h2 className="font-bold text-xl text-ninja-blue">Add an image <small className="text-slate-400">(optional)</small></h2>
                    <input type="file" id="file" name="filename" accept="image/png, image/jpeg"
                    className="font-poppins font-semibold file:bg-slate-300 text-ninja-blue file:rounded-lg 
                    file:px-4 file:py-2 file:border-none hover:opacity-90 file:cursor-pointer file:mr-3" {...register("image")}/>

                    <div>
                        <button className="float-right w-[250px] h-[50px] mt-[16px] bg-[#0F7556] rounded-[10px] font-poppins font-bold text-[17px] text-center text-white hover:opacity-90 cursor-pointer" 
                        type="submit">
                            Send to AI Assist&nbsp;
                            <i className="fa-solid fa-angles-right"></i>
                        </button>
                    </div>

                </form>

            </section>

            <dialog ref={loadingDialog} className="absolute backdrop-blur-md bg-slate-600/30 h-full w-[100vw] right-0 top-0 z-20">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-white shadow-chef h-32 w-80 rounded-lg flex justify-center items-center gap-3">
                        
                        <i className="animate-spin fa-solid fa-circle-notch text-[#66bd94] text-2xl"></i>
                        
                        <p className="font-poppins font-semibold text-slate-600" ref={loadingDialogMessage}>
                            <small>This is taking longer than expected...</small>
                        </p>
                    </div>
                </div>
            </dialog>

        </main>

    );
  }