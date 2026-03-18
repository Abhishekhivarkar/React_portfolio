import Joi from "joi"

export const createContactValidator = Joi.object({

 fullName: Joi.string()
  .trim()
  .min(3)
  .max(50)
  .required()
  .messages({
   "string.empty":"Full name is required",
   "string.min":"Full name must be at least 3 characters",
   "string.max":"Full name must be less than 50 characters"
  }),

 email: Joi.string()
  .trim()
  .email()
  .required()
  .messages({
   "string.empty":"Email is required",
   "string.email":"Please enter a valid email"
  }),

 message: Joi.string()
  .trim()
  .min(10)
  .max(500)
  .required()
  .messages({
   "string.empty":"Message is required",
   "string.min":"Message must be at least 10 characters",
   "string.max":"Message must be less than 500 characters"
  })

})