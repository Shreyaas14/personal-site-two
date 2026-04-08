'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrism from 'rehype-prism-plus';
import type { LabTheme } from '@/config/labThemes';

const themeLinkStyles: Record<LabTheme, string> = {
  anthropic: 'text-[#C15F3C] hover:text-[#D97757] underline decoration-[#D97757]/40 hover:decoration-[#D97757] transition-colors duration-300',
  openai: 'text-[#10A37F] hover:text-[#14C594] no-underline hover:underline transition-colors duration-300',
  gemini: 'text-[#4285F4] hover:text-[#669DF6] underline decoration-[#4285F4]/40 transition-colors duration-300',
  xai: 'text-white no-underline border-b border-white/40 hover:border-white transition-colors duration-300',
};

interface MarkdownProps {
  content: string;
  labTheme?: LabTheme;
}

export default function Markdown({ content, labTheme }: MarkdownProps) {
  const linkClassName = labTheme
    ? themeLinkStyles[labTheme]
    : 'text-cream-100 hover:text-gold underline decoration-cream-400 hover:decoration-gold transition-colors duration-300';

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSanitize,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypeExternalLinks, { target: '_blank', rel: ['nofollow','noopener','noreferrer'] }],
        [rehypePrism, { ignoreMissing: true }],
      ]}
      components={{
        a: (props) => (
          <a
            {...props}
            className={linkClassName}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
