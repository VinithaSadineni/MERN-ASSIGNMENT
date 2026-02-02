import {Schema,model} from 'mongoose'
//create user schema
const userSchema=new Schema(
    {
        username:{
            type:String,
            required:[true,"username is required"],
            minLength:[4,"minimum length is 4 chars"],
            maxLength:[20,"maximum length is 20 chars"]
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        age:{
            type:Number,
            required:[true,"age is required"],
            min:[18,"minimum age is 18"],
            max:[25,"maximum age is 25"]
        }
    },
    {
        strict:"throw",
        timestamps:true
    }
)
//create user model with that schema
 export const UserModel=model("user",userSchema)
