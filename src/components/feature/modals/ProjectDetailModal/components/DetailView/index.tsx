'use client';

import Eyebrow from '@/components/ds/Eyebrow';
import { ProjectDetailStep } from '@/types/log';
import { useEffect, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import DetailCode from '../DetailCode';
import DetailLinkList from '../DetailLinkList';
import padOrder from '../../utils';

interface Props {
  detail: ProjectDetailStep;
  /** 갈래를 적지 않은 문단의 자리에 대신 적는 순번입니다. */
  order: number;
  onBack: () => void;
}

/**
 * 박스 하나를 눌렀을 때 모달 오른쪽을 채우는 문단 내용입니다.
 * 그림은 왼쪽 열이 맡으므로 여기에서는 글과 코드, 주소만 답니다.
 */
export default function DetailView({ detail, order, onBack }: Props) {
  const backRef = useRef<HTMLButtonElement>(null);

  // 눌렀던 박스가 화면에서 사라지므로 키보드 포커스를 돌아가기 단추로 옮겨 둡니다.
  useEffect(() => {
    backRef.current?.focus();
  }, []);

  return (
    <div>
      <button
        ref={backRef}
        type="button"
        onClick={onBack}
        className="flex items-center gap-s-2 font-mono text-[13px] text-ink-500 transition-colors hover:text-ink-950"
      >
        <FiArrowLeft size={14} className="shrink-0" />
        <span>목록으로</span>
      </button>

      <Eyebrow className="mt-s-6 text-[13px] text-ink-900">
        {detail.tag ?? padOrder(order)}
      </Eyebrow>
      {detail.title && (
        <h3 className="m-0 mt-s-3 text-[24px] font-semibold leading-[1.3] tracking-[-0.02em] text-ink-950">
          {detail.title}
        </h3>
      )}
      <p className="m-0 mt-s-4 whitespace-pre-line text-[17px] leading-[1.85] text-ink-900">
        {detail.text}
      </p>

      {detail.code && (
        <DetailCode
          className="mt-s-5"
          html={detail.code.html}
          caption={detail.code.caption}
        />
      )}

      {detail.links && detail.links.length > 0 && (
        <DetailLinkList className="mt-s-5" links={detail.links} />
      )}
    </div>
  );
}
