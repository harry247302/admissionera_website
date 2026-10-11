import type { FormEvent } from "react";
import { COURSE_LEVELS, DURATIONS, SPECIALIZATIONS, STUDY_MODES } from "@/lib/courseDiscovery";

export type CourseSearchState = {
  query: string;
  level: string;
  mode: string;
  duration: string;
  specialization: string;
};

export const EMPTY_SEARCH: CourseSearchState = {
  query: "",
  level: "",
  mode: "",
  duration: "",
  specialization: "",
};

const selectClass =
  "h-11 min-w-0 flex-1 appearance-none rounded-xl border border-transparent bg-[#F7F6FB] bg-[length:14px] bg-[right_12px_center] bg-no-repeat px-3 pr-8 text-[13px] font-medium text-[#1B1448] outline-none transition focus:border-[#D9D2FF] focus:bg-white";

const chevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238B93A7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="min-w-[140px] flex-1">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
        style={{ backgroundImage: chevron }}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CourseSearchToolbar({
  value,
  onChange,
  onSearch,
  specializationOptions,
  durationOptions,
}: {
  value: CourseSearchState;
  onChange: (next: CourseSearchState) => void;
  onSearch: () => void;
  specializationOptions: string[];
  durationOptions: string[];
}) {
  const specializations = specializationOptions.length > 0 ? specializationOptions : [...SPECIALIZATIONS];
  const durations = durationOptions.length > 0 ? durationOptions : [...DURATIONS];

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 rounded-2xl border border-[#EEEAF8] bg-white p-2 shadow-[0_10px_30px_rgba(40,30,90,0.05)] sm:flex-row sm:flex-wrap sm:items-center lg:flex-nowrap"
    >
      <label className="relative min-w-[180px] flex-[1.4]">
        <span className="sr-only">Search courses</span>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9AA3B8]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={value.query}
          onChange={(event) => onChange({ ...value, query: event.target.value })}
          placeholder="Search courses (e.g. MBA, MCA, M.Sc...)"
          className="h-11 w-full rounded-xl bg-[#F7F6FB] pl-9 pr-3 text-[13px] text-[#1B1448] outline-none transition placeholder:text-[#A0A8BA] focus:bg-white focus:ring-2 focus:ring-[#E4DEFF]"
        />
      </label>

      <FilterSelect label="Course Level" value={value.level} options={COURSE_LEVELS} onChange={(level) => onChange({ ...value, level })} />
      <FilterSelect label="Mode" value={value.mode} options={STUDY_MODES} onChange={(mode) => onChange({ ...value, mode })} />
      <FilterSelect label="Duration" value={value.duration} options={durations} onChange={(duration) => onChange({ ...value, duration })} />
      <FilterSelect
        label="Specialization"
        value={value.specialization}
        options={specializations}
        onChange={(specialization) => onChange({ ...value, specialization })}
      />

      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-[#5B4DFF] px-6 text-[13.5px] font-semibold text-white shadow-[0_8px_16px_rgba(91,77,255,0.28)] transition duration-200 hover:bg-[#4636F0]"
      >
        Search
      </button>
    </form>
  );
}
