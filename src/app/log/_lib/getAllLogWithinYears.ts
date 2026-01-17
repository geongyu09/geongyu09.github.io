import STUDY_DATA from '@/constants/log/studyData';
import { groupByYear, groupStudiesByYear } from '@/lib/log/groupByYear';
import { getAllPosts } from '@/lib/post/post';

const YEARS_WITH_GITHUB_GRAPH = [2024, 2025];

const getAllLogWithinYears = () => {
  const allPosts = getAllPosts();
  const postsByYear = groupByYear(allPosts);
  const studiesByYear = groupStudiesByYear(STUDY_DATA);

  // Get all unique years from both sources
  const allYears = Array.from(
    new Set([
      ...postsByYear.map((g) => g.year),
      ...studiesByYear.map((g) => g.year),
      ...YEARS_WITH_GITHUB_GRAPH,
    ]),
  ).sort((a, b) => b - a);

  return { allYears, postsByYear, studiesByYear, YEARS_WITH_GITHUB_GRAPH };
};

export default getAllLogWithinYears;
