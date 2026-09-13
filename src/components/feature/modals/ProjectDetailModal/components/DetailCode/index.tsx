import cn from '@/utils/cn';
import './style.css';

interface Props {
  /** 빌드 때 shiki가 색칠해 둔 <pre> 마크업입니다. */
  html: string;
  /** 코드 위에 적는 짧은 설명입니다. */
  caption?: string;
  className?: string;
}

/**
 * 상세 문단 아래에 붙이는 코드 조각입니다.
 * 색칠은 정적 내보내기 시점에 끝내 두므로 여기에서는 받아 온 마크업을 걸기만 합니다.
 */
export default function DetailCode({ html, caption, className }: Props) {
  return (
    <figure className={cn('m-0', className)}>
      {caption && (
        <figcaption className="m-0 mb-s-2 font-mono text-[12px] leading-[1.5] text-ink-500">
          {caption}
        </figcaption>
      )}
      <div
        className="detail-code overflow-x-auto rounded-r-1 border border-ink-200 bg-ink-50 px-s-4 py-s-4 font-code text-[13px] leading-[1.6]"
        // 데이터에 적어 둔 코드를 빌드 때 색칠한 마크업이라 바깥에서 들어오는 값이 없습니다.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
