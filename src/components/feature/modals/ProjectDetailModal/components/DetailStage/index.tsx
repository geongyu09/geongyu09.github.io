'use client';

import { ProjectDetailBlock, ProjectDetailImage } from '@/types/log';
import cn from '@/utils/cn';
import { ReactNode } from 'react';
import DetailVisual from '../DetailVisual';
import { padOrder } from '../../utils';

const STAGE_SIZES = '(min-width: 1280px) 800px, 54vw';

interface Props {
  details: ProjectDetailBlock[];
  /** 소개를 읽는 동안 띄워 두는 대표 이미지입니다. */
  cover?: ProjectDetailImage;
  /** 지금 읽고 있는 상세 문단의 순번입니다. 소개를 읽는 동안에는 -1 입니다. */
  activeIndex: number;
  /** 오른쪽 열을 얼마나 내려왔는지를 0 에서 1 사이로 받습니다. */
  progress: number;
  /** 이미지를 걸지 않은 문단의 자리에 대신 적는 프로젝트 분류입니다. */
  label: string;
  className?: string;
}

/** 그림 한 장이 놓이는 자리입니다. 지금 읽는 문단의 그림만 남기고 나머지는 흐려 둡니다. */
function StageLayer({
  isActive,
  children,
}: {
  isActive: boolean;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden={!isActive}
      className={cn(
        'absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none',
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'pointer-events-none opacity-0 translate-y-[10px] scale-[0.99]',
      )}
    >
      {children}
    </div>
  );
}

/**
 * 오른쪽 설명을 읽어 내려가는 동안 왼쪽에 머무르며 그림만 바꿔 다는 자리입니다.
 * 넓은 화면에서만 쓰고, 좁은 화면에서는 문단마다 그림을 바로 위에 답니다.
 */
export default function DetailStage({
  details,
  cover,
  activeIndex,
  progress,
  label,
  className,
}: Props) {
  const activeImage =
    activeIndex >= 0 ? details[activeIndex]?.image : undefined;
  const caption = activeIndex >= 0 ? activeImage?.caption : cover?.caption;
  const counter =
    activeIndex >= 0
      ? `${padOrder(activeIndex + 1)} / ${padOrder(details.length)}`
      : '소개';

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col gap-s-4', className)}>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-r-2 border border-ink-200 bg-ink-50">
        <StageLayer isActive={activeIndex < 0}>
          <DetailVisual
            image={cover}
            label={label}
            sizes={STAGE_SIZES}
            priority
          />
        </StageLayer>

        {details.map((detail, index) => (
          <StageLayer key={detail.text} isActive={index === activeIndex}>
            <DetailVisual
              image={detail.image}
              order={index + 1}
              label={label}
              sizes={STAGE_SIZES}
              priority={index === 0}
            />
          </StageLayer>
        ))}
      </div>

      <div className="shrink-0">
        <div className="h-[2px] w-full overflow-hidden rounded-pill bg-ink-200">
          <div
            className="h-full w-full origin-left bg-ink-950 transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <div className="mt-s-3 flex items-baseline justify-between gap-s-5">
          <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-500">
            {counter}
          </span>
          <p className="m-0 min-h-[18px] flex-1 text-right text-[13px] leading-[1.4] text-ink-500">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}
