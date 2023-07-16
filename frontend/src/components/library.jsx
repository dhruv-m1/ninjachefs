import Card from './card';

import { useRecipes } from '../providers/recipeContext';

export default function Library() {

    const recipes = useRecipes();
    const recentRecipes = recipes.recent;

    const listItems = recentRecipes.map((recipe, i) => {

        let img = "";
        if (recipe.img != null) {

            img = recipe.img;
            
        }

        return <li key={i}><Card name={recipe.name} chef={recipe.chef} type={recipe.type} img={img} obj={recipe}/></li>
    
    });

    return (
        <div id="card-library-wrapper">

            <ul className="card-list">
               {listItems}
            </ul>

        </div>
    );
  }