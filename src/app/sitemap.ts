import SITE from '@/constants/site';
import { getAllPosts, getAllTags } from '@/lib/post/post';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE.URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.URL}/posts/`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE.URL}/log/`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.URL}/post/${post.slug}/`,
    lastModified: new Date(post.data.updatedTimeStamps ?? post.data.timeStamps),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE.URL}/posts/${encodeURIComponent(tag)}/`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticUrls, ...postUrls, ...tagUrls];
}
