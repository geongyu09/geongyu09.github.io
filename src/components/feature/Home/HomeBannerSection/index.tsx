import Eyebrow from '@/components/ds/Eyebrow';
import Link from 'next/link';

export default function HomeBannerSection() {
  return (
    <section className="border-b border-ink-200">
      <div className="max-w-container mx-auto px-s-5 lg:px-s-7 pt-s-7 pb-s-7 md:pt-s-9 md:pb-s-8">
        <Eyebrow className="mb-s-4 md:mb-s-5">
          geongyu · personal blog · est. 2024
        </Eyebrow>
        <h1 className="text-[36px] leading-[1.05] tracking-[-0.03em] font-semibold md:text-display m-0 max-w-[860px]">
          조용하게,
          <br />
          <span className="text-ink-500">정확하게 쓰기.</span>
        </h1>
        <p className="text-[15px] leading-[1.55] md:text-lead text-ink-500 mt-s-4 md:mt-s-6 max-w-reading">
          박건규의 기술 블로그. 매주 한 편씩, 배운 것을 정리합니다. 함께하고
          싶은 개발자가 되고 싶습니다.
        </p>
        <div className="mt-s-6 md:mt-s-7 flex flex-wrap items-center gap-s-3 md:gap-s-4">
          <Link
            href="/log"
            className="inline-flex items-center gap-2 px-[18px] py-[10px] text-sm font-medium rounded-pill bg-ink-950 text-white border border-ink-950 hover:bg-ink-800 transition-colors"
          >
            활동 로그 보기 →
          </Link>
          <Link
            href="#recent"
            className="inline-flex items-center gap-2 px-[18px] py-[10px] text-sm font-medium rounded-pill bg-white text-ink-950 border border-ink-300 hover:border-ink-950 transition-colors"
          >
            최근 글 읽기
          </Link>
        </div>
      </div>
    </section>
  );
}
