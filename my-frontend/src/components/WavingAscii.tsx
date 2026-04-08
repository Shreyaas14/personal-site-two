'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface WavingAsciiProps {
  art: string;
  speed?: number;
  amplitude?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function WavingAscii({
  art,
  speed = 0.05,
  amplitude = 0.3,
  className = '',
  style = {},
}: WavingAsciiProps) {
  const [displayArt, setDisplayArt] = useState(art);
  const timeRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const lines = art.split('\n');
    const maxWidth = Math.max(...lines.map(l => l.length));

    // Pad lines to equal width
    const paddedLines = lines.map(line => line.padEnd(maxWidth, ' '));

    const renderFrame = () => {
      timeRef.current += speed;
      const t = timeRef.current;

      const newLines = paddedLines.map((line, y) => {
        // Calculate wave offset for this row
        const waveOffset = Math.sin(t + y * 0.3) * amplitude;
        const charOffset = Math.round(waveOffset);

        if (charOffset === 0) return line;

        // Shift characters horizontally
        if (charOffset > 0) {
          return ' '.repeat(charOffset) + line.slice(0, -charOffset);
        } else {
          return line.slice(-charOffset) + ' '.repeat(-charOffset);
        }
      });

      setDisplayArt(newLines.join('\n'));
      frameRef.current = requestAnimationFrame(renderFrame);
    };

    frameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [art, speed, amplitude]);

  return (
    <motion.pre
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`font-mono leading-tight select-none whitespace-pre ${className}`}
      style={{
        fontFamily: 'monospace',
        ...style,
      }}
    >
      {displayArt}
    </motion.pre>
  );
}
