import { InnerPage } from "@/components/InnerPage";
import { CourseDiscovery } from "@/components/CourseDiscovery/CourseDiscovery";

const COPY: Record<string, { title: string; description: string }> = {
  compare: {
    title: "University Comparator",
    description:
      "Compare universities on fees, rankings, placements, campus life and student reviews in one view.",
  },
  predictor: {
    title: "College Predictor",
    description:
      "Estimate likely admits using your academic profile, entrance scores and preferred locations.",
  },
  career: {
    title: "Career Tools",
    description:
      "Map courses to career paths, skills and typical outcomes before you commit to a program.",
  },
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "course-finder") {
    return (
      <main id="main" className="flex-1">
        <CourseDiscovery />
      </main>
    );
  }

  const page = COPY[slug] ?? {
    title: "Tools",
    description: "AdmissionEra decision tools for courses, universities and careers.",
  };

  return <InnerPage title={page.title} description={page.description} />;
}
