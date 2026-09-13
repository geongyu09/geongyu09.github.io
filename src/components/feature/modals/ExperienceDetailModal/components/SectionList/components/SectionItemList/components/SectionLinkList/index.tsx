import { ExperienceSectionLink } from '@/types/log';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

interface Props {
  links: ExperienceSectionLink[];
}

/** 블로그 안의 주소는 슬래시로 시작하므로, 새 창을 띄울 바깥 주소인지 이것으로 가릅니다. */
const isInternalHref = (href: string) => href.startsWith('/');

/**
 * 항목이 남긴 주소를 알약 모양으로 늘어놓습니다.
 * 상세 모달처럼 블로그 안으로 가는 주소는 같은 창에서 열고, 레포와 발표 영상 같은 바깥 주소만 새 창에서 엽니다.
 */
export default function SectionLinkList({ links }: Props) {
  return (
    <ul className="m-0 mt-s-3 flex list-none flex-wrap gap-s-2 p-0">
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
