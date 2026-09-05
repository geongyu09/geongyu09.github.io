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

/**
 * Groups items spanning a period by the year they started
 * @param items - Array of items with startDate and endDate ('현재' means ongoing)
 * @returns Array of YearGroup objects sorted by year descending
 */
export function groupActivitiesByYear<
  T extends { title: string; startDate: string; endDate: string },
>(items: T[]): YearGroup<T>[] {
  const grouped = items.reduce(
    (acc, item) => {
      const startYear = new Date(item.startDate).getFullYear();

      if (!acc[startYear]) {
        acc[startYear] = [];
      }
      acc[startYear].push(item);

      return acc;
    },
    {} as Record<number, T[]>,
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
