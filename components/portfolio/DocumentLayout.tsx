import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { assetPath } from '@/lib/assets';
import '@/app/globals.css';

const lineSeedSans = localFont({
  variable: '--font-line-seed',
  src: [
    { path: '../../public/fonts/line-seed/EN-LINESeedSans_W_Rg.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/line-seed/EN-LINESeedSans_W_Bd.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  adjustFontFallback: false,
});
const lineSeedSansThai = localFont({
  variable: '--font-line-seed-th',
  src: [
    { path: '../../public/fonts/line-seed/TH-LINESeedSansTH_W_Rg.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/line-seed/TH-LINESeedSansTH_W_Bd.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: assetPath('/favicon.png'), type: 'image/png', sizes: '512x512' },
      { url: assetPath('/favicon.svg'), type: 'image/svg+xml', sizes: 'any' },
    ],
  },
};

export default function DocumentLayout({ children, locale }: Readonly<{
  children: React.ReactNode;
  locale: 'en' | 'th';
}>) {
  return (
    <html lang={locale} data-locale={locale}>
      <body className={`${lineSeedSans.variable} ${lineSeedSansThai.variable} antialiased`}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
