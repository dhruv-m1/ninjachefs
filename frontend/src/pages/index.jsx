import Banner from '../components/banner';
import Header from '../components/header';
import ControlBox from '../components/controlBox';

import Library from '../components/library';
import FormModal from '../components/formModal';
import Card from '../components/card';
import RecipeModal from '../components/recipeModal';
import { useEffect, useState } from 'react';
import SignInBox from '../components/signInBox';
import { useRecipes } from '../providers/recipeContext';

function Index() {
  const recipe = useRecipes();
  const [recentRecipes, setRecentRecipies] = useState([])

  useEffect(() => {
    const loadRecipes = async() => {
        setRecentRecipies(await recipe.get());
    }
    loadRecipes()
  },[])


  let banner_text = "There are no recipes to display or feature.";
  let randomIdx = 0;
  let selection = null;
  let img = "";

  if (recentRecipes.length > 0) {
    randomIdx = Math.abs(Math.round(Math.random() * (recentRecipes.length - 1)));
    selection = recentRecipes[randomIdx];
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
                      { (recentRecipes.length > 0) && <Card name={selection.name} type={selection.type} chef={selection.chef} img={img} obj={selection}/>}
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

export default Index;
