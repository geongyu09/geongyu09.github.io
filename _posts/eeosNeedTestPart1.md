---
title: '[eeos] 테스트가 필요해 _ 1부'
date: '2024년 08월 12일'
description: '리팩토링에 대한 막연한 불안감에서 출발해 eeos 프로젝트에 테스트를 도입하며, 테스트의 종류와 어느 로직부터 테스트를 작성할지 기준을 세워본 과정을 정리해보았습니다.'
thumbnail: '/assets/blog/eeosNeedTestPart1/thumbnail.png'
tags: 'test-code 테스트 eeos jest next.js'
timeStamps: 1723388400000
---

**[eeos] 테스트가 필요해** 시리즈 · **1부** (현재 글) · 다음 글 → [\[eeos\] 테스트가 필요해 _ 2부](/post/apiTestWithMocking)

---

# 개요

현재 eeos를 지속적으로 개발중이고, 기존의 코드를 계속해서 리팩토링 해나가는 중이다.

다만, 리팩토링을 할 때마다 너무나도 알 수 없는 불안감에 휩사였었다. 실사용자가 있기도 하고, 빠르게 릴리즈를 위해 개발 해 나가야 하는데, 내가 이렇게 수정한 코드가 제대로 동작하긴 할까? 아에 기존 코드를 갈아엎었는데, 기존과 동일한 동작을 하긴 하는걸까? 에초에 버그 투성이인 코드를 만들거였으면, 그냥 잘 동작하던 기존의 코드를 그대로 두는게 좋지 않았을까? 라는 생각이 계속해서 들게 되었다…

이대로는 안될 것 같았다. 안정적으로 리팩토링을 할 수 있도록 테스트 코드를 작성해야겠다는 생각이 굳게 들었다.

게다가 eeos는 동아리의 팀 빌딩 이후 새로운 개발자가 들어오거나 내가 물려주어야 할 수도 있다. 그러다보니 더더욱 코드 문서화가 필요하며, 프로젝트가 커짐에 따라서 이전의 코드를 올바르게, 그리고 안정적으로 믿고 사용할 수 있도록 하는 안전장치가 필요하다고도 느끼게 되었다.

“EEOS 테스트 시작합니다. ”

---

# 환경 설정

크게 환경 설정과 관련하여서 어려운 점은 없었다. 특히나 12버전 이상을 사용하고 있다면 환경설정을 크게 하지 않아도 된다고 한다.
이를 인지하지 못하고 나는 그냥 설치 해버렸다

`pnpm create jest@latest`
아래는 설정값 들이다.

```javascript
✔ Would you like to use Jest when running "test" script in "package.json"? … yes
✔ Would you like to use Typescript for the configuration file? … yes
✔ Choose the test environment that will be used for testing › node
✔ Do you want Jest to add coverage reports? … yes
✔ Which provider should be used to instrument code for coverage? › v8
✔ Automatically clear mock calls, instances, contexts and results before every test? … yes
```

---

테스트의 종류는 나누는 기준에 따라서도 다양하며 특히나 프론트엔드에서는 어디까지가 유닛테스트이고, 어디까지가 단위 테스트 인지에 대한 관점차이가 존재한다.

> *react 공식문서중*
>
> • **How much to mock:** With components, the distinction between a “unit” and “integration” test can be blurry. If you’re testing a form, should its test also test the buttons inside of it? Or should a button component have its own test suite? Should refactoring a button ever break the form test?

이처럼 어디까지 mock으로 만들 것이며, 어디까지를 단위 혹은 통합으로 볼지에 대해서는 사람마다 기준이 다르다.
특히나 처음 테스트를 도입해보는 입장에서 더더욱 이에 대한 기준점이 명확하지 않아서 혼란스러웠다.

