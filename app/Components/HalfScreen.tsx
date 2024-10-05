import React from 'react';

interface HalfScreenProps {
  backgroundImage: string;
  heading: string;
}

const HalfScreen: React.FC<HalfScreenProps> = ({ backgroundImage, heading }) => {
  return (
    <div
      style={{
        height: '50vh',
        width: '100%',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <h1 style={{ fontSize: '3rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        {heading}
      </h1>
    </div>
  );
};

export default HalfScreen;
