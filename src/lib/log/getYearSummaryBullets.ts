import { ActivityItem, LogListItem } from '@/types/log';
import { Post } from '@/types/post';

export default function getYearSummaryBullets(
  yearPosts: Post[],
  yearStudies: LogListItem[],
  yearExperiences: ActivityItem[],
): string[] {
  const bullets: string[] = [];

  yearExperiences.forEach((exp) => bullets.push(exp.title));

  if (yearPosts.length > 0) {
    bullets.push(`포스트 ${yearPosts.length}편`);
  }

  const studyGroups = Array.from(
    new Set(
      yearStudies
        .map((s) => s.tags?.[0])
        .filter((tag): tag is NonNullable<typeof tag> => tag !== undefined),
    ),
  );
  studyGroups.forEach((group) => bullets.push(group));

  return bullets;
}
