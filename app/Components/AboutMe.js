import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutMe = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 px-4 md:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative h-[450px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/img/me.png"
                alt="Odeke Ivan"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white py-4 px-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">8+ Years Experience</h3>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              About <span className="text-blue-600">Odeke</span>
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              I am Odeke Ivan, a Computer Scientist specializing in AI and IoT technology. 
              With over 8 years of programming experience, I'm dedicated to creating 
              innovative solutions that bridge the gap between theoretical concepts and 
              practical applications.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              I approach each project with an open mind, analytical thinking, and a 
              commitment to excellence, ensuring that every solution is not just 
              functional but also forward-thinking and scalable.
            </p>
            
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all duration-300"
              >
                Work with me
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;