import ContactModel from "../models/Contact.model.js"
import {sendContactMail} from "./mail.service.js"
export const createContactService = async (body) =>{
 try{
  const {fullName,email,message} = body
  
  const contact = await ContactModel.create({
   fullName,
   email,
   message
  })
  
  await sendContactMail({
   fullName,
   email,
   message
  })
  
  return contact
 }catch(err){
  throw(err)
 }
}