'use client'
import React, { useState } from "react";
import { FaGlobe, FaGear, FaChartLine, FaBullseye, FaPencil } from "react-icons/fa6";
import Link from 'next/link';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ContactForm from "../Components/ContactForm";

interface ServiceTier {
  id: string;
  name: string;
  description: string;
  price: number;
  recurring?: number;
  icon: React.ReactNode;
  features: string[];
  mostPopular?: boolean;
}

const serviceTiers: ServiceTier[] = [
  {
    id: "basic-digital-presence",
    name: "Basic Digital Presence",
    description: "Establish your online foundation",
    price: 1200000,
    icon: <FaGlobe className="h-10 w-10 text-blue-600" />,
    features: [
      "Professional Website Design",
      "Responsive Mobile Layout",
      "5 Pages of Content",
      "Basic SEO Setup",
      "Annual Hosting Plan Included"
    ]
  },
  {
    id: "growth-digital-strategy",
    name: "Growth Digital Strategy",
    description: "Comprehensive digital marketing package",
    price: 1200000,
    recurring: 200000,
    mostPopular: true,
    icon: <FaGear className="h-10 w-10 text-green-600" />,
    features: [
      "Website Design",
      "Monthly Website Maintenance",
      "SEO Optimization",
      "Monthly Performance Reports",
      "Content Updates",
      "Technical Support"
    ]
  },
  {
    id: "advanced-digital-marketing",
    name: "Advanced Digital Marketing",
    description: "Comprehensive digital marketing and content strategy",
    price: 1500000,
    recurring: 300000,
    icon: <FaChartLine className="h-10 w-10 text-purple-600" />,
    features: [
      "Google Ads Management",
      "Monthly Blog Content Creation",
      "Advanced SEO Strategies",
      "Social Media Integration",
      "Quarterly Strategy Review",
      "Conversion Tracking"
    ]
  }
];

const ServicesPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Digital Services Tailored for Your Success
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your online presence and drive business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {serviceTiers.map((tier) => (
            <div 
              key={tier.id}
              className={`
                bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300
                ${tier.mostPopular ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'}
                hover:shadow-2xl
              `}
              onMouseEnter={() => setSelectedTier(tier.id)}
              onMouseLeave={() => setSelectedTier(null)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {tier.icon}
                  <h2 className="ml-4 text-2xl font-bold text-gray-900">
                    {tier.name}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">{tier.description}</p>
                
                <div className="mb-4">
                  <p className="text-3xl font-extrabold text-gray-900">
                    {new Intl.NumberFormat('en-UG', { 
                      style: 'currency', 
                      currency: 'UGX' 
                    }).format(tier.price)}
                  </p>
                  {tier.recurring && (
                    <p className="text-gray-600">
                      + {new Intl.NumberFormat('en-UG', { 
                        style: 'currency', 
                        currency: 'UGX' 
                      }).format(tier.recurring)} monthly
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-gray-700"
                    >
                      <svg 
                        className="w-5 h-5 text-green-500 mr-2" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ServicesPage;