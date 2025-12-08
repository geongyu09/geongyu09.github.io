# CLAUDE.md

이 문서는 Claude Code가 geongyu09-blog 프로젝트를 작업할 때 참고하는 가이드입니다.

## 📌 프로젝트 개요

**geongyu09-blog**는 개발자 박건규의 개인 기술 블로그입니다.

- **목적**: 개발 학습 과정과 기술적 성장을 기록하고 공유
- **유형**: Next.js 기반 정적 사이트 생성(SSG) 블로그
- **배포**: GitHub Pages
- **패키지 매니저**: pnpm 8.15.1 (필수)

## 🛠 기술 스택

### Core
- **Next.js 14.2.5** (App Router, Static Site Generation)
- **React 18** (UI 라이브러리)
- **TypeScript 5** (strict 모드)

### Styling
- **Tailwind CSS 3.4.1** (유틸리티 CSS)
- **class-variance-authority** (컴포넌트 variant 관리)
- **clsx + tailwind-merge** (클래스명 조합)

### Content Management
- **Markdown 기반** (`_posts/` 디렉토리)
- **gray-matter** (front-matter 파싱)
- **react-markdown** (마크다운 렌더링)
- **react-syntax-highlighter** (코드 구문 강조)
- **remark-gfm** (GitHub Flavored Markdown)

### Services
- **@giscus/react** (GitHub 기반 댓글 시스템)
- **Google Analytics** (사이트 분석)

### Development Tools
- **ESLint** (Airbnb + TypeScript 스타일 가이드)
- **Prettier** (코드 포맷팅)
- **Husky + lint-staged** (Git hooks)

## 📂 프로젝트 구조

```
geongyu09-blog/
├── _posts/                      # 📝 마크다운 블로그 포스트
│   └── *.md                     # 각 포스트는 front-matter 포함
│
├── public/
│   └── assets/                  # 이미지 등 정적 리소스
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── page.tsx             # 홈페이지
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   ├── post/[slug]/         # 개별 포스트 페이지 (동적 라우트)
│   │   ├── posts/               # 전체 포스트 목록
│   │   └── posts/[tag]/         # 태그별 필터링
│   │
│   ├── components/
│   │   ├── common/              # 재사용 가능한 공통 컴포넌트
│   │   │   ├── layout/          # Container, Gap, Grid, SplitLayout
│   │   │   ├── Button/
│   │   │   ├── Item/
│   │   │   ├── TagsSection/
│   │   │   ├── icons/
│   │   │   └── lib/             # MarkdownNav, ShortTableOfContent
│   │   └── feature/             # 도메인별 기능 컴포넌트
│   │       ├── Home/            # HomeBannerSection, RecentPostsSection
│   │       ├── Post/            # SideTableOfContent, WholePostsSection
│   │       └── layout/          # Header, Footer
│   │
│   ├── lib/                     # 비즈니스 로직
│   │   ├── post/                # 포스트 데이터 처리 로직
│   │   ├── markdown.ts          # 마크다운 파싱
│   │   └── modal/               # 모달 시스템 (Context API)
│   │
│   ├── service/                 # 외부 서비스 통합
│   │   ├── Analytics/           # Google Analytics
│   │   ├── Comment/             # Giscus 댓글
│   │   └── Markdown/            # 마크다운 렌더러 (커스텀 컴포넌트)
│   │
│   ├── types/                   # TypeScript 타입 정의
│   ├── constants/               # 상수 정의
│   └── utils/                   # 유틸리티 함수
│
├── .eslintrc.json               # ESLint 설정
├── .prettierrc                  # Prettier 설정
├── next.config.mjs              # Next.js 설정
├── tsconfig.json                # TypeScript 설정
└── tailwind.config.ts           # Tailwind CSS 설정
```

## 🏗 주요 아키텍처 및 디자인 패턴

### 1. Static Site Generation (SSG)

프로덕션 빌드 시 완전한 정적 HTML 파일을 생성합니다.

```typescript
// next.config.mjs
const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION';

const nextConfig = {
  trailingSlash: true,
  ...(isProd ? {
    output: 'export',           // 정적 파일 생성
    images: { unoptimized: true }, // GitHub Pages 제약
  } : {}),
};
```

### 2. 파일 시스템 기반 콘텐츠 관리

- 블로그 포스트는 `_posts/` 디렉토리에 마크다운 파일로 저장
- 파일명이 slug로 사용됨 (예: `react-ssr.md` → `/post/react-ssr`)
- Front-matter로 메타데이터 관리

