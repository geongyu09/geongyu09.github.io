'use client';

import Gap from '@/components/common/layout/Gap';
import { LogListItem } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Props {
  studies: LogListItem[];
}

export default function StudySection({ studies }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const uniqueTagColorMap = new Map<string, number>();
  studies.forEach((study) => {
    study.tags?.forEach((tag, idx) => {
      if (!uniqueTagColorMap.has(tag)) {
        uniqueTagColorMap.set(tag, idx);
      }
    });
  });

  const uniqueTags = Array.from(uniqueTagColorMap.entries()).sort(
    ([, a], [, b]) => a - b,
  );

  return (
    <div>
      <Gap size={1} />
      <button
        type="button"
        className="flex items-center gap-2 w-full text-left group"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FiChevronDown
          className={cn(
            'text-slate-400 transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180',
          )}
          size={16}
        />
        <p className="text-lg font-semibold">Study</p>
        {!isOpen && (
          <div className="flex gap-2 flex-wrap">
            {uniqueTags.map(([tag, idx]) => (
              <div
                key={tag}
                className={cn(
                  'rounded-lg px-2 py-1 text-xs shrink-0 whitespace-nowrap',
                  idx === 0 && 'bg-amber-100',
                  idx === 1 && 'bg-sky-100',
                  idx === 2 && 'bg-green-100',
                )}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-150 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <Gap size={6} />
          <ul className="flex flex-col gap-4">
            {studies.map((study) => (
              <li
                key={`${study.title}-${study.date}`}
                className="text-gray-500"
              >
                {study.href ? (
                  <Link
                    href={study.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-slate-700 transition-colors flex justify-between items-center"
                  >
                    <div>
                      <p>{study.title}</p>
                      <span className="text-sm">{study.date}</span>
                    </div>
                    <div className="flex gap-2 flex-nowrap shrink-0">
                      {study.tags?.map((tag, idx) => (
                        <div
                          key={tag}
                          className={cn(
                            'rounded-lg px-2 py-1 text-xs shrink-0 whitespace-nowrap',
                            idx === 0 && 'bg-amber-100',
                            idx === 1 && 'bg-sky-100',
                            idx === 2 && 'bg-green-100',
                          )}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </Link>
                ) : (
                  <span className="font-medium">{study.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
