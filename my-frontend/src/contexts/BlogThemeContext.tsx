'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { LabTheme, LabThemeConfig, labThemes, themeOrder } from '@/config/labThemes';

interface BlogThemeContextType {
  labTheme: LabTheme;
  themeConfig: LabThemeConfig;
}

const BlogThemeContext = createContext<BlogThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'blog-theme-counter';

function getNextTheme(): { labTheme: LabTheme; themeConfig: LabThemeConfig } {
  let counter = 0;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      counter = parseInt(stored, 10);
      if (isNaN(counter)) counter = 0;
    }
    localStorage.setItem(STORAGE_KEY, String(counter + 1));
  } catch {
    // localStorage unavailable — default to 0
  }
  const theme = themeOrder[counter % themeOrder.length];
  return { labTheme: theme, themeConfig: labThemes[theme] };
}

export function BlogThemeProvider({ children }: { children: ReactNode }) {
  const [themeState, setThemeState] = useState<BlogThemeContextType>({
    labTheme: 'anthropic',
    themeConfig: labThemes.anthropic,
  });
  const [ready, setReady] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    // Guard against React Strict Mode double-firing useEffect
    if (hasRun.current) return;
    hasRun.current = true;

    const result = getNextTheme();
    setThemeState(result);
    setReady(true);
  }, []);

  return (
    <BlogThemeContext.Provider value={themeState}>
      {ready ? children : (
        <div style={{ minHeight: '100vh', backgroundColor: themeState.themeConfig.backgroundColor }} />
      )}
    </BlogThemeContext.Provider>
  );
}

export function useBlogTheme() {
  const context = useContext(BlogThemeContext);
  if (context === undefined) {
    throw new Error('useBlogTheme must be used within a BlogThemeProvider');
  }
  return context;
}
