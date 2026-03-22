import { useEffect, useState } from "react";
import Project from "../Components/Project";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import { motion, useMotionValue, useSpring } from "framer-motion"; // "motion/react" ki jagah "framer-motion"
import { useRef } from "react";

const Projects = () => {
  const { projects, handleGetAllProjects, loading } = usePortfolio();

  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations for smooth following
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const [preview, setPreview] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const fetched = useRef(false);

useEffect(() => {
  if (!fetched.current) {
    handleGetAllProjects();
    fetched.current = true;
  }
}, []);

  // Cursor tracking with proper offset
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update motion values directly
      cursorX.set(e.clientX - 20); // Half of image width (320/2)
      cursorY.set(e.clientY - 20); // Half of image height (200/2)
      
      // Also update state for debugging if needed
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]); // Add dependencies

  // Debug: Check if values are updating
  useEffect(() => {
    const unsubscribeX = cursorX.onChange(value => {
      console.log('Cursor X:', value);
    });
    const unsubscribeY = cursorY.onChange(value => {
      console.log('Cursor Y:', value);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cursorX, cursorY]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white">Loading...</div>
    </div>
  );

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className="relative c-space mb-5">
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

      {/* Preview Image - Fixed version */}
      {preview && (
        <motion.div
          className="fixed top-0 left-0 z-50 pointer-events-none"
          style={{
            x: springX,
            y: springY,
            position: 'fixed',
            willChange: 'transform'
          }}
        >
          <motion.img
            src={preview}
            alt="Project preview"
            className="w-80 h-56 object-cover rounded-lg shadow-2xl border-2 border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      )}

      {/* Debug info - remove in production */}
      {/* <div className="fixed bottom-4 left-4 text-white bg-black/50 p-2 rounded">
        Mouse: {mousePosition.x}, {mousePosition.y}
      </div> */}
    </section>
  );
};

export default Projects;