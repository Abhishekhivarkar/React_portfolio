import React, { useEffect } from "react";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { handleGetProjectById, project, loading } = usePortfolio();

  useEffect(() => {
    if (projectId) {
      handleGetProjectById(projectId);
    }
  }, [projectId]);

  if (loading || !project) {
    return (
      <div className="text-white text-center py-20">
        Loading Project...
      </div>
    );
  }

  const techStack = JSON.parse(project.techStack?.[0] || "[]");
  const githubLinks = JSON.parse(project.githubLinks?.[0] || "[]");
  const deployedLinks = JSON.parse(project.deployedLinks?.[0] || "[]");

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-white">

      {/* Project Title */}
      <h1 className="text-4xl font-bold mb-6">
        {project.name}
      </h1>

      {/* Thumbnail */}
      <img
        src={project.thumbnail}
        alt={project.name}
        className="w-full h-[400px] object-cover rounded-xl mb-10 border border-neutral-800"
      />

      {/* Category + Status */}
      <div className="flex gap-4 mb-6">
        <span className="px-4 py-1 bg-sky-900/40 border border-sky-700 text-sky-300 rounded-full">
          {project.category}
        </span>

        <span className="px-4 py-1 bg-green-900/40 border border-green-700 text-green-300 rounded-full">
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-neutral-300 leading-relaxed text-lg mb-10">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-6 mb-12">

        {githubLinks.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700"
          >
            View Github
          </a>
        ))}

        {deployedLinks.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 rounded-lg"
          >
            Live Demo
          </a>
        ))}

      </div>

      {/* Gallery */}
      {project.gallery?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Project Gallery
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {project.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="project"
                className="rounded-xl border border-neutral-800"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectDetails;