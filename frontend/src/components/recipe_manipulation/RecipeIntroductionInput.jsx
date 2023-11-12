/**
 * Collects Recipe Title with appropriate validation
 */

export default function RecipeIntroductionInput({register, errors}) {

    return (

        <>
            {errors.name && 
                <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2">
                    <i className="fa-solid fa-circle-exclamation"/>&nbsp; {errors.name?.message}
                </p>
            }

            <textarea
                className='focus:outline-none focus:ring-0 border-0 flex items-center h-20 grow
                bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3 mb-1' 
                placeholder="How would you introduce this recipe?"
                {...register("intro", {
                    required: "Please provide a descripton for the recipe."
                })} 
            />
        </>
        
    );
}