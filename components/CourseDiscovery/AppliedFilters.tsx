"use client";

import {
  DEFAULT_FEE_RANGE,
  FILTER_OPTIONS,
  formatFee,
  type CourseFilters,
} from "@/lib/courses";
import { CloseSmallIcon } from "@/components/CourseDiscovery/cd-icons";

type AppliedFiltersProps = {
  filters: CourseFilters;
  onChange: (next: CourseFilters) => void;
  onClear: () => void;
};

export function AppliedFilters({ filters, onChange, onClear }: AppliedFiltersProps) {
  const chips: { key: string; label: string; remove: () => void }[] = [];

  filters.levels.forEach((item) =>
    chips.push({
      key: `level-${item}`,
      label: item,
      remove: () =>
        onChange({ ...filters, levels: filters.levels.filter((value) => value !== item) }),
    }),
  );
  filters.modes.forEach((item) =>
    chips.push({
      key: `mode-${item}`,
      label: item,
      remove: () =>
        onChange({ ...filters, modes: filters.modes.filter((value) => value !== item) }),
    }),
  );
  filters.durations.forEach((id) => {
    const label = FILTER_OPTIONS.durations.find((item) => item.id === id)?.label ?? id;
    chips.push({
      key: `dur-${id}`,
      label,
      remove: () =>
        onChange({
          ...filters,
          durations: filters.durations.filter((value) => value !== id),
        }),
    });
  });
  filters.specializations.forEach((item) =>
    chips.push({
      key: `spec-${item}`,
      label: item,
      remove: () =>
        onChange({
          ...filters,
          specializations: filters.specializations.filter((value) => value !== item),
        }),
    }),
  );
  filters.universityTypes.forEach((item) =>
    chips.push({
      key: `uni-${item}`,
      label: item,
      remove: () =>
        onChange({
          ...filters,
          universityTypes: filters.universityTypes.filter((value) => value !== item),
        }),
    }),
  );
  if (filters.feeMin !== DEFAULT_FEE_RANGE.min || filters.feeMax !== DEFAULT_FEE_RANGE.max) {
    chips.push({
      key: "fee",
      label: `${formatFee(filters.feeMin)} – ${formatFee(filters.feeMax)}`,
      remove: () =>
        onChange({ ...filters, feeMin: DEFAULT_FEE_RANGE.min, feeMax: DEFAULT_FEE_RANGE.max }),
    });
  }
  if (filters.query) {
    chips.push({
      key: "q",
      label: `“${filters.query}”`,
      remove: () => onChange({ ...filters, query: "" }),
    });
  }
  if (filters.category) {
    chips.push({
      key: "cat",
      label: filters.category,
      remove: () => onChange({ ...filters, category: null }),
    });
  }
  filters.universities.forEach((item) =>
    chips.push({
      key: `uname-${item}`,
      label: item,
      remove: () =>
        onChange({
          ...filters,
          universities: filters.universities.filter((value) => value !== item),
        }),
    }),
  );

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-medium text-[#111827]">Applied filters</p>
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            className="cd-applied"
            onClick={chip.remove}
          >
            {chip.label}
            <CloseSmallIcon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
      <button type="button" className="text-sm font-semibold text-[#4F46E5]" onClick={onClear}>
        Clear all
      </button>
    </div>
  );
}
