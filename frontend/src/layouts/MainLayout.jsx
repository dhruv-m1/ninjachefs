/*
    This layout encapsulates all main pages in the app.
*/

import Dialog from "../components/dialog/dialog";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
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