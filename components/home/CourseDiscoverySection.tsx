"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  DEFAULT_FILTERS,
  filterCourses,
  fetchDiscoveryCourses,
  formatFee,
  sortCourses,
  type CourseCategory,
  type CourseLevel,
  type DiscoveryCourse,
  type DiscoveryFilters,
  type SortOption,
} from "@/lib/courseDiscovery";

type ViewMode = "grid" | "list";

const LEVEL_NAV_ITEMS: {
  label: string;
  badge: string;
  level: CourseLevel;
  icon: "cap" | "book" | "cert" | "diploma" | "guide";
}[] = [
  { label: "PG Courses", badge: "After Graduation", level: "Post Graduation", icon: "cap" },
  { label: "UG Courses", badge: "After 12th", level: "Graduation", icon: "book" },
  { label: "Certificate", badge: "Skill Programs", level: "Certificate", icon: "cert" },
  { label: "Diploma", badge: "After 12th", level: "Diploma", icon: "diploma" },
  { label: "Counselling Courses", badge: "Career Guidance", level: "After 10th", icon: "guide" },
];

const BADGE_TONES: Record<DiscoveryCourse["badgeTone"], string> = {
  violet: "bg-emerald-50 text-emerald-700",
  pink: "bg-orange-50 text-orange-600",
  amber: "bg-orange-50 text-orange-600",
  emerald: "bg-emerald-50 text-emerald-700",
  sky: "bg-emerald-50 text-emerald-700",
};

const GREEN_BADGE_TONES = new Set<DiscoveryCourse["badgeTone"]>(["violet", "emerald", "sky"]);

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} className="h-5 w-5" aria-hidden>
      <path
        d="M7 4.5h10A1.5 1.5 0 0 1 18.5 6v14L12 16.5 5.5 20V6A1.5 1.5 0 0 1 7 4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LevelIcon({ type }: { type: (typeof LEVEL_NAV_ITEMS)[number]["icon"] }) {
  const common = "h-5 w-5";
  switch (type) {
    case "book":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M5 18.5h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "cert":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M9 20 12 18l3 2v-6H9v6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "diploma":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M4 8.5 12 4l8 4.5-8 4.5L4 8.5Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M7 11v4.5c0 .8 2.2 2 5 2s5-1.2 5-2V11" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "guide":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M5.5 19.5c1.4-3.2 3.7-4.8 6.5-4.8s5.1 1.6 6.5 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M3 10.5 12 5l9 5.5-9 5.5L3 10.5Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M6.5 12.5v4c0 .8 2.3 2.2 5.5 2.2s5.5-1.4 5.5-2.2v-4" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
  }
}

function BadgeBoltIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 shrink-0" aria-hidden>
      <path d="M9.2 1.2 3.5 8.6h3.2L6.4 14.8l6.3-8.2H9.6L9.2 1.2Z" />
    </svg>
  );
}

