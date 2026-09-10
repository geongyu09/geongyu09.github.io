import Eyebrow from '@/components/ds/Eyebrow';
import ROUTE_PATH from '@/constants/path/routePath';
import { formatRangeInYear } from '@/lib/log/formatLogDate';
import { ActivityItem } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

interface Props {
  experiences: ActivityItem[];
  /** 이 목록이 놓인 연도 섹션. 날짜에서 같은 연도를 빼는 데 씁니다. */
  year: number;
}

export default function ExperienceSection({ experiences, year }: Props) {
  return (
    <div>
      <Eyebrow className="mb-s-3 text-[14px] text-ink-900">Experience</Eyebrow>
      <ul className="flex flex-col">
        {experiences.map((experience, i) => (
          <li
            key={`${experience.title}-${experience.startDate}`}
            className={cn(i > 0 && 'border-t border-ink-200')}
          >
            <Link
              href={ROUTE_PATH.LOG_EXPERIENCE({ id: experience.id })}
              scroll={false}
              aria-label={`${experience.title} 상세 보기`}
              className="group block w-full py-s-3 text-left transition-opacity hover:opacity-70"
            >
              <div className="flex flex-col gap-s-1 sm:flex-row sm:justify-between sm:items-baseline sm:gap-s-4">
                <p className="m-0 text-[19px] text-ink-950">
                  {experience.title}
                  <FiPlus
                    className="inline-block ml-[3px] align-[-1px] text-ink-400 transition-transform group-hover:rotate-90"
                    size={14}
                  />
                </p>
                <span className="font-mono text-[15px] text-ink-500 shrink-0">
                  {formatRangeInYear(
                    experience.startDate,
                    experience.endDate,
                    year,
                  )}
                </span>
              </div>
              <p className="m-0 mt-s-1 font-mono text-[13px] text-ink-500">
                {experience.org} · {experience.role}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
