import ROUTE_PATH from '@/constants/path/routePath';
import { LogEntry, LogEntryType } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';
import { FiArrowUpRight, FiPlus } from 'react-icons/fi';

const TYPE_LABEL: Record<LogEntryType, string> = {
  experience: '활동',
  project: '프로젝트',
  presentation: '발표',
  study: '스터디',
};

/**
 * 프로젝트와 활동, 자료가 있는 발표는 상세 모달 주소로 이어집니다.
 * 나머지는 원문 링크로 나가고, 둘 다 없으면 링크 없이 한 줄만 남습니다.
 */
const getDetailHref = ({ project, presentation, experience }: LogEntry) => {
  if (project) return ROUTE_PATH.LOG_PROJECT({ id: project.id });
  if (experience) return ROUTE_PATH.LOG_EXPERIENCE({ id: experience.id });
  if (presentation?.href)
    return ROUTE_PATH.LOG_PRESENTATION({ id: presentation.id });

  return null;
};

interface Props {
  entries: LogEntry[];
}

export default function LogEntryList({ entries }: Props) {
  return (
    <ul className="flex flex-col">
      {entries.map((entry, i) => {
        const detailHref = getDetailHref(entry);
        const { href } = entry;

        const body = (
          <div className="flex flex-col gap-s-1 py-s-3 sm:flex-row sm:items-baseline sm:gap-s-4">
            <span className="font-mono text-[15px] text-ink-500 sm:w-[176px] sm:shrink-0">
              {entry.displayDate}
            </span>
            <span className="min-w-0 flex-1 text-[19px] text-ink-950">
              {entry.title}
              {detailHref && (
                <FiPlus
                  className="inline-block ml-[3px] align-[-1px] text-ink-400 transition-transform group-hover:rotate-90"
                  size={14}
                />
              )}
              {!detailHref && href && (
                <FiArrowUpRight
                  className="inline-block ml-[2px] align-[-1px] text-ink-400"
                  size={14}
                />
              )}
            </span>
            <span className="font-mono text-[14px] text-ink-500 sm:shrink-0 sm:text-right">
              {TYPE_LABEL[entry.type]}
              {entry.meta && ` · ${entry.meta}`}
            </span>
          </div>
        );

        let row = body;
        if (detailHref) {
          row = (
            <Link
              href={detailHref}
              scroll={false}
              aria-label={`${entry.title} 상세 보기`}
              className="group block w-full text-left transition-opacity hover:opacity-70"
            >
              {body}
            </Link>
          );
        } else if (href) {
          row = (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-70 transition-opacity"
            >
              {body}
            </Link>
          );
        }

        return (
          <li
            key={`${entry.type}-${entry.title}-${entry.date}`}
            className={cn(i > 0 && 'border-t border-ink-200')}
          >
            {row}
          </li>
        );
      })}
    </ul>
  );
}
