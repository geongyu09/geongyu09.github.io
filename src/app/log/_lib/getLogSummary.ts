import EXPERIENCE_DATA from '@/constants/log/experienceData';
import PRESENTATION_DATA from '@/constants/log/presentationData';
import PROJECT_DATA from '@/constants/log/projectData';
import { formatYearMonth } from '@/lib/log/formatLogDate';
import { LogEntry, LogSummary } from '@/types/log';
import getAllLogEntries from './getAllLogEntries';
import getLogOverview from './getLogOverview';

const getYear = (date: string) => Number(date.slice(0, 4));

/** 카테고리별 프로젝트 수를 많은 순으로 적습니다. */
const getProjectDetail = () => {
  const countByCategory = PROJECT_DATA.reduce((acc, project) => {
    acc.set(project.category, (acc.get(project.category) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

  return Array.from(countByCategory)
    .sort(([, a], [, b]) => b - a)
    .map(([category, count]) => `${category} ${count}`)
    .join(' · ');
};

/** 기록이 하나라도 있는 해가 몇 개인지 셉니다. */
const getYearSpan = (entries: LogEntry[]) =>
  new Set(entries.map(({ date }) => getYear(date))).size;

/** 히어로 아래 총 정리 패널이 쓰는 값을 한 번에 만듭니다. */
const getLogSummary = (): LogSummary => {
  const entries = getAllLogEntries();
  const { presentationPlaces, studyGroups, experienceTitles } =
    getLogOverview();
  const firstRecord = entries[entries.length - 1].date;
  const latestRecord = entries[0].date;

  return {
    firstRecordDate: formatYearMonth(firstRecord),
    latestRecordDate: formatYearMonth(latestRecord),
    yearSpan: getYearSpan(entries),
    total: entries.length,
    groups: [
      {
        label: '프로젝트',
        count: PROJECT_DATA.length,
        detail: getProjectDetail(),
      },
      {
        label: '발표',
        count: PRESENTATION_DATA.length,
        detail: presentationPlaces.join(' · '),
      },
      {
        label: '활동',
        count: EXPERIENCE_DATA.length,
        detail: experienceTitles.join(' · '),
      },
      {
        label: '스터디',
        count: studyGroups.reduce((sum, { count }) => sum + count, 0),
        detail: studyGroups
          .map(({ name, count }) => `${name} ${count}`)
          .join(' · '),
      },
    ],
  };
};

export default getLogSummary;
