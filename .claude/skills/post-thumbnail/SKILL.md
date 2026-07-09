---
name: post-thumbnail
description: '블로그 글의 썸네일 이미지를 생성합니다. 글의 프론트매터(title, tags, date)를 읽어 기존 썸네일들과 통일된 스타일의 SVG를 디자인하고, Chrome headless로 PNG 변환 후 cwebp로 webp 변환하여 `public/assets/blog/[글 제목]/thumbnail.webp`로 저장한 뒤 프론트매터의 thumbnail 필드를 갱신합니다. "썸네일 만들어줘", "이 글 썸네일 생성해줘" 등의 요청 시 이 스킬을 사용하세요.'
disable-model-invocation: false
user-invocable: true
---

# 블로그 글 썸네일 생성

이 스킬은 `_posts/`의 글에 대해 기존 썸네일들과 통일된 스타일의 썸네일 **webp**를 생성합니다.
썸네일은 글 목록 카드와 **OG 이미지(og:image, 트위터 카드)**로 쓰이기 때문에 SVG가 아닌 래스터 이미지로 최종 저장해야 합니다. (SNS 크롤러는 SVG를 지원하지 않음) 용량을 위해 최종 포맷은 **webp**를 사용합니다.

## [금지] 글 본문 수정 금지

- 글 파일에서 수정할 수 있는 것은 프론트매터의 `thumbnail:` 필드뿐입니다.
- 본문 텍스트, 다른 프론트매터 필드는 건드리지 않습니다.
- `tone-and-manner` 스킬을 로드하거나 적용하지 않습니다.

## 작업 절차

### 1. 대상 글 확인

- 사용자가 글을 지정하지 않았다면 어떤 글인지 확인합니다.
- 프론트매터에서 `title`, `tags`, `date`를 읽습니다.
- 에셋 폴더명을 확인합니다: 기존 `public/assets/blog/[글 제목]/` 폴더가 있으면 그대로 사용, 없으면 글 파일명과 동일하게 만듭니다.
- 이미 `thumbnail.webp`(또는 예전 관례의 `thumbnail.png`)가 존재하면 덮어쓰기 전에 사용자에게 확인합니다.

### 2. SVG 디자인

아래 [썸네일 스타일 가이드]를 따라 SVG를 스크래치패드(세션 임시 디렉토리)에 작성합니다. SVG 소스는 저장소에 커밋하지 않습니다.

### 3. PNG 변환 → webp 변환

**Chrome headless를 사용합니다.** (rsvg-convert는 이모지를 흑백으로 깨뜨리므로 이모지가 없는 경우에만 대체 수단으로 사용)
Chrome은 webp로 직접 스크린샷을 찍을 수 없으므로, 중간 PNG는 스크래치패드에 만들고 cwebp로 최종 webp를 생성합니다. 중간 PNG는 저장소에 커밋하지 않습니다.

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars \
  --window-size=1920,960 \
  --screenshot=[스크래치패드]/thumbnail.png \
  "file://[SVG 절대경로]"

cwebp -q 90 [스크래치패드]/thumbnail.png -o public/assets/blog/[글 제목]/thumbnail.webp
```

- `--window-size`는 SVG의 `width`/`height` 속성과 **정확히 일치**해야 잘림/여백 없이 변환됩니다.
- 기존 `thumbnail.png`가 남아 있다면 webp 저장 후 삭제합니다.

### 4. 결과 검증

- 생성된 webp(또는 중간 PNG)를 Read 도구로 직접 열어 확인합니다: 제목이 잘리거나 넘치지 않는지, **배지 텍스트가 배지 사각형 안에 여유 있게 들어가는지**, 텍스트 줄바꿈이 어색하지 않은지, 한글·이모지가 올바르게 렌더링됐는지.
- 배지 폭 계산 기준: 대략 `이모지(70px) + 영문 글자당 32px + 한글 글자당 54px + 좌우 패딩 64px`. 넉넉하게 잡습니다.
- 문제가 있으면 SVG를 수정하고 다시 변환합니다.

### 5. 프론트매터 갱신

프론트매터의 `thumbnail:` 필드를 갱신합니다.

```yaml
thumbnail: '/assets/blog/[글 제목]/thumbnail.webp'
```

### 6. 보고

생성된 썸네일 이미지와 파일 경로를 사용자에게 보여줍니다.

## 썸네일 스타일 가이드

기존 썸네일들과 통일감을 유지합니다. 기준 예시는 `public/assets/blog/cacheAndServerState/thumbnail.webp`입니다.

### 캔버스

- 크기: **1920 x 960** (2:1 비율, 기존 썸네일 다수와 동일)
- 배경: `#e9f1fb` (연한 파랑). 글 주제에 따라 다른 파스텔 톤(연한 초록 `#e9f7ef`, 연한 노랑 `#fdf6e3` 등)을 쓸 수 있지만 채도는 낮게 유지합니다.

