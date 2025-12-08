import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import SplitLayout from '@/components/common/layout/SplitLayout';
import SideBarMenu from '@/components/common/SideBarMenu';
import Tag from '@/components/common/tag';
import TagsSection from '@/components/common/TagsSection';
import AllPostsSection from '@/components/feature/Post/AllPostsSection';
import ROUTE_PATH from '@/constants/path/routePath';
import { getAllTags } from '@/lib/post/post';
import Link from 'next/link';

interface PostFilteredPageProps {
  params: {
    tag: string;
  };
}
export default function PostFilteredPage({
  params: { tag },
}: PostFilteredPageProps) {
  const decodedTag = decodeURIComponent(tag);
  return (
    <Container responsive="default">
      <Gap size={14} />
      <h2 className="text-4xl font-bold text-center">전체 포스트들</h2>
      <Gap size={24} />

      <div className="flex items-center gap-4">
        <Link href={ROUTE_PATH.POSTS()}>x</Link>
        <p className="font-semibold">필터 : </p>
        <Tag tag={decodedTag} />
      </div>
      <Gap size={8} />

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
        <AllPostsSection filteredTag={tag} />
      </SplitLayout>
    </Container>
  );
}

export function generateStaticParams() {
  const allTags = getAllTags();
  const params = allTags.map((tag) => ({
    tag: decodeURIComponent(tag),
  }));
  return params;
}
