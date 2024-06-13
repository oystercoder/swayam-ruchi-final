import mongoose from "mongoose";
 const RecipesSchema=new mongoose.Schema(
 {
    name:{
        type:String,
        required:true

    },
    ingredients:
        [
        {type:String,
        required:true
        }
        ],

    instructions:{
        type:String,
        required:true
    },
    // description:{
    //     type:String,
    //     required:true,
        

    // },
    picture:{
        type:String,
        required:true

    },
    cookingTime:{
        type:Number,
        required:true

    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true


    }


 });
 export const RecipeModel=mongoose.model("Recipes",RecipesSchema)