// import React from 'react'
// import Navbar from '../Sections/Navbar'
// import Hero from '../Sections/Hero'
// import Projects from '../Sections/Projects'
// import Contact from '../Sections/Contact'
// import Footer from '../Sections/Footer'

// export default function Home() {
//   return (
//    <>
//     <Navbar/>
//            <Hero />
//            <Projects />
//            <Contact />
//            <Footer />
//    </>
//   )
// }

import Navbar from "../Sections/Navbar";
import Hero from "../Sections/Hero";
import { ProjectsList } from "../Components/Project";
import Contact from "../Sections/Contact";
import Footer from "../Sections/Footer";

export default function Home() {
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
