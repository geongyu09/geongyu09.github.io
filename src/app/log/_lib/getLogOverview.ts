import EXPERIENCE_DATA from '@/constants/log/experienceData';
import PRESENTATION_DATA from '@/constants/log/presentationData';
import PROJECT_DATA from '@/constants/log/projectData';
import STUDY_DATA from '@/constants/log/studyData';
import {
  ProjectSectionKey,
  getProjectSectionKey,
} from '@/lib/log/projectSection';

const START_YEAR = 2023;
const currentYear = new Date().getFullYear();

const getLatestRecordDate = () =>
  [
    ...STUDY_DATA.map((study) => study.date),
    ...PRESENTATION_DATA.map((presentation) => presentation.date),
    ...EXPERIENCE_DATA.map((experience) => experience.startDate),
    ...PROJECT_DATA.map((project) => project.startDate),
  ].reduce((latest, date) => (date > latest ? date : latest), '');

const UNTAGGED_STUDY_NAME = '기타';

/** 스터디 태그의 첫 번째 값이 스터디 이름입니다. */
const getStudyGroups = () => {
  const countByName = STUDY_DATA.reduce((acc, study) => {
    const name = study.tags?.[0] ?? UNTAGGED_STUDY_NAME;

    acc.set(name, (acc.get(name) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

  return Array.from(countByName, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count,
  );
};

const countProjectsIn = (section: ProjectSectionKey) =>
  PROJECT_DATA.filter((project) => getProjectSectionKey(project) === section)
    .length;

const getLogOverview = () => {
  const studyGroups = getStudyGroups();
  const presentationPlaces = Array.from(
    new Set(
      PRESENTATION_DATA.map((presentation) => presentation.place).filter(
        (place): place is string => Boolean(place),
      ),
    ),
  );

  return {
    startYear: START_YEAR,
    latestRecordDate: getLatestRecordDate(),
    totals: [
      { label: '활동', value: EXPERIENCE_DATA.length },
      { label: '프로젝트', value: countProjectsIn('project') },
      { label: '라이브러리', value: countProjectsIn('library') },
      { label: '기여', value: countProjectsIn('contribution') },
      { label: '발표', value: PRESENTATION_DATA.length },
      { label: '스터디 기록', value: STUDY_DATA.length },
      { label: '기록한 해', value: currentYear - START_YEAR + 1 },
    ],
    experienceTitles: EXPERIENCE_DATA.map((experience) => experience.title),
    presentationPlaces,
    studyGroups,
  };
};

export default getLogOverview;
