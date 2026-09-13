import { ExperienceReviewLink } from '@/types/log';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

interface Props {
  /** 회고 글 앞에 붙는 문구입니다. 적지 않으면 '회고 글'로 채웁니다. */
  label?: string;
  reviews: ExperienceReviewLink[];
}

/**
 * 미션을 수행하던 기간의 회고 글을 알약 모양으로 늘어놓습니다.
 * 제출 주소와 섞이지 않도록 줄을 따로 두고 앞에 문구를 답니다. 블로그 안의 글이라 같은 창에서 엽니다.
 */
export default function MissionReviewList({
  label = '회고 글',
  reviews,
}: Props) {
  return (
    <div className="mt-s-2 flex flex-wrap items-center gap-s-2">
      <span className="font-mono text-[12px] tracking-[0.06em] text-ink-400">
        {label}
      </span>
      <ul className="m-0 flex list-none flex-wrap gap-s-2 p-0">
        {reviews.map((review) => (
          <li key={review.href}>
            <Link
              href={review.href}
              className="flex items-center gap-s-2 rounded-pill border border-ink-200 px-s-3 py-[5px] font-mono text-[12px] text-ink-700 transition-colors hover:border-ink-950 hover:text-ink-950"
            >
              <span>{review.label}</span>
              <FiArrowUpRight size={13} className="shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
