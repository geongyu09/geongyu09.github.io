import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import SplitLayout from '@/components/common/layout/SplitLayout';
import SideBarMenu from '@/components/common/SideBarMenu';
import TagsSection from '@/components/common/TagsSection';
import AllPostsSection from '@/components/feature/Post/AllPostsSection';

export default function PostPage() {
  return (
    <Container responsive="default">
      <Gap size={14} />
      <h2 className="text-4xl font-bold text-center">전체 포스트들</h2>
      <Gap size={24} />

      <SplitLayout
        gridCols="responsiveReverse"
        responsiveGap="xl"
        gap="xl"
        sidebar={
          <SideBarMenu>
            <TagsSection />
          </SideBarMenu>
        }
      >
        <AllPostsSection />
      </SplitLayout>
    </Container>
  );
}
