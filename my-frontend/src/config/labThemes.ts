export type LabTheme = 'anthropic' | 'openai' | 'gemini' | 'xai';

export interface LabThemeConfig {
  name: string;
  backgroundColor: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  linkColor: string;
  linkHoverColor: string;
  headingFont: string;
  bodyFont: string;
  cardBorder: string;
  cardHoverBg: string;
  dividerColor: string;
  proseOverrides: Record<string, string>;
  entryAnimationConfig: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initial: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animate: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: Record<string, any>;
  };
  pageTitle: string;
  cactusImage: string;
  cactusShadow: string;
}

export const labThemes: Record<LabTheme, LabThemeConfig> = {
  anthropic: {
    name: 'Anthropic',
    backgroundColor: '#F5F5F0',
    textPrimary: '#131314',
    textSecondary: '#4A4235',
    textMuted: '#8B7D6B',
    accent: '#D97757',
    linkColor: '#C15F3C',
    linkHoverColor: '#D97757',
    headingFont: 'font-styrene',
    bodyFont: 'font-styrene',
    cardBorder: '1px solid rgba(217, 119, 87, 0.15)',
    cardHoverBg: 'rgba(217, 119, 87, 0.04)',
    dividerColor: '#D97757',
    proseOverrides: {
      '--tw-prose-body': '#4A4235',
      '--tw-prose-headings': '#131314',
      '--tw-prose-links': '#C15F3C',
      '--tw-prose-bold': '#131314',
      '--tw-prose-quotes': '#6B5D50',
    },
    entryAnimationConfig: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    pageTitle: 'Writing',
    cactusImage: '/anthropic_cactus_nobg.png',
    cactusShadow: 'none',
  },

  openai: {
    name: 'OpenAI',
    backgroundColor: '#080808',
    textPrimary: '#ECECEC',
    textSecondary: '#A0A0A0',
    textMuted: '#6E6E6E',
    accent: '#10A37F',
    linkColor: '#10A37F',
    linkHoverColor: '#14C594',
    headingFont: 'font-sans',
    bodyFont: 'font-sans',
    cardBorder: '1px solid rgba(255, 255, 255, 0.06)',
    cardHoverBg: 'rgba(16, 163, 127, 0.05)',
    dividerColor: '#10A37F',
    proseOverrides: {
      '--tw-prose-body': '#A0A0A0',
      '--tw-prose-headings': '#ECECEC',
      '--tw-prose-links': '#10A37F',
      '--tw-prose-bold': '#ECECEC',
      '--tw-prose-quotes': '#7A7A7A',
    },
    entryAnimationConfig: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    pageTitle: 'Blog',
    cactusImage: '/gpt_cactus_nobg.png',
    cactusShadow: '0 0 40px rgba(16, 163, 127, 0.3), 0 0 80px rgba(16, 163, 127, 0.15)',
  },

  gemini: {
    name: 'Gemini',
    backgroundColor: '#131314',
    textPrimary: '#E3E3E3',
    textSecondary: '#B8B8B8',
    textMuted: '#7A7A7A',
    accent: '#4285F4',
    linkColor: '#4285F4',
    linkHoverColor: '#669DF6',
    headingFont: 'font-gemini',
    bodyFont: 'font-gemini',
    cardBorder: '1px solid rgba(255, 255, 255, 0.08)',
    cardHoverBg: 'rgba(66, 133, 244, 0.06)',
    dividerColor: 'linear-gradient(90deg, #4285F4, #9B72CB, #D96570)',
    proseOverrides: {
      '--tw-prose-body': '#B8B8B8',
      '--tw-prose-headings': '#E3E3E3',
      '--tw-prose-links': '#4285F4',
      '--tw-prose-bold': '#E3E3E3',
      '--tw-prose-quotes': '#9A9A9A',
    },
    entryAnimationConfig: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    pageTitle: 'Writing',
    cactusImage: '/gemini_cactus_nobg.png',
    cactusShadow: '0 0 40px rgba(66, 133, 244, 0.3), 0 0 80px rgba(155, 114, 203, 0.2)',
  },

  xai: {
    name: 'xAI',
    backgroundColor: '#000000',
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textMuted: '#666666',
    accent: '#FFFFFF',
    linkColor: '#FFFFFF',
    linkHoverColor: '#CCCCCC',
    headingFont: 'font-sans',
    bodyFont: 'font-sans',
    cardBorder: 'none',
    cardHoverBg: 'rgba(255, 255, 255, 0.03)',
    dividerColor: '#FFFFFF',
    proseOverrides: {
      '--tw-prose-body': '#CCCCCC',
      '--tw-prose-headings': '#FFFFFF',
      '--tw-prose-links': '#FFFFFF',
      '--tw-prose-bold': '#FFFFFF',
      '--tw-prose-quotes': '#999999',
    },
    entryAnimationConfig: {
      initial: { clipPath: 'inset(0 0 100% 0)' },
      animate: { clipPath: 'inset(0 0 0% 0)' },
      transition: { duration: 0.4, ease: 'linear' },
    },
    pageTitle: 'Posts',
    cactusImage: '/grok_cactus_nobg.png',
    cactusShadow: '0 0 30px rgba(255, 255, 255, 0.15), 0 0 60px rgba(255, 255, 255, 0.08)',
  },
};

export const themeOrder: LabTheme[] = ['anthropic', 'openai', 'gemini', 'xai'];
