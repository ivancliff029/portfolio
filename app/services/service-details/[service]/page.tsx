'use client'
import React from "react";
import { 
  FaGlobe, 
  FaGear, 
  FaChartLine 
} from "react-icons/fa6";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import ContactForm from "../../../Components/ContactForm";

interface ServiceTier {
  id: string;
  name: string;
  description: string;
  price: number;
  recurring?: number;
  icon: React.ReactNode;
  features: string[];
  technicalDetails: string[];
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
      "Annual Hosting Plan Included"
    ],
    technicalDetails: [
      "Responsive design using modern web technologies",
      "Mobile-first approach",
      "Optimized page load speeds"
    ],
    processSummary: [
      "Initial consultation",
      "Design mockup",
      "Development",
      "Testing",
      "Launch"
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
      "Security updates",
      "Analytics tracking"
    ],
    processSummary: [
      "Website audit",
      "Strategic planning",
      "Monthly optimization",
      "Performance tracking",
      "Quarterly review"
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
    ],
    technicalDetails: [
      "Advanced keyword research",
      "Audience segmentation",
      "Multi-channel marketing"
    ],
    processSummary: [
      "Market analysis",
      "Strategy development",
      "Content creation",
      "Performance optimization",
      "Strategic recommendations"
    ]
  }
];

export default function ServiceDetailPage({ 
  searchParams 
}: { 
  searchParams: { service?: string } 
}) {
  const selectedService = serviceTiers.find(tier => tier.id === searchParams.service);

  if (!selectedService) {
    return <div>Service not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            {selectedService.icon}
            <h1 className="text-3xl font-bold ml-4 text-gray-900">
              {selectedService.name}
            </h1>
          </div>

          <p className="text-gray-600 mb-6">{selectedService.description}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
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
              <p className="text-3xl font-extrabold text-gray-900 mb-2">
                {new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(selectedService.price)}
              </p>
              {selectedService.recurring && (
                <p className="text-gray-600">
                  + {new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(selectedService.recurring)} monthly
                </p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Process Overview</h2>
            <ol className="border-l-2 border-blue-500">
              {selectedService.processSummary.map((step, index) => (
                <li key={index} className="mb-4 ml-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <ContactForm />
      <Footer />
    </div>
  );
}