'use client'

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  FaGlobe, 
  FaGear, 
  FaChartLine, 
  FaBullseye, 
  FaPencil 
} from "react-icons/fa6";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import ContactForm from "../../Components/ContactForm";

interface ServiceTier {
  id: string;
  name: string;
  description: string;
  price: number;
  recurring?: number;
  icon: React.ReactNode;
  features: string[];
  technicalDetails: string[];
  deliverables: string[];
  processSummary: string[];
}

const serviceTiers: ServiceTier[] = [
  {
    id: "basic-digital-presence",
    name: "Basic Digital Presence",
    description: "Establish your online foundation",
    price: 1000000,
    icon: <FaGlobe className="h-10 w-10 text-blue-600" />,
    features: [
      "Professional Website Design",
      "Responsive Mobile Layout",
      "5 Pages of Content",
      "Basic SEO Setup",
      "1 Month Hosting Included"
    ],
    technicalDetails: [
      "Responsive design using modern web technologies",
      "Mobile-first approach",
      "Optimized page load speeds",
      "Cross-browser compatibility"
    ],
    deliverables: [
      "Fully functional website",
      "Source code repository",
      "1-hour training session",
      "30-day post-launch support"
    ],
    processSummary: [
      "Initial consultation and requirements gathering",
      "Design mockup and client approval",
      "Development and implementation",
      "Testing and quality assurance",
      "Launch and initial optimization"
    ]
  },
  {
    id: "growth-digital-strategy",
    name: "Growth Digital Strategy",
    description: "Comprehensive digital marketing package",
    price: 1000000,
    recurring: 200000,
    icon: <FaGear className="h-10 w-10 text-green-600" />,
    features: [
      "Website Design",
      "Monthly Website Maintenance",
      "SEO Optimization",
      "Monthly Performance Reports",
      "Content Updates",
      "Technical Support"
    ],
    technicalDetails: [
      "Continuous performance monitoring",
      "Security updates and patches",
      "Content management system integration",
      "Analytics and tracking setup"
    ],
    deliverables: [
      "Monthly performance dashboard",
      "Detailed SEO and traffic reports",
      "Website health check",
      "Quarterly strategy review"
    ],
    processSummary: [
      "Initial website audit",
      "Strategic planning session",
      "Monthly maintenance and optimization",
      "Ongoing performance tracking",
      "Quarterly improvement recommendations"
    ]
  },
  {
    id: "advanced-digital-marketing",
    name: "Advanced Digital Marketing",
    description: "Comprehensive digital marketing and content strategy",
    price: 500000,
    recurring: 300000,
    icon: <FaChartLine className="h-10 w-10 text-purple-600" />,
    features: [
      "Google Ads Management",
      "Monthly Blog Content Creation",
      "Advanced SEO Strategies",
      "Social Media Integration",
      "Quarterly Strategy Review",
      "Conversion Tracking"
    ],
    technicalDetails: [
      "Advanced keyword research",
      "Audience segmentation",
      "Conversion rate optimization",
      "Multi-channel marketing integration"
    ],
    deliverables: [
      "Monthly content calendar",
      "Comprehensive marketing report",
      "Ad performance dashboard",
      "SEO improvement recommendations"
    ],
    processSummary: [
      "Market and competitor analysis",
      "Strategy development",
      "Content creation and distribution",
      "Continuous performance optimization",
      "Quarterly strategic pivot recommendations"
    ]
  }
];

const ServicePage: React.FC = () => {
  const [service, setService] = useState<ServiceTier | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceId = searchParams.get('service');
    const foundService = serviceTiers.find(s => s.id === serviceId);
    setService(foundService || null);
  }, [searchParams]);

  if (!service) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p className="text-2xl text-gray-600">Service not found</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-16 px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              {service.icon}
              <h1 className="text-3xl font-bold ml-4 text-gray-900 dark:text-gray-100">
                {service.name}
              </h1>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {service.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
                  {new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(service.price)}
                </p>
                {service.recurring && (
                  <p className="text-gray-600">
                    + {new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(service.recurring)} monthly
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Process Overview</h2>
              <ol className="border-l-2 border-blue-500">
                {service.processSummary.map((step, index) => (
                  <li key={index} className="mb-4 ml-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </>
  );
};

export default ServicePage;