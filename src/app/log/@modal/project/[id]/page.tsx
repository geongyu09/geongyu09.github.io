import ProjectDetailModal from '@/components/feature/modals/ProjectDetailModal';
import ROUTE_PATH from '@/constants/path/routePath';
import SITE from '@/constants/site';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProjectById,
  getProjectDetailParams,
} from '../../../_lib/getLogDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getProjectDetailParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) return {};

  const url = `${SITE.URL}${ROUTE_PATH.LOG_PROJECT({ id })}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${project.title} · Log`,
      description: project.description,
      siteName: SITE.TITLE,
      images: [project.thumbnail || SITE.OG_IMAGE],
    },
  };
}

export default async function ProjectDetailModalPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  return <ProjectDetailModal project={project} />;
}
