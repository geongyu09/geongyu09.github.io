/**
 * 테마 선택을 저장하는 localStorage 키입니다.
 * 하이드레이션 전에 실행되는 ThemeScript와 클라이언트 훅 useTheme이 같은 키를 읽어야 하므로
 * 'use client' 지시어가 없는 이 모듈에서 함께 가져다 씁니다.
 */
export const THEME_STORAGE_KEY = 'geongyu-theme';

export type Theme = 'light' | 'dark';
