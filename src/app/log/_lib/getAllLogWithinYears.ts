import EXPERIENCE_DATA from '@/constants/log/experienceData';
import STUDY_DATA from '@/constants/log/studyData';
import {
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
  const experiencesByYear = groupActivitiesByYear(EXPERIENCE_DATA);

  // Get all unique years from both sources
  const allYears = Array.from(
    new Set([
      ...postsByYear.map((g) => g.year),
      ...studiesByYear.map((g) => g.year),
      ...experiencesByYear.map((g) => g.year),
      ...YEARS_WITH_GITHUB_GRAPH,
    ]),
  ).sort((a, b) => b - a);

  return {
    allYears,
    postsByYear,
    studiesByYear,
    experiencesByYear,
    YEARS_WITH_GITHUB_GRAPH,
  };
};

export default getAllLogWithinYears;
