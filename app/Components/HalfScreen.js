"use client"
import React, { useEffect, useState } from 'react';

const HalfScreen = ({ backgroundImage, heading, subheading, overlayOpacity = 0.4 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation effect on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-transform duration-700 ease-out"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          transform: isVisible ? 'scale(1)' : 'scale(1.05)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content Container */}
      <div className="relative h-full w-full flex flex-col justify-center items-center text-white px-4 text-center">
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transform transition-all duration-700 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          {heading}
        </h1>
        
        {subheading && (
          <p 
            className={`text-lg md:text-xl max-w-2xl text-gray-200 transform transition-all duration-700 delay-200 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            {subheading}
          </p>
        )}
        
        {/* Decorative Element */}
        <div 
          className={`w-20 h-1 bg-blue-500 mt-6 rounded-full transform transition-all duration-700 delay-400 ease-out ${
            isVisible 
              ? 'scale-x-100 opacity-100' 
              : 'scale-x-0 opacity-0'
          }`}
        />
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`w-8 h-12 rounded-full border-2 border-white/60 flex justify-center p-2 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-1 h-3 bg-white/80 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default HalfScreen;