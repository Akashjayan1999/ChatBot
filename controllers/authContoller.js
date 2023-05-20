import userModel from "../Models/userModel.js"
import {comparePassword, hashPassword } from "../helpers/authHelpers.js"
import JWT from 'jsonwebtoken'
export const registerController =async (req,res)=>{
    try{
       const {name,email,password}= req.body
       if(!name){
          return res.send({message:'Name is Empty'})
       }
       if(!email){
           return res.send({message:'Email is Empty'})
        }
        
        if(!password){
           return res.send({message:'password is Empty'})
        }
       //existing user
        const existingUser = await userModel.findOne({email  });
         
        if(existingUser){
           return res.status(200).send({
               success:false,
               message:"Already registered please login"
           })
       }

          //register User
           const hashedPassword =await hashPassword(password)
           const user =await new userModel({name,email,password:hashedPassword}).save()
          
            res.status(201).send({
               success:true,
               message:'User Register Sucessfully',
               user,
            })
   
    }catch(error){
       console.log(error)
       res.status(500).send({
           success:false,
           message:'Error in registration',
           error
       })
    }
   }


//Login
export const loginController = async (req,res)=>{
    try {
       const {email,password} = req.body
      //validation
       if(!email || !password){
           return res.status(404).send({
               success:false,
               message:'Invalid email or password'
           })
       }
       //check user
       const user = await userModel.findOne({email})
       if(!user){
           return res.status(404).send({
               success:false,
               message:'Email is not Registered'
           })
       }
       const match =await comparePassword(password,user.password)
       if(!match){
           return res.status(200).send({
               success:false,
               message:'Invalid password'
           })
       }
       const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
       res.status(200).send({
           success:true,
           message:'login sucessfully',
           user:{
              name:user.name,
              email:user.email
           },token
       })
    } catch (error) {
       console.log(error)
       res.status(500).send({
           success:false,
           message:'Error in Login',
           error
       })
    }
   }