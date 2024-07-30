"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { doc, getDoc, collection, addDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BlogPost, Comment } from '../../lib/utils';
import Spinner from '@/app/Components/Spinner';
import { useUser, RedirectToSignIn } from '@clerk/nextjs';

// Function to strip HTML tags
function stripHtmlTags(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const pathname = usePathname();
  const { user, isLoaded, isSignedIn } = useUser(); // Use useUser hook to get user details

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const id = pathname.split('/').pop();

      if (!id) {
        console.log("No ID provided");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching post with ID:", id);
        const docRef = doc(db, 'blogPosts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = {
            id: docSnap.id,
            ...docSnap.data(),
            content: stripHtmlTags(docSnap.data().content) // Strip HTML tags from content
          } as BlogPost;
          console.log("Fetched post data:", postData);
          setPost(postData);
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
      setShowModal(true); // Show modal if user is not signed in
      return;
    }

    setCommentLoading(true);
    try {
      const username = user?.fullName ?? 'Anonymous'; // Ensure username is a string

      const commentData: Omit<Comment, 'id'> = {
        content: newComment,
        createdAt: Timestamp.now(), // Use Firebase Timestamp
        postId: post.id, // Link comment to post ID
        userId: user?.id ?? '', // Ensure userId is a string
        username: username // Ensure username is a string
      };

      // Add comment to Firestore
      const commentsRef = collection(db, 'blogPosts', post.id, 'comments');
      const docRef = await addDoc(commentsRef, commentData);
      const addedComment: Comment = { id: docRef.id, ...commentData }; // Ensure id is correctly assigned
      setComments([addedComment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {post.author} on {post.createdAt.toDate().toLocaleDateString()}
      </p>
      <div className="prose lg:prose-xl whitespace-pre-wrap mb-10">{post.content}</div>

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
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                  <p className="mb-4">You must be logged in to post comments.</p>
                  <RedirectToSignIn />
                  <button
                    className="mt-4 px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Spinner />
        )}
        <div>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4 border-b pb-2">
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-gray-500 text-sm">
                  Posted by {comment.username || 'Anonymous'} on {comment.createdAt.toDate().toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
