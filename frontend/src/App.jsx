import Navbar from "./Sections/Navbar"
import Hero from "./Sections/Hero"
import Projects from "./Sections/Projects"
import Contact from "./Sections/Contact"
import Footer from "./Sections/Footer"
import { PortfolioProvider } from "./features/portfolio/portfolio.context"

const App = () => {
  return (
    <PortfolioProvider>
      <div className="container mx-auto mx-w-7xl ">
        <Navbar />
        <Hero />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </PortfolioProvider>
  )
}

export default App