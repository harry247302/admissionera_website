import Link from "next/link";
import type { ReactNode } from "react";
import type { DiscoveryCourse } from "@/lib/courseDiscovery";
import type { CourseCardIcon } from "@/lib/homeCourseCatalog";

const CATEGORY_ICONS: Record<DiscoveryCourse["category"], CourseCardIcon> = {
  Management: "briefcase",
  Engineering: "laptop",
  Medical: "flask",
  Law: "doc",
  Design: "layers",
  Science: "flask",
  Arts: "book",
  Commerce: "chart",
  Others: "cap",
};

const ICON_TONES = [
  "bg-[#F3EEFF] text-[#6D4AFF]",
  "bg-[#FFF1E8] text-[#F08A3E]",
  "bg-[#EAF2FF] text-[#3B82F6]",
  "bg-[#E9FBF3] text-[#16A36A]",
  "bg-[#FDECF4] text-[#E14B8C]",
] as const;

const BADGE_TONES: Record<DiscoveryCourse["badgeTone"], string> = {
  violet: "bg-[#F3EEFF] text-[#6D4AFF]",
  pink: "bg-[#FFF1E8] text-[#E07A2F]",
  amber: "bg-[#E9FBF1] text-[#14945C]",
  emerald: "bg-[#E7F8EF] text-[#128A52]",
  sky: "bg-[#EAF3FF] text-[#3B78E7]",
};

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      {children}
    </svg>
  );
}

function CourseGlyph({ name }: { name: CourseCardIcon }) {
  switch (name) {
    case "book":
      return <Glyph><path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Z" /><path d="M12 6.5v13" /></Glyph>;
    case "laptop":
      return <Glyph><rect x="4.5" y="5" width="15" height="10" rx="1.5" /><path d="M2.5 19h19" /></Glyph>;
    case "chart":
      return <Glyph><path d="M5 20V14M10 20V9M15 20v-7M20 20V5" /></Glyph>;
    case "briefcase":
      return <Glyph><rect x="3.5" y="7.5" width="17" height="12" rx="2" /><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5" /></Glyph>;
    case "flask":
      return <Glyph><path d="M9.5 3.5h5M10.5 3.5v5.5L5 18.5a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L13.5 9V3.5" /></Glyph>;
    case "globe":
      return <Glyph><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2.2 2.4 2.2 13.6 0 16M12 4c-2.2 2.4-2.2 13.6 0 16" /></Glyph>;
    case "doc":
      return <Glyph><path d="M7 3.5h7l4 4V20.5H7V3.5Z" /><path d="M14 3.5V8h4" /></Glyph>;
    case "layers":
      return <Glyph><path d="m12 4 8 4.2L12 12.4 4 8.2 12 4Z" /><path d="m4 12 8 4.2L20 12" /></Glyph>;
    default:
      return <Glyph><path d="M3.5 10.2 12 5.2l8.5 5-8.5 5-8.5-5Z" /><path d="M7.2 12.2v3.6c0 .7 2.1 2 4.8 2s4.8-1.3 4.8-2v-3.6" /></Glyph>;
  }
}

export function PgCourseCard({ course, index }: { course: DiscoveryCourse; index: number }) {
  const tone = ICON_TONES[index % ICON_TONES.length];
  const icon = CATEGORY_ICONS[course.category] || "cap";
  const href = `/courses/${encodeURIComponent(course.slug || course.id)}`;
  const meta = [course.studyMode, course.duration].filter(Boolean).join(" / ");
  const count = course.universityCount;
  const compareLabel = typeof count === "number" && count > 0 ? `Compare ${count} Now` : "Compare Now";

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-[#F0ECF8] bg-white p-3.5 shadow-[0_8px_22px_rgba(40,30,90,0.045)] transition duration-300 hover:-translate-y-1 hover:border-[#E0D8F6] hover:shadow-[0_16px_32px_rgba(91,77,255,0.1)]">
      {course.badge ? (
        <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-[10.5px] font-bold ${BADGE_TONES[course.badgeTone]}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
          {course.badge}
        </span>
      ) : null}

      <div className="mt-3 flex min-w-0 items-start gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone}`}>
          <CourseGlyph name={icon} />
        </span>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-[#1B1448]">{course.title}</h3>
          {meta ? <p className="mt-1 truncate text-[12px] text-[#8B93A7]">{meta}</p> : null}
        </div>
      </div>

      <Link
        href={href}
        className={`mt-4 inline-flex h-9 w-full items-center justify-center gap-1 rounded-xl text-[12.5px] font-semibold transition duration-200 ${
          index === 0
            ? "bg-[#5B4DFF] text-white shadow-[0_8px_16px_rgba(91,77,255,0.25)] hover:bg-[#4636F0]"
            : "bg-[#F4F1FF] text-[#5B4DFF] hover:bg-[#5B4DFF] hover:text-white"
        }`}
      >
        {compareLabel}
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </article>
  );
}
