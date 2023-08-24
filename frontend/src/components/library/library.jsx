import Card from '../card/card';

import { useRecipes } from '../../providers/recipeContext';
import { useState, useEffect, useRef } from 'react';

export default function Library() {

    const recipes = useRecipes();

    let query = "";
    let cardHeight = 275;
    let cardWidth = 300;
    let container = useRef();

    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {

        const loadRecipes = async() => {

            let cardsPerRow = Math.floor(container.current.offsetWidth/(cardWidth + 16))
            recipes.config.setPageLength(cardsPerRow*2);
            await recipes.recent.get();
        }

        loadRecipes()

      },[])

    const search = (value) => {
        query = value;

        setTimeout(async() => {

            if (query === value) {
                await recipes.search.query(query);
;            }
            
        }, 700)

    }

    const loadMoreRecent = async() => {
        setLoadingMore(true);
        await recipes.recent.loadMore();
        setLoadingMore(false);
    }

    const loadMoreSearchResults = async() => {
        setLoadingMore(true);
        await recipes.search.loadMore();
        setLoadingMore(false);
    }


    const defaultState = (
        <>
            <Card width="300px" height="275px"></Card>
            <Card width="300px" height="275px"></Card>
            <Card width="300px" height="275px"></Card>
        </>
    )

    return (
        <div>

            <section className='mb-5 flex gap-8'>

                <div className='flex items-center h-10 grow bg-slate-300 text-ninja-blue font-semibold font-poppins rounded-lg py-1 px-3'>
                    <input type='search' 
                    className='h-full grow bg-white/0 focus:outline-none' 
                    placeholder='Search'
                    onChange={(e) => search(e.target.value)}/>

                    <div className='flex items-center h-10 bg-slate-300 text-ninja-blue font-medium font-poppins rounded-lg py-1 px-3'>
                        <i className="fa-solid fa-magnifying-glass fa-flip-horizontal"></i>
                    </div>

                </div>
                
                <div className='w-[600px]'></div>
            </section>

            <ul className='flex flex-wrap gap-4 list-none ml-0 pl-0 justify-center md:justify-start' ref={container}>
                
                {
                    recipes.search.isActive ?

                        (recipes.search.results.length > 0 ?
                            recipes.search.results.map((recipe) => {
        
                                return (
                                    <li key={`library-search-card-${recipe._id}`}>
                                        <Card 
                                            width={`${cardWidth}px`} 
                                            height={`${cardHeight}px`} 
                                            name={recipe.name} 
                                            chef={recipe.author} 
                                            type={recipe.diet} 
                                            img={`${recipe.img_url}/ncThumbnail`} 
                                            obj={recipe}
                                        />
                                    </li>
                                )
                            
                            }) : (recipes.search.isPending ? defaultState : "No Results"))

                        :

                        recipes.recent.list.length > 0 ?
                            recipes.recent.list.map((recipe) => {

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
                            
                            }) : defaultState
                        
                    }
                
            </ul>

            <section className='flex justify-center font-bold mt-10'>
            
            {
                (!recipes.search.isActive && recipes.recent.count > recipes.recent.list.length && !loadingMore) &&

                <button type='button' onClick={loadMoreRecent} className='bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-4 py-2'>
                    Load More
                </button>

            }
            
            {
                (recipes.search.isActive && !recipes.search.isPending && recipes.search.count > recipes.search.results.length && !loadingMore) &&

                <button type='button' onClick={loadMoreSearchResults} className='bg-slate-300 text-ninja-blue rounded-lg hover:opacity-90 cursor-pointer px-4 py-2'>
                    Load More
                </button>

            }

            {
                (loadingMore) &&

                <button type='button' disabled className='animate-bounce bg-slate-300 text-ninja-blue rounded-xl hover:opacity-90 cursor-pointer px-4 py-2'>
                    <i class="fa-solid fa-angles-down"></i>
                </button>

            }

            </section>

        </div>
    );
  }