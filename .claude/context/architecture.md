## 아키텍처 개요

### 정적 사이트 생성 (SSG)

`NEXT_PUBLIC_ENVIRONMENT` 환경 변수에 따라 조건부 SSG를 적용하는 Next.js 14 App Router를 사용합니다:

```typescript
// next.config.mjs
const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION';

const nextConfig = {
  trailingSlash: true,
  ...(isProd
    ? {
        output: 'export', // GitHub Pages를 위한 정적 내보내기
        images: { unoptimized: true }, // 서버 사이드 이미지 최적화 없음
      }
    : {}),
};
```

**핵심 특성**:

- 개발 모드는 SSR 사용 (정적 내보내기 없음)
- 프로덕션 빌드는 `out/` 디렉토리에 완전한 정적 HTML 생성
- 모든 데이터는 빌드 시점에 사용 가능해야 함 (런타임 데이터 페칭 없음)

### 파일 시스템 기반 콘텐츠 관리

블로그 글은 `_posts/`에 front-matter 메타데이터를 포함한 마크다운 파일로 저장됩니다:

```yaml
---
title: 'Post Title'
date: '2024-01-01'
description: 'Post description'
thumbnail: '/assets/image.png'
tags: 'React TypeScript' # 공백으로 구분된 태그
timeStamps: 1735650000000 # 밀리초 단위 Unix 타임스탬프
---
```

**데이터 흐름**:

1. `src/lib/post/post.ts`가 `_posts/`의 모든 `.md` 파일을 읽음
2. `gray-matter`가 front-matter와 본문을 파싱
3. 글은 `timeStamps` 기준 내림차순 정렬
4. `generateStaticParams`가 각 글 slug의 정적 경로 생성

**`src/lib/post/post.ts`의 주요 함수**:

- `getAllPosts()`: 타임스탬프 순으로 정렬된 전체 글 반환
- `getPostBySlug(slug)`: 파일명(확장자 제외)으로 단일 글 반환
- `getFilteredPostsByTag(tag)`: 태그로 글 필터링
- `getAllTags()`: 전체 글에서 고유 태그 추출

### 모달 시스템 아키텍처

`src/lib/modal/`의 커스텀 Context 기반 모달 시스템을 사용합니다:

1. **모달 큐**: 모달이 큐에 쌓이고 순차적으로 표시
2. **포털 렌더링**: 포털을 통해 메인 React 트리 외부에 렌더링
3. **응답 관리**: `setResponse`/`getResponse`로 모달이 값을 반환 가능

**Provider 구조**:

```
ModalProvider (src/lib/modal/provider/)
  ├── 모달 큐 상태 관리
  ├── 열기/닫기 로직 처리
  └── 자식 컴포넌트에 컨텍스트 제공
```

**사용 패턴**:

```typescript
const { pushModal, closeModal, setResponse, getResponse } = useModal();

// 모달 추가
pushModal({
  modal: <MyModal />,
  onClose: () => console.log('closed')
});
```

### App Router 구조

```
src/app/
├── layout.tsx           # 루트 레이아웃: ModalProvider > Header > SsgoiProvider > main > Footer
├── page.tsx             # 홈 페이지
├── log/                 # 활동 로그 페이지 (/log)
└── (poster)/            # 라우트 그룹 (URL 세그먼트 없음)
    ├── loading.tsx      # 포스트 경로 공유 로딩 UI
    ├── post/[slug]/     # 개별 포스트 페이지
    └── posts/[tag]/     # 태그 필터링 포스트 목록 페이지
```

### 컴포넌트 구성

```
src/components/
├── common/          # 재사용 가능한 범용 컴포넌트
│   ├── layout/      # Container, Gap, Grid, SplitLayout
│   ├── Item/        # DefaultItem, PostItem
│   └── ...
└── feature/         # 도메인별 컴포넌트
    ├── Home/        # 홈페이지 섹션
    ├── Post/        # 포스트 관련 컴포넌트
    ├── Log/         # 활동 로그 컴포넌트
    └── layout/      # Header, Footer
```

**Atomic 유사 설계 원칙**:

- `common/` 컴포넌트는 컨텍스트에 독립적이며 재사용 가능
- `feature/` 컴포넌트는 특정 도메인/페이지에 종속

### 마크다운 렌더링 시스템

`react-markdown`을 확장한 커스텀 마크다운 렌더러를 `src/service/Markdown/`에 구현:

```typescript
// src/service/Markdown/index.tsx
<Markdown
  remarkPlugins={[remarkGfm]}
  components={{
    code: Code,        // 구문 강조가 있는 커스텀 코드 블록
    img: Img,          // 커스텀 이미지 처리
    h1: H1, h2: H2,    // 커스텀 헤더 (TOC용 고유 ID 자동 생성)
    // ... 기타 커스텀 컴포넌트
  }}
>
  {markdown}
</Markdown>
```

**주요 커스터마이징**:

- 헤더(H1-H3)는 목차용 고유 ID 생성
- 코드 블록은 `react-syntax-highlighter` 사용
- 이미지는 커스텀 스타일링과 지연 로딩 지원
- 모든 컴포넌트는 `src/service/Markdown/components/`에 위치

### 경로 별칭 설정

TypeScript 경로 별칭은 `@/` 접두사를 사용하도록 설정:

```typescript
// tsconfig.json
"paths": {
  "@/*": ["./src/*"]
}
```

**사용법**: `src/` 디렉토리의 임포트에는 항상 `@/`를 사용하세요:

```typescript
import { Post } from '@/types/post';
import { getAllPosts } from '@/lib/post/post';
```
