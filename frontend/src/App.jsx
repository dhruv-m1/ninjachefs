import './App.css';
import { RecipeProvider } from './providers/recipeContext';
import Index from './pages';

function App() {

  return (
    <div className="App">
      <RecipeProvider>
        <Index></Index>
      </RecipeProvider>
    </div>
  );
}

export default App;
