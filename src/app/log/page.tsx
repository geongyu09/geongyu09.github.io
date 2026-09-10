import LogPageView from '@/components/feature/Log/LogPageView';
import SITE from '@/constants/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log',
  description:
    '프론트엔드 개발자 박건규의 프로젝트와 경험, 발표와 스터디, GitHub 활동을 연도별로 정리한 기록입니다.',
  alternates: { canonical: `${SITE.URL}/log/` },
  openGraph: {
    type: 'profile',
    url: `${SITE.URL}/log/`,
    title: 'Log · 박건규',
    description:
      '프론트엔드 개발자 박건규의 프로젝트와 경험, 발표와 스터디, GitHub 활동을 연도별로 정리한 기록입니다.',
    siteName: SITE.TITLE,
    images: [{ url: SITE.OG_IMAGE, width: 1200, height: 630, alt: SITE.TITLE }],
  },
};

export default function LogPage() {
  return <LogPageView />;
}
