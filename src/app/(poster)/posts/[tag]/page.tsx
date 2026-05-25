import PostListView from '@/components/feature/Post/PostListView';
import { getAllTags } from '@/lib/post/post';

interface PostFilteredPageProps {
  params: {
    tag: string;
  };
}

export default function PostFilteredPage({
  params: { tag },
}: PostFilteredPageProps) {
  return <PostListView activeTag={tag} />;
}

export function generateStaticParams() {
  const allTags = getAllTags();
  const params = allTags.map((tag) => ({
    tag: decodeURIComponent(tag),
  }));
  return params;
}
