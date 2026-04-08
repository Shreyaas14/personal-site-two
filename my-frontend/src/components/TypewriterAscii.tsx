'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterAsciiProps {
  art: string;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  startDelay?: number;
}

export default function TypewriterAscii({
  art,
  speed = 2, // characters per frame
  className = '',
  style = {},
  onComplete,
  startDelay = 0,
}: TypewriterAsciiProps) {
  const [displayArt, setDisplayArt] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const chars = art.split('');
    const totalChars = chars.length;

    const renderFrame = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;

      // Wait for start delay
      if (elapsed < startDelay) {
        frameRef.current = requestAnimationFrame(renderFrame);
        return;
      }

      // Add characters
      const newIndex = Math.min(indexRef.current + speed, totalChars);

      if (newIndex !== indexRef.current) {
        indexRef.current = newIndex;
        setDisplayArt(chars.slice(0, Math.floor(newIndex)).join(''));
      }

      if (newIndex >= totalChars) {
        setIsComplete(true);
        onComplete?.();
        return;
      }

      frameRef.current = requestAnimationFrame(renderFrame);
    };

    frameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [art, speed, onComplete, startDelay]);

  return (
    <motion.pre
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`font-mono leading-tight select-none whitespace-pre ${className}`}
      style={{
        fontFamily: 'monospace',
        ...style,
      }}
    >
      {displayArt}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ color: '#c9a962' }}
        >
          ▌
        </motion.span>
      )}
    </motion.pre>
  );
}
