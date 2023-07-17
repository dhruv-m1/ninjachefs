import Banner from '../components/banner/banner';
import ControlBox from '../components/controlBox/controlBox';
import Library from '../components/library/library';

import FormModal from '../components/formModal/formModal';
import Card from '../components/card/card';
import { useEffect, useState } from 'react';

import SignInBox from '../components/signInBox/signInBox';
import { useRecipes } from '../providers/recipeContext';

import './Index.css'

function Index() {
  const recipe = useRecipes();
  const [recentRecipes, setRecentRecipies] = useState([]);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    const loadRecipes = async() => {
        setRecentRecipies(await recipe.get());
    }
    loadRecipes()
  },[])

  useEffect(() => {
    console.log(dialog);
  }, [dialog])


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
      <div>
          <div className="grid-container padded">
            
              <section id="featured-section">

                  <Banner text={banner_text}/>

                  <div className="card-wrapper">
                      { (recentRecipes.length > 0) && <Card width="100%" height="100%" name={selection.name} type={selection.type} chef={selection.chef} img={img} obj={selection}/>}
                  </div>
                  
                  <ControlBox setDialog={setDialog}/>
                  

              </section>

              <section id="all-recipes">

                  <h1>There's more to explore</h1>

                  <Library/>

              </section>
        </div>

          <FormModal/>
          <SignInBox dialog={dialog} setDialog={setDialog}/>
      </div>
  );
}

export default Index;
