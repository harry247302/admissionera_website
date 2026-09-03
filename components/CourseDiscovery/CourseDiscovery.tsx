"use client";

import { useMemo, useRef, useState } from "react";
import {
  COURSES,
  EMPTY_FILTERS,
  filterCourses,
  getCategories,
  selectedFilterCount,
  sortCourses,
  type CourseFilters,
  type SortKey,
} from "@/lib/courses";
import { AIRecommendation } from "@/components/CourseDiscovery/AIRecommendation";
import { AdvisorCTA } from "@/components/CourseDiscovery/AdvisorCTA";
import { AppliedFilters } from "@/components/CourseDiscovery/AppliedFilters";
import { CategoryNavigation } from "@/components/CourseDiscovery/CategoryNavigation";
import { CourseGrid } from "@/components/CourseDiscovery/CourseGrid";
import { CourseList } from "@/components/CourseDiscovery/CourseList";
import { CourseResultsHeader } from "@/components/CourseDiscovery/CourseResultsHeader";
import { CourseSearch } from "@/components/CourseDiscovery/CourseSearch";
import { FeaturedCourse } from "@/components/CourseDiscovery/FeaturedCourse";
import { FloatingAIButton } from "@/components/CourseDiscovery/FloatingAIButton";
import { MobileFilterSheet } from "@/components/CourseDiscovery/MobileFilterSheet";
import { Pagination } from "@/components/CourseDiscovery/Pagination";
import { SmartFilters } from "@/components/CourseDiscovery/SmartFilters";

const PAGE_SIZE = 12;

type CourseDiscoveryProps = {
  showHero?: boolean;
};

