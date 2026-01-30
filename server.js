//create http server
//import express module
import exp from 'express'
import {Userapp} from './APIs/UserApi.js'  
import{productApp} from './APIs/ProductApi.js'
//create server
 const app=exp()

 //assign the port number
 app.listen(4800,()=>console.log("HTTP server listening on port number 4800"))
 //body parsing middleware
 app.use(exp.json())
//forward req to Userapp when path starts with /user-api
app.use('/user-api',Userapp)
app.use('/product-api',productApp)