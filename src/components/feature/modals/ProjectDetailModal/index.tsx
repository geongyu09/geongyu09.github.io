'use client';

import Eyebrow from '@/components/ds/Eyebrow';
import { formatYearMonth } from '@/lib/log/formatLogDate';
import { getProjectSectionKey } from '@/lib/log/projectSection';
import ROUTE_PATH from '@/constants/path/routePath';
import { useRouteModal } from '@/lib/modal';
import {
  ProjectDetailImage,
  ProjectDetailStep,
  ProjectItem,
} from '@/types/log';
import cn from '@/utils/cn';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import DetailBoxList from './components/DetailBoxList';
import DetailStory from './components/DetailStory';
import DetailView from './components/DetailView';
import DetailVisual from './components/DetailVisual';
import ProjectLinkList from './components/ProjectLinkList';

interface ProjectDetailModalProps {
  project: ProjectItem;
  /** 코드까지 색칠해 둔 상세 문단입니다. 서버에서 만들어 넘겨 받습니다. */
  details: ProjectDetailStep[];
}

export default function ProjectDetailModal({
  project,
  details,
}: ProjectDetailModalProps) {
  const { closeModal, isClosing, isOpen } = useRouteModal({
    fallbackHref: ROUTE_PATH.LOG,
  });
  /** 마지막으로 누른 박스의 순번입니다. 목록으로 돌아와도 남겨 두어 포커스를 되돌려 줍니다. */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 모달은 연도 섹션 밖에 뜨므로 시작과 끝 모두 연도를 붙여 적습니다.
  const period = `${formatYearMonth(project.startDate)} ~ ${formatYearMonth(
    project.endDate,
  )}`;
  const status = project.endDate === '현재' ? '진행 중' : '마무리';
  const cover: ProjectDetailImage | undefined = project.thumbnail
    ? { src: project.thumbnail, alt: `${project.title} 대표 이미지` }
    : undefined;
  const activeDetail =
    isDetailOpen && activeIndex !== null ? details[activeIndex] : undefined;
  const visual = activeDetail ? activeDetail.image : cover;

  const openDetail = (index: number) => {
    setActiveIndex(index);
    setIsDetailOpen(true);
  };

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

        {/* Library · Tool은 스크롤을 따라 그림이 바뀌는 예전 방식을 그대로 씁니다. */}
        {getProjectSectionKey(project) === 'library' ? (
          <DetailStory
            project={project}
            details={details}
            period={period}
            status={status}
            cover={cover}
          />
        ) : (
          // 넓은 화면에서는 한 화면에 다 담기고, 좁은 화면에서만 위아래로 쌓여 패널째 스크롤합니다.
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
            <aside className="flex shrink-0 flex-col gap-s-3 border-b border-ink-200 p-s-5 lg:w-[54%] lg:border-b-0 lg:border-r lg:p-s-7 xl:p-s-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-r-2 border border-ink-200 bg-ink-50 lg:aspect-auto lg:min-h-0 lg:flex-1">
                <DetailVisual
                  image={visual}
                  order={activeDetail ? (activeIndex ?? 0) + 1 : undefined}
                  label={project.category}
                  preview={project.preview}
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  priority
                />
              </div>
              <p className="m-0 min-h-[18px] shrink-0 text-right text-[13px] leading-[1.4] text-ink-500">
                {visual?.caption}
              </p>
            </aside>

            {/* 박스를 누를 때마다 다시 그려 앞서 내려 둔 스크롤 위치를 남기지 않습니다. */}
            <div
              key={activeDetail ? activeIndex : 'overview'}
              role="region"
              aria-label={`${project.title} 상세 내용`}
              // 내용이 넘칠 때만 생기는 스크롤도 방향키로 읽을 수 있도록 포커스를 받게 둡니다.
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              className="min-w-0 flex-1 px-s-5 py-s-5 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ink-400 lg:overflow-y-auto lg:px-s-8 lg:py-s-7 xl:px-s-9"
            >
              <div className="max-w-[640px]">
                <div className="pr-s-8">
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

                <div className="mt-s-7">
                  {activeDetail ? (
                    <DetailView
                      detail={activeDetail}
                      order={(activeIndex ?? 0) + 1}
                      onBack={() => setIsDetailOpen(false)}
                    />
                  ) : (
                    <>
                      <Eyebrow className="text-[13px] text-ink-900">
                        소개
                      </Eyebrow>
                      {project.quote && (
                        <p className="m-0 mt-s-3 text-[18px] italic leading-[1.7] tracking-[-0.01em] text-ink-500">
                          {project.quote}
                        </p>
                      )}
                      {(project.intro ?? [project.description]).map((line) => (
                        <p
                          key={line}
                          className="m-0 mt-s-3 text-[18px] leading-[1.7] tracking-[-0.01em] text-ink-950"
                        >
                          {line}
                        </p>
                      ))}

                      {project.links && project.links.length > 0 && (
                        <ProjectLinkList links={project.links} />
                      )}

                      {details.length > 0 && (
                        <>
                          <Eyebrow className="mt-s-7 text-[13px] text-ink-900">
                            프로젝트 기여
                          </Eyebrow>
                          <DetailBoxList
                            details={details}
                            onSelect={openDetail}
                            focusIndex={activeIndex}
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
