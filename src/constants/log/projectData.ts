import { ProjectItem } from '@/types/log';

/** 시작일 내림차순으로 둡니다. 종료일이 '현재'인 항목은 진행 중인 프로젝트입니다. */
const PROJECT_DATA: ProjectItem[] = [
  {
    id: 'knot',
    title: 'Knot',
    startDate: '2026-08-01',
    endDate: '현재',
    category: '팀 프로젝트',
    org: '우아한테크코스',
    role: 'FE',
    description:
      '팀 프로젝트에서 흩어진 문서를 뒤져 과거 결정을 다시 찾는 비용을 줄여 주는 문서 탐색 서비스입니다.',
    details: [
      {
        tag: '기여',
        title: '공개 열흘 동안 퍼널 두 개로 이탈 구간 찾기',
        images: [
          {
            src: '/assets/log/project/knot/process.webp',
            alt: '출시와 퍼널 측정부터 배포 전후 비교까지 여섯 단계로 나눈 가설검증 순서',
            caption: '가설검증을 따라간 순서',
          },
          {
            src: '/assets/log/project/knot/funnel12.webp',
            alt: '혼자 쓰는 곳과 함께 쓰는 곳을 나눠 그린 첫 가치 퍼널과 다시 쓰기 퍼널',
            caption: '첫 가치 퍼널과 다시 쓰기 퍼널',
          },
          {
            src: '/assets/log/project/knot/narrow2.webp',
            alt: '단계마다 다음 단계로 넘어간 비율을 기대치 90%와 비교한 막대그래프',
            caption: '퍼널이 갑자기 좁아지는 구간',
          },
          {
            src: '/assets/log/project/knot/changes.webp',
            alt: '버전마다 찾은 문제와 바꾼 기능, 확인할 숫자를 배포 순서로 나열한 표',
            caption: '배포 순서로 본 찾은 것과 바꾼 것',
          },
        ],
        text: '10월 19일 Knot을 공개한 뒤 열흘 동안 309명이 방문해 워크스페이스 59곳이 생겼지만, 59곳 중 48곳이 혼자 쓰는 워크스페이스였고 처음 쓰인 지 7일이 지난 40곳 가운데 첫 주 안에 문서까지 연 곳은 13곳(32%)에 그쳤습니다.\n\n팀은 한 주 동안 녹음을 끝내고 문서도 연 워크스페이스 수를 목표 지표로 두고, 사용 흐름을 워크스페이스 생성부터 처음 문서를 열기까지의 첫 가치 퍼널과 다음 회의 때 다시 녹음하는지 보는 다시 쓰기 퍼널로 나눈 뒤 단계 사이 통과율이 미리 정해 둔 기대치(대부분 90%)보다 크게 낮은 구간마다 원인 가설을 세웠습니다.\n\n저는 사용 기록과 세션 리플레이를 남기려고 PostHog를 Knot에 연결했고, 팀은 PostHog에 쌓인 화면 녹화와 클릭 기록을 워크스페이스마다 보면서 빠진 이유를 묶었으며, 워크스페이스 수가 작아 한두 곳이 비율을 크게 바꾸기 때문에 3일 값으로 1차 판정을 하고 7일 값으로 최종 판정을 하기로 했습니다.\n\n함께 쓰는 워크스페이스는 단계마다 91%에서 100%가 다음 단계로 넘어갔지만 혼자 쓰는 워크스페이스는 녹음 시도(60%), 녹음 시작(63%), 문서 생성(44%) 세 구간에서 크게 빠졌고, 세 구간에 세운 가설을 판정해 다음 배포에서 고칠 곳을 정했습니다.',
        links: [
          {
            href: 'https://github.com/woowacourse-teams/2026-Knot/pull/730',
            label: 'PR: PostHog 연결',
          },
        ],
      },
      {
        tag: '기여',
        title: '녹음 버튼을 바꿔 첫 방문 녹음 시도율 올리기',
        images: [
          {
            src: '/assets/log/project/knot/record-button.webp',
            alt: '마이크 모양 녹음 버튼을 고리 안 붉은 원으로 바꾸고 첫 사용 안내를 두 칸으로 나눈 전후 화면',
            caption: '녹음 버튼과 첫 사용 안내의 전후',
          },
          {
            src: '/assets/log/project/knot/sub-a2.webp',
            alt: '옛 버튼과 새 버튼의 첫 방문 녹음 버튼 클릭 비율 47%와 68%를 비교한 그래프',
            caption: '녹음 버튼을 바꾼 뒤 혼자 쓰는 곳의 행동',
          },
          {
            src: '/assets/log/project/knot/funnel-weeks.webp',
            alt: '10월 19일 주와 10월 26일 주에 생긴 혼자 쓰는 워크스페이스의 처음 24시간 퍼널',
            caption: '녹음 버튼 개선 전후의 주간 퍼널',
          },
        ],
        text: '혼자 쓰는 워크스페이스 45곳 중 27곳(60%)만 녹음을 시도해 기준 70%에 못 미쳤고, 시도하지 않은 18곳의 화면 녹화에서는 홈을 둘러보고 떠난 곳이 12곳, 헤맨 곳이 3곳이었으며 사용자 피드백에서는 녹음 버튼이 음성 입력처럼 보이고 기본 상태가 희미하다는 말이 나왔습니다.\n\n팀은 원인을 녹음 버튼이 음성 입력처럼 보여 녹음 기능인지 알아보지 못하는 경우와 녹음할 회의가 없어 둘러보고 떠나는 경우로 나눴고, 팀원이 녹음 버튼을 고리 안 붉은 원으로 바꾸고 첫 사용 안내를 채팅과 회의 녹음 두 칸으로 나눈 v0.4.0을 배포한 뒤 배포 전후에 처음 쓰인 혼자 쓰는 워크스페이스를 첫 방문 기준으로 비교했습니다.\n\n첫 방문에서 녹음 버튼을 누른 비율은 47%(32곳 중 15곳)에서 68%(19곳 중 13곳)로, 지금까지 시도한 비율은 56%에서 74%로 올라 기준 70%를 넘었고 시도하지 않은 곳 가운데 헤맨 곳은 3곳에서 0곳이 됐지만, 새 버튼 쪽 표본이 19곳뿐이라 11월 3일에 나오는 7일 값으로 다시 확정할 예정입니다.',
      },
      {
        tag: '기여',
        title: '마이크 권한 안내 창 개선과 나머지 원인 찾기',
        images: [
          {
            src: '/assets/log/project/knot/modal.webp',
            alt: '[닫기]와 [다시 시도]가 있던 옛 권한 안내 창과 [확인] 하나만 둔 새 안내 창, 두 창을 본 뒤 녹음을 시작한 비율',
            caption: '마이크 권한 안내 창의 전후',
          },
        ],
        text: '공개 전 팀 내부 확인에서 마이크 권한을 한 번 거절한 사용자가 안내 창의 [다시 시도]를 눌러도 같은 창만 반복해서 뜨는 문제를 찾았는데, 브라우저는 한 번 거절한 권한을 사이트가 다시 요청해도 권한 창을 띄우지 않아 [다시 시도]가 같은 거절만 되풀이했고 10월 16일 사용자 테스트에서는 [다시 시도]를 10초 동안 21번 누른 사람도 있었습니다.\n\n저는 안내 창의 [닫기]와 [다시 시도]를 [확인] 버튼 하나로 바꾸고 제목을 「마이크 권한이 꺼져 있어요」로 고쳐 주소창에서 마이크를 허용하는 방법을 알렸으며, 마이크를 다시 받는 일은 독의 마이크 버튼과 「이어서 녹음」 버튼에 맡기고 안내 창에서 권한을 다시 요청하던 코드는 지웠습니다.\n\n같은 거절을 몇 초 사이에 수십 번 받는 모습은 사라졌지만 안내 창을 본 뒤 30분 안에 녹음을 시작한 사람은 옛 창 30%(10명 중 3명), 새 창 19%(16명 중 3명)로 늘지 않았는데, 옛 창 10명은 대부분 사용자 테스트 현장에서 팀원이 옆에서 도운 사람이라 두 값을 같은 조건으로 비교하기는 어렵습니다.\n\n권한에서 막히지 않은 21명은 95%가 녹음을 시작한 반면 바로 막힌 13명은 23%만 시작해 녹음을 시작하지 못하는 원인이 권한 단계에 있다는 가설은 맞는 것으로 판정됐고, 안내를 따라 권한을 허용하고 새로고침까지 했지만 마이크 장치가 없어 2분 동안 5번 실패한 사례도 찾았기 때문에 다음 배포에서는 안내를 처음 거절, 이미 막힘, 마이크 없음 세 상황으로 나누고 사용자가 단계를 봤는지와 권한이 바뀌었는지를 기록하기로 했습니다.',
        links: [
          {
            href: 'https://github.com/woowacourse-teams/2026-Knot/pull/836',
            label: 'PR: 마이크 권한 안내 창 개선',
          },
        ],
      },
      {
        tag: '기여',
        title: '문서가 생기지 않는 원인 찾기와 홈 녹음 기록 카드',
        images: [
          {
            src: '/assets/log/project/knot/c-outcome3.webp',
            alt: '끝난 녹음 79건의 정리 결과를 버전과 녹음 길이로 나눈 막대그래프',
            caption: '버전별로 본 끝난 녹음의 정리 결과',
          },
          {
            src: '/assets/log/project/knot/failure.webp',
            alt: '정리 화면에만 보이던 실패를 v0.6.0 홈 카드와 v0.7.0 녹음 기록 카드로 옮긴 전후 화면',
            caption: '홈에서 보이는 녹음 실패와 다시 시도',
          },
        ],
        text: '녹음을 끝낸 혼자 쓰는 워크스페이스 16곳 중 7곳(44%)만 문서가 만들어졌고 함께 쓰는 곳은 100%였기 때문에, 팀은 전사와 문서 만들기가 실패하거나 사용자가 결과를 기다리지 못하고 떠난다는 가설을 세웠습니다.\n\n문서까지 못 간 9곳의 녹음 길이와 정리 결과를 서비스 DB로 확인하니 9곳 모두 2초에서 1분짜리 시험 녹음이었고 실제 회의를 녹음했는데 정리에 실패한 곳은 없어서 가설은 틀린 것으로 판정했으며, 들어오자마자 녹음을 시작한 곳이라도 12분에서 56분짜리 실제 회의를 녹음했다면 모두 문서까지 갔습니다.\n\n같은 시기에 백엔드 팀원들이 전사를 안정화했고, 저는 정리 화면에서만 보이던 실패를 홈에서도 알 수 있도록 v0.7.0에서 녹음마다 처리 상태와 「다시 시도」 버튼을 보여 주는 홈 녹음 기록 카드를 만들었습니다.\n\n30초 넘는 녹음 중 주제별 문서까지 만들어진 비율은 v0.6.0 전 85%(39건 중 33건)에서 v0.7.0 뒤 95%(20건 중 19건)로 올랐고, 다시 시도한 녹음 10건 중 7건이 문서까지 갔으며 살리지 못한 3건은 8초에서 14초짜리 시험 녹음이었습니다.',
        links: [
          {
            href: 'https://github.com/woowacourse-teams/2026-Knot/pull/1038',
            label: 'PR: 홈 녹음 기록 카드',
          },
        ],
      },
      {
        tag: '기여',
        title: '회의 하나를 한 화면에서 읽는 녹음 문서',
        images: [
          {
            src: '/assets/log/project/knot/d-docs.webp',
            alt: '만들어진 문서 289개 중 열린 문서와 30초 넘게 머문 문서, 한 번 열 때 머문 시간의 분포',
            caption: '만들어진 문서가 읽힌 정도',
          },
          {
            src: '/assets/log/project/knot/recording-document.webp',
            alt: '주제별 문서를 하나씩 넘기던 화면과 회의 요약, 녹음 다시 듣기, 문서를 한 화면에 모은 녹음 문서',
            caption: '회의 하나를 한 화면에서 보는 녹음 문서',
          },
          {
            src: '/assets/log/project/knot/document-tab.webp',
            alt: '폴더별 문서 목록을 녹음별과 주제별 탭으로 나눈 전후 화면',
            caption: '문서 탭을 녹음별과 주제별로 나눈 전후',
          },
          {
            src: '/assets/log/project/knot/sub-c4.webp',
            alt: '배포 전후에 30초 넘게 읽힌 회의 비율과 주제별 문서 비율을 비교한 그래프',
            caption: '녹음 문서 배포 전후의 읽힌 비율',
          },
        ],
        text: '10월 28일 오전까지 만들어진 문서 289개 중 사용자가 연 문서는 139개(48%), 30초 넘게 머문 문서는 37개(13%)였고, 녹음 하나에서 주제별 문서가 가운데값 6개씩 생기다 보니 10초 안에 닫은 260번 중 63번은 같은 녹음의 다른 문서로 넘어갔으며 세 팀 네 명이 「회의 단위로 보고 싶다」, 「같은 녹음인지 모르겠다」는 피드백을 줬습니다.\n\n팀은 화면 녹화와 클릭 기록, 피드백으로 이유 후보마다 신호를 세어 녹음 하나가 여러 문서로 쪼개져 회의를 한번에 볼 수 없다는 원인과 어느 회의에서 나온 문서인지 모른다는 원인부터 고치기로 했고, 10월 26일 팀 회의에서 저도 함께 홈과 문서 탭 개편 방향을 정한 뒤 홈의 「최근 추가된 문서」 카드를 녹음 기록 카드로 바꾸고 회의 요약과 녹음 다시 듣기와 해당 회의의 문서를 한 화면에 모은 v0.7.0을 다음 날 배포했습니다.\n\n판정 기준을 결과를 보기 전에 정해 두었는데, 연 주제별 문서 중 30초 넘게 읽힌 비율이 배포 전 27%에서 41%로 올랐고 배포 뒤 이틀 동안 문서를 연 워크스페이스 14곳 중 13곳이 녹음 문서를 열었습니다.',
      },
      {
        tag: '기여',
        title: '온라인 회의 소리를 함께 담는 녹음 기능',
        images: [
          {
            src: '/assets/log/project/knot/meeting-audio.webp',
            alt: '녹음 바 아래의 화상 회의 상대방 목소리 칸과 공유 창 설정을 안내하는 연결 모달',
            caption: '화상 회의 상대방 목소리를 함께 녹음하는 화면',
          },
        ],
        text: 'Knot 녹음은 독의 마이크로 시작해 마이크 소리만 받았기 때문에, 사용자 인터뷰에서 온라인 회의를 녹음하면 상대방 목소리가 녹음에서 빠진다는 문제가 나왔습니다.\n\n저는 Knot 노션의 인터뷰와 회의록, 피드백 접수함 89건과 경쟁 도구 자료를 모아 온라인 녹음 기획 근거를 정리해 10월 26일 회의에서 발표했고, Chrome 계열 브라우저에서 회의 탭이나 회의 앱 화면을 공유받아 회의 소리를 마이크 소리와 섞어 같은 녹음에 담도록 구현하면서 서버가 받는 형식(WebM, PCM16 16kHz mono)은 바꾸지 않았습니다.\n\n녹음 화면에는 마이크 줄과 온라인 회의 줄을 보여 주는 「녹음하는 소리」 패널과 회의 위치 선택, 녹음 고지, 이어폰 권장을 담은 연결 안내 모달을 넣었고, 회의 소리를 받을 수 없는 Safari와 Firefox, 휴대폰에서는 지원하지 않는다는 안내를 보여 줬습니다.\n\nv0.7.0 배포 뒤 이틀 동안 함께 녹음을 누른 2명 중 1명이 연결에 성공했고, 누른 사람 중 절반 이상이 연결한다는 목표는 11월 3일에 나오는 7일 값으로 판정할 예정입니다.',
        links: [
          {
            href: 'https://github.com/woowacourse-teams/2026-Knot/pull/1029',
            label: 'PR: 온라인 회의 녹음',
          },
        ],
      },
    ],
    links: [
      { type: 'repo', href: 'https://github.com/woowacourse-teams/2026-Knot' },
      { type: 'site', href: 'https://knoted.kr/' },
    ],
    preview: 'https://knoted.kr/',
  },
  // {
  //   id: 'suspensive-contribution',
  //   title: 'toss/suspensive 기여',
  //   startDate: '2026-08-01',
  //   endDate: '현재',
  //   category: '오픈소스 기여',
  //   org: '오픈소스',
  //   role: '외부 기여자',
  //   description:
  //     '산결에서 실제로 쓰는 라이브러리에 낸 첫 외부 기여입니다. @suspensive/react의 with로 만든 컴포넌트가 key 속성을 받도록 고치는 PR을 올렸습니다.',
  //   details: [
  //     '@suspensive/react의 with로 감싼 컴포넌트에 key를 넘겨도 전달되지 않던 문제를 고치는 PR을 올렸고 메인테이너 리뷰를 기다리고 있습니다.',
  //     '산결에서 매일 쓰던 라이브러리라 문제를 사용 중에 발견했고, 남이 만든 코드에 직접 고쳐 넣은 첫 사례가 됐습니다.',
  //   ],
  //   links: [{ type: 'repo', href: 'https://github.com/toss/suspensive' }],
  // },
  {
    id: 'stack-link',
    title: 'stack-link',
    startDate: '2026-07-01',
    endDate: '2026-07-31',
    category: 'npm 패키지',
    org: '개인',
    role: '단독',
    description:
      'View Transitions 기반 전환 엔진과 뒤로가기 인터랙티브 스크럽 제스처를 제공하는 React 스택 네비게이션 라이브러리입니다.',
    details: [
      {
        text: '앱은 버튼을 누르면 전환 애니메이션과 함께 이미 그려진 다음 화면이 들어오는데, 웹뷰로 띄운 웹은 이전 화면이 잠깐 남아 있다가 흰 화면을 거쳐 콘텐츠가 하나씩 나타났고, 뒤로가기 버튼이 없는 iOS에서는 화면을 쓸어 되돌아갈 방법조차 없었습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/webAppComp.gif',
          alt: '웹과 앱의 화면 전환을 함께 띄워 비교한 영상',
          caption: '웹과 앱의 화면 전환 비교',
        },
      },
      {
        text: '화면 전환을 앱이 맡으면 되겠다고 생각해서 라우트 하나마다 웹 주소 하나를 짝지어 두고 웹이 브리지로 이동을 요청하면 앱이 새 웹뷰를 띄우는 방식으로 먼저 만들었고, 웹뷰인데도 전환만큼은 앱과 다르지 않았습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/navigateWithBridge.gif',
          alt: '앱이 화면 전환을 맡아 웹뷰를 새로 띄우는 시연',
          caption: '네비게이션을 앱에 맡긴 첫 방식',
        },
      },
      {
        text: '그런데 화면마다 브리지 로직이 하나씩 필요했고 dynamic route와 쿼리 파라미터와 태그까지 더하면 스프린트 두 번 만에 라우트 테이블이 이만큼 늘어났으며, 웹은 앱의 주소와 전환 효과를 앱은 웹의 주소를 서로 알고 있어야 해서 화면을 하나 늘릴 때마다 양쪽을 같이 고쳐야 했습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/routeTable.png',
          alt: '스프린트 2까지 정리한 웹과 앱의 라우트 매핑 표',
          caption: '스프린트 2까지 쌓인 라우트 테이블',
        },
      },
      '더 큰 문제로 화면마다 웹뷰를 새로 띄우다 보니 화면마다 브라우저가 따로였고, 토큰과 쿠키와 스토리지는 물론 react-query가 들고 있던 서버 상태 캐시까지 공유하지 못했으며, 전환할 때마다 HTML과 CSS와 JS를 처음부터 다시 받느라 없애려던 흰 화면이 그대로 남고 메모리 사용량만 늘었습니다. 전환을 앱에 맡기는 구조로는 풀리지 않겠다고 보고 웹 안에서 전환을 끝내기로 방향을 바꿨습니다.',
      {
        text: '웹 안에서 전환을 끝내는 라이브러리로 당근에서 만든 stackflow를 먼저 가져다 쓰려 했지만 Next.js를 쓰는 환경에서는 동작하지 않는다는 이슈를 확인했고, 기왕 이렇게 된 김에 직접 만들기로 했습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/image-285.png',
          alt: 'stackflow가 Next.js를 지원하지 않는다고 적힌 이슈 화면',
          caption: 'stackflow를 쓸 수 없던 이유',
        },
      },
      {
        text: '만들기 전에 앱의 전환을 먼저 뜯어봤습니다. expo가 주는 전환 효과 가운데 실제로 자주 쓰는 것은 오른쪽에서 왼쪽으로 미는 slide와 투명도가 바뀌는 fade 두 가지였고, 둘 다 고유한 애니메이션이 있으면서 애니메이션이 도는 동안 다음 화면이 이미 그려진 채로 움직인다는 점이 같아서 두 효과를 목표로 잡았습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/useOften.gif',
          alt: '앱에서 자주 쓰는 slide 전환과 fade 전환 시연',
          caption: '앱에서 자주 쓰는 두 전환',
        },
      },
      {
        text: '개발은 다 만들어져 있다고 치고 쓰는 쪽 코드를 먼저 적어 두는 방식으로 시작했습니다. Next.js app router에서 이동을 맡는 Link와 같은 자리에 놓고 쓸 수 있도록 이름과 props를 맞췄습니다.',
        links: [
          {
            href: 'https://github.com/JNU-econovation/Sangyeol-FE/tree/develop/packages/stack-link',
            label: '당시 소스',
          },
        ],
        code: {
          lang: 'tsx',
          caption: '먼저 적어 둔 쓰는 쪽 코드',
          code: `
            <StackLinkProvider>
              <section className="flex grow gap-4">
                <StackLink href="/list/1" preLoad animation="slide">
                  <Item1 />
                </StackLink>
              </section>
            </StackLinkProvider>
          `,
        },
      },
      {
        text: '전환은 지금 보고 있는 화면과 다음 화면을 서로 다른 레이어에 올려 두고 두 레이어를 함께 움직이는 방식으로 잡았습니다. 보고 있는 화면은 stack-main에 두고 다음 화면은 stack-root에 두었으며, Provider가 범위를 감싸면서 stack-root를 포털 자리로 넘겨 주게 했습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/image-289.png',
          alt: 'stack-main과 stack-root가 좌우로 움직이는 슬라이드 전환 형상그림',
          caption: '슬라이드 전환 형상그림',
        },
        code: {
          lang: 'tsx',
          caption: '두 레이어를 만들어 두는 Provider',
          code: `
            export default function StackLinkProvider({ children }: PropsWithChildren) {
              const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

              useEffect(() => {
                setPortalElement(document.getElementById('stack-root'));
              }, []);

              return (
                <StackContext.Provider value={{ portalElement }}>
                  {/* 지금 보고 있는 화면 */}
                  <div
                    id="stack-main"
                    style={{ position: 'relative', transform: 'translateZ(0)' }}
                  >
                    {children}
                  </div>

                  {/* 다음 화면이 들어올 레이어 */}
                  <div id="stack-root" />
                </StackContext.Provider>
              );
            }
          `,
        },
      },
      {
        text: '다음 화면을 미리 그려 두는 데는 iframe을 썼습니다. 이동할 주소는 StackLink가 props로 이미 받아 두었으므로, 화면 크기만 한 iframe을 stack-root에 포털로 띄워 화면 오른쪽 밖에 세워 두었습니다.',
        code: {
          lang: 'tsx',
          caption: '다음 화면을 미리 띄워 두는 포털',
          code: `
            {portalElement &&
              createPortal(
                <div
                  ref={preloadFrameRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {preLoad && <Iframe src={href} />}
                </div>,
                portalElement,
              )}
          `,
        },
      },
      {
        text: 'slide는 사용자가 StackLink를 누른 순간 stack-main을 왼쪽으로 20%만큼 밀고 오른쪽 밖에 세워 둔 iframe 레이어를 화면 안으로 끌어온 다음, 애니메이션이 끝나는 시점에 router.push로 실제 주소를 옮기면서 stack-main을 제자리로 되돌리도록 만들었습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/slide.gif',
          alt: '오른쪽에서 왼쪽으로 화면이 밀려 들어오는 슬라이드 전환 시연',
          caption: '구현한 slide 전환',
        },
        code: {
          lang: 'tsx',
          caption: 'slide 전환을 만드는 부분',
          code: `
            const slideScreen = useCallback(() => {
              const main = document.getElementById('stack-main');

              // 보고 있던 화면을 왼쪽으로 20%만큼 밀어 둡니다.
              main.style.transition = \`transform \${animDuration}ms ease-in-out\`;
              main.style.transform = 'translateX(-20%)';

              // 오른쪽 밖에 세워 둔 다음 화면을 화면 안으로 끌어옵니다.
              preloadFrameRef.current.style.transition = \`transform \${animDuration}ms ease-in-out\`;
              preloadFrameRef.current.style.transform = 'translateX(-100%)';

              // 애니메이션이 끝나는 시점에 실제 주소로 이동합니다.
              timerRef.current = setTimeout(() => {
                main.style.transition = '';
                main.style.transform = 'translateX(0)';
                main.style.zIndex = '-999';
                router.push(href);
              }, animDuration);
            }, [animation, href, router]);
          `,
        },
      },
      {
        text: 'fade는 같은 흐름에서 움직이는 값만 바꾸면 되어서, stack-main의 opacity를 1에서 0으로 보내고 미리 띄워 둔 화면의 opacity를 0에서 1로 보냈습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/fade.gif',
          alt: '앞 화면이 사라지며 다음 화면이 떠오르는 fade 전환 시연',
          caption: '구현한 fade 전환',
        },
        code: {
          lang: 'ts',
          caption: 'fade 전환을 만드는 부분',
          code: `
            if (animation === 'fade') {
              main.style.transition = \`opacity \${animDuration}ms ease-in-out\`;
              main.style.opacity = '0';

              preloadFrameRef.current.style.transform = 'translateX(-100%)';
              preloadFrameRef.current.style.transition = \`opacity \${animDuration}ms ease-in-out\`;
              preloadFrameRef.current.style.opacity = '1';

              timerRef.current = setTimeout(() => {
                main.style.transition = '';
                main.style.opacity = '1';
                router.push(href);
              }, animDuration);
            }
          `,
        },
      },
      {
        text: '전환을 웹이 맡았으니 뒤로가기도 웹이 맡아야 했습니다. 안드로이드는 뒤로가기 버튼과 제스처가 있지만 iOS는 화면을 왼쪽에서 오른쪽으로 쓸어 되돌아가고, 쓸어내는 동안 현재 화면이 손가락을 따라 밀려나면서 이전 화면이 미리 그려진 채로 따라 나옵니다.',
        image: {
          src: '/assets/blog/appLikeWeb/iosBack.gif',
          alt: 'iOS에서 화면을 쓸어 이전 화면으로 돌아가는 기본 모션',
          caption: 'iOS의 기본 뒤로가기 모션',
        },
      },
      {
        text: '제스처를 인식하려면 시작 지점이 필요해서 화면 왼쪽 끝에 평소 사용에 걸리지 않을 만큼 좁고 투명한 트리거를 두었고, 트리거를 잡으면 터치를 시작한 x 좌표와 지금 좌표의 차이만큼 stack-main이 손가락을 따라오도록 했습니다.',
        image: {
          src: '/assets/blog/appLikeWeb/image.png',
          alt: '화면 왼쪽 끝에 둔 좁고 투명한 뒤로가기 제스처 트리거 영역',
          caption: '왼쪽 끝에 둔 제스처 트리거',
        },
        code: {
          lang: 'tsx',
          caption: '손가락을 따라 화면을 끌고 가는 부분',
          code: `
            // 터치를 시작한 x 좌표와 지금 좌표의 차이만큼 현재 화면을 끌고 갑니다.
            const handleMove = (clientX: number) => {
              const deltaX = clientX - startX;
              if (deltaX > 0) {
                main.style.transform = \`translateX(\${deltaX}px)\`;
              }
            };

            <div
              onTouchStart={(e) => {
                setStartX(e.touches[0].clientX);
                setIsTouching(true);
              }}
              onTouchMove={(e) => {
                if (!isTouching) return;
                handleMove(e.touches[0].clientX);
              }}
            />;
          `,
        },
      },
      {
        text: '손을 떼는 시점에는 끌고 온 거리가 임계점인 50px을 넘었는지를 보고, 넘겼으면 현재 화면을 오른쪽 끝까지 밀고 이전 화면을 중앙으로 가져온 뒤 router.back으로 주소까지 되돌리며, 넘기지 못했으면 잡기 전 위치로 되돌아가는 애니메이션을 보여 줍니다.',
        code: {
          lang: 'ts',
          caption: '임계점을 넘었는지 판정하는 부분',
          code: `
            const handleEnd = () => {
              const deltaX = currentX - startX;

              // 임계점을 넘겼으면 현재 화면을 밀어내고 이전 화면을 중앙으로 가져옵니다.
              if (deltaX > 50) {
                main.style.transform = 'translateX(100%)';
                main.style.transition = \`transform \${DEFAULT_DURATION}ms ease-in-out\`;

                previousScreenPreview.style.transform = 'translateX(0%)';
                previousScreenPreview.style.transition = \`transform \${DEFAULT_DURATION}ms ease-in-out\`;

                setTimeout(() => {
                  router.back();
                  pop();
                }, DEFAULT_DURATION);

                return;
              }

              // 넘기지 못했으면 잡기 전 위치로 되돌립니다.
              main.style.transform = 'translateX(0px)';
              main.style.transition = \`transform \${DEFAULT_DURATION}ms ease\`;
            };
          `,
        },
      },
      {
        text: '다음 화면의 주소는 StackLink가 알지만 이전 화면의 주소는 알 수 없어서, Provider에 history 상태를 두고 이동할 때마다 이전 주소와 이동할 주소를 한 쌍으로 쌓았습니다. 가장 최근에 쌓인 쌍의 이전 주소를 stack-previous 자리의 iframe에 띄워 두면 뒤로가는 동안 이전 화면도 미리 그려진 채로 따라 나옵니다.',
        image: {
          src: '/assets/blog/appLikeWeb/back.gif',
          alt: '왼쪽 가장자리를 끌어 이전 화면으로 돌아가는 뒤로가기 제스처 시연',
          caption: '구현한 뒤로가기 제스처',
        },
        code: {
          lang: 'tsx',
          caption: 'history를 쌓고 이전 화면을 띄우는 부분',
          code: `
            const push = useCallback((path: PathTuple) => {
              setHistory((prev) => [...prev, path]);
            }, []);

            const pop = useCallback(() => {
              setHistory((prev) => prev.slice(0, -1));
            }, []);

            // 가장 최근에 쌓인 쌍의 이전 주소를 미리 띄워 둡니다.
            <div
              id="stack-previous"
              style={{ transform: 'translateX(-20%)', zIndex: -1 }}
            >
              {history.length > 0 && history[history.length - 1][0] && (
                <Iframe src={history[history.length - 1][0]} />
              )}
            </div>;
          `,
        },
      },
      {
        text: 'iframe은 별도의 브라우징 컨텍스트라서 queryClient도 스토리지도 공유하지 못했고, iframe에서 멀쩡히 보이던 화면이 stack-main으로 바뀌는 순간 로딩 fallback을 다시 보거나 토큰 없이 나간 요청이 거절돼 에러 화면을 보게 됐습니다. iframe 안에서 실행 중인지 확인하는 유틸을 만들어 요청 자체를 붙잡아 두고 fallback만 보여 주는 방식으로 임시 대응했습니다.',
        code: {
          lang: 'ts',
          caption: 'iframe 안에서 나가는 요청을 붙잡는 유틸',
          code: `
            export const isInStackFrame = () => {
              try {
                if (typeof window === 'undefined' || !window.self || !window.top) {
                  return true;
                }
                return window.self !== window.top;
              } catch (e) {
                return true;
              }
            };

            authenticatedApi.interceptors.request.use(async (config) => {
              // 미리 띄워 둔 화면에서는 요청을 붙잡아 두고 fallback만 보여 줍니다.
              if (isInStackFrame()) {
                await new Promise((resolve) => setTimeout(resolve, 99999));
              }
              return config;
            });
          `,
        },
      },
      {
        text: '미리 띄운 iframe 안에도 StackLink가 있으면 iframe 안에서 또 iframe을 만들기 때문에, 당장 보이지도 않는 iframe이 겹겹이 쌓이지 않도록 iframe 안에서 만난 StackLink는 아무것도 그리지 않고 돌려보내게 했습니다.',
        code: {
          lang: 'ts',
          caption: '중첩 iframe을 막는 한 줄',
          code: `
            // iframe 안에서 만난 StackLink는 다음 화면을 또 띄우지 않습니다.
            if (typeof window === 'undefined' || isInStackFrame()) return null;
          `,
        },
      },
      {
        text: '여기까지가 산결 워크스페이스 안에서 쓰던 모습이고, 이후 독립 레포로 옮기면서 iframe 대신 View Transitions로 전환 엔진을 다시 썼습니다. 1.0.0까지 올린 뒤 제스처 레이스와 플링 판정을 고친 프리릴리스를 마지막으로 마무리했습니다.',
        links: [
          { href: '/post/appLikeWeb', label: '글 전문' },
          {
            href: 'https://github.com/JNU-econovation/Soop-WEB/pull/60',
            label: 'PR: 라이브러리 구현',
          },
          {
            href: 'https://github.com/JNU-econovation/Sangyeol-FE/pull/30',
            label: 'PR: stack-link 개선',
          },
        ],
      },
    ],
    links: [
      { type: 'repo', href: 'https://github.com/geongyu09/stack-link' },
      { type: 'npm', href: 'https://www.npmjs.com/package/stack-link' },
    ],
  },
  {
    id: 'geongyu-bridge',
    title: '@geongyu/react-native-bridge',
    startDate: '2026-02-01',
    endDate: '현재',
    category: 'npm 패키지',
    org: '개인',
    role: '단독',
    description:
      '웹뷰와 앱이 주고받는 메시지가 유실되고 응답을 확인할 수 없던 문제를 풀려고, TCP 3-way handshake로 연결 시점을 맞추고 요청과 응답을 짝지어 주고받게 만든 React Native 웹뷰 브리지입니다.',
    details: [
      {
        text: '산결 앱을 React Native로 만들면서 빠른 사용자 테스트를 위해 화면 대부분을 웹뷰로 띄웠고, 웹과 앱이 하나의 서비스처럼 보이려면 서로 필요한 정보를 계속 주고받아야 했습니다.',
        image: {
          src: '/assets/blog/webviewThreeWayHandshake/웹뷰란.png',
          alt: 'WebView 컴포넌트 코드와 웹뷰로 띄운 산결 앱 화면',
          caption: '화면 대부분을 웹뷰로 올린 산결',
        },
      },
      {
        text: '앱에서 웹으로 보낼 때는 WebView의 ref로 postMessage를 부르고 웹에서는 window의 message 이벤트로 받으면 되어서, 코드로만 보면 몇 줄이면 오갑니다.',
        image: {
          src: '/assets/blog/webviewThreeWayHandshake/appToWeb.png',
          alt: '앱에서 postMessage로 보내고 웹에서 message 이벤트로 받는 코드',
          caption: '앱에서 보내고 웹에서 받는 기본 코드',
        },
      },
      {
        text: '반대로 웹에서 앱으로 보낼 때는 window.ReactNativeWebView의 postMessage를 부르고 앱에서는 WebView의 onMessage로 받으며, 어느 쪽이든 건너가는 것은 문자열 하나뿐이라 JSON으로 직렬화해서 실어 보냅니다.',
        image: {
          src: '/assets/blog/webviewThreeWayHandshake/webToApp.png',
          alt: '웹에서 postMessage로 보내고 앱에서 onMessage로 받는 코드',
          caption: '웹에서 보내고 앱에서 받는 기본 코드',
        },
      },
      '막상 서비스를 만들다 보니 메시지 형식을 정해 둘 자리가 없어 보낼 때마다 다르게 적었고, 이벤트 리스너를 붙이고 떼는 코드가 리액트 생명주기와 맞지 않는 사이드 이펙트로 화면마다 흩어졌으며, 웹이 다 뜨기 전에 앱이 보낸 메시지는 받을 사람이 없어 그대로 사라졌고, 응답이라는 개념이 없어 잘 전달됐는지 에러가 났는지 확인할 방법이 없었습니다.',
      {
        text: 'FEConf에서 발표된 gronxb의 webview-bridge처럼 잘 만들어진 라이브러리가 이미 있었지만, 앱 개발이 처음인 상태에서 새 라이브러리를 익히는 비용보다 필요한 기능만 담은 가벼운 코드를 직접 쓰는 편이 싸다고 봤고, 메시지 타입 정의와 리액트 훅 형태의 API, 응답 처리, 에러 처리, 통신 가능 시점 관리 다섯 가지를 목표로 잡았습니다.',
        links: [
          {
            href: 'https://github.com/gronxb/webview-bridge',
            label: '먼저 살펴본 webview-bridge',
          },
        ],
      },
      {
        text: '가장 먼저 막힌 것은 언제부터 메시지를 보내도 되는지였는데, WebView의 onLoad는 문서를 불러왔다는 뜻일 뿐 웹의 자바스크립트가 실행돼 message 리스너가 붙었는지까지는 알려주지 않아 보낸 메시지가 대부분 유실됐고, 웹뷰에 스크립트를 심어(injectedJavaScript) 앱 안에서만 연결을 관리하려던 다음 시도도 심은 스크립트가 도는 시점이 리스너보다 빨라 같은 자리에서 막혔습니다.',
        code: {
          lang: 'javascript',
          caption: '웹뷰에 심어 두려던 핸드셰이크 스크립트',
          code: `
            // 웹뷰가 뜨면 앱이 심어 두는 스크립트
            (() => {
              const ready = (syn, ack) =>
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({
                    name: 'webview-handshake',
                    meta: { syn, ack },
                  }),
                );

              // 심자마자 syn을 보내고 1초 뒤에 한 번 더 보냅니다
              ready(1, 0);
              const timeoutId = setTimeout(() => ready(1, 0), 1000);

              window.addEventListener('message', (event) => {
                const { meta } = JSON.parse(event.data);
                if (meta.syn === 1 && meta.ack === 1) {
                  ready(0, 1);
                  clearTimeout(timeoutId);
                }
              });
            })();
          `,
        },
      },
      {
        text: '앱은 항상 떠 있는 서버이고 웹은 사이사이 붙었다 끊기는 클라이언트라고 보면 웹이 먼저 말을 거는 편이 자연스러워서, 웹이 SYN을 보내고 앱이 SYN/ACK로 답하고 웹이 마지막으로 ACK를 보내 연결을 맺는 TCP 3-way handshake를 그대로 가져왔습니다. 웹이 SYN을 보낸 뒤 1초 안에 답이 없으면 다시 보내게 했고, 1초는 리눅스가 TCP 연결에 쓰는 초기 SYN 타임아웃을 근거로 정했습니다.',
        image: {
          src: '/assets/blog/webviewThreeWayHandshake/handshake-process.png',
          alt: '웹과 앱이 SYN, SYN/ACK, ACK를 차례로 주고받는 순서도',
          caption: 'react가 다 그려진 뒤에야 웹이 SYN을 보냅니다',
        },
      },
      {
        text: '앱은 웹에서 syn이 서 있고 ack이 비어 있는 메시지를 받으면 두 값을 모두 세워 돌려주고, 뒤이어 ack만 담긴 메시지를 받으면 그때 웹뷰가 준비됐다고 표시해 onReadyToMessage를 부릅니다.',
        code: {
          lang: 'tsx',
          caption: '앱에서 SYN을 받고 SYN/ACK로 답하는 부분',
          code: `
            const handleMessage = (event: WebViewMessageEvent) => {
              const { data } = event.nativeEvent;
              const { _id, ack, flag } = JSON.parse(data);

              // 웹이 보낸 syn에 syn/ack으로 답합니다
              if (!isReady && flag.syn === 1 && ack === null) {
                Bridge.createMessage(webViewRef, {
                  syn: 1,
                  ack: _id,
                }).send();
                return;
              }

              // 웹이 보낸 ack을 받으면 그때부터 통신이 가능합니다
              if (!isReady && flag.syn === 0 && ack !== null) {
                setIsReady(true);
                onReadyToMessage?.();
              }
            };
          `,
        },
      },
      {
        text: '웹은 마운트되자마자 syn을 보내고 1초 뒤에 한 번 더 보낼 타이머를 걸어 두었다가, syn/ack를 받으면 ack를 보낸 뒤 타이머와 리스너를 정리해서 핸드셰이크용 메시지가 일반 메시지 처리에 섞이지 않게 했습니다.',
        code: {
          lang: 'tsx',
          caption: '웹이 먼저 SYN을 보내고 ACK로 마무리하는 부분',
          code: `
            useEffect(() => {
              const handshake = (syn: Flag, ack: Flag) =>
                postMessage({
                  name: 'webview-handshake',
                  flag: { syn, ack },
                });

              handshake(1, 0);
              const timeoutId = setTimeout(
                () => handshake(1, 0),
                TIMEOUT,
              );

              const onMessage = (event: MessageEvent) => {
                const { name, flag } = JSON.parse(event.data);
                if (name !== 'webview-handshake') return;
                if (flag.syn !== 1 || flag.ack !== 1) return;

                handshake(0, 1);
                clearTimeout(timeoutId);
                window.removeEventListener('message', onMessage);
              };

              window.addEventListener('message', onMessage);
            }, []);
          `,
        },
        links: [
          {
            href: 'https://github.com/JNU-econovation/Soop-WEB/pull/11',
            label: '핸드셰이크를 붙인 PR',
          },
        ],
      },
      {
        text: '연결이 맺어지기 전에 앱이 보내려던 메시지는 준비될 때까지 기다렸다가 나가므로, 로그인 웹뷰를 띄우자마자 어떤 소셜 로그인으로 들어왔는지 알려 주던 메시지가 더는 사라지지 않았습니다.',
        image: {
          src: '/assets/blog/webviewThreeWayHandshake/handshake.gif',
          alt: '웹뷰가 뜨고 핸드셰이크가 이뤄지는 화면 시연',
          caption: '실제 웹뷰에서 오간 핸드셰이크',
        },
      },
      {
        text: '연결 시점을 맞춘 다음에는 HTTP가 본문을 헤더로 감싸 보내듯 인자로 받은 메시지를 정해진 형식으로 감싸 보내게 했고, 모든 메시지가 고유한 _id를 가지되 요청이면 ack가 비어 있고 응답이면 ack에 요청의 _id가 들어가도록 해서 받은 쪽이 요청인지 응답인지와 어느 요청에 대한 답인지를 함께 알 수 있게 했습니다.',
        code: {
          lang: 'typescript',
          caption: '오가는 모든 메시지가 따르는 형식',
          code: `
            interface WebviewBridgeMessage<Body = unknown> {
              _id: string; // 메시지마다 새로 만드는 식별자
              ack: string | null; // 요청이면 null, 응답이면 원 _id
              flag: { syn: 0 | 1 }; // 연결 요청인지 표시하는 값
              body?: Body; // 위에서 넘겨준 메시지 본문
            }
          `,
        },
        links: [
          {
            href: 'https://github.com/JNU-econovation/Soop-APP/pull/33',
            label: '요청과 응답을 나눈 PR',
          },
        ],
      },
      {
        text: '응답은 요청을 보낸 즉시 오지 않으므로 보낼 때 _id와 응답 콜백을 함께 넣어 두었다가 응답이 오면 꺼내 실행하는 버퍼를 만들었고, 이름은 TCP가 흐름 제어에 쓰는 수신 윈도우에서 따와 RWindow로 두고 답을 기다리는 요청을 스무 개까지만 잡아 두게 했습니다.',
        code: {
          lang: 'typescript',
          caption: 'TCP 수신 윈도우에서 이름을 따온 콜백 버퍼',
          code: `
            type ResCallback = (res?: any) => void;
            type CallbackBuffer = Map<string, ResCallback[]>;

            class RWindow {
              public RWND_BUFFER = new Set<string>();
              private callbackBuffer: CallbackBuffer = new Map();
              private static WINDOW_SIZE = 20;

              public add(id: string) {
                if (this.RWND_BUFFER.size >= RWindow.WINDOW_SIZE)
                  throw new Error('RWND_BUFFER is already full');
                this.RWND_BUFFER.add(id);
              }

              // 응답이 오면 id에 걸어 둔 콜백을 꺼냅니다
              public popCallbacksById(id: string) {
                this.RWND_BUFFER.delete(id);
                const callbacks = this.callbackBuffer.get(id);
                this.callbackBuffer.delete(id);
                return callbacks ?? [];
              }
            }
          `,
        },
      },
      {
        text: '메시지를 만들어 보내고 콜백을 예약하는 일은 Message 클래스가 맡고, 버퍼를 들고 있다가 응답이 왔을 때 예약해 둔 콜백을 찾아 실행하는 일은 WebViewBridge 클래스가 맡도록 나눠서, 앱과 웹이 같은 형식으로 요청과 응답을 주고받게 했습니다.',
        code: {
          lang: 'typescript',
          caption: '메시지를 만드는 클래스와 콜백을 되찾는 클래스',
          code: `
            class WebViewBridge {
              private R_WND = new RWindow();

              public createMessage = <Body>(ref, opts) =>
                new Message<Body>(ref, this.R_WND, opts);

              // 응답에 실려 온 ack으로 예약해 둔 콜백을 찾습니다
              public renderCallback = (
                ack: string,
                body: unknown,
              ) =>
                this.R_WND
                  .popCallbacksById(ack)
                  .forEach((callback) => callback(body));
            }

            const Bridge = new WebViewBridge();

            Bridge.createMessage(webViewRef, {
              body: { type: 'getLocation' },
            }).send((response) => setPosition(response.body));
          `,
        },
      },
      {
        text: '연결이 끝나기 전에 보내려던 메시지는 코어가 쥐고 있다가 연결이 맺어진 뒤에 내보내고, 연결 뒤에는 요청에 붙은 id를 응답이 ack로 되받아 오면서 어느 요청의 답인지가 그대로 드러납니다.',
        image: {
          src: '/assets/blog/webviewThreeWayHandshake/improve-handshake.png',
          alt: '핸드셰이크와 요청 응답이 모두 담긴 전체 통신 순서도',
          caption: '연결을 맺고 요청과 응답이 오가는 전체 흐름',
        },
      },
      {
        text: '쓰는 쪽이 리액트 방식 그대로 쓰도록 받는 쪽은 컴포넌트로, 보내는 쪽은 훅으로 나눴는데, 처음 구조에서는 응답 처리가 WebView의 이벤트 핸들러에 묶여 훅만으로 끝낼 수 없었기 때문에 요청과 응답을 주고받는 계층과 콜백을 예약해 두는 계층을 둘로 나눠 풀었습니다.',
        code: {
          lang: 'tsx',
          caption: '웹과 앱에 똑같이 맞춘 훅과 컴포넌트',
          code: `
            // 웹: 보낼 때는 훅, 받을 때는 컴포넌트
            const { request } = useBridge();
            request({
              requestMessage,
              responseCallback,
              onErrorCallback,
            });

            <BridgeRequestListener
              onRequest={(req) => ({ ok: true })}
            />;

            // 앱: ref로는 응답을 볼 수 없어 컴포넌트가 받습니다
            const { ref, postMessage } = usePostMessageBridge();
            postMessage({ message, onResponse });

            <WebviewWithBridge
              ref={ref}
              onBridgeMessage={(req) => ({ ok: true })}
            />;
          `,
        },
      },
      {
        text: 'api 명세를 팀마다 정하듯 메시지 타입도 쓰는 곳에서 정의하게 두고 싶어서 훅과 컴포넌트 모두 요청과 응답 타입을 제네릭으로 받게 했고, 덕분에 request에 넘기는 메시지와 responseCallback이 받는 값이 미리 정의해 둔 타입을 벗어나지 못합니다.',
        code: {
          lang: 'tsx',
          caption: '요청과 응답 타입을 제네릭으로 정의한 모습',
          code: `
            interface LocationRequest {
              type: 'getCurrentLocation';
            }
            interface LocationResponse {
              lat: number;
              lng: number;
            }

            const { request } = useBridge<
              LocationRequest,
              LocationResponse
            >();

            request({
              requestMessage: { type: 'getCurrentLocation' },
              responseCallback: ({ lat, lng }) =>
                setPosition({ lat, lng }),
              onErrorCallback: (error) => console.error(error),
            });
          `,
        },
      },
      {
        text: '웹의 기본 화면 전환은 툭툭 끊겨서 네비게이션 책임을 앱이 모두 가져갔고, 웹은 사용자가 무언가를 누르면 어느 화면으로 옮겨 달라는 메시지를 앱에 보내도록 바꿨습니다.',
        image: {
          src: '/assets/blog/webviewThreeWayHandshake/웹뷰시연.gif',
          alt: '웹에서 누른 버튼에 따라 앱이 화면을 전환하는 시연',
          caption: '앱이 화면 전환을 맡고 웹은 메시지로 요청합니다',
        },
      },
      {
        text: '산결 워크스페이스 안에만 있던 코드를 npm 배포 환경을 잡아 @geongyu/react-native-bridge로 내보내고 개인 레포로 분리했으며, 앱과 웹이 서로 다른 의존성을 쓰기 때문에 진입점을 /native와 /web으로 나눠 필요한 쪽만 들여오게 했습니다.',
        code: {
          lang: 'typescript',
          caption: '앱과 웹이 나눠 들여오는 두 진입점',
          code: `
            // npm install @geongyu/react-native-bridge

            // 앱(React Native)
            import {
              WebviewWithBridge,
            } from '@geongyu/react-native-bridge/native';

            // 웹(Next.js)
            import {
              useBridge,
            } from '@geongyu/react-native-bridge/web';
          `,
        },
        links: [
          {
            href: 'https://github.com/geongyu09/react-native-bridge#readme',
            label: '패키지 README',
          },
          {
            href: 'https://www.npmjs.com/package/@geongyu/react-native-bridge',
            label: 'npm 패키지',
          },
        ],
      },
      {
        text: 'v0.2.1에서는 핸드셰이크가 실패했을 때 정해진 횟수만큼 다시 시도하고 그래도 닿지 않으면 onHandshakeError로 알려 주게 했고, enableBridgeDebug 한 줄로 오간 메시지와 왕복 시간과 응답이 오지 않은 요청을 콘솔에서 볼 수 있는 Inspector를 붙였습니다. 구독자가 없으면 계측 지점이 바로 빠져나오므로 켜지 않는 동안에는 비용이 들지 않습니다.',
        code: {
          lang: 'text',
          caption: 'enableBridgeDebug를 켰을 때 콘솔에 찍히는 기록',
          code: `
            → [web] handshake:syn #a1b2
            ← [web] handshake:syn-ack #s3c4 (rtt 12ms)
            → [web] handshake:ack #b5d6
            → [web] request #c7e8 { type: 'getLocation' }
            ← [web] response #r9f0 (rtt 34ms) { lat: 37.5 }
            → [web] request:timeout #d1a2 (rtt 1000ms)
          `,
        },
      },
      {
        text: '산결에 이어 EEOS v4.0의 Expo 앱과 who-tech 웹뷰 앱에서도 같은 패키지를 들여와 쓰면서, 처음에 겪었던 메시지 유실과 응답 확인 문제를 프로젝트마다 다시 풀지 않게 됐습니다.',
        links: [
          {
            href: '/post/webviewThreeWayHandshake/',
            label: '개발 과정을 적어 둔 글',
          },
        ],
      },
    ],
    links: [
      {
        type: 'repo',
        href: 'https://github.com/geongyu09/react-native-bridge',
      },
      {
        type: 'npm',
        href: 'https://www.npmjs.com/package/@geongyu/react-native-bridge',
      },
    ],
  },
  {
    id: 'auth-econovation',
    title: 'Auth-Econovation',
    startDate: '2026-01-01',
    endDate: '2026-06-30',
    category: '팀 프로젝트',
    org: '에코노베이션',
    role: 'FE 단독',
    description:
      '에코노베이션 동아리 내부 서비스들에 회원 통합 로그인을 제공하는 인증 서비스입니다.',
    details: [
      '그전까지는 서비스마다 JWT를 따로 발급하고 검증했습니다. EEOS는 액세스 토큰을 localStorage에 저장해 다른 도메인이나 서브도메인에서 공유가 안 됐고, 웹뷰 앱에서는 Slack 로그인 페이지가 인증되지 않은 브라우저로 막혀 앱 전환의 선행 조건이 되기도 했습니다.',
      '크래프톤 재직 선배에게 와일드카드 도메인 쿠키 조언을 받아 One Cookie Domain SSO로 방향을 정했고, SSO 웹과 어드민 개발자 콘솔, 공식 문서 사이트를 Bun workspaces 하나로 묶어 각각 별도 Vercel 프로젝트로 배포합니다.',
      '회원가입 검증은 vitest를 처음 붙이면서 TDD로 진행했습니다. 이름과 아이디, 비밀번호, 비밀번호 확인, 기수 검증을 순수 함수 다섯 개로 나눈 뒤 경계값 분석 단위 테스트를 먼저 썼고, 비밀번호가 바뀌면 확인 필드도 즉시 다시 검증해 stale closure를 막았습니다.',
      'v2에서는 vitest를 unit(node)과 integration(jsdom과 MSW) 두 프로젝트로 나눴고, 회원과 클라이언트 seed에 무효화된 refreshToken 집합까지 담은 단일 인메모리 스토어로 MSW를 stateful하게 모킹했습니다.',
      'SPA의 fetch가 cross-origin 302를 따라가며 CORS 오류를 내는 바람에, BE가 200과 바디의 redirectUrl로 응답하고 프론트가 window.location.assign으로 이동하도록 리다이렉트 책임을 옮겼습니다. URL 조립은 단위 테스트가 가능한 순수 함수로, 이동은 부수효과로 분리했습니다.',
      '레포를 열자마자 .claude 하네스(TDD 워크플로우, 에이전트, 규칙)를 먼저 세우고 개발을 시작한 첫 프로젝트이기도 합니다.',
    ],
  },
  {
    id: 'unified-debugger',
    title: 'Unified Debugger',
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    category: '개발 도구',
    org: '개인',
    role: '단독',
    description:
      'React Native 앱과 그 안의 WebView를 한 화면에서 동시에 디버깅하는 Tauri 데스크탑 도구입니다.',
    details: [
      {
        text: '산결 앱을 출시하려고 막바지 QA를 하는데 네이티브 화면은 Expo DevTools로, iOS 웹뷰는 Safari로, Android 웹뷰는 Chrome 개발자 도구로 각각 열어야 했습니다. 웹뷰는 렌더링이 시작된 뒤에야 디버깅이 붙어서 첫 화면에서 나가는 요청은 확인조차 하지 못했고 네이티브 화면으로 넘어가면 연결이 끊겨, 화면을 옮길 때마다 도구를 다시 열어야 했으며 함께 QA를 하던 PM에게 이런 절차를 설명하기도 어려웠습니다.',
        links: [
          { href: '/post/debuggingTool/', label: '만드는 과정을 적어 둔 글' },
        ],
      },
      {
        text: '이미 나와 있는 도구부터 찾아봤더니 Flipper는 유지보수가 멈췄고, Reactotron은 네트워크와 상태 로그를 모아 주지만 웹뷰 안쪽을 볼 수 없으면서 커스텀할 방법도 없었으며, Expo DevTools는 개발 모드에서만 동작해 QA 단계에서 쓰기 어려웠습니다. 참고할 만한 발표와 영상은 모두 Chrome DevTools Protocol 위에서 디버거를 만들고 있어서 CDP가 무엇을 주고받는지부터 봤고, 개발자 도구의 Experiments에서 Protocol Monitor를 켜면 실제로 오가는 메시지를 그대로 확인할 수 있었습니다.',
        image: {
          src: '/assets/blog/debuggingTool/image%201.png',
          alt: '개발자 도구 설정의 Experiments 목록에서 Protocol Monitor를 켠 화면',
          caption: 'CDP 메시지를 직접 보는 설정',
        },
        links: [
          {
            href: 'https://chromedevtools.github.io/devtools-protocol/',
            label: 'CDP 명세 문서',
          },
        ],
      },
      {
        text: '첫 방향은 Chrome DevTools Frontend를 직접 빌드해 손보는 것이었습니다. depot_tools를 받아 gclient sync로 소스를 맞추고 gn과 autoninja로 빌드하면 out/Default 아래에 inspector.html처럼 쓰임이 다른 DevTools 페이지들이 나왔고, 빌드 결과를 로컬에서 서빙하니 브라우저 안에서 보던 화면이 그대로 열렸습니다.',
        code: {
          lang: 'bash',
          caption: 'DevTools Frontend를 받아 빌드하는 순서',
          code: `
            # depot_tools를 받아 PATH에 걸어 둡니다
            git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
            export PATH="$HOME/depot_tools:$PATH"

            cd devtools-frontend
            gclient sync          # 소스 새로고침
            gn gen out/Default    # 빌드 설정
            autoninja -C out/Default
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/image%205.png',
          alt: '로컬에서 서빙한 inspector.html이 열린 화면',
          caption: '직접 빌드해 띄운 개발자 도구',
        },
        links: [
          {
            href: 'https://github.com/ChromeDevTools/devtools-frontend',
            label: 'devtools-frontend 소스',
          },
        ],
      },
      {
        text: '빌드한 화면이 실제 페이지와 어떻게 이어지는지도 확인해 봤습니다. 크롬을 원격 디버깅 포트와 함께 띄우고 /json 엔드포인트로 요청을 보내면 붙을 수 있는 대상마다 webSocketDebuggerUrl이 나오는데, 받은 주소를 inspector.html의 ws 파라미터로 넘기니 그 페이지의 DOM과 콘솔이 그대로 붙었습니다. DevTools Frontend는 ws로 받은 소켓 반대편과 CDP 형식으로 주고받기만 하면 된다고 말할 수 있었습니다.',
        code: {
          lang: 'bash',
          caption: '붙을 대상과 소켓 주소를 찾는 명령',
          code: `
            # 원격 디버깅 포트를 열고 크롬을 띄웁니다
            /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome \\
              --remote-debugging-port=9222 \\
              --user-data-dir=/tmp/chrome-debug-profile-new \\
              --remote-allow-origins=http://localhost:8090

            # 붙을 수 있는 대상과 소켓 주소를 확인합니다
            curl http://localhost:9222/json
            # "webSocketDebuggerUrl": "ws://localhost:9222/devtools/page/DAB7FB61..."
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/image%207.png',
          alt: '왼쪽 웹페이지에 ws 파라미터로 연결한 개발자 도구가 오른쪽에 열린 화면',
          caption: 'ws 파라미터로 붙인 개발자 도구',
        },
      },
      {
        text: '여기에 웹과 앱을 함께 볼 패널을 새로 달아 보려고 front_end/panels 아래를 열어 콘솔 패널의 이름과 색부터 바꿔 봤고, 빌드 결과가 그대로 반영되는 것까지 확인했습니다. 다만 패널을 만드는 흐름과 메시지를 전달하는 방식과 렌더링이 DevTools 내부 모듈과 깊이 얽혀 있어 구조를 파악하는 데만 시간이 계속 들어갔고, 고친 프론트엔드를 팀원이 쓸 수 있게 배포할 방법도 마땅치 않아 첫 방향은 접었습니다.',
        image: {
          src: '/assets/blog/debuggingTool/image%208.png',
          alt: '콘솔 탭 이름이 바뀐 채로 열린 개발자 도구 화면',
          caption: '고친 패널이 반영된 모습',
        },
      },
      {
        text: '두 번째로는 Expo가 공식으로 주는 DevTools Client Plugin을 골랐습니다. 산결 레포에 직접 물려 개발하려고 로컬 패키지를 링크했는데 Yarn Berry에서는 npm link가 동작하지 않아 portal 프로토콜로 바꿨고, 그래도 Metro가 번들을 찾지 못하거나 React가 null이 되는 문제가 이어져서 metro.config.js에 패키지 경로를 직접 알려 주고 react와 react-native를 워크스페이스의 인스턴스 하나로 고정한 뒤에야 연결됐습니다.',
        code: {
          lang: 'javascript',
          caption: '로컬 플러그인을 물리려고 고친 metro.config.js',
          code: `
            config.resolver = {
              ...resolver,
              unstable_enableSymlinks: true,
              extraNodeModules: {
                "plugin-test": pluginTestPath,
                // React와 React Native를 워크스페이스의 단일 인스턴스로 강제
                react: path.resolve(workspaceRoot, "node_modules/react"),
                "react-native": path.resolve(workspaceRoot, "node_modules/react-native"),
              },
              // 중복된 React를 물지 않도록 항상 워크스페이스 쪽으로 돌립니다
              resolveRequest: (context, moduleName, platform) => {
                if (moduleName === "react" || moduleName === "react-native") {
                  return {
                    filePath: path.resolve(workspaceRoot, "node_modules", moduleName, "index.js"),
                    type: "sourceFile",
                  };
                }

                return context.resolveRequest(context, moduleName, platform);
              },
            };
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/image%2010.png',
          alt: '플러그인 패키지를 찾지 못해 번들링이 실패한 터미널 화면',
          caption: '링크가 풀려 번들이 깨지던 때',
        },
        links: [
          {
            href: 'https://github.com/geongyu09/devtool-client',
            label: 'devtool-client 레포',
          },
          {
            href: 'https://github.com/JNU-econovation/Sangyeol-FE/blob/feat/41-dev-tool-plugin/packages/app/metro.config.js',
            label: '적용한 metro.config.js',
          },
        ],
      },
      {
        text: '무엇부터 보여 줄지는 콘솔과 네트워크 두 가지로 잡았고, 주고받을 메시지 형식은 CDP를 참고해 method와 params로 정했습니다. 검증된 형식을 그대로 빌리면 형식을 새로 만들며 겪을 시행착오를 줄일 수 있다고 봤고, 우아한테크코스의 javascript-mission-utils에서 본 방식대로 원래 콘솔 함수를 남겨 둔 채 오버라이딩해서 기존 출력은 그대로 두고 같은 내용을 플러그인 client로도 보내게 만들었습니다.',
        code: {
          lang: 'typescript',
          caption: '콘솔을 오버라이딩해 같은 내용을 함께 보내는 부분',
          code: `
            const originalLog = console.log;

            console.log = function (...args: any[]) {
              // 원래 출력은 그대로 둡니다
              originalLog.apply(console, args);

              const message: ConsoleMessage = {
                level: "log",
                args,
                timestamp: Date.now(),
              };

              client.sendMessage("console", message);
            };
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/image%2011.png',
          alt: 'CDP 문서에 적힌 Console.ConsoleMessage 타입 명세',
          caption: '메시지 형식을 참고한 CDP 문서',
        },
        links: [
          {
            href: 'https://github.com/woowacourse-projects/javascript-mission-utils',
            label: '오버라이딩 방식을 참고한 레포',
          },
        ],
      },
      {
        text: '그런데 메시지를 보내는 client는 앱에서만 살아 있어서 웹에서 난 로그는 브리지를 한 번 거쳐야 했고, 그러면 webview-bridge나 제가 만들어 쓰던 브리지와 통신이 겹칠 수 있었습니다. 게다가 axios가 XMLHttpRequest를 이미 바꿔 쓰고 있어서 오버라이딩이 서로 덮이는 바람에 로그가 제대로 찍히지 않았고, axios 인터셉터로 우회하면 도구가 특정 라이브러리에 매이게 되어 두 번째 방향도 접고 방향을 다시 잡았습니다.',
        links: [
          {
            href: 'https://github.com/gronxb/webview-bridge',
            label: '충돌이 우려되던 webview-bridge',
          },
        ],
      },
      {
        text: '하나의 개발자 도구에 전부 담기 어렵다면 개발자 도구를 두 개 띄우면 되겠다고 생각했습니다. 앞선 실험에서 개발자 도구도 주소를 가진 하나의 페이지라는 것을 확인했으므로, 서로 다른 주소를 가진 두 도구를 iframe으로 한 화면에 올리고 그 화면은 Node.js로 서빙하기로 했습니다.',
      },
      {
        text: 'Expo에서 j를 누르면 열리는 디버거도 CDP 위에서 동작하고 있었습니다. 그 개발자 도구의 개발자 도구를 열어 주소를 확인한 뒤 다른 브라우저에 그대로 넣어 보니 같은 화면이 열렸고, Metro의 /json 엔드포인트에 devtoolsFrontendUrl이 들어 있어서 그 주소로 리다이렉트하는 Express 서버를 만들어 앱 쪽은 해결했습니다.',
        code: {
          lang: 'javascript',
          caption: 'Metro가 알려 준 주소로 앱 개발자 도구를 띄우는 서버',
          code: `
            app.get("/", async (req, res) => {
              // Metro가 들고 있는 디버깅 대상 목록을 가져옵니다
              const metroResponse = await fetch("http://localhost:8081/json");
              const metroTargets = await metroResponse.json();

              const devtoolsFrontendUrl = metroTargets[0]?.devtoolsFrontendUrl;

              if (!devtoolsFrontendUrl) {
                throw new Error("[ERROR] metro bundler에서 devtoolsFrontendUrl 정보를 가져올 수 없습니다.");
              }

              return res.redirect("http://127.0.0.1:8081" + devtoolsFrontendUrl);
            });
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/image%2016.png',
          alt: '리다이렉트로 연 앱 개발자 도구에 CDP 메시지가 쌓이는 화면',
          caption: '서버가 열어 준 앱 개발자 도구',
        },
      },
      {
        text: '웹뷰는 Android부터 붙여 봤습니다. adb로 웹뷰 소켓을 찾아 포트를 포워딩하고 /json으로 대상까지 확인했는데도 소켓이 연결되지 않았고, front_end를 직접 서빙해 ws 파라미터를 넘겨도 같은 자리에서 연결이 끊겼으며 첫 방향에서도 겪었던 Origin 문제로 짐작했습니다.',
        code: {
          lang: 'bash',
          caption: '웹뷰 소켓을 찾아 포워딩하는 명령',
          code: `
            # 열려 있는 웹뷰 소켓을 확인합니다
            adb shell "cat /proc/net/unix | grep devtools_remote"
            # ... 37391 @webview_devtools_remote_4504

            # 찾은 소켓을 로컬 포트로 포워딩합니다
            adb forward tcp:9223 localabstract:webview_devtools_remote_4504
            curl localhost:9223/json
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/image%2021.png',
          alt: '웹소켓 연결이 해제되었다는 안내가 뜬 개발자 도구 화면',
          caption: '끝내 붙지 않던 웹뷰',
        },
      },
      {
        text: '브라우저에서 CDP를 직접 말할 수 없다면 일반 WebSocket을 먼저 맺고 그 위에 CDP 형식으로 메시지를 흘려보내면 되겠다고 봤습니다. DevTools Frontend는 ws 파라미터로 받은 소켓 반대편이 형식만 맞추면 진짜 브라우저 엔진인지 가리지 않으므로, 디버깅할 페이지에 주입한 스크립트가 그 자리를 대신하고 가운데에 둔 프록시 서버가 양쪽을 중계하는 구조를 그렸습니다.',
        image: {
          src: '/assets/blog/debuggingTool/image%2024.png',
          alt: '웹페이지와 프록시 서버와 개발자 도구 서빙 서버를 잇는 구조도',
          caption: '그려 둔 전체 구조',
        },
      },
      {
        text: '먼저 디버깅할 페이지에 넣을 devtools-client.js를 즉시 실행 함수로 만들어, 스크립트가 로드되자마자 프록시 서버로 소켓을 열고 register 메시지에 주소와 제목을 담아 보내도록 했습니다. 프록시 서버는 등록 메시지를 받으면 registeredPages Map에 연결까지 함께 담아 두고 등록이 끝났다는 응답을 돌려줍니다.',
        code: {
          lang: 'javascript',
          caption: '디버깅할 페이지에 넣는 devtools-client.js',
          code: `
            (function () {
              "use strict";

              const ws = new WebSocket("ws://localhost:3002");

              ws.onopen = () => {
                // 어떤 페이지가 붙었는지 서버에 알립니다
                ws.send(
                  JSON.stringify({
                    type: "register",
                    url: window.location.href,
                    title: document.title,
                    userAgent: navigator.userAgent,
                  }),
                );
              };
            })();
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/image%2026.png',
          alt: '페이지 등록과 목록 조회가 프록시 서버를 거쳐 오가는 도식',
          caption: '등록과 조회가 오가는 흐름',
        },
        links: [
          {
            href: 'https://github.com/geongyu09/multi-devtool/blob/main/public/devtools-client.js',
            label: '주입하는 devtools-client.js',
          },
          {
            href: 'https://github.com/geongyu09/multi-devtool/blob/main/cdp-proxy.js',
            label: '중계하는 cdp-proxy.js',
          },
        ],
      },
      {
        text: '서빙 서버는 프록시 서버의 /api/pages로 등록된 페이지 목록을 받아 화면에 그리고, Inspect를 누르면 그 페이지의 id를 ws 파라미터에 담아 inspector.html을 새 창으로 엽니다. 누른 뒤부터는 개발자 도구가 프록시 서버를 거쳐 주입한 스크립트와 CDP로 대화하게 됩니다.',
        code: {
          lang: 'html',
          caption: '목록에서 개발자 도구를 띄우는 버튼',
          code: `
            <a
              href="/inspector.html?ws=localhost:3002/devtools/page/\${page.id}"
              class="inspect-btn"
              target="_blank"
            >
              🔍 Inspect
            </a>
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/image%2025.png',
          alt: '왼쪽 웹페이지와 오른쪽 등록된 페이지 목록이 나란히 열린 화면',
          caption: '등록된 페이지 목록과 Inspect 버튼',
        },
      },
      {
        text: '콘솔은 개발자 도구가 연결되자마자 보내는 Console.enable에 응답한 뒤, 콘솔이 불릴 때마다 Runtime.consoleAPICalled를 보내도록 만들었습니다. 원본 메서드를 미리 저장해 두고 오버라이딩해 브라우저 콘솔 출력은 그대로 남겼으며, 도구가 스스로 찍는 로그가 다시 전송되어 도는 일을 막으려고 [RemoteDevTools] 접두사가 붙은 로그는 걸러 냈습니다. 프록시 서버는 메시지를 해석하지 않고 문자열로 바꿔 반대편 소켓에 그대로 넣기만 합니다.',
        code: {
          lang: 'javascript',
          caption: '콘솔을 CDP 메시지로 바꿔 보내는 부분',
          code: `
            // 오버라이드 전에 원본 콘솔 메서드를 저장해 둡니다
            const originalConsole = {
              log: console.log.bind(console),
              error: console.error.bind(console),
              warn: console.warn.bind(console),
              info: console.info.bind(console),
              debug: console.debug.bind(console),
            };

            ["log", "error", "warn", "info", "debug"].forEach((method) => {
              const original = originalConsole[method];

              console[method] = function (...args) {
                // 도구가 찍는 로그까지 보내면 메시지가 계속 돕니다
                const firstArg = args[0];
                if (typeof firstArg === "string" && firstArg.startsWith("[RemoteDevTools]")) {
                  original.apply(console, args);
                  return;
                }

                original.apply(console, args);

                sendMessage({
                  method: "Runtime.consoleAPICalled",
                  params: {
                    type: method,
                    args: args.map((arg) => ({
                      type: typeof arg,
                      value: arg,
                      description: String(arg),
                    })),
                    timestamp: Date.now() / 1000,
                    stackTrace: { callFrames: [] },
                  },
                });
              };
            });
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/Jan-20-2026_22-00-34.gif',
          alt: '테스트 페이지에서 찍은 콘솔이 개발자 도구에 그대로 나타나는 시연',
          caption: '콘솔이 붙은 첫 화면',
        },
      },
      {
        text: '네트워크는 요청 직전에 보내는 Network.requestWillBeSent와 응답을 받은 Network.responseReceived, 완료를 알리는 Network.loadingFinished, 실패를 알리는 Network.loadingFailed 네 가지부터 지원했습니다. fetch와 XMLHttpRequest를 같은 방식으로 오버라이딩했고, 응답 본문은 스트림이라 복제해 두었다가 requestId를 키로 Map에 담고 개발자 도구가 Network.getResponseBody를 물어보면 꺼내 돌려주도록 했습니다.',
        code: {
          lang: 'javascript',
          caption: 'fetch를 오버라이딩해 네트워크 이벤트를 보내는 부분',
          code: `
            const originalFetch = window.fetch;

            window.fetch = function (...args) {
              const requestId = "fetch-" + Math.random().toString(36).substring(2, 11);
              const url = typeof args[0] === "string" ? args[0] : args[0].url;
              const method = args[1]?.method || "GET";

              sendMessage({
                method: "Network.requestWillBeSent",
                params: {
                  requestId,
                  request: { url, method, headers: args[1]?.headers || {} },
                  timestamp: performance.now() / 1000,
                  type: "Fetch",
                },
              });

              return originalFetch
                .apply(this, args)
                .then(async (response) => {
                  // 본문은 스트림이라 복제해 두어야 나중에 꺼내 줄 수 있습니다
                  const body = await extractResponseBody(response.clone(), contentType);
                  responseBodyMap.set(requestId, {
                    body,
                    base64Encoded: isBinaryContent(contentType),
                  });

                  sendMessage({
                    method: "Network.responseReceived",
                    params: { requestId, response: buildResponseObject(response) },
                  });
                  sendMessage({
                    method: "Network.loadingFinished",
                    params: { requestId, timestamp: performance.now() / 1000 },
                  });

                  return response;
                })
                .catch((error) => {
                  sendMessage({
                    method: "Network.loadingFailed",
                    params: { requestId, errorText: error.message },
                  });
                  throw error;
                });
            };
          `,
        },
        image: {
          src: '/assets/blog/debuggingTool/Jan-20-2026_22-42-01.gif',
          alt: '테스트 페이지가 보낸 요청이 개발자 도구 네트워크 탭에 쌓이는 시연',
          caption: '네트워크 탭에 요청이 쌓이는 모습',
        },
      },
      {
        text: '마지막으로 앱 개발자 도구와 웹뷰 개발자 도구를 iframe 두 개로 한 화면에 나란히 띄워, 앱에서 난 로그와 웹뷰에서 나간 요청을 같은 자리에서 보게 했습니다. 지원 범위는 여기까지 콘솔과 네트워크였고 Elements와 Storage와 Performance는 다음으로 미뤘습니다.',
        image: {
          src: '/assets/blog/debuggingTool/Feb-10-2026_14-09-26.gif',
          alt: '앱과 웹뷰의 개발자 도구가 한 화면에 나란히 뜬 시연',
          caption: '한 화면에 나란히 띄운 두 도구',
        },
        links: [
          {
            href: 'https://github.com/geongyu09/multi-devtool',
            label: 'multi-devtool 레포',
          },
        ],
      },
      {
        text: '여기까지는 소스를 내려받아 터미널에서 명령을 순서대로 쳐야 쓸 수 있었습니다. 그래서 cdp-proxy와 서빙 서버를 server.js 하나로 합치고 3002번부터 비어 있는 포트를 골라 열도록 한 다음, Metro 타겟을 가져오는 API와 좌우 분할 보기를 붙여 Tauri 데스크탑 앱으로 묶었고 내려받아 바로 실행할 수 있는 v0.1.0을 냈습니다.',
        links: [
          {
            href: 'https://github.com/geongyu09/multi-devtool/blob/main/server.js',
            label: '하나로 합친 server.js',
          },
          {
            href: 'https://github.com/geongyu09/multi-devtool/blob/main/docs/how-it-works.md',
            label: '작동 방식 문서',
          },
          {
            href: 'https://github.com/geongyu09/multi-devtool/releases/tag/v0.1.0',
            label: 'v0.1.0 릴리스',
          },
        ],
      },
    ],
    links: [
      { type: 'repo', href: 'https://github.com/geongyu09/multi-devtool' },
      {
        type: 'docs',
        href: 'https://github.com/geongyu09/multi-devtool/blob/main/docs/how-it-works.md',
        label: '작동 방식 문서',
      },
      {
        type: 'repo',
        href: 'https://github.com/geongyu09/multi-devtool/releases/tag/v0.1.0',
        label: 'v0.1.0 릴리스',
      },
    ],
  },
  {
    id: 'sangyeol',
    title: '산결 (Sangyeol)',
    startDate: '2025-04-01',
    endDate: '현재',
    category: '팀 프로젝트',
    org: '에코노베이션',
    role: '앱 + 웹 FE 전담',
    description:
      '등산 코스 검색과 실시간 위치 추적, 긴급 신고를 제공하는 크로스 플랫폼 등산 앱입니다.',
    quote: '“20대에게 산행을 재미있게, 그리고 안전하게 만들어줄 수 없을까?”',
    intro: [
      '2~30대는 등산하는 비율이 높지 않은데도 산행 중 사고 비율은 다른 연령대보다 가장 높습니다.',
      '저희 팀은 이 문제에 주목해, 등산을 즐겁게 할 수 있게 하면서 산행 중에 생길 수 있는 사고를 예방하고 감지해 구조 요청까지 돕는 앱 산결을 개발하고 있습니다.',
      '처음에는 앱과 웹을 각각의 레포에서 만들었고, 지금은 하나의 모노레포로 관리하고 있습니다.',
    ],
    details: [
      {
        tag: '기여',
        title: '웹뷰 기반 하이브리드 아키텍처 구축',
        text: '네이티브 앱 개발 대비 배포 주기를 단축하고 빠른 피드백 사이클을 구축하기 위해 웹뷰 기반 개발 방식을 채택했고, 변경 사항이 생기면 앱 스토어 심사 없이 즉시 업데이트를 배포할 수 있어 버그 수정과 기능 개선을 평균 1일 이내에 반영할 수 있었습니다. 초기 페이지 로딩 속도(FCP)를 개선하기 위해 Next.js의 SSG와 SSR을 나눠 썼는데, 자주 변경되지 않는 코스 탐색 페이지는 SSG로 빌드 타임에 생성하고 마이페이지처럼 동적 데이터가 필요한 페이지에는 SSR을 적용했습니다.',
      },
      {
        tag: '기여',
        title: '웹-네이티브 양방향 통신 프로토콜 설계 및 구현',
        text: '웹뷰와 네이티브 앱 간 통신에 일반적으로 쓰이는 이벤트 기반 단방향 브리지는 응답 확인이 불가능하고 에러 처리가 어려워 디버깅 시간이 늘어나는 문제가 있었습니다. TCP의 핸드셰이크와 흐름 제어 개념을 차용해 요청-응답 기반 양방향 통신 프로토콜을 설계했고, 각 메시지에 고유 ID를 부여하고 ACK 메커니즘을 구현해 메시지 전달 보장과 재시도 로직을 통합한 전이중 통신 레이어를 구축했습니다. 웹에서 네이티브 기능을 호출할 때의 요청과 응답 타입을 TypeScript 제네릭으로 정의해 타입 안정성을 확보했고, Promise 기반 인터페이스로 비동기 통신을 간소화하는 Custom Hook을 개발해 브리지 관련 휴먼 에러로 발생하는 런타임 에러를 90% 이상 줄였습니다.',
        links: [
          {
            href: '/post/webviewThreeWayHandshake/',
            label: '설계 과정을 적어 둔 글',
          },
        ],
      },
      {
        tag: '기여',
        title: '네이티브 수준의 페이지 전환 UX 구현',
        text: '기존 웹 기반 페이지 전환은 로딩 지연과 깨짐 현상 때문에 네이티브 앱보다 사용성이 떨어졌습니다. 모든 라우팅을 네이티브에서 처리하면 화면마다 새로운 웹뷰를 생성해야 해 초기 로딩 시간이 늘고 웹의 캐싱 이점을 활용할 수 없었으며, 하나의 웹뷰 컴포넌트에서 여러 페이지를 관리하면 iOS의 스와이프 뒤로가기 제스처가 동작하지 않았습니다. Next.js의 Link 프리페칭 개념을 차용해 iframe 기반 프리렌더링 시스템을 구축했는데, 사용자가 다음 페이지로 이동할 가능성이 높은 시점(링크 호버 또는 버튼 근처 스크롤)에 숨겨진 iframe에 해당 페이지를 미리 렌더링하고 실제 전환 시에는 CSS Transform과 Transition으로 슬라이드 애니메이션을 보여 주어, 사용성 테스트에서 "앱처럼 부드럽다"는 응답 비율을 45%에서 89%로 높였습니다. iOS Safari의 뒤로가기 스와이프 제스처를 웹뷰 환경에서 재현하기 위해 커스텀 제스처 인식 기능도 개발했고, 화면 왼쪽 가장자리(2.5rem 이내)에서 시작하는 스와이프를 감지해 드래그 거리에 비례해 이전 페이지를 실시간으로 밀어 보여 주다가 화면 너비의 40% 이상 드래그하면 뒤로가기를 실행하도록 구현했습니다.',
        links: [{ href: '/post/appLikeWeb/', label: '구현 과정을 적어 둔 글' }],
      },
      {
        tag: '기여',
        title: '앱과 웹뷰를 동시에 디버깅할 수 있는 환경 구축',
        text: '웹뷰 기반 앱 QA를 진행하는 동안 디버깅 환경이 흩어져 있어 네이티브는 Expo DevTools, iOS 웹뷰는 Safari, Android 웹뷰는 Chrome 개발자 도구를 각각 열어야 했고, 웹뷰는 렌더링이 시작된 뒤에야 디버깅 연결이 가능해 앱 첫 화면에서 발생하는 요청은 확인조차 못 했으며 네이티브 화면으로 전환되면 연결이 자동으로 끊겨 화면이 바뀔 때마다 도구를 다시 열어야 했습니다. 앱 쪽은 Express 서버가 Metro Bundler의 /json에서 devtoolsFrontendUrl을 조회해 해당 주소로 리다이렉트하도록 구현했습니다. 웹 쪽은 주입한 스크립트가 프록시 서버와 WebSocket으로 연결되고, console과 fetch와 XMLHttpRequest를 기존 동작을 유지하는 방식으로 오버라이딩해 특정 행동을 할 때마다 프록시에 요청을 보내면, 메시지를 전달받은 프록시가 DevTools Frontend에 CDP 메시지를 보내 개발자 도구에 반영하도록 했습니다. 앱과 웹의 개발자 도구를 iframe으로 한 화면에 함께 띄워 앱과 웹뷰의 디버깅 정보를 하나의 DevTools 화면에서 동시에 확인하는 도구를 완성했고, Safari와 Chrome과 Expo DevTools를 오가던 기존 방식보다 디버깅 환경을 갖추는 시간을 33% 단축했습니다.',
        links: [
          { href: '/post/debuggingTool/', label: '만드는 과정을 적어 둔 글' },
        ],
      },
      {
        tag: '배운 점',
        title: '모르는 문제를 아는 문제의 모양으로 바꾸기',
        text: '막연히 모르는 문제를 아는 문제의 모양으로 바꾸어서 볼 필요가 있다는 것을 깨달았습니다. 이미 공부했던 CS나 여러 도구와 라이브러리가 비슷한 문제를 해결한 경우가 많았고, TCP 핸드셰이크나 Next.js의 Link 프리페칭처럼 다른 분야의 해결 방식이더라도 가져와서 적용하면 문제를 해결해 나갈 수 있었기에, 개발자는 기본기에 집중할 필요가 있다는 것도 알게 됐습니다.',
      },
      {
        tag: '배운 점',
        title: '막연한 문제를 작고 명확하게 정의하기',
        text: '문제를 해결하기 전에 막연해 보이는 문제를 작고 명확하게 정의하는 것이 중요하다는 것을 깨달았습니다. 여러 개발자 도구를 번갈아 여는 디버깅 방식처럼 자연스럽게 넘기던 부분에서도 정의할 수 있는 문제가 생각보다 많이 존재한다는 것을 체감했고, 좋은 개발자는 돌아가는 구현체를 만드는 데서 멈추지 않고 구현체 안에서 문제를 찾고 정의하며 찾은 문제를 지혜롭게 해결할 수 있어야 한다는 것을 알게 됐습니다.',
      },
      {
        tag: '배운 점',
        title: '쓰는 쪽이 헷갈리지 않는 인터페이스',
        text: '웹-네이티브 브리지를 Custom Hook으로 감싸면서 어떤 것을 숨기고 어떤 것을 드러내야 할지, 어떤 인터페이스여야 브리지를 사용하는 입장에서 헷갈리지 않고 쉽게 사용할 수 있을지에 대해 많이 고민했습니다.',
      },
    ],
    links: [
      {
        type: 'repo',
        href: 'https://github.com/san-gyeol/Sangyeol-FE',
        label: '모노레포',
      },
      {
        type: 'repo',
        href: 'https://github.com/JNU-econovation/Soop-APP',
        label: '이전 앱 레포',
      },
      {
        type: 'repo',
        href: 'https://github.com/JNU-econovation/Soop-WEB',
        label: '이전 웹 레포',
      },
    ],
  },
  // {
  //   id: 'csi-fall-detection',
  //   title: '캡스톤 · CSI 기반 낙상 감지',
  //   startDate: '2025-03-01',
  //   endDate: '2025-06-30',
  //   category: '인턴 · 학교',
  //   org: '전남대 소프트웨어공학과',
  //   role: '팀원',
  //   description:
  //     '박태준 교수님 지도로 멘토링을 받으며 중간 발표와 최종 발표를 마쳤습니다.',
  //   details: [
  //     '전남대 소프트웨어공학과 캡스톤 디자인 과제로 진행했고 박태준 교수님이 지도하셨습니다.',
  //     '"데이터셋 및 전처리" 발표자료를 만들어 맡았고 코드는 capstone 레포에 남아 있습니다.',
  //   ],
  //   links: [{ type: 'repo', href: 'https://github.com/geongyu09/capstone' }],
  // },
  // {
  //   id: 'abas-fe',
  //   title: 'ABAS-FE',
  //   startDate: '2025-01-01',
  //   endDate: '2025-05-31',
  //   category: '인턴 · 학교',
  //   org: 'bigdata-insight',
  //   role: '인턴 FE',
  //   description:
  //     '농업 빅데이터 연구실 인턴으로 데이터 처리와 업로드 페이지의 요구사항 대응을 맡았습니다.',
  //   details: [
  //     '매주 인턴 미팅에 참석하면서 데이터 처리 페이지와 업로드 페이지의 요구사항 대응을 담당했습니다.',
  //     '파일 종류 선택 에러 수정, 옵셔널 체이닝 누락, 비밀번호 정책 regex 변경, 데이터 처리 페이지 요구사항 반영, 업로드와 병합 변경사항 반영을 작업했습니다.',
  //   ],
  // },
  {
    id: 'eeos',
    title: 'EEOS',
    startDate: '2024-02-01',
    endDate: '2026-06-30',
    category: '팀 프로젝트',
    org: '에코노베이션 Black-company',
    role: 'FE 전담',
    description:
      '동아리 행사의 등록과 출석, 수요조사를 관리하는 서비스입니다. Next.js 웹과 Expo 네이티브를 모노레포로 묶어 FE를 사실상 전담했습니다.',
    quote: '“동아리 내에서 일어나는 모든 행사를 아카이빙하고 관리하자!”',
    details: [
      {
        tag: '기여',
        title: '애자일 개발 프로세스 구축 및 빠른 기능 개선',
        text: '실사용자가 있는 프로젝트라 주 평균 3~5건의 UI/UX 개선과 신규 기능 요청이 들어왔는데, 사용자 피드백을 빠르게 반영해야 했지만 초기에는 요구사항 정리부터 배포까지 평균 3~4주가 걸렸습니다. Padlet과 정기 인터뷰로 모은 피드백을 백로그로 체계화하고 2주 단위 스프린트를 도입해, 기능 요청부터 배포까지의 개발 사이클을 평균 2주 이내로 줄였습니다. Google Analytics로 사용자 행동 패턴을 분석하다가 "행사 당일에만 접속"하는 사용 패턴을 발견했고, 평소에도 쓸 수 있는 커뮤니티 기능(게시판, 캘린더)을 개발하고 서비스 접근성을 높이려고 플랫폼을 웹에서 앱으로 전환한 결과 월 활성 사용자가 40명에서 150명으로 3배 가까이 늘었습니다.',
      },
      {
        tag: '기여',
        title: '변경에 유연한 아키텍처 설계 및 개발',
        text: '동아리 서비스 특성상 주 평균 3~5건의 UI/UX 개선과 신규 기능 요청이 들어와 사용자 피드백을 빠르게 반영해야 했지만, 초기에는 요구사항 정리부터 배포까지 평균 3~4주가 걸렸습니다. Headless Component 패턴을 도입해 UI와 비즈니스 로직을 완전히 분리했는데, 페이지마다 UI 요구사항이 다른 탭 컴포넌트를 Headless 컴포넌트로 추상화해 5개 이상의 화면에서 재사용했고 신규 기능 개발 시간을 평균 40% 단축했습니다. 비즈니스 로직은 프레젠테이션 레이어에서 떼어 내 독립적인 도메인 모듈로 관리했는데, 행사 관리와 사용자 관리와 알림 시스템을 도메인별로 나누고 각 도메인의 핵심 로직을 순수 함수로 작성해 테스트 가능성과 유지보수성을 확보했습니다.',
      },
      {
        tag: '배운 점',
        title: '예상하지 못한 요구사항에 대응하는 코드',
        text: '주간발표 중심 개편과 앱 전환을 거치며 실사용자가 있는 앱에는 예상하지 못한 방향의 요구사항이 계속 들어온다는 것을 체감했고, 요구사항이 들어올 때마다 개발자가 할 수 있는 일은 새로운 요구사항에 유연하게 대응할 수 있는 코드를 작성하는 것임을 깨달았습니다.',
      },
      {
        tag: '배운 점',
        title: '도메인을 나눠 변경의 범위 줄이기',
        text: '한 훅에 몰려 있던 페이지 로직을 관심사별 훅으로 나누면서, 변경에 유연하고 재사용성이 높은 코드를 만들려면 먼저 도메인을 분리해야 하고 컴포넌트와 훅이 각자의 책임과 역할에 맞춰 자율적으로 동작하도록 작성해야 변경의 범위를 줄일 수 있다는 것을 깨달았습니다.',
      },
      {
        tag: '배운 점',
        title: '사용자에게 현재 상태 알려 주기',
        text: '토큰이 만료되면 사용자가 이유도 모른 채 서비스에 갇히는 문제를 겪으면서 사용자에게 현재 상태를 알려 주는 일이 생각보다 필요하다는 것을 깨달았고, 서비스상의 문제나 업데이트 같은 상황은 공지나 대체 경로 안내 같은 방식으로 사용자에게 잘 안내해야 한다는 것을 알게 됐습니다.',
      },
      {
        tag: '배운 점',
        title: '사용자를 가까이에서 자주 만나기',
        text: 'GA로는 보이지 않던 접속하지 않는 이유를 커피챗과 인터뷰에서 듣고 나서 사용자의 데이터를 모으는 일이 매우 중요하다는 것을 깨달았고, 데이터를 빠르게 모으려면 사용자를 가까이하고 자주 만날 필요가 있다는 것도 알게 됐습니다.',
      },
      {
        tag: '배운 점',
        title: '가장 위험한 가정부터 테스트하기',
        text: '무엇이 틀리면 서비스 전체가 흔들릴 수 있는 위험한 부분인지를 명확히 인지하는 능력이 프로덕트 엔지니어에게 필요하다는 것을 깨달았고, 현실적으로 모든 코드에 테스트를 붙일 수는 없으므로 로그인처럼 가장 위험한 가정이 들어 있는 부분의 안정성을 보장하는 방식으로 테스트해야 한다는 것을 알게 됐습니다.',
      },
    ],
    links: [
      { type: 'repo', href: 'https://github.com/JNU-econovation/EEOS-FE' },
    ],
  },
  {
    id: 'econovation-recruit',
    title: 'Econovation-recruit',
    startDate: '2024-02-01',
    endDate: '2025-03-31',
    category: '팀 프로젝트',
    org: '에코노베이션',
    role: 'FE',
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
    links: [
      {
        type: 'repo',
        href: 'https://github.com/JNU-econovation/econo-recruit-fe',
      },
    ],
  },
  {
    id: 'neowagreen',
    title: '너와그린기린그림',
    startDate: '2023-11-01',
    endDate: '2024-06-30',
    category: '팀 프로젝트',
    org: '에코노베이션 *23#',
    role: 'FE 단독',
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
    links: [
      { type: 'repo', href: 'https://github.com/JNU-econovation/girin-grim' },
    ],
  },
  {
    id: 'cache-brain',
    title: 'Cache-Brain',
    startDate: '2023-09-01',
    endDate: '2023-11-30',
    category: '개인 프로젝트',
    org: '개인',
    role: '단독',
    description: '암기 과목 공부를 돕는 커뮤니티형 학습 플랫폼입니다.',
    details: [
      'DB 대신 Headless CMS(Sanity)를 쓰고 프론트엔드와 서버를 Next.js 하나로 통합했으며, 인증에는 NextAuth를 데이터 페칭에는 SWR 컨텍스트를 붙였습니다.',
      '유저와 카드 상세, 학습 페이지, 캐러셀, 진행도 구조로 뼈대를 먼저 만든 뒤 디렉토리 구조와 url 모듈을 리팩터링했습니다.',
      '마지막으로 검색 모달과 search API, useDebounce를 직접 구현했습니다.',
    ],
    links: [{ type: 'repo', href: 'https://github.com/geongyu09/Cache-Brain' }],
  },
];

export default PROJECT_DATA;
