'use client';

import { ProjectDetailStep } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';
import { ReactNode, useEffect, useRef } from 'react';
import { FiArrowUpRight, FiPlus } from 'react-icons/fi';
import padOrder, { isInternalHref } from '../../utils';

const BOX_CLASS =
  'flex h-full w-full flex-col gap-s-2 rounded-r-2 border border-ink-200 bg-ink-0 p-s-4 text-left transition-colors hover:border-ink-950 focus-visible:border-ink-950 focus-visible:outline-none';

interface Props {
  details: ProjectDetailStep[];
  /** 주소가 없는 박스를 눌렀을 때 모달 안에서 펼칠 문단의 순번을 넘깁니다. */
  onSelect: (index: number) => void;
  /** 펼쳐 봤던 문단에서 돌아왔을 때 포커스를 되돌려 줄 박스의 순번입니다. */
  focusIndex?: number | null;
}

/** 박스 안쪽 모양입니다. 갈래와 이름을 크게 두고, 본문은 두 줄까지만 미리 보여 줍니다. */
function BoxFace({
  detail,
  order,
  icon,
}: {
  detail: ProjectDetailStep;
  order: number;
  icon: ReactNode;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-s-3">
        <span className="font-mono text-[12px] tracking-[0.06em] text-ink-500">
          {detail.tag ?? padOrder(order)}
        </span>
        <span className="shrink-0 text-ink-400">{icon}</span>
      </div>
      {detail.title && (
        <p className="m-0 text-[16px] font-medium leading-[1.4] text-ink-950">
          {detail.title}
        </p>
      )}
      <p
        className={cn(
          'm-0 line-clamp-2 text-[14px] leading-[1.6]',
          detail.title ? 'text-ink-500' : 'text-ink-900',
        )}
      >
        {detail.summary ?? detail.text}
      </p>
    </>
  );
}

/**
 * 상세 문단을 박스 단추로 늘어놓습니다.
 * 주소를 단 박스는 그 주소로 이동하고, 주소가 없는 박스는 모달 안에서 내용을 펼칩니다.
 */
export default function DetailBoxList({
  details,
  onSelect,
  focusIndex,
}: Props) {
  const focusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  return (
    <ul className="m-0 mt-s-4 grid list-none grid-cols-1 gap-s-3 p-0">
      {details.map((detail, index) => {
        const order = index + 1;

        if (detail.href) {
          const isInternal = isInternalHref(detail.href);

          return (
            <li key={detail.text}>
              <Link
                href={detail.href}
                target={isInternal ? undefined : '_blank'}
                rel={isInternal ? undefined : 'noopener noreferrer'}
                className={BOX_CLASS}
              >
                <BoxFace
                  detail={detail}
                  order={order}
                  icon={<FiArrowUpRight size={15} />}
                />
              </Link>
            </li>
          );
        }

        return (
          <li key={detail.text}>
            <button
              type="button"
              ref={index === focusIndex ? focusRef : undefined}
              onClick={() => onSelect(index)}
              className={BOX_CLASS}
            >
              <BoxFace
                detail={detail}
                order={order}
                icon={<FiPlus size={15} />}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
