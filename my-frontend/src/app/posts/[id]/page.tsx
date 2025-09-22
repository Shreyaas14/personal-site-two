'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

interface Post {
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

const parseContent = (content: string) => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition-colors duration-300 underline decoration-gray-500 hover:decoration-gray-300"
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }
  return parts.length > 0 ? parts : content;
};

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}.json`)
        .then(res => {
          if (!res.ok) throw new Error('Fetch failed');
          return res.json();
        })
        .then(data => {
          const mappedPost = {
            id: data.id,
            title: data.title,
            date: new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: data.body.slice(0, 150) + (data.body.length > 150 ? '...' : ''),
            content: data.body,
            tags: data.tags,
            readTime: calculateReadTime(data.body),
            url: data.url,
            created_at: data.created_at,
          };
          setPost(mappedPost);
        })
        .catch(err => console.error('Error fetching post:', err));
    }
  }, [id]);

  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  if (!post) return <div className="min-h-screen p-8" style={{ background: 'transparent' }}>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 max-w-3xl mx-auto"
      style={{ background: 'transparent' }}
    >
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <div className="text-sm text-gray-400 flex gap-2 mb-4">
        <span>{post.date}</span>
        {post.readTime && <span>• {post.readTime}</span>}
      </div>
      {post.tags && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs text-gray-400 border border-gray-600 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="text-body">{parseContent(post.content)}</div>
    </motion.div>
  );
}