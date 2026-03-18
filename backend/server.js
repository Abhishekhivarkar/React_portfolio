import app from "./src/app.js"
import {validateEnv} from "./src/configs/validateEnv.js"
import {config} from "./src/configs/env.js"
validateEnv(config)
import {connectDB} from "./src/configs/database.js"

const PORT = config.PORT || 5000

const startServer =async (_,res) =>{
 try{
  await connectDB()
  app.listen(PORT,()=>{
   console.log("surver is running on",PORT)
  })
 }catch(err){
  console.log("START SERVER ERROR : ",err)
 }
}

startServer()