import type { Metadata } from "next";
import { InnerPage } from "@/components/InnerPage";
import { SpecializationDetailPage } from "@/components/courses/SpecializationDetailPage";
import { fetchCourseById, type CourseDetail } from "@/lib/courseDiscovery";
import { fetchSpecializationById } from "@/lib/specializations";

type Params = Promise<{ id: string; specId: string }>;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function loadCourse(id: string) {
  try {
    return await fetchCourseById(id);
  } catch {
    return null;
  }
}

function resolveSpecializationUuid(specId: string, course: CourseDetail | null) {
  if (UUID_PATTERN.test(specId)) return specId;
  const match = course?.specializations.find((spec) => spec.slug === specId);
  return match?.uuid || null;
}

async function loadPage(id: string, specId: string) {
  const course = await loadCourse(id);
  const specUuid = resolveSpecializationUuid(specId, course);
  if (!specUuid) return { course, spec: null };
  try {
    return { course, spec: await fetchSpecializationById(specUuid) };
  } catch {
    return { course, spec: null };
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id, specId } = await params;
  const { spec } = await loadPage(id, specId);
  if (!spec) return { title: "Specialization" };
  const title = spec.metaTitle || spec.name;
  const description =
    spec.metaDescription ||
    spec.description ||
    `Explore ${spec.name}${spec.code ? ` (${spec.code})` : ""}: duration, eligibility, admission process and career opportunities.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function SpecializationPage({ params }: { params: Params }) {
  const { id, specId } = await params;
  const { course, spec } = await loadPage(id, specId);

  if (!spec) {
    return (
      <InnerPage
        title="Specialization not found"
        description="We couldn’t load this specialization. It may have been removed or the link is incorrect."
      />
    );
  }

  return (
    <SpecializationDetailPage
      specialization={spec}
      course={
        course
          ? {
              id: course.id,
              slug: course.slug,
              name: course.name,
              code: course.code,
              studyMode: course.studyMode,
              overview: course.overview || course.description,
              eligibility: course.eligibility,
              careerOpportunities: course.careerOpportunities,
              curriculum: course.curriculum,
              faqs: course.faqs,
            }
          : { id, slug: id, name: "", code: "", studyMode: "" }
      }
    />
  );
}
