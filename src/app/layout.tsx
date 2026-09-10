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

/**
 * 서치 콘솔 소유 확인 코드가 채워져 있을 때만 메타 태그로 내보냅니다.
 */
const verification: Metadata['verification'] = {
  ...(SITE.GOOGLE_SITE_VERIFICATION
    ? { google: SITE.GOOGLE_SITE_VERIFICATION as string }
    : {}),
  ...(SITE.NAVER_SITE_VERIFICATION
    ? {
        other: {
          'naver-site-verification': SITE.NAVER_SITE_VERIFICATION as string,
        },
      }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.URL),
  title: {
    default: SITE.TITLE_WITH_TAGLINE,
    template: `%s | ${SITE.TITLE}`,
  },
  description: SITE.DESCRIPTION,
  keywords: [...SITE.KEYWORDS],
  authors: [{ name: SITE.AUTHOR.name, url: SITE.AUTHOR.link }],
  creator: SITE.AUTHOR.name,
  publisher: SITE.AUTHOR.name,
  applicationName: SITE.TITLE,
  category: 'technology',
  ...(Object.keys(verification).length > 0 ? { verification } : {}),
  alternates: {
    canonical: `${SITE.URL}/`,
    types: {
      'application/rss+xml': `${SITE.URL}/rss.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: `${SITE.URL}/`,
    siteName: SITE.TITLE,
    title: SITE.TITLE_WITH_TAGLINE,
    description: SITE.DESCRIPTION,
    images: [
      {
        url: SITE.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE.TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.TITLE_WITH_TAGLINE,
    description: SITE.DESCRIPTION,
    images: [SITE.OG_IMAGE],
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
    <html lang="ko" suppressHydrationWarning>
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
