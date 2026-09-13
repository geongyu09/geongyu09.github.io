import EXPERIENCE_DATA from '@/constants/log/experienceData';
import PRESENTATION_DATA from '@/constants/log/presentationData';
import PROJECT_DATA from '@/constants/log/projectData';
import STUDY_DATA from '@/constants/log/studyData';
import {
  groupActivitiesBySpannedYears,
  groupActivitiesByYear,
  groupByYear,
  groupStudiesByYear,
} from '@/lib/log/groupByYear';
import { getAllPosts } from '@/lib/post/post';

const START_YEAR = 2023;
const currentYear = new Date().getFullYear();
const YEARS_WITH_GITHUB_GRAPH = Array.from(
  { length: currentYear - START_YEAR + 1 },
  (_, i) => START_YEAR + i,
);

const getAllLogWithinYears = () => {
  const allPosts = getAllPosts();
  const postsByYear = groupByYear(allPosts);
  const studiesByYear = groupStudiesByYear(STUDY_DATA);
  // 여러 해에 걸친 활동은 시작 연도뿐 아니라 지나온 모든 연도 섹션에 함께 적습니다
  const experiencesByYear = groupActivitiesBySpannedYears(EXPERIENCE_DATA);
  const projectsByYear = groupActivitiesByYear(PROJECT_DATA);
  const presentationsByYear = groupStudiesByYear(PRESENTATION_DATA);

  // Get all unique years from both sources
  const allYears = Array.from(
    new Set([
      ...postsByYear.map((g) => g.year),
      ...studiesByYear.map((g) => g.year),
      ...experiencesByYear.map((g) => g.year),
      ...projectsByYear.map((g) => g.year),
      ...presentationsByYear.map((g) => g.year),
      ...YEARS_WITH_GITHUB_GRAPH,
    ]),
  ).sort((a, b) => b - a);

  return {
    allYears,
    postsByYear,
    studiesByYear,
    experiencesByYear,
    projectsByYear,
    presentationsByYear,
    YEARS_WITH_GITHUB_GRAPH,
  };
};

export default getAllLogWithinYears;
