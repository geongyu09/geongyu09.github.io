import { ProjectItem } from '@/types/log';

/** 시작일 내림차순으로 둡니다. 종료일이 '현재'인 항목은 진행 중인 프로젝트입니다. */
const PROJECT_DATA: ProjectItem[] = [
  {
    title: 'Knot',
    startDate: '2026-08-01',
    endDate: '현재',
    category: '팀 프로젝트',
    role: '우아한테크코스 도넛 팀 · FE',
    description:
      '팀 프로젝트에서 흩어진 문서를 뒤져 과거 결정을 다시 찾는 비용을 줄여 주는 문서 탐색 서비스입니다.',
    details: [
      '문서화 페인 포인트 다섯 가지 가운데 "과거 결정 탐색"을 레벨3 목표로 잡았고, 노션 문서 임베딩 RAG 기획서와 가설 검증 대시보드, 팀 인터뷰 정리를 거쳐 기획을 확정했습니다.',
      'webpack 기반 React 환경과 Cloudflare Wrangler 기반 CI/CD, 프론트엔드 공통 하네스 구조를 세웠고 하네스는 team-harness 레포에서 먼저 실험했습니다.',
      '라우팅 초기 설정과 타입 안전한 경로 유틸, Input과 Input field, Spacing 레이아웃, 워크스페이스 생성과 참여 페이지를 머지했습니다.',
      'Core가 로드맵을 정하고 Silo가 FE 한 명과 BE 한 명의 임시 TF로 붙는 구조에서 1주 스프린트를 돌리며 동료 FE PR 리뷰와 QA 유저 플로우 정리를 병행합니다.',
    ],
    href: 'https://github.com/woowacourse-teams/2026-Knot',
  },
  {
    title: 'toss/suspensive 기여',
    startDate: '2026-08-01',
    endDate: '현재',
    category: '오픈소스 기여',
    role: '오픈소스 · 외부 기여자',
    description:
      '산결에서 실제로 쓰는 라이브러리에 낸 첫 외부 기여입니다. @suspensive/react의 with로 만든 컴포넌트가 key 속성을 받도록 고치는 PR을 올렸습니다.',
    details: [
      '@suspensive/react의 with로 감싼 컴포넌트에 key를 넘겨도 전달되지 않던 문제를 고치는 PR을 올렸고 메인테이너 리뷰를 기다리고 있습니다.',
      '산결에서 매일 쓰던 라이브러리라 문제를 사용 중에 발견했고, 남이 만든 코드에 직접 고쳐 넣은 첫 사례가 됐습니다.',
    ],
    href: 'https://github.com/toss/suspensive',
  },
  {
    title: 'stack-link',
    startDate: '2026-07-01',
    endDate: '2026-07-31',
    category: 'npm 패키지',
    role: '개인 · 단독',
    description:
      'View Transitions 기반 전환 엔진과 뒤로가기 인터랙티브 스크럽 제스처를 제공하는 React 스택 네비게이션 라이브러리입니다.',
    details: [
      '웹에서 앱 같은 화면 전환을 하려고 당근 stackflow를 쓰려 했으나 Next.js에서 쓸 수 없어 직접 만들기 시작했습니다.',
      'Provider로 범위를 감싸면 다음 페이지를 옆 iframe에 미리 띄워 prefetch하고, 클릭하면 오른쪽에서 왼쪽으로 슬라이드한 뒤 push하며, 현재와 다음과 이전 세 레이어를 CSS transform으로 움직여 iOS 왼쪽 가장자리 드래그 뒤로가기까지 재현했습니다.',
      'iframe이 별도 브라우징 컨텍스트라 queryClient와 스토리지를 공유하지 못하는 문제가 있었고, iframe 안에서 나가는 요청을 막는 유틸로 임시 대응했습니다.',
      '산결 워크스페이스에서 독립 레포로 옮기며 View Transitions 기반 전환 엔진으로 다시 썼고, 1.0.0까지 올린 뒤 제스처 레이스와 플링 판정을 고친 프리릴리스를 마지막으로 종료했습니다.',
    ],
    href: 'https://github.com/geongyu09/stack-link',
  },
  {
    title: 'who-tech (iftype)',
    startDate: '2026-05-01',
    endDate: '현재',
    category: '오픈소스 기여',
    role: '오픈소스 · FE + BE 컬래버레이터',
    description:
      '산결과 EEOS에서 쌓은 웹뷰 앱 패턴을 외부 프로젝트에 적용한 사례입니다.',
    details: [
      '"모바일 버전 who-tech를 제안합니다" 이슈를 올리고 같은 날 웹뷰 기반 앱 코드를 구현한 PR을 머지했습니다.',
      '피드 우선 진입과 블로그 웹뷰, 기수 탐색을 개선한 v0.0.3을 이어 머지하면서 FE에 이어 BE 컬래버레이터 권한까지 받았습니다.',
      '웹뷰 통신에는 산결에서 만든 @geongyu/bridge를 그대로 가져다 썼습니다.',
    ],
    href: 'https://github.com/iftype/who-tech-frontend',
  },
  {
    title: '@geongyu/bridge',
    startDate: '2026-02-01',
    endDate: '현재',
    category: 'npm 패키지',
    role: '개인 · 단독',
    description:
      '이벤트 기반 단방향 브리지로는 응답을 확인할 수 없어서 요청과 응답을 짝지어 주고받도록 만든 웹뷰 브리지입니다.',
    details: [
      '로그인 웹뷰를 띄우자마자 어떤 소셜 로그인인지 웹에 알려야 했는데, onLoad나 ref로 보내면 window와 이벤트 리스너가 준비되기 전이라 메시지가 유실됐습니다.',
      '앱을 항상 대기하는 서버로, 웹을 간헐 접속 클라이언트로 보고 TCP 3-way handshake를 차용해 웹이 SYN을, 앱이 SYN/ACK를, 웹이 ACK를 보내게 했습니다. 타임아웃 1초는 리눅스 TCP 초기 RTO를 근거로 정했습니다.',
      '받을 때는 컴포넌트, 보낼 때는 훅으로 나눈 첫 구조에서는 응답 처리가 WebView 이벤트 핸들러에 묶여 훅만으로 처리할 수 없었고, 요청과 응답 계층과 콜백 예약 계층의 2계층으로 나눠 풀었습니다.',
      '메시지는 id와 ack, syn 플래그, body로 구성해 ack로 요청과 응답을 구분합니다. 보낸 id를 수신 윈도우 버퍼에 넣었다가 응답이 오면 제거하고 예약해 둔 콜백을 실행합니다.',
      '산결에서 npm 배포 환경을 잡은 뒤 개인 레포로 분리했고 v0.2.1에서 웹뷰 핸드셰이크 재시도와 Inspector 디버그를 더했으며 EEOS 앱과 who-tech 웹뷰 앱에서 재사용했습니다.',
    ],
    href: 'https://github.com/geongyu09/react-native-bridge',
  },
  {
    title: 'Auth-Econovation',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    category: '팀 프로젝트',
    role: '에코노베이션 · FE 단독',
    description:
      '에코노베이션 서비스들에 통합 로그인(SSO)을 제공하는 인증 프론트엔드입니다.',
    details: [
      '그전까지는 서비스마다 JWT를 따로 발급하고 검증했습니다. EEOS는 액세스 토큰을 localStorage에 저장해 다른 도메인이나 서브도메인에서 공유가 안 됐고, 웹뷰 앱에서는 Slack 로그인 페이지가 인증되지 않은 브라우저로 막혀 앱 전환의 선행 조건이 되기도 했습니다.',
      '크래프톤 재직 선배에게 와일드카드 도메인 쿠키 조언을 받아 One Cookie Domain SSO로 방향을 정했고, SSO 웹과 어드민 개발자 콘솔, 공식 문서 사이트를 Bun workspaces 하나로 묶어 각각 별도 Vercel 프로젝트로 배포합니다.',
      '회원가입 검증은 vitest를 처음 붙이면서 TDD로 진행했습니다. 이름과 아이디, 비밀번호, 비밀번호 확인, 기수 검증을 순수 함수 다섯 개로 나눈 뒤 경계값 분석 단위 테스트를 먼저 썼고, 비밀번호가 바뀌면 확인 필드도 즉시 다시 검증해 stale closure를 막았습니다.',
      'v2에서는 vitest를 unit(node)과 integration(jsdom과 MSW) 두 프로젝트로 나눴고, 회원과 클라이언트 seed에 무효화된 refreshToken 집합까지 담은 단일 인메모리 스토어로 MSW를 stateful하게 모킹했습니다.',
      'SPA의 fetch가 cross-origin 302를 따라가며 CORS 오류를 내는 바람에, BE가 200과 바디의 redirectUrl로 응답하고 프론트가 window.location.assign으로 이동하도록 리다이렉트 책임을 옮겼습니다. URL 조립은 단위 테스트가 가능한 순수 함수로, 이동은 부수효과로 분리했습니다.',
      '레포를 열자마자 .claude 하네스(TDD 워크플로우, 에이전트, 규칙)를 먼저 세우고 개발을 시작한 첫 프로젝트이기도 합니다.',
    ],
    href: 'https://github.com/JNU-econovation/Auth-Econovation-FE',
  },
  {
    title: 'Unified Debugger',
    startDate: '2025-11-01',
    endDate: '2026-07-31',
    category: '개발 도구',
    role: '개인 · 단독',
    description:
      'React Native 앱과 그 안의 WebView를 한 화면에서 동시에 디버깅하는 Tauri 데스크탑 도구입니다.',
    details: [
      '산결 QA에서 네이티브 화면은 Expo DevTools로, 웹뷰는 Safari나 Chrome 개발자 도구로 번갈아 열어야 하던 불편에서 시작했습니다.',
      'Chrome DevTools Frontend 소스 빌드, Expo DevTools 플러그인, 멀티 CDP 구조로 세 번 방향을 바꿨습니다.',
      '콘솔과 네트워크 통합 화면을 블로그에 기록한 뒤 cdp-proxy와 web을 단일 포트로 합친 server.js와 포트 자동 선택, Metro 타겟 API, 분할 보기를 갖춘 Tauri 앱으로 패키징해 v0.1.0을 냈습니다.',
    ],
    href: 'https://github.com/geongyu09/multi-devtool',
  },
  {
    title: '산결 (Sangyeol)',
    startDate: '2025-04-01',
    endDate: '현재',
    category: '팀 프로젝트',
    role: '에코노베이션 → san-gyeol · 앱 + 웹 FE 전담',
    description:
      '등산 코스 검색과 실시간 위치 추적, 긴급 신고를 제공하는 크로스 플랫폼 등산 앱입니다.',
    details: [
      '20대가 산행 인구는 하위인데 사고 발생률은 가장 높다는 서울시 소방재난본부 통계를 근거로, 20대에게 산행을 재미있고 안전하게 만드는 것을 목표로 잡았습니다. 대상 산은 무등산입니다.',
      '한 번도 해 보지 않은 앱 개발이라 친숙한 리액트 문법의 React Native를 골랐고, 빠른 사용자 테스트를 위해 화면 대부분을 웹뷰로 만들기로 했습니다.',
      '산행은 실시간이고 지속되는 통신이라 WebSocket을 썼습니다. 페이지를 나가도 유지돼야 해서 통신 주체는 앱이 맡았고, Socket 클래스와 URL별 싱글톤 SocketManager, 구독과 발행형 리스너 갱신, 위치 이벤트마다 거리와 폴리라인과 이탈 여부를 계산하는 도메인 훅으로 나눴습니다.',
      '웹 지도는 화면 회전이 안 돼 바라보는 방향과 정렬할 수 없었습니다. Expo Map과 react-native-maps는 국내 등산로와 건물이 흐렸고 카카오맵은 RN 라이브러리가 없어, 문서가 빈약한 것을 감수하고 네이버 지도 RN 라이브러리를 골라 아이콘과 현재 위치와 헤딩과 경로를 주입받는 ConfigurableMapView를 만들었습니다.',
      'API 변경과 추가가 잦아 웹과 앱에 중복이 생기고 추적 비용이 커지자, api를 워크스페이스로 분리해 환경별 인스턴스(웹은 localStorage, 앱은 secure storage 토큰)를 주입하는 구조로 바꿨습니다. 좌표와 전화번호와 시간과 URL 유틸은 @sangyeol/utils로 뺐습니다.',
      '백그라운드로 갔다가 복귀하면 산행이 멈추던 문제는 AppState로 백그라운드에서 interval을 정지해 고쳤고, 네이버 맵 카메라 변경 시 필수 오버레이 외 렌더링을 막아 줌 변경 시 헤딩 폴리곤이 멈추던 문제를 없앴습니다.',
      'v1 리뉴얼에서는 기존 앱을 app-legacy로 밀어내고 새 앱을 초기화했으며 bridge와 stack-link를 npm 패키지로 바꿔 참조합니다. 기상청과 국립공원공단 정보는 Next.js Route Handler가 HTML을 받아 기온과 체감과 습도와 통제 상황을 파싱하고 revalidate로 캐싱합니다.',
    ],
    href: 'https://github.com/san-gyeol/Sangyeol-FE',
  },
  {
    title: '캡스톤 · CSI 기반 낙상 감지',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    category: '인턴 · 학교',
    role: '전남대 소프트웨어공학과 · 팀원',
    description:
      '박태준 교수님 지도로 멘토링을 받으며 중간 발표와 최종 발표를 마쳤습니다.',
    details: [
      '전남대 소프트웨어공학과 캡스톤 디자인 과제로 진행했고 박태준 교수님이 지도하셨습니다.',
      '"데이터셋 및 전처리" 발표자료를 만들어 맡았고 코드는 capstone 레포에 남아 있습니다.',
    ],
    href: 'https://github.com/geongyu09/capstone',
  },
  {
    title: 'ABAS-FE',
    startDate: '2025-01-01',
    endDate: '2025-05-31',
    category: '인턴 · 학교',
    role: 'bigdata-insight · 인턴 FE',
    description:
      '농업 빅데이터 연구실 인턴으로 데이터 처리와 업로드 페이지의 요구사항 대응을 맡았습니다.',
    details: [
      '매주 인턴 미팅에 참석하면서 데이터 처리 페이지와 업로드 페이지의 요구사항 대응을 담당했습니다.',
      '파일 종류 선택 에러 수정, 옵셔널 체이닝 누락, 비밀번호 정책 regex 변경, 데이터 처리 페이지 요구사항 반영, 업로드와 병합 변경사항 반영을 작업했습니다.',
    ],
  },
  {
    title: '개인 기술 블로그',
    startDate: '2024-08-01',
    endDate: '현재',
    category: '개인 프로젝트',
    role: '개인 · 단독',
    description:
      'Next.js와 GitHub Pages 배포 파이프라인을 직접 구축해 단독 운영하는 기술 블로그입니다.',
    details: [
      'Next.js와 GitHub Pages 배포 파이프라인을 구축한 뒤 전체 기능 구현과 로그 페이지 추가, v2 디자인 시스템 적용과 Next 메이저 업데이트, 블로그 개편과 SEO 메타데이터를 거쳐 RSS까지 정비했습니다.',
      '_posts 디렉토리의 마크다운 파일로 글을 관리하는 파일 시스템 기반 CMS를 씁니다.',
      '주요 글로 「웹뷰 개발을 하면서 고민했던 성능 문제들」, 「부수효과 가득한 프론트엔드에서 함수형으로 살아남기」, 「LLM은 어떻게 개발자가 되는가, Claude Code 해부해보기」, 「Jest는 어떻게 import문을 mocking하는걸까?」 1 ~ 3부, 「상태 끌어올리기의 역설」을 썼습니다.',
    ],
    href: 'https://github.com/geongyu09/geongyu09.github.io',
  },
  {
    title: 'EEOS',
    startDate: '2024-02-01',
    endDate: '2026-06-30',
    category: '팀 프로젝트',
    role: '에코노베이션 Black-company · FE 전담',
    description:
      '동아리 행사의 등록과 출석, 수요조사를 관리하는 서비스입니다. Next.js 웹과 Expo 네이티브를 모노레포로 묶어 FE를 사실상 전담했습니다.',
    details: [
      '행사 한 번마다 채팅방 공지와 체크 이모지 인원 수합이 되풀이됐고 당일에는 회장단과 행사부가 수기로 출석을 체크했습니다. 이런 비용을 줄이려고 출석 체크 온라인화와 행사 아카이빙을 미션으로 잡았습니다.',
      '게스트 모드에서는 한 query에 로그인 여부에 따른 두 동작을 넣으니 캐싱이 깨지고 토큰 검사를 건너뛰어 수정 권한을 못 줬습니다. guest 도메인을 따로 분리해 각 도메인이 하나의 동작만 하도록 책임을 나눴습니다.',
      '회원들이 슬랙으로만 소통하며 수요조사가 방치되는 상황을 확인하고, 필수 참여 행사인 매주 금요일 주간발표 동안만큼은 EEOS 하나로 진행되게 하는 3.0 집중 개편을 했습니다. 관리자 플로우와 출석하기 버튼, 질문 게시판, 발표자료 바로가기가 여기 들어갑니다.',
      '탭 컴포넌트는 멤버 테이블에서 내부 구현을 외부에서 정의해야 하던 문제에서 시작해 FaCC 방식을 거쳐, Context와 useTab 훅과 Tab.List와 Tab.Item과 Tab.Content로 나눈 compound 방식으로 정리했고 지금은 여러 화면에서 재사용됩니다.',
      '3.1 배포 직후 admin 상세의 수정과 삭제 버튼이 간헐적으로 활성화되던 버그는, 프로그램 상세 조회 훅의 queryKey가 programId만 담고 isAbleToEdit을 빼먹어 guest 요청과 admin 요청이 같은 키로 캐싱된 탓이었습니다. 키에 isAbleToEdit을 넣고 기본값을 없애 같은 날 3.1.1로 배포했습니다.',
      'v4.0에서는 모노레포로 전환해 apps/web과 apps/native로 나누고 Expo Router 네 개 탭에 WebView를 연결했습니다. 푸시 알림은 권한 요청과 토큰 발급을 자동화하는 useNotification 훅으로 붙였고, 웹뷰 통신에는 산결에서 갓 npm으로 배포한 @geongyu/bridge를 들여왔습니다.',
    ],
    href: 'https://github.com/JNU-econovation/EEOS-FE',
  },
  {
    title: 'Econovation-recruit',
    startDate: '2024-02-01',
    endDate: '2025-03-31',
    category: '팀 프로젝트',
    role: '에코노베이션 · FE',
    description:
      '동아리 신입모집 플랫폼으로 지원서 작성과 제출, 면접관용 칸반보드, 관리자용 TF 선정과 합불 상태 관리를 제공합니다.',
    details: [
      '서비스 이전에는 TF가 구글폼에서 트렐로와 Zapier, Slack 알림으로 이어지는 자동화를 손으로 돌리고 있었습니다. 합류 당시 코드는 한 달 만에 만들어져 복잡했던 터라, 요구사항은 최대한 빨리 만들면서 시간이 나는 대로 리팩토링하는 방향으로 일했습니다.',
      '합류 직후 classnames 대신 tailwind-merge와 clsx를 합친 cn 유틸을 만들어 className을 받는 컴포넌트 전반에 적용했고 이후 팀 표준이 됐습니다.',
      '토큰을 localStorage에서 쿠키로 옮기고 리다이렉트만 하던 page 파일들을 middleware로 모았습니다. 프론트가 헤더의 토큰을 직접 쿠키에 넣는 방식이 XSS에 취약하다는 리뷰를 받아 BE가 HttpOnly 쿠키로 내려주는 쪽으로 바뀌었습니다.',
      '28기에는 Cypress로 희망분야 페이지와 지원 동기 페이지 시나리오를 썼습니다. beforeEach에서 쿠키와 스토리지를 비워 테스트를 고립시키고 alert 문구와 localStorage 값을 검증하는 커스텀 커맨드도 만들었지만, 뒤 페이지일수록 beforeEach가 앞 페이지들을 실제 입력으로 통과해야 해서 실행 시간이 빌드보다 길어질 수 있다는 한계가 남았습니다.',
      '28기 실모집의 합불 상태관리 페이지에서 useQuery와 useMutation이 같은 키를 공유해야 했던 경험이, react-query를 전부 커스텀 훅으로 감싸자는 Discussion으로 이어져 팀 동의를 얻었습니다.',
      '백엔드와 논의하던 수정을 개발용 대신 운영용에 배포해 실사용 중인 서비스가 잠시 멈춘 사고를 겪었고, 롤백한 뒤 main 머지와 배포를 분리하는 운영 배포 프로세스를 만들었습니다.',
      '29기 지원서 네비게이션 개편에서는 useEffect로 질문을 상태에 넣는 구조 때문에 서버와 클라이언트 렌더가 달라 navbar css가 틀어지는 hydration 버그가 있었고, Navbar와 Question을 dynamic import의 ssr false 옵션과 스켈레톤으로 바꿔 해결했습니다.',
    ],
    href: 'https://github.com/JNU-econovation/econo-recruit-fe',
  },
  {
    title: '너와그린기린그림',
    startDate: '2023-11-01',
    endDate: '2024-06-30',
    category: '팀 프로젝트',
    role: '에코노베이션 *23# · FE 단독',
    description:
      '학생 같은 비전문인도 펀딩을 열고 후원받을 수 있는 대학생 펀딩 중계 서비스입니다.',
    details: [
      '기존 펀딩 사이트는 상업적이고 이미 완성형인 프로젝트가 대부분이라, 동아리 활동처럼 소소한 프로젝트를 여는 대학생은 인지도와 완성도에 밀려 투자를 받지 못하고 접는 경우가 많았습니다. 그래서 비전문인이 펀딩을 열고 후원받을 수 있는 플랫폼을 만들기로 했습니다.',
      'Next 환경 설정과 회원가입, 로그인, 레이아웃, 홈을 먼저 만들어 두고 winter-dev 3주 동안 펀딩 상세와 옵션, 결제 흐름, 홈 필터와 페이지네이션, 검색 디바운스, 서버 연결까지 구현했습니다.',
      '로그인 유지는 처음에 토큰을 localStorage에 두었다가, 로그인한 사용자의 로그인 페이지 접근을 막는 제어를 Next.js 미들웨어로 붙이려 하니 서버에서 도는 미들웨어가 localStorage를 읽을 수 없어서 저장 위치를 쿠키로 옮겼습니다.',
      'S3 업로드 결과 URL을 상태에 넣은 직후 회원가입을 요청하면 리액트의 비동기 업데이트 때문에 이전 값이 실렸습니다. 업로드 응답 URL을 상태를 거치지 않고 제출용 객체에 바로 담는 방식으로 풀었고, 이런 문제와 디바운스 작업이 winter-dev 기술 발표 소재로 이어졌습니다.',
      '헤더의 대학 검색은 입력할 때마다 목록 요청이 나가서 useDebounce 커스텀 훅(500ms)을 만들어 붙였고, TanStack Query의 staleTime을 하루로 두어 같은 검색어의 재요청을 막았습니다.',
      '이슈를 먼저 발행하고 PR을 올려 팀원 approve를 받은 뒤 머지하는 흐름을 여기서 처음 익혔습니다. 기획이 방대해지며 회의마다 같은 논의를 반복한 경험은 "개발을 잘하는 것만으로는 좋은 개발자가 될 수 없다"는 인식으로 이어졌습니다.',
    ],
    href: 'https://github.com/JNU-econovation/girin-grim',
  },
  {
    title: 'Cache-Brain',
    startDate: '2023-09-01',
    endDate: '2023-11-30',
    category: '개인 프로젝트',
    role: '개인 · 단독',
    description: '암기 과목 공부를 돕는 커뮤니티형 학습 플랫폼입니다.',
    details: [
      'DB 대신 Headless CMS(Sanity)를 쓰고 프론트엔드와 서버를 Next.js 하나로 통합했으며, 인증에는 NextAuth를 데이터 페칭에는 SWR 컨텍스트를 붙였습니다.',
      '유저와 카드 상세, 학습 페이지, 캐러셀, 진행도 구조로 뼈대를 먼저 만든 뒤 디렉토리 구조와 url 모듈을 리팩터링했습니다.',
      '마지막으로 검색 모달과 search API, useDebounce를 직접 구현했습니다.',
    ],
    href: 'https://github.com/geongyu09/Cache-Brain',
  },
];

export default PROJECT_DATA;
