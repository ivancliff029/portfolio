import React from 'react';
import Link from 'next/link';
import { FaClock, FaUser, FaHeart, FaComment } from 'react-icons/fa';
import { BlogPost, getContentPreview } from '../lib/utils';

interface BlogPostsProps {
  posts: BlogPost[];
}

const BlogPosts: React.FC<BlogPostsProps> = ({ posts }) => {
  return (
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
                <span>{new Date(post.createdAt.toDate()).toLocaleDateString()}</span>
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
                <Link href={`/blogs/${post.id}`}>
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Read More
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;