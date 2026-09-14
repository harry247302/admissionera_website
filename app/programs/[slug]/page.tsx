import { InnerPage } from "@/components/InnerPage";

const COPY: Record<string, { title: string; description: string }> = {
  undergraduate: {
    title: "Undergraduate Programs",
    description:
      "Browse bachelor’s degrees after 12th across engineering, medicine, management, design, law and the liberal arts.",
  },
  postgraduate: {
    title: "Postgraduate Programs",
    description:
      "Explore master’s, MBA and professional degrees matched to your academic background and career goals.",
  },
  online: {
    title: "Online Programs",
    description:
      "Flexible, recognised online degrees designed for working learners and students who need to study from anywhere.",
  },
  "study-abroad": {
    title: "Study Abroad",
    description:
      "Discover international universities, pathways and application timelines for studying outside India.",
  },
};

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = COPY[slug] ?? {
    title: "Programs",
    description:
      "Explore undergraduate, postgraduate, online and study-abroad programs on AdmissionEra.",
  };

  return <InnerPage title={page.title} description={page.description} />;
}
