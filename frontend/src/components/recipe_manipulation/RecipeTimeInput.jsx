/**
 * Collects Recipe Cooking Time with appropriate validation
 */

export default function RecipeTimeInput({register, errors}) {

    return (

        <>
            {errors.cookingTime && 
                <p className="bg-red-100 text-red-900 text-sm font-medium rounded-lg px-3 py-2">
                    <i className="fa-solid fa-circle-exclamation"/>&nbsp; {errors.cookingTime?.message}
                </p>
            }

            <input
                type='number'
                min='5'
                max='720'
                onwheel="return false;"
                className='focus:outline-none focus:ring-0 border-0 flex items-center h-10 grow
                bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-2 px-3' 
                placeholder='Cooking time (mins)'
                {...register("cookingTime", {
                    required: "Cooking time is required."
                })}
            />
        </>
        
    );
}