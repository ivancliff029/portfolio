"use client"

import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Spinner from '../Components/Spinner';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";

type Review = {
  id: string;
  title: string;
  reviewMessage: string;
  name: string;
  email: string;
  companyName: string;
  rating: number;
  status: string;
  createdAt: Timestamp | null;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [rating, setRating] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), where("status", "==", "approved"));
        const querySnapshot = await getDocs(q);
        const approvedReviews: Review[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          approvedReviews.push({
            id: doc.id,
            title: data.title,
            reviewMessage: data.reviewMessage,
            name: data.name,
            email: data.email,
            companyName: data.companyName,
            rating: data.rating,
            status: data.status,
            createdAt: data.createdAt ? data.createdAt : null
          });
        });
        setReviews(approvedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = { 
      title, 
      reviewMessage, 
      name, 
      email, 
      companyName, 
      rating, 
      status: 'pending',
      createdAt: serverTimestamp()
    };
    try {
      await addDoc(collection(db, "reviews"), newReview);
      setTitle('');
      setReviewMessage('');
      setName('');
      setEmail('');
      setCompanyName('');
      setRating(0);
      setStatusMessage("Review submitted successfully!");
      setStatusType("success");
    } catch (e) {
      console.error("Error adding document: ", e);
      setStatusMessage("Failed to submit review. Please try again.");
      setStatusType("error");
    }
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'Date not available';
    return timestamp.toDate().toLocaleString();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Client Reviews</h1>
        
        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Latest Reviews</h2>
          <div className="space-y-6">
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review) => (
                  <li key={review.id} className="p-6 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mb-8">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{review.title}</h3>
                    <p className="mb-2 text-gray-700 dark:text-gray-300">{review.reviewMessage}</p>
                    <div className="flex items-center mb-2">
                      <span className="font-semibold mr-2 text-gray-700 dark:text-gray-300">{review.name}</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={`${review.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Company: {review.companyName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Posted on: {formatDate(review.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No approved reviews yet.</p>
            )}
          </div>
        </section>

        {/* Review Form Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Leave a Review</h2>
          {statusMessage && (
            <div className={`mb-6 p-4 rounded-md ${statusType === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'}`}>
              {statusMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 mb-24">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                id="title"
                className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="reviewMessage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Review Message</label>
              <textarea
                id="reviewMessage"
                className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                required
                rows={4}
              ></textarea>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
              <input
                type="text"
                id="companyName"
                className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`p-2 ${rating >= star ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-600'}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mb-5">
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
