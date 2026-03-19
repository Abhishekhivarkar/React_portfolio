import { useEffect, useState } from "react";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";

const AdminProjects = () => {

  const {
    projects,
    handleGetAllProjects,
    handleCreateProject,
    handleUpdateProject,
    handleDeleteProject
  } = usePortfolio();

  const [editingId,setEditingId] = useState(null)

  const [form,setForm] = useState({
    name:"",
    category:"fullstack",
    techStack:"",
    githubLinks:"",
    deployedLinks:"",
    description:"",
    featured:false,
    status:"completed"
  })

  useEffect(()=>{
    handleGetAllProjects()
  },[])

  const handleChange = (e)=>{
    const {name,value,type,checked} = e.target

    setForm(prev=>({
      ...prev,
      [name]: type==="checkbox"? checked:value
    }))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const payload = {
      ...form,
      techStack:[JSON.stringify(form.techStack.split(","))],
      githubLinks:[JSON.stringify([form.githubLinks])],
      deployedLinks:[JSON.stringify([form.deployedLinks])]
    }

    if(editingId){
      await handleUpdateProject({...payload,projectId:editingId})
    }else{
      await handleCreateProject(payload)
    }

    setForm({
      name:"",
      category:"fullstack",
      techStack:"",
      githubLinks:"",
      deployedLinks:"",
      description:"",
      featured:false,
      status:"completed"
    })

    setEditingId(null)
    handleGetAllProjects()
  }

  const handleEdit = (project)=>{

    const tech = JSON.parse(project.techStack?.[0] || "[]")

    setForm({
      name:project.name,
      category:project.category,
      techStack:tech.join(","),
      githubLinks:JSON.parse(project.githubLinks?.[0] || "[]")[0],
      deployedLinks:JSON.parse(project.deployedLinks?.[0] || "[]")[0],
      description:project.description,
      featured:project.featured,
      status:project.status
    })

    setEditingId(project._id)
  }

  return (
    <div className="max-w-4xl mx-auto py-20 text-white">

      <h1 className="text-3xl font-bold mb-10">
        Manage Projects
      </h1>

      {/* Form */}

      <form onSubmit={handleSubmit} className="space-y-4 mb-16">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full p-3 bg-neutral-800 rounded"
        />

        <input
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="Tech stack (comma separated)"
          className="w-full p-3 bg-neutral-800 rounded"
        />

        <input
          name="githubLinks"
          value={form.githubLinks}
          onChange={handleChange}
          placeholder="Github link"
          className="w-full p-3 bg-neutral-800 rounded"
        />

        <input
          name="deployedLinks"
          value={form.deployedLinks}
          onChange={handleChange}
          placeholder="Live link"
          className="w-full p-3 bg-neutral-800 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Project description"
          className="w-full p-3 bg-neutral-800 rounded"
        />

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured Project
        </label>

        <button className="px-6 py-3 bg-sky-600 rounded hover:bg-sky-700">
          {editingId ? "Update Project" : "Create Project"}
        </button>

      </form>

      {/* Projects List */}

      <div className="space-y-6">

        {projects.map(project=>{

          const techStack = JSON.parse(project.techStack?.[0] || "[]")

          return(

            <div
              key={project._id}
              className="p-6 border border-neutral-800 rounded-lg flex justify-between items-center"
            >

              <div>
                <h3 className="text-xl">{project.name}</h3>

                <div className="flex gap-2 mt-2">

                  {techStack.map((tech,i)=>(
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-sky-900/40 border border-sky-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}

                </div>
              </div>

              <div className="flex gap-4">

                <button
                  onClick={()=>handleEdit(project)}
                  className="text-yellow-400"
                >
                  Edit
                </button>

                <button
                  onClick={()=>handleDeleteProject(project._id)}
                  className="text-red-400"
                >
                  Delete
                </button>

              </div>

            </div>

          )

        })}

      </div>

    </div>
  )
}

export default AdminProjects