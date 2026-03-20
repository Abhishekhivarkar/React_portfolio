import ProjectsList from "./Project.jsx";
import { Particles } from "./Particles";

const AllProjects = () => {

  return (
    <div className="relative min-h-screen bg-[#020617]">

      <Particles
        className="fixed inset-0 -z-10"
        quantity={80}
        ease={60}
        color="#ffffff"
      />

      <ProjectsList showMoreButton={false} />

    </div>
  );
};

export default AllProjects;