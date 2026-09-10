import Image from 'next/image';

/** 사진을 내려받을 크기를 브라우저에 알려 줍니다. 넓은 화면에서는 모달 윗줄의 왼쪽 칸만 차지합니다. */
const VISUAL_SIZES = '(min-width: 1024px) 400px, 100vw';

interface Props {
  /** 활동 사진입니다. 걸어 두지 않았으면 소속을 적은 자리를 대신 그립니다. */
  src?: string;
  /** 사진을 설명하는 문구입니다. */
  alt: string;
  /** 사진을 걸지 않았을 때 자리에 적는 소속입니다. */
  label: string;
}

/**
 * 모달 윗줄 왼쪽에 놓이는 활동 사진 자리입니다.
 * 좁은 화면에서는 4:3 으로 두고, 넓은 화면에서는 오른쪽 칸의 높이를 따라가 빈 자리가 남지 않게 합니다.
 */
export default function ExperienceVisual({ src, alt, label }: Props) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-r-2 border border-ink-200 bg-ink-50 lg:aspect-auto lg:h-full lg:min-h-[240px]">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={VISUAL_SIZES}
          className="object-cover"
          priority
          unoptimized
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-[radial-gradient(var(--ink-200)_1px,transparent_1px)] [background-size:10px_10px]"
          aria-hidden
        >
          <span className="rounded-pill bg-ink-0/80 px-s-3 py-s-1 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-500">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
