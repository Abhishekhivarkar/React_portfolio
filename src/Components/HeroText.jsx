import {FlipWords} from "./FlipWords"
import {motion} from "motion/react"

const HeroText = () => {
  const words = ["Secure","Modern","Scalable"]
  const variants ={
    hidden:{opacity:0,x:-50},
    visible:{opacity:1,x:0}
  }
  return(
    <div className="z-10 mt-20 text-center md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/*desktop view */}
      <div className="md:flex hidden flex-col c-space">
        
        <motion.h1 className="text-4xl font-medium" 
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{delay:1}}
        
        >Hi i'am Abhishek</motion.h1>
        <div className="flex flex-col items-start">
          <motion.p className="text-5xl font-medium text-neutral-300"
          variants={variants}
        initial="hidden"
        animate="visible"
        transition={{delay:1.2}}
          >A Developer <br/>Dedicated to crafting </motion.p>
          <motion.div
          variants={variants}
        initial="hidden"
        animate="visible"
        transition={{delay:1.5}}
          ><FlipWords words={words} className="font-black text-white text-8xl"/></motion.div>
          <motion.p className="text-4xl font-medium text-neutral-300"
          variants={variants}
        initial="hidden"
        animate="visible"
        transition={{delay:1.8}}
          >
            Web Solutions
            
          </motion.p>
        </div>
      </div>
      
      {/*mobile view*/}

<div className="flex flex-col md:hidden space-y-6">
  <motion.p
    className="text-4xl font-medium"
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ delay: 1 }}
  >
    Hi I'm Abhishek
  </motion.p>

  <motion.p
    className="text-5xl font-black text-neutral-300"
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ delay: 1.3 }}
  >
    Building
  </motion.p>

  <motion.div
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ delay: 1.5 }}
  >
    <FlipWords words={words} className="font-bold text-white text-7xl" />
  </motion.div>

  <motion.p
    className="text-4xl font-black text-neutral-300"
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{ delay: 1.7 }}
  >
    Web Applications
  </motion.p>
</div>
    </div>
    )
}
export default HeroText