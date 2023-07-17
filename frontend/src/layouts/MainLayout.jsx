/*
    This layout encapsulates all main pages in the app.
*/

import Header from "../components/header/header";

const MainLayout = ({ children }) => {

    return (
        <div className="TEST">
            <div className="padded">
                <Header/>
            </div>

            {children}


        </div>
    )

}

export default MainLayout;