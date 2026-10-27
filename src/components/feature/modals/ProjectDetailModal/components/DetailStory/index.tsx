'use client';

import Eyebrow from '@/components/ds/Eyebrow';
import {
  ProjectDetailImage,
  ProjectDetailStep,
  ProjectItem,
} from '@/types/log';
import { useRef } from 'react';
import DetailStage from '../DetailStage';
import DetailStepList from '../DetailStepList';
import ProjectLinkList from '../ProjectLinkList';
import useDetailStory from '../../hooks/useDetailStory';

interface Props {
  project: ProjectItem;
  details: ProjectDetailStep[];
  /** 모달 머리에 적는 시작과 끝 연월입니다. */
  period: string;
  /** 진행 중인지 마무리했는지를 적습니다. */
  status: string;
  /** 소개를 읽는 동안 왼쪽에 띄워 두는 대표 이미지입니다. */
  cover?: ProjectDetailImage;
}

/**
 * Library · Tool 갈래의 상세 본문입니다.
 * 오른쪽 문단을 스크롤로 읽어 내려가는 동안 왼쪽 그림과 진행률을 그 문단에 맞춰 바꿉니다.
 */
export default function DetailStory({
  project,
  details,
  period,
  status,
  cover,
}: Props) {
  const storyRef = useRef<HTMLDivElement>(null);

  const { activeIndex, progress, setStepRef } = useDetailStory(
    storyRef,
    details.length,
  );

  return (
    <div
      ref={storyRef}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden"
    >
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

          <Eyebrow className="mt-s-7 text-[13px] text-ink-900">상세</Eyebrow>
          <DetailStepList
            details={details}
            activeIndex={activeIndex}
            label={project.category}
            setStepRef={setStepRef}
          />
        </div>
      </div>
    </div>
  );
}
