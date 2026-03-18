import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({

 fullName:{
  type:String,
  required:[true,"Full name is required"],
  trim:true
 },

 email:{
  type:String,
  required:[true,"Email is required"],
  lowercase:true,
  trim:true
 },

 message:{
  type:String,
  required:[true,"Message is required"],
  minlength:[10,"Message must be at least 10 characters"],
  maxlength:[500,"Message must be less than 500 characters"]
 }

},{timestamps:true})

export default mongoose.model("Contact",contactSchema)