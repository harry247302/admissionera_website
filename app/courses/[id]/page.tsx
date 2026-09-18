import { InnerPage } from "@/components/InnerPage";
import { CourseProgramPage } from "@/components/courses/CourseProgramPage";
import { fetchCourseById } from "@/lib/courseDiscovery";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const course = await fetchCourseById(id);
    return <CourseProgramPage course={course} />;
  } catch {
    return (
      <InnerPage
        title="Course not found"
        description="We couldn’t load this course. It may have been removed or the link is incorrect."
      />
    );
  }
}
