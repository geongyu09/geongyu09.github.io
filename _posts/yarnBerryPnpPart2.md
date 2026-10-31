---
title: '[Yarn PnP] 2편. Node.js는 모듈을 어떻게 찾는가'
date: '2026년 10월 24일'
description: 'Yarn Berry의 PnP가 node_modules 없이 모듈을 불러오는 방식을 이해하기 위해, Node.js의 require가 경로 계산, 캐시 확인, 파일 읽기와 실행, 결과 반환 순서로 모듈을 찾고 실행하는 과정을 Node 소스 코드를 따라가며 정리하였습니다.'
thumbnail: '/assets/blog/yarnBerryPnpPart2/thumbnail.webp'
tags: 'yarn-berry pnp node.js commonjs require 모듈시스템'
timeStamps: 1792800000000
---

## Node는 React를 어떻게 찾아올까?

1편에서는 Yarn Berry의 PnP를 쓰면 `node_modules` 폴더 대신 `.pnp.cjs` 파일 하나에 프로젝트의 의존 관계가 모두 기록된다는 내용까지 살펴보았다. 그런데 생각해보면 PnP 프로젝트에는 zero install을 구현하여 `node_modules` 폴더가 없다. 그럼 PnP 환경에서는 어떻게  `require('react')`를 호출하면 React를 가져오는 걸까? 

이를 위해서는 우선  `require`를 호출했을 때 모듈의 위치가 어떤 순서로 결정되는지 알아야 한다.

Node의 `require` 코드를 직접 따라가면서 이를 호출했을 때 실행되는 함수들을 차례로 따라가 보자.

## require()의 동작

