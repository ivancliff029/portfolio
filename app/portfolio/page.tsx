import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

type ProjectBoxProps = {
  imageUrl: string;
  description: string;
  githubLink: string;
};

const ProjectBox: React.FC<ProjectBoxProps> = ({ imageUrl, description, githubLink }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <img src={imageUrl} alt="Project" className="w-full h-40 object-cover mb-4 rounded-md" />
      <p className="text-lg mb-2">{description}</p>
      <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        GitHub Link <span role="img" aria-label="GitHub icon">👉</span>
      </a>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-blue-300 text-white">
        <h1 className="text-4xl font-bold mb-4 mt-4">Portfolio</h1>
      </div>
      <h1 className='m-5'>Check out Projects I'm managing</h1>
      <div className="flex flex-col items-center h-screen">
        <div className="flex flex-wrap justify-center mt-5">
          <ProjectBox
            imageUrl="/img/lei.webp"
            description="Official website for LEI Engineering and Survey of Oregon"
            githubLink="https://leiengineering.com"
          />
          <ProjectBox
            imageUrl="/img/banner.jpg"
            description="Debt Tracker Application designed in Python"
            githubLink="https://github.com/ivancliff029/debt-tracker"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
