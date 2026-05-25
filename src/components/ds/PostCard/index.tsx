import Link from 'next/link';
import InlineTag from '@/components/ds/InlineTag';

interface BaseProps {
  href: string;
  date: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: string;
}

interface FeaturedProps extends BaseProps {
  eyebrow?: string;
}

/** Featured — 홈 최상단. 좌측 날짜 컬럼, 우측 큰 제목. */
export const FeaturedPostCard = ({
  href,
  date,
  title,
  excerpt,
  tags,
  readingTime,
  eyebrow,
}: FeaturedProps) => (
  <Link
    href={href}
    className="block py-s-5 md:py-s-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-s-3 md:gap-s-8 group"
  >
    <div className="order-2 md:order-1 flex items-center gap-s-3 md:block">
      <div className="font-mono text-[11px] md:text-xs text-ink-500">
        {date}
      </div>
      {readingTime && (
        <div className="font-mono text-[11px] text-ink-500 md:mt-1">
          {readingTime}
        </div>
      )}
    </div>
    <div className="order-1 md:order-2">
      {eyebrow && (
        <div className="font-mono text-[10px] md:text-[11px] tracking-[0.08em] uppercase text-blue-600 mb-s-2 md:mb-s-3">
          {eyebrow}
        </div>
      )}
      <h3 className="text-[24px] leading-[1.2] tracking-[-0.02em] font-semibold md:text-h2 m-0 mb-s-3 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      {excerpt && (
        <p className="text-[14px] md:text-[15px] text-ink-500 leading-[1.6] max-w-[620px] m-0 mb-s-3 md:mb-s-4">
          {excerpt}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-s-3 md:gap-s-4">
          {tags.map((t) => (
            <InlineTag key={t}>{t}</InlineTag>
          ))}
        </div>
      )}
    </div>
  </Link>
);

/** Compact — 홈 하단, archive에서 반복되는 기본 리스트 아이템. */
const PostCard = ({
  href,
  date,
  title,
  excerpt,
  tags,
  readingTime,
}: BaseProps) => (
  <Link
    href={href}
    className="grid grid-cols-1 md:grid-cols-[140px_1fr_80px] gap-s-2 md:gap-s-6 md:items-baseline py-s-4 md:py-s-5 border-t border-ink-200 group"
  >
    <div className="font-mono text-[11px] md:text-xs text-ink-500 order-1">
      {date}
    </div>
    <div className="order-2">
      <h3 className="text-[17px] md:text-h3 m-0 mb-[6px] leading-[1.3] group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      {excerpt && (
        <p className="text-[13px] md:text-sm text-ink-500 leading-[1.55] m-0">
          {excerpt}
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-s-3 md:gap-[14px] mt-[8px] md:mt-[10px] text-[11px] md:text-xs text-ink-500">
          {tags.map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </div>
      )}
    </div>
    {readingTime && (
      <div className="font-mono text-[11px] text-ink-500 md:text-right order-3">
        {readingTime}
      </div>
    )}
  </Link>
);

export default PostCard;
