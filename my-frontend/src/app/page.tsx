'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarNavigation from '@/components/StarNavigation';
import SkullScene from '@/components/SkullScene';
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function HomeContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [skullHovered, setSkullHovered] = useState(false);

  return (
    <div
      className="h-screen w-screen overflow-hidden relative transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#000000' : '#c4b8a5',
      }}
    >
      {/* Light mode: Paper texture overlay */}
      {!isDark && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'url(/crumpled_paper.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7,
            mixBlendMode: 'multiply',
          }}
        />
      )}

      {/* Dark mode: Star photo background */}
      {isDark && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/high_res_stars.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}


      {/* Theme toggle */}
      <ThemeToggle />

      {/* Star chart background with constellation */}
      <div className="absolute inset-0">
        <StarNavigation darkMode={isDark} />
      </div>

      {/* 3D Skull overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <SkullScene darkMode={isDark} />
      </motion.div>

      {/* Skull hover area for tooltip */}
      <div
        className="absolute bottom-[15%] right-[5%] w-[300px] h-[300px] pointer-events-auto cursor-help"
        onMouseEnter={() => setSkullHovered(true)}
        onMouseLeave={() => setSkullHovered(false)}
      />

      {/* University of Wyoming tooltip */}
      <AnimatePresence>
        {skullHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[calc(15%+310px)] right-[5%] z-50 pointer-events-none"
          >
            <div
              className="px-3 py-2 rounded text-sm"
              style={{
                backgroundColor: isDark ? 'rgba(20, 20, 30, 0.9)' : 'rgba(196, 179, 150, 0.95)',
                color: isDark ? '#e8e0d4' : '#4a3f2f',
                border: isDark ? '1px solid rgba(200, 198, 190, 0.3)' : '1px solid #8a7a60',
                boxShadow: isDark
                  ? '0 4px 12px rgba(0, 0, 0, 0.5)'
                  : '0 2px 8px rgba(90, 69, 48, 0.3)',
                fontFamily: isDark ? 'inherit' : 'Georgia, serif',
              }}
            >
              Allosaurus skull from the{' '}
              <span style={{ fontStyle: 'italic' }}>University of Wyoming</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
