import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedAboutMe from "./AnimatedAboutMe";

const AboutMe = () => {
  return (
    <div className="relative container mx-auto py-16 overflow-hidden">
      <AnimatedAboutMe />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8"
      >
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/3"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-48 h-48 mx-auto"
          >
            <Image
              src="/img/gravatar.png"
              alt="Your Story"
              className="rounded-full"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-2/3 bg-white rounded-lg shadow-md p-8"
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            About Odeke
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg"
          >
            I am Odeke Ivan. I'm a Computer Scientist focusing my research in AI and IOT technology. With over 5 years of experience in coding, I'm a senior developer dedicated to creating innovative solutions. I approach project development with an open mind and a commitment to excellence.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMe;