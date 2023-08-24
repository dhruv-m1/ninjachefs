/*
    * Centeralised Data and State Managment for Recipes using Context API
    TODO: Improve error handling.
*/

import React, {useContext, useRef, useState} from 'react';
import { useSession } from "@clerk/clerk-react";

const RecipeContext = React.createContext();
const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const useRecipes = () => {

    return useContext(RecipeContext);

}

export const RecipeProvider = ({children}) => {

    const recipes = {};
    const { session } = useSession();

    /*! Defining Provider Services */

    recipes.recent = {}; // Provides recipe list by recency
    recipes.search = {} // Provides search results
    recipes.specific = {}; // Provides detailed object of a specific recipe
    recipes.config = {}; // Provides editable config paramenters for the provider
    recipes.io = {}; // Provides addition, deletion & edit methods for recipes

    /* Defining states & references of appliable services */

    //* Recent

    let setRecentList, setRecentCount;

    [recipes.recent.list, setRecentList] = useState([]);
    [recipes.recent.count, setRecentCount] = useState(false);

    const recent = recipes.recent;

    //* Search

    let setSearchResults, setSearchIsActive, setSearchIsPending, setSearchCount;

    [recipes.search.results, setSearchResults] = useState([]);
    [recipes.search.isActive, setSearchIsActive] = useState(false);
    [recipes.search.isPending, setSearchIsPending] = useState(false);
    [recipes.search.count, setSearchCount] = useState(false);

    recipes.search.keywords = useRef('');

    const search = recipes.search;

    //* Specific

    let setSpecific;

    [recipes.specific.state, setSpecific] = useState({});

    const specific = recipes.specific;
    
    //* Config

    recipes.config.pageLength = useRef(10);

    const config = recipes.config;

    /* Defining mehtods of applicable services */

    //* Action Service

    recipes.io.add = async(data) => {
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

                recipes.recent.get();

                resolve(data);
            } catch (error) {
                alert("Something went wrong while submitting the recipe, please try again!")
            }

        })
    }

    recipes.io.delete = async(data) => {
        return new Promise(async(resolve, reject) => {
            
            try {

                const token = await session.getToken();
                await fetch(`${BACKEND_URI}/api/v1/recipes/${data.idx}`, { method: 'DELETE', "headers": { "Authorization": `Bearer ${token}`} }).then(
                    (res) => res.json()
                )

                recipes.getRecent();
                
                resolve(data.idx);

            } catch (error) {
                
                alert("Couldn't delete recipe - please check your connection");

            }

        })

    }

    //* Recent

    recipes.recent.get = async(skip = 0, limit = config.pageLength.current, updateState = true) => {

        return new Promise(async(resolve, reject) => {

            try {

                const result = await fetch(`${BACKEND_URI}/api/v1/recipes/${skip}/${limit}`).then((raw) => raw.json())
                
                if (updateState) setRecentList(result.recipes);
                setRecentCount(result.count);

                resolve(result.recipes);

            } catch (e) {

                alert('Could not load recipes, please check your internet connection and refresh the page');
                
            }
            

        })

    }

    recipes.recent.loadMore = async() => {
        return new Promise(async(resolve) => {
            try {
                
                const results = await recipes.recent.get(recent.list.length, config.pageLength.current, false);

                console.log(recipes.recent.list.concat(results))

                setRecentList(recipes.recent.list.concat(results));

                resolve();

            } catch (error) {

                resolve();

            }
        })
    }

    //* Search
    recipes.search.query = async(query, skip = 0, limit = config.pageLength.current, updateState = true) => {

        return new Promise(async(resolve, reject) => {
    
            try {

                if (query.length < 3) {

                    setSearchResults([]);
                    setSearchIsPending(false)
                    setSearchIsActive(false)

                    search.keywords.current = "";

                    resolve(search.results);
                    return;

                }

                if (updateState) {
                    
                    setSearchIsActive(true);
                    setSearchIsPending(true);

                }
                
                const result = await fetch(`${BACKEND_URI}/api/v1/search/${skip}/${limit}?q=${query}`).then((rawData) => rawData.json())
                                
                if (updateState) {

                    setSearchIsPending(false);
                    setSearchResults(result)

                    search.keywords.current = query;
                }

                if (result.length > 0) setSearchCount(result[0].meta.count.total);
                else setSearchCount(0);

                resolve(result);

            } catch (e) {
                console.log(e);
                alert('Could not load search results, please check your internet connection and refresh the page');
                resolve(search.results)

            }
            

        })

    }

    recipes.search.loadMore = async() => {

        return new Promise(async(resolve) => {

            try {
                
                const results = await recipes.search.query(search.keywords.current, search.results.length, config.pageLength.current);

                setSearchResults(recipes.search.results.concat(results));

                resolve();

            } catch (error) {
                resolve();
            }

        })

    }

    //* Config
    recipes.config.setPageLength = (length) => {
        return new Promise(resolve => {

            config.pageLength.current = length;
            resolve();

        })
    }

    //* Specific
    recipes.specific.get = async(idx) => {

        return new Promise(async(resolve, reject) => {

            try {

                const result = await fetch(`${BACKEND_URI}/api/v1/recipes/${idx}`).then((rawData) => rawData.json())
                
                setSpecific(result);
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