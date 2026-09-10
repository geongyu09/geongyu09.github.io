import { FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import { PresentationEmbed } from '../../utils';

/** 임베드 갈래마다 화면에 적어 주는 이름입니다. */
const SOURCE_LABEL: Record<PresentationEmbed['kind'], string> = {
  youtube: 'YouTube',
  figma: 'Figma',
};

interface Props {
  embed: PresentationEmbed | null;
  /** 재생 틀에 붙이는 이름. 발표 제목을 그대로 씁니다. */
  title: string;
  /** 임베드로 바꿀 수 없는 발표에서 대신 안내할 원문 주소입니다. */
  href?: string;
}

/** 발표 자료를 모달 안에서 그대로 재생합니다. 띄울 수 없는 발표는 원문으로 나가는 길만 안내합니다. */
export default function EmbedFrame({ embed, title, href }: Props) {
  if (!embed) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-s-4 rounded-r-2 border border-ink-200 bg-ink-50 px-s-5 text-center">
        <p className="m-0 max-w-[420px] text-[15px] leading-[1.7] text-ink-700">
          {href
            ? '이 발표 자료는 모달 안에서 바로 재생할 수 없어서, 아래 원문 보기를 누르면 새 탭에서 이어 볼 수 있습니다.'
            : '이 발표는 아직 공개된 자료가 없어서 제목과 발표한 자리만 남겨 두었습니다.'}
        </p>
        {href && (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-s-2 rounded-pill border border-ink-200 px-s-4 py-s-2 font-mono text-[13px] text-ink-700 transition-colors hover:border-ink-950 hover:text-ink-950"
          >
            <FiExternalLink size={14} className="shrink-0" />
            <span>원문 보기</span>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-r-2 border border-ink-200 bg-ink-950">
      <iframe
        title={`${title} 발표 자료 (${SOURCE_LABEL[embed.kind]})`}
        src={embed.src}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
