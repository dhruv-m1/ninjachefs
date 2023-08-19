/*
    Centeralised Data and State Managment for Recipes using Context API
*/

import React, {useContext, useState} from 'react';
import { useSession } from "@clerk/clerk-react";

const RecipeContext = React.createContext();

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const useRecipes = () => {

    return useContext(RecipeContext);

}

export const RecipeProvider = ({children}) => {
    const recipes = {};
    const [recentRecipes, setRecentRecipies] = useState([])
    const [display, setDisplay] = useState({})

    const { session } = useSession();
    recipes.recent = recentRecipes;

    recipes.display = display;

    recipes.add = async(data) => {
        return new Promise(async(resolve, reject) => {
            
            try {

                const token = await session.getToken();
                delete data.token;

                let imgObj = null;
                if (data.img != null) {

                let parition = data.img.split(";base64,");

                let format = parition[0].slice(-3);

                if (format === 'peg') {
                    
                    format = 'jpg';
                }

                imgObj = {
                    format: format,
                    img: parition[1]
                }

                data.img = null;
                }

                let res = await fetch(`${BACKEND_URI}/api/v1/recipes`, {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    "body": JSON.stringify(data)
                });

                res = await res.json()
                data._id = res._id;

                if (imgObj != null) {

                imgObj.idx = res._id;
                
                let img = await fetch(`${BACKEND_URI}/api/v1/recipes/thumbnails`, {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    "body": JSON.stringify(imgObj)
                })

                img = await img.json()
                data.img = img.url;

                }
                setRecentRecipies(recentRecipes.concat(data))
                resolve(data);
            } catch (error) {
                alert("Something went wrong while submitting the recipe, please try again!")
            }

        })
    }

    recipes.delete = async(data) => {
        return new Promise(async(resolve, reject) => {
            
            try {

                const token = await session.getToken();
                await fetch(`${BACKEND_URI}/api/v1/recipes/${data.idx}`, { method: 'DELETE', "headers": { "Authorization": `Bearer ${token}`} }).then(
                    (res) => res.json()
                )

                recipes.get();
                
                resolve(data.idx);

            } catch (error) {
                
                alert("Couldn't delete recipe - please check your connection");

            }

        })

    }

    recipes.get = async() => {

        return new Promise(async(resolve, reject) => {

            try {
                const result = await fetch(`${BACKEND_URI}/api/v1/recipes/0/10`).then((rawData) => rawData.json())
                setRecentRecipies(result);
                resolve(result);
            } catch (e) {
                alert('Could not load recipes, please check your internet connection and refresh the page');
            }
            

        })

    }

    recipes.getSpecific = async(idx) => {

        return new Promise(async(resolve, reject) => {

            try {
                const result = await fetch(`${BACKEND_URI}/api/v1/recipes/${idx}`).then((rawData) => rawData.json())
                setDisplay(result);
                resolve(result);
            } catch (e) {
                alert('Could not load recipes, please check your internet connection and refresh the page');
            }
            

        })

    }

    return (
        <RecipeContext.Provider value={recipes}>
            {children}
        </RecipeContext.Provider>
    )

}