`require` 함수의 구현은 Node 저장소의 [`lib/internal/modules/cjs/loader.js`](https://github.com/nodejs/node/blob/338f67f57129b4fd15311fab612ceaa18963acb7/lib/internal/modules/cjs/loader.js)에서 확인할 수 있으며, `require('react')`를 호출했을 때 실행되는 부분만 간추리면 아래와 같다.

```javascript
// lib/internal/modules/cjs/loader.js (v24.x, 일부 생략)
Module.prototype.require = function(id) {
  // ...
  return wrapModuleLoad(id, this, /* isMain */ false); // 내부에서 Module._load()를 호출한다
};

Module._load = function(request, parent, isMain, internalOptions = kEmptyObject) {
  // 1. 요청 문자열에 해당하는 파일의 절대 경로를 계산한다
  //    (등록된 훅이 없으면 resolveForCJSWithHooks() 안에서 Module._resolveFilename()이 호출된다)
  const { filename } = resolveForCJSWithHooks(request, parent, isMain, internalOptions);

  // 2. 같은 경로의 모듈이 캐시에 있고 실행을 마쳤다면 저장된 exports를 반환한다
  const cachedModule = Module._cache[filename];
  if (cachedModule !== undefined) {
    updateChildren(parent, cachedModule, true);
    if (cachedModule.loaded) {
      return cachedModule.exports;
    }
  }

  // 캐시에 없으면 새 모듈 객체를 만들고, 실행하기 전에 먼저 캐시에 넣는다
  const module = new Module(filename, parent);
  Module._cache[filename] = module;

  // 3. 파일을 읽어서 실행한다
  module.load(filename);

  // 4. 실행 결과인 module.exports를 반환한다
  return module.exports;
};
```

`require`가 동작하는 방식을 간단히 설명하면, `require('react')`를 호출했을 때 `wrapModuleLoad()`를 거쳐 `Module._load()`가 호출되며, `Module._load()` 안에서 아래 네 단계로 실행된다.

1. 경로 계산: `Module._resolveFilename()`이 호출되어 `'react'`에 해당하는 파일의 절대 경로가 반환된다.
2. 캐시 확인: 반환된 절대 경로를 키로 `Module._cache`를 조회해서, 실행을 마친 모듈이 있으면 저장된 `module.exports`가 반환된다.
3. 파일 읽기와 실행: 캐시에 없는 모듈이면 새 `Module` 객체가 만들어져 `Module._cache`에 저장된 뒤 `module.load()`가 호출되어 파일이 읽히고 실행된다.
4. 결과 반환: 실행이 끝나면 `module.exports`가 `require()`의 결과로 반환된다.

`'react'`처럼 요청한 문자열은 1단계에서 `/home/me/app/node_modules/react/index.js` 같은 절대 경로로 바뀌며 2단계부터는 계산된 절대 경로가 모듈을 구분하는 키로 사용된다.

각 단계를 하나씩 살펴보자.

### 1단계. Module._resolveFilename으로 경로 계산

`Module._resolveFilename(request, parent)`는 `require()`에 넘긴 요청 문자열로 불러올 모듈의 위치를 계산할 때 호출되는 함수로, `request`에는 `'react'`처럼 `require()`에 넘긴 문자열이, `parent`에는 `require()`를 호출한 모듈 객체가 전달된다.

`Module._resolveFilename()`을 호출하면 요청에 따라 다른 값을 리턴한다. `fs`나 `path` 같은 내장 모듈을 요청했다면 `'fs'`처럼 요청한 이름을, 나머지 요청이라면 `/home/me/app/node_modules/react/index.js`처럼 불러올 파일의 절대 경로를 문자열로 리턴한다.

내장 모듈이 아닌 요청이라면 내부에서 `Module._resolveLookupPaths()`를 호출해서 파일을 찾아볼 후보 폴더 목록을 만들어두고, 이를 `Module._findPath()`에 인자로 넘겨 모듈이 있을 후보 폴더 목록들 중 실제 위치한 절대 경로를 찾는다.

`require()`의 인자로 넣을 수 있는 요청 문자열을 분류해보면 크게 4가지 정도이다.

1. 내장 모듈: `fs`, `path`, `node:fs`처럼 Node에 포함된 모듈의 이름
2. 상대 경로: `./utils`, `../config.json`처럼 `./`이나 `../`로 시작하는 경로
3. 절대 경로: `/home/me/app/config.json`처럼 `/`로 시작하는 경로
4. 패키지 이름: `react`, `react/jsx-runtime`, `@babel/core`처럼 `.`이나 `/`로 시작하지 않고 패키지 이름으로 시작하는 요청

`/home/me/app/src/index.js` 파일에서 형태별로 `require()`를 호출하면 후보 폴더 목록과 반환값은 아래와 같다.

1. 내장 모듈: `require('fs')`를 호출하면 후보 폴더 목록이 만들어지기 전에 `'fs'`가 바로 반환된다.
2. 상대 경로: `require('./utils')`를 호출하면 `require()`를 호출한 파일의 폴더가 담긴 `['/home/me/app/src']`가 후보 폴더 목록으로 만들어지며 해당 폴더에서 `utils.js`를 찾으면 `/home/me/app/src/utils.js`가 반환된다.
3. 절대 경로: `require('/home/me/app/config.json')`을 호출하면 `Module._findPath()` 안에서 후보 폴더 목록이 무시되어 요청한 경로에서만 파일을 찾으며 파일이 있으면 `/home/me/app/config.json`이 반환된다.
4. 패키지 이름: `require('react')`를 호출하면 `['/home/me/app/src/node_modules', '/home/me/app/node_modules', '/home/me/node_modules', ...]`처럼 호출한 파일의 폴더부터 루트까지 한 단계씩 올라가며 `node_modules`를 붙인 경로들이 후보 폴더 목록으로 만들어진다. 후보 폴더를 앞에서부터 확인해서 React를 처음 찾은 `/home/me/app/node_modules`의 진입 파일인 `/home/me/app/node_modules/react/index.js`가 반환된다.

어느 형태든 파일을 찾지 못하면 `Cannot find module 'react'` 같은 메시지와 함께 `code`가 `MODULE_NOT_FOUND`인 오류가 발생한다.

실제 코드는 Node 저장소의 [`Module._resolveFilename`](https://github.com/nodejs/node/blob/338f67f57129b4fd15311fab612ceaa18963acb7/lib/internal/modules/cjs/loader.js#L1480-L1569)에서 볼 수 있으며 위에서 살펴본 흐름에 해당하는 부분만 간추리면 아래와 같다.

```javascript
// lib/internal/modules/cjs/loader.js (v24.x, 일부 생략)
Module._resolveFilename = function(request, parent, isMain, options) {
  if (BuiltinModule.normalizeRequirableId(request)) {
    return request; // fs, path 같은 내장 모듈은 이름을 바로 반환한다
  }
  // ...
  // 찾아볼 후보 폴더 목록을 만든다
  paths = Module._resolveLookupPaths(request, parent);
  // ...
  // 후보 폴더에서 실제 파일을 찾는다
  const filename = Module._findPath(request, paths, isMain, conditions);
  if (filename) { return filename; }
  // 끝까지 찾지 못하면 MODULE_NOT_FOUND 오류를 던진다
};
```

### Module._findPath로 진입 파일 결정

1단계에서 본 `Module._resolveFilename()` 코드에서는 `Module._resolveLookupPaths()`로 후보 폴더 목록이 만들어진 뒤, 후보 폴더 가운데 모듈이 실제로 있는 위치를 찾을 때 `Module._findPath()`가 호출된다. `Module._findPath(request, paths)`에는 `'react'` 같은 요청 문자열과 후보 폴더 목록이 인자로 전달되며, 호출하면 후보 폴더에서 처음 찾은 파일의 절대 경로가 반환되고 어느 폴더에서도 찾지 못하면 `false`가 반환된다.

`require('./utils')`처럼 파일을 요청하면 요청한 파일만 찾으면 되지만, `require('react')`처럼 패키지 이름을 요청하면 후보 폴더에서 찾은 `react`가 폴더이기 때문에 폴더 안의 여러 파일 가운데 어떤 파일을 불러올지 정해야 한다. 패키지를 `require()`로 불러왔을 때 처음 실행되는 파일을 진입 파일이라고 하며, `require('react')`를 호출하면 React의 진입 파일인 `react/index.js`가 실행된다.

`Module._findPath()` 안에서는 후보 폴더를 앞에서부터 하나씩 확인하는 반복문이 실행되며 각 폴더에서는 아래 순서로 진입 파일을 찾는다.

1. 패키지의 `package.json`에 `exports` 필드가 있으면, `exports`에 적힌 경로 가운데 조건에 맞는 파일
2. 요청 경로에 해당하는 파일, 없으면 `.js`, `.json`, `.node` 확장자를 붙인 파일
3. 요청 경로가 폴더라면 `package.json`의 `main` 필드에 적힌 파일
4. `main` 필드가 없으면 폴더 안의 `index.js`, `index.json`, `index.node`

```javascript
// lib/internal/modules/cjs/loader.js (v24.x, 일부 생략)
Module._findPath = function(request, paths, isMain, conditions) {
  const cacheKey = request + '\x00' + ArrayPrototypeJoin(paths, '\x00');
  const entry = Module._pathCache[cacheKey];
  if (entry) {
    return entry; // 같은 요청과 후보 폴더로 찾은 적이 있으면 저장해 둔 경로를 반환한다
  }

  for (let i = 0; i < paths.length; i++) {
    const curPath = paths[i];

    // 1. package.json의 exports 필드를 먼저 확인한다
    const exportsResolved = resolveExports(curPath, request, conditions);
    if (exportsResolved) {
      return exportsResolved;
    }

    const basePath = path.resolve(curPath, request);
    const rc = _stat(basePath); // 0이면 파일, 1이면 폴더
    let filename;

    // 2. 요청 경로가 파일이면 해당 파일, 아니면 확장자를 붙여서 찾는다
    if (rc === 0) {
      filename = toRealPath(basePath);
    }
    if (!filename) {
      filename = tryExtensions(basePath, exts, isMain);
    }

    // 3, 4. 폴더라면 package.json의 main, 없으면 index를 찾는다
    if (!filename && rc === 1) {
      filename = tryPackage(basePath, exts, isMain, request);
    }

    if (filename) {
      Module._pathCache[cacheKey] = filename; // 찾은 경로를 캐시에 저장한다
      return filename;
    }
  }

  return false;
};
```

진입 파일을 처음 찾은 폴더에서 반복문이 끝나기 때문에 뒤쪽 후보 폴더는 확인하지 않는다. 파일, 확장자, `main`, `index` 규칙으로 찾은 경로는 `Module._pathCache[cacheKey] = filename` 코드가 실행되어 캐시에 저장된다. 

### 2단계. Module._load에서 캐시 확인

1단계에서 절대 경로가 반환되면 `Module._load`에서는 해당 경로를 키로 `Module._cache`를 조회하며 이미 실행을 마친 모듈이 캐시에 있다면 파일을 다시 읽지 않고 저장해 둔 `exports`가 반환된다. 캐시에 없는 모듈이라면 앞에서 본 `Module._load` 코드처럼 새 `Module` 객체가 만들어진 뒤, 파일을 실행하기 전에 먼저 `Module._cache`에 저장된다.

따라서 같은 절대 경로로 결정되는 `require('react')`를 여러 파일에서 호출해도 React의 `index.js`는 처음 한 번만 실행되며 두 번째 호출부터는 첫 호출에서 만들어진 `module.exports` 객체가 반환된다.

### 3단계. module.load로 파일 읽기와 실행

캐시에 없는 모듈이면 `module.load(filename)`이 호출되어 확장자에 맞는 `Module._extensions` 처리 함수가 실행된다. 

`.js` 파일이라면 `fs.readFileSync(filename, 'utf8')`로 읽은 문자열이 `module._compile()`에 전달된다.

```javascript
// Module.prototype._compile (v24.x, 일부 생략)
// 파일 내용을 다섯 개의 매개변수를 받는 래퍼 함수로 컴파일한다
const result = wrapSafe(filename, content, this, format);
compiledWrapper = result.function;
// ...
const dirname = path.dirname(filename);
const require = makeRequireFunction(this); // 모듈마다 새 require 함수를 만든다
const exports = this.exports;
const thisValue = exports;
const module = this;
// ...
// 모듈 객체와 require 함수를 인자로 래퍼 함수를 실행한다
result = FunctionPrototypeCall(compiledWrapper, thisValue, exports, require, module, filename, dirname);
```

`wrapSafe()`를 호출하면 파일 내용이 `exports`, `require`, `module`, `__filename`, `__dirname`을 매개변수로 받는 래퍼 함수로 컴파일되며 이어서 모듈 객체와 해당 모듈 전용 `require` 함수를 인자로 래퍼 함수가 호출된다. 래퍼 함수 실행이 끝난 뒤 `Module._load`에서 반환되는 `module.exports`가 `require('react')`의 결과가 되어 `React` 변수에 담긴다.

지금까지 살펴본 require 함수가 하는 네 단계를 하나의 함수로 단순화해서 작성해 보면 아래와 같다.

```javascript
function require(id) {
  const filename = Module._resolveFilename(id, 호출한모듈);            // 1. 경로 계산 (PnP 환경에서 교체된다)
  if (Module._cache[filename]) return Module._cache[filename].exports; // 2. 캐시 확인

  const module = new Module(filename);
  Module._cache[filename] = module;
  const code = fs.readFileSync(filename, 'utf8');                     // 3. 파일 읽기 (PnP 환경에서 교체된다)
  const fn = compileFunction(code, ['exports', 'require', 'module', '__filename', '__dirname']);
  fn.call(module.exports, module.exports, makeRequire(module), module, filename, path.dirname(filename));
  return module.exports;                                              // 4. 반환
}
```

PnP 환경에서는 위 코드에서 주석으로 표시한 1단계의 `Module._resolveFilename`과 3단계의 `fs.readFileSync`가 교체되지만 캐시 확인과 래퍼 함수의 컴파일, 실행에는 Node의 원래 코드가 사용된다.

## 그래서 PnP는 존재하지 않는 위치에서 어떻게 모듈을 가져올까?

PnP 프로젝트에는 `node_modules` 폴더가 없어서 원래의 `Module._resolveFilename`을 호출하면 후보 폴더를 모두 확인해도 React를 찾지 못해 `MODULE_NOT_FOUND` 오류가 발생한다. PnP는 압축된 캐시파일에 모듈이 존재하므로 PnP 환경에서 모듈을 불러오려면 모듈을 가져올 때 두 가지가 달라져야만 한다.

- 경로 계산: `node_modules` 폴더를 탐색하는 대신 `.pnp.cjs`에 기록된 의존 관계 표에서 패키지의 위치를 가져오도록 한다.
- 파일 읽기: 압축된 zip 파일로 저장된 모듈을 사용하기 위해 zip 안의 파일을 읽을 수 있어야 한다.

이는 기존 Node.js 환경에서의 동작과 다르기 때문에, Yarn Berry는 `require`와 `fs` 내장 모듈의 동작을 바꾸는 선택을 했다.

그렇다면 어떻게 동작을 바꾼 걸까? 궁금하다면 다음편으로
