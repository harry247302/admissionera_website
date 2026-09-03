"use client";

import type { SortKey } from "@/lib/courses";
import { GridIcon, ListIcon } from "@/components/CourseDiscovery/cd-icons";

type CourseResultsHeaderProps = {
  total: number;
  pageStart: number;
  pageEnd: number;
  sort: SortKey;
  view: "grid" | "list";
  onSort: (value: SortKey) => void;
  onView: (value: "grid" | "list") => void;
};

export function CourseResultsHeader({
  total,
  pageStart,
  pageEnd,
  sort,
  view,
  onSort,
  onView,
}: CourseResultsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#111827]">
          Recommended programs
        </h2>
        <p className="mt-1 text-sm text-[#667085]">
          {total} programs found · Showing {pageStart}–{pageEnd} of {total}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="hidden items-center gap-2 text-sm text-[#667085] lg:flex">
          Sort by
          <select
            value={sort}
            className="cd-select"
            onChange={(event) => onSort(event.target.value as SortKey)}
          >
            <option value="recommended">Recommended</option>
            <option value="popular">Popular</option>
            <option value="rating">Highest rated</option>
            <option value="fees">Lowest fees</option>
            <option value="duration">Shortest duration</option>
          </select>
        </label>
        <div className="flex rounded-xl border border-[#E5E7EB] bg-white p-1">
          <button
            type="button"
            className={`rounded-lg p-2 ${view === "grid" ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-[#667085]"}`}
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => onView("grid")}
          >
            <GridIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={`rounded-lg p-2 ${view === "list" ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-[#667085]"}`}
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => onView("list")}
          >
            <ListIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
