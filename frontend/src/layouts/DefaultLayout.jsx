/*
    This layout encapsulates all unauthenticated pages in the app.
*/

import Dialog from "../components/communication/Dialog";
import Footer from "../components/navigation/Footer";
import Header from "../components/navigation/Header";

const DefaultLayout = ({ children }) => {

    return (
        <div className="container mx-auto px-6">

            <Header/>

            {children}
            <Dialog/>

            <Footer/>
            
        </div>
    )

}

export default DefaultLayout;