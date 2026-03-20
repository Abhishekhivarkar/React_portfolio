import React, { useEffect } from "react";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import { useParams } from "react-router-dom";
import { 
  FiGithub, 
  FiExternalLink, 
  FiCalendar, 
  FiTag,
  FiCode,
  FiImage,
  FiArrowLeft
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { handleGetProjectById, project, loading } = usePortfolio();

  useEffect(() => {
    if (projectId) {
      handleGetProjectById(projectId);
    }
    window.scrollTo(0, 0);
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
          <p className="text-neutral-400 mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <FiArrowLeft /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const techStack = project.techStack || [];
  const githubLinks = project.githubLinks || [];
  const deployedLinks = project.deployedLinks || [];
  const gallery = project.gallery || [];

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'completed': return 'from-green-500 to-emerald-500';
      case 'in progress': return 'from-yellow-500 to-orange-500';
      case 'planned': return 'from-blue-500 to-indigo-500';
      default: return 'from-sky-500 to-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-purple-500/10 blur-3xl"></div>
        
        <div className="relative">
          {/* Title and Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {project.name}
            </h1>
            
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-full text-neutral-300">
                <FiTag className="text-sky-400" />
                {project.category}
              </span>
              
              <span className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full text-white`}>
                <FiCalendar />
                {project.status}
              </span>
            </div>
          </motion.div>

          {/* Thumbnail */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mb-12 rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60"></div>
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-8 bg-gradient-to-b from-sky-500 to-purple-500 rounded-full"></span>
                  About The Project
                </h2>
                <p className="text-neutral-300 leading-relaxed text-lg">
                  {project.description}
                </p>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                  <FiCode className="text-sky-400" />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300 hover:border-sky-500/50 hover:bg-neutral-700/50 transition-all cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar - 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Quick Info Card */}
              <div className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-neutral-400">
                    <FiTag className="text-sky-400" />
                    <span>Category: <span className="text-white">{project.category}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400">
                    <FiCalendar className="text-purple-400" />
                    <span>Status: <span className="text-white">{project.status}</span></span>
                  </div>
                </div>
              </div>

              {/* Links Card */}
              {(githubLinks.length > 0 || deployedLinks.length > 0) && (
                <div className="bg-neutral-800/30 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Project Links</h3>
                  <div className="space-y-3">
                    {githubLinks.map((link, index) => (
                      <a
                        key={`github-${index}`}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-all group"
                      >
                        <span className="flex items-center gap-2">
                          <FiGithub className="text-neutral-400 group-hover:text-white transition-colors" />
                          <span className="text-neutral-300 group-hover:text-white transition-colors">
                            GitHub {githubLinks.length > 1 ? `(${index + 1})` : ''}
                          </span>
                        </span>
                        <FiExternalLink className="text-neutral-500 group-hover:text-white transition-colors" />
                      </a>
                    ))}

                    {deployedLinks.map((link, index) => (
                      <a
                        key={`demo-${index}`}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 rounded-lg transition-all group"
                      >
                        <span className="flex items-center gap-2 text-white">
                          <FiExternalLink />
                          <span>Live Demo {deployedLinks.length > 1 ? `(${index + 1})` : ''}</span>
                        </span>
                        <FiExternalLink className="text-white/80 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
                <FiImage className="text-purple-400" />
                Project Gallery
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {gallery.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl border border-neutral-800 hover:border-sky-500/50 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
                    <img
                      src={img}
                      alt={`${project.name} - ${index + 1}`}
                      className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;