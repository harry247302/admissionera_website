"use client";

import { MicIcon, SearchIcon } from "@/components/CourseDiscovery/cd-icons";

type CourseSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CourseSearch({ value, onChange }: CourseSearchProps) {
  return (
    <form
      className="cd-search"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onChange(value.trim());
      }}
    >
      <SearchIcon className="h-5 w-5 shrink-0 text-[#4F46E5]" />
      <label htmlFor="course-search" className="sr-only">
        Search by course, specialization or university
      </label>
      <input
        id="course-search"
        type="search"
        value={value}
        placeholder="Search by course, specialization, university..."
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        type="button"
        className="cd-icon-ghost"
        aria-label="Voice search coming soon"
      >
        <MicIcon className="h-5 w-5" />
      </button>
      <button type="submit" className="cd-search-btn">
        Search
      </button>
    </form>
  );
}
