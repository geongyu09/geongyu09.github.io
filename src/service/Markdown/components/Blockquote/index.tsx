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
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

// children 트리에서 첫 번째 텍스트를 추출한다.
// rehype-react v8부터 node prop이 기본 전달되지 않으므로, 스타일 판별을 children 기반으로 한다.
function getFirstText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) {
    for (const child of node) {
      const text = getFirstText(child);
      if (text.trim()) return text;
    }
    return '';
  }
  if (React.isValidElement(node)) {
    return getFirstText(
      (node.props as { children?: React.ReactNode }).children,
    );
  }
  return '';
}

export default function Blockquote({
  children,
  className = '',
  ...rest
}: BlockquoteProps) {
  const firstLine = getFirstText(children).split('\n')[0]?.trim();

  let styleType: QuoteStyle = 'default';

  if (firstLine === '🍀') styleType = 'success';
  if (firstLine === '⚠️' || firstLine === '❗️') styleType = 'warning';
  if (firstLine === '❌') styleType = 'error';
  if (firstLine === '💡') styleType = 'info';

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
