import SITE from '@/constants/site';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 디자인 시스템 미리보기는 읽을거리가 아니라 내부 확인용 페이지입니다.
      disallow: ['/design-system/'],
    },
    sitemap: `${SITE.URL}/sitemap.xml`,
    host: SITE.URL,
  };
}
