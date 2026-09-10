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

/** 활동이 남긴 공개된 주소입니다. 무엇으로 이어지는 주소인지 문구에 적습니다. */
export interface ActivityLink {
  href: string;
  label: string;
}

/**
 * 프로젝트 하나로 묶기 어려운, 소속 단위의 활동입니다.
 * 눌렀을 때 띄울 상세 모달의 재료라서 한 일과 배운 것, 남긴 것을 함께 담습니다.
 */
export interface ActivityItem {
  /** 상세 모달 주소에 들어가는 값입니다. /log/experience/[id] 로 열리므로 영문 소문자와 하이픈으로만 적습니다. */
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD 또는 '현재'
  org: string; // 소속 (동아리, 학교, 교육 과정 등)
  role: string; // 그 안에서 맡은 자리
  description: string; // 모달 첫머리에 적는 한두 문장 소개
  thumbnail?: string; // 모달 윗줄 왼쪽에 거는 활동 사진. public 기준 절대 경로로 적습니다
  thumbnailAlt?: string; // 사진을 설명하는 문구. 적지 않으면 소속과 제목으로 대신 채웁니다
  activities: string[]; // 그 기간에 한 일
  learnings?: string[]; // 하면서 알게 된 것
  outcomes?: string[]; // 활동이 남긴 것. 발표와 스터디, 이어진 프로젝트를 적습니다
  links?: ActivityLink[]; // 회고 글과 발표 영상처럼 공개된 주소만 답니다
}

export interface PresentationItem {
  /** 발표 자료 모달 주소에 들어가는 값입니다. /log/presentation/[id] 로 열리므로 영문 소문자와 하이픈으로만 적습니다. */
  id: string;
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

/** 프로젝트가 걸 수 있는 바깥 주소의 종류입니다. 종류에 따라 모달의 아이콘과 기본 문구가 정해집니다. */
export type ProjectLinkType = 'repo' | 'npm' | 'site' | 'docs';

export interface ProjectLink {
  type: ProjectLinkType;
  href: string;
  label?: string; // 종류별 기본 문구 대신 적고 싶을 때만 씁니다
}

/** 상세 문단 하나에 짝지어 거는 이미지입니다. public 기준 절대 경로로 적습니다. */
export interface ProjectDetailImage {
  src: string;
  alt: string;
  caption?: string; // 이미지 아래에 붙이는 짧은 설명
}

/** 모달에서 펼쳐 보여 주는 상세 문단입니다. 이미지를 걸지 않을 문단은 문자열로만 적습니다. */
export interface ProjectDetailBlock {
  text: string;
  image?: ProjectDetailImage;
}

export type ProjectDetail = string | ProjectDetailBlock;

export interface ProjectItem {
  /** 상세 모달 주소에 들어가는 값입니다. /log/project/[id] 로 열리므로 영문 소문자와 하이픈으로만 적습니다. */
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD 또는 '현재'
  category: ProjectCategory;
  org: string; // 소속 (동아리, 학교, 회사, 개인 등)
  role: string; // 그 안에서 맡은 역할
  description: string; // 목록에 적는 한두 문장 소개
  details: ProjectDetail[]; // 모달에서 펼쳐 보여 주는 상세 내용. 문단마다 이미지를 하나씩 걸 수 있습니다
  thumbnail?: string; // 모달 왼쪽 열에 거는 대표 이미지. public 기준 절대 경로로 적습니다
  links?: ProjectLink[]; // 레포와 npm, 배포 주소처럼 공개된 주소만 답니다
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
  presentation?: PresentationItem; // 발표 항목만 채웁니다. 눌렀을 때 띄울 발표 자료 모달의 재료입니다
  experience?: ActivityItem; // 활동 항목만 채웁니다. 눌렀을 때 띄울 상세 모달의 재료입니다
}

/** 총 정리 패널에서 한 갈래를 요약한 줄입니다. */
export interface LogSummaryGroup {
  label: string;
  count: number;
  detail: string; // 세부 내역. '팀 프로젝트 3 · 개인 프로젝트 6'처럼 적습니다
}

export interface LogSummary {
  firstRecordDate: string; // YYYY.MM
  latestRecordDate: string; // YYYY.MM
  yearSpan: number; // 기록한 해의 수
  total: number;
  groups: LogSummaryGroup[];
}
