import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ComingSoon = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">Coming Soon!</h1>
        <p className="text-lg md:text-xl text-gray-700 text-center mb-12 max-w-xl">
          We're preparing something really special for you. Stay tuned for our latest blog updates!
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Sign up for updates</h2>
          <form className="flex flex-col sm:flex-row items-center justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="py-2 px-4 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto border border-gray-300 rounded-md focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComingSoon;