export function CourseDiscovery({ showHero = true }: CourseDiscoveryProps) {
  const [filters, setFilters] = useState<CourseFilters>(EMPTY_FILTERS);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [compared, setCompared] = useState<string[]>([]);
  const [aiOpen, setAiOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const searchTimer = useRef<number | null>(null);

  const onSearchChange = (value: string) => {
    setSearchText(value);
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      setFilters((current) => ({ ...current, query: value }));
      setPage(1);
    }, 280);
  };

  const updateFilters = (next: CourseFilters) => {
    setFilters(next);
    setPage(1);
  };

  const categories = useMemo(() => getCategories(COURSES), []);
  const filtered = useMemo(
    () => sortCourses(filterCourses(COURSES, filters), sort),
    [filters, sort],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const featured = filtered.find((course) => course.featured) ?? filtered[0];
  const first = paged.slice(0, 6);
  const rest = paged.slice(6);
  const filterCount = selectedFilterCount(filters) + (filters.category ? 1 : 0);

  const toggleBookmark = (id: string) => {
    setBookmarked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleCompare = (id: string) => {
    setCompared((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  };

  return (
    <section className="course-discovery">
      <div className="mx-auto max-w-[1440px] px-4 py-10 lg:px-8 lg:py-14">
        {showHero ? (
          <div className="cd-hero">
            <div>
              <h1 className="max-w-xl text-3xl font-bold tracking-[-0.04em] text-[#111827] sm:text-4xl">
                Find the Right Course for Your Future
              </h1>
              <p className="mt-3 max-w-lg text-base leading-7 text-[#667085]">
                Explore thousands of programs from leading universities and institutions.
              </p>
            </div>
            <div className="cd-hero-art" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : null}

        <CourseSearch value={searchText} onChange={onSearchChange} />

        <div className="cd-trust">
          <article>
            <strong>1.25 Lakh+</strong>
            <span>Learners guided</span>
          </article>
          <article>
            <strong>4.7/5</strong>
            <span>Google rating</span>
          </article>
          <article>
            <strong>600+</strong>
            <span>Trained advisors</span>
          </article>
          <article>
            <strong>10,000+</strong>
            <span>Programs listed</span>
          </article>
        </div>

        <div className="mt-8">
          <CategoryNavigation
            categories={categories}
            active={filters.category}
            onSelect={(category) => updateFilters({ ...filters, category })}
          />
        </div>

        <div className="cd-sticky">
          <SmartFilters
            filters={filters}
            openKey={openFilter}
            sort={sort}
            onOpen={setOpenFilter}
            onChange={updateFilters}
            onSort={(value) => {
              setSort(value);
              setPage(1);
            }}
            onOpenMobile={() => setMobileFilters(true)}
          />
          {filterCount > 0 ? (
            <p className="mt-3 text-sm text-[#667085] lg:hidden">{filterCount} filters applied</p>
          ) : null}
        </div>

        <div className="mt-5">
          <AppliedFilters
            filters={filters}
            onChange={(next) => {
              setSearchText(next.query);
              updateFilters(next);
            }}
            onClear={() => {
              setSearchText("");
              updateFilters(EMPTY_FILTERS);
            }}
          />
        </div>

        <div className="mt-8">
          <AIRecommendation onOpen={() => setAiOpen(true)} />
        </div>

        {featured && safePage === 1 ? (
          <div className="mt-8">
            <FeaturedCourse course={featured} />
          </div>
        ) : null}

        <div className="mt-10">
          <CourseResultsHeader
            total={filtered.length}
            pageStart={filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}
            pageEnd={Math.min(safePage * PAGE_SIZE, filtered.length)}
            sort={sort}
            view={view}
            onSort={(value) => {
              setSort(value);
              setPage(1);
            }}
            onView={setView}
          />
        </div>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-[#D0D5DD] bg-white px-6 py-16 text-center text-[#667085]">
              No programs match these filters. Try clearing a few options.
            </p>
          ) : view === "grid" ? (
            <>
              <CourseGrid
                courses={first}
                bookmarked={bookmarked}
                compared={compared}
                onBookmark={toggleBookmark}
                onCompare={toggleCompare}
              />
              {first.length > 0 ? (
                <div className="my-8">
                  <AdvisorCTA onAskAI={() => setAiOpen(true)} />
                </div>
              ) : null}
              {rest.length > 0 ? (
                <CourseGrid
                  courses={rest}
                  bookmarked={bookmarked}
                  compared={compared}
                  onBookmark={toggleBookmark}
                  onCompare={toggleCompare}
                />
              ) : null}
            </>
          ) : (
            <>
              <CourseList
                courses={first}
                bookmarked={bookmarked}
                compared={compared}
                onBookmark={toggleBookmark}
                onCompare={toggleCompare}
              />
              <div className="my-8">
                <AdvisorCTA onAskAI={() => setAiOpen(true)} />
              </div>
              {rest.length > 0 ? (
                <CourseList
                  courses={rest}
                  bookmarked={bookmarked}
                  compared={compared}
                  onBookmark={toggleBookmark}
                  onCompare={toggleCompare}
                />
              ) : null}
            </>
          )}
        </div>

        <div className="mt-10">
          <Pagination
            page={safePage}
            pageCount={pageCount}
            onPage={setPage}
            showing={`Showing ${Math.min(PAGE_SIZE, paged.length)} of ${filtered.length} programs`}
          />
        </div>
      </div>

      {compared.length > 0 ? (
        <div className="cd-comparebar">
          <p className="text-sm font-medium text-white">
            {compared.length} program{compared.length === 1 ? "" : "s"} selected
          </p>
          <a href="/compare" className="cd-btn-primary bg-white text-[#4F46E5] hover:bg-indigo-50">
            Compare now
          </a>
        </div>
      ) : null}

      <MobileFilterSheet
        open={mobileFilters}
        filters={filters}
        onChange={updateFilters}
        onClose={() => setMobileFilters(false)}
        onClear={() => updateFilters({ ...EMPTY_FILTERS, query: filters.query, category: filters.category })}
      />
      <FloatingAIButton
        open={aiOpen}
        raised={compared.length > 0}
        onOpen={() => setAiOpen(true)}
        onClose={() => setAiOpen(false)}
      />
    </section>
  );
}
