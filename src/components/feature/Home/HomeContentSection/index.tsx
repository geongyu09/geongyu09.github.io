import DefaultButton from '@/components/common/Button/DefaultButton';
import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import SplitLayout from '@/components/common/layout/SplitLayout';
import SideBarMenu from '@/components/common/SideBarMenu';
import TagsSection from '@/components/common/TagsSection';
import CategorySection from '@/components/feature/Home/CategorySection';
import CurrentPostsSection from '@/components/feature/Home/CurrentPostsSection';
import ROUTE_PATH from '@/constants/path/routePath';
import Link from 'next/link';

export default function HomeContentSection() {
  return (
    <FadeEffectWrapper transitionKey="my-element">
      <Container responsive="default">
        <Gap size={12} />

        <header className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold text-[#1A1A1A]">최근 포스트</h2>
          <p className="text-base text-[#4A4A4A]">
            새롭게 작성된 글을 가장 먼저 만나보세요.
          </p>
        </header>
        <Gap size={8} />

        <SplitLayout
          gridCols="responsive"
          responsiveGap="xl"
          gap="xl"
          sidebar={
            <SideBarMenu>
              <TagsSection />
            </SideBarMenu>
          }
        >
          <>
            <CurrentPostsSection amount={3} />
            <Gap size={8} />
            <Link href={ROUTE_PATH.POSTS({})}>
              <DefaultButton text="전체 포스트 보기" />
            </Link>
          </>
        </SplitLayout>
      </Container>

      <Gap size={16} />
      <CategorySection />
    </FadeEffectWrapper>
  );
}
