import { useEffect } from "react";
import { useRecipes } from "../../../providers/recipeContext"
import { useUser } from "@clerk/clerk-react";

import CardGrid from '../../../components/recipe_discovery/CardGrid';

export default function AccountMyRecipes() {

    const userData = useUser();
    const recipes = useRecipes();

    return (

        <main className="font-poppins min-h-[69vh]">
            
            <div className="bg-ninja-blue h-24 w-full absolute right-0 z-0" aria-hidden />

            <section className="flex flex-col justify-center h-24 text-white font-bold text-xl">
                <h1 className="z-10">{userData.user.firstName}'s Recipes</h1>
            </section>

            <section className="py-5 flex flex-col gap-5">
                <h2 className="font-bold text-xl text-ninja-blue">Recently shared by you</h2>

                <CardGrid 
                    list={recipes.recent.userList}
                    total={recipes.recent.userCount} 
                    initFunction={recipes.recent.getForUser}
                    loadMoreFunction={recipes.recent.loadMoreForUser}
                    noResultMessage="You haven't shared any recipes yet 👀"
                />

            </section>

        </main>

    );
  }