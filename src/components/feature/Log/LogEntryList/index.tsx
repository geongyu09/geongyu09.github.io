'use client';

import ProjectDetailModal from '@/components/feature/modals/ProjectDetailModal';
import { useModal } from '@/lib/modal';
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

interface Props {
  entries: LogEntry[];
}

export default function LogEntryList({ entries }: Props) {
  const { pushModal } = useModal();

  return (
    <ul className="flex flex-col">
      {entries.map((entry, i) => {
        const body = (
          <div className="flex flex-col gap-s-1 py-s-3 sm:flex-row sm:items-baseline sm:gap-s-4">
            <span className="font-mono text-[14px] text-ink-500 sm:w-[160px] sm:shrink-0">
              {entry.displayDate}
            </span>
            <span className="min-w-0 flex-1 text-[17px] text-ink-950">
              {entry.title}
              {entry.project && (
                <FiPlus
                  className="inline-block ml-[3px] align-[-1px] text-ink-400 transition-transform group-hover:rotate-90"
                  size={13}
                />
              )}
              {!entry.project && entry.href && (
                <FiArrowUpRight
                  className="inline-block ml-[2px] align-[-1px] text-ink-400"
                  size={13}
                />
              )}
            </span>
            <span className="font-mono text-[13px] text-ink-500 sm:shrink-0 sm:text-right">
              {TYPE_LABEL[entry.type]}
              {entry.meta && ` · ${entry.meta}`}
            </span>
          </div>
        );

        const { project, href } = entry;

        // 프로젝트는 상세 모달을 열고, 나머지는 원문 링크로 나갑니다.
        let row = body;
        if (project) {
          row = (
            <button
              type="button"
              aria-label={`${entry.title} 상세 보기`}
              onClick={() =>
                pushModal({ modal: <ProjectDetailModal project={project} /> })
              }
              className="group block w-full text-left transition-opacity hover:opacity-70"
            >
              {body}
            </button>
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
