import React, { useEffect, useState } from "react";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import { useNavigate } from "react-router-dom";

const Project = ({ project, setPreview }) => {
  const navigate = useNavigate();

  const techStack = JSON.parse(project.techStack?.[0] || "[]");

  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-xl border border-neutral-800 hover:border-sky-500 transition duration-300 bg-neutral-900/40 backdrop-blur-md hover:-translate-y-1"
      onMouseEnter={() => setPreview?.(project.thumbnail)}
      onMouseLeave={() => setPreview?.(null)}
    >
      {/* Left */}
      <div className="max-w-xl">
        <h2 className="text-2xl font-semibold text-white">{project.name}</h2>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-3">
          {techStack.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-sky-900/40 text-sky-300 border border-sky-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-neutral-400 mt-3">
          {project.description?.slice(0, 100)}...
        </p>
      </div>

      {/* Right */}
      <button
        onClick={() => navigate(`/project/${project._id}`)}
        className="flex items-center gap-2 mt-4 sm:mt-0 text-sky-400 hover:text-sky-300 transition"
      >
        More Details →
      </button>
    </div>
  );
};

const ProjectsList = () => {
  const { handleGetAllProjects, projects, loading } = usePortfolio();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProjects();
  }, []);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  if (loading) return <p>Loading projects...</p>;

  return (
    <section className="max-w-5xl mx-auto py-20">

      <h1 className="text-4xl font-bold mb-12 text-white">
        My Selected Projects
      </h1>

      <div className="space-y-6">
        {featuredProjects.map((project) => (
          <Project
            key={project._id}
            project={project}
            setPreview={setPreview}
          />
        ))}
      </div>

      {/* Preview Image */}
      {preview && (
        <div className="fixed top-24 right-10 w-60 h-60 border border-neutral-700 rounded-xl overflow-hidden shadow-xl">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Show More Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/projects")}
          className="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
        >
          Show More Projects
        </button>
      </div>

    </section>
  );
};

export default ProjectsList;