import './App.css';
import Banner from './components/banner';
import Header from './components/header';

import ControlBox from './components/controlBox';
import Library from './components/library';
import FormModal from './components/formModal';
import Card from './components/card';
import { useSelector, useDispatch } from 'react-redux';
import RecipeModal from './components/recipeModal';
import { getRecipes } from './redux/recipeBook';
import { useEffect } from 'react';
import SignInBox from './components/signInBox';
import { useSession } from '@clerk/clerk-react';

function App() {

  const dispatch = useDispatch()
  const { recipes } = useSelector(state => state.recipeBook);

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])


  let banner_text = "There are no recipes to display or feature.";
  let randomIdx = 0;
  let selection = null;
  let img = "";
  console.log(recipes)
  if (recipes.length > 0) {
    randomIdx = Math.abs(Math.round(Math.random() * (recipes.length - 1)));
    selection = recipes[randomIdx];
    banner_text = `Delicious ${selection.name.toLowerCase()}. Ready in ${selection.preptime} mins only! Go check it out →`;
    if (selection.img != null) {
        img = selection.img;
    }
  }

  return (
    <div className="App">
        <div className="grid-container">

            <Header/>

            <section id="featured-section">

                <Banner text={banner_text}/>

                <div className="card-wrapper">
                    { (recipes.length > 0) && <Card name={selection.name} type={selection.type} chef={selection.chef} img={img} obj={selection}/>}
                </div>
                
                <ControlBox/>
                

            </section>

            <section id="all-recipes">

                <h1>There's more to explore</h1>

                <Library/>

            </section>

        </div>

        <FormModal/>
        <RecipeModal/>
        <SignInBox/>
    </div>
  );
}

export default App;
