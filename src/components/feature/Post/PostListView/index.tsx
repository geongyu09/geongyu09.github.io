import {
  getAllPosts,
  getAllTags,
  getFilteredPostsByTag,
} from '@/lib/post/post';
import PostListClient from './PostListClient';

interface PostListViewProps {
  activeTag?: string;
}

export default function PostListView({ activeTag }: PostListViewProps) {
  const totalPosts = getAllPosts();
  const posts = activeTag
    ? getFilteredPostsByTag(decodeURIComponent(activeTag))
    : totalPosts;
  const allTags = getAllTags();

  return (
    <PostListClient
      posts={posts}
      totalCount={totalPosts.length}
      allTags={allTags}
      activeTag={activeTag}
    />
  );
}

PostListView.defaultProps = {
  activeTag: undefined,
};
