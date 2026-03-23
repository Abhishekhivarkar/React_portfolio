import React, { useEffect, useState } from "react";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const Project = ({ project, setPreview }) => {
  const navigate = useNavigate();
  const techStack = project?.techStack || [];

  return (
    <div
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-xl border border-neutral-800 hover:border-sky-500 transition duration-300 bg-neutral-900/40 backdrop-blur-md hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setPreview(project.thumbnail)}
      onMouseLeave={() => setPreview(null)}
      onClick={() => navigate(`/project/${project._id}`)}
    >
      <div className="max-w-xl">
        <h2 className="text-2xl font-semibold text-white">{project?.name}</h2>

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

        <p className="text-neutral-400 mt-3">
          {project?.description?.slice(0, 100)}...
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/project/${project._id}`);
        }}
        className="flex items-center gap-2 mt-4 sm:mt-0 text-sky-400 hover:text-sky-300 transition"
      >
        More Details →
      </button>
      
    </div>
  );
};

const ProjectsList = ({ showMoreButton = true }) => {

  const { handleGetAllProjects, projects, loading } = usePortfolio();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });

const fetched = useRef(false);

useEffect(() => {
  if (!fetched.current) {
    handleGetAllProjects();
    fetched.current = true;
  }
}, []);
  // cursor tracking
  useEffect(() => {

    const move = (e) => {
      cursorX.set(e.clientX + 10);
      cursorY.set(e.clientY + 10);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);

  }, []);

const displayedProjects = showMoreButton
  ? projects.filter(p => p.featured).slice(0, 3)   
  : projects;                                      

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <section className="max-w-5xl mx-auto py-20">

      <h1 className="text-4xl font-bold mb-12 text-white">
        My Selected Projects
      </h1>

      <div className="space-y-6">
        {displayedProjects.map((project) => (
          <Project
            key={project._id}
            project={project}
            setPreview={setPreview}
          />
        ))}
      </div>

      {/* Hover Preview */}
      {preview && (
        <motion.img
          src={preview}
          className="fixed top-0 left-0 w-80 h-56 object-cover rounded-lg shadow-2xl pointer-events-none z-50"
          style={{
            x: springX,
            y: springY
          }}
        />
      )}

      {showMoreButton && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/projects")}
            className="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
          >
            Show More Projects
          </button>
        </div>
      )}

    </section>
  );
};

export { ProjectsList };
export default Project;