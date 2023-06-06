import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    SignIn,
  } from "@clerk/clerk-react";
  
export default function ControlBox() {

    const SignInDialog = document.querySelector('#SignInBox');

    const openSignInDialog = () => {
        SignInDialog.showModal();
    }

    const openModal = () => {
        window.scrollTo({ top: 0, left: 0});
        document.querySelector('.add-item-modal-wrapper').style.display = 'unset';
        document.querySelector('body').style.overflowY = 'hidden';
    }



    return (
        <div className="controls-box">
            <h1>Sharing is caring.</h1>
            <SignedIn>
                <button type="button" onClick={openModal}>Add Recipe</button>
            </SignedIn>
            
            <SignedOut>
                <button type="button" onClick={openSignInDialog}>Sign In</button>
            </SignedOut>

        </div>
    );
  }