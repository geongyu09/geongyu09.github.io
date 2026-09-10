const ONGOING = '현재';

/** YYYY-MM-DD를 YYYY.MM으로 줄입니다. 진행 중인 항목의 '현재'는 그대로 둡니다. */
export const formatYearMonth = (date: string) => {
  if (date === ONGOING) return ONGOING;
  return date.slice(0, 7).replace('-', '.');
};

const parseDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return { year, month, day };
};

/**
 * 연도 섹션 안에서 쓰는 월 표기입니다.
 * 섹션과 같은 해라면 섹션 제목이 이미 연도를 말하고 있으므로 '8월'까지만 적고,
 * 다른 해로 넘어갈 때만 '2026년 1월'처럼 연도를 붙입니다.
 */
export const formatMonthInYear = (date: string, sectionYear: number) => {
  if (date === ONGOING) return ONGOING;

  const { year, month } = parseDate(date);
  return year === sectionYear ? `${month}월` : `${year}년 ${month}월`;
};

/** 연도 섹션 안에서 쓰는 기간 표기입니다. 한 달 안에서 끝난 기간은 한 번만 적습니다. */
export const formatRangeInYear = (
  startDate: string,
  endDate: string,
  sectionYear: number,
) => {
  const start = formatMonthInYear(startDate, sectionYear);
  const end = formatMonthInYear(endDate, sectionYear);

  return start === end ? start : `${start} ~ ${end}`;
};

/** 연도 섹션 안에서 쓰는 하루짜리 날짜 표기입니다. */
export const formatDateInYear = (date: string, sectionYear: number) => {
  const { year, month, day } = parseDate(date);
  return year === sectionYear
    ? `${month}월 ${day}일`
    : `${year}년 ${month}월 ${day}일`;
};

/**
 * 연도 구분이 없는 자리에서 쓰는 발표 날짜 표기입니다.
 * 날짜를 반기 단위로만 아는 발표는 연도를 앞에 붙여 '2025 상반기'로 적습니다.
 */
export const formatPresentationDate = (date: string, displayDate?: string) =>
  displayDate ? `${date.slice(0, 4)} ${displayDate}` : date.replace(/-/g, '.');
