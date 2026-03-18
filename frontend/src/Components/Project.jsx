import React, { useEffect, useState } from "react";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import { useNavigate } from "react-router-dom";

const Project = ({ project, setPreview }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(project.thumbnail)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl">{project.name}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {project.techStack?.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>

        {/* More Details button */}
        <button
          onClick={() => navigate(`/project/${project._id}`)}
          className="flex items-center gap-1 cursor-pointer hover-animation"
        >
          More Details
          <img src="/assets/arrow-right.svg" className="w-5" alt="arrow" />
        </button>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
    </>
  );
};

const ProjectsList = () => {
  const { handleGetAllProjects, projects, loading } = usePortfolio();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProjects();
  }, []);

  // Filter only featured projects & limit to 3
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  if (loading) return <p>Loading projects...</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8">My Selected Projects</h1>

      {featuredProjects.map((project) => (
        <Project key={project._id} project={project} setPreview={setPreview} />
      ))}

      {preview && (
        <div className="fixed top-10 right-10 w-48 h-48 border border-gray-600">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover preview-image"
          />
        </div>
      )}

      <button
        onClick={() => navigate("/projects")} // Navigate to all projects page
        className="mt-8 px-6 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
      >
        Show More
      </button>
    </section>
  );
};

export default ProjectsList;