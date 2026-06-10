import PostListView from '@/components/feature/Post/PostListView';
import { getAllTags } from '@/lib/post/post';

interface PostFilteredPageProps {
  params: Promise<{
    tag: string;
  }>;
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
