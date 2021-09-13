const express=require('express');
require('dotenv').config()

const User = require('../models/user');
const Resource = require('../models/resource');
const jwt=require('jsonwebtoken');

const auth=require('../middleware/auth');

const router=express.Router();












router.post('/createuser',async(req,res)=>{


    try{

        const check=await User.findOne({email:req.body.email});

        if(check){
            res.status(400).json({
                data:{
                    message:'User Already exists.Please Login'
                }
            })
        }
        const user=new User(req.body);
        console.log(user)
        const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
        user.tokens=user.tokens.concat({token})
        console.log(user);
        await user.save();
        console.log('done');
        res.status(200).json({
            data:{
                token,
                email:user.email,
                name:user.name,
                
            }
        })
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }

})

router.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try{
        const user=await User.findOne({email});
        if(!user){
            res.status(404).json({
                data:{
                    message:'User Not found.Please register first.'
                }
            })
        }
        if(user.password === password){
            const token =jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
            user.tokens=user.tokens.concat({token})
            await user.save();
            res.status(200).json({
                data:{
                    token,
                    email:user.email,
                    name:user.name,
                    
                }
            })

        }else{
            res.status(401).json({
                data:{
                    message:'Invalid Credentials'
                }
            })
        }
    }catch(err){
        res.status(500).json({
            data:err
        })
    }
})





router.post('/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.status(200).json({
            data:{
                message:'Logged out successfully'
            }
        })
    }catch(e){
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }
})








module.exports=router;