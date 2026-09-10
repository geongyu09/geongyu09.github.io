import ExperienceDetailModal from '@/components/feature/modals/ExperienceDetailModal';
import ROUTE_PATH from '@/constants/path/routePath';
import SITE from '@/constants/site';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getExperienceById,
  getExperienceDetailParams,
} from '../../../_lib/getLogDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getExperienceDetailParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const experience = getExperienceById(id);

  if (!experience) return {};

  const url = `${SITE.URL}${ROUTE_PATH.LOG_EXPERIENCE({ id })}`;

  return {
    title: experience.title,
    description: experience.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${experience.title} · Log`,
      description: experience.description,
      siteName: SITE.TITLE,
      images: [SITE.OG_IMAGE],
    },
  };
}

export default async function ExperienceDetailModalPage({ params }: PageProps) {
  const { id } = await params;
  const experience = getExperienceById(id);

  if (!experience) notFound();

  return <ExperienceDetailModal experience={experience} />;
}
