import { SignUp } from "@clerk/clerk-react";

export default function AuthSignUp() {

    return (

        <main className="font-poppins min-h-[69vh]">
            
            <div className="bg-ninja-blue min-h-[287px] h-[35vh] w-full absolute right-0 z-0" aria-hidden />

            <section className="flex flex-col justify-center items-center min-h-[651px] h-[85vh]">
                {/*<SignUp
                
                    appearance={{
                        elements: {
                            formButtonPrimary: "font-poppins normal-case bg-[#0089e3] hover:bg-[#007dd3] text-md",
                            formFieldInput: "rounded-md border-[#ebebeb]",
                            footerActionLink: "text-[#007dd3] font-medium"
                        }
                    }}

                />*/}

                <div className="rounded-xl bg-white shadow-ninja text-poppins px-10 py-20 z-10">
                    <h1 className="font-semibold text-lg">
                    <i class="fa-solid fa-user-lock"></i>&thinsp;
                        Invitation Required
                    </h1>
                    <p className="text-gray-500">Sorry, but sign ups are currently disabled.</p>
                </div>

                <div className="mt-6">
                    <p className="text-xs text-center text-gray-500">
                        
                        Thanks for your understanding.<br/>

                    </p>
                </div>

            </section>

        </main>

    );
  }