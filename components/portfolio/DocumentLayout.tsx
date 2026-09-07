import type { Metadata } from 'next';
import { Noto_Sans_Thai, Poppins } from 'next/font/google';
import '@/app/globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
});

const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-sans-thai',
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = { icons: { icon: '/favicon.png' } };

export default function DocumentLayout({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: 'en' | 'th';
}>) {
  return (
    <html lang={locale} data-locale={locale}>
      <body className={`${poppins.variable} ${notoSansThai.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
