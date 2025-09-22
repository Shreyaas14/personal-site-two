import './globals.css';
import localFont from 'next/font/local';

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

export const metadata = {
  title: 'My Sleek Blog',
  description: 'A SSENSE, Rick Owens, B Magazine-inspired blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${generalSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}