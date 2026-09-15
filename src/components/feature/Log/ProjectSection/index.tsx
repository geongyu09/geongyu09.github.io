import Eyebrow from '@/components/ds/Eyebrow';
import ROUTE_PATH from '@/constants/path/routePath';
import { formatRangeInYear } from '@/lib/log/formatLogDate';
import { ProjectSectionKey } from '@/lib/log/projectSection';
import { ProjectItem } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

interface Props {
  /** 목록 위에 붙는 제목. Project, Library · Tool, Contribution을 나눠 씁니다. */
  label: string;
  /** 어느 갈래의 목록인지입니다. Contribution은 제목과 소속만 적습니다. */
  sectionKey: ProjectSectionKey;
  projects: ProjectItem[];
  /** 이 목록이 놓인 연도 섹션. 날짜에서 같은 연도를 빼는 데 씁니다. */
  year: number;
}

export default function ProjectSection({
  label,
  sectionKey,
  projects,
  year,
}: Props) {
  /** Contribution은 기간과 설명을 적지 않습니다. */
  const isTitleOnly = sectionKey === 'contribution';
  /** 상세 모달은 Library · Tool만 엽니다. Project와 Contribution은 목록에서 끝납니다. */
  const hasDetail = sectionKey === 'library';

  return (
    <div>
      <Eyebrow className="mb-s-3 text-[14px] text-ink-900">{label}</Eyebrow>
      <ul className="flex flex-col">
        {projects.map((project, i) => {
          const body = (
            <>
              <div className="flex flex-col gap-s-2 sm:flex-row sm:justify-between sm:items-baseline sm:gap-s-4">
                <p className="m-0 text-[18px] text-ink-950 font-medium">
                  {project.title}
                  {hasDetail && (
                    <FiPlus
                      className="inline-block ml-[3px] align-[-1px] text-ink-400 transition-transform group-hover:rotate-90"
                      size={14}
                    />
                  )}
                </p>
                {!isTitleOnly && (
                  <span className="font-mono text-[14px] text-ink-500 shrink-0">
                    {formatRangeInYear(
                      project.startDate,
                      project.endDate,
                      year,
                    )}
                  </span>
                )}
              </div>
              <p className="m-0 mt-s-1 font-mono text-[13px] text-ink-500">
                {project.org} · {project.role}
              </p>
              {!isTitleOnly && (
                <p className="m-0 mt-s-2 text-[16px] leading-[1.7] text-ink-700">
                  {project.description}
                </p>
              )}
            </>
          );

          return (
            <li
              key={`${project.title}-${project.startDate}`}
              className={cn(i > 0 && 'border-t border-ink-200')}
            >
              {hasDetail ? (
                <Link
                  href={ROUTE_PATH.LOG_PROJECT({ id: project.id })}
                  scroll={false}
                  aria-label={`${project.title} 상세 보기`}
                  className="group block w-full py-s-3 text-left transition-opacity hover:opacity-70"
                >
                  {body}
                </Link>
              ) : (
                <div className="block w-full py-s-3 text-left">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
