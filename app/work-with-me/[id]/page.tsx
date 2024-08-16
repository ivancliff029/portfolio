// pages/services/[id].tsx

'use client'

import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { FaGlobe, FaMobileAlt, FaCog, FaChartBar, FaCode } from "react-icons/fa";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import ContactForm from "../../Components/ContactForm";

interface Service {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  icon: React.ReactNode;
  fullDescription: string;
}

const services: Service[] = [
  {
    id: "website-design",
    name: "Website Design",
    description: "Professional and responsive website design tailored to your needs.",
    priceRange: "$600 to $1000",
    icon: <FaGlobe className="h-8 w-8 text-blue-500" />,
    fullDescription: "Our website design service offers custom, responsive designs that captivate your audience and drive conversions. We focus on user experience, modern aesthetics, and seamless functionality across all devices."
  },
  {
    id: "website-maintenance-marketing",
    name: "Website Maintenance & Marketing",
    description: "Ongoing maintenance and marketing services to keep your site optimized.",
    priceRange: "$100 to $500",
    icon: <FaCog className="h-8 w-8 text-green-500" />,
    fullDescription: "Keep your website running smoothly and effectively with our maintenance and marketing services. We handle updates, security, and implement marketing strategies to boost your online presence and drive traffic."
  },
  {
    id: "search-engine-optimization",
    name: "Search Engine Optimization",
    description: "Improve your site's ranking with our expert SEO services.",
    priceRange: "$100 to $500",
    icon: <FaChartBar className="h-8 w-8 text-purple-500" />,
    fullDescription: "Our SEO services are designed to improve your website's visibility in search engine results. We use proven techniques to optimize your content, structure, and backlink profile, helping you reach your target audience more effectively."
  },
  {
    id: "mobile-app-design",
    name: "Mobile App Design",
    description: "Innovative and user-friendly mobile app design.",
    priceRange: "$600 to $2000",
    icon: <FaMobileAlt className="h-8 w-8 text-yellow-500" />,
    fullDescription: "Create stunning, intuitive mobile apps that users love. Our mobile app design service covers everything from concept to launch, ensuring your app stands out in the crowded app marketplace."
  },
  {
    id: "ai-algorithm-design",
    name: "AI Algorithm Design",
    description: "Custom AI algorithms designed to meet your specific needs.",
    priceRange: "$500 to $1000",
    icon: <FaCode className="h-8 w-8 text-red-500" />,
    fullDescription: "Harness the power of artificial intelligence with our custom AI algorithm design service. We develop tailored AI solutions that can automate processes, provide insights, and solve complex problems specific to your business needs."
  },
];

const ServicePage: React.FC = () => {
  const [service, setService] = useState<Service | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const id = pathname.split('/').pop();
    const foundService = services.find(s => s.id === id);
    setService(foundService || null);
  }, [pathname]);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-16 px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
          {service.name}
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            {service.icon}
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 ml-4">
              {service.name}
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {service.fullDescription}
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Price Range: {service.priceRange}
          </p>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </>
  );
};

export default ServicePage;