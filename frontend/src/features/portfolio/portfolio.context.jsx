import {createContext,useState} from "react"



export const PortfolioContext = createContext()

export const PortfolioProvider = ({children}) =>{

    const [loading,setLoading] = useState(false)
    const [project, setProject] = useState(null)
    const [projects, setProjects] = useState([])
    return(

        <PortfolioContext.Provider value={{loading,setLoading,project,setProject,projects,setProjects}}>
            {children}
        </PortfolioContext.Provider >

    )
}