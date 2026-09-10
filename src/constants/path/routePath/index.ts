/**
 * next.config의 trailingSlash 설정과 canonical URL에 맞춰
 * 모든 내부 링크가 끝에 슬래시를 갖도록 합니다.
 * 슬래시가 빠지면 정적 호스팅에서 링크마다 리다이렉트가 한 번씩 더 발생합니다.
 */
const ROUTE_PATH = {
  HOME: '/',
  LOG: '/log/',
  /** 로그 상세는 /log 위에 병렬 경로로 얹히는 모달이라 주소도 /log 아래에 둡니다. */
  LOG_PROJECT: ({ id }: { id: string }) => `/log/project/${id}/`,
  LOG_EXPERIENCE: ({ id }: { id: string }) => `/log/experience/${id}/`,
  LOG_PRESENTATION: ({ id }: { id: string }) => `/log/presentation/${id}/`,
  POSTS: (prop?: { tag?: string }) =>
    `/posts/${prop?.tag ? `${encodeURIComponent(prop.tag)}/` : ''}`,
  POST_DETAIL: ({ slug }: { slug: string }) => `/post/${slug}/`,
};

export default ROUTE_PATH;
