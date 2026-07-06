import SITE from '@/constants/site';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE.URL}/sitemap.xml`,
    host: SITE.URL,
  };
}