**Front-matter 형식:**
```yaml
---
title: "포스트 제목"
date: "2024-01-01"
description: "포스트 설명"
thumbnail: "/assets/image.png"
tags: "React TypeScript"  # 공백으로 구분
timeStamps: "1735650000000"  # Unix timestamp (ms)
---
```

### 3. 컴포넌트 구조

**Atomic Design 유사 패턴:**
- `common/`: 재사용 가능한 범용 컴포넌트
- `feature/`: 도메인별 특화 컴포넌트

**컴포넌트 규칙:**
- 각 컴포넌트는 디렉토리로 구성
- `index.tsx`에 메인 컴포넌트 export
- 관련 타입, 스타일, 하위 컴포넌트는 같은 디렉토리에 위치

### 4. 모달 시스템

Context API 기반 전역 모달 관리 (`src/lib/modal/`)

**주요 기능:**
- 모달 큐 시스템 (순차적 표시)
- Portal을 통한 DOM 계층 분리
- 모달 응답값 관리 (setResponse/getResponse)

### 5. Path Alias

TypeScript path alias 설정:
```typescript
// tsconfig.json
"paths": {
  "@/*": ["./src/*"]
}
```

**사용 예:**
```typescript
import { PostData } from '@/types/Post';
import { getAllPosts } from '@/lib/post';
```

## 🎨 코딩 컨벤션

### ESLint 규칙

**extends:**
- `next/core-web-vitals`
- `airbnb` (Airbnb JavaScript Style Guide)
- `airbnb-typescript`
- `plugin:prettier/recommended`

**주요 커스텀 규칙:**
```json
{
  "react/react-in-jsx-scope": "off",        // Next.js는 React import 불필요
  "react/jsx-props-no-spreading": "off"     // Props spreading 허용
}
```

### TypeScript 규칙

```json
{
  "strict": true,                  // Strict 모드 활성화
  "noEmit": true,                  // 타입 체크만 수행
  "esModuleInterop": true,
  "skipLibCheck": true
}
```

### Prettier

- 프로젝트 루트에 `.prettierrc` 파일 존재
- ESLint와 통합되어 자동 포맷팅

### 네이밍 컨벤션

- **컴포넌트**: PascalCase (`HomeBannerSection`)
- **파일명**: 컴포넌트는 PascalCase, 유틸리티는 camelCase
- **변수/함수**: camelCase
- **타입/인터페이스**: PascalCase
- **상수**: UPPER_SNAKE_CASE

### Git Hooks

**pre-commit (Husky + lint-staged):**
- 스테이징된 파일에 대해 ESLint 자동 실행
- Prettier 자동 포맷팅
- 타입 체크

## 🔄 개발 워크플로우

### 개발 환경 실행

```bash
pnpm dev
```
- 개발 서버: http://localhost:3000
- 개발 모드에서는 SSG가 아닌 SSR로 동작

### 빌드

```bash
# 개발용 빌드
pnpm build

# 프로덕션 빌드
NEXT_PUBLIC_ENVIRONMENT=PRODUCTION pnpm build
```

### 배포

```bash
pnpm deploy
```

**배포 프로세스:**
1. `NEXT_PUBLIC_ENVIRONMENT=PRODUCTION` 환경변수 설정
2. Next.js 빌드 (`output: 'export'`)
3. `out/.nojekyll` 파일 생성 (GitHub Pages에서 `_` 시작 파일 허용)
4. gh-pages 브랜치에 `out/` 디렉토리 배포

### 린트 및 포맷팅

```bash
pnpm lint        # ESLint 검사
```

Git commit 전에 자동으로 실행됩니다 (Husky).

## 📝 블로그 포스트 작성 가이드

### 1. 새 포스트 생성

1. `_posts/` 디렉토리에 `.md` 파일 생성
2. 파일명이 URL slug가 됨 (예: `my-post.md` → `/post/my-post`)

### 2. Front-matter 작성

```yaml
---
title: "포스트 제목"
date: "YYYY-MM-DD"
description: "포스트 설명 (메타 태그에 사용)"
thumbnail: "/assets/포스트이미지.png"
tags: "React TypeScript Next.js"
timeStamps: "1735650000000"
---
```

**필수 필드:**
- `title`: 포스트 제목
- `date`: 발행일 (YYYY-MM-DD 형식)
- `description`: 포스트 설명
- `timeStamps`: Unix timestamp (밀리초)

**선택 필드:**
- `thumbnail`: 썸네일 이미지 경로 (public 기준 상대경로)
- `tags`: 태그 (공백으로 구분)

