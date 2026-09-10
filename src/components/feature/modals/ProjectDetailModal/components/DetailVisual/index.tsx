import { ProjectDetailImage } from '@/types/log';
import Image from 'next/image';
import { padOrder } from '../../utils';

interface Props {
  /** 문단에 걸어 둔 이미지입니다. 걸지 않았으면 순번과 분류를 적은 자리를 대신 그립니다. */
  image?: ProjectDetailImage;
  /** 이미지를 걸지 않았을 때 크게 적는 문단 순번입니다. */
  order?: number;
  /** 이미지를 걸지 않았을 때 순번 아래에 적는 프로젝트 분류입니다. */
  label: string;
  /** 이미지를 내려받을 크기를 브라우저에 알려 줍니다. */
  sizes: string;
  /** 모달을 열자마자 보이는 그림에만 켭니다. 늦게 뜨는 것을 막습니다. */
  priority?: boolean;
}

/** 상세 문단 하나에 짝지어 보여 주는 그림입니다. 바깥에서 자리를 잡아 두고 그 안을 채웁니다. */
export default function DetailVisual({
  image,
  order,
  label,
  sizes,
  priority = false,
}: Props) {
  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-contain p-s-4"
        priority={priority}
        unoptimized
      />
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-s-3 bg-[radial-gradient(var(--ink-200)_1px,transparent_1px)] [background-size:10px_10px]"
      aria-hidden
    >
      {order !== undefined && (
        <span className="font-mono text-[44px] leading-none tracking-[-0.02em] text-ink-300">
          {padOrder(order)}
        </span>
      )}
      <span className="rounded-pill bg-ink-0/80 px-s-3 py-s-1 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-500">
        {label}
      </span>
    </div>
  );
}
