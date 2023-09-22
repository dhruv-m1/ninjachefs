/**
 * Collects Recipe Steps with appropriate validation
 */

export default function RecipeStepsInput({register, errors, fields, append, remove}) {

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
        </>
        
    );
}