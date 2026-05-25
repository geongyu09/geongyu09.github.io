import PostCard, { FeaturedPostCard } from '@/components/ds/PostCard';
import ROUTE_PATH from '@/constants/path/routePath';
import { getCurrentPosts } from '@/lib/post/post';

interface CurrentPostsSectionProps {
  amount: number;
}

const splitTags = (raw: string) =>
  raw
    .split(' ')
    .map((t) => t.trim())
    .filter(Boolean);

export default function CurrentPostsSection({
  amount,
}: CurrentPostsSectionProps) {
  const posts = getCurrentPosts(amount);

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <div className="flex flex-col">
      <FeaturedPostCard
        href={ROUTE_PATH.POST_DETAIL({ slug: featured.slug })}
        eyebrow="★ FEATURED · 최근 글"
        date={featured.data.date}
        title={featured.data.title}
        excerpt={featured.data.description}
        tags={splitTags(featured.data.tags).slice(0, 3)}
      />
      {rest.length > 0 && (
        <div className="flex flex-col">
          {rest.map((post) => (
            <PostCard
              key={post.slug}
              href={ROUTE_PATH.POST_DETAIL({ slug: post.slug })}
              date={post.data.date}
              title={post.data.title}
              excerpt={post.data.description}
              tags={splitTags(post.data.tags).slice(0, 3)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
