'use client';

import Chip from '@/components/ds/Chip';
import Eyebrow from '@/components/ds/Eyebrow';
import { formatPresentationDate } from '@/lib/log/formatLogDate';
import ROUTE_PATH from '@/constants/path/routePath';
import { useRouteModal } from '@/lib/modal';
import { PresentationItem } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';
import { useMemo } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import EmbedFrame from './components/EmbedFrame';
import { getPresentationEmbed } from './utils';

interface PresentationDetailModalProps {
  presentation: PresentationItem;
}

export default function PresentationDetailModal({
  presentation,
}: PresentationDetailModalProps) {
  const { closeModal, isClosing, isOpen } = useRouteModal({
    fallbackHref: ROUTE_PATH.LOG,
  });

  const embed = useMemo(
    () => getPresentationEmbed(presentation.href),
    [presentation.href],
  );

  // 모달은 연도 섹션 밖에 뜨므로 날짜에 연도를 붙여 적습니다.
  const date = formatPresentationDate(
    presentation.date,
    presentation.displayDate,
  );

  // 주소가 이 모달의 것이 아니게 되면 슬롯에 남아 있더라도 그리지 않습니다.
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${presentation.title} 발표 자료`}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-s-3 xl:p-s-5"
    >
      <button
        type="button"
        aria-label="발표 자료 닫기"
        onClick={() => closeModal()}
        className={cn(
          'absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm',
          isClosing
            ? 'animate-modal-backdrop-out'
            : 'animate-modal-backdrop-in',
        )}
      />

      <div
        className={cn(
          'relative flex max-h-[92vh] w-full max-w-[1100px] flex-col overflow-hidden rounded-t-2xl bg-ink-0 sm:max-h-[94vh] sm:rounded-2xl',
          isClosing
            ? 'animate-modal-sheet-out sm:animate-modal-panel-out'
            : 'animate-modal-sheet-in sm:animate-modal-panel-in',
        )}
      >
        <button
          type="button"
          aria-label="닫기"
          onClick={() => closeModal()}
          className="absolute right-s-4 top-s-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink-0/85 text-ink-500 backdrop-blur-sm transition-colors hover:bg-ink-100 hover:text-ink-950"
        >
          <IoClose size={22} />
        </button>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-s-5 py-s-5 sm:px-s-7 sm:py-s-7">
          <div className="shrink-0 pr-s-8">
            <Eyebrow className="text-[13px] text-ink-900">Presentation</Eyebrow>
            <h2 className="m-0 mt-s-2 text-[26px] font-semibold leading-[1.25] tracking-[-0.03em] text-ink-950 sm:text-[32px] sm:leading-[1.2]">
              {presentation.title}
            </h2>
            <div className="mt-s-3 flex flex-wrap items-center gap-s-3">
              <span className="font-mono text-[13px] text-ink-500">{date}</span>
              {presentation.place && (
                <Chip interactive={false} className="text-[13px]">
                  {presentation.place}
                </Chip>
              )}
            </div>
          </div>

          <div className="mt-s-5 shrink-0">
            <EmbedFrame
              embed={embed}
              title={presentation.title}
              href={presentation.href}
            />
          </div>

          {embed && presentation.href && (
            <Link
              href={presentation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-s-4 flex w-full shrink-0 items-center justify-center gap-s-2 rounded-pill border border-ink-200 px-s-4 py-s-3 font-mono text-[13px] text-ink-700 transition-colors hover:border-ink-950 hover:text-ink-950"
            >
              <span>원문에서 보기</span>
              <FiArrowUpRight size={14} className="shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
