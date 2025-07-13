import { Router } from "express";
import express from 'express';
import { User } from "../models/db";
import bcrypt, { genSalt } from "bcrypt"


const router = express.Router();

router.post("/signup" ,async (req ,res)=>{
    const { username, password } = req.body;

    if(!username || password ) {
        res.status(400).json({message : " input fields cant be empty"})
        return;
    }
    try{
        const Finduser = await User.findOne({
        username: username
    })
    if(Finduser){
        res.status(400).json({message:"user already exist"})
        return
    }
    const salt  = await bcrypt.genSalt(10)
    const hashedpass = bcrypt.hash(password,salt)

    const newUser = User.create({
        username: username,
        password: hashedpass
    })
    res.status(200).json({message: "user signedup"})
    }
    catch(e){
        console.log(e);
    }
})

router.post("/signin" ,(req ,res)=>{
    
})

router.post("/home" ,(req ,res)=>{
    
})

router.post("/course" ,(req ,res)=>{
    
})

router.post("/course/week" ,(req ,res) =>{
    
})

router.post("/week/content" ,(req ,res)=>{
    
})

export default router;