"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import BlogPosts from '../Components/BlogPosts';
import Spinner from '../Components/Spinner';
import { motion } from 'framer-motion';

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Create a query with order and limit for better performance
        const blogsQuery = query(
          collection(db, 'blogPosts'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        
        const querySnapshot = await getDocs(blogsQuery);
        
        if (querySnapshot.empty) {
          console.log("No blog posts found");
          setPosts([]);
          return;
        }
        
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log(`Fetched ${postsData.length} blog posts`);
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">No Blog Posts Yet</h2>
        <p className="text-gray-600">Check back soon for new content!</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BlogPosts posts={posts} />
    </motion.div>
  );
}