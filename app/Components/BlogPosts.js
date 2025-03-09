import React from 'react';
import Link from 'next/link';
import { FaClock, FaUser, FaHeart, FaComment, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getContentPreview } from '../lib/utils';

const BlogPosts = ({ posts }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {posts.map((post) => (
          <motion.div 
            key={post.id} 
            variants={item}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            {post.imageUrl && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {post.category && (
                  <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                )}
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                <FaClock className="mr-1" />
                <span>{new Date(post.createdAt?.toDate()).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <FaUser className="mr-1" />
                <span>{post.author || 'Anonymous'}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                {getContentPreview(post.content, 150)}
              </p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <FaTags className="text-gray-400 mt-1" />
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center text-sm">
                  <span className="flex items-center text-gray-500 dark:text-gray-400 mr-3">
                    <FaHeart className="mr-1 text-red-500" />
                    {post.likes || 0}
                  </span>
                  <span className="flex items-center text-gray-500 dark:text-gray-400">
                    <FaComment className="mr-1 text-blue-500" />
                    {post.comments || 0}
                  </span>
                </div>
                <Link href={`/blogs/${post.id}`}>
                  <span className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 inline-block font-medium">
                    Read More
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BlogPosts;