'use client'
import React from "react";
import { FaGlobe, FaMobileAlt, FaCog, FaChartBar, FaCode } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ContactForm from "../Components/ContactForm";

interface Service {
  name: string;
  description: string;
  priceRange: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    name: "Website Design",
    description: "Professional and responsive website design tailored to your needs.",
    priceRange: "$600 to $1000",
    icon: <FaGlobe className="h-8 w-8 text-blue-500" />,
  },
  {
    name: "Website Maintenance & Marketing",
    description: "Ongoing maintenance and marketing services to keep your site optimized.",
    priceRange: "$100 to $500",
    icon: <FaCog className="h-8 w-8 text-green-500" />,
  },
  {
    name: "Search Engine Optimization",
    description: "Improve your site's ranking with our expert SEO services.",
    priceRange: "$100 to $500",
    icon: <FaChartBar className="h-8 w-8 text-purple-500" />,
  },
  {
    name: "Mobile App Design",
    description: "Innovative and user-friendly mobile app design.",
    priceRange: "$600 to $2000",
    icon: <FaMobileAlt className="h-8 w-8 text-yellow-500" />,
  },
  {
    name: "AI Algorithm Design",
    description: "Custom AI algorithms designed to meet your specific needs.",
    priceRange: "$500 to $1000",
    icon: <FaCode className="h-8 w-8 text-red-500" />,
  },
];

const ServicesPage: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="container mx-auto py-16 px-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        My Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              {service.icon}
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 ml-4">
                {service.name}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {service.description}
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {service.priceRange}
            </p>
          </div>
        ))}
      </div>
    </div>
    <ContactForm />
    <Footer />
    </>
    
  );
};

export default ServicesPage;
