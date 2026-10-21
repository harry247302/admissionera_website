"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore, type ReactNode, type SVGProps } from "react";
import type { FilteredCourseRow } from "@/lib/courseFilters";
import { resolveMediaUrl } from "@/lib/universities";

type SortOption = "relevance" | "name" | "rank";
type ViewMode = "list" | "grid";

const SAVED_KEY = "admissionera:saved-courses";
const SAVED_EVENT = "admissionera:saved-courses-change";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function subscribeSaved(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SAVED_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SAVED_EVENT, callback);
  };
}

function prettyLabel(value?: string | null) {
  if (!value) return "";
  const known: Record<string, string> = {
    UNDERGRADUATE: "Undergraduate",
    POSTGRADUATE: "Postgraduate",
    ONLINE: "Online",
    OFFLINE: "Offline",
    HYBRID: "Hybrid",
    DISTANCE: "Distance",
  };
  if (known[value]) return known[value];
  return value.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function IconGrid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconList(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ filled, ...props }: SVGProps<SVGSVGElement> & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" {...props}>
      <path
        d="M12 20s-7-4.35-7-9.2A3.9 3.9 0 0 1 12 7.2 3.9 3.9 0 0 1 19 10.8C19 15.65 12 20 12 20Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShare(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.4 13.2 7.2 4.1M15.6 6.7l-7.2 4.1" strokeLinecap="round" />
    </svg>
  );
}

function IconArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLevel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 20V10M12 20V4M20 20v-7" strokeLinecap="round" />
    </svg>
  );
}

function IconMode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" strokeLinecap="round" />
    </svg>
  );
}

