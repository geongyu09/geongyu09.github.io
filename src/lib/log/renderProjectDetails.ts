import { ProjectDetail, ProjectDetailStep } from '@/types/log';
import { codeToHtml } from 'shiki';

/** 글 본문과 같은 테마를 써서 모달에 붙인 코드도 같은 색으로 보이게 합니다. */
const SHIKI_THEMES = { light: 'min-light', dark: 'min-dark' } as const;

/**
 * 데이터 파일 안에서 들여쓴 만큼이 코드에 그대로 남지 않도록 공통 여백을 걷어냅니다.
 * 앞뒤로 남는 빈 줄도 함께 지워 첫 줄부터 바로 코드가 보이게 합니다.
 */
const dedent = (code: string) => {
  const lines = code.replace(/^\n+/, '').trimEnd().split('\n');
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.length - line.trimStart().length);
  const shortest = indents.length > 0 ? Math.min(...indents) : 0;

  return lines.map((line) => line.slice(shortest)).join('\n');
};

/**
 * 데이터에 적어 둔 상세 문단을 화면이 다루기 좋은 형태로 맞춥니다.
 * 이미지도 코드도 없는 문단은 문자열로만 적어 두므로 여기에서 형태를 맞추고,
 * 코드를 걸어 둔 문단은 정적 내보내기 시점에 미리 색칠해 마크업으로 넘깁니다.
 */
export default async function renderProjectDetails(
  details: ProjectDetail[],
): Promise<ProjectDetailStep[]> {
  return Promise.all(
    details.map(async (detail): Promise<ProjectDetailStep> => {
      if (typeof detail === 'string') return { text: detail };

      const { code, ...rest } = detail;
      if (!code) return rest;

      const html = await codeToHtml(dedent(code.code), {
        lang: code.lang,
        themes: SHIKI_THEMES,
        defaultColor: false,
      });

      return { ...rest, code: { html, caption: code.caption } };
    }),
  );
}
