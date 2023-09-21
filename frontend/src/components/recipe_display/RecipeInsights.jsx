

export default function RecipeInsights({ currentRecipe }) {

    return (
           <>

            <section className='font-medium font-poppins text-ninja-blue flex gap-5 mb-2 flex-col md:flex-row'>
                
                {
                    currentRecipe.health_category &&
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
                        <p> {currentRecipe?.health_reason} </p>
                    </div>

                }

                { 
                    !currentRecipe.health_category &&
                    <div className='bg-slate-200 animate-pulse h-48 shadow-ninja rounded-2xl px-5 py-4 md:basis-1/2'/>
                }

                {
                    currentRecipe.allergies &&
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
                            { currentRecipe.allergies?.length > 0 ? "Warning" : "No Common Allergens"}
                        </h4>
                        <p>{ currentRecipe.allergies?.length > 0 ? "This recipe may not be suitable for individuals with allergic tendencies to the following items: " + currentRecipe.allergies.join(", ") : "We didn't find any common food allergens in this recipe. However, if you are cooking for a guest, we recommend asking them about any allergies that they may have."}</p>
                    </div>
                }

                {
                    !currentRecipe.allergies &&
                    <div className='bg-slate-200 animate-pulse h-48 shadow-ninja rounded-2xl px-5 py-4 md:basis-1/2'/>
                }
                
            </section>

           </>
        
    );
}