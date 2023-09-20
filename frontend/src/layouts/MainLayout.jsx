/*
    This layout encapsulates all main pages in the app.
*/

import Dialog from "../components/communication/Dialog/dialog";
import Footer from "../components/navigation/Footer";
import Header from "../components/navigation/Header";
import { DialogProvider } from "../providers/dialogContext";

const MainLayout = ({ children }) => {

    return (
        <div className="container mx-auto px-6">
            <Header/>

            <DialogProvider>
                {children}
                <Dialog/>
            </DialogProvider>

            <Footer/>
        </div>
    )

}

export default MainLayout;