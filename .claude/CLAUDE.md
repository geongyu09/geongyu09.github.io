# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**geongyu09-blog** is a personal technical blog built with Next.js, deployed as a static site on GitHub Pages. It uses a file-system based content management system where blog posts are markdown files in the `_posts/` directory.

## Essential Commands

```bash
# Development
pnpm dev                                      # Start dev server (http://localhost:3000)

# Building
pnpm build                                    # Development build
NEXT_PUBLIC_ENVIRONMENT=PRODUCTION pnpm build # Production build (SSG mode)

# Linting
pnpm lint                                     # Run ESLint

# Deployment
pnpm deploy                                   # Build and deploy to GitHub Pages
```

**Important**: This project uses **pnpm 8.15.1** as the package manager. Do not use npm or yarn.

## Architecture Overview

### Static Site Generation (SSG)

The site uses Next.js 14 App Router with conditional SSG based on the `NEXT_PUBLIC_ENVIRONMENT` environment variable:

```typescript
// next.config.mjs
const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION';

const nextConfig = {
  trailingSlash: true,
  ...(isProd
    ? {
        output: 'export',              // Static export for GitHub Pages
        images: { unoptimized: true }, // No server-side image optimization
      }
    : {}),
};
```

**Key implications**:
- Development mode uses SSR (no static export)
- Production builds generate fully static HTML in `out/` directory
- All data must be available at build time (no runtime data fetching)

### File-System Based Content Management

Blog posts are stored as markdown files in `_posts/` with front-matter metadata:

```yaml
---
title: 'Post Title'
date: '2024-01-01'
description: 'Post description'
thumbnail: '/assets/image.png'
tags: 'React TypeScript'        # Space-separated tags
timeStamps: 1735650000000        # Unix timestamp in milliseconds
---
```

**Data flow**:
1. `src/lib/post/post.ts` reads all `.md` files from `_posts/`
2. `gray-matter` parses front-matter and content
3. Posts are sorted by `timeStamps` (descending)
4. `generateStaticParams` generates static routes for each post slug

**Key functions in `src/lib/post/post.ts`**:
- `getAllPosts()`: Returns all posts sorted by timestamp
- `getPostBySlug(slug)`: Returns single post by filename (without .md extension)
- `getFilteredPostsByTag(tag)`: Filters posts by tag
- `getAllTags()`: Extracts unique tags from all posts

### Modal System Architecture

The project uses a custom Context-based modal system (`src/lib/modal/`) with:

1. **Modal Queue**: Modals are queued and displayed sequentially
2. **Portal Rendering**: Modals render outside the main React tree using portals
3. **Response Management**: Modals can return values via `setResponse`/`getResponse`

**Provider structure**:
```
ModalProvider (src/lib/modal/provider/)
  ├── Manages modal queue state
  ├── Handles open/close logic
  └── Provides context to children
```

**Usage pattern**:
```typescript
const { pushModal, closeModal, setResponse, getResponse } = useModal();

// Push modal
pushModal({
  modal: <MyModal />,
  onClose: () => console.log('closed')
});
```

### Component Organization

```
src/components/
├── common/          # Reusable generic components
│   ├── layout/      # Container, Gap, Grid, SplitLayout
│   ├── Item/        # DefaultItem, PostItem
│   └── ...
└── feature/         # Domain-specific components
    ├── Home/        # Homepage sections
    ├── Post/        # Post-related components
    ├── Log/         # Activity log components
    └── layout/      # Header, Footer
```

**Atomic-like design principle**:
- `common/` components are context-agnostic and reusable
- `feature/` components are tied to specific domains/pages

### Markdown Rendering System

Custom markdown renderer at `src/service/Markdown/` that extends `react-markdown`:

```typescript
// src/service/Markdown/index.tsx
<Markdown
  remarkPlugins={[remarkGfm]}
  components={{
    code: Code,        // Custom code block with syntax highlighting
    img: Img,          // Custom image handling
    h1: H1, h2: H2,    // Custom headers (auto-generate IDs for TOC)
    // ... other custom components
  }}
>
  {markdown}
</Markdown>
```

