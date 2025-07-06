---
title: 'React를 사용해 SSR을 구현해보자!'
thumbnail: '/assets/blog/reactSsr/SSR결과.gif'
description: 'React를 사용해 SSR을 구현하는 방법에 대해 정리했습니다. CSR과 SSR의 차이점, React에서의 SSR 구현 방법, 그리고 간단한 카운터 기능을 가진 페이지를 SSR로 구현해보았습니다!'
date: '2025년 2월 10일'
tags: 'React, SSR'
timeStamps : 1739145600
---

## csr과 ssr

### 기술 동향

과거 서버 사이드에서 작동하던 전통적인 방식의 애플리케이션의 경우, 사용자가 요청을 보내면 서버에서 데이터를 가져와 HTML을 생성하고, 이를 클라이언트에 전달하는 방식으로 동작했다. 이러한 동작 방식으로 인해서 매 페이지 전환마다 새롭게 페이지를 요청하고, 서버에서 새로운 HTML을 받아와야만 했다. 이는 페이지를 처음부터 새로 그려야 하므로 이동할 때마다 흰 화면이 보인다던가, 새롭게 그려야 한다는 문제로 인해서 사용자 경험이 좋지 않았다.

이 당시 유행하는 기술스택을 LAMP(Linux, Apache, MySQL, PHP)라고 한다. 이는 서버에서 데이터를 가져와 HTML을 생성하는 방식으로 동작한다.

이런 과거의 PHP 시절을 지나 자바스크립트를 모듈화하는 방안이 논의되기 시작했고, CommonJS, AMD(Asynchronous Module Definition)시스템이 등장하기 시작했다. 자바스크립트의 모듈화와 함께 사용자 기기 성능의 향상, 인터넷 속도의 발전으로 자바스크립트의 입지가 점차 넓어지기 시작했다. 흔히 당시 유행하는 기술스택을 JAM(JavaScript, API, Markup)스택이라고 부른다. 이는 서버에서는 데이터만을 제공하고, 클라이언트에서 자바스크립트를 통해 동적으로 페이지를 그리는 방식이다. 덕분에 서버의 부담을 줄일 수 있었다.

그렇게 React, Vue, Angular와 같은 프론트엔드 라이브러리/프레임워크가 등장하면서 CSR(Client Side Rendering)이 유행하기 시작했다. 이는 서버에서는 단순히 정적 파일만을 제공하고, 클라이언트에서 자바스크립트를 통해 동적으로 페이지를 그리는 방식이다. 이러한 방식으로 인해서 서버의 부담이 줄어들었고, 사용자 경험이 향상되었다.

### CSR과 SSR의 차이

CSR과 SSR의 주요 차이점은 렌더링의 책임을 어디에 두느냐이다. CSR은 브라우저에서 모든 것을 처리하는 반면, SSR은 서버에서 렌더링을 처리하게 된다.

CSR과 비교해 SSR이 가지는 장점은 다음과 같다.

- 최초 페이지 진입이 빠르다.
  csr은 js파일을 전부 받아온 뒤에 브라우저에서 js를 실행하여 렌더링을 마친 후에 비로소 화면을 볼 수 있지만, ssr은 서버에서 렌더링을 해서 HTML을 받아 온 뒤에 화면을 바로 볼 수 있다.
- SEO(Search Engine Optimization)에 유리하다.
  검색 엔진은 페이지의 내용을 크롤링할 때, HTML을 기반으로 하기 때문에 빈 HTML을 받아오는 CSR보다는 SSR이 SEO에 유리하다.
- layout shift에 조금 더 자유롭다
  CSR은 js파일을 받아오고, 렌더링을 하기 때문에 페이지가 렌더링 되기 전에는 빈 화면이 보이게 된다. 이는 사용자에게 불편함을 줄 수 있다. 반면 SSR은 서버에서 렌더링을 하기 때문에 페이지가 렌더링 되기 전에도 레이아웃이 보이게 된다.
- 보안에 안전하다
  JAM 스택을 사용하는 프로젝트는 모든 애플리케이션의 활동이 브라우저에 노출이 된다. 이는 보안에 취약할 수 있다. 반면 SSR은 서버에서 렌더링을 하기 때문에 브라우저에 노출되지 않는다는 장점이 있다.

하지만 항상 장점만 가지는 것은 아니다.
아무래도 소스 코드를 작성할 때 서버를 고려해야만 하며, 서버 구축과 관리에 대한 부담이 생길 수 있다. 또한 서버에서 렌더링을 하기 때문에 서버의 부하가 커질 수 있다. 이로 인해 너무 많은 요청이 들어오면 서버가 느려지며 이는 사용자 경험이 저하되는 결과로 이어질 수 있다.

## React에서의 SSR

### 핵심 컨셉

React에서 서버에서 렌더링을 할 수 있는 API를 제공한다. 이를 통해서 서버에서 렌더링을 하고( == HTML을 만들고 ) 사용자가 페이지를 요청하면 빈 HTML이 아닌 렌더링된 HTML을 서빙하게 된다.
이후 클라이언트에서 동작하는 코드들(ex. 이벤트 핸들러 등)은 scripts 태그를 통해서 서버에서 받아와 사용하게 된다.

컴포넌트를 렌더링 할 때 사용되는 API는 다음과 같다.

