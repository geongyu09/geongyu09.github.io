import Link from 'next/link';
import Chip from '@/components/ds/Chip';
import Eyebrow from '@/components/ds/Eyebrow';
import SearchField from '@/components/ds/SearchField';
import YearHeader from '@/components/ds/YearHeader';
import ROUTE_PATH from '@/constants/path/routePath';
import {
  getAllPosts,
  getAllTags,
  getFilteredPostsByTag,
} from '@/lib/post/post';
import { Post } from '@/types/post';

interface PostListViewProps {
  activeTag?: string;
}

const extractYear = (date: string): string => {
  const match = date.match(/\d{4}/);
  return match ? match[0] : 'Unknown';
};

const formatMonthDay = (date: string): string => {
  const nums = date.match(/\d+/g);
  if (!nums || nums.length < 3) return date;
  const [, month, day] = nums;
  return `${month.padStart(2, '0')}.${day.padStart(2, '0')}`;
};

const groupPostsByYear = (posts: Post[]): [string, Post[]][] => {
  const grouped = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const year = extractYear(post.data.date);
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  return Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a));
};

export default function PostListView({ activeTag }: PostListViewProps) {
  const totalPosts = getAllPosts();
  const posts = activeTag
    ? getFilteredPostsByTag(decodeURIComponent(activeTag))
    : totalPosts;
  const allTags = getAllTags();
  const grouped = groupPostsByYear(posts);
  const decodedActive = activeTag ? decodeURIComponent(activeTag) : null;

  return (
    <div className="w-full">
      <section className="max-w-container mx-auto px-s-5 md:px-s-7 pt-s-6 md:pt-s-8 pb-s-5 md:pb-s-6">
        <Eyebrow className="mb-s-3 md:mb-s-4">ARCHIVE / 전체 글</Eyebrow>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-s-4 md:flex-wrap">
          <h1 className="text-[30px] leading-[1.1] tracking-[-0.025em] font-semibold md:text-h1 text-ink-950">
            {posts.length}편의 글
          </h1>
          <SearchField className="w-full md:max-w-[320px]" />
        </div>

        <div className="mt-s-4 md:mt-s-5 flex gap-s-2 overflow-x-auto md:flex-wrap -mx-s-5 md:mx-0 px-s-5 md:px-0 [&::-webkit-scrollbar]:hidden">
          <Link href={ROUTE_PATH.POSTS()} className="shrink-0">
            <Chip active={!decodedActive}>전체 · {totalPosts.length}</Chip>
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={ROUTE_PATH.POSTS({ tag })}
              className="shrink-0"
            >
              <Chip active={decodedActive === tag}>{tag}</Chip>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-container mx-auto px-s-5 md:px-s-7 pt-s-5 md:pt-s-6 pb-s-8 md:pb-s-9">
        {grouped.map(([year, yearPosts]) => (
          <div key={year} className="mb-s-7">
            <YearHeader year={year} count={yearPosts.length}>
              <ul className="list-none p-0 m-0">
                {yearPosts.map((post, idx) => {
                  const tagList = post.data.tags
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 3);
                  return (
                    <li
                      key={post.slug}
                      className={`grid grid-cols-1 md:grid-cols-[80px_1fr] gap-s-1 md:gap-s-5 py-s-3 md:py-s-4 md:items-baseline ${
                        idx > 0 ? 'border-t border-ink-200' : ''
                      }`}
                    >
                      <span className="font-mono text-[10px] md:text-xs text-ink-500">
                        {formatMonthDay(post.data.date)}
                      </span>
                      <Link
                        href={ROUTE_PATH.POST_DETAIL({ slug: post.slug })}
                        className="block group"
                      >
                        <h3 className="text-[15px] font-medium tracking-[-0.01em] leading-[1.35] md:text-h3 text-ink-950 mb-s-1 group-hover:text-blue-600 transition-colors">
                          {post.data.title}
                        </h3>
                        <div className="flex flex-wrap gap-s-3 text-[11px] md:text-xs text-ink-500">
                          {tagList.map((t) => (
                            <span key={t}>#{t}</span>
                          ))}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </YearHeader>
          </div>
        ))}
      </section>
    </div>
  );
}

PostListView.defaultProps = {
  activeTag: undefined,
};
