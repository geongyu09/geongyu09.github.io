import { isValidElement, type ReactNode } from 'react';

/**
 * @description 헤딩의 children(문자열, 배열, 엘리먼트)에서 순수 텍스트만 추출합니다.
 * 인라인 코드나 강조가 섞인 헤딩에서도 id를 안전하게 만들기 위해 사용합니다.
 */
function toPlainText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(toPlainText).join('');
  }
  if (isValidElement(node)) {
    return toPlainText((node.props as { children?: ReactNode }).children);
  }
  return '';
}

function getHeaderHashText(header: ReactNode) {
  return encodeURIComponent(
    toPlainText(header).toLowerCase().replace(/\s+/g, '-'),
  );
}

export default Object.freeze({ getHeaderHashText, toPlainText });
