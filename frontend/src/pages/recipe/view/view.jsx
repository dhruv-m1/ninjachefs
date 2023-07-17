import { useEffect, useState } from 'react';
import { useRecipes } from '../../../providers/recipeContext';
import { useParams } from "react-router-dom";

export default function ViewRecipe(props) {

    const recipes = useRecipes();
    let { idx } = useParams(); 

    let [currentRecipe, setCurrentRecipe] = useState({});

    const deleteAction = async() => {

        recipes.delete({idx: currentRecipe._id})
        alert('Deleted');
    }

    useEffect(()=> {
        
        const loadRecipe = async() => {
            setCurrentRecipe(await recipes.getSpecific(idx));
        }

        loadRecipe();

    }, [])

    return (

        <div className="grid-container">
            <section id="page-title-banner">

                <h1>Recipe</h1>
                <input className="red-btn btn btn-del" type="button" value="Delete" onClick={deleteAction}/>
            </section>

            <article className='padded'>
            
                {
                    currentRecipe['_id'] ? 
                    (
                        <>
                        <h2>{currentRecipe.name}</h2>

                        <p>{currentRecipe.chef}</p>

                        <p>Cooking Time: {currentRecipe.preptime} mins</p>

                        <p>The recipe is suitable for people with {currentRecipe.type} dietary requirements.</p>

                        <h3>Ingredients</h3>

                        <ul>
                            {currentRecipe.preplist.map((ingredient, i) => (
                                <li key={`${currentRecipe._id}-preplist-${i}`}>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>

                        <h3>Steps</h3>

                        <ol>
                            {currentRecipe.steps.map((step, i) => (
                                <li key={`${currentRecipe._id}-step-${i}`}>
                                    {step}
                                </li>
                            ))}
                        </ol>
                        </>
                    ) : ""
                }
            </article>
        </div>
    );
  }