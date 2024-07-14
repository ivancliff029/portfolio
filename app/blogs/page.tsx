import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaClock, FaUser, FaHeart, FaComment } from 'react-icons/fa';

const BlogPosts = () => {
  // Sample blog post data
  const posts = [
    { id: 1, title: "Getting Started with React", description: "Learn the basics of React and start building your first app...", date: "2024-07-14", likes: 42, comments: 15 },
    { id: 2, title: "CSS Grid Layout Explained", description: "Master CSS Grid Layout with this comprehensive guide...", date: "2024-07-13", likes: 38, comments: 12 },
    { id: 3, title: "JavaScript ES6 Features", description: "Explore the powerful features introduced in ECMAScript 6...", date: "2024-07-12", likes: 55, comments: 20 },
    { id: 4, title: "Node.js for Beginners", description: "Dive into server-side JavaScript with Node.js...", date: "2024-07-11", likes: 30, comments: 8 },
    { id: 5, title: "Python Data Science Libraries", description: "An overview of essential Python libraries for data science...", date: "2024-07-10", likes: 48, comments: 18 },
    { id: 6, title: "RESTful API Design Best Practices", description: "Learn how to design robust and scalable RESTful APIs...", date: "2024-07-09", likes: 36, comments: 10 },
    { id: 7, title: "Introduction to Docker", description: "Understand containerization and get started with Docker...", date: "2024-07-08", likes: 40, comments: 14 },
    { id: 8, title: "Machine Learning Basics", description: "An introduction to key concepts in machine learning...", date: "2024-07-07", likes: 52, comments: 22 },
    { id: 9, title: "Git Version Control", description: "Master Git for effective collaboration and version control...", date: "2024-07-06", likes: 45, comments: 16 },
  ];

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
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FaClock className="mr-2" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <FaUser className="ml-4 mr-2" />
                  <span>Ivan Cliff</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaHeart className="mr-1 text-red-500" />
                    <span>{post.likes}</span>
                    <FaComment className="ml-3 mr-1 text-blue-500" />
                    <span>{post.comments}</span>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPosts;