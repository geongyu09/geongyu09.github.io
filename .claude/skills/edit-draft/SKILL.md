---
name : edit-draft
description: `on-writing/draft.md` 파일을 확인하여 작성된 글의 초안을 바탕으로 글의 내용을 검토하고 수정합니다. 수정된 초안은 `./on-writing/draft.md` 파일에 업데이트됩니다.
disable-model-invocation: true
user-invocable: true
---

# AI를 활용하여 글의 초안을 수정하는 커맨드(스킬)

이 커맨드는 작성된 `./on-writing/outline.md` 파일을 보고 AI를 활용하여 글의 구성된 초안을 수정합니다.

## 이 커맨드가 하는 일

1. `./on-writing/outline.md` 파일을 읽어 글의 제목과 대상 독자, 전달하려는 메시지나 담고싶은 내용, 그리고 글의 방향성을 파악합니다.
   1-1. 파일이 존재하지 않거나 내용이 비어있는 경우 신경쓰기 마세요
2. 수집한 정보를 바탕으로 초안을 수정합니다. 초안 수정 시 글의 방향성에 맞게 글의 구조를 짜고, 글의 제목과 대상 독자, 전달하려는 메시지나 담고싶은 내용을 효과적으로 전달할 수 있도록 합니다. 또한, 톤과 매너 가이드라인을 참고하여 글의 톤과 매너를 유지하도록 합니다.
3. 수정된 초안을 `./on-writing/draft.md` 파일에 업데이트합니다.

## 결과 예시

`docs/ex-result.md`
