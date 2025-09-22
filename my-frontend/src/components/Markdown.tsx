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

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="prose prose-invert max-w-none"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,                        // turn raw HTML in markdown into HAST
        rehypeSanitize,                   // then sanitize it (safe)
        rehypeSlug,                       // add ids to headings
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypeExternalLinks, { target: '_blank', rel: ['nofollow','noopener','noreferrer'] }],
        [rehypePrism, { ignoreMissing: true }], // code highlighting
      ]}
      components={{
        a: (props) => (
          <a
            {...props}
            className="text-white underline decoration-gray-500 hover:decoration-gray-300 transition-colors duration-300"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
