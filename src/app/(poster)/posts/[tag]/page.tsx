import PostListView from '@/components/feature/Post/PostListView';
import SITE from '@/constants/site';
import { getAllTags } from '@/lib/post/post';
import type { Metadata } from 'next';

interface PostFilteredPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostFilteredPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const title = `#${decodedTag} 글 목록`;
  const description = `'${decodedTag}' 태그가 달린 박건규의 기술 글 모음입니다.`;
  const url = `${SITE.URL}/posts/${encodeURIComponent(decodedTag)}/`;

  return {
    title,
    description,
    keywords: [decodedTag],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SITE.TITLE,
    },
  };
}

export default async function PostFilteredPage({
  params,
}: PostFilteredPageProps) {
  const { tag } = await params;
  return <PostListView activeTag={tag} />;
}

export function generateStaticParams() {
  const allTags = getAllTags();
  const params = allTags.map((tag) => ({
    tag: decodeURIComponent(tag),
  }));
  return params;
}
