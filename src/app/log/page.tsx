import FadeEffectWrapper from '@/components/common/FadeEffectWrapper';
import Container from '@/components/common/layout/Container';
import Gap from '@/components/common/layout/Gap';
import GitHubActivityGraph from '@/components/feature/Log/GitHubActivityGraph';
import LogBanner from '@/components/feature/Log/LogBanner';
// import { STUDY_DATA } from '@/constants/log/studyData';
// import ROUTE_PATH from '@/constants/path/routePath';
import cn from '@/utils/cn';
import Link from 'next/link';
import getAllLogWithinYears from './_lib/getAllLogWithinYears';

// TODO: 리팩토링 필요함. 책임 분리

export default function LogPage() {
  const { allYears, postsByYear, studiesByYear, YEARS_WITH_GITHUB_GRAPH } =
    getAllLogWithinYears();

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
            const hasGitHub = YEARS_WITH_GITHUB_GRAPH.includes(year);

            // Skip year if no content
            if (
              yearPosts.length === 0 &&
              yearStudies.length === 0 &&
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

                  {hasGitHub && (
                    <>
                      {/* line:start */}
                      <div
                        // className={`flex flex-col items-center ${isFirstYear ? 'pt-4' : ''}`}
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
                      <div>
                        <Gap size={1} />
                        <p className="text-lg font-semibold">Study</p>
                        <Gap size={6} />
                        <ul className="flex flex-col gap-4">
                          {yearStudies.map((study) => (
                            <li
                              key={`${study.title}-${study.date}`}
                              className="text-gray-500"
                            >
                              {study.href ? (
                                <Link
                                  href={study.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium hover:text-slate-700 transition-colors flex justify-between items-center"
                                >
                                  <div>
                                    <p>{study.title}</p>
                                    <span className="text-sm">
                                      {study.date}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    {study.tags?.map((tag, idx) => (
                                      <div
                                        key={tag}
                                        className={cn(
                                          'rounded-lg px-2 py-1 text-xs',
                                          idx === 0 && 'bg-amber-100',
                                          idx === 1 && 'bg-sky-100',
                                          idx === 2 && 'bg-green-100',
                                        )}
                                      >
                                        {tag}
                                      </div>
                                    ))}
                                    {/* <div className="rounded-lg bg-amber-200 px-2 py-1 text-xs">
                                      js 스터디
                                    </div>
                                    <div className="rounded-lg bg-sky-200 px-2 py-1 text-xs">
                                      TS 스터디
                                    </div> */}
                                    {/* <div className="rounded-lg bg-green-200 px-2 py-1 text-xs">
                                      블로그
                                    </div>
                                    <div className="rounded-lg bg-indigo-200 px-2 py-1 text-xs">
                                      블로그
                                    </div>
                                    <div className="rounded-lg bg-fuchsia-200 px-2 py-1 text-xs">
                                      블로그
                                    </div> */}
                                  </div>
                                </Link>
                              ) : (
                                <span className="font-medium">
                                  {study.title}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
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
