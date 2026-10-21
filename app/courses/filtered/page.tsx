import Link from "next/link";
import { CourseResultsFilters } from "@/components/courses/CourseResultsFilters";
import { FilteredCourseResults } from "@/components/courses/filtered/FilteredCourseResults";
import { FilteredCoursesHero } from "@/components/courses/filtered/FilteredCoursesHero";
import {
  courseFilterSearch,
  EMPTY_FILTER_OPTIONS,
  filtersFromSearchParams,
  fetchAllCourses,
  fetchFilterLookups,
  fetchFilteredCourses,
  type CourseFilterOptions,
  type CourseOption,
} from "@/lib/courseFilters";

function prettyLabel(value?: string) {
  if (!value) return "";
  const known: Record<string, string> = {
    UNDERGRADUATE: "Undergraduate",
    POSTGRADUATE: "Postgraduate",
    ONLINE: "Online",
    OFFLINE: "Offline",
    HYBRID: "Hybrid",
    DISTANCE: "Distance",
  };
  return known[value] || value;
}

export default async function FilteredCoursesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = filtersFromSearchParams(await searchParams);
  let error = "";
  let result = null;
  let courses: CourseOption[] = [];
  let options: CourseFilterOptions = EMPTY_FILTER_OPTIONS;

  const [filtered, courseList, lookups] = await Promise.allSettled([
    fetchFilteredCourses(query),
    fetchAllCourses(),
    fetchFilterLookups(),
  ]);
  if (filtered.status === "fulfilled") {
    result = filtered.value;
  } else {
    error = filtered.reason instanceof Error ? filtered.reason.message : "Failed to filter courses";
  }
  if (courseList.status === "fulfilled") courses = courseList.value;
  if (lookups.status === "fulfilled") {
    options = { ...options, ...lookups.value, courses };
  }

  const page = result?.pagination.page || Number(query.page) || 1;
  const totalPages = result?.pagination.totalPages || 0;
  const specializationName = options.specializations.find((item) => item.id === query.specialization)?.name;
  const sessionName = options.sessions.find((item) => item.id === query.session)?.name;
  const applied = [
    query.course && `Course: ${query.course}`,
    query.university && `University: ${query.university}`,
    query.specialization && `Specialization: ${specializationName || query.specialization}`,
    query.level && `Level: ${prettyLabel(query.level)}`,
    query.studyMode && `Mode: ${prettyLabel(query.studyMode)}`,
    query.worldRank && `World rank: ${query.worldRank}`,
    query.session && `Session: ${sessionName || query.session}`,
  ].filter(Boolean);

  return (
    <main id="main" className="bg-[#FAF8FF]">
      <FilteredCoursesHero />

      <div className="era-shell py-8 lg:py-10">
        <nav aria-label="Breadcrumb" className="text-[13px] text-[#777493]">
          <Link href="/" className="transition hover:text-[#440F76]">
            Home
          </Link>
          <span className="mx-1.5" aria-hidden>
            ›
          </span>
          <span className="font-medium text-[#1B1238]">Filtered courses</span>
        </nav>

        <h2 className="mt-3 text-[28px] font-extrabold tracking-tight text-[#1B1238] sm:text-[32px]">
          Filtered Courses
        </h2>

        <div className="mt-6 grid items-start gap-5 lg:mt-8 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-6">
          <CourseResultsFilters query={query} courses={courses} options={options} />

          <div className="min-w-0">
            <FilteredCourseResults
              rows={result?.data || []}
              error={error}
              emptyMessage={applied.length > 0 ? applied.join(" · ") : result?.message}
              summary={
                result
                  ? `${result.pagination.total} result${result.pagination.total === 1 ? "" : "s"}${
                      applied.length > 0 ? ` · ${applied.join(" · ")}` : ""
                    }`
                  : undefined
              }
            />

            {totalPages > 1 ? (
              <nav aria-label="Results pages" className="mt-6 flex items-center justify-between text-sm">
                {page > 1 ? (
                  <Link href={courseFilterSearch(query, page - 1)} className="font-semibold text-[#440F76]">
                    Previous
                  </Link>
                ) : (
                  <span />
                )}
                <span className="text-[#777493]">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Link href={courseFilterSearch(query, page + 1)} className="font-semibold text-[#440F76]">
                    Next
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
