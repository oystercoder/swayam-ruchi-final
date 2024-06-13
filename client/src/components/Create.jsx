import React, { useState } from 'react'
import axios from 'axios'
import useGetUserId from '../components/hooks/useGetUserId'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Create =() => {
  const userID=useGetUserId()

  const navigate=useNavigate();
   console.log(userID)
   const [cookies, _] = useCookies(["access_token"]);
  const [recipe,setRecipe]=useState({
    name:"",
    ingredients:[],
    instructions:"",
    picture:"",
    cookingTime:0,
    userOwner:userID
  })
  const run=async(event)=>{
    event.preventDefault();
    try{
     
    await axios.post('http://localhost:3001/recipes',recipe,{
      headers:{authorization:cookies.access_token}
    })
    {
    // res.status(200).json("successfully submitted")
    
      alert("recipe created successfully");
      navigate('/')
    }
    
  }
  catch(error)
  {
    alert("register to create a recipe")
    console.log(error.message)
  }
    
    console.log("Button clicked");
  }
 
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setRecipe({...recipe,[name]:value})

  }
  const handleingredientsChange=(event,idx)=>{
    const {value}=event.target;
    const newIngredients=[...recipe.ingredients];
    newIngredients[idx]=value;
    setRecipe({...recipe,ingredients:newIngredients});

    // setRecipe({...recipe,[name]:value})

  }
  const add=()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})

  }

  console.log(recipe)

    
  return (

    <div>
      <h2>
        Create your recipe
      </h2>
      <form onSubmit={run} className='flex flex-col justify-center contents-center mx-20 my-20'>
        <label>Name</label>
        <input className='gap-4 border border-black p-2 ' htmlFor="name" name="name" type='text' id="name" onChange={handleChange}/>
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient,idx)=>(
          // <div key={idx}>Ingredients</div>
          <input className='gap-4 border border-black p-2 ' key={idx} type='text' name="ingredients" value={ingredient} onChange={(event)=>handleingredientsChange(event,idx)} />
          

        ))}
       <div className="flex justify-center items-center">
  <button className="bg-green-400 flex justify-center items-center rounded-full w-24 h-24" onClick={add} type="button">Add Ingredient</button>
</div>
        {/* <input className='gap-4 border border-black ' type='text' name="ingredients"  id="ingredients" onChange={handleChange}/> */}
         <label  htmlFor="instructions">Instructions</label>
         <textarea className='gap-4 border border-black w-[full] p-1' id="instructions" name="instructions" onChange={handleChange} />
         <label htmlFor='picture'>Picture Url</label>
         <input className='gap-4 border border-black p-1 ' type='text' id="picture" name="picture" onChange={handleChange} />
       
         <label htmlFor='cookingTime'>CookingTime(minutes)</label>
         <input className='gap-4 border border-black my-5 p-1' type='number' id="cookingTime" name="cookingTime" onChange={handleChange} />
          <div className="flex justify-center items-center">
          <button className=' flex justify-center content-center items-center bg-black text-white p-5 rounded-md' type='submit'>Create your Recipe</button>
          </div>
  

        
        

      </form>
      
      
    </div>
  )
}

export default Create
