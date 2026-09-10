import EXPERIENCE_DATA from '@/constants/log/experienceData';
import PRESENTATION_DATA from '@/constants/log/presentationData';
import PROJECT_DATA from '@/constants/log/projectData';
import STUDY_DATA from '@/constants/log/studyData';
import {
  formatPresentationDate,
  formatYearMonth,
} from '@/lib/log/formatLogDate';
import { LogEntry } from '@/types/log';

const formatDay = (date: string) => date.replace(/-/g, '.');

/** 한 달 안에서 끝난 기간은 한 번만 적습니다. */
const formatSpan = (startDate: string, endDate: string) => {
  const start = formatYearMonth(startDate);
  const end = formatYearMonth(endDate);

  return start === end ? start : `${start} ~ ${end}`;
};

/** 네 갈래 기록을 한 목록으로 합쳐 최신순으로 돌려줍니다. */
const getAllLogEntries = (): LogEntry[] => {
  const experiences: LogEntry[] = EXPERIENCE_DATA.map((experience) => ({
    type: 'experience',
    title: experience.title,
    date: experience.startDate,
    displayDate: formatSpan(experience.startDate, experience.endDate),
    meta: experience.org,
    experience,
  }));

  const projects: LogEntry[] = PROJECT_DATA.map((project) => ({
    type: 'project',
    title: project.title,
    date: project.startDate,
    displayDate: formatSpan(project.startDate, project.endDate),
    meta: project.category,
    project,
  }));

  const presentations: LogEntry[] = PRESENTATION_DATA.map((presentation) => ({
    type: 'presentation',
    title: presentation.title,
    date: presentation.date,
    displayDate: formatPresentationDate(
      presentation.date,
      presentation.displayDate,
    ),
    meta: presentation.place,
    href: presentation.href,
    presentation,
  }));

  const studies: LogEntry[] = STUDY_DATA.map((study) => ({
    type: 'study',
    title: study.title,
    date: study.date,
    displayDate: formatDay(study.date),
    meta: study.tags?.[0],
    href: study.href,
  }));

  return [...experiences, ...projects, ...presentations, ...studies].sort(
    (a, b) => b.date.localeCompare(a.date),
  );
};

export default getAllLogEntries;
