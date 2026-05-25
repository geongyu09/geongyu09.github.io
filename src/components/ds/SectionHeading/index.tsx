import { HTMLAttributes, ReactNode } from 'react';
import cn from '@/utils/cn';

interface Props extends HTMLAttributes<HTMLDivElement> {
  meta?: ReactNode;
}

const SectionHeading = ({ children, meta, className, ...rest }: Props) => (
  <div
    className={cn(
      'flex items-baseline justify-between pb-3 mb-s-6 border-b border-ink-950',
      className,
    )}
    {...rest}
  >
    <h2 className="text-sm font-semibold tracking-[0.04em] uppercase text-ink-950">
      {children}
    </h2>
    {meta && <div className="font-mono text-xs text-ink-500">{meta}</div>}
  </div>
);

export default SectionHeading;
