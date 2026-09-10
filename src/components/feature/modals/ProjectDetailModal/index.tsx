'use client';

import Eyebrow from '@/components/ds/Eyebrow';
import { formatYearMonth } from '@/lib/log/formatLogDate';
import ROUTE_PATH from '@/constants/path/routePath';
import { useRouteModal } from '@/lib/modal';
import { ProjectItem } from '@/types/log';
import cn from '@/utils/cn';
import { useMemo, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import DetailStage from './components/DetailStage';
import DetailStepList from './components/DetailStepList';
import ProjectLinkList from './components/ProjectLinkList';
import useDetailStory from './hooks/useDetailStory';
import { normalizeProjectDetails } from './utils';

interface ProjectDetailModalProps {
  project: ProjectItem;
}

export default function ProjectDetailModal({
  project,
}: ProjectDetailModalProps) {
  const { closeModal, isClosing, isOpen } = useRouteModal({
    fallbackHref: ROUTE_PATH.LOG,
  });
  const panelRef = useRef<HTMLDivElement>(null);

  const details = useMemo(
    () => normalizeProjectDetails(project.details),
    [project.details],
  );
  const { activeIndex, progress, setStepRef } = useDetailStory(
    panelRef,
    details.length,
  );

  // 모달은 연도 섹션 밖에 뜨므로 시작과 끝 모두 연도를 붙여 적습니다.
  const period = `${formatYearMonth(project.startDate)} ~ ${formatYearMonth(
    project.endDate,
  )}`;
  const status = project.endDate === '현재' ? '진행 중' : '마무리';
  const cover = project.thumbnail
    ? { src: project.thumbnail, alt: `${project.title} 대표 이미지` }
    : undefined;

  // 주소가 이 모달의 것이 아니게 되면 슬롯에 남아 있더라도 그리지 않습니다.
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 상세`}
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
        ref={panelRef}
        className={cn(
          'relative flex h-[96vh] w-full max-w-[1600px] flex-col overflow-hidden rounded-t-2xl bg-ink-0 sm:h-[94vh] sm:rounded-2xl',
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

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          <aside className="flex shrink-0 flex-col border-b border-ink-200 px-s-5 py-s-5 lg:w-[54%] lg:min-h-0 lg:border-b-0 lg:border-r lg:px-s-7 lg:py-s-7 xl:px-s-8">
            <div className="shrink-0 pr-s-8 lg:pr-0">
              <div className="flex flex-wrap items-center gap-s-3">
                <Eyebrow className="text-[13px] text-ink-900">
                  {project.category}
                </Eyebrow>
                <span className="rounded-pill border border-ink-200 px-s-3 py-[3px] font-mono text-[11px] text-ink-500">
                  {status}
                </span>
              </div>
              <h2 className="m-0 mt-s-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.03em] text-ink-950">
                {project.title}
              </h2>
              <p className="m-0 mt-s-3 font-mono text-[13px] leading-[1.6] text-ink-500">
                {period} · {project.org} · {project.role}
              </p>
            </div>

            <DetailStage
              className="mt-s-6 hidden lg:flex"
              details={details}
              cover={cover}
              activeIndex={activeIndex}
              progress={progress}
              label={project.category}
            />
          </aside>

          {/* 키보드만 쓰는 경우에도 방향키로 내려 읽을 수 있도록 포커스를 받게 둡니다. */}
          <div
            role="region"
            aria-label={`${project.title} 상세 내용`}
            // 스크롤이 생기는 영역은 포커스를 받아야 방향키로 읽을 수 있습니다.
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            className="min-w-0 flex-1 px-s-5 py-s-5 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink-400 lg:overflow-y-auto lg:px-s-8 lg:py-s-7 xl:px-s-9"
          >
            <div className="max-w-[640px]">
              <Eyebrow className="text-[13px] text-ink-900">소개</Eyebrow>
              <p className="m-0 mt-s-3 text-[20px] leading-[1.7] tracking-[-0.01em] text-ink-950">
                {project.description}
              </p>

              {project.links && project.links.length > 0 && (
                <ProjectLinkList links={project.links} />
              )}

              <Eyebrow className="mt-s-7 text-[13px] text-ink-900">
                상세
              </Eyebrow>
              <DetailStepList
                details={details}
                activeIndex={activeIndex}
                label={project.category}
                setStepRef={setStepRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
