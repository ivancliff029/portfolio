"use client"
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HalfScreen from '../Components/HalfScreen';

interface ProjectBoxProps {
  imageUrl: string;
  description: string;
  githubLink?: string;
  deploymentLink?: string;
  category: string;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({ imageUrl, description, githubLink, deploymentLink, category }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col h-full mx-2">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageUrl}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-md"
          alt="Project"
        />
      </div>
      <p className="text-lg mb-4 flex-grow">{description}</p>
      <div className="flex mt-auto">
        {githubLink && (
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 flex items-center mr-4">
            GitHub <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.419 2.865 8.17 6.839 9.488.5.093.683-.217.683-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.37-1.344-3.37-1.344-.454-1.153-1.108-1.461-1.108-1.461-.906-.618.069-.605.069-.605 1.003.07 1.531 1.03 1.531 1.03.892 1.528 2.34 1.087 2.913.83.091-.644.349-1.087.634-1.338-2.22-.252-4.556-1.11-4.556-4.94 0-1.092.39-1.984 1.032-2.682-.103-.253-.448-1.27.098-2.647 0 0 .84-.268 2.75 1.025a9.55 9.55 0 012.496-.335c.847.002 1.698.113 2.496.335 1.908-1.293 2.746-1.025 2.746-1.025.547 1.377.202 2.394.1 2.647.642.698 1.03 1.59 1.03 2.682 0 3.839-2.34 4.685-4.567 4.933.359.309.678.919.678 1.853 0 1.338-.012 2.414-.012 2.743 0 .268.18.579.688.482C17.138 18.166 20 14.415 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
          </a>
        )}
        {deploymentLink && (
          <a href={deploymentLink} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 flex items-center">
            Deploy <span role="img" aria-label="Deploy icon" className="ml-1">🚀</span>
          </a>
        )}
      </div>
    </div>
  );
};

interface CustomArrowProps {
  direction: 'next' | 'prev';
  onClick?: () => void;
}

const CustomArrow: React.FC<CustomArrowProps> = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none hover:bg-blue-600 transition-colors ${
        direction === 'next' ? 'right-4' : 'left-4'
      }`}
    >
      {direction === 'next' ? '→' : '←'}
    </button>
  );
};

interface Project {
  imageUrl: string;
  description: string;
  githubLink?: string;
  deploymentLink?: string;
  category: string;
}

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const projects: Project[] = [
    {
      imageUrl: "/img/lei.webp",
      description: "LEI Engineering and Survey of Oregon",
      category: "Wordpress",
      deploymentLink: "https://leiengineering.com"
    },
    {
      imageUrl: "/img/banner.jpg",
      description: "Debt Tracker Application designed in Python",
      githubLink: "https://github.com/ivancliff029/debt-tracker",
      category: "Python"
    },
    {
      imageUrl: "/img/journalx.png",
      description: "AI Journaling app",
      githubLink: "https://github.com/ivancliff029/journalx",
      deploymentLink: "https://journalx.vercel.app",
      category: "NextJS"
    },
    {
      imageUrl: "/img/engaato.png",
      description: "Online Sneaker shopping App",
      deploymentLink: "https://koozali.zartman.net/",
      category: "Wordpress"
    }, 
    {
      imageUrl: "/img/koozali.png",
      description: "Official Site for Koozali SME",
      githubLink: "https://github.com/ivancliff029/engaato-online",
      deploymentLink: "https://engaato-online.vercel.app",
      category: "NextJS"
    }, 
    {
      imageUrl: "/img/biashara.png",
      description: "Biashara Solutions",
      deploymentLink: "https://biasharasolutions.com",
      category: "Wordpress"
    }, 
  ];

  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter(project => project.category === selectedCategory);

  const settings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HalfScreen 
        backgroundImage="/img/portfolio.jpg" 
        heading="My Portfolio" 
      />
      <div className="flex-grow bg-white">
        <div className="flex items-center justify-between bg-gray-300 text-white px-4 py-2">
          <div className="flex items-center">
          <h1 className='m-5 text-2xl'>Check out Projects I'm managing</h1>
            <label htmlFor="category" className="mr-2 text-black">Filter by Category:</label>
            <select
              id="category"
              className="px-2 py-1 border border-gray-300 rounded-md text-black"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Wordpress">Wordpress</option>
              <option value="Python">Python</option>
              <option value="NextJS">NextJS</option>
            </select>
          </div>
        </div>
        <div className="px-4 pb-8 relative">
          <Slider {...settings}>
            {filteredProjects.map((project, index) => (
              <ProjectBox
                key={index}
                imageUrl={project.imageUrl}
                description={project.description}
                githubLink={project.githubLink}
                deploymentLink={project.deploymentLink}
                category={project.category}
              />
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import { Settings } from 'react-slick';

interface SliderSettings extends Settings {
  nextArrow?: React.ReactElement;
  prevArrow?: React.ReactElement;
}