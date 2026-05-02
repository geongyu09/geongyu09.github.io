import CategoryPostCard from '@/components/common/Item/CategoryPostCard';
import { Category } from '@/constants/category';
import ROUTE_PATH from '@/constants/path/routePath';
import { Post } from '@/types/post';
import Link from 'next/link';

interface CategoryGroupProps {
  category: Category;
  posts: Post[];
}

export default function CategoryGroup({ category, posts }: CategoryGroupProps) {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-end justify-between">
        <h3 className="text-3xl font-medium text-[#1A1A1A]">
          {category.label}
        </h3>
        <Link
          href={category.moreHref}
          className="text-sm text-[#C8B496] transition-colors hover:text-[#1A1A1A]"
        >
          모두 보기 &rarr;
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {posts.map(
          ({ slug, data: { title, description, date, thumbnail } }) => (
            <CategoryPostCard
              key={`${category.id}-${slug}`}
              title={title}
              description={description}
              date={date}
              href={ROUTE_PATH.POST_DETAIL({ slug })}
              image={thumbnail}
            />
          ),
        )}
      </div>
    </div>
  );
}
