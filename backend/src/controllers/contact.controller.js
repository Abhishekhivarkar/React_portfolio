import {createContactService} from "../services/contact.service.js"

export const createContact = async (req,res) =>{
 try{
  const contact =await createContactService(req.body)
  
  if(contact){
   return res.status(200).json({
    success:true,
    message:"Contact created successfully"
   })
  }
 }catch(err){
  console.log("CREATE CONTACT API ERROR : ",err)
  res.status(500).json({
   success:true,
   message:"failed ro create contact"
  })
 }
}