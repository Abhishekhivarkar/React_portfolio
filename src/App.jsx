import Navbar from "./Sections/Navbar"
import Hero from "./Sections/Hero"
import Projects from "./Sections/Projects"
import Contact from "./Sections/Contact"
import Footer from "./Sections/Footer"
const App = () =>{
  return(
    
      <div className="container mx-auto mx-w-7xl ">
        <Navbar/>
        <Hero/>
        <Projects/>
        <Contact/>
       <Footer/>
      </div>
  
    )
}
export default App