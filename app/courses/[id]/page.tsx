import { InnerPage } from "@/components/InnerPage";
import { fetchCourseById, type CourseDetail } from "@/lib/courseDiscovery";

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="rounded-2xl border border-violet-100 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm leading-6 text-era-dark whitespace-pre-wrap">{value}</p>
    </div>
  );
}

function CourseDetailContent({ course }: { course: CourseDetail }) {
  const meta = [
    course.code && `Code: ${course.code}`,
    course.level,
    course.degree,
    course.department,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mt-8 space-y-4">
      {meta ? <p className="text-sm font-medium text-slate-500">{meta}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <DetailRow label="University" value={course.universityName || undefined} />
        <DetailRow label="Study Mode" value={course.studyMode || undefined} />
        <DetailRow label="Attendance" value={course.attendanceMode || undefined} />
        <DetailRow label="Language" value={course.language || undefined} />
        <DetailRow label="Faculty" value={course.faculty || undefined} />
        <DetailRow label="Status" value={course.status || undefined} />
      </div>

      <DetailRow label="Description" value={course.description || undefined} />
      <DetailRow label="Overview" value={course.overview || undefined} />
      <DetailRow label="Eligibility" value={course.eligibility || undefined} />
      <DetailRow label="Curriculum" value={course.curriculum || undefined} />
      <DetailRow
        label="Career Opportunities"
        value={course.careerOpportunities || undefined}
      />
    </div>
  );
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const course = await fetchCourseById(id);

    return (
      <InnerPage
        title={course.name}
        description={
          course.overview
          || course.description
          || `${course.level || "Course"} programme${course.department ? ` in ${course.department}` : ""}.`
        }
      >
        <CourseDetailContent course={course} />
      </InnerPage>
    );
  } catch {
    return (
      <InnerPage
        title="Course not found"
        description="We couldn’t load this course. It may have been removed or the link is incorrect."
      />
    );
  }
}
