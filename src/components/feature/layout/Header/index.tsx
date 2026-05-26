'use client';

import { IGithub } from '@/components/common/icons';
import EXTERNAL_PATH from '@/constants/path/externalPath';
import ROUTE_PATH from '@/constants/path/routePath';
import cn from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  href: string;
  match: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Writing',
    href: ROUTE_PATH.HOME,
    match: (p) => p === ROUTE_PATH.HOME,
  },
  {
    id: 'posts',
    label: 'Archive',
    href: ROUTE_PATH.POSTS({}),
    match: (p) => p.startsWith('/posts') || p.startsWith('/post/'),
  },
  {
    id: 'about',
    label: 'About',
    href: ROUTE_PATH.ABOUT,
    match: (p) => p.startsWith(ROUTE_PATH.ABOUT),
  },
];

export default function Header() {
  const pathname = usePathname() ?? '/';

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-ink-200 select-none">
      <div className="h-full max-w-container mx-auto px-s-5 md:px-s-7 flex items-center justify-between">
        <Link
          href={ROUTE_PATH.HOME}
          className="flex items-baseline gap-[10px] no-underline text-ink-950"
        >
          <span className="text-[18px] font-bold tracking-[-0.02em]">
            geongyu
          </span>
          <span className="font-mono text-[11px] text-ink-500">/notes</span>
        </Link>

        <nav className="flex items-center gap-s-6 text-sm">
          {NAV_ITEMS.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'pb-[2px] border-b-[1.5px] transition-colors',
                  active
                    ? 'text-ink-950 font-semibold border-ink-950'
                    : 'text-ink-500 hover:text-ink-950 border-transparent',
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <span className="block w-px h-4 bg-ink-200" />
          <Link
            href={EXTERNAL_PATH.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink-500 hover:text-ink-950 transition-colors flex"
          >
            <IGithub size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
