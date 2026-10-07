"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { fetchDiscoveryCourses, type DiscoveryCourse } from "@/lib/courseDiscovery";
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

const IconSolidContext = createContext(false);

function Svg({
  children,
  className = "h-5 w-5",
  solid: solidProp,
}: {
  children: ReactNode;
  className?: string;
  solid?: boolean;
}) {
  const solidFromContext = useContext(IconSolidContext);
  const solid = solidProp ?? solidFromContext;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={solid ? "currentColor" : "none"}
      fillOpacity={solid ? 0.2 : undefined}
      stroke="currentColor"
      strokeWidth={solid ? 2.1 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="m9 6 6 6-6 6" />
    </Svg>
  );
}

function CourseIcon({
  name,
  cls = "h-6 w-6",
  solid = false,
}: {
  name: CourseCardIcon;
  cls?: string;
  solid?: boolean;
}) {
  return (
    <IconSolidContext.Provider value={solid}>
      <CourseIconGlyph name={name} cls={cls} />
    </IconSolidContext.Provider>
  );
}

function CourseIconGlyph({ name, cls }: { name: CourseCardIcon; cls: string }) {
  switch (name) {
    case "book":
      return <Svg className={cls}><path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Zm0 0v13" /></Svg>;
    case "laptop":
      return <Svg className={cls}><rect x="4.5" y="5" width="15" height="10" rx="1.5" /><path d="M2.5 19h19" /></Svg>;
    case "chart":
      return <Svg className={cls}><path d="M5 20V14M10 20V9M15 20v-7M20 20V5" /></Svg>;
    case "gear":
      return (
        <Svg className={cls}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
        </Svg>
      );
    case "briefcase":
      return <Svg className={cls}><rect x="3.5" y="7.5" width="17" height="12" rx="2" /><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17M11 12.5v2h2v-2" /></Svg>;
    case "flask":
      return <Svg className={cls}><path d="M9.5 3.5h5M10.5 3.5v5.5L5 18.5A1.5 1.5 0 0 0 6.3 20.5h11.4a1.5 1.5 0 0 0 1.3-2L13.5 9V3.5M7.5 14.5h9" /></Svg>;
    case "users":
      return <Svg className={cls}><circle cx="9" cy="8.5" r="2.8" /><circle cx="16.5" cy="9.5" r="2.2" /><path d="M3.8 19c.8-3 2.8-4.6 5.2-4.6s4.4 1.6 5.2 4.6M14.8 14.9c2.3-.5 4.3.8 5.2 3.6" /></Svg>;
    case "globe":
      return <Svg className={cls}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.8 2.6 14.2 0 17M12 3.5c-2.6 2.8-2.6 14.2 0 17" /></Svg>;
    case "monitor":
      return <Svg className={cls}><rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" /><path d="M8.5 20h7M12 16v4" /></Svg>;
    case "doc":
      return <Svg className={cls}><path d="M7 3.5h7l4 4v13H7v-17Z" /><path d="M14 3.5v4h4M9.5 12h5M9.5 15.5h5" /></Svg>;
    case "calendar":
      return <Svg className={cls}><rect x="4" y="5.5" width="16" height="14.5" rx="2" /><path d="M8 3.5v4M16 3.5v4M4 10.5h16M8.5 14h.01M12 14h.01M15.5 14h.01M8.5 17h.01M12 17h.01" /></Svg>;
    case "award":
      return <Svg className={cls}><circle cx="12" cy="9" r="5.2" /><path d="m8.7 13.4-1.2 7.1 4.5-2.4 4.5 2.4-1.2-7.1M12 7v4" /></Svg>;
    case "layers":
      return <Svg className={cls}><path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" /><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" /></Svg>;
    default:
      return <Svg className={cls}><path d="M3 10.5 12 5l9 5.5-9 5.5L3 10.5Z" /><path d="M6.5 12.5v4c0 .8 2.3 2.2 5.5 2.2s5.5-1.4 5.5-2.2v-4M21 10.5v5" /></Svg>;
  }
}

