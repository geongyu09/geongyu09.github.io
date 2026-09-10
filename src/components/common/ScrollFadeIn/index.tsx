'use client';

import cn from '@/utils/cn';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';

interface ScrollFadeInProps extends HTMLAttributes<HTMLDivElement> {
  /** 뷰포트 아래쪽에서 잘라낼 영역. 값이 클수록 더 많이 스크롤해야 나타납니다. */
  offset?: string;
  /** 페이드가 끝나기까지 걸리는 시간(ms)입니다. */
  duration?: number;
  /** 페이드와 함께 올라오는 거리(px). 0이면 자리를 옮기지 않고 투명도만 바꿉니다. */
  distance?: number;
  /** 뷰포트에 들어온 뒤 페이드를 시작하기까지 기다리는 시간(ms)입니다. */
  delay?: number;
}

/**
 * 요소가 뷰포트로 들어오는 순간 한 번만 페이드 인시킵니다.
 * 다시 위로 스크롤해도 사라지지 않고, 모션을 줄이도록 설정한 환경에서는 즉시 보여 줍니다.
 * 관찰 기준은 뷰포트라, 모달처럼 안쪽에서 따로 스크롤하는 영역에서도 그대로 씁니다.
 */
export default function ScrollFadeIn({
  offset = '25%',
  duration = 600,
  distance = 0,
  delay = 0,
  className,
  style,
  children,
  ...rest
}: ScrollFadeInProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${offset} 0px`, threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [offset]);

  const isLifted = distance !== 0 && !isVisible;

  return (
    <div
      ref={targetRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transform: isLifted ? `translate3d(0, ${distance}px, 0)` : undefined,
        ...style,
      }}
      className={cn(
        'transition-[opacity,transform] ease-out motion-reduce:transition-none',
        isVisible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
