import { ButtonHTMLAttributes, forwardRef } from 'react';
import cn from '@/utils/cn';

type Variant = 'primary' | 'default' | 'ghost' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANT: Record<Variant, string> = {
  primary:
    'inline-flex items-center gap-2 px-[18px] py-[10px] text-sm font-medium rounded-pill bg-ink-950 text-ink-0 border border-ink-950 hover:bg-ink-800 transition-colors',
  default:
    'inline-flex items-center gap-2 px-[18px] py-[10px] text-sm font-medium rounded-pill bg-ink-0 text-ink-950 border border-ink-950 hover:bg-ink-950 hover:text-ink-0 transition-colors',
  ghost:
    'inline-flex items-center gap-2 px-[18px] py-[10px] text-sm font-medium rounded-pill bg-transparent text-ink-500 border border-transparent hover:bg-ink-100 hover:text-ink-950 transition-colors',
  link: 'inline text-blue-600 border-b border-blue-600 pb-[1px] hover:text-blue-800 hover:border-blue-800',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', className, type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn(VARIANT[variant], className)}
      {...rest}
    />
  ),
);
Button.displayName = 'DSButton';

export default Button;
