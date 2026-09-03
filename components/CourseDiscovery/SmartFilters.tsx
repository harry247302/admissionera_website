"use client";

import {
  FILTER_OPTIONS,
  DEFAULT_FEE_RANGE,
  formatFee,
  getUniversities,
  selectedFilterCount,
  COURSES,
  type CourseFilters,
  type SortKey,
} from "@/lib/courses";
import { FilterDropdown } from "@/components/CourseDiscovery/FilterDropdown";
import { SlidersIcon } from "@/components/CourseDiscovery/cd-icons";

type SmartFiltersProps = {
  filters: CourseFilters;
  openKey: string | null;
  sort: SortKey;
  onOpen: (key: string | null) => void;
  onChange: (next: CourseFilters) => void;
  onSort: (value: SortKey) => void;
  onOpenMobile: () => void;
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function SmartFilters({
  filters,
  openKey,
  sort,
  onOpen,
  onChange,
  onSort,
  onOpenMobile,
}: SmartFiltersProps) {
  const close = () => onOpen(null);
  const universities = getUniversities(COURSES);
  const total = selectedFilterCount(filters);

  return (
    <div className="cd-filterbar">
      <button
        type="button"
        className={`cd-chip lg:hidden ${total > 0 ? "is-active" : ""}`}
        aria-haspopup="dialog"
        onClick={onOpenMobile}
      >
        <SlidersIcon className="h-4 w-4" />
        Filters
        {total > 0 ? <span className="cd-count">{total}</span> : null}
      </button>
      <label className="cd-mobile-sort lg:hidden">
        <span className="sr-only">Sort programs</span>
        <select
          value={sort}
          className="cd-select"
          aria-label="Sort programs"
          onChange={(event) => onSort(event.target.value as SortKey)}
        >
          <option value="recommended">Recommended</option>
          <option value="popular">Popular</option>
          <option value="rating">Highest rated</option>
          <option value="fees">Lowest fees</option>
          <option value="duration">Shortest duration</option>
        </select>
      </label>
      <div className="cd-filter-scroll hidden items-center gap-2 lg:flex">
        <FilterDropdown
          label="Filters"
          count={total}
          open={openKey === "all"}
          onOpen={() => onOpen("all")}
          onClose={close}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#667085]">
            Quick select
          </p>
          {FILTER_OPTIONS.modes.map((item) => (
            <label key={item} className="cd-check">
              <input
                type="checkbox"
                checked={filters.modes.includes(item)}
                onChange={() => onChange({ ...filters, modes: toggleValue(filters.modes, item) })}
              />
              {item}
            </label>
          ))}
        </FilterDropdown>
        <FilterDropdown
          label="Study Level"
          count={filters.levels.length}
          open={openKey === "level"}
          onOpen={() => onOpen("level")}
          onClose={close}
        >
          {FILTER_OPTIONS.levels.map((item) => (
            <label key={item} className="cd-check">
              <input
                type="checkbox"
                checked={filters.levels.includes(item)}
                onChange={() => onChange({ ...filters, levels: toggleValue(filters.levels, item) })}
              />
              {item}
            </label>
          ))}
        </FilterDropdown>
        <FilterDropdown
          label="Mode"
          count={filters.modes.length}
          open={openKey === "mode"}
          onOpen={() => onOpen("mode")}
          onClose={close}
        >
          {FILTER_OPTIONS.modes.map((item) => (
            <label key={item} className="cd-check">
              <input
                type="checkbox"
                checked={filters.modes.includes(item)}
                onChange={() => onChange({ ...filters, modes: toggleValue(filters.modes, item) })}
              />
              {item}
            </label>
          ))}
        </FilterDropdown>
        <FilterDropdown
          label="Duration"
          count={filters.durations.length}
          open={openKey === "duration"}
          onOpen={() => onOpen("duration")}
          onClose={close}
        >
          {FILTER_OPTIONS.durations.map((item) => (
            <label key={item.id} className="cd-check">
              <input
                type="checkbox"
                checked={filters.durations.includes(item.id)}
                onChange={() =>
                  onChange({ ...filters, durations: toggleValue(filters.durations, item.id) })
                }
              />
              {item.label}
            </label>
          ))}
        </FilterDropdown>
        <FilterDropdown
          label="Specialization"
          count={filters.specializations.length}
          open={openKey === "spec"}
          onOpen={() => onOpen("spec")}
          onClose={close}
        >
          {FILTER_OPTIONS.specializations.map((item) => (
            <label key={item} className="cd-check">
              <input
                type="checkbox"
                checked={filters.specializations.includes(item)}
                onChange={() =>
                  onChange({
                    ...filters,
                    specializations: toggleValue(filters.specializations, item),
                  })
                }
              />
              {item}
            </label>
          ))}
        </FilterDropdown>
        <FilterDropdown
          label="University"
          count={filters.universities.length}
          open={openKey === "uni-name"}
          onOpen={() => onOpen("uni-name")}
          onClose={close}
        >
          <div className="max-h-56 overflow-y-auto">
            {universities.map((item) => (
              <label key={item} className="cd-check">
                <input
                  type="checkbox"
                  checked={filters.universities.includes(item)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      universities: toggleValue(filters.universities, item),
                    })
                  }
                />
                {item}
              </label>
            ))}
          </div>
        </FilterDropdown>
        <FilterDropdown
          label="University Type"
          count={filters.universityTypes.length}
          open={openKey === "uni"}
          onOpen={() => onOpen("uni")}
          onClose={close}
        >
          {FILTER_OPTIONS.universityTypes.map((item) => (
            <label key={item} className="cd-check">
              <input
                type="checkbox"
                checked={filters.universityTypes.includes(item)}
                onChange={() =>
                  onChange({
                    ...filters,
                    universityTypes: toggleValue(filters.universityTypes, item),
                  })
                }
              />
              {item}
            </label>
          ))}
        </FilterDropdown>
        <FilterDropdown
          label="Fees"
          count={
            filters.feeMin !== DEFAULT_FEE_RANGE.min || filters.feeMax !== DEFAULT_FEE_RANGE.max
              ? 1
              : 0
          }
          open={openKey === "fees"}
          onOpen={() => onOpen("fees")}
          onClose={close}
        >
          <p className="mb-3 text-sm font-medium text-[#111827]">
            {formatFee(filters.feeMin)} – {formatFee(filters.feeMax)}
          </p>
          <label className="block text-xs text-[#667085]">
            Minimum
            <input
              type="range"
              min={DEFAULT_FEE_RANGE.min}
              max={filters.feeMax}
              step={5000}
              value={filters.feeMin}
              className="mt-2 w-full accent-[#4F46E5]"
              onChange={(event) =>
                onChange({ ...filters, feeMin: Number(event.target.value) })
              }
            />
          </label>
          <label className="mt-3 block text-xs text-[#667085]">
            Maximum
            <input
              type="range"
              min={filters.feeMin}
              max={DEFAULT_FEE_RANGE.max}
              step={5000}
              value={filters.feeMax}
              className="mt-2 w-full accent-[#4F46E5]"
              onChange={(event) =>
                onChange({ ...filters, feeMax: Number(event.target.value) })
              }
            />
          </label>
        </FilterDropdown>
      </div>
    </div>
  );
}
