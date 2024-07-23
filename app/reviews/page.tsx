// pages/reviews.tsx
"use client"

import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { db } from '../lib/firebase'; // Import Firestore
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; // Import Firestore methods

type Review = {
  title: string;
  reviewMessage: string;
  name: string;
  email: string;
  rating: number;
  status: string;
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [title, setTitle] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      const q = query(collection(db, "reviews"), where("status", "==", "approved"));
      const querySnapshot = await getDocs(q);
      const approvedReviews: Review[] = [];
      querySnapshot.forEach((doc) => {
        approvedReviews.push(doc.data() as Review);
      });
      setReviews(approvedReviews);
    };

    fetchApprovedReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = { title, reviewMessage, name, email, rating, status: 'pending' };
    try {
      await addDoc(collection(db, "reviews"), newReview);
      setTitle('');
      setReviewMessage('');
      setName('');
      setEmail('');
      setRating(0);
      setStatusMessage("Review submitted successfully!");
      setStatusType("success");
    } catch (e) {
      console.error("Error adding document: ", e);
      setStatusMessage("Failed to submit review. Please try again.");
      setStatusType("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Leave a Review</h1>
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-md ${statusType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {statusMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="mb-5">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="reviewMessage" className="block text-sm font-medium text-gray-700">Review Message</label>
            <textarea
              id="reviewMessage"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`p-2 ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Submit Review
          </button>
        </form>

        <h2 className="text-xl font-bold mb-6">Reviews</h2>
        <div className="space-y-6">
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index} className="p-6 border border-gray-300 rounded-md shadow-sm bg-white mb-8">
                  <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                  <p className="mb-2">{review.reviewMessage}</p>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">{review.name}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`${review.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No approved reviews yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
