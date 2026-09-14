"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_FILTERS,
  filterCourses,
  fetchDiscoveryCourses,
  formatFee,
  sortCourses,
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
}[] = [
  { label: "PG Courses", badge: "After Graduation", level: "Post Graduation" },
  { label: "UG Courses", badge: "After Graduation", level: "Graduation" },
  { label: "Certificate", badge: "After Graduation", level: "Certificate" },
  { label: "Diploma", badge: "After 12th", level: "Diploma" },
  { label: "Counselling Courses", badge: "After Graduation", level: "After 10th" },
];

const BADGE_TONES: Record<DiscoveryCourse["badgeTone"], string> = {
  violet: "bg-violet-100 text-violet-700",
  pink: "bg-fuchsia-100 text-fuchsia-700",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
  sky: "bg-sky-100 text-sky-700",
};

function GradCapIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 10.5 12 5l9 5.5-9 5.5L3 10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 12.5v4.2c0 .8 2.3 2.3 5.5 2.3s5.5-1.5 5.5-2.3v-4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M21 10.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function CourseIcon({ category }: { category: DiscoveryCourse["category"] }) {
  const common = "h-7 w-7";
  switch (category) {
    case "Management":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M4 19V10h4v9M10 19V5h4v14M16 19v-7h4v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "Engineering":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M14.5 5.5 18.5 9.5 9 19H5v-4L14.5 5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "Medical":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M8.5 4.5h7v4.2h4.2v7H15.5V20h-7v-4.3H4.3v-7h4.2V4.5Z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "Law":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M12 4v16M5 14.5c0-1.5 1.6-2.5 3.5-2.5S12 13 12 14.5 10.4 17 8.5 17 5 16 5 14.5Zm7 0c0-1.5 1.6-2.5 3.5-2.5s3.5 1 3.5 2.5S17.4 17 15.5 17 12 16 12 14.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M4 7.5 12 4l8 3.5-8 3.5L4 7.5Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6.5 10.5v5c0 .9 2.4 2.5 5.5 2.5s5.5-1.6 5.5-2.5v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

function FilterAccordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-violet-100/80 py-3">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-era-dark">{title}</span>
        <span className={`text-era-secondary transition ${open ? "rotate-180" : ""}`} aria-hidden>
          ▾
        </span>
      </button>
      {open ? <div className="mt-3 space-y-2">{children}</div> : null}
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
  count,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-1 py-1.5 text-sm text-slate-600 hover:bg-white/70">
      <span className="inline-flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-violet-300 text-era-primary focus:ring-era-magenta"
        />
        {label}
      </span>
      {typeof count === "number" ? (
        <span className="text-xs font-medium text-slate-400">{count}</span>
      ) : null}
    </label>
  );
}

function FilterPanelBody({
  draft,
  setDraft,
}: {
  draft: DiscoveryFilters;
  setDraft: React.Dispatch<React.SetStateAction<DiscoveryFilters>>;
  onApply?: () => void;
  onClear?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        {/* <h3 className="text-lg font-bold text-era-dark">Find Your Course</h3> */}
        {/* <p className="mt-1 text-sm text-slate-500">Search from 250+ courses</p> */}
      </div>

      <div className="">
        <div className="space-y-3 rounded-2xl  ">
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
                className={`flex w-full flex-col items-start rounded-xl border px-4 py-3.5 text-left transition ${
                  active
                    ? "border-[#e11d2e] bg-[#e11d2e] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className={`text-sm font-semibold ${active ? "text-white" : "text-slate-800"}`}>
                  {item.label}
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#001a3f] px-2.5 py-1 text-[11px] font-medium text-white">
                  <GradCapIcon />
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  compareSelected,
  favorite,
  onToggleCompare,
  onToggleFavorite,
}: {
  course: DiscoveryCourse;
  compareSelected: boolean;
  favorite: boolean;
  onToggleCompare: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="era-card-lift group flex h-full flex-col rounded-[1.25rem] border border-violet-100 bg-white p-4 shadow-[0_10px_28px_rgba(23,19,74,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${BADGE_TONES[course.badgeTone]}`}>
          {course.badge}
        </span>
       
      </div>

      <div className="mt-5 flex flex-1 flex-col items-center text-center">
      
        <h3 className="mt-4 line-clamp-2 text-base font-bold text-era-dark">{course.title}</h3>
        <p className="mt-3 text-xs font-medium text-slate-400">
          {[course.studyMode, course.duration, course.fee > 0 ? formatFee(course.fee) : null]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-violet-50 pt-3">
        
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-era-secondary transition group-hover:gap-1.5 group-hover:text-era-magenta"
        >
          View Details 
        </Link>
      </div>
    </article>
  );
}

function CourseListItem({
  course,
  compareSelected,
  onToggleCompare,
}: {
  course: DiscoveryCourse;
  compareSelected: boolean;
  onToggleCompare: () => void;
}) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-era-lilac text-era-primary">
          <CourseIcon category={course.category} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-era-dark">{course.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${BADGE_TONES[course.badgeTone]}`}>
              {course.badge}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{course.description}</p>
          <p className="mt-2 text-xs text-slate-400">
            {course.category} · {course.studyMode} · {course.duration} · {formatFee(course.fee)} ·{" "}
            {course.specializations.slice(0, 2).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={compareSelected}
            onChange={onToggleCompare}
            className="h-4 w-4 rounded border-violet-300 text-era-primary focus:ring-era-magenta"
          />
          Compare
        </label>
        <Link href={`/courses/${course.id}`} className="text-sm font-semibold text-era-magenta">
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
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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

  // Level nav has no Apply button — keep draft + applied in sync
  useEffect(() => {
    setAppliedFilters(draftFilters);
  }, [draftFilters]);

  const filtered = useMemo(
    () => sortCourses(filterCourses(courses, appliedFilters), sortBy),
    [courses, appliedFilters, sortBy]
  );

  const clearFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };

  return (
    <section className="relative bg-era-lavender/50 py-12 lg:py-16" aria-labelledby="course-discovery-heading">
      <div className="era-shell">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
          {/* Desktop filter panel */}
          <aside className="hidden rounded-[1.5rem] border border-violet-100 bg-white/90 p-5 shadow-[0_14px_40px_rgba(23,19,74,0.05)] lg:block">
            <FilterPanelBody
              draft={draftFilters}
              setDraft={setDraftFilters}
            />
          </aside>

          <div className="min-w-0">
            {/* Results */}
            <div className="">
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {filtered.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      compareSelected={compareIds.includes(course.id)}
                      favorite={favorites.includes(course.id)}
                      onToggleCompare={() => setCompareIds((prev) => toggleValue(prev, course.id))}
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
                      compareSelected={compareIds.includes(course.id)}
                      onToggleCompare={() => setCompareIds((prev) => toggleValue(prev, course.id))}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
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
              <p className="font-bold text-era-dark">Filters</p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full px-3 py-1 text-sm font-semibold text-slate-500"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              <FilterPanelBody
                draft={draftFilters}
                setDraft={setDraftFilters}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Compare bar */}
      {compareIds.length > 0 ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="pointer-events-auto flex w-full max-w-xl items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-white px-4 py-3 shadow-[0_18px_40px_rgba(23,19,74,0.16)]">
            <p className="text-sm font-semibold text-era-dark">
              {compareIds.length} course{compareIds.length > 1 ? "s" : ""} selected
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="rounded-full px-3 py-2 text-sm font-semibold text-slate-500 hover:text-era-dark"
              >
                Clear
              </button>
              <Link href="/compare" className="era-btn !min-h-10 !px-4 !text-sm">
                Compare Now
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
