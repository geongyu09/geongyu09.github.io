import PostListView from '@/components/feature/Post/PostListView';
import SITE from '@/constants/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '글 목록',
  description:
    '박건규가 프론트엔드·함수형·AI 도구에 대해 쓴 기술 글 모음입니다.',
  alternates: { canonical: `${SITE.URL}/posts/` },
  openGraph: {
    type: 'website',
    url: `${SITE.URL}/posts/`,
    title: '글 목록',
    description:
      '박건규가 프론트엔드·함수형·AI 도구에 대해 쓴 기술 글 모음입니다.',
    siteName: SITE.TITLE,
  },
};

export default function PostPage() {
  return <PostListView />;
}
