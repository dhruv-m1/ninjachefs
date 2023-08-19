/*
    This layout encapsulates all main pages in the app.
*/

import Footer from "../components/footer/footer";
import Header from "../components/header/header";

const MainLayout = ({ children }) => {

    return (
        <div className="TEST">
            <div className="padded">
                <Header/>
            </div>

            {children}

            <div className="padded">
                <Footer/>
            </div>

        </div>
    )

}

export default MainLayout;