import React from 'react';
import './spinner.css';

const Spinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Loading Blogs...</h2>
    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
