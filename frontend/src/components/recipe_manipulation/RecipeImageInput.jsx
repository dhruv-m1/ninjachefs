/**
 * Collects cover image for recipe
 */

export default function RecipeImageInput({register}) {

    return (

        <input type="file" id="file" name="filename" accept="image/png, image/jpeg"
        className="font-poppins font-semibold file:bg-slate-300 text-ninja-blue file:rounded-lg 
        file:px-4 file:py-2 file:border-none hover:opacity-90 file:cursor-pointer file:mr-3"
        {...register("image")}
        
        />
        
    );
}