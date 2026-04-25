import { ActivityItem } from '@/types/log';
import { Post } from '@/types/post';

export interface YearGroup<T> {
  year: number;
  items: T[];
}

/**
 * Groups items by year based on timeStamps field
 * @param items - Array of Post items with timeStamps in data property
 * @returns Array of YearGroup objects sorted by year descending
 */
export function groupByYear(items: Post[]): YearGroup<Post>[] {
  const grouped = items.reduce(
    (acc, item) => {
      const timestamp =
        item.data.timeStamps > 10000000000
          ? item.data.timeStamps
          : item.data.timeStamps * 1000;
      const year = new Date(timestamp).getFullYear();

      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);

      return acc;
    },
    {} as Record<number, Post[]>,
  );

  return Object.entries(grouped)
    .map(([year, yearItems]) => ({
      year: parseInt(year, 10),
      items: yearItems.sort(
        (a, b) =>
          new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
      ),
    }))
    .sort((a, b) => b.year - a.year);
}

/**
 * Groups study/manual items by year based on date field
 * @param items - Array of items with date property (YYYY-MM-DD format)
 * @returns Array of YearGroup objects sorted by year descending
 */
export function groupStudiesByYear<T extends { date: string }>(
  items: T[],
): YearGroup<T>[] {
  const grouped = items.reduce(
    (acc, item) => {
      const year = new Date(item.date).getFullYear();

      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);

      return acc;
    },
    {} as Record<number, T[]>,
  );

  return Object.entries(grouped)
    .map(([year, yearItems]) => ({
      year: parseInt(year, 10),
      items: yearItems.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    }))
    .sort((a, b) => b.year - a.year);
}

export function groupActivitiesByYear(
  items: ActivityItem[],
): YearGroup<ActivityItem>[] {
  const currentYear = new Date().getFullYear();
  const grouped = items.reduce(
    (acc, item) => {
      const startYear = new Date(item.startDate).getFullYear();
      const endYear =
        item.endDate === '현재'
          ? currentYear
          : new Date(item.endDate).getFullYear();

      for (let year = startYear; year <= endYear; year += 1) {
        if (!acc[year]) {
          acc[year] = [];
        }
        if (!acc[year].some((a) => a.title === item.title)) {
          acc[year].push(item);
        }
      }

      return acc;
    },
    {} as Record<number, ActivityItem[]>,
  );

  return Object.entries(grouped)
    .map(([year, yearItems]) => ({
      year: parseInt(year, 10),
      items: yearItems.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
      ),
    }))
    .sort((a, b) => b.year - a.year);
}
