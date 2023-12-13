import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 w-full">
        <p className="text-lg font-bold">Odeke Ivan</p>
        <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    );
  };
  
export default Footer;
  
  