'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BlogThemeProvider, useBlogTheme } from '@/contexts/BlogThemeContext';
import BlogThemeWrapper from '@/components/BlogThemeWrapper';

interface RawBlogPost {
  id: number;
  title: string;
  created_at: string;
  body: string;
  tags?: string[] | null;
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  readTime: string;
  created_at: string;
}

const calculateReadTime = (content: string) => {
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} min`;
};

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'On the Nature of Understanding',
    date: 'Jan 15, 2026',
    excerpt: 'What does it mean for a system to truly understand something? We explore the boundary between pattern matching and comprehension...',
    tags: ['ai', 'philosophy'],
    readTime: '8 min',
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 2,
    title: 'Scaling Laws and Emergent Behavior',
    date: 'Dec 3, 2025',
    excerpt: 'As models grow larger, unexpected capabilities appear. We examine the relationship between scale and qualitative shifts in behavior...',
    tags: ['research', 'scaling'],
    readTime: '12 min',
    created_at: '2025-12-03T00:00:00Z',
  },
  {
    id: 3,
    title: 'The Craft of Prompt Engineering',
    date: 'Nov 20, 2025',
    excerpt: 'Prompt engineering is less science and more craft — a dialogue between human intention and machine interpretation...',
    tags: ['engineering', 'prompts'],
    readTime: '5 min',
    created_at: '2025-11-20T00:00:00Z',
  },
];

function BlogContent() {
  const { labTheme, themeConfig } = useBlogTheme();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const headers: HeadersInit = token ? { 'X-API-Token': token } : {};

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts.json`, { headers })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setPosts(data.map((post: RawBlogPost) => ({
          id: post.id,
          title: post.title,
          date: new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          excerpt: post.body.slice(0, 100) + (post.body.length > 100 ? '...' : ''),
          tags: post.tags || [],
          readTime: calculateReadTime(post.body),
          created_at: post.created_at,
        })));
        setLoading(false);
      })
      .catch(() => {
        setPosts(SAMPLE_POSTS);
        setLoading(false);
      });
  }, []);

  // Theme-specific card styles
  const getCardClass = () => {
    if (labTheme === 'gemini') return 'rounded-xl';
    if (labTheme === 'xai') return 'rounded-none border-l-2 border-white pl-4';
    return '';
  };

  return (
    <BlogThemeWrapper>
      <div className={`max-w-2xl mx-auto px-6 ${labTheme === 'anthropic' ? 'py-24' : 'py-20'}`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1
            className={`text-4xl mb-2 ${themeConfig.headingFont} ${labTheme === 'gemini' ? 'gemini-shimmer' : ''}`}
            style={labTheme === 'gemini' ? undefined : { color: themeConfig.textPrimary }}
          >
            {themeConfig.pageTitle}
          </h1>
          {/* Divider */}
          {labTheme === 'gemini' ? (
            <div
              className="w-16 h-[2px] rounded-full"
              style={{ background: themeConfig.dividerColor }}
            />
          ) : (
            <div
              className="w-12 h-0.5"
              style={{ backgroundColor: themeConfig.dividerColor }}
            />
          )}
        </motion.div>

        {/* Cactus */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <Image
            src={themeConfig.cactusImage}
            alt="Cactus"
            width={180}
            height={180}
            className="object-contain"
            style={{
              maxHeight: '180px',
              filter: labTheme === 'openai'
                ? 'drop-shadow(0 0 30px rgba(16, 163, 127, 0.35))'
                : labTheme === 'gemini'
                ? 'drop-shadow(0 0 30px rgba(155, 114, 203, 0.4)) drop-shadow(0 0 60px rgba(66, 133, 244, 0.2))'
                : labTheme === 'xai'
                ? 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))'
                : undefined,
            }}
          />
        </motion.div>

        {/* Posts */}
        {loading ? (
          <p className={labTheme === 'xai' ? 'terminal-cursor' : ''} style={{ color: themeConfig.textMuted }}>
            {labTheme === 'xai' ? 'Loading' : 'Loading...'}
          </p>
        ) : posts.length === 0 ? (
          <p style={{ color: themeConfig.textMuted }}>No posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/posts/${post.id}`} className="block group">
                  <div
                    className={`p-4 -mx-4 transition-colors duration-200 ${getCardClass()}`}
                    style={{
                      border: labTheme === 'xai' ? undefined : themeConfig.cardBorder,
                    }}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h2
                        className={`text-lg group-hover:opacity-70 transition-opacity ${themeConfig.headingFont}`}
                        style={{ color: themeConfig.textPrimary }}
                      >
                        {post.title}
                      </h2>
                      <span
                        className="text-xs flex-shrink-0 ml-4"
                        style={{ color: themeConfig.textMuted }}
                      >
                        {post.date}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${themeConfig.bodyFont}`}
                      style={{ color: themeConfig.textSecondary }}
                    >
                      {post.excerpt}
                    </p>
                    {/* OpenAI green pill tags */}
                    {labTheme === 'openai' && post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'rgba(16, 163, 127, 0.12)',
                              color: '#10A37F',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Back */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Link
            href="/"
            className={`text-sm hover:opacity-70 transition-opacity ${labTheme === 'xai' ? 'uppercase tracking-wider' : ''}`}
            style={{ color: themeConfig.textMuted }}
          >
            ← back
          </Link>
        </motion.div>
      </div>
    </BlogThemeWrapper>
  );
}

export default function Blog() {
  return (
    <BlogThemeProvider>
      <BlogContent />
    </BlogThemeProvider>
  );
}
