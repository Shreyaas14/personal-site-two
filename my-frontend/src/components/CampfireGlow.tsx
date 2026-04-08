'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CampfireGlowProps {
  className?: string;
  intensity?: number;
}

export default function CampfireGlow({ className = '', intensity = 1 }: CampfireGlowProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      {/* Animated glow layers */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.3 * intensity, 0.5 * intensity, 0.35 * intensity, 0.45 * intensity, 0.3 * intensity],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 140, 50, 0.3) 0%, transparent 60%)',
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.2 * intensity, 0.4 * intensity, 0.25 * intensity, 0.35 * intensity, 0.2 * intensity],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 80, 20, 0.2) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}

// ASCII Campfire component
export function AsciiCampfire({ className = '' }: { className?: string }) {
  const frames = [
    `
     (  )
    (    )
   (      )
    )    (
   (  ()  )
    \\||||/
   __\\||/__
    `,
    `
    (    )
   (  ()  )
  (        )
   (  )(  )
    ) () (
    \\||||/
   __\\||/__
    `,
    `
   (      )
    ( )( )
   (      )
    (    )
   (  ()  )
    \\||||/
   __\\||/__
    `,
  ];

  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((i) => (i + 1) % frames.length);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre
      className={`font-mono text-xs leading-tight ${className}`}
      style={{ color: '#f4a261' }}
    >
      {frames[frameIndex]}
    </pre>
  );
}
