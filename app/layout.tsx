import type { Metadata } from 'next';
import { Noto_Sans_Thai, Poppins } from 'next/font/google';
import './globals.css';

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

const siteOrigin = (process.env.SITE_ORIGIN ?? 'http://localhost:3000').replace(/\/$/, '');
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'Thawanrat T. — Graphic Designer',
  description:
    'Portfolio of Thawanrat T., a graphic designer specializing in packaging design and brand identity.',
  icons: {
    icon: `${publicBasePath}/favicon.png`,
  },
  openGraph: {
    title: 'Thawanrat T. — Graphic Designer',
    description: 'Packaging Design · Brand Identity · Visual Communication',
    type: 'website',
    images: [
      {
        url: `${siteOrigin}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Thawanrat T. graphic design portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thawanrat T. — Graphic Designer',
    description: 'Packaging Design · Brand Identity · Visual Communication',
    images: [`${siteOrigin}/og.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${notoSansThai.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
