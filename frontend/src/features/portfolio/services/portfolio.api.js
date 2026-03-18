import axios from "axios"
const api = axios.create({
    baseURL:"http://localhost:5001",
    withCredentials:true
})

export const createProject =async ({name,category,techStack,githubLinks,deployedLinks,description,featured,status}) =>{
    try{
        const response =await api.post("/api/project/upload",{
            name,category,techStack,githubLinks,deployedLinks,description,featured,status
        })

        return response.data
    }catch(err){
        console.log(err.response?.data?.message)
        return null
    }
}


export const updateProject =async ({name,category,techStack,githubLinks,deployedLinks,description,featured,status,projectId}) =>{
    try{
        const response =await api.put(`/api/project/update/${projectId}`,{name,category,techStack,githubLinks,deployedLinks,description,featured,status,projectId})

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