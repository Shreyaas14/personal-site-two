'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Markdown from '@/components/Markdown';

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

export default function PostPage() {
  const params = useParams();
  const rawId = params?.id as string | string[] | undefined;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${encodeURIComponent(
      id
    )}.json`;

    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const headers: HeadersInit = token ? { 'X-API-Token': token } : {};

    fetch(url, { headers })
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        const body: string = data.body ?? '';
        const mappedPost: Post = {
          id: data.id,
          title: data.title,
          date: new Date(data.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          excerpt: body.slice(0, 150) + (body.length > 150 ? '...' : ''),
          content: body,
          tags: data.tags,
          readTime: calculateReadTime(body),
          url: data.url,
          created_at: data.created_at,
        };
        setPost(mappedPost);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen p-8 text-red-400" style={{ background: 'transparent' }}>
        Failed to load post: {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen p-8 text-gray-400" style={{ background: 'transparent' }}>
        Loading...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 max-w-3xl mx-auto"
      style={{ background: 'transparent' }}
    >
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="text-sm text-gray-400 flex gap-2 mb-6">
        <span>{post.date}</span>
        {post.readTime && <span>• {post.readTime}</span>}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="px-2 py-1 text-xs text-gray-300/80 border border-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Markdown-rendered body */}
      <div className="prose prose-invert max-w-none">
        <Markdown content={post.content} />
      </div>
    </motion.div>
  );
}

/** ~200 wpm read-time helper */
function calculateReadTime(content: string) {
  const wordCount = (content ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}
