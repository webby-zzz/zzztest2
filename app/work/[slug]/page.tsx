import { CASE_STUDIES_DATA } from "../../../lib/data";
import ProjectClient from "./ProjectClient";
import { Suspense } from "react";

export function generateStaticParams() {
  return CASE_STUDIES_DATA.map((project) => ({
    slug: project.id,
  }));
}

export default function ProjectPage({ 
  params 
}: { 
  params: { slug: string };
}) {
  return (
    <Suspense fallback={null}>
      <ProjectClient slug={params.slug} />
    </Suspense>
  );
}
