import React from 'react';
import './spinner.css';

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <h2 className="text-2xl font-bold mb-4">Loading Blogs</h2><br />
    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin">
        
    </div>
  </div>
);

export default Spinner;