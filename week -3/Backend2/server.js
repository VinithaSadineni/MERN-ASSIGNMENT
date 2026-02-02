import exp from 'express'
import { userApp } from './APIs/UserAPI.js'
import { productApp } from './APIs/ProductAPI.js'
import { connect } from 'mongoose'
import cookieParser from "cookie-parser"
const app=exp()
//connect to db server
async function connectDB(){
    try{
    await connect('mongodb://localhost:27017/anuragdb2')
    console.log("DB connection successful")
    }catch(err){
        console.log("DB connection failed",err)
    }
    }
connectDB()
const port=4000
app.use(exp.json())
// add cookie parser middleware
app.use(cookieParser())
app.listen(port,()=>console.log("server is running on port 4000...."))
//if path starts with /user-api,forward req ro userApp
app.use("/user-api",userApp)
app.use("/products-api",productApp)


//error handling middleware
app.use((err,req,res,next)=>{
    res.status(500).json({message:"error",reason:err.message})
})