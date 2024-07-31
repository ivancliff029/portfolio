"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { doc, getDoc, collection, addDoc, getDocs, Timestamp, query, orderBy, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BlogPost, Comment } from '../../lib/utils';
import Spinner from '@/app/Components/Spinner';
import { useUser, RedirectToSignIn } from '@clerk/nextjs';
import { FaHeart, FaShare } from 'react-icons/fa';

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [likes, setLikes] = useState(0);
  const pathname = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const id = pathname.split('/').pop();

      if (!id) {
        console.log("No ID provided");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'blogPosts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = {
            id: docSnap.id,
            ...docSnap.data(),
          } as BlogPost;
          console.log("Fetched post data:", postData);
          setPost(postData);
          setLikes(postData.likes || 0);
        } else {
          console.log('No such document!');
        }

        // Fetch comments
        const commentsCollection = collection(db, 'blogPosts', id, 'comments');
        const q = query(commentsCollection, orderBy('createdAt', 'desc')); 
        const commentsSnapshot = await getDocs(q);
        const commentsData = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching blog post or comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [pathname]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '' || !post) return;

    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    setCommentLoading(true);
    try {
      const username = user?.fullName ?? 'Anonymous'; 

      const commentData: Omit<Comment, 'id'> = {
        content: newComment,
        createdAt: Timestamp.now(), 
        postId: post.id, 
        userId: user?.id ?? '', 
        username: username 
      };

      // Add comment to Firestore
      const commentsRef = collection(db, 'blogPosts', post.id, 'comments');
      const docRef = await addDoc(commentsRef, commentData);
      const addedComment: Comment = { id: docRef.id, ...commentData }; 
      setComments([addedComment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    if (!post) return;

    try {
      const postRef = doc(db, 'blogPosts', post.id);
      await updateDoc(postRef, {
        likes: increment(1)
      });
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleShare = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShareModal(false);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">
          By {post.author} on {post.createdAt.toDate().toLocaleDateString()}
        </p>
        <div className="prose lg:prose-xl mb-10" dangerouslySetInnerHTML={{ __html: post.content }}></div>

        <div className="flex space-x-4 mb-6">
          <button onClick={handleLike} className="flex items-center space-x-2 text-blue-600">
            <FaHeart /> <span>{likes} Likes</span>
          </button>
          <button onClick={handleShare} className="flex items-center space-x-2 text-green-600">
            <FaShare /> <span>Share</span>
          </button>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {isLoaded ? (
            <>
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  disabled={commentLoading}
                >
                  {commentLoading ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            </>
          ) : (
            <Spinner />
          )}
          <div>
            {comments.length === 0 ? (
              <p>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="mb-4 border-b pb-2 ">
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-gray-500 text-sm">
                    Posted by {comment.username || 'Anonymous'} on {comment.createdAt.toDate().toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {showAuthModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
              <p className="mb-4">You must be logged in to engage with this post.</p>
              <RedirectToSignIn />
              <button
                className="mt-4 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowAuthModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showShareModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Share this post</h2>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 text-white rounded mb-2 w-full"
              >
                Copy Link
              </button>
              {/* Add social media share buttons here */}
              <button
                className="mt-4 px-4 py-2 bg-gray-300 rounded w-full"
                onClick={() => setShowShareModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
