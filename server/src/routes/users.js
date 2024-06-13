import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userModel } from '../models/Users.js';

const router=express.Router();
router.post('/register',async(req,res)=>{
    const {username,password}=req.body
    //usermodel.users.insertOne({username:"soumy",password:"1emen"})
    
   
    //const user=await usermodel.findOne({username})
   
        const user = await userModel.findOne({username});

        if (user) {
            // console.log(user); // User found
             return res.status(401).json({message:"user already exists"});
            //return res.json({message:"user exists"})
           
        } 
            
            const newpassword=await bcrypt.hash(password,10);
            const newuser=new userModel({username:username,password:newpassword})
            await newuser.save()
            res.status(200).json({ message: 'user stored succesufully' });
        
    
    
   // console.log(user)
  //  res.json(user);
})

router.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user = await userModel.findOne({username});
    if(!user)
        {
            return res.status(401).json({message:"enter valid credentials"})

        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            return res.status(401).json({message:"enter valid credentials"})
        }
        const token=jwt.sign({id:user._id},"secret")
        res.status(200).json({token,userID:user._id,message:"login success"})


})

export {router as userRouter}


export const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,"secret",(err)=>{
        if(err)return res.status(403).json({message:"invalid token"})
        next()
        
        
    })
}
    else{
        return res.status(401).json({message:"no token provided"})
    }
    
}
