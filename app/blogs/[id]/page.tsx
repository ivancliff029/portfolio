"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BlogPost } from '../../lib/utils';
import Spinner from '@/app/Components/Spinner';

// Function to strip HTML tags
function stripHtmlTags(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchPost = async () => {
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
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [pathname]);

  if (loading) {
    return <Spinner />;
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  console.log("Rendering post:", post);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {post.author} on {post.createdAt.toDate().toLocaleDateString()}
      </p>
      <div className="prose lg:prose-xl whitespace-pre-wrap mb-10">{post.content}</div>
    </div>
  );
}