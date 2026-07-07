# CLAUDE.md

## 프로젝트 개요

Next.js로 제작된 개인 기술 블로그로, GitHub Pages에 정적 사이트로 배포됩니다.
`_posts/` 디렉토리의 마크다운 파일로 블로그 글을 관리하는 파일 시스템 기반 CMS를 사용합니다.

## 주요 명령어

```bash
# 개발
bun dev                                        # 개발 서버 시작 (http://localhost:3000)

# 빌드
bun run build                                  # 개발 빌드
NEXT_PUBLIC_ENVIRONMENT=PRODUCTION bun run build # 프로덕션 빌드 (SSG 모드)

# 린팅
bun run lint                                   # ESLint 실행

# 배포
bun run deploy                                 # 빌드 후 GitHub Pages 배포
```

**중요**: 이 프로젝트는 패키지 매니저로 **bun 1.1.27**을 사용합니다. npm, yarn, pnpm은 사용하지 마세요.

## 아키텍처 개요

`./.claude/context/architecture.md`

## 코드 스타일 & 린팅

`./.claude/context/code-style.md`

## GitHub Pages 배포

`./.claude/context/deploy.md`

## 브랜치 전략

- **메인 브랜치**: `main` (프로덕션)
- **개발 브랜치**: `dev` (통합 브랜치, main 전에 여기에 머지)
- **배포 브랜치**: `gh-pages` (자동 생성, 직접 수정 금지)

## 주요 의존성

- **Next.js 16.2.9**: 프레임워크 (App Router, Turbopack)
- **React 19**: UI 라이브러리
- **TypeScript 5**: 타입 시스템
- **Tailwind CSS 3.4.1**: 스타일링
- **react-markdown + remark-gfm**: 커스텀 컴포넌트를 포함한 마크다운 렌더링
- **gray-matter**: front-matter 파싱
- **@ssgoi/react**: `<main>`을 감싸는 페이지 전환 애니메이션
- **@giscus/react**: GitHub Discussions 기반 댓글
- **react-github-calendar**: GitHub 기여 캘린더
- **react-icons**: 아이콘 컴포넌트
- **clsx + tailwind-merge**: 클래스명 병합 유틸리티 (`src/utils/cn.ts`)

---
