"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Coffee, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HalfScreen from '../Components/HalfScreen';
//import BuyMeCoffeeSection from '../Components/BuyMeCoffee'

// Custom arrow component
const CustomArrow = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full w-12 h-12 flex items-center justify-center focus:outline-none hover:bg-blue-600 hover:text-white transition-all shadow-lg ${
        direction === 'next' ? 'right-4' : 'left-4'
      }`}
      aria-label={direction === 'next' ? 'Next slide' : 'Previous slide'}
    >
      {direction === 'next' ? 
        <ChevronRight className="w-6 h-6" /> : 
        <ChevronLeft className="w-6 h-6" />
      }
    </button>
  );
};

// Project card component
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] h-full mx-3 flex flex-col">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={project.imageUrl}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 hover:scale-110"
          alt={project.title}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {project.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{project.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex mt-auto space-x-4">
          {project.githubLink && (
            <a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
              aria-label="View GitHub repository"
            >
              <Github className="h-5 w-5 mr-1" />
              <span>Code</span>
            </a>
          )}
          {project.deploymentLink && (
            <a 
              href={project.deploymentLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
              aria-label="View live project"
            >
              <ExternalLink className="h-5 w-5 mr-1" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Category filter button
const CategoryFilterButton = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {category}
  </button>
);



// Main portfolio page component
const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Project data
  const projects = [
    {
      id: "lei-engineering",
      imageUrl: "/img/lei.webp",
      title: "LEI Engineering and Survey",
      description: "Corporate website for an engineering firm with interactive maps and portfolio showcase.",
      category: "Wordpress",
      deploymentLink: "https://leiengineering.com",
      tags: ["Wordpress", "Custom Theme", "Interactive Maps"]
    },
    {
      id: "debt-tracker",
      imageUrl: "/img/banner.jpg",
      title: "Debt Tracker Application",
      description: "Python-based financial management tool to track and visualize debt progress with custom reporting.",
      githubLink: "https://github.com/ivancliff029/debt-tracker",
      category: "Python",
      tags: ["Python", "Data Visualization", "Financial Tool"]
    },
    {
      id: "agri-ecommerce",
      imageUrl: "/img/agri.jpeg",
      title: "E-commerce Webapp",
      description: "An ecommerce webapp to sell agricultural produce",
      githubLink: "https://github.com/ivancliff029/agri-ecommerce",
      category: "Java",
      tags: ["Java", "E-commerce", "CMS"]
    },
    {
      id: "journalx",
      imageUrl: "/img/journalx.png",
      title: "JournalX",
      description: "AI-powered journaling application with mood tracking and personalized insights.",
      githubLink: "https://github.com/ivancliff029/journalx",
      deploymentLink: "https://journalx.vercel.app",
      category: "NextJS",
      tags: ["NextJS", "AI Integration", "React", "TailwindCSS"]
    },
    {
      id: "climate-intelligence",
      imageUrl: "/img/cip.png",
      title: "Climate Intelligence",
      description: "Get personalised crops to grow based on your location,data insights usinig Artificial intelligence",
      deploymentLink: "https://allspacetechnologies.vercel.app/climate-control",
      category: "NextJS",
      tags: ["NextJS", "AI Integration", "Climate Intelligence", "Data Insights"]
    },
    {
      id: "engaato",
      imageUrl: "/img/engaato.png",
      title: "Engaato Online Sneaker Shop",
      description: "E-commerce platform specialized in exclusive sneaker offerings with secure payment processing.",
      deploymentLink: "https://engaato-online.vercel.app",
      githubLink: "https://github.com/ivancliff029/engaato-online",
      category: "NextJS",
      tags: ["E-commerce", "NextJS", "Payment Integration"]
    }, 
    {
      id: "koozali",
      imageUrl: "/img/koozali.png",
      title: "Koozali SME Server",
      description: "Official website for the Koozali SME Server project with documentation and community resources.",
      deploymentLink: "https://koozali.zartman.net/",
      category: "Wordpress",
      tags: ["Wordpress", "Documentation", "Community Portal"]
    },
    {
      id: "lajeni",
      imageUrl: "/img/lajeni.png",
      title: "Lajeni Cleaning Services",
      description: "Official site for Lajeni Cleaning Services Kampala",
      deploymentLink: "https://lajenicleaningservices.com/",
      category: "Wordpress",
      tags: ["Wordpress", "Cleaning Services", "Apparel"]
    },  
    {
      id: "biashara",
      imageUrl: "/img/biashara.png",
      title: "Biashara Solutions",
      description: "Business solutions platform offering digital services for small and medium enterprises.",
      deploymentLink: "https://biasharasolutions.com",
      category: "Wordpress",
      tags: ["Wordpress", "Business", "Digital Services"]
    }, 
  ];

  // Available categories
  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: filteredProjects.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <HalfScreen 
        backgroundImage="/img/sysadmin.jpg" 
        heading="My Portfolio" 
      />
      
      {/* Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through a selection of my recent work across different technologies and platforms.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <CategoryFilterButton
                key={category}
                category={category}
                isActive={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
          
          {/* Projects Carousel */}
          <div className="px-4 pb-8 relative">
            {filteredProjects.length > 0 ? (
              <Slider {...sliderSettings}>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </Slider>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600">No projects found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Buy Me a Coffee Section */}
     
      
      <Footer />
    </div>
  );
};

export default Portfolio;