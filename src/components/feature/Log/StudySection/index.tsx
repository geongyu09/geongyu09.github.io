'use client';

import Chip from '@/components/ds/Chip';
import Eyebrow from '@/components/ds/Eyebrow';
import { formatDateInYear } from '@/lib/log/formatLogDate';
import { LogListItem } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Props {
  studies: LogListItem[];
  /** 이 목록이 놓인 연도 섹션. 날짜에서 같은 연도를 빼는 데 씁니다. */
  year: number;
}

export default function StudySection({ studies, year }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const uniqueTags = Array.from(
    studies.reduce((acc, study) => {
      study.tags?.forEach((tag) => acc.add(tag));
      return acc;
    }, new Set<string>()),
  );

  return (
    <div>
      <button
        type="button"
        className="flex items-center gap-s-2 group"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <FiChevronDown
          className={cn(
            'text-ink-400 transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180',
          )}
          size={14}
        />
        <Eyebrow className="text-[13px] text-ink-900">Study</Eyebrow>
      </button>

      {!isOpen && uniqueTags.length > 0 && (
        <div className="mt-s-3 flex flex-wrap gap-s-2">
          {uniqueTags.map((tag) => (
            <Chip key={tag} interactive={false} className="text-[13px]">
              {tag}
            </Chip>
          ))}
        </div>
      )}

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr] mt-s-3' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col">
            {studies.map((study, i) => {
              const body = (
                <div className="flex flex-col gap-s-2 sm:flex-row sm:justify-between sm:items-baseline sm:gap-s-4">
                  <div>
                    <p className="text-[17px] text-ink-950 font-medium">
                      {study.title}
                    </p>
                    <span className="font-mono text-[13px] text-ink-500 mt-[2px] block">
                      {formatDateInYear(study.date, year)}
                    </span>
                  </div>
                  {study.tags && study.tags.length > 0 && (
                    <div className="flex gap-s-2 flex-wrap sm:shrink-0 sm:justify-end">
                      {study.tags.map((tag) => (
                        <Chip
                          key={tag}
                          interactive={false}
                          className="text-[13px]"
                        >
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>
              );

              return (
                <li
                  key={`${study.title}-${study.date}`}
                  className={cn('py-s-3', i > 0 && 'border-t border-ink-200')}
                >
                  {study.href ? (
                    <Link
                      href={study.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-70 transition-opacity"
                    >
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
