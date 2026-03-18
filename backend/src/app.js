import express from "express"
import cors from "cors"
import projectRoutes from "./routes/project.routes.js"
import contactRoutes from "./routes/contact.routes.js"
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/project", projectRoutes)
app.use("/api/contact", contactRoutes)

app.use("/health",(_,res)=>{
 res.status(200).json({
  success:true,
  status:"OK"
 })
})

export default app