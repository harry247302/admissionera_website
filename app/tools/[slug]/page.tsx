import Link from "next/link";
import { InnerPage } from "@/components/InnerPage";
import { CounsellorProfile } from "@/components/counsellors/CounsellorProfile";
import { counsellorName, fetchCounsellorById, type Counsellor } from "@/lib/admissionExperts";

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
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ expert?: string | string[] }>;
}) {
  const { slug } = await params;
  const { expert } = await searchParams;
  const expertId = Array.isArray(expert) ? expert[0] : expert;
  const page = COPY[slug] ?? {
    title: "Tools",
    description: "AdmissionEra decision tools for courses, universities and careers.",
  };

  if (slug !== "course-finder" || !expertId) {
    return <InnerPage title={page.title} description={page.description} />;
  }

  let counsellor: Counsellor | null = null;
  let error: string | undefined;
  try {
    counsellor = await fetchCounsellorById(expertId);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load counsellor";
  }

  return (
    <InnerPage
      title={
        counsellor
          ? `Talk to ${counsellorName(counsellor).replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())}`
          : page.title
      }
      description={
        counsellor
          ? "Get personalised guidance on courses and universities from your AdmissionEra mentor."
          : page.description
      }
    >
      {counsellor ? (
        <CounsellorProfile counsellor={counsellor} />
      ) : (
        <div role={error ? "alert" : undefined} className="mt-8 rounded-2xl border border-dashed border-[#E7DDF7] bg-white px-6 py-12 text-center">
          <p className="font-bold text-[#211344]">
            {error ? "We couldn't load this mentor right now." : "This mentor could not be found."}
          </p>
          {error ? <p className="mt-1 text-[13px] text-[#716786]">{error}</p> : null}
          <Link href="/counsellors" className="mt-3 inline-flex text-sm font-semibold text-[#F20D70]">
            Browse all mentors
          </Link>
        </div>
      )}
    </InnerPage>
  );
}
