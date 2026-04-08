'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedAsciiProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedAscii({ children, className = '' }: AnimatedAsciiProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -4, 0],
        opacity: [0.3, 0.45, 0.3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
