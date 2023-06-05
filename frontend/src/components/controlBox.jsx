import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn,
  } from "@clerk/clerk-react";
  
export default function ControlBox() {


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
                <a href="https://apt-dassie-76.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F">
                    <button type="button">Sign In</button>
                </a>
            </SignedOut>
        </div>
    );
  }