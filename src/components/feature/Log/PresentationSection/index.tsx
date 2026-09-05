import Chip from '@/components/ds/Chip';
import Eyebrow from '@/components/ds/Eyebrow';
import { formatDateInYear } from '@/lib/log/formatLogDate';
import { PresentationItem } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';

interface Props {
  presentations: PresentationItem[];
  /** 이 목록이 놓인 연도 섹션. 날짜에서 같은 연도를 빼는 데 씁니다. */
  year: number;
}

export default function PresentationSection({ presentations, year }: Props) {
  return (
    <div>
      <Eyebrow className="mb-s-3 text-[13px] text-ink-900">
        Presentation
      </Eyebrow>
      <ul className="flex flex-col">
        {presentations.map((presentation, i) => {
          const body = (
            <div className="flex flex-col gap-s-2 sm:flex-row sm:justify-between sm:items-baseline sm:gap-s-4">
              <div className="flex flex-wrap items-baseline gap-s-2">
                <p className="text-[16px] text-ink-950 font-medium">
                  {presentation.title}
                </p>
                {presentation.place && (
                  <Chip interactive={false} className="text-[13px]">
                    {presentation.place}
                  </Chip>
                )}
              </div>
              <span className="font-mono text-[13px] text-ink-500 shrink-0">
                {presentation.displayDate ??
                  formatDateInYear(presentation.date, year)}
              </span>
            </div>
          );

          return (
            <li
              key={`${presentation.title}-${presentation.date}`}
              className={cn(i > 0 && 'border-t border-ink-200')}
            >
              {presentation.href ? (
                <Link
                  href={presentation.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-s-3 hover:opacity-70 transition-opacity"
                >
                  {body}
                </Link>
              ) : (
                <div className="py-s-3">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
