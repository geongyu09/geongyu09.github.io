type LogTag =
  | '자아스스터디'
  | 'CS 스터디'
  //
  | '후니의 쉽게 쓴 CISCO 네트워킹'
  | '코어자바스크립트'
  //
  | 'HTTP 완벽 가이드'
  | '운영체제 아주 쉬운 세 가지 이야기'
  //
  | '모던 자바스크립트 스터디'
  | '모던 JavaScript 튜토리얼'
  //
  | '타입스크립트 스터디'
  | '한 입 크기로 잘라먹는 타입스크립트';
export interface LogListItem {
  title: string;
  date: string; // YYYY-MM-DD 형식
  href?: string;
  tags?: LogTag[]; // 태그는 스터디의 경우에만 답니다. 태그 순서 : 스터디명 > 책 제목
}

export interface ActivityItem {
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD 또는 '현재'
}

export interface PresentationItem {
  title: string;
  date: string; // 연도 구분과 정렬에 쓰는 기준일. YYYY-MM-DD 형식
  displayDate?: string; // 날짜를 반기 단위로만 아는 경우의 표기. 연도는 섹션 제목이 말해주므로 '상반기'처럼 연도 없이 적습니다
  href?: string;
  place?: string; // 발표한 자리 (행사명, 스터디명 등)
}

export type ProjectCategory =
  // Project 섹션
  | '팀 프로젝트'
  | '개인 프로젝트'
  | '인턴 · 학교'
  // Library 섹션
  | 'npm 패키지'
  | '개발 도구'
  // Contribution 섹션
  | '오픈소스 기여';

export interface ProjectItem {
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD 또는 '현재'
  category: ProjectCategory;
  role: string; // 소속과 맡은 역할
  description: string; // 목록에 적는 한두 문장 소개
  details: string[]; // 모달에서 펼쳐 보여 주는 상세 내용
  href?: string; // 공개된 레포나 서비스 주소만 답니다
}

export type LogEntryType = 'experience' | 'project' | 'presentation' | 'study';

/** 연도 구분 없이 한 줄씩 이어 보는 모아보기 목록의 항목입니다. */
export interface LogEntry {
  type: LogEntryType;
  title: string;
  date: string; // 정렬 기준일. 기간이 있는 항목은 시작일입니다. YYYY-MM-DD 형식
  displayDate: string; // 화면에 적는 날짜. 기간이 있는 항목은 '2026.08 ~ 현재'처럼 적습니다
  meta?: string; // 프로젝트는 카테고리, 발표는 발표한 자리, 스터디는 스터디명을 답니다
  href?: string;
  project?: ProjectItem; // 프로젝트 항목만 채웁니다. 눌렀을 때 띄울 상세 모달의 재료입니다
}

/** 총 정리 패널에서 한 갈래를 요약한 줄입니다. */
export interface LogSummaryGroup {
  label: string;
  count: number;
  detail: string; // 세부 내역. '팀 프로젝트 3 · 개인 프로젝트 6'처럼 적습니다
}

export interface LogYearCount {
  year: number;
  count: number;
}

export interface LogSummary {
  firstRecordDate: string; // YYYY.MM
  latestRecordDate: string; // YYYY.MM
  yearSpan: number; // 기록한 해의 수
  total: number;
  groups: LogSummaryGroup[];
  yearCounts: LogYearCount[]; // 최신 연도부터
}
