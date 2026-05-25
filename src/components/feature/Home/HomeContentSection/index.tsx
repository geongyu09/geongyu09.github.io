import Button from '@/components/ds/Button';
import SectionHeading from '@/components/ds/SectionHeading';
import CurrentPostsSection from '@/components/feature/Home/CurrentPostsSection';
import ROUTE_PATH from '@/constants/path/routePath';
import { getAllPosts } from '@/lib/post/post';
import Link from 'next/link';

export default function HomeContentSection() {
  const total = getAllPosts().length;

  return (
    <section
      id="recent"
      className="max-w-container mx-auto px-s-5 lg:px-s-7 pt-s-7 md:pt-s-9 pb-s-7 md:pb-s-9"
    >
      <SectionHeading
        meta={`${total.toString().padStart(2, '0')} posts · sorted by date`}
      >
        Recent · 최근 포스트
      </SectionHeading>
      <CurrentPostsSection amount={4} />
      <div className="mt-s-7 flex justify-center">
        <Link href={ROUTE_PATH.POSTS({})}>
          <Button variant="default">
            <span>전체 아카이브 보기</span>
            <span aria-hidden>→</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
