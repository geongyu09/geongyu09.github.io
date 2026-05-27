import { HTMLAttributes } from 'react';
import cn from '@/utils/cn';

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

const Chip = ({ active = false, className, ...rest }: ChipProps) => (
  <span
    className={cn(
      'inline-flex items-center px-3 py-[5px] text-xs rounded-pill border transition-colors',
      active
        ? 'bg-ink-950 text-ink-0 border-ink-950 font-medium'
        : 'bg-ink-0 text-ink-700 border-ink-200 hover:border-ink-950',
      className,
    )}
    {...rest}
  />
);

export default Chip;
