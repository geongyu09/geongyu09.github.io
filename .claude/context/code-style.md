## 코드 스타일 & 린팅

### ESLint 설정

- **기반**: Airbnb JavaScript/TypeScript 스타일 가이드
- **프레임워크**: Next.js core-web-vitals
- **포맷팅**: Prettier 통합

**주요 규칙 오버라이드** (`.eslintrc.json`):

```json
{
  "react/react-in-jsx-scope": "off", // Next.js가 React를 자동으로 임포트
  "react/jsx-props-no-spreading": "off" // Props 스프레딩 허용
}
```

### TypeScript 설정

- **Strict 모드**: 활성화 (`strict: true`)
- **모듈 해석**: `bundler` (Next.js 13+ 요구사항)
- **JSX**: `preserve` (Next.js가 처리)

### Git Hooks

Husky + lint-staged가 pre-commit 시 실행:

- 스테이징된 파일에 ESLint 적용
- Prettier 포맷팅
- TypeScript 타입 검사
