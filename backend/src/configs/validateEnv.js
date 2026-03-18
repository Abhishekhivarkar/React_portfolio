export const validateEnv = (config) =>{
 
  const variables = [
   "PORT",
   "MONGO_URI",
   "JWT_SECRET",
   "CLIENT_URL",
   "BREVO_API_KEY",
   "BREVO_SENDER_EMAIL",
   "CLOUDINARY_CLOUD_NAME",
   "CLOUDINARY_API_KEY",
   "CLOUDINARY_API_SECRET"
   ]
   
   variables.forEach((key)=>{
    if(!config[key]){
     throw new Error(`${key} is not defined in environment varaibles`)
    }
   })
}