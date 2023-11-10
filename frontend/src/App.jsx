
import Index from './pages/index.jsx';
import { RecipeProvider } from './providers/recipeContext';

import ViewRecipe from './pages/recipe/view/view.jsx';
import MainLayout from './layouts/MainLayout.jsx';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn } from "@clerk/clerk-react";
import AddRecipe from './pages/recipe/add/add.jsx';
import AccountRecipes from './pages/account/recipes';
import RecipeSubmission from './pages/recipe/submission/RecipeSubmission';
import RecipeEdit from './pages/recipe/edit/RecipeEdit.jsx';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {

  return (
    <div className="App bg-[#FBFCFF]">
      <ClerkProvider publishableKey={clerkPubKey}>
        <RecipeProvider>
          <BrowserRouter>
            <MainLayout>
              <Routes>
                <Route index element={<Index/>} />
                <Route path='/recipe/view/:idx' element={<ViewRecipe/>} />
                <Route path='/recipe/add' element={<SignedIn><AddRecipe/></SignedIn>} />
                <Route path='/recipe/edit/:idx' element={<SignedIn><RecipeEdit/></SignedIn>} />
                <Route path='/account/recipes' element={<SignedIn><AccountRecipes/></SignedIn>} />
                <Route path='/recipe/submission/:idx' element={<RecipeSubmission/>} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </RecipeProvider>
      </ClerkProvider>
    </div>
  );
}

export default App;
