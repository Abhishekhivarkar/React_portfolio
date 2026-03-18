import mongoose from "mongoose"
import {config} from "./env.js"
export const connectDB = async () =>{
 try{
  mongoose.connect(config.MONGO_URI)
  console.log("database connected successfully")
 }catch(err){
  console.log("CONNECT DB API ERROR : ",err)
 }
}