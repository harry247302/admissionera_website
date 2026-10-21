"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon, ResetIcon, SearchIcon, WifiIcon } from "./icons";

export type Gender = "all" | "male" | "female";

export type MentorFilterState = {
  onlineOnly: boolean;
  gender: Gender;
  state: string;
  languages: string[];
  skills: string[];
};

export const EMPTY_FILTERS: MentorFilterState = {
  onlineOnly: false,
  gender: "all",
  state: "",
  languages: [],
  skills: [],
};

export type MentorFilterOptions = {
  states: string[];
  languages: string[];
  skills: string[];
  hasGender: boolean;
};

function Checkbox({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={`flex items-center gap-2.5 py-1 text-[13px] ${
        disabled ? "cursor-not-allowed text-[#B4ABC4]" : "cursor-pointer text-[#211344]"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-[#CFC3E6] accent-[#F20D70] disabled:cursor-not-allowed"
      />
      <span className="min-w-0 truncate">{label}</span>
    </label>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-[#EFE8FA] px-4 py-3.5">
      <h3 className="mb-2 text-[13.5px] font-bold text-[#211344]">{title}</h3>
      {children}
    </section>
  );
}

function Unavailable({ label }: { label: string }) {
  return <p className="text-[12px] text-[#9A90AD]">{label} isn&apos;t available for mentors yet.</p>;
}

function SearchableList({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const visible = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));

  const toggle = (option: string) =>
    onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);

  return (
    <Group title={title}>
      {options.length === 0 ? (
        <Unavailable label={title} />
      ) : (
        <>
          <div className="relative mb-2">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9A90AD]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${title.toLowerCase()}`}
              aria-label={`Search ${title.toLowerCase()}`}
              className="h-9 w-full rounded-lg border border-[#E7DDF7] bg-white pl-8 pr-3 text-[12.5px] text-[#211344] outline-none placeholder:text-[#9A90AD] focus:border-[#440F76]"
            />
          </div>
          <div className="max-h-[156px] overflow-y-auto pr-1 [scrollbar-width:thin]">
            {query.trim() ? null : <Checkbox label="All" checked={selected.length === 0} onChange={() => onChange([])} />}
            {visible.map((option) => (
              <Checkbox key={option} label={option} checked={selected.includes(option)} onChange={() => toggle(option)} />
            ))}
            {visible.length === 0 ? <p className="py-1 text-[12px] text-[#9A90AD]">No matches</p> : null}
          </div>
        </>
      )}
    </Group>
  );
}

export function MentorFilters({
  filters,
  options,
  onChange,
  onReset,
}: {
  filters: MentorFilterState;
  options: MentorFilterOptions;
  onChange: (next: MentorFilterState) => void;
  onReset: () => void;
}) {
  const set = <K extends keyof MentorFilterState>(key: K, value: MentorFilterState[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7DDF7] bg-white shadow-[0_6px_20px_rgba(68,15,118,0.05)]">
      <div className="flex items-center justify-between px-4 py-3.5">
        <h2 className="text-[15px] font-bold text-[#211344]">Filters By</h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#F20D70] hover:text-[#C90083]"
        >
          <ResetIcon className="h-3.5 w-3.5" />
          Reset All
        </button>
      </div>

      <section className="border-t border-[#EFE8FA] px-4 py-3">
        <label className="flex cursor-pointer items-center justify-between gap-3 text-[13.5px] font-bold text-[#211344]">
          <span className="inline-flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE7F1] text-[#F20D70]">
              <WifiIcon className="h-4 w-4" />
            </span>
            Online Mentors
          </span>
          <input
            type="checkbox"
            checked={filters.onlineOnly}
            onChange={(event) => set("onlineOnly", event.target.checked)}
            className="h-4 w-4 cursor-pointer accent-[#F20D70]"
          />
        </label>
      </section>

      <Group title="Show Only">
        <div className="flex flex-wrap gap-x-4">
          {(["all", "male", "female"] as const).map((gender) => (
            <Checkbox
              key={gender}
              label={gender === "all" ? "All" : gender === "male" ? "Male" : "Female"}
              checked={filters.gender === gender}
              disabled={gender !== "all" && !options.hasGender}
              onChange={() => set("gender", gender)}
            />
          ))}
        </div>
        {options.hasGender ? null : <Unavailable label="Gender" />}
      </Group>

      <Group title="State">
        <div className="relative">
          <select
            value={filters.state}
            onChange={(event) => set("state", event.target.value)}
            disabled={options.states.length === 0}
            aria-label="State"
            className="h-9 w-full cursor-pointer appearance-none rounded-lg border border-[#E7DDF7] bg-white pl-3 pr-8 text-[12.5px] text-[#211344] outline-none focus:border-[#440F76] disabled:cursor-not-allowed disabled:text-[#9A90AD]"
          >
            <option value="">Select a state</option>
            {options.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#716786]" />
        </div>
      </Group>

      <SearchableList
        title="Language"
        options={options.languages}
        selected={filters.languages}
        onChange={(next) => set("languages", next)}
      />
      <SearchableList
        title="Skills"
        options={options.skills}
        selected={filters.skills}
        onChange={(next) => set("skills", next)}
      />
    </div>
  );
}
