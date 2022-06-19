import { useSelector } from 'react-redux';

export default function RecipeModal() {

    const { display } = useSelector(state => state.recipeBook);

    const closeModal = () => {
        document.querySelector('.recipe-modal-wrapper').style.display = 'none';
        document.querySelector('body').style.overflowY = 'unset';
    }

    const ingredients = display.preplist.map((ingredient, i) => {

        return <li key={i}>{ingredient}</li>
    
    });

    const proceedure = display.steps.map((step, i) => {

        return <li key={"s"+i}>{step}</li>
    
    });

    return (

        <div className="recipe-modal-wrapper">
            <section id="page-title-banner">

                <h1>Recipe</h1>
                <input className="red-btn btn btn-spl" type="button" value="Close" onClick={closeModal}/>
            </section>

            <article>
            
                <h2>{display.name}</h2>

                <p>{display.chef}</p>

                <p>Cooking Time: {display.preptime} mins</p>

                <p>The recipe is suitable for people with {display.type} dietary requirements.</p>

                <h3>Ingredients</h3>

                <ol>{ingredients}</ol>

                <h3>Steps</h3>

                <ol>{proceedure}</ol>
            </article>
        </div>
    );
  }