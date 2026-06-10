import React from 'react';
import cn from '@/utils/cn';
import SITE from '@/constants/site';

interface AProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
}

function isExternalHref(href: string | undefined): boolean {
  if (!href) return false;
  if (href.startsWith('/') || href.startsWith('#')) return false;
  if (!/^https?:\/\//i.test(href)) return false;
  try {
    const linkHost = new URL(href).host;
    const siteHost = new URL(SITE.URL).host;
    return linkHost !== siteHost;
  } catch {
    return false;
  }
}

export default function A({
  children,
  className = '',
  href,
  target,
  rel,
  ...rest
}: AProps) {
  const external = isExternalHref(href);
  const finalTarget = target ?? (external ? '_blank' : undefined);
  const finalRel = rel ?? (external ? 'noopener noreferrer' : undefined);

  return (
    <a
      className={cn('text-blue-500 underline', className)}
      href={href}
      target={finalTarget}
      rel={finalRel}
      {...rest}
    >
      {children}
    </a>
  );
}

A.defaultProps = {
  children: null,
  className: '',
};
