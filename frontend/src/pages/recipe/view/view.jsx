import { useEffect, useState } from 'react';
import { useRecipes } from '../../../providers/recipeContext';
import { useParams } from "react-router-dom";

import { useUser } from '@clerk/clerk-react';

export default function ViewRecipe() {

    const recipes = useRecipes();
    const userData = useUser();
    let { idx } = useParams(); 

    let [currentRecipe, setCurrentRecipe] = useState({});
    let [user, setUser] = useState({id: "unset"});

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

    useEffect(() => {
        
        if (userData.user) setUser(userData.user);

    }, [userData])

    return (

        <div className="flex flex-col">
            
            <section className='flex bg-ninja-blue'>
                <section className='grow flex items-center pl-[7vw] text-white'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold font-poppins text-xl'>{currentRecipe.name}</h1>
                        <h2 className='font-medium font-poppins text-lg italic'>By {currentRecipe.chef}</h2>
                    </div>
                    {
                        (user.id === currentRecipe.owner) ?
                        (<input className="red-btn btn btn-del" type="button" value="Delete" onClick={deleteAction}/>)
                        :
                        ("")
                    }
                </section>

                <section className='bg-slate-300 h-[37vh] w-[55%] bg-cover bg-center' style={{backgroundImage: `url('${currentRecipe.img}')`}}>
                </section>
            </section>
            
            <section className='pl-[7vw] flex relative top-[-25px] gap-3 font-poppins'>
                <div className='shadow-ninja bg-white py-2 px-3 rounded-2xl'>
                    <p className='font-semibold capitalize'>{currentRecipe.preptime} mins</p>
                </div>
                <div className='shadow-ninja bg-white py-2 px-3 rounded-2xl'>
                    <p className='font-semibold capitalize'>{currentRecipe.type}</p>
                </div>
            </section>
            <article className='container mx-auto flex flex-col gap-4'>
            
                {
                    currentRecipe['_id'] ? 
                    (
                        <>

                        <h3 className='text-ninja-blue font-bold text-2xl'>Ingredients</h3>

                        <ul className='flex flex-wrap gap-x-6 gap-y-3 font-poppins'>
                            {currentRecipe.preplist.map((ingredient, i) => (
                                <li className="text-ninja-blue font-medium text-md bg-white 
                                border-2 border-ninja-blue/25 border-dashed
                                shadow-chef py-5 px-3 text-center min-w-[175px] rounded-2xl" 
                                key={`${currentRecipe._id}-preplist-${i}`}>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>

                        <h3 className='text-ninja-blue font-bold text-2xl'>Steps</h3>

                        <ol className='flex flex-wrap flex-col gap-x-6 gap-y-3 text-ninja-blue font-poppins'>
                            {currentRecipe.steps.map((step, i) => (

                                <div className='bg-white shadow-chef mt-3 py-5 px-3 max-w-[50%] rounded-[30px] flex items-center gap-3 border-s-2 border-ninja-blue'>
                                    <div className='bg-white relative t-[50%] font-medium text-2xl shadow-ninja border-2 border-[#63b890]
                                    h-[50px] w-[50px] min-w-[50px] rounded-[50%] flex justify-center items-center'>
                                        {i+1}
                                    </div>
                                    <div>
                                        <li className="font-medium text-md"  
                                        key={`${currentRecipe._id}-step-${i}`}>
                                            {step}
                                        </li> 
                                    </div>  
                                </div>
                                
                            ))}
                        </ol>
                        </>
                    ) : ""
                }
            </article>
        </div>
    );
  }