import { ExperienceSectionIcon } from '@/types/log';
import { ReactNode } from 'react';

/** 갈래 종류마다 그리는 선입니다. 24칸 격자 위에 같은 굵기의 선으로 그려 글자색 한 가지로 칠합니다. */
const ICON_PATHS: Record<ExperienceSectionIcon, ReactNode> = {
  manage: (
    <>
      <rect x="3.5" y="4" width="17" height="7" rx="2" />
      <rect x="3.5" y="13" width="17" height="7" rx="2" />
      <path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h5.5M11 16.5h5.5" />
    </>
  ),
  project: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18M10 12l-2.5 2.5L10 17M14 12l2.5 2.5L14 17" />
    </>
  ),
  study: (
    <path d="M12 6.5C10.2 5 7.6 4.5 4 4.5v13c3.6 0 6.2.5 8 2 1.8-1.5 4.4-2 8-2v-13c-3.6 0-6.2.5-8 2zM12 6.5v13" />
  ),
  talk: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M12 16v4M8 20h8M7.5 12.5 10 10l2 2 4-4" />
    </>
  ),
  recruit: (
    <>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M19 8v6M16 11h6" />
    </>
  ),
  etc: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <circle cx="16.75" cy="16.75" r="3.25" />
    </>
  ),
};

interface Props {
  name: ExperienceSectionIcon;
}

/** 갈래 제목 앞에 붙여, 갈래가 어떤 성격의 활동인지 글을 읽기 전에 알아보게 합니다. */
export default function SectionIcon({ name }: Props) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-ink-900"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
