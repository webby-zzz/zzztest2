import { CASE_STUDIES_DATA } from "../../../lib/data";
import ProjectClient from "./ProjectClient";

export function generateStaticParams() {
  return CASE_STUDIES_DATA.map((project) => ({
    slug: project.id,
  }));
}

export default function ProjectPage({ 
  params,
  searchParams 
}: { 
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <ProjectClient 
      slug={params.slug} 
      searchParams={searchParams} 
    />
  );
}
