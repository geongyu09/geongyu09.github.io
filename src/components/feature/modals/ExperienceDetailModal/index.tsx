'use client';

import Eyebrow from '@/components/ds/Eyebrow';
import { formatYearMonth } from '@/lib/log/formatLogDate';
import ROUTE_PATH from '@/constants/path/routePath';
import { useRouteModal } from '@/lib/modal';
import { ActivityItem } from '@/types/log';
import cn from '@/utils/cn';
import { IoClose } from 'react-icons/io5';
import ActivityLinkList from './components/ActivityLinkList';
import DetailSection from './components/DetailSection';
import ExperienceVisual from './components/ExperienceVisual';

interface ExperienceDetailModalProps {
  experience: ActivityItem;
}

export default function ExperienceDetailModal({
  experience,
}: ExperienceDetailModalProps) {
  const { closeModal, isClosing, isOpen } = useRouteModal({
    fallbackHref: ROUTE_PATH.LOG,
  });

  // 모달은 연도 섹션 밖에 뜨므로 시작과 끝 모두 연도를 붙여 적습니다.
  const period = `${formatYearMonth(experience.startDate)} ~ ${formatYearMonth(
    experience.endDate,
  )}`;
  const status = experience.endDate === '현재' ? '진행 중' : '마무리';

  // 주소가 이 모달의 것이 아니게 되면 슬롯에 남아 있더라도 그리지 않습니다.
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${experience.title} 상세`}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-s-3 xl:p-s-5"
    >
      <button
        type="button"
        aria-label="상세 닫기"
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
          'relative flex max-h-[92vh] w-full max-w-[1080px] flex-col overflow-hidden rounded-t-2xl bg-ink-0 sm:max-h-[94vh] sm:rounded-2xl',
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
            <div className="flex flex-wrap items-center gap-s-3">
              <Eyebrow className="text-[13px] text-ink-900">Experience</Eyebrow>
              <span className="rounded-pill border border-ink-200 px-s-3 py-[3px] font-mono text-[11px] text-ink-500">
                {status}
              </span>
            </div>
            <h2 className="m-0 mt-s-2 text-[26px] font-semibold leading-[1.25] tracking-[-0.03em] text-ink-950 sm:text-[32px] sm:leading-[1.2]">
              {experience.title}
            </h2>
          </div>

          {/* 윗줄입니다. 넓은 화면에서는 왼쪽에 사진을, 오른쪽에 소속과 소개와 링크를 나눠 둡니다. */}
          <div className="mt-s-5 flex flex-col gap-s-5 lg:flex-row lg:items-stretch lg:gap-s-7">
            <div className="w-full shrink-0 lg:w-[38%]">
              <ExperienceVisual
                src={experience.thumbnail}
                alt={
                  experience.thumbnailAlt ??
                  `${experience.org}에서의 ${experience.title} 활동 사진`
                }
                label={experience.org}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="m-0 font-mono text-[13px] leading-[1.6] text-ink-500">
                {period} · {experience.org} · {experience.role}
              </p>
              <p className="m-0 mt-s-3 text-[20px] leading-[1.7] tracking-[-0.01em] text-ink-950">
                {experience.description}
              </p>

              {experience.links && experience.links.length > 0 && (
                <ActivityLinkList links={experience.links} />
              )}
            </div>
          </div>

          <DetailSection label="한 일" items={experience.activities} />

          {experience.learnings && experience.learnings.length > 0 && (
            <DetailSection label="배운 것" items={experience.learnings} />
          )}

          {experience.outcomes && experience.outcomes.length > 0 && (
            <DetailSection label="남긴 것" items={experience.outcomes} />
          )}
        </div>
      </div>
    </div>
  );
}
