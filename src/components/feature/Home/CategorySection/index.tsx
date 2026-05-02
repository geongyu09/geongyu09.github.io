import Container from '@/components/common/layout/Container';
import CategoryGroup from '@/components/feature/Home/CategoryGroup';
import { getCategorizedPostGroups } from '@/lib/post/category';
import { Fragment } from 'react';

export default function CategorySection() {
  const groups = getCategorizedPostGroups(3);

  if (groups.length === 0) return null;

  return (
    <section className="bg-[#F4F2EF] py-20">
      <Container responsive="default">
        <header className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold text-[#1A1A1A]">
            카테고리별 포스트
          </h2>
          <p className="text-base text-[#4A4A4A]">
            관심있는 주제의 글을 모아서 확인해 보세요.
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-12">
          {groups.map(({ category, posts }, index) => (
            <Fragment key={category.id}>
              {index > 0 && <div className="h-px w-full bg-[#EEECE8]" />}
              <CategoryGroup category={category} posts={posts} />
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
