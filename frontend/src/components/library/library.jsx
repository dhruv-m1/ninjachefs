import Card from '../card/card';

import { useRecipes } from '../../providers/recipeContext';

export default function Library() {

    const recipes = useRecipes();
    const recentRecipes = recipes.recent;

    const defaultState = (
        <>
            <Card width="300px" height="275px"></Card>
            <Card width="300px" height="275px"></Card>
            <Card width="300px" height="275px"></Card>
        </>
    )

    const listItems = recentRecipes.map((recipe) => {

        let img = "";
        if (recipe.img != null) img = recipe.img;

        return (
            <li key={`library-recent-card-${recipe._id}`}>
                <Card 
                    width="300px" 
                    height="275px" 
                    name={recipe.name} 
                    chef={recipe.author} 
                    type={recipe.diet} 
                    img={`${recipe.img_url}/ncThumbnail`} 
                    obj={recipe}
                />
            </li>
        )
    
    });

    return (
        <div>

            <ul className='flex flex-wrap gap-4 list-none ml-0 pl-0 justify-center md:justify-start'>
                {(recentRecipes.length > 0) ? (listItems) : (defaultState)}
            </ul>

        </div>
    );
  }