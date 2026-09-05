import { ProjectCategory, ProjectItem } from '@/types/log';

export const PROJECT_SECTIONS = [
  { key: 'project', label: 'Project' },
  { key: 'library', label: 'Library · Tool' },
  { key: 'contribution', label: 'Contribution' },
] as const;

export type ProjectSectionKey = (typeof PROJECT_SECTIONS)[number]['key'];

/** 카테고리를 하나 늘리면 여기에도 소속 섹션을 적어야 타입 검사를 통과합니다. */
const SECTION_BY_CATEGORY: Record<ProjectCategory, ProjectSectionKey> = {
  '팀 프로젝트': 'project',
  '개인 프로젝트': 'project',
  '인턴 · 학교': 'project',
  'npm 패키지': 'library',
  '개발 도구': 'library',
  '오픈소스 기여': 'contribution',
};

export const getProjectSectionKey = (project: ProjectItem) =>
  SECTION_BY_CATEGORY[project.category];

/** 프로젝트 목록을 섹션 순서대로 갈라 줍니다. 비어 있는 섹션은 빼고 돌려줍니다. */
export const splitProjectsBySection = (projects: ProjectItem[]) =>
  PROJECT_SECTIONS.map(({ key, label }) => ({
    key,
    label,
    items: projects.filter((project) => getProjectSectionKey(project) === key),
  })).filter(({ items }) => items.length > 0);
