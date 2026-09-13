import { ExperienceMissionLink } from '@/types/log';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

interface Props {
  links: ExperienceMissionLink[];
}

/**
 * 미션이 남긴 제출 주소를 알약 모양으로 늘어놓습니다.
 * 아직 주소를 알지 못하는 제출물은 누를 수 없도록 점선 알약으로 두어, 주소가 있는 것과 구분됩니다.
 */
export default function MissionLinkList({ links }: Props) {
  return (
    <ul className="m-0 mt-s-3 flex list-none flex-wrap gap-s-2 p-0">
      {links.map((link) => (
        <li key={link.label}>
          {link.href ? (
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-s-2 rounded-pill border border-ink-200 px-s-3 py-[5px] font-mono text-[12px] text-ink-700 transition-colors hover:border-ink-950 hover:text-ink-950"
            >
              <span>{link.label}</span>
              <FiArrowUpRight size={13} className="shrink-0" />
            </Link>
          ) : (
            <span className="flex items-center rounded-pill border border-dashed border-ink-200 px-s-3 py-[5px] font-mono text-[12px] text-ink-400">
              {link.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
