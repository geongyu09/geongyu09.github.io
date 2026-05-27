import Eyebrow from '@/components/ds/Eyebrow';
import ROUTE_PATH from '@/constants/path/routePath';
import {
  getAllPosts,
  getLatestPost,
  getPostsCountByYear,
  getStartYear,
  getTopTags,
} from '@/lib/post/post';
import { getRecencyLabel } from '@/utils/getRecencyLabel';
import Link from 'next/link';

const pad2 = (n: number) => n.toString().padStart(2, '0');

export default function HomeBannerSection() {
  const latest = getLatestPost();
  const totalCount = getAllPosts().length;
  const currentYear = new Date().getFullYear();
  const thisYearCount = getPostsCountByYear(currentYear);
  const topics = getTopTags(3);
  const startYear = getStartYear();
  const recencyLabel = getRecencyLabel(latest.data.timeStamps);

  return (
    <section className="border-b border-ink-200">
      <div className="max-w-container mx-auto px-s-5 lg:px-s-7 pt-s-7 pb-s-7 md:pt-s-9 md:pb-s-8">
        <div className="grid gap-s-7 md:gap-s-8 md:grid-cols-[1.4fr_1fr] items-start">
          {/* LEFT — Now writing */}
          <div>
            <div className="flex items-center gap-s-2 mb-s-5">
              <span
                aria-hidden
                className="w-[7px] h-[7px] rounded-pill bg-blue-600"
              />
              <Eyebrow className="text-ink-900">Now writing</Eyebrow>
              <span className="font-mono text-[11px] text-ink-500 tracking-[0.06em]">
                · {latest.data.date}
              </span>
            </div>

            <h1 className="text-[32px] md:text-[40px] leading-[1.2] tracking-[-0.02em] font-medium m-0 max-w-[560px]">
              <span className="text-ink-500">{recencyLabel},</span>
              <br />
              {latest.data.title}
              <span className="text-ink-500"> 에 대해 썼습니다.</span>
            </h1>

            <Link
              href={ROUTE_PATH.POST_DETAIL({ slug: latest.slug })}
              className="inline-flex items-center gap-s-2 mt-s-5 text-[13px] text-blue-600 border-b border-blue-600 pb-[2px]"
            >
              계속 읽기 <span aria-hidden>→</span>
            </Link>
          </div>

          {/* RIGHT — The Index */}
          <aside className="pt-s-5 border-t border-ink-900">
            <Eyebrow className="mb-s-4 text-ink-900">The Index</Eyebrow>
            <dl className="m-0 grid grid-cols-[1fr_auto] gap-y-s-2 text-[13px]">
              <dt className="text-ink-500">전체 글</dt>
              <dd className="m-0 font-mono">{pad2(totalCount)}</dd>

              <dt className="text-ink-500">이번 해 발행</dt>
              <dd className="m-0 font-mono">{pad2(thisYearCount)}</dd>

              <dt className="text-ink-500">주제</dt>
              <dd className="m-0 font-mono">{topics.join(' · ')}</dd>

              <dt className="text-ink-500">시작</dt>
              <dd className="m-0 font-mono">{startYear}</dd>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
