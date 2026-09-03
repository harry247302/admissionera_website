"use client";

import type { Course } from "@/lib/courses";
import { CourseCard } from "@/components/CourseDiscovery/CourseCard";

type CourseGridProps = {
  courses: Course[];
  bookmarked: string[];
  compared: string[];
  onBookmark: (id: string) => void;
  onCompare: (id: string) => void;
};

export function CourseGrid({
  courses,
  bookmarked,
  compared,
  onBookmark,
  onCompare,
}: CourseGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          bookmarked={bookmarked.includes(course.id)}
          compared={compared.includes(course.id)}
          onBookmark={onBookmark}
          onCompare={onCompare}
        />
      ))}
    </div>
  );
}
