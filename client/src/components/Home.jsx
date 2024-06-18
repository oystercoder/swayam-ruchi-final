import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cover from '../assets/cover.png';
import auth from '../assets/auth.png';
import useGetUserId from './hooks/useGetUserId';
import { useCookies } from 'react-cookie';

const Home = () => {
  const userId = useGetUserId();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies] = useCookies(['access_token']);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes');
        const data = response.data;
        setRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, []);

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userId}`);
        const data = response.data;
        setSavedRecipes(data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedRecipe();
  }, [userId]);

  const saved = async (recipeId) => {
    try {
      const response = await axios.put('http://localhost:3001/recipes', { recipeId, userId }, {
        headers: { authorization: cookies.access_token }
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      alert('Please register or login to save the recipes');
      console.log(error);
    }
  };

  const isSaved = (id) => savedRecipes && savedRecipes.includes(id);

  const getButtonText = (isSaved) => (isSaved ? 'Already Saved' : 'Save');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">Recipes</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="bg-white p-6 rounded-lg shadow-lg">
            {isSaved(recipe._id) && (
              <h2 className="text-green-500 font-semibold mb-2">Already Saved</h2>
            )}
            <div className="flex flex-col items-center mb-4">
              <div className="text-bold underline text-2xl text-gray-800 mb-2">{recipe.name}</div>
              <button
                className={`mt-2 py-2 px-4 rounded ${
                  isSaved(recipe._id) ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
                onClick={() => saved(recipe._id)}
                disabled={isSaved(recipe._id)}
              >
                {getButtonText(isSaved(recipe._id))}
              </button>
            </div>
            <h5 className="font-semibold mb-2">Ingredients</h5>
            <p className="mb-4">{recipe.ingredients}</p>
            <h4 className="font-semibold mb-2">Instructions</h4>
            <p className="mb-4">{recipe.instructions}</p>
            <img
              src={recipe.picture}
              alt={recipe.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600">Cooking time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
      {/* <img src={auth} alt="Auth" className="mt-8" /> */}
    </div>
  );
};

export default Home;
