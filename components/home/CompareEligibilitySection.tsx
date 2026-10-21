"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";

type CellValue = string | boolean;

const COLLEGES = ["College A", "College B", "College C"];

const SAMPLE_ROWS: { feature: string; values: [CellValue, CellValue, CellValue] }[] = [
  { feature: "Fees", values: ["₹1.2L", "₹1.5L", "₹1.0L"] },
  { feature: "Duration", values: ["3 Years", "3 Years", "3 Years"] },
  { feature: "Location", values: ["Delhi", "Noida", "Gurgaon"] },
  { feature: "Placement", values: ["85%", "82%", "79%"] },
  { feature: "Entrance Exam", values: ["No", "Yes", "No"] },
  { feature: "Scholarship", values: [true, true, false] },
];

const QUALIFICATIONS = ["12th", "Diploma", "Graduation", "Post Graduation"];
const COURSES = ["BCA", "B.Tech", "BBA", "B.Com", "MBA", "BA"];
const LOCATIONS = ["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "Any city"];

type Result = {
  title: string;
  subtitle: string;
  tone: "success" | "warning";
  checks: { label: string; ok: boolean }[];
};

function evaluate(score: number): Result {
  const eligible = score >= 50;
  const strong = score >= 75;
  return {
    title: eligible ? "Eligible" : "Needs Review",
    subtitle: strong
      ? "You're a strong match!"
      : eligible
        ? "You're a good match!"
        : "Talk to an expert first.",
    tone: eligible ? "success" : "warning",
    checks: [
      { label: "Meets basic eligibility", ok: eligible },
      { label: "Matches your preference", ok: true },
      { label: "Good admission chances", ok: strong },
    ],
  };
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#F20D70] transition-transform group-hover:translate-x-0.5" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function renderCell(value: CellValue) {
  if (value === true) {
    return (
      <>
        <CheckIcon className="mx-auto h-4 w-4 text-[#16A34A]" />
        <span className="sr-only">Yes</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <CrossIcon className="mx-auto h-4 w-4 text-[#EF4444]" />
        <span className="sr-only">No</span>
      </>
    );
  }
  return value;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-[12.5px] font-bold text-[#1B1446]">
      {label}
      <span className="relative mt-1.5 block">{children}</span>
    </label>
  );
}

function SelectChevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#1B1446]"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const fieldClass =
  "h-[38px] w-full appearance-none rounded-lg border border-[#ECE6F3] bg-white px-3 pr-8 text-[13px] font-medium text-[#1B1446] shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition focus:border-[#2A0B5C] focus:ring-2 focus:ring-[#2A0B5C]/10";

const primaryButtonClass =
  "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2A0B5C] text-[13.5px] font-semibold text-white transition hover:bg-[#3B1380] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A0B5C]";

export function CompareEligibilitySection() {
  const [qualification, setQualification] = useState(QUALIFICATIONS[0]);
  const [course, setCourse] = useState(COURSES[0]);
  const [percentage, setPercentage] = useState("78");
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result>(() => evaluate(78));

  const onCheck = (event: FormEvent) => {
    event.preventDefault();
    const score = Number(percentage);
    if (!qualification || !course || !location || percentage.trim() === "") {
      setError("Choose a qualification, course and location, and enter your percentage.");
      return;
    }
    if (!Number.isFinite(score) || score < 0 || score > 100) {
      setError("Enter a percentage between 0 and 100.");
      return;
    }
    setError("");
    setResult(evaluate(score));
  };

  const success = result.tone === "success";

  return (
    <section className="py-8 lg:py-10" aria-labelledby="compare-heading">
      <div className="era-shell grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col">
          <h2 id="compare-heading" className="text-[22px] font-extrabold tracking-tight text-[#1B1446] sm:text-2xl">
            Compare Colleges
          </h2>
          <p className="mt-0.5 text-[13px] text-[#667085]">Don&apos;t choose blindly, Compare before you apply.</p>

          <div className="mt-3 flex flex-1 flex-col rounded-2xl">
            <div className="overflow-x-auto rounded-lg border border-[#E6E1F7] bg-white">
              <table className="w-full min-w-[420px] border-collapse text-[12.5px]">
                <thead>
                  <tr className="bg-[#EFECFB] text-[#1B1446]">
                    <th scope="col" className="px-3 py-2.5 text-left font-bold">Feature</th>
                    {COLLEGES.map((college) => (
                      <th key={college} scope="col" className="border-l border-[#E6E1F7] px-3 py-2.5 text-center font-bold">
                        {college}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_ROWS.map((row) => (
                    <tr key={row.feature} className="border-t border-[#EEEBF8]">
                      <th scope="row" className="px-3 py-2 text-left font-medium text-[#344054]">
                        {row.feature}
                      </th>
                      {row.values.map((value, index) => (
                        <td
                          key={`${row.feature}-${COLLEGES[index]}`}
                          className="border-l border-[#EEEBF8] px-3 py-2 text-center text-[#344054]"
                        >
                          {renderCell(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link href="/compare" className={`${primaryButtonClass} mt-3`}>
              Compare Colleges
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div id="eligibility-checker" className="flex flex-col">
          <h2 className="text-[22px] font-extrabold tracking-tight text-[#1B1446] sm:text-2xl">
            Admission Eligibility Checker
          </h2>
          <p className="mt-0.5 text-[13px] text-[#667085]">Check your eligibility in seconds.</p>

          <form
            onSubmit={onCheck}
            noValidate
            className="mt-3 flex flex-1 flex-col rounded-lg border border-[#FBE1EA] bg-gradient-to-br from-[#FFF5F8] to-[#FDEBF2] p-3 sm:p-4"
          >
            <div className="grid flex-1 gap-3 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] sm:gap-4">
              <div className="space-y-2.5">
                <Field label="Your Qualification">
                  <select className={fieldClass} value={qualification} onChange={(event) => setQualification(event.target.value)}>
                    {QUALIFICATIONS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <SelectChevron />
                </Field>
                <Field label="Select Course">
                  <select className={fieldClass} value={course} onChange={(event) => setCourse(event.target.value)}>
                    {COURSES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <SelectChevron />
                </Field>
                <Field label="Percentage">
                  <input
                    inputMode="decimal"
                    className={fieldClass}
                    placeholder="e.g. 78"
                    value={percentage}
                    onChange={(event) => setPercentage(event.target.value)}
                    aria-invalid={Boolean(error)}
                  />
                </Field>
                <Field label="Preferred Location">
                  <select className={fieldClass} value={location} onChange={(event) => setLocation(event.target.value)}>
                    {LOCATIONS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <SelectChevron />
                </Field>
              </div>

              <div
                className="flex flex-col items-center justify-center rounded-xl bg-white px-4 py-5 text-center shadow-[0_6px_18px_rgba(242,13,112,0.08)]"
                aria-live="polite"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-white ${
                    success ? "bg-[#16A34A]" : "bg-[#F59E0B]"
                  }`}
                >
                  {success ? (
                    <CheckIcon className="h-6 w-6" />
                  ) : (
                    <span className="text-2xl font-extrabold leading-none" aria-hidden>!</span>
                  )}
                </span>
                <p className={`mt-2 text-[22px] font-extrabold leading-tight ${success ? "text-[#16A34A]" : "text-[#D97706]"}`}>
                  {result.title}
                </p>
                <p className={`text-[12.5px] font-medium ${success ? "text-[#16A34A]" : "text-[#B45309]"}`}>
                  {result.subtitle}
                </p>
                <ul className="mt-3.5 space-y-2 self-stretch text-left">
                  {result.checks.map((check) => (
                    <li key={check.label} className="flex items-center gap-2 text-[12.5px] text-[#344054]">
                      {check.ok ? (
                        <CheckIcon className="h-4 w-4 shrink-0 text-[#16A34A]" />
                      ) : (
                        <CrossIcon className="h-4 w-4 shrink-0 text-[#EF4444]" />
                      )}
                      <span>
                        <span className="sr-only">{check.ok ? "Yes: " : "No: "}</span>
                        {check.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {error ? (
              <p className="mt-3 text-[12.5px] font-medium text-[#B42318]" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className={`${primaryButtonClass} mt-3`}>
              Check Eligibility
              <ArrowIcon />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
