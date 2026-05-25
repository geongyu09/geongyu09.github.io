'use client';

import { useEffect, useState } from 'react';

const GITHUB_USERNAME = 'geongyu09';

interface GitHubActivityGraphProps {
  year: number;
}

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// 캐시 키 생성
function getCacheKey(username: string, year: number) {
  return `github-contributions-${username}-${year}`;
}

// 캐시된 데이터 가져오기
function getCachedContributions(
  username: string,
  year: number,
): Contribution[] | null {
  if (typeof window === 'undefined') return null;

  const cacheKey = getCacheKey(username, year);
  const cached = localStorage.getItem(cacheKey);

  if (!cached) return null;

  try {
    const { data, timestamp } = JSON.parse(cached);
    const ONE_DAY = 24 * 60 * 60 * 1000; // 24시간

    // 24시간이 지났으면 캐시 무효화
    if (Date.now() - timestamp > ONE_DAY) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

// 캐시에 데이터 저장
function setCachedContributions(
  username: string,
  year: number,
  data: Contribution[],
) {
  if (typeof window === 'undefined') return;

  const cacheKey = getCacheKey(username, year);
  const cacheData = {
    data,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // localStorage 용량 초과 등의 에러 무시
  }
}

// GitHub Contributions API (공개 프록시)로 특정 연도 데이터 가져오기
async function fetchYearContributions(
  username: string,
  targetYear: number,
): Promise<Contribution[]> {
  // 캐시 확인
  const cached = getCachedContributions(username, targetYear);
  if (cached) {
    return cached;
  }

  // API 호출
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=${targetYear}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch contributions');
  }

  const data = await response.json();
  const { contributions } = data;

  // 캐시에 저장
  setCachedContributions(username, targetYear, contributions);

  return contributions;
}

// 주별로 그룹화
function groupByWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  let currentWeek: Contribution[] = [];

  contributions.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();

    // 일요일이고 첫 날이 아니면 새 주 시작
    if (dayOfWeek === 0 && index > 0) {
      weeks.push(currentWeek);
      currentWeek = [day];
    } else {
      currentWeek.push(day);
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

// Level에 따른 색상 (editorial · blue accent)
const COLORS = {
  0: '#f4f4f4',
  1: '#d6e1ff',
  2: '#97aeff',
  3: '#4f73ff',
  4: '#2c5eff',
};

export default function GitHubActivityGraph({
  year,
}: GitHubActivityGraphProps) {
  const [contributions, setContributions] = useState<Contribution[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchYearContributions(GITHUB_USERNAME, year)
      .then(setContributions)
      .catch((err) => {
        setError(err.message);
      });
  }, [year]);

  if (error) {
    return (
      <div className="w-full">
        <p className="text-red-500">Failed to load GitHub contributions</p>
      </div>
    );
  }

  if (!contributions) {
    return (
      <div className="w-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const weeks = groupByWeeks(contributions);

  return (
    <div className="w-full">
      <div className="flex gap-1 overflow-x-auto">
        {weeks.map((week) => (
          <div key={week[0].date} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                className="w-[14px] h-[14px] rounded-sm"
                style={{ backgroundColor: COLORS[day.level] }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
