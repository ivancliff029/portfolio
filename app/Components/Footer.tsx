import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white fixed bottom-0 w-full">
    <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-center">
      <p className="text-sm text-gray-300">
        © {new Date().getFullYear()} All rights reserved. Odeke Ivan
      </p>
    </div>
  </footer>
  );
};
export default Footer;
  
  