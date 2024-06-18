import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import {userRouter} from './routes/users.js'
import {recipesRouter} from './routes/recipes.js'
const app=express();
app.use(express.json())
app.use(cors())
app.use('/auth',userRouter)
app.use('/recipes',recipesRouter)

mongoose.connect("mongodb+srv://sushma:SrichapreSus192002@recipes.w21uyah.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes")
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to the database');
});

// Check for connection errors
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

//mongoose.connect("mongodb:https://localhost:27017")



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});