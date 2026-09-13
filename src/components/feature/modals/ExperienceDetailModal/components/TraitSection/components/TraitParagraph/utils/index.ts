/** 문단에서 강조할 자리는 `**이렇게**` 감싸 적습니다. */
const EMPHASIS_PATTERN = /\*\*(.+?)\*\*/;

export interface ParagraphSegment {
  id: string;
  text: string;
  /** `**`로 감싸 적어 굵기와 밑줄을 입힐 자리인지 나타냅니다. */
  emphasized: boolean;
}

/**
 * 문단을 강조할 자리와 그대로 둘 자리로 잘라 냅니다.
 * 캡처 그룹이 있는 정규식으로 자르면 감싼 안쪽이 홀수 번째 조각으로 나오므로, 조각 번호로 강조 여부를 가릅니다.
 */
export const splitByEmphasis = (paragraph: string): ParagraphSegment[] =>
  paragraph
    .split(EMPHASIS_PATTERN)
    .map((text, index) => ({
      id: `${index}-${text}`,
      text,
      emphasized: index % 2 === 1,
    }))
    .filter((segment) => segment.text !== '');

export default splitByEmphasis;
