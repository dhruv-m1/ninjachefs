
import Banner from '../components/banner/banner';
import ControlBox from '../components/controlBox/controlBox';
import Library from '../components/library/library';

import FormModal from '../components/formModal/formModal';
import Card from '../components/card/card';
import { useEffect, useState } from 'react';

import SignInBox from '../components/signInBox/signInBox';
import { useRecipes } from '../providers/recipeContext';



function Index() {
  const recipes = useRecipes();
  const [dialog, setDialog] = useState(false);


 /* let banner_text = "";
  let randomIdx = 0;
  let selection = {};
  let img = "";

  if (recentRecipes.length > 0) {
    randomIdx = Math.abs(Math.round(Math.random() * (recentRecipes.length - 1)));
    selection = recentRecipes[randomIdx];
    banner_text = `${selection.desc}`;
    if (selection.img != null) {
        img = selection.img;
    }
  }*/

  return (
      <div>
          <div className="container mx-auto px-6 flex flex-col gap-y-5">
            
              <section className="flex justify-between gap-4 flex-col md:flex-row">

                  <Banner text={recipes.recent.list.length === 0 ? "" : recipes.recent.list[0].desc}/>

                  <div className="hidden lg:flex">
                    { (recipes.recent.list.length === 0) && <Card width="300px" height="275px"/>}
                    { (recipes.recent.list.length  > 0) && <Card width="300px" height="275px" name={recipes.recent.list[0].name} type={recipes.recent.list[0].diet} chef={recipes.recent.list[0].author} img={`${recipes.recent.list[0].img_url}/ncThumbnail`} obj={recipes.recent.list[0]}/>}
                  </div>
                  
                  <ControlBox setDialog={setDialog}/>
                  

              </section>

              <section id="all-recipes" className='flex flex-col gap-y-5'>

                  <h1 className='font-bold text-2xl text-ninja-blue font-poppins'>There's more to explore</h1>

                  <Library/>

              </section>
        </div>

          <FormModal/>
          <SignInBox dialog={dialog} setDialog={setDialog}/>
      </div>
  );
}

export default Index;
