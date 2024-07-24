"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaClock, FaUser, FaHeart, FaComment } from 'react-icons/fa';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Spinner from '../Components/Spinner';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: { toDate: () => Date };
  likes: number;
  comments: number;
  author: string;
}

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogPosts'));
        const postsData = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...doc.data()
        } as BlogPost));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getContentPreview = (content: string) => {
    const stripHtml = content.replace(/<[^>]+>/g, '');
    return stripHtml.length > 150 ? stripHtml.substring(0, 150) + '...' : stripHtml;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Latest Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{getContentPreview(post.content)}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaClock className="mr-2" />
                  <span>{post.createdAt.toDate().toLocaleDateString()}</span>
                  <FaUser className="ml-4 mr-2" />
                  <span>{post.author || 'Unknown Author'}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaHeart className="mr-1 text-red-500" />
                    <span>{post.likes}</span>
                    <FaComment className="ml-3 mr-1 text-blue-500" />
                    <span>{post.comments}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaClock className="mr-2" />
              <span>{selectedPost.createdAt.toDate().toLocaleDateString()}</span>
              <FaUser className="ml-4 mr-2" />
              <span>{selectedPost.author || 'Unknown Author'}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} className="mb-4" />
            <button 
              onClick={() => setSelectedPost(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BlogPosts;
