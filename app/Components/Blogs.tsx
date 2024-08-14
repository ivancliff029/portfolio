"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import BlogPosts from '../Components/BlogPosts';
import Spinner from '../Components/Spinner';
import { BlogPost } from '../lib/utils';

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogPosts'));
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        } as BlogPost));
        console.log("Fetched posts:", postsData);
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return <BlogPosts posts={posts} />;
}