### 3. 마크다운 작성

- GitHub Flavored Markdown (GFM) 지원
- 코드 블록 구문 강조 지원
- H1-H3 헤더는 자동으로 목차에 추가됨

**예시:**
```markdown
# 큰 제목 (H1)

## 중간 제목 (H2)

### 작은 제목 (H3)

\`\`\`typescript
// 코드 블록
const hello = "world";
\`\`\`
```

### 4. 이미지 추가

1. `public/assets/` 디렉토리에 이미지 업로드
2. 마크다운에서 참조:
   ```markdown
   ![이미지 설명](/assets/image.png)
   ```

## 🚨 주의사항 및 제약사항

### GitHub Pages 제약

1. **이미지 최적화 비활성화**
   - Next.js Image 최적화는 서버 필요
   - `images: { unoptimized: true }` 설정 필수

2. **Trailing Slash**
   - `trailingSlash: true` 설정 필수
   - 모든 URL이 `/`로 끝남 (예: `/posts/`)

3. **`.nojekyll` 파일**
   - GitHub Pages가 `_next` 등 언더스코어 디렉토리 처리하도록 설정
   - 배포 시 자동 생성됨

### 환경 변수

**프로덕션 빌드 감지:**
```bash
NEXT_PUBLIC_ENVIRONMENT=PRODUCTION
```
- 이 환경변수가 설정되어야 SSG 모드로 빌드됨
- 개발 중에는 설정하지 말 것

### 빌드 타임 데이터 페칭

- 모든 포스트 데이터는 빌드 타임에 생성됨
- `generateStaticParams`를 통해 동적 라우트 사전 생성
- 런타임 데이터 페칭 불가 (완전한 정적 사이트)

### TypeScript Strict 모드

- `strict: true` 설정
- 모든 타입은 명시적으로 정의 필요
- `any` 사용 지양

## 🔧 주요 유틸리티 및 함수

### 포스트 관련 (`src/lib/post/`)

```typescript
getAllPosts(): PostData[]           // 모든 포스트 가져오기 (정렬됨)
getPostBySlug(slug: string)         // slug로 포스트 가져오기
getAllTags(): string[]              // 모든 태그 가져오기
getPostsByTag(tag: string)          // 태그별 포스트 필터링
```

### 마크다운 파싱 (`src/lib/markdown.ts`)

```typescript
parseMarkdown(content: string)      // 마크다운 목차 파싱
```

### 모달 (`src/lib/modal/`)

```typescript
useModal()                          // 모달 Context hook
```

## 🎯 주요 기능 구현 방식

### 1. 포스트 목록 렌더링

```typescript
// app/posts/page.tsx
const posts = getAllPosts();
// 타임스탬프 기준 내림차순 정렬됨
```

### 2. 동적 라우팅 (개별 포스트)

```typescript
// app/post/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### 3. 태그 필터링

```typescript
// app/posts/[tag]/page.tsx
const posts = getPostsByTag(tag);
```

### 4. 목차 자동 생성

- 마크다운 헤더(H1-H3)를 파싱하여 목차 생성
- 사이드바에 고정 목차 표시 (`SideTableOfContent`)

### 5. 댓글 시스템

```typescript
// Giscus 설정은 src/service/Comment/
// GitHub repository discussions 사용
```

## 📊 프로젝트 현황

- **총 포스트 수**: 11개
- **주요 브랜치**: `main` (프로덕션), `dev` (개발)
- **배포 브랜치**: `gh-pages` (자동 생성)

## 🔍 디버깅 팁

### 빌드 오류

1. `pnpm build` 실패 시:
   - TypeScript 타입 오류 확인
   - 포스트 front-matter 유효성 확인
   - 이미지 경로 확인

2. 배포 후 404 오류:
   - `trailingSlash: true` 설정 확인
   - `.nojekyll` 파일 존재 확인
   - `basePath` 설정 확인 (현재는 미사용)

### 로컬 개발

- 개발 서버에서는 SSR로 동작
- 프로덕션 빌드와 다를 수 있음
- 프로덕션 테스트는 `pnpm build && pnpm start`

## 🤝 기여 가이드

1. `dev` 브랜치에서 작업
2. 커밋 전 자동 린트 실행됨 (Husky)
3. 커밋 메시지는 명확하게
4. PR은 `main` 브랜치로

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React Markdown 문서](https://github.com/remarkjs/react-markdown)

---

**Last Updated**: 2025-12-08
**Maintained By**: geongyu09
