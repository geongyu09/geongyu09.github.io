import { ProjectDetailImage } from '@/types/log';
import cn from '@/utils/cn';
import { ComponentProps, useRef, useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import DetailVisual from '../DetailVisual';

interface Props extends Omit<ComponentProps<typeof DetailVisual>, 'image'> {
  /** 왼쪽 열에 늘어놓을 그림입니다. 두 장 이상이면 옆으로 넘겨 볼 수 있고, 비어 있으면 DetailVisual의 빈 자리를 그립니다. */
  images: ProjectDetailImage[];
}

/** 상세 문단을 뒷받침하는 그림을 한 장씩 넘겨 보는 자리입니다. 넘기기는 브라우저의 scroll-snap에 맡깁니다. */
export default function DetailGallery({ images, priority, ...rest }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const slides = images.length > 0 ? images : [undefined];
  const hasMany = images.length > 1;

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    // 움직임을 줄인 환경에서는 CSS의 scroll-behavior를 따라 곧바로 넘어갑니다.
    track.scrollTo({ left: next * track.clientWidth });
  };

  return (
    <>
      <div
        role={hasMany ? 'region' : undefined}
        aria-roledescription={hasMany ? 'carousel' : undefined}
        aria-label={hasMany ? '기여 자료' : undefined}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-r-2 border border-ink-200 bg-ink-50 lg:aspect-auto lg:min-h-0 lg:flex-1"
      >
        <div
          ref={trackRef}
          onScroll={(event) => {
            const track = event.currentTarget;
            setIndex(Math.round(track.scrollLeft / track.clientWidth));
          }}
          className="scrollbar-hidden absolute inset-0 flex snap-x snap-mandatory overflow-x-auto motion-safe:scroll-smooth"
        >
          {slides.map((image, order) => (
            <div
              key={image?.src ?? 'empty'}
              role={hasMany ? 'group' : undefined}
              aria-roledescription={hasMany ? 'slide' : undefined}
              aria-label={
                hasMany ? `${order + 1} / ${images.length}` : undefined
              }
              className="relative h-full w-full shrink-0 snap-center"
            >
              <DetailVisual
                {...rest}
                image={image}
                priority={priority && order === 0}
              />
            </div>
          ))}
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              aria-label="이전 자료"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
              className="absolute left-s-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-ink-0/90 text-ink-700 backdrop-blur-sm transition-opacity hover:text-ink-950 disabled:pointer-events-none disabled:opacity-0"
            >
              <IoChevronBack size={18} />
            </button>
            <button
              type="button"
              aria-label="다음 자료"
              disabled={index === images.length - 1}
              onClick={() => goTo(index + 1)}
              className="absolute right-s-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-ink-0/90 text-ink-700 backdrop-blur-sm transition-opacity hover:text-ink-950 disabled:pointer-events-none disabled:opacity-0"
            >
              <IoChevronForward size={18} />
            </button>
            <div className="absolute bottom-s-3 left-1/2 flex -translate-x-1/2 gap-s-2 rounded-pill bg-ink-0/85 px-s-3 py-s-2 backdrop-blur-sm">
              {images.map((image, order) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`${order + 1}번째 자료 보기`}
                  aria-current={order === index}
                  onClick={() => goTo(order)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    order === index ? 'w-4 bg-ink-900' : 'w-1.5 bg-ink-300',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <p className="m-0 min-h-[18px] shrink-0 text-right text-[13px] leading-[1.4] text-ink-500">
        {images[index]?.caption}
      </p>
    </>
  );
}
