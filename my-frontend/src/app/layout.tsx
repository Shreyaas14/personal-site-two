import './globals.css';
import localFont from 'next/font/local';
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const generalSans = localFont({
  src: [
    {
      path: '../../public/fonts/WEB/fonts/GeneralSans-Variable.woff2',
      weight: '200 700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/WEB/fonts/GeneralSans-VariableItalic.woff2',
      weight: '200 700',
      style: 'italic',
    },
  ],
  variable: '--font-general-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
});

export const metadata = {
  title: 'Sudden Realization',
  description: 'by Shreyaas Sureshbabu',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${generalSans.variable} ${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}