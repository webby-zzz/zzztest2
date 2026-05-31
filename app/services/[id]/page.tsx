import { SERVICES_DATA } from "../../../lib/data";
import ServiceClient from "./ServiceClient";
import { notFound } from "next/navigation";

// Generate static params for all services so they are built ahead of time
export function generateStaticParams() {
  return SERVICES_DATA
    .filter((service) => service.id !== "social-media-marketing")
    .map((service) => ({
      id: service.id,
    }));
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = SERVICES_DATA.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return <ServiceClient service={service} />;
}
