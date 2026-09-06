import JsonLd from '@/components/common/JsonLd';
import PostListView from '@/components/feature/Post/PostListView';
import SITE from '@/constants/site';
import { getAllPosts } from '@/lib/post/post';
import {
  buildBreadcrumbJsonLd,
  buildPostCollectionJsonLd,
} from '@/lib/seo/jsonLd';
import type { Metadata } from 'next';

const PAGE_TITLE = '전체 글 목록';
const PAGE_DESCRIPTION =
  '박건규가 React, 테스트 코드, 함수형 프로그래밍, 웹뷰, AI 개발 도구에 대해 쓴 기술 글을 연도별로 모아두었습니다.';
const PAGE_URL = `${SITE.URL}/posts/`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: SITE.TITLE,
    locale: 'ko_KR',
    images: [{ url: SITE.OG_IMAGE, width: 1200, height: 630, alt: SITE.TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SITE.OG_IMAGE],
  },
};

export default function PostPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={buildPostCollectionJsonLd({
          name: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          url: PAGE_URL,
          posts,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: '홈', url: '/' },
          { name: '글 목록', url: '/posts/' },
        ])}
      />
      <PostListView />
    </>
  );
}
