// products Api
import exp from 'express';
export const productApp = exp.Router();
let products = [];
//get request handling route for products
productApp.get('/products', (req, res) => {
    res.status(200).json({ message: "All products", payload: products })
})
//post request handling route for products
productApp.post('/products', (req, res) => { 
    let newProduct = req.body;
    //console.log("New Product", newProduct);
    //insert new product to products array
    products.push(newProduct);
    //send response
    res.status(201).json({ message: "Product created"})
})
//put request handling route for products
productApp.put('/products', (req, res) => {
    //get modified product from request
    let modifiedProduct = req.body; 
     //find the product with id exists in array
    let prodIndex = products.findIndex(prodObj => prodObj.productId == modifiedProduct.productId);
     //if product not found,send res as "product not found"
    if (prodIndex === -1) {
        return res.status(404).json({ message: "Product not found" })
    }
    //if product found,then modify the product
    products.splice(prodIndex, 1, modifiedProduct);
    //send res as"product modified"
    res.status(200).json({ message: "Product modified" })
})
//GET by productId
productApp.get('/products-productId/:productId', (req, res) => {
    //read id from url parameter
    let prodId = Number(req.params.productId)
    //read product by this id
    let prod = products.find(prodObj => prodObj.productId === prodId);
    if (!prod) {
        return res.status(404).json({ message: "Product not found" })
    }
    return res.status(200).json({ message: "Product found", payload: prod })    
})
//GET by brand
productApp.get('/products-brand/:brand', (req, res) => { 
    //read brand from url parameter
    let brandName = req.params.brand;
    //read products by this brand
    let prodsByBrand = products.filter(prodObj => prodObj.brand === brandName);
    if (prodsByBrand.length === 0) {
        return res.status(404).json({ message: "No products found for the brand" })
    }
    return res.status(200).json({ message: "Products found", payload: prodsByBrand })
})
//delete request handling route for products
productApp.delete('/products/:productId', (req, res) => { 
    //read id from url parameter
    let prodId = Number(req.params.productId);
    //find the product with id exists in array
    let prodIndex = products.findIndex(prodObj => prodObj.productId == prodId);
    //if product not found,send res as "product not found"
    if (prodIndex === -1) {
        return res.status(404).json({ message: "Product not found" })
    }
    //delete the product
    products.splice(prodIndex, 1);
    //send response
    res.status(200).json({ message: "Product deleted" })    
})