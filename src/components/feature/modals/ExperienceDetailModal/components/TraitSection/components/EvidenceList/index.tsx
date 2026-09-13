import { ExperienceEvidence } from '@/types/log';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';

interface Props {
  /** 목록 위에 붙는 문구입니다. 적지 않으면 '근거 활동'으로 채웁니다. */
  label?: string;
  evidences: ExperienceEvidence[];
}

/** 보여준 모습을 뒷받침하는 활동을 늘어놓습니다. 글로 남긴 활동은 눌러서 그 자리로 갈 수 있습니다. */
export default function EvidenceList({
  label = '근거 활동',
  evidences,
}: Props) {
  return (
    <div className="mt-s-5">
      <span className="font-mono text-[12px] tracking-[0.06em] text-ink-400">
        {label}
      </span>
      <ul className="m-0 mt-s-3 list-disc space-y-s-3 pl-s-4 marker:text-ink-300">
        {evidences.map((evidence) => (
          <li
            key={evidence.text}
            className="pl-s-1 text-[16px] leading-[1.8] text-ink-700"
          >
            {evidence.href ? (
              <Link
                href={evidence.href}
                className="text-inherit no-underline transition-colors hover:text-ink-950"
              >
                {evidence.text}
                <FiArrowUpRight
                  size={14}
                  className="ml-s-1 inline shrink-0 align-[-1px] text-ink-400"
                />
              </Link>
            ) : (
              evidence.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
