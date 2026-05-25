import InlineTag from '@/components/ds/InlineTag';
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
    data: { date, title, description, tags },
  } = getPostBySlug(slug);

  const tagList = tags ? tags.split(' ').filter(Boolean) : [];
  const [primaryTag] = tagList;
  const displayDate = date.split('T')[0];

  return (
    <SsgoiTransition id="/post/[slug]">
      <article className="max-w-[860px] mx-auto px-s-7 pt-s-9 pb-s-7">
        <div className="flex items-center gap-s-4 text-[13px] text-ink-500 mb-s-5">
          <span className="font-mono">{displayDate}</span>
          {primaryTag && (
            <>
              <span>·</span>
              <span className="text-blue-600">#{primaryTag}</span>
            </>
          )}
        </div>

        <h1 className="text-h1 m-0 mb-s-5">{title}</h1>

        {description && (
          <p className="text-[20px] leading-[1.55] text-ink-500 font-normal m-0 mb-s-7">
            {description}
          </p>
        )}

        <div className="pb-s-6 border-b border-ink-200" />
      </article>

      <div className="max-w-[860px] mx-auto px-s-7 pb-s-8">
        <MarkdownViewer markdown={content} />
      </div>

      <div className="max-w-[860px] mx-auto px-s-7 pb-s-8">
        <div className="ds-hairline pt-s-6 flex justify-between items-center">
          <div className="text-[13px] text-ink-500">
            이 글이 도움이 되었다면 —{' '}
            <a href="/rss.xml" className="ds-link">
              RSS 구독하기
            </a>
          </div>
          <div className="font-mono text-[11px] text-ink-500">
            {displayDate.replace(/-/g, '.')}
          </div>
        </div>

        {tagList.length > 0 && (
          <div className="mt-s-6 flex flex-wrap gap-s-3">
            {tagList.map((t) => (
              <InlineTag key={t} href={`/posts/${t}`}>
                {t}
              </InlineTag>
            ))}
          </div>
        )}

        <div className="mt-s-8">
          <Comment />
        </div>
      </div>

      <SideTableOfContent content={content} />
    </SsgoiTransition>
  );
}

export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace('.md', ''),
  }));
}
