import { useEffect, useState } from "react";
import Project from "../Components/Project";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useNavigate } from "react-router-dom";

const Projects = () => {

  const { projects, handleGetAllProjects, loading } = usePortfolio();
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    handleGetAllProjects();
  }, []);

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  if (loading) return <p>Loading...</p>;

  const featuredProjects = projects.filter(p => p.featured).slice(0,3);

  return (
    <section onMouseMove={handleMouseMove} className="relative c-space mb-5">

      <h2 className="text-heading">My Selected Projects</h2>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />

      {/* Projects */}
      <div className="space-y-6 mt-10">
        {featuredProjects.map((project) => (
          <Project
            key={project._id}
            project={project}
            setPreview={setPreview}
          />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/projects")}
          className="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
        >
          Show More Projects
        </button>
      </div>

      {/* Preview Image */}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
          alt="Project preview"
        />
      )}

    </section>
  );
};

export default Projects;