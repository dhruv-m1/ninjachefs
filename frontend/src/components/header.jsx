import logo from './assets/logo.svg';
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn,
  } from "@clerk/clerk-react";

export default function Header() {
    return (
        <header>

            <img  id="logo" src={logo} alt="Ninja Chefs Logo"/>

            <section class="userButton">
                <UserButton></UserButton>
            </section>
            
            
        </header>
    );
  }