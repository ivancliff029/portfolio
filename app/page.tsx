import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import ContactForm from './Components/ContactForm';
import AboutMe from './Components/AboutMe';
import Technologies from './Components/Technologies';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white bg-cover bg-center relative" style={{ backgroundImage: `url('/img/banner.jpg')` }}>
        <h1 className="text-4xl font-bold mb-4">Welcome to My World</h1>
        <p className="text-lg">
          You are either a 0 or a 1
        </p>
        <div className="mt-8">
          <a
            href="/portfolio"
            className="bg-white text-blue-500 py-2 px-4 rounded-full font-semibold"
          >
            View Portfolio
          </a>
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
