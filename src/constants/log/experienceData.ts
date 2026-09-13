import { ActivityItem } from '@/types/log';

/** 시작일 내림차순으로 둡니다. 종료일이 '현재'인 항목은 아직 이어 가는 활동입니다. */
const EXPERIENCE_DATA: ActivityItem[] = [
  {
    id: 'woowacourse-8',
    title: '우아한테크코스 8기 수료',
    startDate: '2026-02-24',
    endDate: '현재',
    org: '우아한형제들',
    role: '프론트엔드 8기',
    roleLabel: '구분',
    description:
      '우아한형제들이 운영하는 우아한테크코스 프론트엔드 과정으로, 정답이 없는 질문 앞에서 스스로 답을 찾아 나가는 자세를 기르려 노력했고, AI 시대에도 변하지 않는 개발자의 기본기를 탄탄하게 가져가려고 의식적으로 연습하며 성장한 시간이었습니다.',
    thumbnail: '/assets/log/experience/woowacourse-8.webp',
    thumbnailAlt: '우아한테크코스 로고',
    traits: [
      {
        title: '혼자 잘하기보다 함께 자라기',
        paragraphs: [
          '저는 지식을 나누는 선순환의 가치를 인지하고, **지식 공유를 하는 장을 직접 구성하는 주도적인 모습**을 보였습니다.',
          '단순히 어렵게 쌓은 지식을 저 스스로의 경쟁력으로 생각하고 나만의 것으로 남기게 되면 이는 언젠가 고이고 썩어 맞는지 틀린지조차 확인할 수 없게 된다고 생각합니다. 그렇기에 **지식은 밖으로 흘러야 한다**고 생각합니다.',
          '제가 먼저 지식을 공유하기 시작하면 덩달아 다른 인원들이 본인의 지식을 나누며 **서로가 서로를 자라게 하는 환경**이 자연스럽게 만들어지게 됩니다. 그리고 저는 **이런 환경을 솔선수범하여 형성하는 사람**입니다.',
        ],
        evidences: [
          {
            text: '미션에서 사용한 useSyncExternalStore 훅에 대한 지식을 공유하고자 크루를 모아 함께 공부하고 서로에게 설명해보는 시간을 가졌으며, 이후 프론트엔드 수업시간에 전체 인원 앞에서 공부한 useSyncExternalStore 훅에 대한 전이 활동(발표)을 하였습니다.',
            href: '/post/wootecoLevel2SecondHalfReview/#usesyncexternalstore-발표',
          },
          {
            text: '레벨1 7주차(04월 초) 비동기 수업 뒤 궁금증이 남아 바로 크루들과 회의실을 잡고 디버깅 도구로 이벤트 루프 동작을 이해하는 활동을 열었습니다.',
            href: '/post/wootecoWeek7And8Review/#js-비동기와-이벤트-루프',
          },
          {
            text: '개인적으로 공부한 Suspense, startTransition, useDeferredValue 내용을 바탕으로 발표회를 열어 크루들에게 설명하는 시간을 가졌습니다.',
            href: '/post/wootecoLevel2SecondHalfReview/#level-2를-마무리하면서..-혼자-잘하기보다-함께-자라기',
          },
          {
            text: '산책 중 나온 "컴포넌트를 어떻게 나누는 게 맞을까?"라는 이야기를 바탕으로 각자 라이브 코딩하면서 기준을 설명해 보는 워킹그룹을 열었습니다.',
            href: '/post/wootecoLevel2Week1To4Review/#워킹그룹-1회차',
          },
          {
            text: '레벨2 6주차 주말(06월 초) 의존성 주입 수업 후, 크루들과 주말에 캠퍼스에 나와 화이트보드에 APP, Service, Repository 의존 관계를 그려 슬랙에 공유했습니다.',
            href: '/post/wootecoLevel2SecondHalfReview/#백엔드와-객체지향',
          },
          {
            text: '재사용성 기준으로 컴포넌트를 어떻게 분리하는 것이 좋을지에 대한 토론회를 열었습니다.',
            href: '/post/wootecoLevel2SecondHalfReview/#두-번째-워킹그룹',
          },
          {
            text: '함수형 원정대(03-09 ~ 03-20)에서 책을 읽고 설명하는 단계에 토스 스터디 사례를 참고한 페어 프로그래밍 형태의 리팩토링 활동을 제안했습니다.',
            href: '/post/wootecoWeek3And4Review/#송곳-원정대',
          },
          {
            text: '리액트 딥다이브 스터디를 직접 열어 『모던 리액트 Deep Dive』 릴레이 발표회를 매주 월요일마다 운영했습니다.',
            href: '/post/wootecoLevel2Week1To4Review/#도넛스터디',
          },
          {
            text: '크루들에게 compound와 headless 패턴 공유 발표를 열었습니다.',
          },
        ],
      },
      {
        title: '목표를 이루기 위한 전투학습',
        paragraphs: [
          '세상은 혼란스럽고 명확하고 정직한 정답이 없습니다. 이런 세상에서 성장하는 사람이 되기 위해서는 누군가 정해 준 방향에 기대는 대신 **스스로 질문을 세우고 그 답에 닿기까지 필요한 지식을 직접 골라 파고드는 전투학습**을 익히는 것이 중요하다고 생각합니다.',
          '개발에 대한 개념을 학습하기 위해서 누군가가 정한 커리큘럼만을 따라가는 것이 아닌, **목적을 정하고 이를 이루기 위한 지식을 필요에 따라 습득하는 방식**으로 학습법을 가져갔습니다.',
          '한 가지의 질문을 던지고 이에 답을 하기 위하여 필요한 **모든 지식을 수단을 가리지 않고 공부해나가며**, **혼란스러운 현실 속에서 성장할 수 있는 자세**를 갖추는 모습을 보여줬습니다.',
        ],
        evidences: [
          {
            text: 'TDD 미션 수행 중, "Jest는 어떻게 import문을 mocking하는가"라는 궁금증을 품게 되었고, Node와 CommonJS 모듈 시스템, jest-runtime의 격리 컨텍스트와 커스텀 require, babel-jest 호이스팅까지 공부를 진행하고 기록으로 남겼습니다.',
            href: '/post/jestImportMocking1/',
          },
          {
            text: 'vdom 딥다이브 원정대를 이끌면서 해당 공부 방식을 원정대원에게 전이하였습니다. 매일 한 가지의 질문을 던지고, 그 질문의 답을 얻기 위한 전투 학습 이후 발표 방식의 타임박싱으로 원정대를 이끌었습니다.',
            href: '/post/wootecoLevel2Week1To4Review/#송곳-원정대',
          },
          {
            text: 'useSyncExternalStore 전투학습(06-08)에서 "왜 필요한지", "기존 방식으로는 무엇이 문제였는지" 같은 질문 4개를 뽑아 30분 공부한 뒤 화이트보드에 구독과 스냅샷 동작을 그리고 다음 날 수업에서 발표했습니다.',
            href: '/post/wootecoLevel2SecondHalfReview/#usesyncexternalstore-발표',
          },
        ],
      },
    ],
    levels: [
      {
        label: 'Level 1',
        paragraphs: [
          'JS 기본기와 HTML, CSS, JS로 기본적인 웹 개발을 하는 데 필요한 기술을 공부하였습니다.',
          '그 과정에서 좋은 코드를 좇기 위하여 TDD와 도메인, UI 분리를 연습하고 저만의 공부법을 확립하였으며, 페어 프로그래밍으로 협업과 토론 같은 소프트 스킬을 기를 수 있는 기간이었습니다.',
        ],
        missions: [
          {
            title: '로또 미션',
            links: [
              {
                label: '1단계 콘솔 기반 로또',
                href: 'https://github.com/woowacourse/javascript-lotto/pull/428',
              },
              {
                label: '2단계 웹 기반 로또',
                href: 'https://github.com/woowacourse/javascript-lotto/pull/459',
              },
            ],
            reviews: [
              { label: '2주차 회고', href: '/post/wootecoWeek2Review/' },
            ],
            paragraphs: [
              '1단계에서 도메인과 UI를 잘 분리하여 2단계에서 UI를 바꾸는 동안 도메인 코드를 전혀 건드리지 않았고 그 과정에서 어디까지가 도메인이고 어디까지가 UI인지 경계를 확인할 수 있었습니다. 자주 바뀌는 것이 자주 바뀌지 않는 것에 의존하는 설계에 대한 많은 고민을 할 수 있는 시간이었습니다.',
              '첫 페어 프로그래밍에서 당연하다고 여기던 제 코드를 말로 설명하고 설득하는 일이 생각보다 어렵다는 사실을 처음 겪었는데 "자연스러워 보인다"는 말 대신 근거를 제시해야 설득이 된다는 것을 배웠습니다.',
            ],
          },
          {
            title: 'TS와 학습법 튜닝하기',
            links: [
              {
                label: '제출 PR',
                href: 'https://github.com/woowacourse/ts-and-learning/pull/22',
              },
            ],
            reviews: [
              { label: '5, 6주차 회고', href: '/post/wootecoWeek5And6Review/' },
            ],
            paragraphs: [
              '『우아한 타입스크립트 with 리액트』의 현업 사례와 AI가 생성한 문제 풀이로 "개념을 넘어 실제로 적용하는 것"을 목표로 삼았습니다.',
              '빠르게 성장하는 크루들은 어떻게 공부하는지 알고 싶어 크루 6명과 개인 인터뷰를 진행했습니다. 모르는 개념을 처음 만났을 때와 개념을 머릿속에 넣는 사고 과정, 공부 이후의 행동을 묻는 질문 3개를 던졌습니다. 인터뷰로 얻은 답은 액션 아이템 5개로 정리했는데 개념을 한 문장으로 정의하기, AI에게 힌트만 요청하기, 코드 흐름을 소리 내어 설명하는 러버덕 세션, 학습 후 물음표 목록 남기기, 모든 것을 의심하며 가설을 세우고 검증하기입니다.',
            ],
          },
          {
            title: '영화 리뷰',
            links: [
              {
                label: '1단계 영화 목록 구현',
                href: 'https://github.com/woowacourse/javascript-movie-review/pull/278',
              },
              {
                label: '2단계 영화 상세 구현',
                href: 'https://github.com/woowacourse/javascript-movie-review/pull/309',
              },
              {
                label: '배포 링크',
                href: 'https://geongyu09.github.io/javascript-movie-review/',
              },
            ],
            reviews: [
              { label: '5, 6주차 회고', href: '/post/wootecoWeek5And6Review/' },
              { label: '7, 8주차 회고', href: '/post/wootecoWeek7And8Review/' },
            ],
            paragraphs: [
              '페어와 추상화 시점에 대해서 논쟁이 있었고, 코치와 크루, 현업 지인, 리뷰어와 같은 질문을 나눈 끝에 리팩토링 시점과 정도는 현업에서도 정답이 없는 문제이며 팀이 목표를 이루느냐가 더 중요하다는 결론을 내리게 됐습니다.',
            ],
          },
        ],
      },
      {
        label: 'Level 2',
        paragraphs: [
          'React와 msw, React Testing Library 등의 기술 스택을 공부하고, 모던 웹을 개발하는 데 필요한 역량을 기르고자 하였습니다.',
        ],
        missions: [
          {
            title: '페이먼츠',
            links: [
              {
                label: '1단계 결제 정보 입력 폼',
                href: 'https://github.com/woowacourse/react-payments/pull/517',
              },
              {
                label: '2단계 hooks & state',
                href: 'https://github.com/woowacourse/react-payments/pull/548',
              },
              {
                label: '3단계 MSW & Async & Testing',
                href: 'https://github.com/woowacourse/react-payments/pull/568',
              },
            ],
            reviews: [
              {
                label: 'Level 2 1~4주차 회고',
                href: '/post/wootecoLevel2Week1To4Review/',
              },
            ],
            paragraphs: [
              '1단계는 리액트가 처음인 페어와 함께 진행하여, 제가 아는 것을 먼저 꺼내 서로의 지식의 위치를 맞춘 뒤 두 방안의 장단점을 함께 놓고 고르는 방식으로 코드를 썼습니다.',
              '응집도 있는 저만의 리액트 폴더 구조를 구축하고자 노력하였습니다. 함께 변하는 결합도 있는 코드들을 colocation 폴더 구조로 가져갔습니다.',
              '함께 변하지 않으며 재사용되는 단위는 도메인을 덜어낸 코드들이라는 기준을 잡고, 공통 훅과 컴포넌트에서 도메인 로직을 제거하여 재사용성을 높이고 도메인이 붙은 코드는 그 코드를 쓰는 기능 폴더 안에만 두도록 하였습니다.',
            ],
          },
          {
            title: '장바구니/상품목록 풀스택',
            links: [
              {
                label: '1단계 BE 서버 구축',
                href: 'https://github.com/woowacourse/shopping-cart-full-stack/pull/16',
              },
              {
                label: '2단계 FE 장바구니 페이지 구현',
                href: 'https://github.com/woowacourse/shopping-cart-full-stack/pull/48',
              },
              {
                label: '3단계 결제 시스템 설계',
                href: 'https://github.com/woowacourse/shopping-cart-full-stack/pull/77',
              },
              {
                label: '4단계 결제 시스템 FE, BE 구현',
                href: 'https://github.com/woowacourse/shopping-cart-full-stack/pull/82',
              },
            ],
            reviews: [
              {
                label: 'Level 2 후반기 회고',
                href: '/post/wootecoLevel2SecondHalfReview/',
              },
            ],
            paragraphs: [
              '계층 분리와 응집도의 중요성, 그리고 인터페이스가 상호 규약이라는 것을 깨닫는 시간이었습니다.',
              '설계는 완벽할 수 없으며 트레이드오프의 산물이고 오늘의 요구사항을 만족하고 내일의 변경을 쉽게 받아들이는 설계를 하려면 분야를 가리지 않는 폭넓은 경험이 필요하다고 생각했습니다.',
            ],
          },
        ],
      },
    ],
    links: [
      {
        href: 'https://www.woowacourse.io/',
        label: '우아한테크코스 소개',
      },
      {
        href: 'https://www.youtube.com/watch?v=wKqjOI5kdgU',
        label: '10분 테코톡 발표 영상',
      },
    ],
  },
  {
    id: 'econovation',
    title: '동아리 에코노베이션 활동',
    startDate: '2023-09-25',
    endDate: '2026-01-23',
    org: '전남대학교 에코노베이션',
    role: '26기 · 관리부장',
    description:
      '학부 2학년 2학기에 26기로 들어가 졸업 직전까지 활동한 IT 동아리로, 지금까지 한 팀 프로젝트와 기술 발표, 스터디 대부분이 여기에서 나왔습니다.',
    sections: [
      {
        label: '프로젝트',
        items: [
          {
            title: '너와그린기린그림',
            meta: '2023.11 ~ 2024.06',
            paragraphs: [
              '기존 펀딩 사이트는 상업적이고 이미 완성형인 프로젝트가 대부분이라, 동아리 활동처럼 소소한 프로젝트를 여는 대학생은 인지도와 완성도에 밀려 투자를 받지 못하고 접는 경우가 많았습니다. 그래서 대학생들을 위한 펀딩을 열고 후원받을 수 있는 플랫폼을 만들기로 했습니다.',
            ],
            links: [
              { href: '/log/project/neowagreen/', label: '프로젝트 상세' },
            ],
          },
          {
            title: 'Econovation-recruit와 econo-homepage',
            meta: '2024.02 ~ 2025.03',
            paragraphs: [
              '신입모집 플랫폼 개발팀에 합류해 27기 실모집 대응, 28기의 Cypress E2E와 합불 상태관리 페이지, 29기의 지원서 네비게이션 개편과 실모집 버그 대응을 하였습니다.',
              '홈페이지 레포에서는 기수마다 모집 일정과 포트폴리오를 갱신했습니다.',
            ],
            links: [
              {
                href: '/log/project/econovation-recruit/',
                label: '프로젝트 상세',
              },
            ],
          },
          {
            title: 'EEOS',
            meta: '2024.02 ~ 2026.06',
            paragraphs: [
              'EEOS는 Econovation Event Operation System의 준말로 동아리 내에서의 행사 등록, 출석, 수요조사를 관리하는 서비스입니다.',
              '동아리 회원이 아닌 인원이 확인할 수 있는 게스트 모드와 슬랙 알림의 release 2.2, 주간발표 집중 개편의 3.0, 마이페이지와 얼리버드의 3.1, 캘린더와 출석 통계의 3.2, 모노레포 전환을 거친 React Native 웹뷰 앱 v4.0과 SSO 연동 v4.0.5까지 진행하였습니다.',
            ],
            links: [{ href: '/log/project/eeos/', label: '프로젝트 상세' }],
          },
          {
            title: 'Auth-Econovation',
            meta: '2026.01 ~ 2026.06',
            paragraphs: [
              '이후 동아리 내부 서비스를 개발할 때 동아리원의 SSO 로그인을 지원하기 위한 서비스를 개발하였습니다.',
              'EEOS 회의에서 로그인 통합이 앱 전환과 함께 상위 과제로 뽑혔고 웹뷰 앱에서 Slack 로그인 페이지가 막혀 앱 전환의 선행 조건이 되자 SSO를 최우선 과제로 해결하고자 프로젝트를 진행하게 됐습니다.',
            ],
            links: [
              {
                href: '/log/project/auth-econovation/',
                label: '프로젝트 상세',
              },
            ],
          },
          {
            title: '산결',
            meta: '2025.04 ~ 현재',
            paragraphs: [
              '20대 대상 산행 안내 앱을 맡았고, 앱 개발 경험이 없는 상태에서 익숙한 React 문법을 쓰는 React Native를 고른 뒤 빠른 사용자 테스트를 위해 화면 대부분을 Next.js 웹뷰로 띄우는 방향을 택했습니다.',
            ],
            links: [{ href: '/log/project/sangyeol/', label: '프로젝트 상세' }],
          },
        ],
      },
      {
        label: '관리부장',
        meta: '2024.06 ~ 2025.05',
        paragraphs: [
          '관리부는 동아리의 기자재와 인프라, 특히 개발용과 제품용 서버 두 대의 IP, 포트, 자원을 관리하는 부서입니다.',
          '새로운 환경 속에서 인수인계 문서가 잘 짜여지지 않은 상태로 부서를 맡게 되어, 처음부터 동아리 자원의 네트워크 인프라 환경을 구축하고 그 절차를 문서로 남기는 활동을 하였습니다.',
        ],
        lists: [
          {
            label: '인프라 환경',
            items: [
              '교내 정보전산원 네트워크 (방화벽 및 IP 할당)',
              '서버 : Proxmox / VMware',
              'DNS : Cloudflare',
            ],
          },
        ],
        items: [
          {
            title: '동아리방 이사와 서버 복구',
            meta: '2025.01',
            paragraphs: [
              '동아리방을 옮기면서 서버 컴퓨터를 물리적으로 이전하고 그 안 VM에서 돌던 동아리 홈페이지, 신입모집 서비스, 개발 서버를 다시 동작시켜야 했습니다.',
              '"서버 복구 및 외부에서 접속 가능하게 만들기"를 과제로 잡고 로컬 네트워크 접속 확인, 외부에서 Proxmox 대시보드 접근, 각 VM 외부 접속 세 단계로 TODO를 나눴습니다.',
              '첫 단계부터 대시보드에 접속되지 않아 랜선을 반복해서 뽑았다 꽂으며 시스템 로그에 찍히는 변화로 실제 살아있는 랜 포트를 찾아낸 뒤 네트워크 설정 파일을 고쳐 연결을 살릴 수 있었습니다.',
              '특정 IP의 VM이 ping에 아무 반응이 없고 딱 하나만 되는 상태임을 확인했고, 교내 정보전산원의 특수한 네트워크라 고정 IP를 줘도 내외부 연결이 차단돼 있어 네트워크 보안팀에 VM별 IP와 MAC 주소 매핑을 전달해 허용받은 뒤 네트워크를 구축하게 됐습니다.',
              'DNS 레코드를 보니 한 VM에 여러 서비스 트래픽이 몰려 그 VM이 죽으면 다른 서비스도 접근이 막히는 구조라 단일 장애점으로 판단해 각 VM으로 바로 접속하도록 레코드를 고쳤고, 도메인 옆에 포트를 붙여 접속하던 방식은 Cloudflare Rules로 포트포워딩을 적용해 정리했으며 불필요한 Nginx 프록시 설정을 걷어내고 프록시 경로도 한 VM이 모든 트래픽을 감당하지 않게 바꿨습니다.',
              '사흘 동안 새벽 2~3시에 귀가하며 트러블 슈팅 과정을 기록했고 후임에게 같은 상황이 오지 않도록 배운 내용까지 정리해 인수인계가 가능하게 했습니다. 실제로 신입 부원이 들어올 때 그 문서로 인수인계가 진행됐고 관리부를 나온 뒤에도 부원들 사이에서 "관리부 바이블"로 불린다는 말을 들었습니다.',
              '스위치와 IP 할당, 도메인 설정에 네트워크 지식이 절실했던 경험이 CS 스터디를 여는 계기가 됐고, 관리부원과 함께 그 지식을 쌓아 갔습니다.',
            ],
          },
        ],
      },
      {
        label: '스터디 운영과 참여',
        items: [
          {
            title: 'Donut Study',
            meta: '2024.03 ~ 2024.06',
            paragraphs: [
              'React를 처음 접하는 동아리원이 많고 저 스스로도 깊이 있게 공부하고 싶었으며, 현업 선배와 연결점을 만들고 싶다는 동기로 "현업자 리뷰를 곁들인 구현 및 학습 스터디"를 기획했습니다.',
            ],
            lists: [
              {
                label: '한 일',
                items: [
                  '스터디장으로서 1주차부터 10주차까지 구현 미션 7건을 직접 출제했고, 참여자로서 제 미션 PR 9건도 제출했으며 미션 코드에 졸업한 현업 선배들이 코드리뷰를 달게 연결했습니다. 미션은 컴포넌트, state, 이벤트, useEffect 같은 개념 미션 5주와 게임, 계산기, TODO 같은 간단 제품 미션으로 설계했습니다.',
                ],
              },
              {
                label: '러닝 포인트',
                items: [
                  '멘토로 참여해주신 현업 개발자 선배님들에게 참여 원동력을 제공하지 않다보니 그만큼 리뷰가 늦어지는 현상이 있었습니다. 부가적으로 스터디 자체가 처음이다보니, 구체적인 룰이 없었으며 기간이 지나치게 길었고 구현 문제를 혼자 출제해야 해 지속 가능성이 없었다는 문제를 회고하면서 깨달을 수 있었습니다.',
                ],
              },
            ],
          },
          {
            title: '자아스스터디',
            meta: '2024.06 ~ 2024.07',
            paragraphs: [
              '동아리 선배가 운영한 『코어 자바스크립트』 8주 스터디에 참여하였습니다.',
              '자바스크립트를 정리하려는 목적도 있었고 부가적으로 다른 사람이 운영하는 스터디가 어떻게 돌아가는지도 보고 싶다는 생각을 하게 되어 참여하게 됐습니다.',
              '운영자가 말을 유도하는 방식, 진행 절차, 스터디원의 반응을 매 순간 분석하며 7회를 참여했습니다.',
            ],
            lists: [
              {
                label: '한 일',
                items: [
                  '『코어 자바스크립트』를 정독하고 정리하며 자바스크립트의 기본기를 다졌습니다.',
                ],
              },
              {
                label: '러닝 포인트',
                items: [
                  '참여도와 분위기는 좋았지만 랜덤 3명 발표가 겹치고 발표만 1~2시간이 걸려 토론 시간이 부족하다는 점을 봤고 두 스터디 경험과 스터디 운영 아티클을 함께 회고해 "모든 참여자가 득을 봐야 한다, 참여를 유도하는 장치가 필요하다, 기간이 길면 안 된다, 발표 시간을 줄이고 토론 비중을 늘린다, 발표 내용이 겹치지 않아야 한다"는 다섯 원칙을 세웠습니다.',
                ],
              },
            ],
          },
          {
            title: 'CS 스터디',
            meta: '2024.11 ~ 2026.01',
            paragraphs: [
              '관리부원과 지원자 일부를 받아 6명으로 연 스터디입니다.',
              '『후니의 쉽게 쓴 CISCO 네트워킹』과 『HTTP 완벽 가이드』를 읽으면서 네트워크 지식을 쌓아가는 경험을 하였습니다.',
            ],
            lists: [
              {
                label: '한 일',
                items: [
                  '매주 스터디가 끝나자마자 "오늘 진행 방식은 어땠나요, 개선할 점이 있을까요"를 묻는 회고를 두어 공부 분량 선택 방식과 일정 조율 방법을 고쳤고 정리본을 올리지 않으면 리마인더를 보내는 당번과 댓글을 돌아가며 다는 시스템을 스터디원과 함께 짰습니다.',
                  '스터디에서 정리한 『후니의 쉽게 쓴 CISCO 네트워킹』과 『HTTP 완벽 가이드』 노트(캐시, 게이트웨이, 프록시)가 동아리방 서버 복구, 웹뷰 브리지 설계, EEOS 캐시 키 버그 대응의 배경 지식이 됐습니다.',
                ],
              },
            ],
          },
          {
            title: '모던 JavaScript 스터디와 타입스크립트 스터디',
            meta: '2025.07 ~ 2026.01',
            paragraphs: [
              '2025년에는 두 학기 모두 신입부원 멘토로 들어가 모던 JavaScript 스터디와 타입스크립트 스터디를 직접 기획하고 운영했고, 커리큘럼만 따라가는 대신 왜 배우고 어디에 쓰는지까지 함께 이야기하려 했습니다.',
            ],
          },
        ],
      },
      {
        label: '기술 발표',
        items: [
          {
            title: 'props drilling 문제와 해결방법',
            meta: '2023.12.01 · 주간발표 3차 (*23# 팀)',
            paragraphs: [
              '컴포넌트 트리와 리프팅 업에서 생기는 불필요한 의존과 리렌더링, Context의 한계, 상태관리 라이브러리 권장을 다뤘습니다.',
            ],
            links: [
              { href: '/log/presentation/props-drilling/', label: '발표 자료' },
            ],
          },
          {
            title: 'React의 비동기 업데이트와 디바운스',
            meta: '2024.01.25 · 2024 Winter DEV',
            paragraphs: [
              'girin-grim의 S3 업로드 상태 문제와 대학 검색 디바운스 트러블슈팅을 다뤘습니다.',
            ],
            links: [
              {
                href: '/log/presentation/react-async-update-debounce/',
                label: '발표 영상',
              },
            ],
          },
          {
            title: '빠른 변경사항 반영을 위한 Headless Pattern',
            meta: '2024.07.26 · 2024 Summer DEV (Black-company 팀)',
            paragraphs: [
              '실사용자 피드백으로 요구사항이 계속 바뀌는 EEOS에서 컴포넌트를 외부 데이터와 내부 데이터와 UI로 나누고, 멤버 테이블 탭의 상태 끌어올리기 문제부터 FaCC와 compound까지 단계별로 설명했습니다.',
            ],
            links: [
              {
                href: '/log/presentation/headless-pattern/',
                label: '발표 영상',
              },
            ],
          },
          {
            title: '웹 프론트엔드 개발자의 앱 개발기',
            meta: '2025.04.11 · 주간발표 2차 (4! 팀)',
            paragraphs: [
              '인액터스 협업의 네이티브 요구와 짧은 기간, RN을 고른 이유, 공식 문서와 커뮤니티의 한계, 스프린트 전 기술 검증을 다뤘습니다.',
            ],
            links: [
              { href: '/log/presentation/webview-intro/', label: '발표 자료' },
            ],
          },
          {
            title: '안전한 앱과 웹 통신을 위한 프로토콜 설계',
            meta: '2025.07.25 · 2025 Summer DEV (4! 팀)',
            paragraphs: [
              'postMessage 방식의 문제 네 가지와 TCP 개념 차용, 메시지 타입과 RWnd, 3-way handshake 코드를 다뤘습니다.',
            ],
            links: [
              {
                href: '/log/presentation/webview-protocol-design/',
                label: '발표 영상',
              },
            ],
          },
        ],
      },
      {
        label: '기술 글',
        paragraphs: [
          '동아리 기술 블로그에 프로젝트를 하면서 붙잡고 있던 문제와 그 해결 과정을 글로 남겼습니다.',
        ],
        items: [
          {
            title: 'React Query에서 캐시와 서버 상태',
            meta: '2024.07.31 · 동아리 기술 블로그',
            paragraphs: [
              'CPU와 메모리 사이에 캐시를 두는 컴퓨터 구조를 서버와 브라우저 사이의 네트워크에 대입해, 클라이언트 상태와 서버 상태를 나눠 정의하고 React Query가 왜 서버 상태를 따로 맡는 라이브러리인지를 적었습니다.',
              'fetch와 useState, useEffect로 직접 캐싱까지 구현하면 어떤 비용이 드는지 코드로 보인 뒤, 캐싱된 값이 fresh일 때와 stale일 때 React Query가 각각 어떻게 움직이는지 정리했습니다.',
            ],
            links: [
              {
                href: 'https://jnu-econovation.github.io/tech/2024/07/31/React-Query%EC%97%90%EC%84%9C-%EC%BA%90%EC%8B%9C%EC%99%80-%EC%84%9C%EB%B2%84-%EC%83%81%ED%83%9C.html',
                label: '글 읽기',
              },
            ],
          },
          {
            title: '웹뷰 브리지 라이브러리 개발 기록',
            meta: '2025.09.16 · 동아리 기술 블로그',
            paragraphs: [
              '산결에서 React Native 웹뷰와 네이티브 앱이 postMessage만으로 메시지를 주고받을 때 메시지 형식을 정하기 어렵고, 이벤트 기반 코드가 리액트 생명주기와 맞지 않으며, 웹이 로드되기 전에 보낸 메시지가 사라지고, 응답이 없어 전달과 에러를 알 수 없다는 네 가지 문제를 겪은 과정을 적었습니다.',
              '이미 나와 있는 라이브러리 대신 필요한 기능만 가진 가벼운 코드를 직접 만들기로 하고, TCP의 3-way handshake를 빌려 통신이 가능해지는 시점을 잡는 방법과 메시지 타입 정의, 리액트 훅 API, 응답과 에러 처리를 갖춰 나간 설계를 정리했습니다.',
            ],
            links: [
              {
                href: 'https://jnu-econovation.github.io/tech/2025/09/16/%EC%9B%B9%EB%B7%B0-%EB%B8%8C%EB%A6%AC%EC%A7%80-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EB%A1%9D.html',
                label: '글 읽기',
              },
            ],
          },
        ],
      },
      {
        label: '신입모집 TF와 운영팀',
        meta: '2024.02 ~ 2024.04',
        paragraphs: [
          '27기 신입모집 TF에 들어가 리크루팅 전 과정에 참여하였습니다.',
          '구글폼에서 트렐로, Zapier, 슬랙 알림으로 이어지는 접수 자동화를 붙였고, 현수막을 설치했으며, 면접관 시간 조사를 거쳐 사흘간 면접관 다섯 차례와 문지기 역할을 맡았습니다.',
        ],
      },
      {
        label: '기타',
        paragraphs: [
          '멘토링과 팀코칭 일정에 2024년 상반기 9회, 하반기 15회, 2025년 상반기 16회 참석하여 신입 기수의 온보딩 및 공부 환경 구축, 빠른 성장을 위하여 최선을 다하는 모습을 보여줬습니다.',
          '다른 팀 레포에서도 BuddyBridge_FE PR 2건(2025년 1월, 낙관적 업데이트와 드롭다운 리팩토링)과 Moongtaengi-FE PR 3건(2025년 11~12월, 회원가입과 유효성 검증)을 리뷰했습니다.',
        ],
      },
    ],
    links: [
      {
        href: 'https://econovation.kr/',
        label: '에코노베이션 소개',
      },
    ],
  },
  // {
  //   id: 'agriculture-bigdata-lab',
  //   title: '농업 빅데이터 연구실 학생 연구원',
  //   startDate: '2024-12-24',
  //   endDate: '2025-06-30',
  //   org: 'bigdata-insight',
  //   role: '학생 연구원 · FE',
  //   description:
  //     '학부 마지막 학기에 연구실 인턴으로 들어가 ABAS 프론트엔드의 데이터 처리와 업로드 화면을 맡았습니다.',
  //   activities: [
  //     '매주 인턴 미팅에 참석하면서 ABAS-FE의 데이터 처리 페이지와 업로드 페이지 요구사항 대응을 담당했습니다.',
  //     '파일 종류 선택 에러와 옵셔널 체이닝 누락을 고치고 비밀번호 정책 regex를 바꿨으며, 업로드와 병합 변경사항을 반영했습니다.',
  //   ],
  // },
  {
    id: 'kakao-tech-campus-2',
    title: '카카오 테크 캠퍼스 2기 수료',
    startDate: '2024-04-08',
    endDate: '2024-11-22',
    org: '카카오 테크 캠퍼스',
    role: 'FE 교육생',
    roleLabel: '구분',
    description:
      '카카오가 주최한 대학 캠퍼스 연계 부트캠프로, 매주 주어지는 구현 미션과 라이브 수업, 현업 개발자의 코드 리뷰와 피드백을 받을 수 있는 소중한 기회를 얻어, 받은 리뷰를 다음 미션에 다시 반영하고 하반기에는 팀 프로젝트로 협업까지 겪으면서 8개월 동안 열심히 성장하고자 했습니다.',
    thumbnail: '/assets/log/experience/kakao-tech-campus-2.webp',
    thumbnailAlt: '카카오 테크 캠퍼스 소개 이미지',
    paragraphs: [
      '1단계와 2단계 교육 과정에서 강의를 듣고 매주 나오는 미션을 수행하면서 코딩 기본기를 다져 갔습니다. 라이브 특강으로 프론트엔드 강의를 들을 때는 이해되지 않는 부분을 바로 물어봤고, 구현 미션은 제출할 때마다 현업 개발자에게 코드 리뷰를 받았습니다. 리뷰를 받을 때는 일부러 여러 방향으로 코드를 짜 보고 고민한 내용을 함께 적어 두면서 어떤 방향이 나은지 좁혀 갔습니다.',
      '팀이 성공으로 가려면 개개인의 마음가짐과 능력도 필요하기 때문에, 팀원 모두가 같은 목표를 보게 만들고 그 목표를 막는 요소를 걷어내는 일이 중요하다고 생각하게 됐습니다. 매 순간 이상적인 팀과 협업할 수는 없으니, 이런 상황을 이른 시기에 겪어 본 것이 앞으로 쓸 소프트 스킬 자산이 된다고 생각합니다.',
    ],
    links: [
      {
        href: 'https://www.kakaotechcampus.com/',
        label: '카카오 테크 캠퍼스 소개',
      },
      {
        href: '/post/remind2024/#카카오-테크-캠퍼스',
        label: '2024 회고에 적은 기록',
      },
    ],
  },
];

export default EXPERIENCE_DATA;
