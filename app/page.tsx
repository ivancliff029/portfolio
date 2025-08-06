"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ContactForm from './Components/ContactForm';
import AboutMe from './Components/AboutMe';
//import Technologies from './Components/Technologies';
import NewsletterSignup from './Components/Newsletter';
import AnimatedBackground from './Components/AnimatedBackground';
import Blogs from './Components/Blogs';

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="relative h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <div className="flex w-full h-full items-center justify-center px-8">
            <motion.div
              className="max-w-md text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to My World</h1>
              <p className="text-lg md:text-2xl text-gray-300">
                You are either a 0 or a 1
              </p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a
                  href="/portfolio"
                  className="inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all"
                >
                  View My Portfolio
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <AboutMe />
      
      <NewsletterSignup />
      <ContactForm />
      <Blogs />
      <Footer />
    </>
  );
};

export default Home;