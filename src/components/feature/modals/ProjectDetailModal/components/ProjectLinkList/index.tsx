import { ProjectLink, ProjectLinkType } from '@/types/log';
import Link from 'next/link';
import { IconType } from 'react-icons';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiGithub,
  FiGlobe,
  FiPackage,
} from 'react-icons/fi';

/** 주소 종류마다 붙는 아이콘과, 따로 적지 않았을 때 쓰는 문구입니다. */
const LINK_PRESET: Record<ProjectLinkType, { icon: IconType; label: string }> =
  {
    repo: { icon: FiGithub, label: '레포지토리' },
    npm: { icon: FiPackage, label: 'npm 패키지' },
    site: { icon: FiGlobe, label: '서비스 바로가기' },
    docs: { icon: FiBookOpen, label: '문서' },
  };

interface Props {
  links: ProjectLink[];
}

/** 프로젝트가 공개해 둔 바깥 주소를 알약 모양으로 늘어놓습니다. */
export default function ProjectLinkList({ links }: Props) {
  return (
    <ul className="m-0 mt-s-5 flex list-none flex-wrap gap-s-2 p-0">
      {links.map((link) => {
        const { icon: Icon, label } = LINK_PRESET[link.type];

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-s-3 rounded-pill border border-ink-200 px-s-4 py-s-2 font-mono text-[13px] text-ink-700 transition-colors hover:border-ink-950 hover:text-ink-950"
            >
              <Icon size={15} className="shrink-0" />
              <span>{link.label ?? label}</span>
              <FiArrowUpRight size={14} className="shrink-0" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
