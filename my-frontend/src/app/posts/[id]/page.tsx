'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Markdown from '@/components/Markdown';
import { BlogThemeProvider, useBlogTheme } from '@/contexts/BlogThemeContext';
import BlogThemeWrapper from '@/components/BlogThemeWrapper';

interface Post {
  id: number;
  title: string;
  date: string;
  content: string;
  tags?: string[];
  readTime: string;
}

function PostContent() {
  const { labTheme, themeConfig } = useBlogTheme();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const headers: HeadersInit = token ? { 'X-API-Token': token } : {};

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}.json`, { headers })
      .then(res => res.ok ? res.json() : Promise.reject('Not found'))
      .then(data => {
        const body = data.body ?? '';
        setPost({
          id: data.id,
          title: data.title,
          date: new Date(data.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          content: body,
          tags: data.tags,
          readTime: `${Math.max(1, Math.ceil(body.split(/\s+/).length / 200))} min read`,
        });
      })
      .catch(err => setError(String(err)));
  }, [id]);

  return (
    <BlogThemeWrapper>
      <div className={`max-w-2xl mx-auto px-6 ${labTheme === 'anthropic' ? 'py-24' : 'py-20'}`}>
        {error ? (
          <p style={{ color: themeConfig.accent }}>Error: {error}</p>
        ) : !post ? (
          <p className={labTheme === 'xai' ? 'terminal-cursor' : ''} style={{ color: themeConfig.textMuted }}>
            {labTheme === 'xai' ? 'Loading' : 'Loading...'}
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1
                className={`text-3xl mb-3 ${themeConfig.headingFont} ${labTheme === 'gemini' ? 'gemini-shimmer' : ''}`}
                style={labTheme === 'gemini' ? undefined : { color: themeConfig.textPrimary }}
              >
                {post.title}
              </h1>
              <div
                className="flex items-center gap-3 text-sm"
                style={{ color: themeConfig.textMuted }}
              >
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Content */}
            <div
              className={`prose prose-sm max-w-none ${themeConfig.bodyFont}`}
              style={themeConfig.proseOverrides as React.CSSProperties}
            >
              <Markdown content={post.content} labTheme={labTheme} />
            </div>

            {/* Nav */}
            <div className="mt-12 flex justify-between">
              <Link
                href="/blog"
                className={`text-sm hover:opacity-70 transition-opacity ${labTheme === 'xai' ? 'uppercase tracking-wider' : ''}`}
                style={{ color: themeConfig.textMuted }}
              >
                ← all posts
              </Link>
              <Link
                href="/"
                className={`text-sm hover:opacity-70 transition-opacity ${labTheme === 'xai' ? 'uppercase tracking-wider' : ''}`}
                style={{ color: themeConfig.textMuted }}
              >
                home →
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </BlogThemeWrapper>
  );
}

export default function PostPage() {
  return (
    <BlogThemeProvider>
      <PostContent />
    </BlogThemeProvider>
  );
}
