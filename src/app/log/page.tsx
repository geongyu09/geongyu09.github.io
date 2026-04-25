import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import GitHubActivityGraph from '@/components/feature/Log/GitHubActivityGraph';
import LogBanner from '@/components/feature/Log/LogBanner';
// import { STUDY_DATA } from '@/constants/log/studyData';
// import ROUTE_PATH from '@/constants/path/routePath';
import StudySection from '@/components/feature/Log/StudySection';
import cn from '@/utils/cn';
import getAllLogWithinYears from './_lib/getAllLogWithinYears';

// TODO: 리팩토링 필요함. 책임 분리

export default function LogPage() {
  const {
    allYears,
    postsByYear,
    studiesByYear,
    experiencesByYear,
    YEARS_WITH_GITHUB_GRAPH,
  } = getAllLogWithinYears();

  return (
    <main>
      <LogBanner />
      <FadeEffectWrapper transitionKey="log-content">
        <Gap size={14} />
        <Container>
          {allYears.map((year, index) => {
            const yearPosts =
              postsByYear.find((g) => g.year === year)?.items || [];
            const yearStudies =
              studiesByYear.find((g) => g.year === year)?.items || [];
            const yearExperiences =
              experiencesByYear.find((g) => g.year === year)?.items || [];
            const hasGitHub = YEARS_WITH_GITHUB_GRAPH.includes(year);

            // Skip year if no content
            if (
              yearPosts.length === 0 &&
              yearStudies.length === 0 &&
              yearExperiences.length === 0 &&
              !hasGitHub
            ) {
              return null;
            }

            const isLastYear = index === allYears.length - 1;
            const isFirstYear = index === 0;

            return (
              <>
                <section
                  key={year}
                  className="grid grid-cols-[100px_40px_1fr] text-slate-700 gap-x-4"
                >
                  {/* year */}
                  <div>
                    <span className="text-2xl font-bold text-end">{year}</span>
                  </div>

                  {!hasGitHub && (
                    <>
                      {/* line:start (no github) */}
                      <div
                        className={cn(
                          'flex flex-col items-center',
                          isFirstYear && 'pt-4',
                        )}
                      >
                        <div
                          className={`w-3 h-3 bg-slate-300 rounded-full ${!isFirstYear ? 'absolute translate-y-3' : ''}`}
                        />
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>
                      <div />
                    </>
                  )}

                  {hasGitHub && (
                    <>
                      {/* line:start */}
                      <div
                        className={cn(
                          'flex flex-col items-center',
                          isFirstYear && 'pt-4',
                        )}
                      >
                        <div
                          className={`w-3 h-3 bg-slate-300 rounded-full ${!isFirstYear ? 'absolute translate-y-3' : ''}`}
                        />
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>

                      {/* content : github */}
                      <div className="max-w-full overflow-hidden">
                        <Gap size={1} />
                        <p className="text-lg font-semibold">Github</p>
                        <Gap size={6} />
                        <GitHubActivityGraph year={year} />
                      </div>
                    </>
                  )}

                  {yearExperiences.length > 0 && (
                    <>
                      {/* line:space */}
                      <div />
                      <div className="flex flex-col items-center h-10">
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>
                      <div />

                      <div />
                      {/* line:middle */}
                      <div className="flex flex-col items-center relative">
                        <div className="w-3 h-3 bg-slate-300 rounded-full absolute translate-y-4" />
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>
                      {/* content : experience */}
                      <div>
                        <Gap size={1} />
                        <p className="text-lg font-semibold">Experience</p>
                        <Gap size={6} />
                        <ul className="flex flex-col gap-4">
                          {yearExperiences.map((exp) => (
                            <li
                              key={`${exp.title}-${exp.startDate}`}
                              className="text-gray-500 flex justify-between items-center"
                            >
                              <p className="font-medium">{exp.title}</p>
                              <span className="text-sm">
                                {exp.startDate} ~ {exp.endDate}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {yearStudies.length > 0 && (
                    <>
                      {/* line:space */}
                      <div />
                      <div className="flex flex-col items-center h-10">
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>
                      <div />

                      <div />
                      {/* line:middle */}
                      <div className="flex flex-col items-center relative">
                        <div className="w-3 h-3 bg-slate-300 rounded-full absolute translate-y-4" />
                        <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                      </div>
                      {/* content : study */}
                      <StudySection studies={yearStudies} />
                    </>
                  )}
                </section>

                {/* Year connector line */}
                {!isLastYear && (
                  <div className="grid grid-cols-[100px_40px_1fr] gap-x-4 h-24">
                    <div />
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 bg-slate-300 min-h-0 h-full" />
                    </div>
                    <div />
                  </div>
                )}
              </>
            );
          })}
        </Container>
        <Gap size={24} />
      </FadeEffectWrapper>
    </main>
  );
}
