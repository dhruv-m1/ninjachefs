/*
    This layout encapsulates all authenticated pages in the app.
*/

import Dialog from "../components/communication/Dialog";
import Footer from "../components/navigation/Footer";
import Header from "../components/navigation/Header";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate  } from "react-router-dom";

const DefaultSecuredLayout = ({ children }) => {

    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate(`/auth/signin#/?redirect_url=${encodeURIComponent(window.location.href)}`);
        }
    }, [isLoaded, isSignedIn, navigate]);

    return (
        <div className="container mx-auto px-6">
            <Header/>

                <SignedIn>
                    {children}
                    <Dialog/>
                </SignedIn>

            <Footer/>
        </div>
    )

}

export default DefaultSecuredLayout;