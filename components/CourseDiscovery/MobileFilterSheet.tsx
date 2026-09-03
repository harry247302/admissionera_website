"use client";

import {
  FILTER_OPTIONS,
  DEFAULT_FEE_RANGE,
  formatFee,
  getUniversities,
  COURSES,
  type CourseFilters,
} from "@/lib/courses";
import { CloseIcon } from "@/components/icons";

type MobileFilterSheetProps = {
  open: boolean;
  filters: CourseFilters;
  onChange: (next: CourseFilters) => void;
  onClose: () => void;
  onClear: () => void;
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function MobileFilterSheet({
  open,
  filters,
  onChange,
  onClose,
  onClear,
}: MobileFilterSheetProps) {
  if (!open) return null;

  const universities = getUniversities(COURSES);

  return (
    <div className="cd-modal-root lg:hidden">
      <button type="button" className="cd-modal-backdrop" aria-label="Close filters" onClick={onClose} />
      <div className="cd-sheet" role="dialog" aria-modal="true" aria-label="Filters">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-[#111827]">Smart filters</p>
          <button type="button" className="cd-icon-ghost" aria-label="Close filters" onClick={onClose}>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 max-h-[58vh] space-y-5 overflow-y-auto pr-1">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Study level</legend>
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
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Mode</legend>
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
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Duration</legend>
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
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Specialization</legend>
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
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">University</legend>
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
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">University type</legend>
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
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Fees</legend>
            <p className="mb-2 text-sm">
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
          </fieldset>
        </div>
        <div className="mt-4 flex gap-3">
          <button type="button" className="cd-btn-ghost flex-1" onClick={onClear}>
            Clear
          </button>
          <button type="button" className="cd-btn-primary flex-1" onClick={onClose}>
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
