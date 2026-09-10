'use client';

import { IMoon, ISun } from '@/components/common/icons';
import useTheme from '../useTheme';

export default function ThemeToggleButton() {
  const { theme, toggle } = useTheme();
  const label = theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-8 h-8 rounded-pill border border-ink-200 bg-ink-0 text-ink-500 hover:text-ink-950 hover:border-ink-950 transition-colors"
    >
      {/* 아이콘은 React 상태가 아니라 html.dark 클래스로 바꿔서, 하이드레이션 전 첫 화면부터 저장된 테마와 맞게 보입니다. */}
      <span className="inline-flex dark:hidden" aria-hidden="true">
        <IMoon size={14} />
      </span>
      <span className="hidden dark:inline-flex" aria-hidden="true">
        <ISun size={14} />
      </span>
    </button>
  );
}
