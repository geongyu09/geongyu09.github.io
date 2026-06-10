import { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import cn from '@/utils/cn';

const InlineTag = ({
  children,
  className,
  href,
  ...rest
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) => {
  const classes = cn(
    'text-xs text-ink-950 border-b border-ink-950 hover:text-blue-600 hover:border-blue-600',
    className,
  );
  const content = String(children).startsWith('#') ? children : `#${children}`;

  // href가 없으면 (예: 링크 카드 내부) <a> 중첩을 피하기 위해 <span>으로 렌더링한다.
  if (!href) {
    return (
      <span className={classes} {...rest}>
        {content}
      </span>
    );
  }

  return (
    <a className={classes} href={href} {...rest}>
      {content}
    </a>
  );
};

export default InlineTag;
