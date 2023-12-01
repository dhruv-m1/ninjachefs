
import Index from './pages/index.jsx';
import { RecipeProvider } from './providers/recipeContext';

import RecipeView from './pages/recipe/view/RecipeView.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn } from "@clerk/clerk-react";
import RecipeAdd from './pages/recipe/add/RecipeAdd.jsx';
import AccountMyRecipes from './pages/account/myrecipes/AccountMyRecipes.jsx';
import RecipeSubmission from './pages/recipe/submission/RecipeSubmission.jsx';
import RecipeEdit from './pages/recipe/edit/RecipeEdit.jsx';
import AuthSignIn from './pages/auth/AuthSignIn.jsx';
import AuthSignUp from './pages/auth/AuthSignUp.jsx';
import DefaultSecuredLayout from './layouts/DefaultSecuredLayout.jsx';
import DefaultLayout from './layouts/DefaultLayout.jsx';
import { DialogProvider } from './providers/dialogContext.jsx';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {

  return (
    <div className="App bg-[#FBFCFF]">
      <ClerkProvider publishableKey={clerkPubKey}>
        <RecipeProvider>
          <DialogProvider>
            <BrowserRouter>

              <Routes>

                <Route 
                  index 
                  element={
                    <DefaultLayout>
                      <Index/>
                    </DefaultLayout>
                  } 
                />

                <Route 
                  path='/recipe/view/:idx' 
                  element={
                    <DefaultLayout>
                      <RecipeView/>
                    </DefaultLayout>
                  } 
                  />

                <Route 
                  path='/recipe/add' 
                  element={
                    <DefaultSecuredLayout>
                      <RecipeAdd/>
                    </DefaultSecuredLayout>
                  } 
                />

                <Route 
                  path='/recipe/edit/:idx' 
                  element={
                    <DefaultSecuredLayout>
                      <RecipeEdit/>
                    </DefaultSecuredLayout>} 
                />

                <Route 
                  path='/recipe/submission/:idx' 
                  element={
                    <DefaultSecuredLayout>
                      <RecipeSubmission/>
                    </DefaultSecuredLayout>
                  } 
                />

                <Route 
                  path='/auth/signin' 
                  element={
                    <DefaultLayout>
                      <AuthSignIn/>
                    </DefaultLayout>
                  } 
                />

                <Route 
                  path='/auth/signup' 
                  element={
                    <DefaultLayout>
                      <AuthSignUp/>
                    </DefaultLayout>
                  } 
                />

                <Route 
                  path='/account/myrecipes' 
                  element={
                    <DefaultSecuredLayout>
                      <AccountMyRecipes/>
                    </DefaultSecuredLayout>
                  } 
                />

              </Routes>
                  
            </BrowserRouter>
          </DialogProvider>
        </RecipeProvider>
      </ClerkProvider>
    </div>
  );
}

export default App;
