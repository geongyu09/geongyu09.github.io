'use client';

import Eyebrow from '@/components/ds/Eyebrow';
import { formatYearMonth } from '@/lib/log/formatLogDate';
import { useModal } from '@/lib/modal';
import { ProjectItem } from '@/types/log';
import Link from 'next/link';
import { useEffect } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

interface ProjectDetailModalProps {
  project: ProjectItem;
}

export default function ProjectDetailModal({
  project,
}: ProjectDetailModalProps) {
  const { closeModal } = useModal();

  // 모달은 연도 섹션 밖에 뜨므로 시작과 끝 모두 연도를 붙여 적습니다.
  const period = `${formatYearMonth(project.startDate)} ~ ${formatYearMonth(
    project.endDate,
  )}`;

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
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-s-5"
    >
      <button
        type="button"
        aria-label="상세 닫기"
        onClick={() => closeModal()}
        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[85vh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-2xl bg-ink-0 sm:rounded-2xl">
        <header className="flex items-start justify-between gap-s-4 border-b border-ink-200 px-s-5 py-s-4">
          <div className="min-w-0">
            <Eyebrow className="text-[13px] text-ink-900">
              {project.category}
            </Eyebrow>
            <h2 className="m-0 mt-s-2 text-[20px] font-semibold tracking-[-0.02em] text-ink-950">
              {project.title}
            </h2>
            <p className="m-0 mt-s-1 font-mono text-[13px] text-ink-500">
              {period} · {project.role}
            </p>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={() => closeModal()}
            className="-mr-s-2 -mt-s-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-950"
          >
            <IoClose size={20} />
          </button>
        </header>

        <div className="overflow-y-auto px-s-5 py-s-4">
          <p className="m-0 text-[16px] leading-[1.7] text-ink-950">
            {project.description}
          </p>
          <ul className="mt-s-4 flex flex-col gap-s-3">
            {project.details.map((detail) => (
              <li
                key={detail}
                className="relative pl-s-4 text-[15px] leading-[1.75] text-ink-700 before:absolute before:left-0 before:top-[10px] before:h-[3px] before:w-[3px] before:rounded-full before:bg-ink-400"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {project.href && (
          <footer className="border-t border-ink-200 px-s-5 py-s-3">
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[2px] font-mono text-[13px] text-ink-700 transition-colors hover:text-ink-950"
            >
              레포 열기
              <FiArrowUpRight size={14} />
            </Link>
          </footer>
        )}
      </div>
    </div>
  );
}
