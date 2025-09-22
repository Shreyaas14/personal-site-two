'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RawBlogPost {
  id: number;
  title: string;
  created_at: string;
  body: string;
  tags?: string[] | null;
  url?: string | null;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  readTime?: string;
  url?: string;
  created_at: string;
}


const calculateReadTime = (content: string) => {
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min read`;
};

const generateExcerpt = (content: string) => {
  return content.slice(0, 150) + (content.length > 150 ? '...' : '');
};

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts.json`) // Updated to match your earlier API port
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then(data => {
        const mappedPosts = data.map((post: RawBlogPost) => ({
          id: post.id,
          title: post.title,
          date: new Date(post.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric' 
          }),
          excerpt: generateExcerpt(post.body || post.content), // Handle either field
          content: post.body || post.content,
          tags: post.tags,
          readTime: calculateReadTime(post.body || post.content),
          url: post.url,
          created_at: post.created_at,
        }));
        setBlogPosts(mappedPosts);
      })
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div className="min-h-screen p-8" style={{ background: 'transparent' }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-heading mb-8"
      >
        Writings
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-body text-lg max-w-2xl mx-auto mb-12"
      >
        My written thoughts.
      </motion.p>
      <ul className="max-w-2xl mx-auto space-y-6">
        {blogPosts.length === 0 ? (
          <p className="text-body text-center">No posts yet.</p>
        ) : (
          blogPosts.map((post) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (blogPosts.indexOf(post) + 1) }}
              className="border-b border-gray-700 pb-4"
            >
              <Link href={`/posts/${post.id}`} className="block text-white hover:text-gray-300 transition-colors text-lg font-semibold py-2 hover:border-gray-500">
                {post.title}
              </Link>
              <div className="text-sm text-gray-400 flex flex-col md:flex-row md:items-center gap-2 mt-1">
                <span>{post.date}</span>
                {post.readTime && <span>• {post.readTime}</span>}
              </div>
              {post.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs text-gray-400 border border-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-body mt-2">{post.excerpt}</p>
            </motion.li>
          ))
        )}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-12 text-center"
      >
        <Link href="/" className="text-body text-lg hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
}