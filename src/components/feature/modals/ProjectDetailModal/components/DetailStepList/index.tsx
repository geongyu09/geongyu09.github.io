'use client';

import ScrollFadeIn from '@/components/common/ScrollFadeIn';
import { ProjectDetailBlock } from '@/types/log';
import cn from '@/utils/cn';
import DetailVisual from '../DetailVisual';
import { padOrder } from '../../utils';

interface Props {
  details: ProjectDetailBlock[];
  /** 지금 읽고 있는 상세 문단의 순번입니다. 소개를 읽는 동안에는 -1 입니다. */
  activeIndex: number;
  /** 이미지를 걸지 않은 문단의 자리에 대신 적는 프로젝트 분류입니다. */
  label: string;
  setStepRef: (index: number) => (element: HTMLLIElement | null) => void;
}

/**
 * 한 화면에 한 문단씩 읽어 내려가는 목록입니다.
 * 지금 읽는 문단만 진하게 두고, 좁은 화면에서는 문단마다 그림을 바로 위에 답니다.
 */
export default function DetailStepList({
  details,
  activeIndex,
  label,
  setStepRef,
}: Props) {
  return (
    <ol className="m-0 mt-s-4 flex list-none flex-col p-0 pb-[12vh] lg:pb-[30vh]">
      {details.map((detail, index) => {
        const isActive = index === activeIndex;

        return (
          <li
            key={detail.text}
            ref={setStepRef(index)}
            className="flex flex-col justify-center py-s-4 lg:min-h-[38vh] lg:py-s-6"
          >
            <ScrollFadeIn offset="12%" distance={14} duration={500}>
              <div className="flex items-center gap-s-3" aria-hidden>
                <span
                  className={cn(
                    'font-mono text-[12px] tracking-[0.06em] transition-colors duration-300 motion-reduce:transition-none',
                    isActive ? 'text-ink-950' : 'text-ink-400',
                  )}
                >
                  {padOrder(index + 1)}
                </span>
                <span
                  className={cn(
                    'h-px flex-1 transition-colors duration-300 motion-reduce:transition-none',
                    isActive ? 'bg-ink-950' : 'bg-ink-200',
                  )}
                />
              </div>

              {/* 왼쪽에 그림을 둘 자리가 없는 좁은 화면에서는 문단 바로 위에 답니다. */}
              <div className="relative mt-s-4 aspect-[16/10] w-full overflow-hidden rounded-r-2 border border-ink-200 bg-ink-50 lg:hidden">
                <DetailVisual
                  image={detail.image}
                  order={index + 1}
                  label={label}
                  sizes="100vw"
                />
              </div>
              {detail.image?.caption && (
                <p className="m-0 mt-s-2 text-[13px] leading-[1.5] text-ink-500 lg:hidden">
                  {detail.image.caption}
                </p>
              )}

              <p
                className={cn(
                  'm-0 mt-s-4 text-[17px] leading-[1.85] transition-colors duration-300 motion-reduce:transition-none',
                  isActive ? 'text-ink-900' : 'text-ink-500',
                )}
              >
                {detail.text}
              </p>
            </ScrollFadeIn>
          </li>
        );
      })}
    </ol>
  );
}
