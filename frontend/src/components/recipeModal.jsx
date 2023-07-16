import { useRecipes } from '../providers/recipeContext';

export default function RecipeModal() {

    const recipes = useRecipes();

    let display = recipes.display;

    const closeModal = () => {
        document.querySelector('.recipe-modal-wrapper').style.display = 'none';
        document.querySelector('body').style.overflowY = 'unset';
    }

    const deleteAction = async() => {

        recipes.delete({idx: display._id})
        alert('Deleted');
        closeModal();
    }

    return (

        <div className="recipe-modal-wrapper">
            <section id="page-title-banner">

                <h1>Recipe</h1>
                <input className="red-btn btn btn-del" type="button" value="Delete" onClick={deleteAction}/>
                <input className="red-btn btn btn-spl" type="button" value="Close" onClick={closeModal}/>
            </section>

            <article>
            
                {
                    display['_id'] ? 
                    (
                        <>
                        <h2>{display.name}</h2>

                        <p>{display.chef}</p>

                        <p>Cooking Time: {display.preptime} mins</p>

                        <p>The recipe is suitable for people with {display.type} dietary requirements.</p>

                        <h3>Ingredients</h3>

                        <ul>
                            {display.preplist.map((ingredient, i) => (
                                <li key={`${display._id}-preplist-${i}`}>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>

                        <h3>Steps</h3>

                        <ol>
                            {display.steps.map((step, i) => (
                                <li key={`${display._id}-step-${i}`}>
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