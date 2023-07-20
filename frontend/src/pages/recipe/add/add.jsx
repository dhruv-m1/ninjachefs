import { useRecipes } from "../../../providers/recipeContext"

import styles from "./formModal.module.css";

export default function AddRecipe({form, setForm}) {

    const recipes = useRecipes();

    return (
        <>
            <section>
                <h2>What are we making?</h2>
            </section>

            <section>
                <h2>Ingredients</h2>
            </section>

            <section>
                <h2>Cooking Steps</h2>
            </section>

        </>
    );
  }