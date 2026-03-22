import axios from "axios"
const api = axios.create({
    baseURL:"https://react-portfolio-rm59.onrender.com",
    withCredentials:true
})

export const createProject =async ({name,category,techStack,githubLinks,deployedLinks,description,featured,status,thumbnail,gallery}) =>{
    try{
        const formData =new FormData()

        formData.append("name",name)
        formData.append("description",description)
        formData.append("category",category)
        formData.append("featured",featured)
        formData.append("status",status)
        formData.append("thumbnail",thumbnail)
        techStack.forEach(tech=>{
            formData.append("techStack",tech)
        })
        githubLinks.forEach(links=>{
            formData.append("githubLinks",links)
        })
        deployedLinks.forEach(links=>{
            formData.append("deployedLinks",links)
        })

        if(gallery){
            for(let img of gallery){
                formData.append("gallery",img)
            }
        }

        const response = await api.post("/api/project/upload",
            formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        )

        return response.data
    }catch(err){
        console.log(err.response?.data?.message)
        return null
    }
}


export const updateProject =async ({name,category,techStack,githubLinks,deployedLinks,description,featured,status,thumbnail,gallery,projectId}) =>{
    try{
       const formData =new FormData()

       formData.append("name",name)
       formData.append("description",description)
       formData.append("featured",featured)
       formData.append("thumbnail",thumbnail)
       formData.append("category",category)
       formData.append("status",status)

       techStack.forEach(tech=>{
        formData.append("techStack",tech)
       })

       githubLinks.forEach(links=>{
        formData.append("githubLinks",links)
       })

       deployedLinks.forEach(links=>{
        formData.append("deployedLinks",links)
       })

       if(gallery){
        for(let img of gallery){
            formData.append("gallery",img)
        }
       }

       const response = await api.put(`/api/project/update/${projectId}`,
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
       )

       return response.data
    }catch(err){
        console.log(err.response?.data?.message)
        return null
    }
}

export const getAllProject =async () =>{
    try{
        const response =await api.get("/api/project/all")

        return response.data
    }catch(err){
        console.log(err.response?.data?.message)
        return null
    }
}

export const getProjectById =async ({projectId}) =>{
    try{
        const response =await api.get(`/api/project/${projectId}`)

        return response.data
    }catch(err){
        console.log(err.response?.data?.message)
        return null
    }
}

export const deleteProject =async ({projectId}) =>{
    try{
        const response =await api.delete(`/api/project/${projectId}`)
    }catch(err) {
        console.log(err.response?.data?.message)
    }
}