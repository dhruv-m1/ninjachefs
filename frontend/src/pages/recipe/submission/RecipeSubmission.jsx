import { useEffect, useRef, useState } from "react";
import { useRecipes } from "../../../providers/recipeContext"
import { useNavigate  } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useDialogs } from "../../../providers/dialogContext";

export default function RecipeSubmission() {

    const recipes = useRecipes();
    const user = useUser();
    const navigate = useNavigate();

    const statusMessage = useRef();
    const [state, setState] = useState("loading");
    const { idx } = useParams();
    const dialogs = useDialogs();

    useEffect(() => {
        if (user.isLoaded) getStatus();

    }, [user])

    const getStatus = async() => {
        const status = await recipes.io.getSubmissionStatus(idx);
        statusMessage.current.innerText = status.stage;

        if (status.is_pending === true) {
            setTimeout(() => getStatus(), 4500);
        } else if (status.success === "true") {
            dialogs.showMessage("Review your submission", "Your submission has been successfully processed by AI Assist. Please review the completed recipe, and use the 'Edit' button to manually make any corrections or changes.");
            navigate(`/recipe/view/${status.recipeId}`);
        } else {
            setState("error");
        }
    }

    return (

        <main className="font-poppins min-h-[69vh]">
            
            <div className="bg-ninja-blue h-24 w-full absolute right-0 z-0" aria-hidden />

            <section className="flex flex-col justify-center h-24 text-white font-bold text-xl">
                <h1 className="z-10">Pending Recipe</h1>
            </section>

            <div className="flex flex-col justify-center items-center h-[50vh] gap-10">

                <div className="bg-white shadow-ninja rounded-xl flex flex-col justify-center items-center gap-3 px-12 py-8 min-h-[125px] min-w-[275px] max-w-[450px]">
                    
                    <div className="flex gap-5 justify-center items-center">
                        {state === "error" && <i class="fa-solid fa-triangle-exclamation text-yellow-500 text-3xl"></i>}
                        {state === "loading" && <i className="animate-spin fa-solid fa-circle-notch text-[#66bd94] text-3xl"></i>}
                        
                        <p className="font-poppins font-semibold text-slate-600" ref={statusMessage}>
                            Spam validation done, recipe queued for further processing...
                        </p>
                    </div>
                </div>
                {state === "loading" &&
                    <div className="text-slate-500 font-medium text-sm text-center flex flex-col gap-2">
                            <p>
                                AI Assist is working on your submission. 
                            </p>

                            <p className="text-slate-400 text-xs">
                                This typically takes between 15-45 seconds.
                            </p>

                            <p className="italic text-slate-400 text-xs">
                            Please feel free to minimise or close this window, and return back later.
                            </p>

                    </div>
                }

            </div>

        </main>

    );
  }