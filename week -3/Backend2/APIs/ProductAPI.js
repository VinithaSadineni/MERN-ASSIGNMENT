import exp from 'express'
import { ProductModel } from '../models/productmodel.js'
export const productApp=exp.Router()

//read product
productApp.get("/products",async(req,res)=>{
    //read products from db 
   let productsList=await ProductModel.find()
   res.status(200).send({message:"products data",payload:productsList})
})
//create product
productApp.post("/products",async(req,res)=>{
    //get new product from req
    let newProduct=req.body;
    //crate new product docu
   let newproductDoc= new ProductModel(newProduct)
   await newproductDoc.save()
   //send response
    res.status(201).send({message:"new product created"})
})
productApp.get("/products/:id",async(req,res)=>{
    //get object id from req
    let objId=req.params.id
    //find product in db
    let productObj=await ProductModel.findById(objId)
    //send response
    res.status(200).send({message:"product data",payload:productObj})
})
productApp.put("/products/:id",async(req,res)=>{
    //get object id from url params
    let objId=req.params.id
    //get modified product from req body
    let modifiedProduct=req.body
    //make update
    let latestProduct=await ProductModel.findByIdAndUpdate(objId,
        {$set:{...modifiedProduct}},
        {new:true,runValidators:true})
    //send response
    res.status(200).send({message:"Product updated",payload:latestProduct})
})