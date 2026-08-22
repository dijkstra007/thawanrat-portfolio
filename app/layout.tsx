import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
