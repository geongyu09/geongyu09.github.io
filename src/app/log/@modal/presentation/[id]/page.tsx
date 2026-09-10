import PresentationDetailModal from '@/components/feature/modals/PresentationDetailModal';
import ROUTE_PATH from '@/constants/path/routePath';
import SITE from '@/constants/site';
import { formatPresentationDate } from '@/lib/log/formatLogDate';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPresentationById,
  getPresentationDetailParams,
} from '../../../_lib/getLogDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getPresentationDetailParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const presentation = getPresentationById(id);

  if (!presentation) return {};

  const url = `${SITE.URL}${ROUTE_PATH.LOG_PRESENTATION({ id })}`;
  const date = formatPresentationDate(
    presentation.date,
    presentation.displayDate,
  );
  const description = presentation.place
    ? `${date} ${presentation.place}에서 한 발표입니다.`
    : `${date}에 한 발표입니다.`;

  return {
    title: presentation.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${presentation.title} · Log`,
      description,
      siteName: SITE.TITLE,
      images: [SITE.OG_IMAGE],
    },
  };
}

export default async function PresentationDetailModalPage({
  params,
}: PageProps) {
  const { id } = await params;
  const presentation = getPresentationById(id);

  if (!presentation) notFound();

  return <PresentationDetailModal presentation={presentation} />;
}
