import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** 상세 모달을 그리는 병렬 경로 슬롯입니다. 주소가 /log 일 때는 default.tsx 가 아무것도 그리지 않습니다. */
  modal: ReactNode;
}

export default function LogLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
