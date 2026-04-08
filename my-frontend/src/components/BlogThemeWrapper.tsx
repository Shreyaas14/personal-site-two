'use client';

import { motion } from 'framer-motion';
import { useBlogTheme } from '@/contexts/BlogThemeContext';

export default function BlogThemeWrapper({ children }: { children: React.ReactNode }) {
  const { labTheme, themeConfig } = useBlogTheme();

  return (
    <motion.div
      className="min-h-screen relative"
      style={{ backgroundColor: themeConfig.backgroundColor }}
      initial={themeConfig.entryAnimationConfig.initial}
      animate={themeConfig.entryAnimationConfig.animate}
      transition={themeConfig.entryAnimationConfig.transition}
    >
      {/* Gemini gradient top bar */}
      {labTheme === 'gemini' && (
        <div
          className="fixed top-0 left-0 right-0 h-[2px] z-50"
          style={{
            background: 'linear-gradient(90deg, #4285F4, #9B72CB, #D96570)',
          }}
        />
      )}

      {/* xAI scanline overlay */}
      {labTheme === 'xai' && (
        <div
          className="fixed inset-0 pointer-events-none z-40"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
          }}
        />
      )}

      {children}

      {/* Watermark */}
      <div
        className="fixed bottom-4 right-4 z-50"
        style={{
          fontSize: '10px',
          opacity: 0.3,
          color: themeConfig.textMuted,
        }}
      >
        styled after {themeConfig.name}
      </div>
    </motion.div>
  );
}
