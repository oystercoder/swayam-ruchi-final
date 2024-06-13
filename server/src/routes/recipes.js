import { RecipeModel } from "../models/Recipes.js";
import express from 'express'
import mongoose from "mongoose";
import { userModel } from "../models/Users.js";
import {verifyToken} from "./users.js"


const router=express.Router();
router.get("/",async(req,res)=>{
    try{
        const recipes=await RecipeModel.find();
        res.status(200).json(recipes);

    }
    catch(e)
    {
        alert("error in fetching data")
        res.status(404).json({message:"error in fetching data"});
    }
})
router.post("/",verifyToken,async(req,res)=>{
    const recipe=new RecipeModel(req.body)
    try{
        const recipes=await recipe.save();
        res.status(200).json(recipes);

    }
    catch(e)
    {
       
        res.status(404).json({message:"error in fetching data"});
    }
})
router.put("/",verifyToken, async (req, res) => {
    // Destructuring userId and recipeId from req.body
    const { userId, recipeId } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the recipe by ID
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Find the user by ID
        
        // Push the recipe to the user's savedRecipes array
        user.savedRecipes.push(recipe);

        // Save the user document
        await user.save();

        // Respond with the updated list of savedRecipes
        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/savedRecipes/ids/:userId",async(req,res)=>{
    try{
        const user=await userModel.findById(req.params.userId);
        res.json({savedRecipes:user?.savedRecipes})
    }
    catch(e){
        console.error(e);
        res.json(e);
    }

})
router.get("/savedRecipes/:userId",async(req,res)=>{
    try{
        const user=await userModel.findById(req.params.userId);
        const savedRecipes=await RecipeModel.find({
            _id:{$in:user.savedRecipes},
        })
        res.status(200).json({savedRecipes})
    }
    catch(e){
        // console.error(e);
        // res.json(e);
        res.status(400)
    }

})




export {router as recipesRouter};