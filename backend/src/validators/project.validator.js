import Joi from "joi"

/* create project validator */
export const createProjectValidator = Joi.object({

 name: Joi.string()
  .trim()
  .min(3)
  .max(100)
  .required()
  .messages({
   "string.empty":"Project name is required"
  }),

 category: Joi.string()
  .valid("frontend","backend","fullstack","system","tool")
  .required(),

 description: Joi.string()
  .max(1000)
  .allow("",null),

 techStack: Joi.alternatives().try(
  Joi.array().items(Joi.string().trim()),
  Joi.string().trim()
 ),

 githubLinks: Joi.alternatives().try(
  Joi.array().items(Joi.string().trim()),
  Joi.string().trim()
 ).required(),

 deployedLinks: Joi.alternatives().try(
  Joi.array().items(Joi.string().trim()),
  Joi.string().trim()
 ),

 featured: Joi.boolean(),

 status: Joi.string()
  .valid("completed","in-progress")

})


/* update project validator */
export const updateProjectValidator = Joi.object({

 name: Joi.string().trim().min(3).max(100),

 category: Joi.string()
  .valid("frontend","backend","fullstack","system","tool"),

 description: Joi.string().max(1000),

 techStack: Joi.alternatives().try(
  Joi.array().items(Joi.string().trim()),
  Joi.string().trim()
 ),

 githubLinks: Joi.alternatives().try(
  Joi.array().items(Joi.string().trim()),
  Joi.string().trim()
 ),

 deployedLinks: Joi.alternatives().try(
  Joi.array().items(Joi.string().trim()),
  Joi.string().trim()
 ),

 featured: Joi.boolean(),

 status: Joi.string()
  .valid("completed","in-progress")

})


export const projectIdValidator = Joi.object({

 projectId: Joi.string()
  .hex()
  .length(24)
  .required()
  .messages({
   "string.length":"Invalid project id"
  })

})