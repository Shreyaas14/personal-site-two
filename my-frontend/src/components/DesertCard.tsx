'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DesertCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: 'wood' | 'sand' | 'leather';
}

export default function DesertCard({
  children,
  className = '',
  delay = 0,
  variant = 'wood',
}: DesertCardProps) {
  const variants = {
    wood: {
      background: 'linear-gradient(180deg, #5c4033 0%, #4a3728 50%, #3d2d1f 100%)',
      border: '#6b4423',
      shadow: 'rgba(61, 45, 31, 0.5)',
      grain: 'repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
    },
    sand: {
      background: 'linear-gradient(180deg, #e8d5b7 0%, #dcc9a3 50%, #d4bc8a 100%)',
      border: '#c9a962',
      shadow: 'rgba(180, 140, 80, 0.3)',
      grain: 'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.02) 1px, transparent 1px)',
    },
    leather: {
      background: 'linear-gradient(135deg, #8b5a2b 0%, #704214 50%, #5c3317 100%)',
      border: '#a0522d',
      shadow: 'rgba(92, 51, 23, 0.5)',
      grain: 'none',
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`relative ${className}`}
    >
      {/* Main card */}
      <div
        className="relative overflow-hidden rounded-sm"
        style={{
          background: style.background,
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -2px 0 rgba(0,0,0,0.2),
            0 4px 16px ${style.shadow},
            0 2px 4px rgba(0,0,0,0.2)
          `,
          border: `2px solid ${style.border}`,
        }}
      >
        {/* Wood grain / texture overlay */}
        {variant === 'wood' && (
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: style.grain,
              backgroundSize: '4px 100%',
            }}
          />
        )}

        {/* Corner nail/stud decorations for wood variant */}
        {variant === 'wood' && (
          <>
            <div
              className="absolute top-2 left-2 w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #c9a962, #8b6914)',
                boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.3)',
              }}
            />
            <div
              className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #c9a962, #8b6914)',
                boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.3)',
              }}
            />
            <div
              className="absolute bottom-2 left-2 w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #c9a962, #8b6914)',
                boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.3)',
              }}
            />
            <div
              className="absolute bottom-2 right-2 w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #c9a962, #8b6914)',
                boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.3)',
              }}
            />
          </>
        )}

        {/* Leather stitching effect */}
        {variant === 'leather' && (
          <div
            className="absolute inset-2 pointer-events-none rounded-sm"
            style={{
              border: '1px dashed rgba(255,255,255,0.15)',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 p-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
