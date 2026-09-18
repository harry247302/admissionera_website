"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  filterUniversities,
  fetchDiscoveryUniversities,
  type DiscoveryUniversity,
  type UniversityFilterTab,
} from "@/lib/universities";

const STATS = [
  {
    label: "Enquiries Last Month",
    value: "90+ Students Enquired",
    icon: "cap" as const,
  },
  {
    label: "Counselling This Month",
    value: "100+ Students Counseled",
    icon: "people" as const,
  },
  {
    label: "Counselling Experts",
    value: "50+ Domain Experts",
    icon: "headset" as const,
  },
  {
    label: "Google Rating",
    value: "4.5/5 From 2,000+ Reviews",
    icon: "star" as const,
  },
];

const FILTER_TABS: { id: UniversityFilterTab; label: string; icon: "all" | "fire" | "gov" | "private" | "globe" | "map" }[] = [
  { id: "all", label: "All Universities", icon: "all" },
  { id: "popular", label: "Popular", icon: "fire" },
  { id: "government", label: "Government", icon: "gov" },
  { id: "private", label: "Private", icon: "private" },
  { id: "international", label: "International", icon: "globe" },
  { id: "state", label: "State-wise", icon: "map" },
];

function StatIcon({ type }: { type: (typeof STATS)[number]["icon"] }) {
  const common = "h-5 w-5";
  switch (type) {
    case "people":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="16.5" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3.5 19c1.2-3 3.3-4.5 5.5-4.5s4.3 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M14 14.8c1.5-.5 3-.3 4.5 1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "headset":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.7" />
          <rect x="3" y="12" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="17" y="12" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="M17 18v1a3 3 0 0 1-3 3h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common} aria-hidden>
          <path d="m12 3.4 2.5 5.1 5.6.8-4 3.9.9 5.6L12 16.2 7 18.8l.9-5.6-4-3.9 5.6-.8L12 3.4Z" />
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

function TabIcon({ type }: { type: (typeof FILTER_TABS)[number]["icon"] }) {
  const common = "h-4 w-4";
  switch (type) {
    case "fire":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M12 3c2 3 1 5 1 5s3-1 5 2c2 3 0 8-6 8s-8-4-6-8c1-2 3-3 4-4 .5 2 1 3 2 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "gov":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M4 20h16M6 20V10h12v10M12 4l8 4H4l8-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "private":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M5 20V9l7-4 7 4v11" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 12h16M12 4c2.5 2.8 3.8 5.4 3.8 8S14.5 17.2 12 20c-2.5-2.8-3.8-5.4-3.8-8S9.5 6.8 12 4Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "map":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="m9 4 6 2 5-2v14l-5 2-6-2-5 2V6l5-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
          <path d="M4 7.5 12 4l8 3.5-8 3.5L4 7.5Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M6.5 10.5v5c0 .9 2.4 2.5 5.5 2.5s5.5-1.6 5.5-2.5v-5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} className="h-5 w-5" aria-hidden>
      <path
        d="M12 20s-7-4.4-9.2-8.2C1.2 9.2 2.6 6 5.8 6c1.9 0 3.2 1.1 4 2.2C10.6 7.1 11.9 6 13.8 6c3.2 0 4.6 3.2 3 5.8C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5V5.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 18.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function UniversityCard({
  university,
  favorite,
  onToggleFavorite,
}: {
  university: DiscoveryUniversity;
  favorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_24px_rgba(23,19,74,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(91,33,182,0.1)]">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`rounded-md p-1 transition ${
            favorite ? "text-rose-500" : "text-slate-300 hover:text-rose-400"
          }`}
          aria-label={favorite ? `Remove ${university.name} from saved` : `Save ${university.name}`}
        >
          <HeartIcon filled={favorite} />
        </button>
      </div>

      <div className="mt-1 flex flex-1 flex-col items-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100">
          {university.logo ? (
            <Image
              src={university.logo}
              alt={`${university.name} logo`}
              width={64}
              height={64}
              className="h-full w-full object-contain p-1.5"
              unoptimized
            />
          ) : (
            <span className="text-sm font-bold text-[#5b21b6]">
              {(university.shortName || university.name).slice(0, 3).toUpperCase()}
            </span>
          )}
        </div>

        <h3 className="mt-4 line-clamp-2 min-h-[2.6rem] text-sm font-bold leading-snug text-era-dark">
          {university.name}
        </h3>

        <div className="mt-3 flex w-full items-center justify-center gap-3 text-[11px] font-medium text-slate-500">
          <span className="inline-flex items-center gap-1">
            <BookIcon />
            {university.courseCount} Course{university.courseCount === 1 ? "" : "s"}
          </span>
          <span className="inline-flex max-w-[45%] items-center gap-1 truncate" title={university.state}>
            <PinIcon />
            <span className="truncate">{university.state}</span>
          </span>
        </div>
      </div>

      <Link
        href={`/universities/${university.uuid}`}
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-violet-100 bg-violet-50/70 px-3 text-sm font-semibold text-[#5b21b6] transition hover:border-violet-200 hover:bg-violet-100"
      >
        View Courses →
      </Link>
    </article>
  );
}

export function TopUniversitiesSection() {
  const [universities, setUniversities] = useState<DiscoveryUniversity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<UniversityFilterTab>("all");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchDiscoveryUniversities();
        if (!cancelled) setUniversities(data);
      } catch (err) {
        if (!cancelled) {
          setUniversities([]);
          setError(err instanceof Error ? err.message : "Failed to load universities");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => filterUniversities(universities, tab, search),
    [universities, tab, search]
  );

  const visible = filtered.slice(0, 12);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative bg-[#f7f5fb] py-12 lg:py-16" aria-labelledby="top-universities-heading">
      <div className="era-shell">
        <div className="overflow-hidden rounded-2xl bg-[#4c1d95] px-4 py-5 text-white shadow-[0_16px_40px_rgba(76,29,149,0.28)] sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0 xl:divide-x xl:divide-white/20">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 xl:px-5 first:xl:pl-0 last:xl:pr-0">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <StatIcon type={stat.icon} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-violet-200">{stat.label}</p>
                    <p className="mt-0.5 text-sm font-bold leading-snug">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <p
              className="shrink-0 text-right text-lg font-semibold italic tracking-wide text-white/90 lg:pl-6"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Your Future Our Focus
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="mx-auto flex max-w-md items-center gap-3">
            <span className="h-px flex-1 bg-violet-200" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Top Universities
            </p>
            <span className="h-px flex-1 bg-violet-200" />
          </div>
          <h2
            id="top-universities-heading"
            className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#5b21b6] sm:text-4xl"
          >
            Online & Distance Education Universities
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Discover India&apos;s leading universities offering comprehensive courses through online
            and distance education to shape your future.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((item) => {
              const active = tab === item.id;
              const countLabel =
                item.id === "all" ? `All Universities (${universities.length})` : item.label;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  aria-pressed={active}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition ${
                    active
                      ? "bg-[#5b21b6] text-white shadow-[0_10px_24px_rgba(91,33,182,0.28)]"
                      : "bg-violet-100/80 text-[#5b21b6] hover:bg-violet-200/80"
                  }`}
                >
                  <TabIcon type={item.icon} />
                  {countLabel}
                </button>
              );
            })}
          </div>

          <label className="relative block w-full xl:max-w-xs">
            <span className="sr-only">Search universities</span>
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search universities..."
              className="min-h-11 w-full rounded-full border border-violet-100 bg-white py-2.5 pl-10 pr-4 text-sm text-era-dark outline-none ring-[#5b21b6]/30 placeholder:text-slate-400 focus:ring-2"
            />
          </label>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="rounded-3xl border border-violet-100 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-era-dark">Loading universities…</p>
              <p className="mt-2 text-sm text-slate-500">Fetching partner campuses for you.</p>
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-red-200 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-era-dark">Couldn’t load universities</p>
              <p className="mt-2 text-sm text-slate-500">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-violet-200 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold text-era-dark">No universities match your filters</p>
              <p className="mt-2 text-sm text-slate-500">Try another tab or clear the search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {visible.map((university) => (
                <UniversityCard
                  key={university.uuid}
                  university={university}
                  favorite={favorites.includes(university.uuid)}
                  onToggleFavorite={() => toggleFavorite(university.uuid)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#5b21b6]" aria-hidden>
              <path d="M3 10.5 12 5l9 5.5-9 5.5L3 10.5Z" stroke="currentColor" strokeWidth="1.7" />
              <path d="M6.5 12.5v4c0 .8 2.3 2.2 5.5 2.2s5.5-1.4 5.5-2.2v-4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            Partnering with the best universities for a brighter tomorrow.
          </p>

          <Link
            href="/universities"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#5b21b6] px-7 text-sm font-bold text-white shadow-[0_12px_28px_rgba(91,33,182,0.28)] transition hover:bg-[#4c1d95]"
          >
            View All Universities →
          </Link>

          <p
            className="text-base font-semibold italic text-[#5b21b6]/80"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Learn Grow Succeed
          </p>
        </div>
      </div>
    </section>
  );
}
