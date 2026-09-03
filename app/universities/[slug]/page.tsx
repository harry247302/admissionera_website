import { InnerPage } from "@/components/InnerPage";

const COPY: Record<string, { title: string; description: string }> = {
  india: {
    title: "Indian Universities",
    description:
      "Browse IITs, NITs, central, state and private universities with admissions, fees and placement context.",
  },
  international: {
    title: "International Universities",
    description:
      "Compare universities in the USA, UK, Canada, Europe and beyond for undergraduate and postgraduate study.",
  },
  featured: {
    title: "Featured Universities",
    description:
      "A shortlist of campuses with strong outcomes, recognisable programs and useful student insight.",
  },
};

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = COPY[slug] ?? {
    title: "Universities",
    description: "Explore universities listed on AdmissionEra.",
  };

  return <InnerPage title={page.title} description={page.description} />;
}
