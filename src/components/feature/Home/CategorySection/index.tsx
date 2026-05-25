import SectionHeading from '@/components/ds/SectionHeading';
import CategoryGroup from '@/components/feature/Home/CategoryGroup';
import { getCategorizedPostGroups } from '@/lib/post/category';

export default function CategorySection() {
  const groups = getCategorizedPostGroups(3);

  if (groups.length === 0) return null;

  return (
    <section className="bg-ink-50 border-y border-ink-200">
      <div className="max-w-container mx-auto px-s-5 lg:px-s-7 py-s-9">
        <SectionHeading meta={`${groups.length} categories`}>
          By category · 카테고리별 포스트
        </SectionHeading>

        <div className="flex flex-col gap-s-9">
          {groups.map(({ category, posts }) => (
            <CategoryGroup
              key={category.id}
              category={category}
              posts={posts}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
