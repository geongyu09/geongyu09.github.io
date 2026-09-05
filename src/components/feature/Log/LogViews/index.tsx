'use client';

import Chip from '@/components/ds/Chip';
import LogEntryList from '@/components/feature/Log/LogEntryList';
import { LogEntry, LogEntryType } from '@/types/log';
import cn from '@/utils/cn';
import { ReactNode, useMemo, useState } from 'react';

type ViewKey = 'year' | 'all';
type FilterKey = LogEntryType | 'all';

const VIEW_TABS: { key: ViewKey; label: string }[] = [
  { key: 'year', label: '연도별' },
  { key: 'all', label: '모아보기' },
];

const TYPE_FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'project', label: '프로젝트' },
  { key: 'presentation', label: '발표' },
  { key: 'experience', label: '활동' },
  { key: 'study', label: '스터디' },
];

interface Props {
  years: number[];
  entries: LogEntry[];
  /** 서버에서 그린 연도별 목록. 두 뷰 모두 문서에 남겨 두고 보이기만 바꿉니다. */
  yearView: ReactNode;
}

export default function LogViews({ years, entries, yearView }: Props) {
  const [view, setView] = useState<ViewKey>('year');
  const [filter, setFilter] = useState<FilterKey>('all');

  const countByFilter = useMemo(
    () =>
      entries.reduce(
        (acc, entry) => {
          acc[entry.type] = (acc[entry.type] ?? 0) + 1;
          return acc;
        },
        { all: entries.length } as Record<FilterKey, number>,
      ),
    [entries],
  );

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? entries
        : entries.filter(({ type }) => type === filter),
    [entries, filter],
  );

  return (
    <>
      <div className="border-b border-ink-200">
        <div className="max-w-container mx-auto flex flex-wrap items-center gap-s-3 px-s-5 py-s-4 lg:px-s-7">
          <div className="flex gap-s-2">
            {VIEW_TABS.map(({ key, label }) => (
              <button key={key} type="button" onClick={() => setView(key)}>
                <Chip active={view === key} className="text-[13px]">
                  {label}
                </Chip>
              </button>
            ))}
          </div>

          <span
            aria-hidden
            className="hidden h-[14px] w-px bg-ink-200 sm:block"
          />

          {view === 'year' ? (
            <nav
              aria-label="연도별 바로가기"
              className="flex flex-wrap items-center gap-s-2"
            >
              {years.map((year) => (
                <a key={year} href={`#year-${year}`} className="font-mono">
                  <Chip className="text-[13px]">{year}</Chip>
                </a>
              ))}
            </nav>
          ) : (
            <div className="flex flex-wrap items-center gap-s-2">
              {TYPE_FILTERS.map(({ key, label }) => (
                <button key={key} type="button" onClick={() => setFilter(key)}>
                  <Chip active={filter === key} className="text-[13px]">
                    {label} {countByFilter[key] ?? 0}
                  </Chip>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={cn(view !== 'year' && 'hidden')}>{yearView}</div>

      <div className={cn(view !== 'all' && 'hidden')}>
        <section className="max-w-container mx-auto px-s-5 pt-s-5 pb-s-9 lg:px-s-7 md:pt-s-6">
          <LogEntryList entries={filtered} />
        </section>
      </div>
    </>
  );
}
