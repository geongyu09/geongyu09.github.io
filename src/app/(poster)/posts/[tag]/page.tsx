import JsonLd from '@/components/common/JsonLd';
import PostListView from '@/components/feature/Post/PostListView';
import SITE from '@/constants/site';
import { getAllTags, getFilteredPostsByTag } from '@/lib/post/post';
import { MIN_POSTS_TO_INDEX } from '@/lib/seo/indexing';
import {
  buildBreadcrumbJsonLd,
  buildPostCollectionJsonLd,
} from '@/lib/seo/jsonLd';
import type { Metadata } from 'next';

interface PostFilteredPageProps {
  params: Promise<{
    tag: string;
  }>;
}

const buildTagPageSeo = (tag: string) => {
  const decodedTag = decodeURIComponent(tag);
  const posts = getFilteredPostsByTag(decodedTag);

  return {
    decodedTag,
    posts,
    title: `#${decodedTag} 글 목록`,
    description: `'${decodedTag}' 태그가 달린 박건규의 기술 글 ${posts.length}편을 모았습니다.`,
    url: `${SITE.URL}/posts/${encodeURIComponent(decodedTag)}/`,
  };
};

export async function generateMetadata({
  params,
}: PostFilteredPageProps): Promise<Metadata> {
  const { tag } = await params;
  const { decodedTag, posts, title, description, url } = buildTagPageSeo(tag);
  const indexable = posts.length >= MIN_POSTS_TO_INDEX;

  return {
    title,
    description,
    keywords: [decodedTag],
    alternates: { canonical: url },
    robots: { index: indexable, follow: true },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SITE.TITLE,
      locale: 'ko_KR',
      images: [
        { url: SITE.OG_IMAGE, width: 1200, height: 630, alt: SITE.TITLE },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SITE.OG_IMAGE],
    },
  };
}

export default async function PostFilteredPage({
  params,
}: PostFilteredPageProps) {
  const { tag } = await params;
  const { decodedTag, posts, title, description, url } = buildTagPageSeo(tag);

  return (
    <>
      <JsonLd
        data={buildPostCollectionJsonLd({
          name: title,
          description,
          url,
          posts,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: '홈', url: '/' },
          { name: '글 목록', url: '/posts/' },
          {
            name: `#${decodedTag}`,
            url: `/posts/${encodeURIComponent(decodedTag)}/`,
          },
        ])}
      />
      <PostListView activeTag={tag} />
    </>
  );
}

export function generateStaticParams() {
  const allTags = getAllTags();
  const params = allTags.map((tag) => ({
    tag: decodeURIComponent(tag),
  }));
  return params;
}
