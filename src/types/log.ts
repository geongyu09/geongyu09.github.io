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
  | '한 입 크기로 잘라먹는 타입스크립트'
  //
  | 'Object 스터디'
  | 'Object'
  //
  | '함수형 원정대'
  | '쏙쏙 들어오는 함수형 코딩'
  //
  | '도스마스';
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

/** 보여준 모습을 뒷받침하는 활동 한 줄입니다. 그 활동을 적어 둔 글이 있으면 주소를 답니다. */
export interface ExperienceEvidence {
  text: string;
  href?: string; // 회고 글의 해당 문단처럼 그 활동이 적힌 자리로 바로 보냅니다
}

/**
 * 활동에서 보여준 모습 한 갈래입니다.
 * 한 일이나 배운 것처럼 한 줄씩 늘어놓는 대신, 어떤 태도를 가졌는지 문단으로 적고 그 근거가 된 활동을 아래에 답니다.
 */
export interface ExperienceTrait {
  title: string;
  paragraphs: string[]; // 먼저 읽히고 싶은 자리는 `**이렇게**` 감싸 적으면 굵기와 밑줄이 함께 입혀집니다
  evidenceLabel?: string; // 근거 목록 위에 붙일 문구. 적지 않으면 '관련 활동'으로 채웁니다
  evidences: ExperienceEvidence[];
}

/** 레벨별 정리에서 미션 하나가 남긴 주소입니다. 아직 주소를 알지 못하는 제출물은 문구만 적습니다. */
export interface ExperienceMissionLink {
  label: string;
  href?: string; // 적지 않으면 누를 수 없는 표시로만 남습니다
}

/** 미션을 수행하던 기간을 적어 둔 회고 글 주소입니다. 블로그 안의 글이라 '/post/[slug]/' 형태로 적습니다. */
export interface ExperienceReviewLink {
  href: string;
  label: string;
}

/** 레벨 안에서 수행한 미션 하나입니다. 단계마다 남긴 주소와 그 미션에서 겪은 일을 함께 담습니다. */
export interface ExperienceMission {
  title: string;
  links?: ExperienceMissionLink[]; // 단계별 제출 PR과 배포 주소를 적습니다
  reviewLabel?: string; // 회고 글 앞에 붙일 문구. 적지 않으면 '회고 글'로 채웁니다
  reviews?: ExperienceReviewLink[]; // 그 미션을 수행하던 기간의 회고 글. 아직 글이 없는 미션은 비워 둡니다
  paragraphs: string[];
}

/**
 * 교육 과정을 레벨 단위로 끊어 적은 한 덩어리입니다.
 * 레벨에서 무엇을 목표로 삼았는지 문단으로 먼저 적고, 그 아래에 그 레벨에서 수행한 미션을 답니다.
 */
export interface ExperienceLevel {
  label: string; // 'Level 1'처럼 레벨 번호까지 적습니다
  paragraphs: string[];
  missionLabel?: string; // 미션 목록 위에 붙일 문구. 적지 않으면 '미션'으로 채웁니다
  missions?: ExperienceMission[];
}

/** 활동 갈래 안에 문구를 달아 늘어놓는 목록입니다. 한 일과 러닝 포인트처럼 성격이 다른 줄을 한 목록에 섞지 않으려고 묶음마다 문구를 답니다. */
export interface ExperienceSectionList {
  label: string;
  items: string[];
}

/** 갈래와 항목이 남긴 공개된 주소입니다. '/log/project/[id]/' 처럼 블로그 안의 주소를 적으면 같은 창에서 엽니다. */
export interface ExperienceSectionLink {
  href: string;
  label: string;
}

/**
 * 활동 갈래에 들어가는 항목 하나입니다.
 * 프로젝트 하나, 스터디 하나, 발표 하나가 여기에 해당합니다.
 */
export interface ExperienceSectionItem {
  title: string;
  meta?: string; // 제목 옆에 작게 다는 한 줄. 기간이나 발표한 자리처럼 제목만으로는 알기 어려운 것을 적습니다
  paragraphs?: string[];
  lists?: ExperienceSectionList[]; // 한 일과 러닝 포인트처럼 문구를 단 목록
  links?: ExperienceSectionLink[]; // 프로젝트 상세와 발표 자료처럼 그 항목이 남긴 주소
}

/** 갈래 제목 앞에 붙는 아이콘의 종류입니다. 부서 일, 프로젝트, 스터디, 발표, 모집, 기타 활동을 나눕니다. */
export type ExperienceSectionIcon =
  | 'manage'
  | 'project'
  | 'study'
  | 'talk'
  | 'recruit'
  | 'etc';

/**
 * 활동을 갈래로 끊어 적은 한 덩어리입니다.
 * 프로젝트와 부서 활동과 스터디처럼 성격이 다른 일을 한 목록에 몰아 적지 않고, 갈래마다 제목을 달아 나눕니다.
 */
