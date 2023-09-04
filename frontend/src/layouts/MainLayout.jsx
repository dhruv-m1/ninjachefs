/*
    This layout encapsulates all main pages in the app.
*/

import Footer from "../components/footer/footer";
import Header from "../components/header/header";

const MainLayout = ({ children }) => {

    return (
        <div className="container mx-auto px-6">
            <Header/>

            {children}

            <Footer/>
        </div>
    )

}

export default MainLayout;