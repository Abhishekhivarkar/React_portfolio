import {createContact} from "../controllers/contact.controller.js"
import {createContactValidator} from "../validators/contact.validator.js"
import {validate} from "../middlewares/validate.middleware.js"
import express from "express"

const router = express.Router()

router.post(
 "/send",
 validate(createContactValidator),
 createContact
)

export default router