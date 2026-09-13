import { ExperienceMission } from '@/types/log';
import MissionLinkList from './components/MissionLinkList';
import MissionReviewList from './components/MissionReviewList';

interface Props {
  /** 목록 위에 붙는 문구입니다. 적지 않으면 '미션'으로 채웁니다. */
  label?: string;
  missions: ExperienceMission[];
}

/** 한 레벨에서 수행한 미션을 순번과 함께 늘어놓습니다. 제목 아래에 제출 주소와 그 기간의 회고 글을 달고 그 아래에 겪은 일을 적습니다. */
export default function MissionList({ label = '미션', missions }: Props) {
  return (
    <div className="mt-s-5">
      <span className="font-mono text-[12px] tracking-[0.06em] text-ink-400">
        {label}
      </span>
      <ol className="m-0 mt-s-3 flex list-none flex-col gap-s-5 p-0">
        {missions.map((mission, index) => (
          <li key={mission.title} className="flex gap-s-4">
            <span
              className="mt-[6px] shrink-0 font-mono text-[12px] tracking-[0.06em] text-ink-400"
              aria-hidden
            >
              {(index + 1).toString().padStart(2, '0')}
            </span>

            <div className="min-w-0 flex-1">
              <h4 className="m-0 text-[17px] font-semibold leading-[1.6] tracking-[-0.01em] text-ink-950 sm:text-[18px]">
                {mission.title}
              </h4>

              {mission.links && mission.links.length > 0 && (
                <MissionLinkList links={mission.links} />
              )}

              {mission.reviews && mission.reviews.length > 0 && (
                <MissionReviewList
                  label={mission.reviewLabel}
                  reviews={mission.reviews}
                />
              )}

              <div className="mt-s-3 flex flex-col gap-s-3">
                {mission.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="m-0 text-[16px] leading-[1.8] text-ink-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
