import { ProjectSectionKey } from '@/lib/log/projectSection';
import { ReactNode } from 'react';

export type LogTopicIconName =
  | 'github'
  | 'experience'
  | ProjectSectionKey
  | 'presentation'
  | 'study';

/** 주제마다 그리는 선입니다. 24칸 격자 위에 같은 굵기의 선으로 그려 글자색 한 가지로 칠합니다. */
const ICON_PATHS: Record<LogTopicIconName, ReactNode> = {
  github: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M3 12h5.5M15.5 12H21" />
    </>
  ),
  experience: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" />
    </>
  ),
  project: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 8.5h18M10 12l-2.5 2.5L10 17M14 12l2.5 2.5L14 17" />
    </>
  ),
  library: (
    <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" />
  ),
  contribution: (
    <>
      <circle cx="6" cy="5.5" r="2.5" />
      <circle cx="6" cy="18.5" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="M6 8v8M18 16V9.5A3.5 3.5 0 0 0 14.5 6H11M13 3.5 10.5 6 13 8.5" />
    </>
  ),
  presentation: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M12 16v4M8 20h8M7.5 12.5 10 10l2 2 4-4" />
    </>
  ),
  study: (
    <path d="M12 6.5C10.2 5 7.6 4.5 4 4.5v13c3.6 0 6.2.5 8 2 1.8-1.5 4.4-2 8-2v-13c-3.6 0-6.2.5-8 2zM12 6.5v13" />
  ),
};

interface Props {
  name: LogTopicIconName;
}

/** 연도별 목록의 주제 제목 앞에 붙여, 어떤 기록인지 제목을 읽기 전에 알아보게 합니다. */
export default function LogTopicIcon({ name }: Props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
