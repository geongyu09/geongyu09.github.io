import SITE from '@/constants/site';
import JsonLd from '@/components/common/JsonLd';
import InlineTag from '@/components/ds/InlineTag';
import SideTableOfContent from '@/components/feature/Post/SideTableOfContent';
import ROUTE_PATH from '@/constants/path/routePath';
import { getPostBySlug, getPostSlugs, splitTags } from '@/lib/post/post';
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
} from '@/lib/seo/jsonLd';
import Comment from '@/service/Comment';
import MarkdownViewer from '@/service/Markdown';
import { SsgoiTransition } from '@ssgoi/react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const {
    data: {
      title,
      description,
      thumbnail,
      tags,
      timeStamps,
      updatedTimeStamps,
    },
  } = getPostBySlug(slug);

  const url = `${SITE.URL}/post/${slug}/`;
  const tagList = splitTags(tags);
  const images = [thumbnail || SITE.OG_IMAGE];

  return {
    title,
    description,
    keywords: tagList,
    authors: [{ name: SITE.AUTHOR.name, url: SITE.AUTHOR.link }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: SITE.TITLE,
      locale: 'ko_KR',
      publishedTime: new Date(timeStamps).toISOString(),
      modifiedTime: new Date(updatedTimeStamps ?? timeStamps).toISOString(),
      authors: [SITE.AUTHOR.name],
      tags: tagList,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const {
    content,
    data: { date, title, description, tags, timeStamps, updatedTimeStamps },
  } = post;

  const tagList = splitTags(tags);
  const [primaryTag] = tagList;
  const displayDate = date.split('T')[0];

  const publishedDate = new Date(timeStamps).toISOString().split('T')[0];
  const modifiedDate = new Date(updatedTimeStamps ?? timeStamps)
    .toISOString()
    .split('T')[0];

  const blogPostingJsonLd = buildBlogPostingJsonLd(post);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: '홈', url: '/' },
    { name: '글 목록', url: '/posts/' },
    ...(primaryTag
      ? [
          {
            name: `#${primaryTag}`,
            url: `/posts/${encodeURIComponent(primaryTag)}/`,
          },
        ]
      : []),
    { name: title, url: `/post/${slug}/` },
  ]);

  return (
    <SsgoiTransition id="/post/[slug]">
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="max-w-[860px] mx-auto px-[20px] md:px-s-7 pt-s-9 pb-s-5">
        <div className="flex items-center gap-s-4 text-[13px] text-ink-500 mb-s-5">
          <time dateTime={publishedDate} className="font-mono">
            {displayDate}
          </time>
          {primaryTag && (
            <>
              <span>·</span>
              <span className="text-blue-600">{primaryTag}</span>
            </>
          )}
        </div>

        <h1 className="text-[30px] leading-[1.18] tracking-[-0.02em] font-semibold md:text-h1 m-0 mb-s-5">
          {title}
        </h1>

        {description && (
          <p className="text-[17px] md:text-[19px] leading-[1.55] text-ink-500 font-normal m-0 mb-s-7">
            {description}
          </p>
        )}

        <div className="pb-s-4 border-b border-ink-200" />
      </article>

      <div className="max-w-[860px] mx-auto px-[20px] md:px-s-7 pb-s-8">
        <MarkdownViewer markdown={content} />
      </div>

      <div className="max-w-[860px] mx-auto px-[20px] md:px-s-7 pb-s-8">
        <div className="ds-hairline pt-s-6 flex justify-between items-center">
          <div className="text-[13px] text-ink-500">
            이 글이 도움이 되었다면 —{' '}
            <a href="/rss.xml" className="ds-link">
              RSS 구독하기
            </a>
          </div>
          <time
            dateTime={modifiedDate}
            className="font-mono text-[11px] text-ink-500"
          >
            {displayDate.replace(/-/g, '.')}
          </time>
        </div>

        {tagList.length > 0 && (
          <div className="mt-s-6 flex flex-wrap gap-s-3">
            {tagList.map((t) => (
              <InlineTag key={t} href={ROUTE_PATH.POSTS({ tag: t })}>
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
