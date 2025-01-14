import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import cover from '../assets/cover.png'
import auth from '../assets/auth.png'
import useGetUserId from './hooks/useGetUserId'
import {useCookies} from 'react-cookie'

const Saved = () => {
  const userId=useGetUserId();
  
  const [savedRecipes,setSavedRecipes]=useState([])
  const [cookies,setCookie]=useCookies(["access_token"]);
 
  // useEffect(()=>{
  //   const fetchRecipe=async()=>{
  //     try{
  //     const response=await axios.get('http://localhost:3001/recipes')
  //     const data=response.data
  //     // console.log(data)
  //     setRecipes(data)
  //     }
  //     catch(error)
  //    {
  //     console.log(error)
  //    }


  //   }
  //   fetchRecipe()


  // },[])
  useEffect(()=>{
    const fetchSavedRecipe=async()=>{
      try{
      const response=await axios.get(`http://localhost:3001/recipes/savedRecipes/${userId}`)
      const data=response.data
      
      setSavedRecipes(data.savedRecipes)
      }
      catch(error)
     {
      console.log(error)
     }


    }
    if(cookies.access_token)fetchSavedRecipe()


  },[])
  // const saved = async (recipeId) => {
  //   console.log("hello")
  //   console.log(recipeId)
  //   try {
  //     const response = await axios.put('http://localhost:3001/recipes',{recipeId,userId});
  //     setSavedRecipes(response.data.savedRecipes)
  //     // alert("recipe saved");
  //     // const data = response.data;
  //     // console.log(data);
  //     // setRecipes(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const isSaved=(id)=>{
  //   savedRecipes.includes(id);
   
  //   return savedRecipes.includes(id);

  // }
  // const value = (isSaved) => {
  //   if (isSaved) {
  //     return "Already Saved";
  //   } else {
  //     return "Save";
  //   }
  // }
  
  
  
  return (
    <>
    <div>
      {/* <img className="sm:w-fit h-fit  flex justify-center items-center md:w-[440px] h-[550px] "src="https://cdni.iconscout.com/illustration/premium/thumb/indian-house-wife-cooking-in-kitchen-2660321-2224930.png" /> */}
      
     <h1 className='bg-blue-300 '>
      Saved Recipes
      </h1>
      <ul>
       
          {savedRecipes.map((recipe)=>(
            <li key={recipe._id}>
              {/* {savedRecipes.includes(recipe._id) && <h1>Already Saved</h1>} */}
              
              <div className='flex flex-col'>
              <div className='text-bold underline text-5xl'>{recipe.name}</div>
              {console.log("lets see")}
              {/* {console.log(isSaved(recipe._id))} */}
              {/* <button className="bg-red-500" onClick={() => {saved(recipe._id)}} disabled={isSaved(recipe._id)}>Save</button> */}
              {/* <button className="bg-red-500 disabled: disabled:pointer-events-none" onClick={() => {saved(recipe._id)}} disabled={isSaved(recipe._id)}>{value(recipe._id)}</button> */}


              
            
      
              </div>
              <h5>{recipe.ingredients}</h5>
              <h4>{recipe.instructions}</h4>
              <img src={recipe.picture} alt={recipe.name} />
              <p>Cooking time:{recipe.cookingTime} minutes</p>

              

            </li>
          ))}
        
      </ul>
      <img src={auth} />
        
    </div>
    </>
  )
}


export default Saved