function IconCap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m12 3 10 5-10 5L2 8l10-5Z" strokeLinejoin="round" />
      <path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconVerified(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5 14.4 4l2.7-.4.9 2.6 2.5 1.1-.8 2.6.8 2.6-2.5 1.1-.9 2.6-2.7-.4L12 21.5 9.6 20l-2.7.4-.9-2.6-2.5-1.1.8-2.6-.8-2.6 2.5-1.1.9-2.6 2.7.4L12 2.5Z" />
      <path d="m8.8 12.1 2.1 2.1 4.3-4.4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CourseActions({ id, title, href }: { id: string; title: string; href: string }) {
  const saved = useSyncExternalStore(
    subscribeSaved,
    () => readSaved().includes(id),
    () => false
  );
  const [status, setStatus] = useState("");

  const toggleSave = () => {
    try {
      const list = readSaved();
      const next = saved ? list.filter((item) => item !== id) : [...new Set([...list, id])];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(SAVED_EVENT));
      setStatus(saved ? "Removed from wishlist" : "Saved to wishlist");
      window.setTimeout(() => setStatus(""), 2000);
    } catch {
      setStatus("Couldn’t save on this browser");
      window.setTimeout(() => setStatus(""), 2000);
    }
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}${href}` : href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
      window.setTimeout(() => setStatus(""), 2000);
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        setStatus("Couldn’t share link");
        window.setTimeout(() => setStatus(""), 2000);
      }
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        onClick={toggleSave}
        aria-pressed={saved}
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E9DDF8] bg-white text-[#777493] transition hover:border-[#EC168C]/40 hover:text-[#EC168C]"
      >
        <IconHeart className="h-4 w-4" filled={saved} />
      </button>
      <button
        type="button"
        onClick={share}
        aria-label="Share course"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E9DDF8] bg-white text-[#777493] transition hover:border-[#440F76]/35 hover:text-[#440F76]"
      >
        <IconShare className="h-4 w-4" />
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`absolute right-0 top-full mt-2 whitespace-nowrap rounded-md bg-[#1B1238] px-2.5 py-1 text-[11px] font-medium text-white transition ${
          status ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex min-w-0 items-start gap-2 text-[12.5px] text-[#777493]">
      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 text-[#440F76]">{icon}</span>
      <span className="min-w-0">
        <span className="font-medium text-[#1B1238]">{label}: </span>
        <span className="break-words">{value}</span>
      </span>
    </li>
  );
}

function ResultCard({ row, view }: { row: FilteredCourseRow; view: ViewMode }) {
  const logo = resolveMediaUrl(row.university_logo);
  const href = row.course_uuid ? `/courses/${row.course_uuid}` : "/courses";
  const id = row.course_uuid || row.fee_uuid || row.course_name || "course";
  const mode = prettyLabel(row.study_mode);
  const level = prettyLabel(row.level);
  const imageSrc = logo || "/hero/slide-2.png";
  const isList = view === "list";

  return (
    <article
      className={`group overflow-hidden rounded-[18px] border border-[#E9DDF8] bg-white shadow-[0_8px_24px_rgba(68,15,118,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(68,15,118,0.1)] ${
        isList ? "flex flex-col sm:flex-row" : "flex h-full flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-[#F3EDFB] ${
          isList ? "h-44 w-full sm:h-auto sm:w-[210px] lg:w-[230px]" : "aspect-[16/10] w-full"
        }`}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes={isList ? "(max-width: 640px) 100vw, 230px" : "(max-width: 768px) 100vw, 33vw"}
          className={logo ? "object-contain p-6" : "object-cover transition duration-500 group-hover:scale-[1.03]"}
          unoptimized={imageSrc.startsWith("http")}
        />
        {mode ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#EC168C] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-white shadow-[0_6px_14px_rgba(236,22,140,0.35)]">
            {mode}
          </span>
        ) : null}
      </div>

      <div className={`flex min-w-0 flex-1 flex-col ${isList ? "p-4 sm:p-5" : "p-4"}`}>
        <div className={`flex items-start justify-between gap-3 ${isList ? "" : "mb-2"}`}>
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold leading-snug text-[#1B1238] sm:text-[17px]">
              {row.course_name || "Course"}
            </h2>
            {row.university_name ? (
              <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#777493]">
                <span className="truncate">{row.university_name}</span>
                <IconVerified className="h-4 w-4 shrink-0 text-[#2F80ED]" aria-hidden />
              </p>
            ) : null}
          </div>
          <CourseActions id={id} title={row.course_name || "Course"} href={href} />
        </div>

        <ul className={`mt-3 grid gap-2 ${isList ? "sm:grid-cols-2" : ""}`}>
          {level ? <MetaItem icon={<IconLevel className="h-4 w-4" />} label="Level" value={level} /> : null}
          {mode ? <MetaItem icon={<IconMode className="h-4 w-4" />} label="Mode" value={mode} /> : null}
          {row.specialization_name ? (
            <MetaItem icon={<IconCap className="h-4 w-4" />} label="Specialization" value={row.specialization_name} />
          ) : null}
          {row.university_location ? (
            <MetaItem icon={<IconPin className="h-4 w-4" />} label="Location" value={row.university_location} />
          ) : null}
        </ul>

        <div className={`mt-auto pt-4 ${isList ? "flex justify-end" : ""}`}>
          <Link
            href={href}
            className={`group/cta inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#440F76_0%,#7A178F_48%,#EC168C_100%)] px-4 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(68,15,118,0.2)] transition hover:brightness-[1.04] ${
              isList ? "" : "w-full"
            }`}
          >
            View Course
            <IconArrow className="h-4 w-4 transition group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function RecommendationsBanner() {
  return (
    <section
      className="relative mt-6 overflow-hidden rounded-[18px] border border-[#E9DDF8] bg-[linear-gradient(100deg,#F7F0FF_0%,#FFF2F8_100%)] px-5 py-5 sm:px-6"
      aria-labelledby="course-recommendations-heading"
    >
      <Image
        src="/hero/slide-1.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.12]"
        aria-hidden
      />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#EC168C] shadow-[0_8px_20px_rgba(68,15,118,0.08)]">
            <IconCap className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 id="course-recommendations-heading" className="text-[16px] font-bold text-[#1B1238] sm:text-[17px]">
              Still looking for the right course?
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-[#777493]">
              Get personalized course recommendations based on your interests and career goals.
            </p>
          </div>
        </div>
        <Link
          href="/tools/course-finder"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#EC168C] bg-white px-4 text-[13px] font-semibold text-[#EC168C] transition hover:bg-[#FFF0F7]"
        >
          Get Recommendations
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function ResultsToolbar({
  sort,
  view,
  onSort,
  onView,
}: {
  sort: SortOption;
  view: ViewMode;
  onSort: (value: SortOption) => void;
  onView: (value: ViewMode) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="inline-flex items-center gap-2 text-[12.5px] text-[#777493]">
        <span className="font-medium">Sort by</span>
        <select
          value={sort}
          onChange={(event) => onSort(event.target.value as SortOption)}
          className="h-9 rounded-xl border border-[#E9DDF8] bg-white px-3 text-[12.5px] font-semibold text-[#1B1238] outline-none focus:border-[#440F76] focus:ring-2 focus:ring-[#440F76]/12"
        >
          <option value="relevance">Relevance</option>
          <option value="name">Course name</option>
          <option value="rank">World rank</option>
        </select>
      </label>
      <div className="inline-flex overflow-hidden rounded-xl border border-[#E9DDF8] bg-white p-0.5">
        <button
          type="button"
          aria-pressed={view === "grid"}
          aria-label="Grid view"
          onClick={() => onView("grid")}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-[10px] transition ${
            view === "grid" ? "bg-[#440F76] text-white" : "text-[#777493] hover:bg-[#F7F2FF]"
          }`}
        >
          <IconGrid className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-pressed={view === "list"}
          aria-label="List view"
          onClick={() => onView("list")}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-[10px] transition ${
            view === "list" ? "bg-[#440F76] text-white" : "text-[#777493] hover:bg-[#F7F2FF]"
          }`}
        >
          <IconList className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function FilteredCourseResults({
  rows,
  error,
  emptyMessage,
  summary,
}: {
  rows: FilteredCourseRow[];
  error?: string;
  emptyMessage?: string;
  summary?: string;
}) {
  const [sort, setSort] = useState<SortOption>("relevance");
  const [view, setView] = useState<ViewMode>("list");

  const sorted = useMemo(() => {
    const next = [...rows];
    if (sort === "name") {
      next.sort((a, b) => String(a.course_name || "").localeCompare(String(b.course_name || "")));
    } else if (sort === "rank") {
      next.sort((a, b) => {
        const left = Number(a.university_world_rank);
        const right = Number(b.university_world_rank);
        const leftRank = Number.isFinite(left) ? left : Number.POSITIVE_INFINITY;
        const rightRank = Number.isFinite(right) ? right : Number.POSITIVE_INFINITY;
        return leftRank - rightRank;
      });
    }
    return next;
  }, [rows, sort]);

  return (
    <div className="min-w-0">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        {summary ? <p className="min-w-0 text-sm leading-relaxed text-[#777493]">{summary}</p> : <span />}
        <ResultsToolbar sort={sort} view={view} onSort={setSort} onView={setView} />
      </div>

      {error ? (
        <div className="rounded-[18px] border border-dashed border-red-200 bg-white px-6 py-16 text-center">
          <p className="text-lg font-bold text-[#1B1238]">Couldn’t load filtered courses</p>
          <p className="mt-2 text-sm text-[#777493]">{error}</p>
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-[18px] border border-dashed border-[#E9DDF8] bg-white px-6 py-16 text-center">
          <p className="text-lg font-bold text-[#1B1238]">No courses match these filters</p>
          <p className="mt-2 text-sm text-[#777493]">{emptyMessage || "Try adjusting your filters."}</p>
        </div>
      ) : (
        <div className={view === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" : "grid grid-cols-1 gap-4"}>
          {sorted.map((row, index) => (
            <ResultCard key={`${row.fee_uuid || row.course_uuid}-${index}`} row={row} view={view} />
          ))}
        </div>
      )}

      <RecommendationsBanner />
    </div>
  );
}
