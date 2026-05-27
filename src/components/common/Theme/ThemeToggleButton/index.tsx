'use client';

import { IMoon, ISun } from '@/components/common/icons';
import useTheme from '../useTheme';

export default function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="inline-flex items-center justify-center w-8 h-8 rounded-pill border border-ink-200 bg-ink-0 text-ink-500 hover:text-ink-950 hover:border-ink-950 transition-colors"
    >
      {isDark ? <ISun size={14} /> : <IMoon size={14} />}
    </button>
  );
}
