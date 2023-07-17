import Card from '../card/card';

import { useRecipes } from '../../providers/recipeContext';

import styles from './library.module.css'

export default function Library() {

    const recipes = useRecipes();
    const recentRecipes = recipes.recent;

    const listItems = recentRecipes.map((recipe, i) => {

        let img = "";
        if (recipe.img != null) {

            img = recipe.img;
            
        }

        return <li key={i}><Card width="300px" height="275px" name={recipe.name} chef={recipe.chef} type={recipe.type} img={img} obj={recipe}/></li>
    
    });

    return (
        <div className={styles.library}>

            <ul className={styles.cardList}>
               {listItems}
            </ul>

        </div>
    );
  }