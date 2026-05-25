'use client';

import { InputHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';
import cn from '@/utils/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
}

const SearchField = ({ shortcut = '⌘ K', className, ...rest }: Props) => (
  <label
    className={cn(
      'flex items-center gap-2 px-[14px] py-[10px] w-full md:min-w-[280px]',
      'border border-ink-200 rounded-[10px] bg-white text-sm text-ink-500',
      'focus-within:border-ink-950 transition-colors',
      className,
    )}
  >
    <FiSearch className="shrink-0 text-ink-500" aria-hidden />
    <input
      type="search"
      className="flex-1 bg-transparent outline-none placeholder:text-ink-500 text-ink-950"
      placeholder="제목, 본문, 태그로 검색…"
      {...rest}
    />
    {shortcut && (
      <span className="ml-auto font-mono text-[11px] px-[6px] py-[2px] bg-ink-100 text-ink-600 rounded-r-1">
        {shortcut}
      </span>
    )}
  </label>
);

export default SearchField;