**[[`renderToString`](https://18.react.dev/reference/react-dom/server/renderToString)]**

컴포넌트의 렌더링 결과를 html 문자열로 변환한다.

```javascript
const html = renderToString(reactNode, options?)
```

(사용 예시)

```jsx
import { renderToString } from "react-dom/server";

const App = () => (
  <div>
    <h1>Hello SSR</h1>
    <p>This is rendered on server</p>
  </div>
);

// 서버에서 렌더링
const html = renderToString(<App />);
console.log(html);

// 결과:
// <div data-reactroot="">
//   <h1>Hello SSR</h1>
//   <p>This is rendered on server</p>
// </div>
```

이처럼 컴포넌트를 렌더링한 결과를 문자열로 변환해준다.
여기서 data-reactroot는 React에서 렌더링된 컴포넌트를 식별하기 위한 특별한 속성이다. 이 속성은 클라이언트에서 hydrate를 할 때 사용된다.

**[[`renderToPipeableStream`](https://18.react.dev/reference/react-dom/server/renderToPipeableStream)]**

컴포넌트의 렌더링 결과를 스트림으로 변환한다. node환경에서 사용할 수 있으며, Deno 혹은 모던 에지 런타임(modern edge runtime)에서는 [renderToReadableStream](https://18.react.dev/reference/react-dom/server/renderToReadableStream) API를 사용하라고 한다.

```javascript
const { pipe, abort } = renderToPipeableStream(reactNode, options?)
```

> **스트리밍이 무엇이고 왜 사용할까?**
>
> 스트리밍 렌더링은 이름에서 어느정도 알 수 있듯이 청크 단위로 렌더링을 하고 이를 클라이언트로 전송하는 방식이다. 기존의 `renderToString`과 달리 여러 가지 장점을 제공한다. 
>
> 먼저 **응답 속도**가 빠르다. 일반적인 렌더링에서는 모든 컴포넌트가 렌더링 완료될 때까지 기다린 후 한 번에 HTML을 전송한다. 하지만 스트리밍에서는 렌더링이 완료된 부분부터 즉시 전송하기 시작한다. 사용자 입장에서는 빈 화면을 더 빨리 볼 수 있고, 콘텐츠가 점진적으로 나타나는 것을 볼 수 있다.
>
> 또한 **메모리 효율성**도 뛰어나다. 전체 HTML을 메모리에 저장해두지 않고 청크 단위로 나누어 전송하기 때문에, 특히 대용량 페이지에서 서버의 메모리 사용량을 크게 줄일 수 있다.

이렇게 만들어진 HTML은 하나의 문자열 형태가 된다. 즉 별다른 동작이 없는 상태이다. 이를 클라이언트에서 동작하도록 하기 위해서는 hydrate라는 과정이 필요하다.

> **hydrate란?**
> hydrate는 서버에서 렌더링된 HTML에 클라이언트에서 동작하는 이벤트 핸들러 등을 추가하는 과정이다. 적절한 돔에 이벤트 핸들러를 추가해야하므로, 돔을 비교할 기준점이 필요하다. `data-reactroot`속성이 그 기준점이 되며, 이를 통해서 React는 서버에서 렌더링된 HTML과 클라이언트에서 렌더링할 가상 DOM을 비교해나가며 리액트 코드를 "수화"시킨다

hydrate를 하기 위해서는 [hydrateRoot](https://18.react.dev/reference/react-dom/client/hydrateRoot) API를 사용하면 된다.

```javascript
const root = hydrateRoot(domNode, reactNode, options?)
```

자세한 사용법과 작동 방식 및 best practice는 공식 문서를 참고하도록 하자.

# 과정

SSR과 CSR의 렌더링 과정은 정말 유사하다.
다만, CSR은 브라우저에서 모든 것을 처리하는 반면 SSR은 서버에서 렌더링을 처리하게 된다.

**CSR 과정:**
1. 브라우저가 서버로부터 빈 HTML과 JavaScript 번들을 받아온다
2. 브라우저에서 JavaScript가 실행되어 DOM을 생성한다
3. 컴포넌트가 렌더링되어 사용자에게 화면이 보인다

**SSR 과정:**
1. 서버에서 React 컴포넌트를 HTML 문자열로 렌더링한다
2. 생성된 HTML을 클라이언트로 전송한다
3. 브라우저가 HTML을 받아 즉시 화면을 표시한다
4. JavaScript가 로드되면 hydration을 통해 정적 HTML에 상호작용 기능을 추가한다

# SSR을 위한 프로젝트 설정

간단한 카운터 기능이 있는 페이지를 SSR로 구현해보자. 이 프로젝트에서는 스트리밍을 사용하는 방법과 일반적인 문자열 렌더링 방법을 모두 다뤄볼 예정이다.

프로젝트 전체 코드 : [github](https://github.com/geongyu09/react-playground)

## 1. 프로젝트 생성

```bash
npm init -y
```

## 2. 의존성 설치

### React 관련 패키지 (CSR과 동일)

```bash
npm install react react-dom
```

- `react`: React의 핵심 라이브러리로, 컴포넌트를 정의하고 관리하는 기능을 제공
- `react-dom`: React 컴포넌트를 실제 DOM에 렌더링하는 기능을 담당

### TypeScript 관련 패키지 (CSR과 동일)

```bash
npm install -D typescript @types/react @types/react-dom
```

- `typescript`: TypeScript 컴파일러와 타입 체킹을 위한 도구
- `@types/react`, `@types/react-dom`: React, ReactDOM의 타입 정의

### Express 관련 패키지 (SSR 추가)

```bash
npm install express
npm install -D @types/express
```

- `express`: 서버 사이드 렌더링을 위한 Node.js 웹 프레임워크
- `@types/express`: Express의 TypeScript 타입 정의

### Babel 관련 패키지

```bash
npm install -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
npm install -D @babel/register
```

- (CSR과 동일한 패키지들)
  - `@babel/core`: Babel의 핵심 라이브러리
  - `@babel/preset-env`: ES6+ 코드를 ES5로 변환하는 Babel 프리셋
  - `@babel/preset-react`: JSX를 React.createElement 호출로 변환하는 Babel 프리셋
  - `@babel/preset-typescript`: TypeScript를 JavaScript로 변환하는 Babel 프리셋
  - `babel-loader`: Webpack에서 Babel을 사용하기 위한 로더
- **[추가]** `@babel/register`: 서버 사이드에서 TypeScript/JSX를 실시간으로 변환하기 위한 도구

### Webpack 관련 패키지

```bash
npm install -D webpack webpack-cli html-webpack-plugin webpack-node-externals
```

- (CSR과 동일한 패키지들)
  - `webpack`: 모듈 번들러
  - `webpack-cli`: Webpack 명령어 인터페이스
  - `html-webpack-plugin`: HTML 파일 생성 플러그인
- **[추가]** `webpack-node-externals`: 서버 사이드 번들링 시 node_modules를 번들에서 제외하기 위한 도구
- **[제거]** `webpack-dev-server`: SSR에서는 Express 서버를 사용할 예정이므로 제외

> **webpack-node-externals 이 무엇이고, 왜 필요할까?**
>
> 우선 해당 모듈을 사용하는 이유는 번들링 대상에서 `node_modules`를 제외하기 위함이다.
>
> node_modules를 외부 의존성이라고 정의를 해보자. 그리고 js가 돌아가는 호스트 환경을 크게 클라이언트와 node.js로 나눌 수 있다.
> 결국에 우리가 작성한 코드들이 올바르게 동작하기 위해서는 우리의 코드와 외부 의존성(ex.react, express, react-query등..)이 함께 동작해야한다. 그러다보니 클라이언트 환경에서 코드를 돌리기 위해서는 외부 의존성 코드들까지 전부 번들링을 해서 하나의 번들 파일로 만들어야 올바르게 동작할 수 있다.
> 그러나 모듈 시스템을 지원하는 node.js 환경에서는 전부 번들링을 하지 않아도 node_modules만 있다면 필요에 따라 존재하는 외부 의존성 코드를 가져와 사용이 가능하다. 따라서 node_modules를 번들링 대상에서 제외하고, 우리가 작성한 코드들만 번들링 하여 사용하면 된다.
>
> 여담으로 이러한 이유로 인해서 webpack설정을 client와 server로 나누어서 설정하여야 한다.

## 3. 환경 설정

### TypeScript 설정

여기서 노드와 클라이언트 환경을 각각 다르게 설정하기 위해서 `tsconfig.json` 파일을 두 개로 나누어서 설정했다.

**[서버 환경 설정]**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src/client"]
}
```

**[클라이언트 환경 설정]**

```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["es6", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src/server"]
}
```

**[둘의 차이점]**

- target을 es5로 설정한 이유는 혹시 모를 호환성 문제를 방지하기 위함이다(사실 es5가 국룰이라서 설정했다. 여기서는 그냥 예전 브라우저가 아니라면 es6로 설정해도 무방하다).
  노드단에서는 최신 문법을 사용하고 싶어서 es6로 설정했다.
- module 설정의 경우 브라우저에서는 esnext로 설정했고, 노드에서는 commonjs로 설정했다. 이는 각 환경에서 사용하는 모듈 시스템이 다르기 때문이다.

### Babel 설정

공통 설정 파일인 `.babelrc` 파일을 생성한다.

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ]
}
```

서버용 설정(`.babelrc.server.js`)

```javascript
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" }, // 현재 Node 버전 타겟팅
      },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
```

추가적으로 개발 환경에서 빌드 없이 빠른 테스트를 위해 `@babel/register`를 사용한다.
이는 서버에서 TypeScript/JSX를 실시간으로 변환하기 위한 도구이며, 개발 환경에서만 사용한다.

```javascript
// server/register.js
require("@babel/register")({
  extensions: [".ts", ".tsx"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
});

require("./index.tsx"); // 실제 서버 코드
```

### Webpack 설정

**[서버 환경 설정]**

```javascript
const path = require("path");
const nodeExternals = require("webpack-node-externals"); // node_modules를 번들링에서 제외하기 위해서 사용

module.exports = {
  name: "server",
  target: "node",
  entry: "./src/server/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/server"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: [nodeExternals()], // node_modules를 번들링에서 제외
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname, ".babelrc.server.js"),
          },
        },
      },
    ],
  },
};
```

**[클라이언트 환경 설정]**

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  name: "client",
  target: "web",
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/client"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname, ".babelrc"),
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```

### scripts 설정

```json
{
  "scripts": {
    // 개발 환경
    "dev:client": "webpack --watch --config webpack.client.config.js --mode development",
    "dev:server": "nodemon --watch src -e ts,tsx --exec 'node -r @babel/register' src/server/index.tsx",
    "dev": "npm run dev:server & npm run dev:client",

    // 프로덕션 빌드
    "build:client": "webpack --config webpack.client.config.js --mode production",
    "build:server": "webpack --config webpack.server.config.js --mode production",
    "build": "npm run build:client && npm run build:server",

    // 프로덕션 실행
    "start": "node dist/server/server.js"
  }
}
```

# 프로젝트 구조

```
src/
├── client/
│   └── index.tsx      # 클라이언트 진입점
├── server/
│   └── index.tsx      # 서버 진입점
├── shared/
│   ├── App.tsx        # 공유 컴포넌트
│   └── routes.ts      # 라우트 설정 (필요한 경우)
public/
└── index.html         # HTML 템플릿
```

# 코드 작성

## 클라이언트

앞서 이야기한대로 js를 받고 이를 렌더링 할 시점에는 브라우저는 서버에서 만들어진 html을 가지고 있는 상태이다. 그리고 hydrate라는 수화작용을 통해서 실제로 정적인 페이지에 js를 입히는 과정이 들어간다.
이는 react에서 제공하는 [hydrateRoot](https://18.react.dev/reference/react-dom/client/hydrateRoot) 를 사용하여 구현이 가능하다. (기존의 hydrate() api 와 유사하다.)

간단하게 구현하고자 하는 페이지를 React로 구현해보자.

```tsx
// src/client/index.tsx
import React from "react";

import { hydrateRoot } from "react-dom/client";
import { App } from "./App";

async function main() {
  const root = document.getElementById("root");

  if (root === null) throw new Error("Root element not found");

  hydrateRoot(root, <App />);
}

main();
```

index.tsx는 클라이언트 진입점이다. 이곳에서는 hydrateRoot를 사용하여 App 컴포넌트를 렌더링한다.
App은 우리가 만들고자 하는 주된 로직과 UI가 있는 컴포넌트이다.

```tsx
// src/client/App.tsx
import React from "react";

export function App() {
  const [count, setCount] = React.useState(0);

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>This is SSR Counter!!</h1>
      <p>Count: {count}</p>
      <button onClick={onClick}>Increment</button>
    </div>
  );
}
```

현재 상태값이 있고, 이를 변경하는 함수를 만들어서 버튼을 클릭할 때마다 상태값을 변경하도록 구현했다.

## HTML

기본적인 html은 다음과 같이 작성했다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React SSR</title>
  </head>
  <body>
    <!-- 서버에서 렌더링된 HTML이 주입될 위치 -->
    <div id="root">__REPLACE_ME__</div>
  </body>
</html>
```

여기서 CSR때와 유사하게 root div에 모든 컴포넌트들이 만들어 지도록 하였다.
다만 CSR에서는 여기에 그려질 html 태그들이 모두 브라우저가 처리하였다면, SSR에서는 서버에서 렌더링된 HTML이 주입되도록 하였다.

추가적으로 번들링된 js 파일은 별다른 작업을 하지 않아도 빌드시 자동으로 들어가도록 html-webpack-plugin 플러그인을 사용하였다.

## 서버

서버단 코드는 사용자의 요청에 따라서 렌더링된 HTML을 응답하는 역할을 한다.
전체 코드는 아래와 같다.

```tsx
import React from "react";

import express from "express";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { App } from "../client/App";
import fs from "fs";

const app = express();

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("./dist/client/index.html", "utf-8");

const REPLACE_ME = "__REPLACE_ME__";

app.get("/", (_, res) => {
  const renderedRootElement = renderToString(<App />);

  const renderedHtml = html.replace(REPLACE_ME, renderedRootElement);

  res.header("Content-Type", "text/html");
  res.send(renderedHtml);
  return;
});

app.get("/stream", (_, res) => {
  const frontHtml = html.slice(0, html.indexOf(REPLACE_ME));
  const backHtml = html.slice(html.indexOf(REPLACE_ME) + REPLACE_ME.length);

  res.setHeader("content-type", "text/html");
  res.write(frontHtml);

  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      pipe(res);
    },
    onAllReady() {
      res.write(backHtml);
      res.end();
    },
  });

  return;
});

app.use("/client", express.static("dist/client"));

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
```

### 서버 코드 분석

**[서버 생성]**

```typescript
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is listening on port 3000 🚀");
});
```

설정한 포트값으로 서버를 생성하고, 해당 포트로 서버를 실행한다.

**[루트 경로 처리]**

만약 루트로 요청을 한 경우 renderToString을 사용하여 App 컴포넌트를 렌더링하고, 이를 HTML 템플릿에 주입하여 응답하도록 한다.

```typescript
app.get("/", (_, res) => {
  const renderedRootElement = renderToString(<App />);

  const html = fs.readFileSync("./dist/client/index.html", "utf-8");

  const renderedHtml = html.replace(REPLACE_ME, renderedRootElement);

  res.header("Content-Type", "text/html");
  res.send(renderedHtml);
  return;
});
```

**[스트리밍 처리]**

스트리밍 처리는 `renderToPipeableStream` 함수를 사용한다. 이 함수는 렌더링된 컴포넌트를 스트림으로 변환하여, 서버에서 렌더링된 HTML을 클라이언트로 전송할 수 있도록 한다.

```typescript
app.get("/stream", (_, res) => {
  const frontHtml = html.slice(0, html.indexOf(REPLACE_ME));
  const backHtml = html.slice(html.indexOf(REPLACE_ME) + REPLACE_ME.length);

  res.setHeader("content-type", "text/html");
  res.write(frontHtml);

  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      pipe(res);
    },
    onAllReady() {
      res.write(backHtml);
      res.end();
    },
  });

  return;
});
```

코드에서는 우선 HTML 템플릿을 앞부분과 뒷부분으로 나누어서, 렌더링된 컴포넌트를 중간에 삽입하도록 하였다.
그리고 `renderToPipeableStream` 함수를 사용하여 렌더링된 컴포넌트를 스트림으로 변환하고, 이를 클라이언트로 전송한다.
모든 스트리밍이 끝나면 뒷부분의 HTML을 추가하고 응답을 종료한다.

**[정적 파일 제공]**

`/client` 경로로 요청이 오면 `dist/client` 디렉터리의 정적 파일을 제공하도록 설정한다.

```typescript
app.use("/client", express.static("dist/client"));
```

## 실행 화면

![image](/assets/blog/reactSsr/SSR결과.gif)

잘 된다!!

# 마무리

간단하지만 실제로 SSR을 직접 구현해보니 SSR의 동작 방식에 대해서 훨씬 더 잘 이해할 수 있었다. 
평소에 당연하게 사용하던 Next.js가 내부적으로 얼마나 복잡한 일들을 처리해주고 있었는지 실감할 수 있었던 것 같다. 😳

당근마켓에서는 Vercel과의 강결합을 피하기 위해 Next.js대신 Vite를 사용해서 SSR을 직접구현했다고 한다. 이런 선택지가있다는 것 자체가 흥미로웠다.

참고: [당근마켓의 SSR 구현 사례](https://youtu.be/4UD4EB00AME?si=esxfOc3q_J_oUHdW&t=623)