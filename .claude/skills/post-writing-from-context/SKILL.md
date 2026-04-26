---
name: post-writing-from-context
description: `./context/post/*`에 있는 md파일과, 여기서 참조하고있는 파일을 바탕으로 `_posts/`에 실제 글을 작성합니다. 이 스킬을 "작성한 글을 바탕으로 블로그 글로 옮겨줘", "작성한 글로 블로그 글로 작성해줘"등의 프롬프트가 입력된 경우 실행하세요.
disable-model-invocation: false
user-invocable: true
---

# 작성한 문서를 실제 블로그 글로 옮기는 커맨드(스킬)

이 커맨드는 `./context/post/*`에 있는 md파일과 참조하고있는 이미지 파일들을 바탕으로 실제 블로그에 올라갈 `_posts/`에 실제 글을 작성합니다.

필요한 경우 `post-outline-summarizer` 에이전트를 적극 활용하세요

## 작동 방식

1. `./context/post/*`에 md 파일이 있는지 확인합니다.
   1-1. 없다면 사용자에게 해당 위치에 파일을 넣어달라고 말한 후 종료합니다.
2. md파일과 필요한 에셋 파일을 확인하여 아래의 사항을 정합니다.

- 블로그 글의 제목
- 에셋과 블로그 글이 위치해야할 위치

3. 해당 위치에 각 파일을 복사하여 위치시킵니다.
4. 블로그 글에 에셋들을 적절하게 매핑시킵니다.
5. 블로그 글의 프론트매터를 작성합니다. 이때 날짜와 태그는 `./context/post/*`에 있는 md 파일을 바탕으로 작성합니다.
6. 최종적으로 `./context/post/*` 파일을 제거합니다.

## 파일 구조

### `_posts/...md`

- 파일 제목 : 문서의 주제(혹은 제목)을 카멜케이스로 변경한 이름
- 파일 최상단 : 메타 정보를 담은 프론트메터

프론트매터 템플릿:

```markdown
---
title: '[제목 미정]'
date: 'YYYY년 MM월 DD일'
description: '글을 요약하는 한 두 문장의 높힘말 문장'
thumbnail: '/assets/blog/...'
tags: '...'
timeStamps: [epoch-ms]
---
```

- 프론트메터 하단 : md형식의 블로그 글

### `public/assets/blog`

특정 블로그 글에 필요한 thubmnail혹은 에셋을 보관합니다.
보관 방법은 `_posts/[글 제목].md`의 글에서 필요한 에셋이라면 `public/assets/blog/[글 제목]/*`에 위치합니다.
thubmnail 에셋의 경우 `thubmnail.{png, jpg, jpeg...} ` 형식으로, 글 내용중에 필요한 에셋의 경우 아래의 패턴을 사용합니다.

- 최상단에서부터 0, 1, ... 으로 이름붙이기 e.g. `0.{png, jpg, jpeg...}`, `1.{png, jpg, jpeg...}`

## 에셋 연결하기

에셋의 주소는 아래의 형식을 따라야합니다.
'/assets/blog/[글 제목]/[assets name].{gif, jpg, ...}'

## 날짜 프론트매터

`./context/post/*`의 md 파일에 있는 날짜를 확인하여 아래를 채웁니다.

- date: 'YYYY년 MM월 DD일'
- timeStamps: 날짜의 ms 단위 타임스탬프

## tags 프론트매터

블로그 파일의 내용을 읽고 요약한 이후 핵심 키워드를 뽑습니다. 이때 `post-outline-summarizer` 에이전트를 적극 활용하세요
키워드는 사용된 기술, 회고의 내용이라면 "회고", 일지라면 "일지" 등을 작성합니다.

[주의] 절대로 `./context/post/*`의 md 파일에 있는 태그를 그대로 사용하지 않습니다.
