import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    SignIn
  } from "@clerk/clerk-react";

export default function SignInBox() {

    const SignInDialog = document.querySelector('#SignInBox');

    const closeSignInDialog = () => {
        SignInDialog.close();
    }

    return (
        <dialog id="SignInBox">
            <section id="signInBoxWrapper">
                <button id="closeSignInBox" onClick={closeSignInDialog}>Close</button>
                <SignedOut>
                    <SignIn/>
                </SignedOut>
            </section>
        </dialog>
    )
}