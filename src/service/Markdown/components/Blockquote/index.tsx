import cn from '@/utils/cn';
import React from 'react';

import './styled.css'; // 적용이 안됨

export type QuoteStyle = 'default' | 'info' | 'warning' | 'success' | 'error';

const styleClasses: Record<QuoteStyle, string> = {
  default: 'border-ink-950',
  info: 'border-blue-600 flex gap-6 items-center',
  warning: 'border-yellow-500 flex gap-6 items-center',
  success: 'border-emerald-500 flex gap-6 items-center',
  error: 'border-red-500 flex gap-6 items-center',
};

interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  node: Element | undefined;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export default function Blockquote({
  node,
  children,
  className = '',
  ...rest
}: BlockquoteProps): JSX.Element {
  if (!node) return <div />;

  const contents = (node.children[1].children[0] as any).value?.split('\n');

  let styleType: QuoteStyle = 'default';

  if (!contents) styleType = 'default';
  if (contents?.[0] === '🍀') styleType = 'success';
  if (contents?.[0] === '⚠️' || contents?.[0] === '❗️') styleType = 'warning';
  if (contents?.[0] === '❌') styleType = 'error';
  if (contents?.[0] === '💡') styleType = 'info';

  return (
    <blockquote
      className={cn(
        'border-l-[3px] my-8 py-4 px-6 text-body text-ink-900 not-italic whitespace-pre-wrap',
        'blockquote',
        styleClasses[styleType],
        className,
      )}
      {...rest}
    >
      {children instanceof Array &&
        children.map((childrenText, index) => {
          const isEmptyString = childrenText === '\n' || childrenText === '';

          return (
            !isEmptyString && (
              <div
                key={`${index * 2}-${childrenText}`}
                className="flex items-center"
              >
                {styleType !== 'default' && index === 1 ? (
                  <div className="mark">{childrenText}</div>
                ) : (
                  <div
                    key={`${index * 2}-${childrenText}`}
                    className={cn('text-lg', {
                      'text-xl': index === 0,
                    })}
                  >
                    {childrenText}
                  </div>
                )}
              </div>
            )
          );
        })}
    </blockquote>
  );
}

Blockquote.defaultProps = {
  children: null,
  className: '',
};
