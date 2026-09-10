import LogPageView from '@/components/feature/Log/LogPageView';

/**
 * 상세 모달 주소로 곧바로 들어왔을 때 children 슬롯이 그릴 화면입니다.
 * 이때는 /log 를 거치지 않아 page.tsx 가 그려지지 않으므로, 모달 뒤에 같은 본문을 깔아 둡니다.
 */
export default function LogDefault() {
  return <LogPageView />;
}
