export interface Headers {
  text: string;
  level: 1 | 2 | 3 | number;
}
export function parseMarkdown(markdown: string) {
  const lines = markdown.split('\n');
  const headers: Headers[] = [];
  let isInCodeBlock = false;

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    // 코드 블럭 시작/종료 감지 (``` 또는 ~~~ 지원)
    if (trimmedLine.startsWith('```') || trimmedLine.startsWith('~~~')) {
      isInCodeBlock = !isInCodeBlock;
      return;
    }

    // 코드 블럭 내부가 아닐 때만 헤더 파싱
    if (!isInCodeBlock && line.startsWith('#')) {
      // 정규식으로 헤더 레벨과 텍스트 추출
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        headers.push({ text, level });
      }
    }
  });

  return headers;
}
