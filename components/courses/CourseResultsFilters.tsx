"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode, type SVGProps } from "react";
import type { CourseFilterOptions, CourseFilterQuery, CourseOption } from "@/lib/courseFilters";
import { courseFilterSearch } from "@/lib/courseFilters";

const LEVELS = [
  ["UNDERGRADUATE", "Undergraduate"],
  ["POSTGRADUATE", "Postgraduate"],
  ["DIPLOMA", "Diploma"],
  ["CERTIFICATE", "Certificate"],
  ["DOCTORATE", "Doctorate"],
] as const;

const STUDY_MODES = [
  ["ONLINE", "Online"],
  ["OFFLINE", "Offline"],
  ["HYBRID", "Hybrid"],
  ["DISTANCE", "Distance"],
] as const;

const FIELD =
  "h-10 w-full appearance-none rounded-xl border border-[#E9DDF8] bg-[#FCFBFF] px-3 pr-9 text-[13px] font-medium text-[#1B1238] outline-none transition placeholder:text-[#9A90AD] hover:border-[#D4C4F0] focus:border-[#440F76] focus:bg-white focus:ring-2 focus:ring-[#440F76]/12";

function IconBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBuilding(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 21h18M6 21V8l6-4 6 4v13M9 21v-4h6v4M10 11h1M13 11h1M10 14h1M13 14h1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBars(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 20V10M12 20V4M20 20v-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMonitor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" strokeLinecap="round" />
    </svg>
  );
}

function IconCap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="m12 3 10 5-10 5L2 8l10-5Z" strokeLinejoin="round" />
      <path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGlobe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3Z" />
    </svg>
  );
}

function IconCalendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}

