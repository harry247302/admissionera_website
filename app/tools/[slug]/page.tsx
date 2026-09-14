import { InnerPage } from "@/components/InnerPage";

const COPY: Record<string, { title: string; description: string }> = {
  "course-finder": {
    title: "Course Finder",
    description:
      "Answer a few questions about your interests, scores and budget to see programs that are a strong fit.",
  },
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
  const page = COPY[slug] ?? {
    title: "Tools",
    description: "AdmissionEra decision tools for courses, universities and careers.",
  };

  return <InnerPage title={page.title} description={page.description} />;
}
