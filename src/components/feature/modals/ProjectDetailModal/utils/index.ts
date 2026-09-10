import { ProjectDetail, ProjectDetailBlock } from '@/types/log';

/** 이미지를 걸지 않은 문단은 문자열로 적어 두므로, 화면에서 다루기 좋게 형태를 맞춥니다. */
export const normalizeProjectDetails = (
  details: ProjectDetail[],
): ProjectDetailBlock[] =>
  details.map((detail) =>
    typeof detail === 'string' ? { text: detail } : detail,
  );

/** 상세 문단 순번처럼 두 자리로 맞춰 적어야 하는 숫자에 씁니다. */
export const padOrder = (order: number) => order.toString().padStart(2, '0');
