"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const SAMPLE_ROWS = [
  { feature: "Fees", values: ["₹1.2L – ₹2.4L", "₹1.8L – ₹3.1L", "₹95K – ₹1.6L"] },
  { feature: "Duration", values: ["3 Years", "4 Years", "2 Years"] },
  { feature: "Location", values: ["Delhi", "Noida", "Pune"] },
  { feature: "Placement", values: ["Sample", "Sample", "Sample"] },
  { feature: "Entrance Exam", values: ["CUET", "University test", "Merit"] },
  { feature: "Scholarship", values: ["Merit", "Need based", "Merit"] },
];

const QUALIFICATIONS = ["12th", "Diploma", "Graduation", "Post Graduation"];
const COURSES = ["B.Tech", "BBA", "B.Com", "MBA", "BCA", "BA"];
const LOCATIONS = ["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "Any city"];

type Result = { eligible: boolean; message: string } | null;

export function CompareEligibilitySection() {
  const [qualification, setQualification] = useState("");
  const [course, setCourse] = useState("");
  const [percentage, setPercentage] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result>(null);

  const onCheck = (event: FormEvent) => {
    event.preventDefault();
    const score = Number(percentage);
    if (!qualification || !course || !location || percentage.trim() === "") {
      setResult(null);
      setError("Choose a qualification, course and location, and enter your percentage.");
      return;
    }
    if (!Number.isFinite(score) || score < 0 || score > 100) {
      setResult(null);
      setError("Enter a percentage between 0 and 100.");
      return;
    }
    setError("");
    const eligible = score >= 50;
    setResult({
      eligible,
      message: eligible
        ? `A ${score}% ${qualification} profile can be considered for ${course} options around ${location}. This is a preliminary check, not an admission offer.`
        : `A ${score}% score is below the 50% sample threshold used for this check. Talk to a counsellor before ruling ${course} out.`,
    });
  };

  const fieldClass =
    "h-10 w-full rounded-lg border border-[#EFE6F5] bg-[#FBF9FD] px-3 text-[13px] text-[#35066F] outline-none focus:border-[#35066F] focus:bg-white";

  return (
    <section className="bg-white py-8 lg:py-10" aria-labelledby="compare-heading">
      <div className="era-shell grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#F1ECFF] bg-white p-4 shadow-[0_8px_24px_rgba(53,6,111,0.04)] sm:p-5">
          <h2 id="compare-heading" className="text-lg font-extrabold text-[#35066F]">
            Compare Colleges
          </h2>
          <p className="mt-1 text-[13px] text-[#6B6280]">
            Sample comparison only. Open the compare page to shortlist real universities.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-[12.5px]">
              <thead>
                <tr className="text-[#6B6280]">
                  <th className="pb-2 font-semibold">Feature</th>
                  <th className="pb-2 font-semibold">College A</th>
                  <th className="pb-2 font-semibold">College B</th>
                  <th className="pb-2 font-semibold">College C</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_ROWS.map((row) => (
                  <tr key={row.feature} className="border-t border-[#F4EEF8]">
                    <th className="py-2 font-semibold text-[#35066F]">{row.feature}</th>
                    {row.values.map((value, index) => (
                      <td key={`${row.feature}-${index}`} className="py-2 text-[#3D3550]">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/compare"
            className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#35066F] text-[13px] font-semibold text-white transition hover:bg-[#4A0A96]"
          >
            Compare Colleges
          </Link>
        </div>

        <div id="eligibility-checker" className="rounded-2xl border border-[#F1ECFF] bg-white p-4 shadow-[0_8px_24px_rgba(53,6,111,0.04)] sm:p-5">
          <h2 className="text-lg font-extrabold text-[#35066F]">Admission Eligibility Checker</h2>
          <p className="mt-1 text-[13px] text-[#6B6280]">
            A first-pass check from the details you enter. It does not confirm a seat.
          </p>
          <form onSubmit={onCheck} className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="text-[12px] font-semibold text-[#35066F]">
              Your qualification
              <select className={`${fieldClass} mt-1`} value={qualification} onChange={(event) => setQualification(event.target.value)}>
                <option value="">Select</option>
                {QUALIFICATIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-[12px] font-semibold text-[#35066F]">
              Course
              <select className={`${fieldClass} mt-1`} value={course} onChange={(event) => setCourse(event.target.value)}>
                <option value="">Select course</option>
                {COURSES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-[12px] font-semibold text-[#35066F]">
              Percentage
              <input
                inputMode="decimal"
                className={`${fieldClass} mt-1`}
                placeholder="e.g. 78"
                value={percentage}
                onChange={(event) => setPercentage(event.target.value)}
              />
            </label>
            <label className="text-[12px] font-semibold text-[#35066F]">
              Preferred location
              <select className={`${fieldClass} mt-1`} value={location} onChange={(event) => setLocation(event.target.value)}>
                <option value="">Select location</option>
                {LOCATIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#F20D70] text-[13px] font-semibold text-white transition hover:bg-[#D40B62] sm:col-span-2"
            >
              Check Eligibility
            </button>
          </form>
          {error ? <p className="mt-3 text-[13px] text-[#B42318]">{error}</p> : null}
          {result ? (
            <div className={`mt-3 rounded-xl px-3 py-3 text-[13px] ${result.eligible ? "bg-[#ECFDF3] text-[#067647]" : "bg-[#FFF6ED] text-[#B54708]"}`}>
              <p className="font-bold">{result.eligible ? "You may be eligible" : "Needs a closer look"}</p>
              <p className="mt-1 leading-5">{result.message}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
