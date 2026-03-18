import ProjectModel from "../models/Project.model.js"
import {uploadToCloudinary} from "./uploadToCloudinary.service.js"

export const createProjectService = async (data, files) =>{
 try{

  const {name,category,techStack,githubLinks,deployedLinks,description,featured,status} = data

  const project = await ProjectModel.findOne({name})

  if(project){
   throw new Error("This name is already taken")
  }

  if(!files?.thumbnail){
   throw new Error("Thumbnail is required")
  }

  const thumbnailUpload = await uploadToCloudinary(
   files.thumbnail[0],
   "project/main"
  )

  let gallery = []

  if(files?.gallery){
   for(const file of files.gallery){

    const uploadGallery = await uploadToCloudinary(
     file,
     "project/gallery"
    )

    gallery.push(uploadGallery.secure_url)
   }
  }

  const createProject = await ProjectModel.create({
   name,
   description,
   githubLinks,
   deployedLinks,
   status: status || "in-progress",
   techStack,
   category,
   thumbnail: thumbnailUpload.secure_url,
   gallery,
   featured: featured || false
  })

  return createProject

 }catch(err){
  throw err
 }
}



export const updateProjectService = async (params, file, body) =>{
 try{

  const {projectId} = params

  const isExists = await ProjectModel.findById(projectId)

  if(!isExists){
   throw new Error("Project not exists!")
  }

  const allowedFields = [
   "name",
   "description",
   "githubLinks",
   "deployedLinks",
   "status",
   "techStack",
   "category",
   "featured"
  ]

  allowedFields.forEach((field)=>{
   if(body[field] !== undefined){
    isExists[field] = body[field]
   }
  })

  if(file?.thumbnail){
   const uploadThumbnail = await uploadToCloudinary(
    file.thumbnail[0],
    "project/thumbnail"
   )

   isExists.thumbnail = uploadThumbnail.secure_url
  }

  if(file?.gallery){

   let gallery = []

   for(const files of file.gallery){
    const uploadGallery = await uploadToCloudinary(
     files,
     "project/gallery"
    )

    gallery.push(uploadGallery.secure_url)
   }

   isExists.gallery = gallery
  }

  await isExists.save()

  return isExists

 }catch(err){
  throw err
 }
}


export const getAllProjectsService =async () =>{
 try{
  const project = await ProjectModel.find()
  
  if(project.length === 0){
   throw new Error("0 project's found")
  }
  
  return project
 }catch(err){
  throw(err)
 }
}



export const getProjectByIdService =async (params) =>{
 try{
  const {projectId} = params
  const project = await ProjectModel.findById(projectId)
  
  if(!project){
   throw new Error("project not found")
  }
  
  return project
 }catch(err){
  throw(err)
 }
}

export const deleteProjectService =async (params) =>{
 try{
  const {projectId} = params
  const project = await ProjectModel.findByIdAndDelete(projectId)
  
  if(!project){
   throw new Error("project not found")
  }
  
  return project
 }catch(err){
  throw(err)
 }
}



