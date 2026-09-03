"use client";

import type { Course } from "@/lib/courses";
import { CourseCard } from "@/components/CourseDiscovery/CourseCard";

type CourseListProps = {
  courses: Course[];
  bookmarked: string[];
  compared: string[];
  onBookmark: (id: string) => void;
  onCompare: (id: string) => void;
};

export function CourseList({
  courses,
  bookmarked,
  compared,
  onBookmark,
  onCompare,
}: CourseListProps) {
  return (
    <div className="flex flex-col gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          layout="list"
          bookmarked={bookmarked.includes(course.id)}
          compared={compared.includes(course.id)}
          onBookmark={onBookmark}
          onCompare={onCompare}
        />
      ))}
    </div>
  );
}
