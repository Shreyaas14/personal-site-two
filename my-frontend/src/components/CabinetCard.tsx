'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface CabinetCardProps {
  children: ReactNode;
  label?: string;
  sublabel?: string;
  className?: string;
  delay?: number;
  onClick?: () => void;
  href?: string;
}

export default function CabinetCard({
  children,
  label,
  sublabel,
  className = '',
  delay = 0,
  onClick,
  href,
}: CabinetCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${className}`}
      style={{ cursor: onClick || href ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      {/* Outer frame - aged wood/brass look */}
      <div
        className="relative p-1"
        style={{
          background: 'linear-gradient(135deg, #8b7355 0%, #6b5344 50%, #5a4535 100%)',
          borderRadius: '4px',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.3),
            0 4px 12px rgba(0,0,0,0.3),
            0 2px 4px rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* Inner frame border */}
        <div
          className="relative p-[2px]"
          style={{
            background: 'linear-gradient(135deg, #c9a962 0%, #a08050 50%, #8a7040 100%)',
            borderRadius: '2px',
          }}
        >
          {/* Glass/display area */}
          <div
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #f5f0e8 0%, #e8e0d4 100%)',
              borderRadius: '1px',
              minHeight: '200px',
            }}
          >
            {/* Subtle glass reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                opacity: isHovered ? 0.6 : 0.3,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Content area */}
            <div className="relative z-10 p-6">
              {children}
            </div>

            {/* Aged paper texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse at 20% 80%, rgba(139, 115, 85, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at 80% 20%, rgba(139, 115, 85, 0.08) 0%, transparent 40%)
                `,
              }}
            />
          </div>
        </div>
      </div>

      {/* Museum label plate */}
      {(label || sublabel) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="mt-3 text-center"
        >
          <div
            className="inline-block px-4 py-2 relative"
            style={{
              background: 'linear-gradient(180deg, #f5f0e8 0%, #e8dcc8 100%)',
              border: '1px solid #a08050',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            }}
          >
            {label && (
              <p
                className="text-sm font-serif tracking-wide"
                style={{ color: '#4a3f2f' }}
              >
                {label}
              </p>
            )}
            {sublabel && (
              <p
                className="text-xs mt-1 italic"
                style={{ color: '#6b5a4a' }}
              >
                {sublabel}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
