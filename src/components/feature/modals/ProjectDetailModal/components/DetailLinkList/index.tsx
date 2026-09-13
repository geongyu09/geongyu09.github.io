import { ProjectDetailLink } from '@/types/log';
import cn from '@/utils/cn';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

interface Props {
  links: ProjectDetailLink[];
  className?: string;
}

/** 블로그 안의 주소는 슬래시로 시작하므로, 새 창을 띄울 바깥 주소인지 이것으로 가릅니다. */
const isInternalHref = (href: string) => href.startsWith('/');

/**
 * 상세 문단 아래에 다는 주소 목록입니다.
 * 문단에서 말한 코드가 놓인 레포 파일처럼 읽다가 바로 열어 볼 곳을 걸어 둡니다.
 */
export default function DetailLinkList({ links, className }: Props) {
  return (
    <ul className={cn('m-0 flex list-none flex-wrap gap-s-2 p-0', className)}>
      {links.map((link) => {
        const isInternal = isInternalHref(link.href);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              target={isInternal ? undefined : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              className="flex items-center gap-s-2 rounded-pill border border-ink-200 px-s-3 py-[5px] font-mono text-[12px] text-ink-700 transition-colors hover:border-ink-950 hover:text-ink-950"
            >
              <span>{link.label}</span>
              <FiArrowUpRight size={13} className="shrink-0" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
