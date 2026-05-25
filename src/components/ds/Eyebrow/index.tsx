import { HTMLAttributes } from 'react';
import cn from '@/utils/cn';

const Eyebrow = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'font-mono text-[11px] tracking-[0.08em] uppercase text-ink-500',
      className,
    )}
    {...rest}
  />
);

export default Eyebrow;
