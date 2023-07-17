import { SignedOut, SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import styles from './signInBox.module.css';

export default function SignInBox({ dialog, setDialog }) {

    const closeSignInDialog = () => {
        setDialog(false);
    }

    useEffect(()=> {

        const SignInDialog = document.querySelector(`#SignInBox`);

        if (SignInDialog != null) {
            if (SignInDialog && dialog) SignInDialog.showModal();
            else SignInDialog.close();
        }
        

    }, [dialog])

    return (
        <dialog className={styles.box} id="SignInBox">
            <section className={styles.boxInnerWrapper}>
                <button className={styles.closeBox} onClick={closeSignInDialog}>Close</button>
                <SignedOut>
                    <SignIn/>
                </SignedOut>
            </section>
        </dialog>
    )
}