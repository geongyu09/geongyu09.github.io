import { ActivityLink } from '@/types/log';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

interface Props {
  links: ActivityLink[];
}

/** 활동이 남긴 바깥 주소를 알약 모양으로 늘어놓습니다. */
export default function ActivityLinkList({ links }: Props) {
  return (
    <ul className="m-0 mt-s-5 flex list-none flex-wrap gap-s-2 p-0">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-s-3 rounded-pill border border-ink-200 px-s-4 py-s-2 font-mono text-[13px] text-ink-700 transition-colors hover:border-ink-950 hover:text-ink-950"
          >
            <span>{link.label}</span>
            <FiArrowUpRight size={14} className="shrink-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
