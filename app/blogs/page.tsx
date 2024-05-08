
import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const BlogList = () => {
  // Dummy data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Next.js',
      content: 'This is the content of the blog post...',
    },
    {
      id: 2,
      title: 'Deep Dive into React Hooks',
      content: 'Another interesting blog post...',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-10">Latest Blog Posts</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id} className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Read More
            </button>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    </>
   
  );
};

export default BlogList;
