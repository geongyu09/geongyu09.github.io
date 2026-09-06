import SITE from '@/constants/site';
import { getAllPosts, getFilteredPostsByTag } from '@/lib/post/post';
import { getIndexableTags } from '@/lib/seo/indexing';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const lastModifiedOf = (post: {
  data: { timeStamps: number; updatedTimeStamps?: number };
}) => new Date(post.data.updatedTimeStamps ?? post.data.timeStamps);

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getIndexableTags();
  const latestUpdate = lastModifiedOf(posts[0]);

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${SITE.URL}/`,
      lastModified: latestUpdate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.URL}/posts/`,
      lastModified: latestUpdate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE.URL}/log/`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.URL}/post/${post.slug}/`,
    lastModified: lastModifiedOf(post),
    changeFrequency: 'monthly',
    priority: 0.8,
    // 썸네일을 함께 적어 이미지 검색에도 걸리도록 합니다.
    images: [`${SITE.URL}${post.data.thumbnail}`],
  }));

  const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE.URL}/posts/${encodeURIComponent(tag)}/`,
    lastModified: lastModifiedOf(getFilteredPostsByTag(tag)[0]),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticUrls, ...postUrls, ...tagUrls];
}