function IconFilter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevron(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Field({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#1B1238]">
        <span className="inline-flex h-5 w-5 items-center justify-center text-[#440F76]">{icon}</span>
        {title}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}

function SelectChevron() {
  return <IconChevron className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9A90AD]" />;
}

function readForm(form: HTMLFormElement): CourseFilterQuery {
  const data = new FormData(form);
  const value = (key: keyof CourseFilterQuery) => String(data.get(key) || "").trim();
  return {
    course: value("course"),
    university: value("university"),
    specialization: value("specialization"),
    level: value("level"),
    studyMode: value("studyMode"),
    worldRank: value("worldRank"),
    session: value("session"),
  };
}

function optionLabel(value: string) {
  const known: Record<string, string> = {
    UNDERGRADUATE: "Undergraduate",
    POSTGRADUATE: "Postgraduate",
    POST_GRADUATION: "Postgraduate",
    DIPLOMA: "Diploma",
    CERTIFICATE: "Certificate",
    DOCTORATE: "Doctorate",
    ONLINE: "Online",
    OFFLINE: "Offline",
    HYBRID: "Hybrid",
    DISTANCE: "Distance",
  };
  return known[value] || value.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function worldRankError(value?: string) {
  if (!value) return "";
  const rank = Number(value);
  if (!Number.isInteger(rank) || rank < 1) return "World rank must be a whole number of at least 1";
  return "";
}

export function CourseResultsFilters({
  query,
  courses,
  options,
}: {
  query: CourseFilterQuery;
  courses: CourseOption[];
  options: CourseFilterOptions;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const levels = options?.levels?.length ? options.levels : LEVELS.map(([value]) => value);
  const studyModes = options?.studyModes?.length ? options.studyModes : STUDY_MODES.map(([value]) => value);
  const universities = options?.universities || [];
  const specializations = options?.specializations || [];
  const sessions = options?.sessions || [];

  const apply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = readForm(event.currentTarget);
    const message = worldRankError(next.worldRank);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    const href = courseFilterSearch(next);
    if (href === courseFilterSearch(query)) return;
    setPending(true);
    setOpen(false);
    router.push(href);
  };

  const reset = () => {
    setError("");
    setPending(true);
    setOpen(false);
    router.push("/courses/filtered");
  };

  const fields = (
    <>
      <div className="space-y-3.5 px-4 py-4">
        <Field title="Course" icon={<IconBook className="h-4 w-4" />}>
          <select name="course" defaultValue={query.course || ""} aria-label="Course name" className={FIELD}>
            <option value="">All courses</option>
            {query.course && !courses.some((course) => course.name === query.course) ? (
              <option value={query.course}>{query.course}</option>
            ) : null}
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          <SelectChevron />
        </Field>

        <Field title="University" icon={<IconBuilding className="h-4 w-4" />}>
          <select name="university" defaultValue={query.university || ""} aria-label="University name" className={FIELD}>
            <option value="">All universities</option>
            {query.university && !universities.some((item) => item.name === query.university) ? (
              <option value={query.university}>{query.university}</option>
            ) : null}
            {universities.map((university) => (
              <option key={university.id} value={university.name}>
                {university.name}
              </option>
            ))}
          </select>
          <SelectChevron />
        </Field>

        <Field title="Level" icon={<IconBars className="h-4 w-4" />}>
          <select name="level" defaultValue={query.level || ""} aria-label="Course level" className={FIELD}>
            <option value="">Any level</option>
            {query.level && !levels.some((value) => value === query.level) ? (
              <option value={query.level}>{optionLabel(query.level)}</option>
            ) : null}
            {levels.map((value) => (
              <option key={value} value={value}>
                {optionLabel(value)}
              </option>
            ))}
          </select>
          <SelectChevron />
        </Field>

        <Field title="Study Mode" icon={<IconMonitor className="h-4 w-4" />}>
          <select name="studyMode" defaultValue={query.studyMode || ""} aria-label="Study mode" className={FIELD}>
            <option value="">Any mode</option>
            {query.studyMode && !studyModes.some((value) => value === query.studyMode) ? (
              <option value={query.studyMode}>{optionLabel(query.studyMode)}</option>
            ) : null}
            {studyModes.map((value) => (
              <option key={value} value={value}>
                {optionLabel(value)}
              </option>
            ))}
          </select>
          <SelectChevron />
        </Field>

        <Field title="Specialization" icon={<IconCap className="h-4 w-4" />}>
          <select
            name="specialization"
            defaultValue={query.specialization || ""}
            aria-label="Specialization"
            className={FIELD}
          >
            <option value="">Any specialization</option>
            {query.specialization && !specializations.some((item) => item.id === query.specialization) ? (
              <option value={query.specialization}>{query.specialization}</option>
            ) : null}
            {specializations.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <SelectChevron />
        </Field>

        <Field title="World Rank" icon={<IconGlobe className="h-4 w-4" />}>
          <input
            name="worldRank"
            type="number"
            min={1}
            step={1}
            defaultValue={query.worldRank || ""}
            placeholder="Enter rank"
            aria-label="University world rank"
            className={FIELD}
          />
        </Field>

        <Field title="Session" icon={<IconCalendar className="h-4 w-4" />}>
          <select name="session" defaultValue={query.session || ""} aria-label="Session" className={FIELD}>
            <option value="">Any session</option>
            {query.session && !sessions.some((item) => item.id === query.session) ? (
              <option value={query.session}>{query.session}</option>
            ) : null}
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.name}
              </option>
            ))}
          </select>
          <SelectChevron />
        </Field>
      </div>

      <div className="border-t border-[#EFE8FA] px-4 py-3.5">
        {error ? <p className="mb-2 text-[12px] text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(90deg,#440F76_0%,#7A178F_48%,#EC168C_100%)] text-[13.5px] font-semibold text-white shadow-[0_10px_24px_rgba(68,15,118,0.22)] transition hover:brightness-[1.04] hover:shadow-[0_14px_28px_rgba(236,22,140,0.22)] disabled:opacity-70"
        >
          <IconFilter className="h-4 w-4" />
          {pending ? "Applying…" : "Apply Filters"}
          <IconArrow className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#E9DDF8] bg-white text-[13.5px] font-semibold text-[#440F76] shadow-[0_4px_14px_rgba(68,15,118,0.06)]"
        >
          <IconFilter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <form
        key={courseFilterSearch(query)}
        onSubmit={apply}
        className="hidden overflow-hidden rounded-[18px] border border-[#E9DDF8] bg-white shadow-[0_8px_28px_rgba(68,15,118,0.06)] lg:sticky lg:top-24 lg:block"
      >
        <div className="flex items-center justify-between border-b border-[#EFE8FA] px-4 py-3.5">
          <h2 className="text-[15px] font-bold text-[#1B1238]">Filters</h2>
          <button
            type="button"
            onClick={reset}
            className="text-[12.5px] font-semibold text-[#EC168C] transition hover:text-[#C90083]"
          >
            Reset
          </button>
        </div>
        {fields}
      </form>

      {open ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-[#1B1238]/45"
            onClick={() => setOpen(false)}
          />
          <form
            key={`${courseFilterSearch(query)}-mobile`}
            onSubmit={apply}
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[22px] border border-[#E9DDF8] bg-white shadow-[0_-12px_40px_rgba(27,18,56,0.18)]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EFE8FA] bg-white px-4 py-3">
              <p className="text-[15px] font-bold text-[#1B1238]">Filters</p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="text-[12.5px] font-semibold text-[#EC168C]"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[12.5px] font-semibold text-[#777493]"
                >
                  Close
                </button>
              </div>
            </div>
            {fields}
          </form>
        </div>
      ) : null}
    </>
  );
}
