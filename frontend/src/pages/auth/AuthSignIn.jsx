import { SignIn } from "@clerk/clerk-react";

export default function AuthSignIn() {

    return (

        <main className="font-poppins min-h-[69vh]">
            
            <div className="bg-ninja-blue min-h-[287px] h-[35vh] w-full absolute right-0 z-0" aria-hidden />

            <section className="flex justify-center items-center min-h-[651px] h-[85vh]">
                <SignIn
                
                    appearance={{
                        elements: {
                            formButtonPrimary: "font-poppins normal-case bg-[#0089e3] hover:bg-[#007dd3] text-md",
                            formFieldInput: "rounded-md border-[#ebebeb]",
                            footerActionLink: "text-[#007dd3] font-medium"
                        }
                    }}

                />
            </section>

        </main>

    );
  }