이에 따라서 next 공식 페이지에 있는 [아래의 가이드라인](https://nextjs.org/docs/app/building-your-application/testing#types-of-tests)을 따르도록 하였다.

## Types of tests

- **Unit testing** involves testing individual units (or blocks of code) in isolation. In React, a unit can be a single function, hook, or component.
	- **Component testing** is a more focused version of unit testing where the primary subject of the tests is React components. This may involve testing how components are rendered, their interaction with props, and their behavior in response to user events.
	- **Integration testing** involves testing how multiple units work together. This can be a combination of components, hooks, and functions.
- **End-to-End (E2E) Testing** involves testing user flows in an environment that simulates real user scenarios, like the browser. This means testing specific tasks (e.g. signup flow) in a production-like environment.
- **Snapshot testing** involves capturing the rendered output of a component and saving it to a snapshot file. When tests run, the current rendered output of the component is compared against the saved snapshot. Changes in the snapshot are used to indicate unexpected changes in behavior.

### 단위 테스트

단위 테스트는 개별 단위(또는 코드 블록)를 따로따로 테스트하는 것이다. React에서 단위는 단일 함수, 훅 또는 컴포넌트가 된다.
즉 이에 따라서 하나의 컴포넌트 자체 (외부의 의존성을 제외하고) 를 테스트 한다고 볼 수 있을 것 같다.

- 컴포넌트 테스트
	단위 테스트의 집중적인 버전이다.
	컴포넌트가 렌더링되는 방식, 프로퍼티와의 상호 작용, 사용자 이벤트에 대한 컴포넌트의 동작을 테스트 한다.
- 통합 테스트
	여러 단위가 함께 작동하는 방식을 테스트하는 것이다. 이는 컴포넌트, 후크, 함수의 조합을 테스트 한다.

### End-to-End (E2E)

브라우저와 같이 실제 사용자 시나리오를 시뮬레이션하는 환경에서 사용자 흐름을 테스트하는 것이다.
프로덕션과 유사한 환경에서 특정 작업(예: 가입 흐름)을 테스트하는 것을 말한다.

### Snapshot

스냅샷 테스트에는 컴포넌트의 렌더링된 출력을 캡처하여 스냅샷 파일에 저장해둔다.
테스트가 실행되면 컴포넌트의 현재 렌더링된 출력이 저장된 스냅샷과 비교하여 변경된 부분을 찾는다.
스냅샷의 변경 사항은 예기치 않은 동작의 변화를 나타내는 데 사용된다.

---

## 어느 로직에 테스트를 작성해야 할까?

사실 어쩌면 가장 이상적인 것은 시간적으로 여유로워서 어디에 테스트를 짜야 할지에 대해서 고민하지 않고 단순히 커버리지를 높이는 방향으로 진행하는 것이다. 다만 현실적으로 이는 말이 안된다고 생각한다. 지금만 해도 너무나도 eeos가 크다보니 문제가 많이 존재하였다.

“어느 로직에 테스트를 작성할지에 대해서 정해야 할 필요성이 있었다”

부분적으로 테스트를 적용해야 한다면 테스트의 효과를 가장 많이 볼 수 있는 곳에 작성하는 것이 가장 현명할 것이다. 이에 따라서 테스트가 주는 이점에 대해서 다시 생각해볼 필요성이 있었다.

- 문서화
- 안정성 보장
- 유지보수 용이
- 좋은 코드

여기서 문서화 및 안정성 부분에서, 가장 많이 혹은 광범위하게 사용되는 로직에 작성하는 것이 테스트의 효과를 가장 많이 볼 수 있을 것이라 생각하였다.
이에 따라서 아래의 로직으로 범위를 좁힐 수 있었다.

- 유틸 함수들
- 커스텀 훅
- 공통 컴포넌트

추가적으로 자주 사용되지 않아도 안정성 및 문서화 등의 효과를 많이 볼 수 있는 로직이 api 로직이라 생각하여 해당 부분에도 단위 테스트를 작성하기로 결정하였다.

그리고 결국 유저 관점에서 테스트가 존재해야만 하므로 e2e 테스트는 무조건 넣는 것으로 결정하였다.

통합 테스트의 경우, 도메인이 있는 컴포넌트 기준으로 넣을 예정이며, 해당 부분은 e2e 테스트에서 많이 결정이 될 수 있을 것이라 생각이 들어 리팩토링이나 로직 재사용이 필요시에 조금씩 넣도록 할 예정이다.

기준을 세운 목적은 앞으로 코드를 작성해 나감에 방향성이 흔들리지 않도록 함에 있다.
물론 이렇게 정한 기준은 작업을 해나감에 따라서 충분히 변경될 수 있다. 다만 변경에 대한 이유와 변경의 목적성, 그리고 기대값을 명확히 해야할 것 같다.

---

**다음 글** → [\[eeos\] 테스트가 필요해 _ 2부](/post/apiTestWithMocking)

전체 시리즈 · 1부 (현재 글) · [2부](/post/apiTestWithMocking) · [3부](/post/eeosTestStrategy)
