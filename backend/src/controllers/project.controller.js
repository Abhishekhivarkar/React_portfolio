import {createProjectService,updateProjectService,getAllProjectsService,getProjectByIdService,deleteProjectService} from "../services/project.service.js"

export const createProject =async (req,res) =>{
 try{
  
  const project = await createProjectService(req.body,req.files)
  
  return res.status(201).json({
   success:true,
   message:"Project created successfully"
  })
 }catch(err){
  console.log("CREATE PROJECT API ERROR : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to create project"
  })
 }
}


export const updateProject = async (req,res) =>{
 try{
  const updateProject = await updateProjectService(req.params,req.files,req.body)
  
  res.status(201).json({
   success:true,
   message:"Project updated successfully"
  })
 }catch(err){
  console.log("UPDATE PROJECT API ERROR : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to update project"
  })
 }
}


export const getAllProjects = async (req,res) =>{
 try{
  const project = await getAllProjectsService()
  
  res.status(200).json({
   success:true,
   data:project,
   count:project.length
  })
 }catch(err){
  console.log("GET ALL PROJECTS API ERROR : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to get all project's"
  })
 }
}


export const getProjectById = async (req,res) =>{
 try{
  const project = await getProjectByIdService(req.params)
  
  res.status(200).json({
   success:true,
   data:project,
   count:project.length
  })
 }catch(err){
  console.log("GET PROJECT BY ID API ERROR : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to get project by id"
  })
}
}

export const deleteProject = async (req,res) =>{
 try{
  const project = await deleteProjectService(req.params)
  
  if(project){
   return res.status(200).json({
    success:true,
    message:"Project deleted successfully"
   })
  }
 }catch(err){
  console.log("DELETE PROJECT API ERROR : ",err)
  res.status(500).json({
   success:false,
   message:"Failed to delete project"
  })
 }
}