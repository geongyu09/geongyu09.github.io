'use client';

import cn from '@/utils/cn';
import useActiveHeading from '@/hooks/useActiveHeading';
import headerUtil from '@/utils/contentHeader';
import { parseMarkdown } from '@/lib/markdown';

interface ShortTableOfContentProps {
  content: string;
}

const LEVEL_WIDTH: Record<number, string> = {
  1: 'w-10',
  2: 'w-8',
  3: 'w-6',
};

export default function ShortTableOfContent({
  content,
}: ShortTableOfContentProps) {
  const headers = parseMarkdown(content);
  const ids = headers.map(({ text }) =>
    decodeURIComponent(headerUtil.getHeaderHashText(text)),
  );
  const activeId = useActiveHeading(ids);

  return (
    <div className="px-2 flex flex-col gap-1 items-end">
      {headers.map(({ text, level }, index) => {
        const id = ids[index];
        const isActive = activeId === id;
        return (
          <div
            key={`${index * 2}-${level}-${text}`}
            className={cn(
              'h-[2px] rounded-full transition-colors duration-150',
              LEVEL_WIDTH[level] ?? 'w-6',
              isActive ? 'bg-ink-800' : 'bg-ink-200',
            )}
          />
        );
      })}
    </div>
  );
}