function HeaderIllustration() {
  return (
    <div className="pointer-events-none relative hidden h-40 w-[300px] shrink-0 lg:block" aria-hidden>
      <div className="absolute right-6 top-0 h-40 w-56 rounded-full bg-gradient-to-br from-[#efe6fb] to-[#f7f3fd] blur-[2px]" />
      <div className="absolute left-2 top-6 grid grid-cols-4 gap-2.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-[#440F76]/20" />
        ))}
      </div>
      <svg viewBox="0 0 200 140" className="absolute right-10 top-3 h-36 w-48">
        <rect x="38" y="96" width="124" height="18" rx="4" fill="#6d28d9" opacity="0.85" />
        <rect x="44" y="99" width="112" height="12" rx="2" fill="#ede4fb" />
        <rect x="46" y="80" width="112" height="17" rx="4" fill="#8b5cf6" opacity="0.8" />
        <rect x="52" y="83" width="100" height="11" rx="2" fill="#f5f0fd" />
        <path d="M100 30 160 52 100 74 40 52 100 30Z" fill="#2a0a4a" />
        <path d="M68 62v14c0 5 14 10 32 10s32-5 32-10V62L100 74 68 62Z" fill="#3d1066" />
        <path d="M150 56v24" stroke="#f5b83d" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="150" cy="82" r="4" fill="#f5b83d" />
      </svg>
      <p
        className="absolute right-0 top-2 w-24 rotate-[8deg] text-right text-[11px] leading-4 text-[#440F76]/60"
        style={{ fontFamily: "'Segoe Print', 'Comic Sans MS', cursive" }}
      >
        Build your future with the right course
      </p>
    </div>
  );
}

const TILE_TONES = [
  { circle: "bg-[#ffe8f1]", icon: "text-[#e11d74]" },
  { circle: "bg-[#f1e8ff]", icon: "text-[#7c3aed]" },
  { circle: "bg-[#e6efff]", icon: "text-[#2563eb]" },
] as const;

function SmallBuildingIcon() {
  return (
    <Svg className="h-3.5 w-3.5 shrink-0">
      <path d="M3.5 20h17M5 20V10m14 10V10M3.5 10 12 4.5l8.5 5.5H3.5ZM9 20v-6m6 6v-6" />
    </Svg>
  );
}

function CourseCard({ course, index }: { course: DiscoveryCourse; index: number }) {
  const tone = TILE_TONES[index % TILE_TONES.length];
  const icon = CATEGORY_ICONS[course.category] || "cap";
  const href = `/courses/${encodeURIComponent(course.slug || course.id)}`;
  const title = course.code ? `${course.studyMode} ${course.code}` : course.title;
  const count = course.universityCount;

  return (
    <Link
      href={href}
      title={title}
      className="group flex h-full min-h-[88px] items-center gap-3 rounded-2xl border border-[#ece8f3] bg-white px-3.5 py-3.5 shadow-[0_4px_14px_rgba(30,20,70,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#e0d6ef] hover:shadow-[0_14px_30px_rgba(68,15,118,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#440F76]"
    >
      <span
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tone.circle} ${tone.icon} transition duration-300 group-hover:scale-105`}
      >
        <CourseIcon name={icon} cls="h-[22px] w-[22px]" solid />
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="line-clamp-2 text-[15px] font-bold leading-snug text-[#1b1446]">
          {title}
        </span>
        <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[12.5px] text-slate-500">
          <SmallBuildingIcon />
          {typeof count === "number"
            ? `${count} ${count === 1 ? "University" : "Universities"}`
            : course.badge}
        </span>
      </span>

      <span
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${tone.circle} ${tone.icon} transition duration-300 group-hover:translate-x-0.5`}
        aria-hidden
      >
        <ChevronIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function CourseDiscoverySection() {
  const [courses, setCourses] = useState<DiscoveryCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchDiscoveryCourses();
        if (!cancelled) setCourses(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load courses");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#fbf9fe] via-white to-[#faf7fd] py-12 lg:py-16"
      aria-labelledby="course-discovery-heading"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#efe6fb]/60 blur-3xl" aria-hidden />

      <div className="era-shell relative">
        <header className="flex items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-[#f1eafa] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#440F76]">
              All Programs
            </span>
            <h2
              id="course-discovery-heading"
              className="mt-4 text-[1.9rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#1d1340] sm:text-[2.4rem] lg:text-[2.75rem]"
            >
              Explore <span className="text-[#440F76]">Our</span> Courses
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-slate-600 sm:text-base">
              Compare universities, explore programs and find the best course for your future.
            </p>
          </div>
          <HeaderIllustration />
        </header>

        <div className="mt-8 lg:mt-10">
          {loading ? (
            <div className="rounded-[20px] border border-[#ece6f5] bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-[#1d1340]">Loading courses…</p>
              <p className="mt-2 text-sm text-slate-500">Fetching the latest programmes for you.</p>
            </div>
          ) : error ? (
            <div className="rounded-[20px] border border-dashed border-red-200 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-[#1d1340]">Couldn’t load courses</p>
              <p className="mt-2 text-sm text-slate-500">{error}</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-[#dccdf0] bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-[#1d1340]">No courses available yet</p>
              <p className="mt-2 text-sm text-slate-500">Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

