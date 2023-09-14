
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

  return (
      <div>
          <div className="flex flex-col gap-y-5">
            
              <section className="flex justify-between gap-4 flex-col md:flex-row">

                {
                  recipes.recent.list.length === 0 ?

                  <Banner/>

                  :

                  <Banner

                  author={recipes.recent.list[0].author}
                  id={recipes.recent.list[0]._id}
                  name={recipes.recent.list[0].name}
                  text={recipes.recent.list[0].desc}
                  
                  />
                }
                  

                  <div className="hidden lg:flex">
                    <div className='w-[300px] h-[275px]'>
                    { (recipes.recent.list.length === 0) && <Card width="300px" height="275px"/>}
                    { (recipes.recent.list.length  > 0) && <Card name={recipes.recent.list[0].name} type={recipes.recent.list[0].diet} chef={recipes.recent.list[0].author} img={`${recipes.recent.list[0].img_url}/ncThumbnail`} obj={recipes.recent.list[0]}/>}
                    </div>
                  </div>
                  
                  <ControlBox/>
                  

              </section>

              <section id="all-recipes" className='flex flex-col gap-y-5'>

                  <h1 className='font-bold text-2xl text-ninja-blue font-poppins'>There's more to explore</h1>

                  <Library/>

              </section>
        </div>

      </div>
  );
}

export default Index;