### 구성 요소 (위에서부터)

모든 텍스트는 왼쪽 정렬이며 시작 x 좌표는 `440`입니다. 세로로는 콘텐츠 블록이 캔버스 상단~중앙에 위치합니다.

1. **카테고리 배지** (y ≈ 155~235): 둥근 사각형(`rx="16"`) 안에 이모지 + 라벨.
   - 배경 `#2f6fed`, 텍스트 흰색, 폰트 크기 54, font-weight 700
   - 라벨: 기술 글이면 `Tech Post`, 회고면 `회고`, 일지면 `Dev Log` 등 글 성격에 맞게
   - 이모지는 글 주제와 어울리는 것 1개 (⏰ 🧭 🧪 ✍️ 등)
   - 배지 폭은 내용 길이에 맞춰 조절
2. **제목** (배지 아래 약 100px 간격): 프론트매터 `title` 그대로. `[회고]` 같은 프리픽스는 배지로 옮기고 제목에서는 뺄 수 있습니다.
   - 색 `#3f4c5c`, 폰트 크기 120~130, font-weight 800
   - 한 줄에 대략 12~13자(한글 기준)까지. 넘치면 `<tspan>`으로 최대 2줄로 나누고, 2줄로도 안 되면 폰트 크기를 100까지 줄입니다.
3. **Tags 라인** (제목 아래 약 90px 간격): `Tags: [태그들]`
   - "Tags:"는 font-weight 700 `#6b7684`, 값은 `#8a97a5`, 폰트 크기 50
   - 태그는 프론트매터의 것을 공백 구분 그대로 쓰거나, 길면 대표 태그 2~3개만
4. **Upload At 라인** (Tags 아래 약 90px 간격): `Upload At : [date]`
   - 스타일은 Tags 라인과 동일, 날짜는 프론트매터 `date` 그대로

### 폰트

```
font-family="-apple-system, 'Apple SD Gothic Neo', 'Pretendard', 'Noto Sans KR', sans-serif"
```

외부 폰트 로드 금지. 시스템 폰트만 사용합니다.

### 템플릿

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 960" width="1920" height="960" font-family="-apple-system, 'Apple SD Gothic Neo', 'Pretendard', 'Noto Sans KR', sans-serif">
  <rect width="1920" height="960" fill="#e9f1fb"/>
  <rect x="440" y="155" width="370" height="82" rx="16" fill="#2f6fed"/>
  <text x="472" y="212" font-size="54" font-weight="700" fill="#ffffff">⏰ Tech Post</text>
  <text x="440" y="400" font-size="126" font-weight="800" fill="#3f4c5c">글의 제목</text>
  <text x="440" y="510" font-size="50"><tspan font-weight="700" fill="#6b7684">Tags:</tspan><tspan fill="#8a97a5"> 태그 목록</tspan></text>
  <text x="440" y="600" font-size="50"><tspan font-weight="700" fill="#6b7684">Upload At :</tspan><tspan fill="#8a97a5"> 2024년 7월 8일</tspan></text>
</svg>
```

제목이 2줄인 경우 Tags/Upload At의 y 좌표를 그만큼 아래로 내립니다.
