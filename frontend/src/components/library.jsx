
import { useSelector } from 'react-redux';
import Card from './card';

export default function Library() {

    const { recipes } = useSelector(state => state.recipeBook);

    const listItems = recipes.map((recipe, i) => {

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