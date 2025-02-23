---
title: '[test-code] 테스트 코드의 중요성 _ 좋은 코드'
thumbnail: '/assets/blog/importanceOfTest/thumbnail.png'
description: '테스트 코드과 좋은 코드의 연관성에 대한 개인적인 생각을 정리해보았습니다.'
date: '2024년 8월 3일'
tags: '회고 2024'
timeStamps : 1722672000
---

# 좋은 코드?

사실 좋은 코드에 대해서 정답은 없다. 작성된 코드에 대한 적절한 당위성이 뒷받침 된다면 어느 코드는 해당 상황에서 “그렇게 쓰여야만 하는 코드”였을 것이다. 즉 해당 상황에서 해당 코드가 정답이었을 것이다. 이러한 상황은 일반화 할 수 없을 정도로 다양할 것이고, 이에 대해서 명확히 어떤 코드가 정답이라고 할 수 없다.

다만 많은 개발자들이 잘 작성된 코드를 이야기할 때 공통적으로 이야기 하는 점들이 존재한다. 

- 가독성: 코드가 명확하고 이해하기 쉬워야 합니다. 복잡한 로직도 잘 구조화되어 있으면 이해하기 쉽습니다.
- 유지보수성: 쉽게 수정하고 확장할 수 있어야 합니다. 이는 모듈화, 낮은 결합도, 높은 응집도와 연관됩니다.
- 효율성: 자원을 효율적으로 사용하고 성능이 좋아야 합니다.
- 신뢰성: 예상대로 작동하며 에러 처리가 잘 되어 있어야 합니다.
- 테스트 용이성: 단위 테스트와 통합 테스트를 쉽게 작성할 수 있어야 합니다.
- 재사용성: 코드의 일부를 다른 곳에서도 쉽게 사용할 수 있어야 합니다.
- 일관성: 코딩 스타일과 패턴이 일관되어야 합니다.
- 문서화: 필요한 경우 주석이나 문서를 통해 코드의 의도와 동작을 설명해야 합니다.
- 보안성: 보안 취약점이 없어야 합니다.
- 확장성: 미래의 요구사항 변화에 쉽게 대응할 수 있어야 합니다.

…

다양한 기준이 존재하겠지만 위의 대부분의 좋은 코드의 특징들은 “테스트가 용이한 코드” 라는 키워드에 부합한다고 생각한다. 

테스트가 용이하다는 것은 관심사별 모듈화가 잘 되어있고, 이로 인하여 가독성, 유지보수성, 신뢰성, 재사용성, 확장성이 있는 코드가 된다. 또한 테스트 코드는 하나의 문서화의 역할까지 해주기에, 정확히  이렇다 라고 정할 수는 없어도 테스트가 용이한 코드는 좋은 코드다 라고도 할 수 있을 것이다. 

# 어떤 코드가 테스트를 짜는데 편할까?

이 주제에 대해서 논하기 전에 먼저 아래의 코드의 테스트 코드를 작성한다고 생각해보자.

```jsx
const MovieListViewer = () => {
  const [ response, setResponse] = useState({
  	loading: true,
    error: null,
    movies: []
  });

  useEffect(() => {
    fetch('/api/movielist")
     .then(...)
  },[])

  if (response.loading) {
    return <LoadingSpinner />}

  if (response.error) {
    return <ErrorPage error={response.error} />}

  return (
    <div>
      {response.movies.map(...)}
    </div>)
}
```

어떤 기능들이 존재하고, 어떤 것을을 목(mock)으로 만들어 사용해야 할까? 

일단 기능을 먼저 나열해보자면..

- 서버의 상태를 저장할 state를 선언한다.
- 렌더링 이후 /api/movielist 로 요청을 보낸다.
- 응답 이전에는 loading이 true이며, 응답 받은 이후에는 loading이 false, 그리고 error나 movies값이 적절히 들어있어야 한다.
- ui의 경우 서버의 상태에 따라서 에러, 로딩, 요청 성공의 경우에 맞추어 따로따로 렌더링이 된다.

이 기능에 대해서 테스트 케이스를 만들어 보면, fetch로 부터 받아오는 값에 따라서 상태값이 적절히 변경이 되어상태값에 따라서 ui가 적절하게 보여지는지를 테스트 해야 한다. 하지만 이는 온전히 우리의 손으로 해결할 수 없는 위치에 존재한다. 컴포넌트 내부에 서버 요청 로직이 그대로 박혀 있다 보니까 서버의 상태나 반환값에 대해서 조절할 수 없다. 

즉 서버에서 반환되는 값에 따라서 동일한 로직, 동일한 테스트에서 성공할수도, 실패할수도 있게 된다. 

이를 테스트 하려면 http요청 자체를 가로채가는 MSW와 같은 라이브러리를 사용해야만 할 것이다. 하지만 이 또한 테스트에 의존성이 생기므로 좋은 방법이 아닐 수 있다.

> ⚠️ 최근에는 msw를 사용하여 api 로직 자체를 테스트 하기도 한다!
> 

우리가 테스트 과정에서, 해당 로직의 결과를 관리하기 위해서는 목으로 만들 수 있는지에 대해서 생각해볼 필요가 있다. 

## 테스트가 용이하게 변경해보기

그렇다면 이러한 로직을 테스트가 용이하게 변경하려면 어떻게 해야 할까? 

간단히 관심사별로, 혹은 테스트 하고싶은 기능 별로 코드를 분리해주는 방식을 취할 수 있을 것 같다. 

우선 서버 요청 로직이 제대로 동작하는지를 테스트 할 수 있도록 이를 따로 모듈화 해줄 수 있다.

```jsx
// api.js
export const fetchMovieList = () => fetch('/api/movielist').then(res => res.json());
```

그리고 서버 요청 결과값에 대해서 올바르게 상태값을 저장하는 로직을 테스트 해볼 수 있도록 또 다른 모듈을 두게 되었다. 

```jsx
// useMovieList.js
import { useState, useEffect } from 'react';
import { fetchMovieList } from './api';

export const useMovieList = (fetchFunction = fetchMovieList) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchFunction();
        setMovies(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [fetchFunction]);

  return { loading, error, movies };
};
```

여기서 각 모듈(api 로직, 서버 상태 관리 로직)은 각기 다른 테스트를 해주어야 하므로, 목 함수를 넣어줄 수 있도록 api 로직을 함수의 인자로서(props로서) 받아서 이를 사용하도록 하였다. 

테스트를 할 때에는 이렇게 목함수를 주입해줄 수 있다. 

```jsx
// useMovieList.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useMovieList } from './useMovieList';

describe('useMovieList', () => {
  it('성공적으로 영화를 불러옵니다', async () => {
    const mockMovies = [{ id: 1, title: '인셉션' }, { id: 2, title: '인터스텔라' }];
    const mockFetchFunction = jest.fn().mockResolvedValue(mockMovies);

    const { result, waitForNextUpdate } = renderHook(() => useMovieList(mockFetchFunction));

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.movies).toEqual(mockMovies);
  });
})
```

- 전체 테스트 코드
    
    ```jsx
    // useMovieList.test.js
    import { renderHook, act } from '@testing-library/react-hooks';
    import { useMovieList } from './useMovieList';
    
    describe('useMovieList', () => {
      it('초기 상태를 올바르게 설정합니다', () => {
        const { result } = renderHook(() => useMovieList());
        
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBe(null);
        expect(result.current.movies).toEqual([]);
      });
    
      it('성공적으로 영화를 불러옵니다', async () => {
        const mockMovies = [{ id: 1, title: '인셉션' }, { id: 2, title: '인터스텔라' }];
        const mockFetchFunction = jest.fn().mockResolvedValue(mockMovies);
    
        const { result, waitForNextUpdate } = renderHook(() => useMovieList(mockFetchFunction));
    
        await waitForNextUpdate();
    
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.movies).toEqual(mockMovies);
      });
    
      it('오류 발생 시 에러 상태를 설정합니다', async () => {
        const mockError = new Error('API 오류');
        const mockFetchFunction = jest.fn().mockRejectedValue(mockError);
    
        const { result, waitForNextUpdate } = renderHook(() => useMovieList(mockFetchFunction));
    
        await waitForNextUpdate();
    
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(mockError);
        expect(result.current.movies).toEqual([]);
      });
    
      it('fetchFunction이 변경되면 다시 데이터를 불러옵니다', async () => {
        const mockMovies1 = [{ id: 1, title: '인셉션' }];
        const mockMovies2 = [{ id: 2, title: '인터스텔라' }];
        const mockFetchFunction1 = jest.fn().mockResolvedValue(mockMovies1);
        const mockFetchFunction2 = jest.fn().mockResolvedValue(mockMovies2);
    
        const { result, waitForNextUpdate, rerender } = renderHook(
          ({ fetchFunction }) => useMovieList(fetchFunction),
          { initialProps: { fetchFunction: mockFetchFunction1 } }
        );
    
        await waitForNextUpdate();
    
        expect(result.current.movies).toEqual(mockMovies1);
    
        rerender({ fetchFunction: mockFetchFunction2 });
    
        await waitForNextUpdate();
    
        expect(result.current.movies).toEqual(mockMovies2);
      });
    });
    ```
    

서버의 상태에 따라서 다르게 보여줘야 하는 ui 또한 테스트할 수 있도록 따로 모듈화 할 수 있다. 

