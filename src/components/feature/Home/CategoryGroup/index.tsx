import PostCard from '@/components/ds/PostCard';
import { Category } from '@/constants/category';
import ROUTE_PATH from '@/constants/path/routePath';
import { Post } from '@/types/post';
import Link from 'next/link';

interface CategoryGroupProps {
  category: Category;
  posts: Post[];
}

const splitTags = (raw: string) =>
  raw
    .split(' ')
    .map((t) => t.trim())
    .filter(Boolean);

export default function CategoryGroup({ category, posts }: CategoryGroupProps) {
  return (
    <div className="flex flex-col">
      <header className="flex items-baseline justify-between mb-s-3">
        <div className="flex items-baseline gap-s-4">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-500">
            {`/ ${category.id}`}
          </span>
          <h3 className="text-h3 m-0">{category.label}</h3>
        </div>
        <Link href={category.moreHref} className="ds-link text-sm">
          모두 보기 →
        </Link>
      </header>

      <div className="flex flex-col">
        {posts.map((post) => (
          <PostCard
            key={`${category.id}-${post.slug}`}
            href={ROUTE_PATH.POST_DETAIL({ slug: post.slug })}
            date={post.data.date}
            title={post.data.title}
            excerpt={post.data.description}
            tags={splitTags(post.data.tags).slice(0, 3)}
          />
        ))}
      </div>
    </div>
  );
}
