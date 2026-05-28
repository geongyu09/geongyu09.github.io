'use client';

import React from 'react';
import cn from '@/utils/cn';
import { parseMarkdown } from '@/lib/markdown';
import headerUtil from '@/utils/contentHeader';
import useActiveHeading from '@/hooks/useActiveHeading';

interface MarkdownNavProps {
  markdown: string;
  className?: string;
}

export default function MarkdownNav({
  markdown,
  className = '',
}: MarkdownNavProps) {
  const headers = parseMarkdown(markdown);
  const ids = headers.map(({ text }) =>
    decodeURIComponent(headerUtil.getHeaderHashText(text)),
  );
  const activeId = useActiveHeading(ids);

  return (
    <nav className={cn('select-none', className)}>
      <div className="ds-eyebrow mb-s-3 pb-s-2 border-b border-ink-800">
        On this page
      </div>

      <ul className="list-none p-0 m-0 flex flex-col">
        {headers.map(({ text, level }, index) => {
          const hash = headerUtil.getHeaderHashText(text);
          const id = decodeURIComponent(hash);
          const isActive = activeId === id;
          return (
            <li key={`${text}-${level}-${index * 2}`}>
              <a
                href={`#${hash}`}
                className={cn(
                  'block py-1.5 text-[13px] leading-snug tracking-[-0.005em] transition-colors duration-150',
                  'border-l-2 -ml-px',
                  {
                    'pl-3': level === 1,
                    'pl-6': level === 2,
                    'pl-9': level === 3,
                  },
                  isActive
                    ? 'border-ink-800 text-ink-800 font-semibold'
                    : 'border-ink-200 text-ink-500 hover:text-ink-800',
                )}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
