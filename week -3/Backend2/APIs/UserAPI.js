import exp from 'express'
import { UserModel } from '../models/usermodel.js'
import { hash,compare } from 'bcryptjs' 
import jwt from 'jsonwebtoken'
import {verifyToken} from '../middlewares/verifyToken.js'
export const userApp=exp.Router()

//read user
userApp.get("/users",async(req,res)=>{
    //read users from db 
   let usersList=await UserModel.find()
   res.status(200).send({message:"users data",payload:usersList})
})
//create user
userApp.post("/users",async(req,res)=>{
    //get new user from req
    let newUser=req.body;
    //hash the password
  let hashedpassword=await hash(newUser.password,12)
  //replace  plain password with hashed password
  newUser.password=hashedpassword
    //crate new user docu
   let newUserDoc= new UserModel(newUser)
   await newUserDoc.save()
   //send response
    res.status(201).send({message:"new user created"})
})
//user authentication route(login)
userApp.post('/auth',async(req,res)=>{
    //get user cred obj
    let userCred=req.body
    //check for username
    let userOfDb=await UserModel.findOne({username:userCred.username})
    //if user not found
    if(userOfDb==null){
        return res.status(404).json({message:"Invalid username"})
    }
    //compare passwords
    let status=await compare(userCred.password,userOfDb.password)
    //if passwords not matched
    if(status==false){
        return res.status(404).json({message:"invalid password"})
    }
    //create sined token
    let signedToken =jwt.sign({username:userCred.username},'secret',{expiresIn:30})
    //save token as http only cookies
    res.cookie('token',signedToken,{
        httpOnly:true,//it is httponly cookie
        secure:false,
        sameSite:"lax"
    })
    //send res
    res.status(200).json({message:"login success"})
})
//read user by object id
userApp.get("/users/:id",async(req,res)=>{
    //get object id from req
    let objId=req.params.id
    //find user in db
    let userObj=await UserModel.findById(objId)
    //send response
    res.status(200).send({message:"user data",payload:userObj})

})
//update user
userApp.put("/users/:id",async(req,res)=>{
    //get object id from url params
    let objId=req.params.id
    //get modified user from req body
    let modifiedUser=req.body
    //make update
    let latestUser=await UserModel.findByIdAndUpdate(objId,
        {$set:{...modifiedUser}},
        {new:true,runValidators:true})
    //send response
    res.status(200).send({message:"user updated",payload:latestUser})
})
//delete user by id
userApp.delete("/users/:id",async(req,res)=>{
    //get object id from url params
    let objId=req.params.id
    //delete user from db
    let deletedUser=await UserModel.findByIdAndDelete(objId)
    //send response
    res.status(200).send({message:"user deleted",payload:deletedUser})
})
//test route
userApp.get("/test",verifyToken, (req,res)=>{
    res.json({mesaage:"test route"})
})