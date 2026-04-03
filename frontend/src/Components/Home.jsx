import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../Sections/Navbar";
import Hero from "../Sections/Hero";
import { ProjectsList } from "../Components/Project";
import Contact from "../Sections/Contact";
import Footer from "../Sections/Footer";

export default function Home() {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(
        location.hash.replace("#", "")
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <ProjectsList />
      <Contact />
      <Footer />
    </>
  );
}
