import { Schema,model} from 'mongoose'
//create product schema
const productSchema=new Schema(
    {
        productId:{
            type:Number,
            requried:[true,"id is requried"]
        },
        productName:{
            type:String,
            minLength:[3,"minimum length is 3 chars"],
            maxLength:[10,"maximum length is 10 chars"],
        },
        brand:{
            type:String,
            minLength:[1,"minimum length is 1 chars"],
            maxLength:[10,"maximum length is 10 chars"],
        }
    },
    {
        strict:"throw",
        timestamps:true
    }
)
//create user model with that schema
export const ProductModel=model("product",productSchema)