function CourseGlyph({ category, index = 0 }: { category: DiscoveryCourse["category"]; index?: number }) {
  const common = "h-14 w-14";
  const variant = index % 4;

  if (category === "Engineering" || variant === 1) {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
        <rect x="8" y="10" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M16 40h16M24 32v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="21" r="2" fill="currentColor" />
        <path d="M24 18h10M24 24h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (category === "Medical") {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
        <path
          d="M18 8h12v8h8v12h-8v8H18v-8h-8V16h8V8Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (category === "Management" || variant === 2) {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <path d="M10 24h28M24 10c4 4.5 6 9 6 14s-2 9.5-6 14c-4-4.5-6-9-6-14s2-9.5 6-14Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
        <path
          d="M24 8c-5 0-9 4-9 9 0 6.5 9 15 9 15s9-8.5 9-15c0-5-4-9-9-9Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="24" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M14 36h20M18 40h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className={common} aria-hidden>
      <path d="M8 20 24 10l16 10-16 10L8 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 24v8c0 2.2 4.5 5 10 5s10-2.8 10-5v-8" stroke="currentColor" strokeWidth="2" />
      <path d="M34 22v10l6-3.5V18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Sidebar({
  draft,
  setDraft,
}: {
  draft: DiscoveryFilters;
  setDraft: React.Dispatch<React.SetStateAction<DiscoveryFilters>>;
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="space-y-2.5">
        {LEVEL_NAV_ITEMS.map((item) => {
          const active = draft.levels.includes(item.level);
          return (
            <button
              key={item.label}
              type="button"
              onClick={() =>
                setDraft((prev) => ({
                  ...prev,
                  levels: active ? [] : [item.level],
                }))
              }
              aria-pressed={active}
              className={`group flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3.5 text-left transition ${
                active
                  ? "border-transparent bg-[#5b21b6] text-white shadow-[0_12px_28px_rgba(91,33,182,0.28)]"
                  : "border-violet-100 bg-white text-era-dark hover:border-violet-200 hover:bg-violet-50/60"
              }`}
            >
              <span
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  active ? "bg-white/15 text-white" : "bg-violet-100 text-[#5b21b6]"
                }`}
              >
                <LevelIcon type={item.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">{item.label}</span>
                <span className={`mt-0.5 block text-xs ${active ? "text-violet-100" : "text-slate-500"}`}>
                  {item.badge}
                </span>
              </span>
              <ChevronIcon className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
            </button>
          );
        })}
      </div>

    
    </div>
  );
}

function CourseCard({
  course,
  index,
  favorite,
  onToggleFavorite,
}: {
  course: DiscoveryCourse;
  index: number;
  favorite: boolean;
  onToggleFavorite: () => void;
}) {
  const specCount = course.specializations.length;
  const cta = specCount > 0 ? `Compare ${specCount} Now →` : "View Details →";
  const showBolt = GREEN_BADGE_TONES.has(course.badgeTone);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ece7f5] bg-white shadow-[0_8px_24px_rgba(23,19,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(91,33,182,0.12)]">
      <div className="flex flex-1 flex-col px-4 pb-5 pt-4">
        <div className="flex items-start justify-between gap-2">
          <span
            className={`inline-flex max-w-[80%] items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold leading-none ${BADGE_TONES[course.badgeTone]}`}
          >
            {showBolt ? <BadgeBoltIcon /> : null}
            <span className="truncate">{course.badge}</span>
          </span>
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`shrink-0 rounded-md p-1 transition ${
              favorite ? "text-[#5b21b6]" : "text-[#5b21b6]/70 hover:text-[#5b21b6]"
            }`}
            aria-label={favorite ? `Remove ${course.title} from saved` : `Save ${course.title}`}
          >
            <BookmarkIcon filled={favorite} />
          </button>
        </div>

        <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
          <div className="text-[#5b21b6]">
            <CourseGlyph category={course.category} index={index} />
          </div>
          <h3 className="mt-5 line-clamp-2 text-[15px] font-bold leading-snug text-[#2d2463]">
            {course.title}
          </h3>
        </div>
      </div>

      <Link
        href={`/courses/${course.id}`}
        className="inline-flex min-h-[44px] w-full items-center justify-center bg-[#5b21b6] px-3 text-sm font-semibold text-white transition hover:bg-[#4c1d95]"
      >
        {cta}
      </Link>
    </article>
  );
}

function CourseListItem({
  course,
  favorite,
  onToggleFavorite,
}: {
  course: DiscoveryCourse;
  favorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-[#5b21b6]">
          <CourseGlyph category={course.category} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-era-dark">{course.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${BADGE_TONES[course.badgeTone]}`}>
              {course.badge}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{course.description || course.category}</p>
          <p className="mt-2 text-xs text-slate-400">
            {course.studyMode} · {course.level}
            {course.fee > 0 ? ` · ${formatFee(course.fee)}` : ""}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`rounded-lg p-2 ${favorite ? "text-[#5b21b6]" : "text-slate-300"}`}
          aria-label="Save course"
        >
          <BookmarkIcon filled={favorite} />
        </button>
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#5b21b6] px-4 text-sm font-bold text-white"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}

export function CourseDiscoverySection() {
  const [draftFilters, setDraftFilters] = useState<DiscoveryFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<DiscoveryFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [courses, setCourses] = useState<DiscoveryCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoadingCourses(true);
      setCoursesError("");
      try {
        const data = await fetchDiscoveryCourses();
        // console.log(data,'--------------------------');
        if (!cancelled) setCourses(data);
      } catch (err) {
        if (!cancelled) {
          setCourses([]);
          setCoursesError(err instanceof Error ? err.message : "Failed to load courses");
        }
      } finally {
        if (!cancelled) setLoadingCourses(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setAppliedFilters(draftFilters);
  }, [draftFilters]);

  const filtered = useMemo(
    () => sortCourses(filterCourses(courses, appliedFilters), sortBy),
    [courses, appliedFilters, sortBy]
  );

  console.log(filtered,'--------------------------');

  const applySearch = () => {
    setDraftFilters((prev) => ({ ...prev, search: searchInput.trim() }));
  };

  const clearFilters = () => {
    setSearchInput("");
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };

  const setLevelFilter = (value: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      levels: value ? [value as CourseLevel] : [],
    }));
  };

  const setCategoryFilter = (value: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      activeCategory: (value || "All Courses") as DiscoveryFilters["activeCategory"],
    }));
  };

  return (
    <section className="relative bg-[#f7f5fb] py-12 lg:py-16" aria-labelledby="course-discovery-heading">
      <div className="era-shell">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[1.5rem] border border-violet-100 bg-white/95 p-4 shadow-[0_14px_40px_rgba(23,19,74,0.06)]">
              <Sidebar draft={draftFilters} setDraft={setDraftFilters} />
            </div>
          </aside>

          <div className="min-w-0">
            

           
            
           
            <div className="mt-6">
              {loadingCourses ? (
                <div className="rounded-3xl border border-violet-100 bg-white px-6 py-16 text-center">
                  <p className="text-lg font-bold text-era-dark">Loading courses…</p>
                  <p className="mt-2 text-sm text-slate-500">Fetching the latest programmes for you.</p>
                </div>
              ) : coursesError ? (
                <div className="rounded-3xl border border-dashed border-red-200 bg-white px-6 py-16 text-center">
                  <p className="text-lg font-bold text-era-dark">Couldn’t load courses</p>
                  <p className="mt-2 text-sm text-slate-500">{coursesError}</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-violet-200 bg-white px-6 py-16 text-center">
                  <p className="text-lg font-bold text-era-dark">No courses match your filters</p>
                  <p className="mt-2 text-sm text-slate-500">Try clearing a few filters or searching a different keyword.</p>
                  <button type="button" onClick={clearFilters} className="era-btn mt-5">
                    Clear All Filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((course, index) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      index={index}
                      favorite={favorites.includes(course.id)}
                      onToggleFavorite={() => setFavorites((prev) => toggleValue(prev, course.id))}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((course) => (
                    <CourseListItem
                      key={course.id}
                      course={course}
                      favorite={favorites.includes(course.id)}
                      onToggleFavorite={() => setFavorites((prev) => toggleValue(prev, course.id))}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-era-dark/40"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-[1.5rem] bg-white p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-bold text-era-dark">Categories</p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full px-3 py-1 text-sm font-semibold text-slate-500"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              <Sidebar draft={draftFilters} setDraft={setDraftFilters} />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
