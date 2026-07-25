'use client';

import ImageModal from '@/components/feature/modals/ImageModal';
import { useModal } from '@/lib/modal';
import cn from '@/utils/cn';
import Image from 'next/image';
import React from 'react';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Img({ width, height, src, alt, title }: ImgProps) {
  const { pushModal } = useModal();
  const imageSrc = typeof src === 'string' ? src : '';
  const imageAlt = alt ?? 'post content';

  const handleClick = () => {
    if (!imageSrc) return;
    pushModal({
      modal: <ImageModal src={imageSrc} alt={imageAlt} />,
    });
  };

  const image = (
    <Image
      width={width ? Number(width) : 1000}
      height={height ? Number(height) : 1000}
      src={imageSrc}
      alt={imageAlt}
      onClick={handleClick}
      className={cn(
        'rounded-xl block shadow-sm select-none',
        'max-h-[600px] w-auto object-contain mx-auto',
        'cursor-zoom-in transition-transform hover:scale-[1.01]',
        !title && 'my-14',
      )}
    />
  );

  if (!title) return image;

  return (
    <figure className="my-14">
      {image}
      <figcaption className="mt-3 text-center text-[14px] leading-normal text-ink-500">
        {title}
      </figcaption>
    </figure>
  );
}

Img.defaultProps = {
  className: '',
};
