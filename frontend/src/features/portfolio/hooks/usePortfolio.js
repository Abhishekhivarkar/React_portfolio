import { createProject, updateProject, getAllProject, getProjectById, deleteProject } from "../services/portfolio.api.js";
import { PortfolioContext } from "../portfolio.context";
import { useParams } from "react-router";
import { useContext } from "react";

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  const { loading, setLoading, project, setProject, projects, setProjects } = context;
  const { projectId } = useParams();

  const handleCreateProject = async ({ name, category, techStack, githubLinks, deployedLinks, description, featured, status }) => {
    try {
      setLoading(true);
      const data = await createProject({ name, category, techStack, githubLinks, deployedLinks, description, featured, status });

      if (data && data.data) {  
        setProject(data.data);
        return data.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async ({ name, category, techStack, githubLinks, deployedLinks, description, featured, status, projectId }) => {
    try {
      setLoading(true);
      const data = await updateProject({ name, category, techStack, githubLinks, deployedLinks, description, featured, status, projectId });

      if (data && data.data) { 
        setProject(data.data);
        return data.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProject();

      if (data && data.data) { 
        setProjects(data.data);
        return data.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetProjectById = async (id) => {
    try {
      setLoading(true);
      const data = await getProjectById({ projectId: id });

      if (data && data.data) {  
        setProject(data.data);
        return data.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      setLoading(true);
      const data = await deleteProject({ projectId: id });

      if (data && data.success) {
        
        setProjects(prev => prev.filter(p => p._id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    project,
    setProject,
    projects,
    setProjects,
    handleCreateProject,
    handleUpdateProject,
    handleGetAllProjects,
    handleGetProjectById,
    handleDeleteProject,
  };
};