/**
 * Collects Recipe Steps with appropriate validation
 */

import { useEffect } from "react";
import { useDialogs } from "../../providers/dialogContext";

export default function RecipeStepsInput({register, errors, fields, append, remove, identifier = ""}) {
    const dialogs = useDialogs();
    const deleteStep = async(index) => {
        let confimation = await dialogs.awaitConfirmation("Confirmation Required", `Are you sure you want to delete this step?`);
        
        if (confimation) remove(index);
    }

    useEffect(() => { console.log(fields) }, [fields]);

    return (

        <>
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
                        className='focus:outline-none flex items-center h-20 grow
                        bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3 mb-1' 
                        placeholder={placeholder}
                        required
                        {...register(`steps.${index}${identifier}`)}
                    />

                    { index !== 0 && 
                        <button 
                            type='button' 
                            onClick={() => deleteStep(index)}
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
                <button type='button' onClick={() => append("")} className='float-right w-36 font-poppins font-semibold bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-4 py-2'>
                    <i className="fa-solid fa-plus"></i> Add Step
                </button>
            </div>
        </>
        
    );
}