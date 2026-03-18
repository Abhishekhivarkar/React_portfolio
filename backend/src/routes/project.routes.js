import {createProject,updateProject,getAllProjects,getProjectById,deleteProject} from "../controllers/project.controller.js"
import upload from "../middlewares/upload.middleware.js"
import express from "express"
import {
 createProjectValidator,
 updateProjectValidator,
 projectIdValidator
} from "../validators/project.validator.js"

import {validate} from "../middlewares/validate.middleware.js"
const router = express.Router()

router.get("/all",getAllProjects)

router.get(
 "/:projectId",
 validate(projectIdValidator,"params"),
 getProjectById
)

router.delete(
 "/:projectId",
 validate(projectIdValidator,"params"),
 deleteProject
)

router.post(
 "/upload",
 upload.fields([
  {name:"thumbnail",maxCount:1},
  {name:"gallery"}
 ]),
 validate(createProjectValidator),
 createProject
)
 
 router.put(
 "/update/:projectId",
 validate(projectIdValidator,"params"),
 validate(updateProjectValidator),
 upload.fields([
  {name:"thumbnail",maxCount:1},
  {name:"gallery"}
 ]),
 updateProject
)
  
  
export default router