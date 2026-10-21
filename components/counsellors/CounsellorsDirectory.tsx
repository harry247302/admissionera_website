"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  counsellorExperience,
  counsellorName,
  counsellorSpecializations,
  isCounsellorOnline,
  type Counsellor,
} from "@/lib/admissionExperts";
import { FilterIcon, SearchIcon } from "./icons";
import { MentorCard } from "./MentorCard";
import { EMPTY_FILTERS, MentorFilters, type MentorFilterOptions, type MentorFilterState } from "./MentorFilters";
import { MentorSortBar, type MentorSort } from "./MentorSortBar";
import { UniversityGuidanceBanner } from "./UniversityGuidanceBanner";

function uniqueSorted(values: (string | null | undefined)[]) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value)))).sort(
    (a, b) => a.localeCompare(b),
  );
}

function matchesQuery(counsellor: Counsellor, query: string) {
  if (!query) return true;
  return [
    counsellorName(counsellor),
    counsellor.designation,
    counsellor.qualification,
    counsellor.state,
    counsellor.notes,
    ...counsellorSpecializations(counsellor),
  ].some((value) => value?.toLowerCase().includes(query));
}

function applyFilters(counsellors: Counsellor[], filters: MentorFilterState, query: string) {
  return counsellors.filter((counsellor) => {
    const specializations = counsellorSpecializations(counsellor);
    return (
      matchesQuery(counsellor, query) &&
      (!filters.onlineOnly || isCounsellorOnline(counsellor)) &&
      (!filters.state || counsellor.state?.trim() === filters.state) &&
      (filters.skills.length === 0 || filters.skills.some((item) => specializations.includes(item)))
    );
  });
}

function sortCounsellors(counsellors: Counsellor[], sort: MentorSort) {
  if (sort !== "experience") return counsellors;
  return [...counsellors].sort((a, b) => (counsellorExperience(b) ?? -1) - (counsellorExperience(a) ?? -1));
}

function activeFilterCount(filters: MentorFilterState) {
  return (
    Number(filters.onlineOnly) +
    Number(filters.gender !== "all") +
    Number(Boolean(filters.state)) +
    filters.languages.length +
    filters.skills.length
  );
}

export function CounsellorsDirectory({
  counsellors,
  error,
}: {
  counsellors: Counsellor[];
  error?: string;
}) {
  const [filters, setFilters] = useState<MentorFilterState>(EMPTY_FILTERS);
  const [sort, setSort] = useState<MentorSort>("recommended");
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  console.log(counsellors,"+++++++++++++++++++");
  const options = useMemo<MentorFilterOptions>(
    () => ({
      states: uniqueSorted(counsellors.map((counsellor) => counsellor.state)),
      languages: [],
      skills: uniqueSorted(counsellors.flatMap(counsellorSpecializations)),
      hasGender: false,
    }),
    [counsellors],
  );
  const feeAvailable = false;

  const results = useMemo(
    () => sortCounsellors(applyFilters(counsellors, filters, query.trim().toLowerCase()), sort),
    [counsellors, filters, query, sort],
  );

  const activeCount = activeFilterCount(filters);
  const resetAll = () => {
    setFilters(EMPTY_FILTERS);
    setQuery("");
  };

  return (
    <main id="main" className="flex-1 bg-[#F7F3FF]">
      <div className="era-shell py-6 lg:py-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#F20D70]">Admission Era Connect</p>
            <h1 className="mt-1 text-[26px] font-extrabold tracking-tight text-[#211344] sm:text-[28px]">Find Your Mentor</h1>
          </div>
          <div className="relative w-full sm:max-w-[360px]">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#716786]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by mentor name, skill or state"
              aria-label="Search mentors"
              className="h-11 w-full rounded-xl border border-[#E7DDF7] bg-white pl-10 pr-4 text-[13.5px] text-[#211344] outline-none placeholder:text-[#9A90AD] focus:border-[#440F76] focus:ring-2 focus:ring-[#440F76]/10"
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[264px_minmax(0,1fr)]">
          <aside aria-label="Mentor filters" className="lg:sticky lg:top-24 lg:self-start">
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-controls="mentor-filters"
              className="flex h-11 w-full items-center justify-between rounded-xl border border-[#E7DDF7] bg-white px-4 text-[13.5px] font-bold text-[#211344] lg:hidden"
            >
              <span className="inline-flex items-center gap-2">
                <FilterIcon className="h-4 w-4 text-[#440F76]" />
                Filters
                {activeCount ? (
                  <span className="rounded-full bg-[#F20D70] px-2 py-0.5 text-[11px] text-white">{activeCount}</span>
                ) : null}
              </span>
              <span className="text-[12px] font-semibold text-[#F20D70]">{filtersOpen ? "Hide" : "Show"}</span>
            </button>
            <div id="mentor-filters" className={`${filtersOpen ? "mt-3 block" : "hidden"} lg:mt-0 lg:block`}>
              <MentorFilters filters={filters} options={options} onChange={setFilters} onReset={resetAll} />
            </div>
          </aside>

          <section aria-label="Mentor results" className="min-w-0 space-y-4">
            <MentorSortBar count={results.length} sort={sort} onSortChange={setSort} feeAvailable={feeAvailable} />
            {/* <UniversityGuidanceBanner /> */}

            {error ? (
              <div role="alert" className="rounded-2xl border border-[#F7C6D9] bg-white px-6 py-10 text-center">
                <p className="font-bold text-[#211344]">We couldn&apos;t load mentors right now.</p>
                <p className="mt-1 text-[13px] text-[#716786]">{error}</p>
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#E7DDF7] bg-white px-6 py-14 text-center">
                <p className="font-bold text-[#211344]">
                  {counsellors.length === 0 ? "No mentors available" : "No mentors match your filters"}
                </p>
                {counsellors.length === 0 ? (
                  <Link href="/" className="mt-3 inline-flex text-sm font-semibold text-[#F20D70]">
                    Back to home
                  </Link>
                ) : (
                  <button type="button" onClick={resetAll} className="mt-3 text-sm font-semibold text-[#F20D70]">
                    Reset all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((counsellor) => (
                  <MentorCard key={counsellor.uuid} counsellor={counsellor} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
