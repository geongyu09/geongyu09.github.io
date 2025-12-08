import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import MarkdownNav from '@/components/common/lib/MarkdownNav';
import SideTableOfContent from '@/components/feature/Post/SideTableOfContent';
import { getPostBySlug, getPostSlugs } from '@/lib/post/post';
import Comment from '@/service/Comment';
import MarkdownViewer from '@/service/Markdown';
import { SsgoiTransition } from '@ssgoi/react';

interface PageProps {
  params: {
    slug: string;
  };
}
export default function Page({ params: { slug } }: PageProps) {
  const {
    content,
    data: { date, title, description },
  } = getPostBySlug(slug);

  return (
    <SsgoiTransition id="/post/[slug]">
      <Container width="content" responsive="default">
        <Gap size={4} />

        <Gap size={12} />
        <h2 className="text-4xl font-bold">{title}</h2>
        <Gap size={4} />
        <p className="text-lg font-semibold opacity-90">{description}</p>
        <Gap size={2} />
        <span className="text-lg font-semibold opacity-70">
          {/* TODO: 업로드 형태 정하기 혹은 해당 로직을 함수로 빼기 */}
          업로드 날짜: {date.split('T')[0]}
        </span>
        <Gap size={4} />
        <hr />

        <Gap size={4} />
        <MarkdownNav markdown={content} />
        <hr />
        <MarkdownViewer markdown={content} />

        <Gap size={12} />
        <hr />
        <Gap size={12} />

        <Comment />
        <SideTableOfContent content={content} />
      </Container>
    </SsgoiTransition>
  );
}

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace('.md', ''),
  }));
}