export interface ExperienceSection {
  label: string;
  icon?: ExperienceSectionIcon; // 적지 않으면 제목만 보여 줍니다
  meta?: string; // 갈래 전체를 아우르는 기간처럼 제목 옆에 작게 달 한 줄
  paragraphs?: string[]; // 항목을 늘어놓기 전에 갈래 전체를 두고 적는 문단
  lists?: ExperienceSectionList[];
  items?: ExperienceSectionItem[];
}

/**
 * 프로젝트 하나로 묶기 어려운, 소속 단위의 활동입니다.
 * 눌렀을 때 띄울 상세 모달의 재료라서 보여준 모습과 레벨별 정리, 갈래별 정리, 한 일과 배운 것, 남긴 것을 함께 담습니다.
 */
export interface ActivityItem {
  /** 상세 모달 주소에 들어가는 값입니다. /log/experience/[id] 로 열리므로 영문 소문자와 하이픈으로만 적습니다. */
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD 또는 '현재'
  org: string; // 소속 (동아리, 학교, 교육 과정 등)
  role: string; // 그 안에서 맡은 자리
  roleLabel?: string; // role 줄에 붙일 문구. 맡은 자리가 아닌 교육 과정에는 '구분'처럼 다른 말을 답니다. 적지 않으면 '역할'로 채웁니다
  description: string; // 모달 첫머리에 적는 한두 문장 소개
  thumbnail?: string; // 모달 윗줄 왼쪽에 거는 활동 사진. public 기준 절대 경로로 적습니다
  thumbnailAlt?: string; // 사진을 설명하는 문구. 적지 않으면 소속과 제목으로 대신 채웁니다
  paragraphs?: string[]; // 한 일과 배운 것으로 나누기 어려운 활동은 제목 없는 문단으로만 이어 적습니다
  traits?: ExperienceTrait[]; // 활동에서 보여준 모습. 소주제마다 담는 내용과 형식이 달라서 한 일과 따로 둡니다
  levels?: ExperienceLevel[]; // 레벨로 기간을 끊어 적는 교육 과정만 채웁니다. 레벨별 정리를 적으면 한 일과 배운 것은 비워 둡니다
  sections?: ExperienceSection[]; // 활동을 갈래로 끊어 적습니다. 한 일로 묶기에는 갈래마다 성격이 다른 활동만 채웁니다
  activities?: string[]; // 그 기간에 한 일
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

/** 상세 문단 하나에 짝지어 거는 코드 조각입니다. 글에 실린 코드를 읽을 만한 길이로 줄여 적습니다. */
export interface ProjectDetailCode {
  code: string;
  lang: string; // shiki가 아는 언어 이름
  caption?: string; // 코드 위에 붙이는 짧은 설명
}

/** 상세 문단 하나에 다는 주소입니다. 그 문단에서 말한 코드가 놓인 레포의 파일처럼 바로 열어 볼 곳을 적습니다. */
export interface ProjectDetailLink {
  href: string;
  label: string;
}

/**
 * 모달 오른쪽에 박스 하나로 놓이는 상세 문단입니다. 이미지도 코드도 걸지 않을 문단은 문자열로만 적습니다.
 * 박스를 누르면 href가 있을 때는 그 주소로 이동하고, 없을 때는 모달 안에서 이 문단의 내용으로 바뀝니다.
 */
export interface ProjectDetailBlock {
  tag?: string; // 박스 위에 작게 적는 갈래. '문제 정의', '고민', '기여'처럼 적고, 비우면 순번을 적습니다
  title?: string; // 박스에 크게 적는 이름. 비우면 본문 앞부분이 대신 보입니다
  href?: string; // 모달 안에서 펼치지 않고 바로 이동할 주소. 내 글의 한 단락이라면 '/post/글-주소/#제목-id'처럼 적습니다
  text: string;
  image?: ProjectDetailImage;
  code?: ProjectDetailCode;
  links?: ProjectDetailLink[]; // 그 문단을 읽다가 바로 열어 볼 레포 파일과 문서 주소
}

/** 코드를 미리 색칠해 둔 채로 화면에 넘기는 상세 문단입니다. 색칠은 빌드 때 서버에서 끝냅니다. */
export interface ProjectDetailStep extends Omit<ProjectDetailBlock, 'code'> {
  code?: {
    html: string;
    caption?: string;
  };
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
  quote?: string; // 모달 소개 칸 맨 위에 기울여 적는 문제 정의 한 줄
  intro?: string[]; // 모달 소개 칸에 description 대신 한 줄씩 적는 문단. 목록에는 계속 description이 보입니다
  details: ProjectDetail[]; // 모달 오른쪽에 박스로 늘어놓는 상세 내용. 문단마다 이미지를 하나씩 걸 수 있습니다
  thumbnail?: string; // 모달 왼쪽 열에 거는 대표 이미지. public 기준 절대 경로로 적습니다
  preview?: string; // 그림이 없을 때 모달 왼쪽 열에 iframe으로 띄워 둘 페이지 주소. 보기만 하고 조작은 막습니다
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
