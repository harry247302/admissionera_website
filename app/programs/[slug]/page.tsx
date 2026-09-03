import Link from "next/link";
import { InnerPage } from "@/components/InnerPage";
import { COURSES, formatFee } from "@/lib/courses";

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
  const course = COURSES.find((item) => item.slug === slug);

  if (course) {
    return (
      <main id="main" className="flex-1 bg-[#F8FAFC]">
        <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
          <p className="text-sm font-medium text-[#4F46E5]">{course.university}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#111827] sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 text-[#667085]">
            {course.durationLabel} · {course.mode} · {course.specialization}
          </p>
          <div className="mt-8 rounded-3xl border border-[#E5E7EB] bg-white p-6">
            <p className="text-sm text-[#667085]">Starting from</p>
            <p className="text-2xl font-bold text-[#111827]">{formatFee(course.fee)}</p>
            <p className="mt-4 text-sm text-[#667085]">
              Rated {course.rating.toFixed(1)} from {course.reviews.toLocaleString("en-IN")} reviews.
              {course.emi ? " EMI available." : ""}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signin" className="cd-btn-primary">
                Talk to an advisor
              </Link>
              <Link href="/programs" className="cd-btn-ghost">
                Back to programs
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const page = COPY[slug] ?? {
    title: "Programs",
    description:
      "Explore undergraduate, postgraduate, online and study-abroad programs on AdmissionEra.",
  };

  return <InnerPage title={page.title} description={page.description} />;
}
