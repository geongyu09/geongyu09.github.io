import { ExperienceSectionItem } from '@/types/log';
import LabeledList from '../LabeledList';
import SectionLinkList from './components/SectionLinkList';

interface Props {
  items: ExperienceSectionItem[];
}

/**
 * 갈래 안의 항목을 순번과 함께 늘어놓습니다.
 * 제목 옆에 기간이나 발표한 자리를 작게 달고, 그 아래에 겪은 일과 남긴 주소를 적습니다.
 */
export default function SectionItemList({ items }: Props) {
  return (
    <ol className="m-0 mt-s-5 flex list-none flex-col gap-s-5 p-0">
      {items.map((item, index) => (
        <li key={item.title} className="flex gap-s-4">
          <span
            className="mt-[6px] shrink-0 font-mono text-[12px] tracking-[0.06em] text-ink-400"
            aria-hidden
          >
            {(index + 1).toString().padStart(2, '0')}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-s-3">
              <h4 className="m-0 text-[17px] font-semibold leading-[1.6] tracking-[-0.01em] text-ink-950 sm:text-[18px]">
                {item.title}
              </h4>
              {item.meta && (
                <span className="font-mono text-[12px] tracking-[0.06em] text-ink-400">
                  {item.meta}
                </span>
              )}
            </div>

            {item.paragraphs && item.paragraphs.length > 0 && (
              <div className="mt-s-3 flex flex-col gap-s-3">
                {item.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="m-0 text-[16px] leading-[1.8] text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {item.lists?.map((list) => (
              <LabeledList
                key={list.label}
                label={list.label}
                items={list.items}
              />
            ))}

            {item.links && item.links.length > 0 && (
              <SectionLinkList links={item.links} />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
