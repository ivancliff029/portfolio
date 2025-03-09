"use client"

import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Spinner from '../Components/Spinner';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

// Components
const StarRating = ({ rating, onRatingChange = null, interactive = false }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          className={`p-1 text-xl ${rating >= star ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-600'}`}
          onClick={() => interactive && onRatingChange(star)}
          disabled={!interactive}
          aria-label={`Rate ${star} stars`}
        >
          {rating >= star ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
};

// Engineering firm links configuration
const engineeringFirms = [
  { 
    name: 'Cedos Engineering', 
    url: 'https://cedosengineering.com/',
    description: 'Specialists in mechanical and structural engineering solutions'
  },
  { 
    name: 'LEI Engineering', 
    url: 'https://www.leiengineering.com/',
    description: 'Leaders in civil and environmental engineering'
  }
];

const ReviewCard = ({ review }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date not available';
    return timestamp.toDate().toLocaleString();
  };

  // Check if the company name matches our engineering firms
  const getCompanyLink = (companyName) => {
    const firm = engineeringFirms.find(firm => 
      companyName.toLowerCase().includes(firm.name.toLowerCase()) ||
      firm.name.toLowerCase().includes(companyName.toLowerCase())
    );
    
    if (firm) {
      return (
        <a 
          href={firm.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          {companyName}
        </a>
      );
    }
    
    return <span>{companyName}</span>;
  };

  return (
    <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mb-8 transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{review.title}</h3>
        {review.rating >= 4 && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        )}
      </div>
      
      <p className="mb-4 text-gray-700 dark:text-gray-300">{review.reviewMessage}</p>
      
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-col mb-2">
          <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {review.name}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            {getCompanyLink(review.companyName)}
          </span>
        </div>
        <StarRating rating={review.rating} />
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Posted on: {formatDate(review.createdAt)}
      </p>
    </div>
  );
};

const StatusMessage = ({ message, type }) => {
  if (!message) return null;
  
  const bgColor = type === 'success' 
    ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' 
    : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100';
  
  return (
    <div className={`mb-6 p-4 rounded-md ${bgColor} transition-all flex items-center`}>
      {type === 'success' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      )}
      {message}
    </div>
  );
};

const EngineeringLinks = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        Featured Engineering Firms
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {engineeringFirms.map((firm, index) => (
          <a 
            key={index}
            href={firm.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span className="font-medium text-blue-600 dark:text-blue-400">{firm.name}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {firm.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

// Main Component
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    reviewMessage: '',
    name: '',
    email: '',
    companyName: '',
    rating: 0
  });
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFirm, setSelectedFirm] = useState('');

  // Load reviews on component mount
  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  const fetchApprovedReviews = async () => {
    try {
      const q = query(collection(db, "reviews"), where("status", "==", "approved"));
      const querySnapshot = await getDocs(q);
      const approvedReviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(approvedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setStatusMessage("Failed to load reviews. Please refresh the page.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRatingChange = (value) => {
    setFormData(prev => ({ ...prev, rating: value }));
  };

  const handleSelectFirm = (firmName) => {
    setSelectedFirm(firmName);
    setFormData(prev => ({ ...prev, companyName: firmName }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      reviewMessage: '',
      name: '',
      email: '',
      companyName: '',
      rating: 0
    });
    setSelectedFirm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.rating === 0) {
      setStatusMessage("Please select a rating before submitting.");
      setStatusType("error");
      return;
    }
    
    const newReview = { 
      ...formData,
      status: 'pending',
      createdAt: serverTimestamp()
    };
    
    try {
      await addDoc(collection(db, "reviews"), newReview);
      resetForm();
      setStatusMessage("Review submitted successfully! It will appear after approval.");
      setStatusType("success");
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        if (statusType === "success") {
          setStatusMessage(null);
          setStatusType(null);
        }
      }, 5000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatusMessage("Failed to submit review. Please try again.");
      setStatusType("error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
          Client Reviews
        </h1>
        
        {/* Engineering Firms Links Section */}
        <EngineeringLinks />
        
        {/* Reviews Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Latest Reviews
          </h2>
          <div className="space-y-6">
            {reviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <p className="text-gray-500 dark:text-gray-400">No approved reviews yet.</p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </section>

        {/* Review Form Section */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Share Your Experience
          </h2>
          
          <StatusMessage message={statusMessage} type={statusType} />
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Review Title</label>
              <input
                type="text"
                id="title"
                className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Summarize your experience"
                required
              />
            </div>
            
            <div>
              <label htmlFor="reviewMessage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Review</label>
              <textarea
                id="reviewMessage"
                className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={formData.reviewMessage}
                onChange={handleInputChange}
                placeholder="Share the details of your experience"
                required
                rows={4}
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Your Name
                  </div>
                </label>
                <input
                  type="text"
                  id="name"
                  className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  id="email"
                  className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  Company
                </div>
              </label>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                {engineeringFirms.map((firm, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectFirm(firm.name)}
                    className={`p-2 text-left rounded-md border ${
                      selectedFirm === firm.name
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400'
                        : 'border-gray-300 dark:border-gray-700'
                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  >
                    <div className="font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      {firm.name}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  className="p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name or select above"
                  required
                />
                {selectedFirm && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleSelectFirm('')}
                    aria-label="Clear selection"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  Your Rating
                </div>
              </label>
              <StarRating 
                rating={formData.rating} 
                onRatingChange={handleRatingChange} 
                interactive={true} 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 font-medium flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Submit Review
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;