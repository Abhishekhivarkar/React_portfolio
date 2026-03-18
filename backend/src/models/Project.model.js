import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({

 // project name
 name:{
  type:String,
  required:[true,"Project name is required"],
  trim:true
 },

 // website thumbnail
 thumbnail:{
  type:String,
  required:[true,"Thumbnail is required"],
  trim:true
 },

 // multiple project images
 gallery:[
  {
   type:String,
   trim:true
  }
 ],

 // github repositories
 githubLinks:[
  {
   type:String,
   required:true,
   trim:true
  }
 ],

 // deployed urls
 deployedLinks:[
  {
   type:String,
   trim:true
  }
 ],

 // project description
 description:{
  type:String,
  trim:true
 },

 // tech stack
 techStack:[
  {
   type:String,
   trim:true
  }
 ],
 
 // project is featured or not
 featured:{
  type:Boolean,
  default:false
 },
 
 // project categoru
 category:{
  type:String,
  enum:["frontend","backend","fullstack","system","tool"],
  lowercase:true,
  trim:true,
  required:true
 },
 
 // project status
 status:{
  type:String,
  enum:["completed","in-progress"],
  default:"in-progress",
  lowercase:true
 }
},{
 timestamps:true
})

export default mongoose.model("Project",projectSchema)