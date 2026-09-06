'use client';

import { IClose, IGithub, IMenu } from '@/components/common/icons';
import ThemeToggleButton from '@/components/common/Theme/ThemeToggleButton';
import EXTERNAL_PATH from '@/constants/path/externalPath';
import ROUTE_PATH from '@/constants/path/routePath';
import cn from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    id: 'log',
    label: 'Log',
    href: ROUTE_PATH.LOG,
    match: (p) => p.startsWith('/log'),
  },
];

interface MobileDrawerProps {
  pathname: string;
  onClose: () => void;
}

function MobileDrawer({ pathname, onClose }: MobileDrawerProps) {
  return (
    <>
      <button
        type="button"
        aria-label="메뉴 닫기"
        onClick={onClose}
        className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-ink-950/20 cursor-default"
      />
      <div className="md:hidden absolute top-full inset-x-0 z-50 bg-ink-0 border-b border-ink-950 px-s-5 pt-s-4 pb-s-5">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-500 mb-s-3">
          Menu
        </p>
        <ul className="list-none p-0 m-0">
          {NAV_ITEMS.map((item) => {
            const active = item.match(pathname);
            return (
              <li key={item.id} className="border-t border-ink-200">
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between py-s-3 text-[20px] tracking-[-0.015em] transition-colors',
                    active
                      ? 'text-ink-950 font-semibold'
                      : 'text-ink-700 hover:text-ink-950',
                  )}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="block w-[6px] h-[6px] rounded-pill bg-blue-600" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-s-4 pt-s-4 border-t border-ink-200 flex items-center gap-s-4 text-ink-500">
          <Link
            href={EXTERNAL_PATH.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-s-2 text-[13px] hover:text-ink-950 transition-colors"
          >
            <IGithub size={14} />
            <span>github</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Header() {
  const pathname = usePathname() ?? '/';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isDrawerOpen) {
      return undefined;
    }
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isDrawerOpen]);

  return (
    <header className="sticky top-0 z-50 h-16 bg-ink-0 border-b border-ink-200 select-none">
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-s-6 text-sm">
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
          <ThemeToggleButton />
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-s-2">
          <ThemeToggleButton />
          <button
            type="button"
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            aria-label={isDrawerOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isDrawerOpen}
            className="inline-flex items-center justify-center w-8 h-8 rounded-r-1 border border-ink-200 bg-ink-0 text-ink-950 hover:border-ink-950 transition-colors"
          >
            {isDrawerOpen ? <IClose size={18} /> : <IMenu size={18} />}
          </button>
        </div>
      </div>

      {isDrawerOpen && (
        <MobileDrawer
          pathname={pathname}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </header>
  );
}
