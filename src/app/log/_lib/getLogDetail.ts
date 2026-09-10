import EXPERIENCE_DATA from '@/constants/log/experienceData';
import PRESENTATION_DATA from '@/constants/log/presentationData';
import PROJECT_DATA from '@/constants/log/projectData';

/**
 * 병렬 경로로 띄우는 상세 모달이 주소의 id로 항목을 찾을 때 씁니다.
 * 정적 내보내기라 만들 주소를 미리 알아야 해서 목록도 함께 내보냅니다.
 */
export const getProjectById = (id: string) =>
  PROJECT_DATA.find((project) => project.id === id);

export const getExperienceById = (id: string) =>
  EXPERIENCE_DATA.find((experience) => experience.id === id);

/** 발표는 자료 주소가 있는 항목만 모달을 엽니다. */
export const getPresentationById = (id: string) =>
  PRESENTATION_DATA.find(
    (presentation) => presentation.id === id && Boolean(presentation.href),
  );

export const getProjectDetailParams = () =>
  PROJECT_DATA.map(({ id }) => ({ id }));

export const getExperienceDetailParams = () =>
  EXPERIENCE_DATA.map(({ id }) => ({ id }));

export const getPresentationDetailParams = () =>
  PRESENTATION_DATA.filter(({ href }) => Boolean(href)).map(({ id }) => ({
    id,
  }));
