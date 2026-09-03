"use client";

import Link from "next/link";
import { formatFee, type Course } from "@/lib/courses";
import { ArrowRightIcon, CheckIcon } from "@/components/CourseDiscovery/cd-icons";

type FeaturedCourseProps = {
  course: Course;
};

export function FeaturedCourse({ course }: FeaturedCourseProps) {
  return (
    <article className="cd-featured">
      <div className="relative z-10 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-200">
          Featured program
        </p>
        <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-white">
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-indigo-100">
          Advance your career with flexible, recognised programs from leading
          universities — built around working learners.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-white">
          {["UGC Recognized", "Flexible Learning", "Placement Assistance", "EMI Available"].map(
            (item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-emerald-300" />
                {item}
              </li>
            ),
          )}
        </ul>
        <p className="mt-6 text-sm text-indigo-100">
          Starting <span className="text-lg font-bold text-white">{formatFee(course.fee)}</span>
        </p>
        <Link href={`/programs/${course.slug}`} className="cd-featured-btn">
          Explore program
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      <div className="relative z-10 hidden min-h-[180px] flex-1 items-end justify-end lg:flex">
        <div className="rounded-3xl border border-white/15 bg-white/10 px-6 py-5 text-right text-white backdrop-blur-sm">
          <p className="text-sm text-indigo-100">{course.university}</p>
          <p className="mt-2 text-3xl font-bold">{course.rating.toFixed(1)}</p>
          <p className="text-xs text-indigo-200">{course.reviews} learner reviews</p>
        </div>
      </div>
    </article>
  );
}
