import SsgoiProvider from '@/components/common/SsgoiProvider';
import ThemeScript from '@/components/common/Theme/ThemeScript';
import Footer from '@/components/feature/layout/Footer';
import Header from '@/components/feature/layout/Header';
import SITE from '@/constants/site';
import ModalProvider from '@/lib/modal/provider';
import Analytics from '@/service/Analytics';
import type { Metadata } from 'next';
import Script from 'next/dist/client/script';
import { PropsWithChildren } from 'react';
import Gap from '../components/common/layout/Gap/index';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.URL),
  title: {
    default: `${SITE.TITLE} | Blog`,
    template: `%s | ${SITE.TITLE}`,
  },
  description: SITE.DESCRIPTION,
  authors: [{ name: SITE.AUTHOR.name, url: SITE.AUTHOR.link }],
  creator: SITE.AUTHOR.name,
  publisher: SITE.AUTHOR.name,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${SITE.URL}/rss.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE.URL,
    siteName: SITE.TITLE,
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ko">
      <head>
        <ThemeScript />
        <Analytics />
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <ModalProvider>
        <body>
          <Header />
          <SsgoiProvider>
            <main className="bg-ink-0 min-h-fit-to-screen relative">
              {children}
            </main>
          </SsgoiProvider>
          <Gap size={10} />
          <div>
            <Footer />
          </div>
        </body>
      </ModalProvider>
    </html>
  );
}