**Key customizations**:
- Headers (H1-H3) generate unique IDs for table of contents
- Code blocks use `react-syntax-highlighter`
- Images support custom styling and lazy loading
- All components are in `src/service/Markdown/components/`

### Path Alias Configuration

TypeScript path aliases are configured to use `@/` prefix:

```typescript
// tsconfig.json
"paths": {
  "@/*": ["./src/*"]
}
```

**Usage**: Always use `@/` for imports from `src/` directory:
```typescript
import { Post } from '@/types/post';
import { getAllPosts } from '@/lib/post/post';
```

## Code Style & Linting

### ESLint Configuration

- **Base**: Airbnb JavaScript/TypeScript Style Guide
- **Framework**: Next.js core-web-vitals
- **Formatting**: Prettier integration

**Key rule overrides** (`.eslintrc.json`):
```json
{
  "react/react-in-jsx-scope": "off",      // Next.js auto-imports React
  "react/jsx-props-no-spreading": "off"   // Props spreading is allowed
}
```

### TypeScript Configuration

- **Strict mode**: Enabled (`strict: true`)
- **Module resolution**: `bundler` (Next.js 13+ requirement)
- **JSX**: `preserve` (handled by Next.js)

### Git Hooks

Husky + lint-staged runs on pre-commit:
- ESLint on staged files
- Prettier formatting
- TypeScript type checking

## Important Implementation Details

### Log Page (`/log/`)

The log page visualizes development activities with:

1. **GitHub Activity Graph**: Uses `react-github-calendar` library
2. **Study Records**: Timeline of learning activities grouped by year

**Data structure** (`src/types/log.ts`):
```typescript
interface LogListItem {
  title: string;
  date: string;          // YYYY-MM-DD format
  href?: string;
  tags?: LogTag[];
}
```

**Data sources** (`src/constants/log/`):
- `studyData.ts`: Aggregates all study data
- `JAASSTUDY.ts`, `CS_STUDY.ts`, `DONUT_STUDY.ts`: Individual study groups
- `presentationData.ts`: Presentation records

**Grouping logic** (`src/lib/log/groupByYear.ts`):
- Groups log items by year from date string
- Returns array of `{ year, items }` objects
- Used for year-based timeline layout

### Dynamic Route Generation

The site uses Next.js App Router with static parameter generation:

```typescript
// app/post/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// app/posts/[tag]/page.tsx
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}
```

All routes are pre-generated at build time for static deployment.

## GitHub Pages Deployment

The `pnpm deploy` command:
1. Sets `NEXT_PUBLIC_ENVIRONMENT=PRODUCTION`
2. Builds with `output: 'export'`
3. Creates `out/.nojekyll` file (allows `_next` directory)
4. Deploys `out/` to `gh-pages` branch via `gh-pages` CLI

**Critical requirements**:
- `trailingSlash: true` in next.config.mjs (GitHub Pages routing)
- `images: { unoptimized: true }` (no server-side optimization)
- `.nojekyll` file in output directory

## Creating New Blog Posts

1. Create a new `.md` file in `_posts/` directory
2. Add front-matter with all required fields (see front-matter format above)
3. Write content using GitHub Flavored Markdown
4. Place images in `public/assets/` and reference as `/assets/image.png`
5. Rebuild to generate static pages

**Validation**: `src/lib/post/utils/validator.ts` checks post data integrity at build time.

## Current Branch Context

- **Main branch**: `main` (production)
- **Current branch**: `feat/log-page` (log page feature development)
- **Deploy branch**: `gh-pages` (auto-generated, do not edit directly)

## Key Dependencies

- **Next.js 14.2.5**: Framework (App Router)
- **React 18**: UI library
- **TypeScript 5**: Type system
- **Tailwind CSS 3.4.1**: Styling
- **react-markdown**: Markdown rendering with custom components
- **gray-matter**: Front-matter parsing
- **@giscus/react**: GitHub Discussions-based comments
- **react-github-calendar**: GitHub contribution calendar

---

**Note**: This is a personal blog project. The focus is on content writing and learning documentation, not on building a general-purpose blog framework.
