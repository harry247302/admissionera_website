"use client";

import Link from "next/link";
import { formatFee, type Course } from "@/lib/courses";
import {
  ArrowRightIcon,
  BookmarkIcon,
  StarIcon,
  VerifiedIcon,
} from "@/components/CourseDiscovery/cd-icons";

type CourseCardProps = {
  course: Course;
  bookmarked: boolean;
  compared: boolean;
  layout?: "grid" | "list";
  onBookmark: (id: string) => void;
  onCompare: (id: string) => void;
};

export function CourseCard({
  course,
  bookmarked,
  compared,
  layout = "grid",
  onBookmark,
  onCompare,
}: CourseCardProps) {
  return (
    <article className={`cd-card ${layout === "list" ? "cd-card-list" : ""}`}>
      <div className="cd-card-top">
        <div className="flex min-w-0 items-center gap-3">
          <span className="cd-avatar">{course.universityShort}</span>
          <div className="min-w-0">
            <p className="flex items-center gap-1 truncate text-sm font-medium text-[#111827]">
              {course.university}
              {course.verified ? <VerifiedIcon className="h-4 w-4 shrink-0" /> : null}
            </p>
            {course.badge ? <span className="cd-badge">{course.badge}</span> : null}
          </div>
        </div>
        <button
          type="button"
          className={`cd-icon-ghost ${bookmarked ? "text-[#4F46E5]" : ""}`}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark program"}
          aria-pressed={bookmarked}
          onClick={() => onBookmark(course.id)}
        >
          <BookmarkIcon className="h-5 w-5" filled={bookmarked} />
        </button>
      </div>

      <h3 className="cd-card-title mt-4 text-xl font-bold tracking-[-0.03em] text-[#111827]">
        {course.title}
      </h3>
      <p className="cd-card-uni mt-1 text-sm font-medium text-[#4F46E5]">{course.university}</p>
      <p className="cd-card-meta mt-2 text-sm text-[#667085]">
        {course.durationLabel} · {course.mode} · {course.specializationCount}+ specializations
      </p>

      <div className="cd-card-rating mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1 font-semibold text-[#111827]">
          <StarIcon className="h-4 w-4 text-[#F59E0B]" />
          {course.rating.toFixed(1)}
        </span>
        <span className="text-[#667085]">{course.reviews.toLocaleString("en-IN")} reviews</span>
      </div>

      <div className="cd-card-fee mt-5">
        <p className="text-xs text-[#667085]">Starting from</p>
        <p className="text-lg font-bold text-[#111827]">{formatFee(course.fee)}</p>
        {course.emi ? <p className="text-xs font-medium text-[#16A34A]">EMI available</p> : null}
      </div>

      <div className="cd-card-cta mt-5 flex gap-2">
        <button
          type="button"
          className={`cd-btn-ghost flex-1 ${compared ? "is-on" : ""}`}
          onClick={() => onCompare(course.id)}
        >
          {compared ? "Added" : "Compare"}
        </button>
        <Link href={`/programs/${course.slug}`} className="cd-btn-primary flex-1">
          View program
          <ArrowRightIcon className="cd-btn-arrow h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
