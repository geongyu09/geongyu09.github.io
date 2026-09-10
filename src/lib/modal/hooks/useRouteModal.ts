'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 닫기를 누른 뒤 주소를 바꾸기까지 기다리는 시간입니다.
 * tailwind.config.ts 의 modal-*-out 애니메이션 중 가장 긴 길이(200ms)에 맞춰 둡니다.
 */
const CLOSE_ANIMATION_DURATION = 210;

/**
 * 이 모듈이 처음 평가될 때의 주소가 곧 브라우저가 직접 연 주소입니다.
 * 모달 주소로 곧바로 들어온 경우에는 뒤로 갈 곳이 사이트 바깥이라 뒤로 가기를 쓸 수 없습니다.
 */
const entryPathname =
  typeof window === 'undefined' ? null : window.location.pathname;

const isSamePath = (a: string, b: string) =>
  a.replace(/\/+$/, '') === b.replace(/\/+$/, '');

interface UseRouteModalOptions {
  /** 주소를 직접 열고 들어왔을 때 닫으면 갈 곳입니다. */
  fallbackHref: string;
}

/**
 * 병렬 경로로 띄운 모달의 여닫기를 맡습니다.
 *
 * 목록에서 눌러 들어왔다면 닫을 때 뒤로 가기로 되돌아가 스크롤 위치와 히스토리를 그대로 두고,
 * 주소로 곧바로 들어왔다면 뒤로 갈 곳이 없으므로 목록 주소로 바꿔 줍니다.
 *
 * 병렬 경로 슬롯은 주소가 슬롯과 맞지 않게 바뀌어도 화면 안에서 이전 내용을 그대로 들고 있습니다.
 * 그래서 주소가 모달의 것이 아니게 되면 isOpen 이 false 가 되고, 모달은 아무것도 그리지 않아야 합니다.
 */
export default function useRouteModal({ fallbackHref }: UseRouteModalOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const modalPathnameRef = useRef(pathname);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isOpen = isSamePath(pathname, modalPathnameRef.current);

  const closeModal = useCallback(() => {
    if (!isOpen || isClosing) return;

    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      const isDirectEntry =
        entryPathname !== null &&
        isSamePath(entryPathname, modalPathnameRef.current);

      if (isDirectEntry) router.replace(fallbackHref, { scroll: false });
      else router.back();

      closeTimerRef.current = null;
    }, CLOSE_ANIMATION_DURATION);
  }, [fallbackHref, isClosing, isOpen, router]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  // 모달이 떠 있는 동안에는 뒤에 깔린 목록이 함께 스크롤되지 않도록 잠급니다.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [closeModal, isOpen]);

  return { closeModal, isClosing, isOpen };
}
