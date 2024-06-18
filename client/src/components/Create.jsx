import React, { useState } from 'react';
import axios from 'axios';
import useGetUserId from '../components/hooks/useGetUserId';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Create = () => {
  const userID = useGetUserId();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(['access_token']);
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    picture: '',
    cookingTime: 0,
    userOwner: userID,
  });

  const run = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/recipes', recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert('Recipe created successfully');
      navigate('/');
    } catch (error) {
      alert('Register to create a recipe');
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientsChange = (event, idx) => {
    const { value } = event.target;
    const newIngredients = [...recipe.ingredients];
    newIngredients[idx] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Your Recipe</h2>
      <form onSubmit={run} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
          <input
            className="mt-1 block w-full border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            name="name"
            type="text"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, idx) => (
            <input
              key={idx}
              className="mt-1 block w-full border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientsChange(event, idx)}
            />
          ))}
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-700"
            type="button"
            onClick={addIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="instructions">Instructions</label>
          <textarea
            className="mt-1 block w-full border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            id="instructions"
            name="instructions"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="picture">Picture URL</label>
          <input
            className="mt-1 block w-full border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            id="picture"
            name="picture"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            className="mt-1 block w-full border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            id="cookingTime"
            name="cookingTime"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <button className="w-full bg-green-500 text-white py-3 rounded-md shadow-sm hover:bg-green-700" type="submit">
            Create Your Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
