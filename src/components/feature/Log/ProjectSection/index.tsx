'use client';

import Eyebrow from '@/components/ds/Eyebrow';
import ProjectDetailModal from '@/components/feature/modals/ProjectDetailModal';
import { formatRangeInYear } from '@/lib/log/formatLogDate';
import { useModal } from '@/lib/modal';
import { ProjectItem } from '@/types/log';
import cn from '@/utils/cn';
import { FiPlus } from 'react-icons/fi';

interface Props {
  /** 목록 위에 붙는 제목. Project, Library · Tool, Contribution을 나눠 씁니다. */
  label: string;
  projects: ProjectItem[];
  /** 이 목록이 놓인 연도 섹션. 날짜에서 같은 연도를 빼는 데 씁니다. */
  year: number;
}

export default function ProjectSection({ label, projects, year }: Props) {
  const { pushModal } = useModal();

  return (
    <div>
      <Eyebrow className="mb-s-3 text-[13px] text-ink-900">{label}</Eyebrow>
      <ul className="flex flex-col">
        {projects.map((project, i) => (
          <li
            key={`${project.title}-${project.startDate}`}
            className={cn(i > 0 && 'border-t border-ink-200')}
          >
            <button
              type="button"
              aria-label={`${project.title} 상세 보기`}
              onClick={() =>
                pushModal({ modal: <ProjectDetailModal project={project} /> })
              }
              className="group block w-full py-s-3 text-left transition-opacity hover:opacity-70"
            >
              <div className="flex flex-col gap-s-2 sm:flex-row sm:justify-between sm:items-baseline sm:gap-s-4">
                <p className="m-0 text-[16px] text-ink-950 font-medium">
                  {project.title}
                  <FiPlus
                    className="inline-block ml-[3px] align-[-1px] text-ink-400 transition-transform group-hover:rotate-90"
                    size={13}
                  />
                </p>
                <span className="font-mono text-[13px] text-ink-500 shrink-0">
                  {formatRangeInYear(project.startDate, project.endDate, year)}
                </span>
              </div>
              <p className="m-0 mt-s-1 font-mono text-[12px] text-ink-500">
                {project.org} · {project.role}
              </p>
              <p className="m-0 mt-s-2 text-[15px] leading-[1.7] text-ink-700">
                {project.description}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
