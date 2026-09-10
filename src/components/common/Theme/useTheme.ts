'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY, type Theme } from './constants';

export { THEME_STORAGE_KEY, type Theme } from './constants';

const DARK_CLASS = 'dark';

function readDomTheme(): Theme {
  return document.documentElement.classList.contains(DARK_CLASS)
    ? 'dark'
    : 'light';
}

function applyTheme(theme: Theme) {
  if (readDomTheme() === theme) return;
  document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark');
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
}

/**
 * 저장된 선택이 있으면 그 값을, 없으면 OS 설정을 따릅니다. ThemeScript와 같은 규칙입니다.
 */
function resolvePreferredTheme(): Theme {
  const stored = readStoredTheme();
  if (stored) return stored;
  const prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * <html>의 class 변경을 구독합니다. 한 페이지에 토글 버튼이 여러 개(데스크톱·모바일)여도
 * 한 곳에서 바꾼 테마가 나머지에도 바로 반영됩니다.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

/**
 * 서버 렌더링과 하이드레이션 첫 렌더링에서 쓰는 값입니다.
 * ThemeScript가 하이드레이션 전에 <html>에 dark 클래스를 붙이더라도, 첫 렌더링은 서버와 같은
 * 'light'로 그려서 마크업 불일치를 막고, 하이드레이션이 끝난 직후 실제 DOM 값으로 다시 그립니다.
 * 불일치로 하이드레이션이 실패하면 React 19가 <html>을 새로 만들면서 속성을 모두 지우기 때문에
 * 저장해 둔 다크 모드가 풀리는 문제가 있었습니다.
 */
function getServerSnapshot(): Theme {
  return 'light';
}

export default function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    readDomTheme,
    getServerSnapshot,
  );

  // 다른 원인으로 하이드레이션이 실패해 <html>의 class가 지워지더라도 저장된 선택을 되살립니다.
  useEffect(() => {
    applyTheme(resolvePreferredTheme());
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage unavailable (private mode 등) — 무시
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(readDomTheme() === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, setTheme, toggle };
}
