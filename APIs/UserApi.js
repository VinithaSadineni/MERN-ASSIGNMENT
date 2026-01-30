//create API(reaquest handlers-route)
//test local in-memory data 
//create a mini express app(separate route)
import exp from 'express'
export const Userapp=exp.Router()
let users=[];
//get requeat handling route
Userapp.get('/users',(req,res)=>{
    //send users data in response
    res.status(200).json({message:"all users",payload:users})//message,payload
})
//post request handling route
Userapp.post('/users',(req,res)=>{
    let newUser=req.body;
    //console.log("New User Data:", newUser);
    //insert new user to users array
    users.push(newUser)
    //send response
    res.json({message:"user created"})
})
//put request handling route
Userapp.put('/users',(req,res)=>{
    //get modified user from request
    let modifiedUser=req.body
    //find the user with id exists in array
    let userindex=users.findIndex((user=>user.id==modifiedUser.id))
    //if user not found,send res as "user not found"
    if(userindex==-1){
      return res.status(404).json({message:"user not found"})
    }
     //if user found,then modify the user
    let deletedUser=users.splice(userindex,1,modifiedUser)
    //send res as"user modufued"
    res.status(200).json({message:"user modified"})
})
//read user by id
Userapp.get('/users/:id',(req,res)=>{
    //read id from url parameter
    let userId=Number(req.params.id)
    //read user by this id
    let user=users.find(user=>user.id==userId)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    //send response
    res.status(200).json({message:"user",payload:user})
})
//delete request handling route
Userapp.delete('/users/:id',(req,res)=>{
    //read id from url parameter
    let userId=Number(req.params.id)
    //find the user with id exists in array
    let userindex=users.findIndex((user=>user.id==userId))
    if(userindex==-1){
        return res.status(404).json({message:"user not found"})
    }
    //delete the user
    users.splice(userindex,1)
    //send response
    res.status(200).json({message:"user deleted",payload:users})
})