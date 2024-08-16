// pages/services.tsx

'use client'
import React from "react";
import { FaGlobe, FaMobileAlt, FaCog, FaChartBar, FaCode } from "react-icons/fa";
import Link from 'next/link';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ContactForm from "../Components/ContactForm";

interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: "website-design",
    name: "Website Design",
    description: "Professional and responsive website design tailored to your needs.",
    priceRange: "$600 to $1000",
    icon: <FaGlobe className="h-8 w-8 text-blue-500" />,
  },
  {
    id: "website-maintenance-marketing",
    name: "Website Maintenance & Marketing",
    description: "Ongoing maintenance and marketing services to keep your site optimized.",
    priceRange: "$100 to $500",
    icon: <FaCog className="h-8 w-8 text-green-500" />,
  },
  {
    id: "search-engine-optimization",
    name: "Search Engine Optimization",
    description: "Improve your site's ranking with our expert SEO services.",
    priceRange: "$100 to $500",
    icon: <FaChartBar className="h-8 w-8 text-purple-500" />,
  },
  {
    id: "mobile-app-design",
    name: "Mobile App Design",
    description: "Innovative and user-friendly mobile app design.",
    priceRange: "$600 to $2000",
    icon: <FaMobileAlt className="h-8 w-8 text-yellow-500" />,
  },
  {
    id: "ai-algorithm-design",
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
        {services.map((service) => (
          <div
            key={service.id}
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
            <Link href={`/services/${service.id}`}>
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition duration-300 mt-4">
                Read More
              </span>
            </Link>
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