"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ContactForm from './Components/ContactForm';
import AboutMe from './Components/AboutMe';
import Technologies from './Components/Technologies';
import AnimatedBackground from './Components/AnimatedBackground';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="relative h-screen overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <div className="flex w-full h-full items-center justify-between px-8">
            <motion.div 
              className="max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-4">Welcome to My World</h1>
              <p className="text-lg">
                You are either a 0 or a 1
              </p>
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <a
                  href="/portfolio"
                  className="bg-white text-blue-500 py-2 px-4 rounded-full font-semibold"
                >
                  View Portfolio
                </a>
              </motion.div>
            </motion.div>
            <div className="hidden md:block">
              
            </div>
          </div>
        </div>
      </div>
      <Technologies />
      <AboutMe />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;