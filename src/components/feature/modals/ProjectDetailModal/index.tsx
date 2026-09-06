'use client';

import Eyebrow from '@/components/ds/Eyebrow';
import { formatYearMonth } from '@/lib/log/formatLogDate';
import { useModal } from '@/lib/modal';
import { ProjectLinkType, ProjectItem } from '@/types/log';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiGithub,
  FiGlobe,
  FiPackage,
} from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { IconType } from 'react-icons';

interface ProjectDetailModalProps {
  project: ProjectItem;
}

/** 주소 종류마다 붙는 아이콘과, 따로 적지 않았을 때 쓰는 문구입니다. */
const LINK_PRESET: Record<ProjectLinkType, { icon: IconType; label: string }> =
  {
    repo: { icon: FiGithub, label: '레포지토리' },
    npm: { icon: FiPackage, label: 'npm 패키지' },
    site: { icon: FiGlobe, label: '서비스 바로가기' },
    docs: { icon: FiBookOpen, label: '문서' },
  };

/** 왼쪽 열에 세로로 쌓는 메타데이터 한 줄입니다. */
function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-s-4 border-t border-ink-200 py-s-3">
      <dt className="w-[56px] shrink-0 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-500">
        {label}
      </dt>
      <dd className="m-0 flex-1 text-[15px] leading-[1.6] text-ink-800">
        {value}
      </dd>
    </div>
  );
}

export default function ProjectDetailModal({
  project,
}: ProjectDetailModalProps) {
  const { closeModal } = useModal();

  // 모달은 연도 섹션 밖에 뜨므로 시작과 끝 모두 연도를 붙여 적습니다.
  const period = `${formatYearMonth(project.startDate)} ~ ${formatYearMonth(
    project.endDate,
  )}`;
  const status = project.endDate === '현재' ? '진행 중' : '마무리';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [closeModal]);

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
        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm"
      />

      <div className="relative flex h-[96vh] w-full max-w-[1600px] flex-col overflow-hidden rounded-t-2xl bg-ink-0 sm:h-[94vh] sm:rounded-2xl">
        <button
          type="button"
          aria-label="닫기"
          onClick={() => closeModal()}
          className="absolute right-s-4 top-s-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink-0/85 text-ink-500 backdrop-blur-sm transition-colors hover:bg-ink-100 hover:text-ink-950"
        >
          <IoClose size={22} />
        </button>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          <aside className="shrink-0 border-b border-ink-200 px-s-5 py-s-5 lg:w-[420px] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:px-s-6 lg:py-s-7 xl:w-[480px] xl:px-s-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-r-2 border border-ink-200 bg-ink-50">
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} 대표 이미지`}
                  fill
                  sizes="(min-width: 1280px) 480px, (min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-[radial-gradient(var(--ink-200)_1px,transparent_1px)] [background-size:10px_10px]"
                  aria-hidden
                >
                  <span className="rounded-pill bg-ink-0/80 px-s-3 py-s-1 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-500">
                    {project.category}
                  </span>
                </div>
              )}
            </div>

            <Eyebrow className="mt-s-6 text-[13px] text-ink-900">
              {project.category}
            </Eyebrow>
            <h2 className="m-0 mt-s-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.03em] text-ink-950">
              {project.title}
            </h2>

            <dl className="m-0 mt-s-6 flex flex-col">
              <MetaRow label="기간" value={period} />
              <MetaRow label="소속" value={project.org} />
              <MetaRow label="역할" value={project.role} />
              <MetaRow label="상태" value={status} />
            </dl>

            {project.links && project.links.length > 0 && (
              <ul className="mt-s-6 flex flex-col gap-s-2">
                {project.links.map((link) => {
                  const { icon: Icon, label } = LINK_PRESET[link.type];

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center gap-s-3 rounded-pill border border-ink-200 px-s-4 py-s-3 font-mono text-[13px] text-ink-700 transition-colors hover:border-ink-950 hover:text-ink-950"
                      >
                        <Icon size={15} className="shrink-0" />
                        <span className="flex-1 truncate text-left">
                          {link.label ?? label}
                        </span>
                        <FiArrowUpRight size={14} className="shrink-0" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </aside>

          <div className="min-w-0 flex-1 px-s-5 py-s-5 lg:overflow-y-auto lg:px-s-8 lg:py-s-7 lg:pr-s-9 xl:px-s-9 xl:pr-s-10">
            <div className="max-w-[820px]">
              <Eyebrow className="text-[13px] text-ink-900">소개</Eyebrow>
              <p className="m-0 mt-s-3 text-[20px] leading-[1.7] tracking-[-0.01em] text-ink-950">
                {project.description}
              </p>

              <Eyebrow className="mt-s-7 text-[13px] text-ink-900">
                상세
              </Eyebrow>
              <ul className="mt-s-4 flex flex-col gap-s-5">
                {project.details.map((detail) => (
                  <li
                    key={detail}
                    className="relative pl-s-4 text-[17px] leading-[1.85] text-ink-700 before:absolute before:left-0 before:top-[12px] before:h-[3px] before:w-[3px] before:rounded-full before:bg-ink-400"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