```jsx
// MovieListViewer.js
import React from 'react';
import { useMovieList } from './useMovieList';
import LoadingSpinner from './LoadingSpinner';
import ErrorPage from './ErrorPage';

const MovieListViewer = ({ fetchMovies = fetchMovieList }) => {
  const { loading, error, movies } = useMovieList(fetchMovies);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default MovieListViewer;
```

이렇게 추상화 레벨을 3단계로 두니 테스트가 정말로 쉬워진 것을 볼 수 있다. 원하는 상태를 조작하여 주입해줄 수 있다.

여기서 주목할 점은 우리의 관심사 외의 것들(예를 들어 UI 에서는 의존하는 상태값들을, 상태값은 의존하고있는 api 로직 및 결과를) 임의로 만들어 (mocking 하여) props나 인자로서 “주입” 한다는 점이다. 

이렇게 작성하는 방법을 “*의존성 주입*”_aka.*DI* 이라고 한다. 

# 의존성 주입(Dependency Injection)

의존성 주입(Dependency Injection, DI)은 소프트웨어 설계 패턴 중 하나로, 객체 지향 프로그래밍에서 자주 사용되는 개념이다. 

이전 설명에서 어느정도 느낄 수 있겠지만, 한 객체가 필요로 하는 다른 객체를 외부로부터 제공받는 방식을 말한다. 덕분에 해당 객체에서는 본인의 내부 로직에만 집중할 수 있게 된다. 해당 객체를 사용할 때 필요에 따라 맞는 객체를 주입해주면 된다. 

의존성 주입이 가져다주는 장점은 아래와 같다. 

- 결합도 감소:
    - 객체가 자신의 의존성을 직접 생성하지 않고 외부에서 받아 사용합니다.
    - 이로 인해 객체 간의 결합도가 낮아집니다.
- 테스트 용이성:
    - 실제 객체 대신 모의 객체(mock)를 주입하여 단위 테스트를 쉽게 수행할 수 있습니다.
- 유연성과 확장성:
    - 구현을 쉽게 변경할 수 있어 시스템의 유연성이 향상됩니다.
    - 새로운 기능을 추가하거나 기존 기능을 수정하기 쉬워집니다.
- 관심사의 분리:
    - 객체는 자신의 주요 기능에만 집중할 수 있습니다.
    - 의존성 관리는 외부(예: DI 컨테이너)에 위임됩니다.
- 병렬 개발:
    - 인터페이스가 정의되면 여러 개발자가 독립적으로 작업할 수 있습니다.

하지만, 코드를 작성하는 입장에서 어느 것을 외부의 개념으로 볼지, 어느것을 내부의 개념으로 볼지에 대해서 헷갈릴 수 있다고 생각한다. 

우리는 장점들 중에서 “테스트 용이성” 에 조금 더 집중해보면 이에 대한 기준을 명확히 할 수 있다. 

이전 에제에서도 알 수 있듯 어떠한 기능을 테스트 하기 위하여 “무엇의 결과를 조작해야 하는지(무엇을 목으로 만들어야 하는지)” 를 생각해보면 된다. 

그리고 이렇게 외부로 뺀 의존성들을 함수의 인자, 컴포넌트의 props로 전달해주도록 하면 된다. 

자연스럽게 테스트는 용이해지고, 좋은 코드의 모습을 갖추게 될 것이다. 

# 결론

- 좋은 코드는 여러 기준이 존재하지만, 테스트의 용이성이 많은 부분을 차지한다.
- 테스트를 용이하게 하기 위해서는, 테스트를 작성하고자 하는 기능이 테스트 되기 위하여 조작해야 하는(mock으로 만들 수 있는 ) 것들이 무엇이 있는지 생각해보아야 한다. 그리고 이를 목으로서 만들어 주입해줄 수 있는 코드로 만들어 주어야 한다.
- 이를 “의존성 주입” 이라고 한다.
- 결론적으로 이와 같은 방식으로 코드를 작성하게 되면 좋은 코드에 가까워지게 된다.

> ⚠️ 단 꼭 테스트가 용이하다고 좋은 코드라고 볼수는 없다. 맨 처음 이야기 했듯 좋은 코드는 명확히 무엇이라고 말할 수 없다. 테스트를 신경쓰게 되면 모듈화의 기준, 추상화의 기준이 조금 더 명확해지며 이에 따라 재사용성 및 확장성이 좋은 코드가 될 수 있다.
> 

---

# 참고 자료

- [https://velog.io/@jay/react-dependency-injection](https://velog.io/@jay/react-dependency-injection)
- [https://martinfowler.com/articles/injection.html#FormsOfDependencyInjection](https://martinfowler.com/articles/injection.html#FormsOfDependencyInjection)