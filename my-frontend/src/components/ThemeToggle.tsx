'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        // Dark mode: subtle moon | Light mode: drawn sun
        width: 48,
        height: 48,
        borderRadius: '0',
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
      }}
    >
      {isDark ? (
        // Simple moon - like it's part of the night sky
        <svg width="32" height="32" viewBox="0 0 24 24">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="rgba(240, 238, 230, 0.9)"
            stroke="rgba(200, 198, 190, 0.5)"
            strokeWidth="0.5"
          />
        </svg>
      ) : (
        // Sketched Sun - drawn directly on paper
        <svg width="48" height="48" viewBox="0 0 48 48" className="relative">
          {/* Main sun circle - hand-drawn style with slight irregularity */}
          <ellipse
            cx="24"
            cy="24"
            rx="8"
            ry="7.5"
            fill="none"
            stroke="#6b5540"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Second pass for sketchy effect */}
          <ellipse
            cx="24"
            cy="24"
            rx="7.8"
            ry="7.8"
            fill="none"
            stroke="#8a7050"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="2,3"
            opacity="0.5"
          />

          {/* Inner fill - aged ink wash */}
          <circle cx="24" cy="24" r="5" fill="#c9a962" opacity="0.3" />

          {/* Rays - varying lengths and slight wobble for hand-drawn feel */}
          {[
            { angle: 0, len: 7, wobble: 0.2 },
            { angle: 45, len: 5, wobble: -0.3 },
            { angle: 90, len: 7, wobble: 0.1 },
            { angle: 135, len: 5, wobble: 0.4 },
            { angle: 180, len: 7, wobble: -0.2 },
            { angle: 225, len: 5, wobble: 0.3 },
            { angle: 270, len: 7, wobble: -0.1 },
            { angle: 315, len: 5, wobble: -0.4 },
          ].map(({ angle, len, wobble }) => {
            const rad = ((angle + wobble * 5) * Math.PI) / 180;
            const startR = 10;
            const endR = startR + len;
            return (
              <line
                key={angle}
                x1={24 + Math.cos(rad) * startR}
                y1={24 + Math.sin(rad) * startR}
                x2={24 + Math.cos(rad) * endR}
                y2={24 + Math.sin(rad) * endR}
                stroke="#6b5540"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
            );
          })}

          {/* Extra sketch marks - like pen strokes */}
          <line x1="24" y1="2" x2="24" y2="5" stroke="#8a7050" strokeWidth="1" opacity="0.4" />
          <line x1="24" y1="43" x2="24" y2="46" stroke="#8a7050" strokeWidth="1" opacity="0.4" />
          <line x1="2" y1="24" x2="5" y2="24" stroke="#8a7050" strokeWidth="1" opacity="0.4" />
          <line x1="43" y1="24" x2="46" y2="24" stroke="#8a7050" strokeWidth="1" opacity="0.4" />

          {/* Small dots like ink spots */}
          <circle cx="24" cy="24" r="1.5" fill="#5a4530" opacity="0.4" />
          <circle cx="28" cy="20" r="0.5" fill="#6b5540" opacity="0.3" />
          <circle cx="20" cy="28" r="0.5" fill="#6b5540" opacity="0.3" />
        </svg>
      )}
    </motion.button>
  );
}
