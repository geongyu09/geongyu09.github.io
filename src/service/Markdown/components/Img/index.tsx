import cn from '@/utils/cn';
import Image from 'next/image';
import React from 'react';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Img({
  width,
  height,
  src,
  alt,
}: ImgProps): JSX.Element {
  return (
    <Image
      width={width ? Number(width) : 1000}
      height={height ? Number(height) : 1000}
      src={src ?? ''}
      alt={alt ?? 'post content'}
      className={cn('my-14 rounded-xl block shadow-sm select-none')}
    />
  );
}

Img.defaultProps = {
  className: '',
};
