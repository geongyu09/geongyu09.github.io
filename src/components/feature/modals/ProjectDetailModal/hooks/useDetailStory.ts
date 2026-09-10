'use client';

import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

/** 문단의 윗변이 모달 높이의 이 비율까지 올라오면 지금 읽고 있는 문단으로 봅니다. */
const ACTIVATION_RATIO = 0.45;

/** 진행률이 이 값보다 적게 움직였으면 다시 그리지 않습니다. */
const PROGRESS_EPSILON = 0.002;

interface DetailStoryState {
  /** 지금 읽고 있는 상세 문단의 순번입니다. 아직 소개를 읽고 있으면 -1 입니다. */
  activeIndex: number;
  /** 상세 문단이 놓인 열을 얼마나 내려왔는지를 0 에서 1 사이로 적습니다. */
  progress: number;
}

interface DetailStory extends DetailStoryState {
  /** 문단마다 위치를 재야 해서 순번별로 ref 를 걸어 둡니다. */
  setStepRef: (index: number) => (element: HTMLLIElement | null) => void;
}

/**
 * 모달 안쪽 스크롤을 따라가며 지금 읽고 있는 상세 문단과 전체 진행률을 계산합니다.
 * 화면 폭에 따라 실제로 스크롤하는 요소가 달라지므로, 모달 전체에서 캡처 단계로 스크롤을 받아
 * 어느 열이 움직이든 같은 방식으로 다룹니다.
 */
export default function useDetailStory(
  panelRef: RefObject<HTMLElement | null>,
  stepCount: number,
): DetailStory {
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);
  const scrollerRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [state, setState] = useState<DetailStoryState>({
    activeIndex: -1,
    progress: 0,
  });

  const setStepRef = useCallback(
    (index: number) => (element: HTMLLIElement | null) => {
      stepsRef.current[index] = element;
    },
    [],
  );

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;

    const measure = () => {
      const panelRect = panel.getBoundingClientRect();
      const activationLine =
        panelRect.top + panelRect.height * ACTIVATION_RATIO;

      const activeIndex = stepsRef.current.reduce(
        (passed, step, index) =>
          step && step.getBoundingClientRect().top <= activationLine
            ? index
            : passed,
        -1,
      );

      const scroller = scrollerRef.current;
      const scrollableHeight = scroller
        ? scroller.scrollHeight - scroller.clientHeight
        : 0;

      setState((prev) => {
        // 스크롤이 없는 열에서 온 이벤트라면 진행률은 직전 값을 그대로 둡니다.
        const progress =
          scroller && scrollableHeight > 0
            ? Math.min(1, Math.max(0, scroller.scrollTop / scrollableHeight))
            : prev.progress;

        const isSame =
          prev.activeIndex === activeIndex &&
          Math.abs(prev.progress - progress) < PROGRESS_EPSILON;

        return isSame ? prev : { activeIndex, progress };
      });
    };

    const requestMeasure = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        measure();
      });
    };

    const handleScroll = (event: Event) => {
      if (event.target instanceof HTMLElement)
        scrollerRef.current = event.target;
      requestMeasure();
    };

    // 스크롤 이벤트는 위로 올라오지 않으므로 캡처 단계에서 받습니다.
    panel.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener('resize', requestMeasure);
    requestMeasure();

    return () => {
      panel.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('resize', requestMeasure);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [panelRef, stepCount]);

  return { ...state, setStepRef };
}
