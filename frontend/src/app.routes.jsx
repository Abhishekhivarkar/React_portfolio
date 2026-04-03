import { createBrowserRouter } from "react-router-dom";
import AllProjects from "./Components/AllProjects";
import ProjectDetails from "./Components/ProjectDetails";
import Home from "./Components/Home";
import AdminProjects from "./Components/AdminProjects";
import About from "./Components/About";
export const router = createBrowserRouter([

  {
    path: "/",
    element: <Home />
  },
  {
    path: "/projects",
    element: <AllProjects />
  },
  {
    path: "/project/:projectId",
    element: <ProjectDetails />
  },
  {
    path: "/admin/projects",
    element: <AdminProjects />
  },
  {
  path: "/about",
  element: <About />
  }
]);
