## GitHub Pages 배포

`bun run deploy` 명령어:

1. `NEXT_PUBLIC_ENVIRONMENT=PRODUCTION` 설정
2. `output: 'export'`로 빌드
3. `out/.nojekyll` 파일 생성 (`_next` 디렉토리 허용)
4. `gh-pages` CLI로 `out/`을 `gh-pages` 브랜치에 배포

**필수 요구사항**:

- `next.config.mjs`에 `trailingSlash: true` (GitHub Pages 라우팅)
- `images: { unoptimized: true }` (서버 사이드 최적화 없음)
- 출력 디렉토리에 `.nojekyll` 파일
