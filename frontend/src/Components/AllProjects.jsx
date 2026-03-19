import { useEffect } from "react";
import { usePortfolio } from "../features/portfolio/hooks/usePortfolio";
import Project from "./Project";
import { Particles } from "./Particles";

const AllProjects = () => {

  const { projects, handleGetAllProjects, loading } = usePortfolio();

  useEffect(() => {
    handleGetAllProjects();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative min-h-screen bg-[#020617]">

      {/* Star Background */}
      <Particles
        className="fixed inset-0 -z-10"
        quantity={80}
        ease={60}
        color="#ffffff"
      />

      <section className="c-space relative z-10">

        <h1 className="text-heading mb-10">
          All Projects
        </h1>

        <div className="space-y-6">
          {projects.map((project) => (
  <Project key={project._id} project={project} />
))}
        </div>

      </section>

    </div>
  );
};

export default AllProjects;