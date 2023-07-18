import './App.css';
import Index from './pages/Index';
import { RecipeProvider } from './providers/recipeContext';

import ViewRecipe from './pages/recipe/view/view';
import MainLayout from './layouts/MainLayout';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AddRecipe from './pages/recipe/add/add';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {

  return (
    <div className="App">
      <ClerkProvider publishableKey={clerkPubKey}>
        <RecipeProvider>
          <BrowserRouter>
            <MainLayout>
              <Routes>
                <Route index element={<Index/>} />
                <Route path='/recipe/view/:idx' element={<ViewRecipe/>} />
                <Route path='/recipe/add' element={<AddRecipe/>} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </RecipeProvider>
      </ClerkProvider>
    </div>
  );
}

export default App;
