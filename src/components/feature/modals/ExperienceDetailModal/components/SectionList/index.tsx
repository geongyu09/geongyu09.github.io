import Eyebrow from '@/components/ds/Eyebrow';
import { ExperienceSection } from '@/types/log';
import LabeledList from './components/LabeledList';
import SectionItemList from './components/SectionItemList';

interface Props {
  sections: ExperienceSection[];
}

/**
 * 활동을 갈래로 끊어 보여 줍니다.
 * 갈래마다 제목을 달고 위에 선을 그어, 프로젝트와 부서 활동과 스터디가 한 목록에 섞여 읽히지 않게 합니다.
 */
export default function SectionList({ sections }: Props) {
  return (
    <>
      {sections.map((section) => (
        <section
          key={section.label}
          className="mt-s-7 border-t border-ink-200 pt-s-7"
        >
          <div className="flex flex-wrap items-baseline gap-s-3">
            <Eyebrow className="text-[13px] text-ink-900">
              {section.label}
            </Eyebrow>
            {section.meta && (
              <span className="font-mono text-[12px] tracking-[0.06em] text-ink-400">
                {section.meta}
              </span>
            )}
          </div>

          {section.paragraphs && section.paragraphs.length > 0 && (
            <div className="mt-s-4 flex flex-col gap-s-4">
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="m-0 text-[17px] leading-[1.85] text-ink-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {section.lists?.map((list) => (
            <LabeledList
              key={list.label}
              label={list.label}
              items={list.items}
            />
          ))}

          {section.items && section.items.length > 0 && (
            <SectionItemList items={section.items} />
          )}
        </section>
      ))}
    </>
  );
}
