"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  CourseContentTable,
  CourseDetail,
  CourseFaq,
} from "@/lib/courseDiscovery";

const NAV_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Key Features" },
  { id: "eligibility", label: "Eligibility" },
  { id: "curriculum", label: "Curriculum" },
  { id: "careers", label: "Career Opportunities" },
  { id: "faqs", label: "FAQs" },
] as const;

const FEATURE_META = [
  { title: "Flexible Learning", match: /flexib|online mode|anytime/i },
  { title: "Industry-Relevant Curriculum", match: /curriculum|subject|programming|market/i },
  { title: "Recognised Credential", match: /ugc|aicte|deb|approv|recogn/i },
  { title: "Career Progression", match: /career|professional|industr|skill/i },
] as const;

function tableValue(
  row: CourseContentTable["rows"][number],
  preferredKeys: string[] = ["Details", "Value", "Description"]
) {
  for (const key of preferredKeys) {
    if (row.content?.[key]) return row.content[key];
  }
  const values = Object.values(row.content || {}).filter(Boolean);
  return values[values.length - 1] || row.label || "";
}

function findSnapshotValue(tables: CourseContentTable[], labels: string[]) {
  for (const table of tables) {
    for (const row of table.rows || []) {
      const hay = `${row.label} ${Object.values(row.content || {}).join(" ")}`.toLowerCase();
      if (labels.some((label) => hay.includes(label.toLowerCase()))) {
        return tableValue(row);
      }
    }
  }
  return "";
}

function paragraphByTitle(course: CourseDetail, matchers: string[]) {
  return course.paragraphs.find((p) =>
    matchers.some((m) => p.title?.toLowerCase().includes(m.toLowerCase()))
  );
}

function splitLines(text = "") {
  return text
    .split(/\n+/)
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter((line) => line.length > 2);
}

function splitCareerRoles(text = "") {
  return splitLines(text)
    .flatMap((line) => line.split(/,\s*/))
    .map((item) => item.replace(/^\d+\.\s*/, "").replace(/^[-•]\s*/, "").trim())
    .filter((item) => item && !/more\.?$/i.test(item) && item.length < 70)
    .slice(0, 10);
}

function shortProgramLabel(course: CourseDetail) {
  if (course.code) return `Online ${course.code}`;
  const match = course.name.match(/\(([^)]+)\)/);
  if (match?.[1]) return `Online ${match[1]}`;
  return course.name.split(" ").slice(0, 3).join(" ");
}

function levelBadge(level = "") {
  if (/under|ug|bachelor/i.test(level)) return "UG Program";
  if (/post|pg|master/i.test(level)) return "PG Program";
  return level || "Program";
}

function DiamondIcon({ className = "h-2.5 w-2.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden fill="currentColor">
      <path d="M6 1.2 10.8 6 6 10.8 1.2 6 6 1.2Z" />
    </svg>
  );
}

function HighlightIcon({ type }: { type: "degree" | "duration" | "mode" | "recognition" }) {
  const common = "h-5 w-5 shrink-0 text-[#1e3a5f]";
  if (type === "duration") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 8v4.2l2.8 1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "mode") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <rect x="3.5" y="5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 19h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "recognition") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
        <path d="M4 9.2 12 5.5l8 3.7-8 3.7L4 9.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M7 12.2v3.8c0 .8 2.2 2.2 5 2.2s5-1.4 5-2.2v-3.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden>
      <path d="M7 4.5h7.2L17 7.3V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V6A1.5 1.5 0 0 1 7 4.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 4.8V7.5h2.8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function OverviewRowIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  const cls = "h-4 w-4 text-[#1e3a5f]";
  if (/duration|year/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 8v4.2l2.8 1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (/fee|tuition|inr/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path d="M7 7h8a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12 4v16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (/eligib/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="m8.5 12 2.3 2.3L15.5 9.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (/mode|learn|online/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <rect x="3.5" y="5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 19h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (/career|recruit/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 8V6.8A1.8 1.8 0 0 1 10.8 5h2.4A1.8 1.8 0 0 1 15 6.8V8" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (/level|under|post/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path d="M5 17V9.5L12 6l7 3.5V17" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9.5 17v-4h5v4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (/approv|recogn|ugc/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path d="M12 3.5 19 6.2v5c0 4-2.8 7.3-7 8.3-4.2-1-7-4.3-7-8.3v-5L12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
      <path d="M4 8.8 12 5l8 3.8-8 3.8L4 8.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M6.8 11.2v4.2c0 .8 2.2 2.2 5.2 2.2s5.2-1.4 5.2-2.2v-4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function firstSentence(text = "") {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const match = cleaned.match(/^(.{40,}?[.!?])\s/);
  return match?.[1] || cleaned.slice(0, 150);
}

function FaqAccordion({ faqs }: { faqs: CourseFaq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  if (!faqs.length) return null;

  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition hover:bg-[var(--surface)]/70"
              onClick={() => setOpenId(open ? null : faq.id)}
              aria-expanded={open}
            >
              <span className="text-[15px] font-semibold leading-6 text-navy">
                {faq.question.replace(/^Q\d+\.\s*/i, "")}
              </span>
              <span
                className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-brand transition duration-300 ${open ? "rotate-45" : ""}`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-10 text-sm leading-7 text-muted whitespace-pre-wrap">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CourseProgramPage({ course }: { course: CourseDetail }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [showAllCurriculum, setShowAllCurriculum] = useState(false);

  const aboutParagraph = paragraphByTitle(course, ["about"]);
  const featuresParagraph = paragraphByTitle(course, ["key feature", "feature"]);
  const eligibilityParagraph = paragraphByTitle(course, ["eligibility"]);

  const about =
    aboutParagraph?.content
    || course.overview
    || course.description
    || `${course.name} is a career-focused programme designed to help learners build skills for the modern workplace.`;

  const heroLead =
    firstSentence(about)
    || "A flexible, industry-aligned pathway designed for learners who want recognised credentials and practical outcomes.";

  const duration = findSnapshotValue(course.tables, ["duration"]) || "Flexible duration";
  const mode =
    findSnapshotValue(course.tables, ["learning mode", "mode"])
    || course.studyMode
    || course.attendanceMode
    || "Online";
  const recognition =
    findSnapshotValue(course.tables, ["recognition", "approvals", "ugc"])
    || "UGC / AICTE recognised pathways";

  const languages = (course.language || "")
    .split(/[,/|]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const overviewTable =
    course.tables.find((t) => /overview|glance/i.test(t.title))
    || course.tables[0];
  const curriculumTable =
    course.tables.find((t) => /curriculum|semester|syllabus/i.test(t.title))
    || course.tables.find((t) => t.id !== overviewTable?.id);

  const careersText =
    findSnapshotValue(course.tables, ["career prospect", "career"])
    || course.careerOpportunities
    || course.faqs.find((f) => /career/i.test(f.question))?.answer
    || "";

  const careerOptions = useMemo(() => {
    const roles = splitCareerRoles(careersText);
    return roles.length
      ? roles
      : [
          "Software Developer",
          "Web Developer",
          "Data Analyst",
          "System Analyst",
          "Database Administrator",
          "IT Consultant",
        ];
  }, [careersText]);

  const featureCards = useMemo(() => {
    const lines = splitLines(featuresParagraph?.content || "");
    return FEATURE_META.map((meta, index) => ({
      title: meta.title,
      text:
        lines.find((line) => meta.match.test(line))
        || lines[index]
        || "Built for working professionals and freshers seeking practical, career-ready skills.",
    }));
  }, [featuresParagraph?.content]);

  const curriculumRows = curriculumTable?.rows || [];
  const visibleCurriculum = showAllCurriculum
    ? curriculumRows
    : curriculumRows.slice(0, 8);

  const breadcrumbLabel = shortProgramLabel(course);
  const displayTitle = course.code && !course.name.includes(`(${course.code})`)
    ? `${course.name} (${course.code})`
    : course.name;
  const aboutParas = splitLines(about);
  const degreeLabel = /under|ug|bachelor/i.test(course.level || course.degree || "")
    ? "UG Degree"
    : (course.degree || course.level || "Degree");
  const modeLabel = /online/i.test(mode) ? "Online Learning" : mode;
  const modeBadge = /online/i.test(mode) ? "Online Mode" : mode;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <main id="main" className="bg-white text-navy">
      {/* Banner — matches design mock */}
      <section className="relative overflow-hidden bg-[#f7f9fc]">
        <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rounded-full bg-[#dbe7ff]/70 blur-2xl" />
        <div className="pointer-events-none absolute right-40 top-40 h-56 w-56 rounded-full bg-[#e8ddff]/60 blur-2xl" />
        <div className="pointer-events-none absolute bottom-10 right-[28%] h-40 w-40 rounded-full bg-[#cfe0ff]/50 blur-xl" />

        <div className="era-shell relative pt-4 sm:pt-5">
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#1e3a5f]">Home</Link>
            <span aria-hidden>›</span>
            <Link href="/programs" className="transition hover:text-[#1e3a5f]">Courses</Link>
            <span aria-hidden>›</span>
            <span className="font-medium text-[#1e3a5f]">{breadcrumbLabel}</span>
          </nav>

          <div className="grid items-center gap-10 pb-12 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-16 lg:pt-10">
            {/* Left content */}
            <div className="era-reveal max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eef3f8] px-3.5 py-1.5 text-[12px] font-semibold text-[#1e3a5f]">
                <span className="inline-flex items-center gap-1.5">
                  <DiamondIcon className="h-2.5 w-2.5 text-teal-500" />
                  {levelBadge(course.level)}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
                <span>{modeBadge}</span>
              </div>

              <h1 className="mt-5 text-[2rem] font-extrabold tracking-[-0.04em] text-[#12263f] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                {displayTitle}
              </h1>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-500 sm:text-base">
                {heroLead}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {(languages.length ? languages : ["English"]).map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1ff] px-3.5 py-1.5 text-[12px] font-semibold text-[#2f5fad]"
                  >
                    <DiamondIcon className="h-2 w-2 text-[#3b82f6]" />
                    {lang}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium text-[#1e3a5f]">
                <span className="inline-flex items-center gap-2">
                  <HighlightIcon type="degree" />
                  {degreeLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <HighlightIcon type="duration" />
                  {duration}
                </span>
                <span className="inline-flex items-center gap-2">
                  <HighlightIcon type="mode" />
                  {modeLabel}
                </span>
                <span className="inline-flex items-center gap-2">
                  <HighlightIcon type="recognition" />
                  <span className="max-w-[220px] truncate sm:max-w-none">{recognition}</span>
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tools/course-finder"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#12263f] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(18,38,63,0.22)] transition hover:-translate-y-0.5 hover:bg-[#1a3354]"
                >
                  Apply Now
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href="#overview"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#c9d2de] bg-white px-6 text-sm font-bold text-[#12263f] transition hover:border-[#12263f]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M12 4v10m0 0 3.5-3.5M12 14l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 18h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Download Brochure
                </a>
              </div>
            </div>

            {/* Right visual */}
            <div className="era-reveal relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "100ms" }}>
              <div className="pointer-events-none absolute -right-6 top-8 hidden h-64 w-64 rounded-[40%] bg-[#d9e6ff]/80 blur-xl lg:block" />
              <div className="pointer-events-none absolute right-10 top-0 hidden h-48 w-48 rounded-[45%] bg-[#e6dbff]/70 blur-xl lg:block" />

              <p
                className="pointer-events-none absolute right-2 top-6 hidden rotate-[-12deg] text-[13px] font-medium tracking-wide text-slate-300 lg:block"
                style={{ writingMode: "vertical-rl", fontFamily: "Georgia, 'Times New Roman', serif" }}
                aria-hidden
              >
                Learn Today Lead Tomorrow
              </p>

              <div className="relative mx-auto aspect-[4/5] max-w-[420px] overflow-hidden rounded-[2rem] lg:ml-auto lg:mr-4">
                <Image
                  src="/hero/slide-2.png"
                  alt={`${course.name} student learning online`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
              </div>

              <div className="absolute left-0 top-10 hidden w-[190px] rounded-2xl bg-white p-3.5 shadow-[0_14px_40px_rgba(18,38,63,0.12)] sm:block lg:-left-2">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M4 12a8 8 0 1 0 16 0" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-[#12263f]">Flexible Learning</p>
                <p className="mt-0.5 text-[12px] text-slate-500">Study Anytime, Anywhere</p>
              </div>

              <div className="absolute bottom-16 right-0 hidden w-[200px] rounded-2xl bg-white p-3.5 shadow-[0_14px_40px_rgba(18,38,63,0.12)] sm:block lg:right-0">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M12 3.5 19 6.2v5c0 4-2.8 7.3-7 8.3-4.2-1-7-4.3-7-8.3v-5L12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <path d="m9.2 11.8 1.9 1.9 3.7-3.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-[#12263f]">Build Your Tech Career</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky nav + Overview section matching design */}
      <section className="bg-[#f7f9fc] pb-14 pt-6 lg:pb-16 lg:pt-8">
        <div className="era-shell">
          <nav
            className="sticky top-3 z-30 overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-[#eef3f8]/95 px-2 py-1 shadow-[0_8px_24px_rgba(18,38,63,0.04)] backdrop-blur-md"
            aria-label="Programme sections"
          >
            <div className="flex min-w-max gap-1">
              {NAV_LINKS.map((link) => {
                const active = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`relative shrink-0 px-4 py-3 text-sm font-medium transition ${
                      active ? "font-semibold text-[#12263f]" : "text-slate-500 hover:text-[#12263f]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3 bottom-1 h-[2px] origin-left rounded-full bg-[#12263f] transition duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </nav>

          <div id="overview" className="scroll-mt-28 mt-10 grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-start lg:gap-10">
            {/* Left: About + Overview table */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[#12263f] sm:text-[1.85rem]">
                  {aboutParagraph?.title || `About ${breadcrumbLabel}`}
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-600">
                  {aboutParas.length > 1 ? (
                    aboutParas.slice(0, 2).map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))
                  ) : (
                    <p className="whitespace-pre-wrap">{about}</p>
                  )}
                </div>
              </div>

              {overviewTable?.rows?.length ? (
                <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_10px_30px_rgba(18,38,63,0.04)]">
                  <div className="border-b border-[#eef2f6] px-5 py-4 sm:px-6">
                    <h3 className="text-lg font-extrabold text-[#12263f] sm:text-xl">
                      {overviewTable.title}
                    </h3>
                  </div>
                  <table className="min-w-full text-sm">
                    <tbody>
                      {overviewTable.rows.map((row, index) => (
                        <tr
                          key={row.id}
                          className={index % 2 === 1 ? "bg-[#f3f7fb]" : "bg-white"}
                        >
                          <th
                            scope="row"
                            className="w-[42%] px-4 py-3.5 text-left font-semibold text-[#12263f] sm:px-5"
                          >
                            <span className="inline-flex items-center gap-2.5">
                              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8eef6]">
                                <OverviewRowIcon label={row.label} />
                              </span>
                              {row.label}
                            </span>
                          </th>
                          <td className="px-4 py-3.5 text-slate-600 sm:px-5">
                            {tableValue(row)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>

            {/* Right sidebar cards */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-2xl bg-[#e8f1ff] p-6 shadow-[0_10px_28px_rgba(18,38,63,0.05)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2f6fed] text-white shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
                    <path d="M4 9 12 5.5 20 9l-8 3.5L4 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M7 11.5v4c0 .9 2.2 2.3 5 2.3s5-1.4 5-2.3v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-extrabold text-[#12263f]">Get Free Counselling</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Talk to our experts and get guidance on admissions, eligibility and fees.
                </p>
                <Link
                  href="/tools/course-finder"
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#12263f] px-5 text-sm font-bold text-white transition hover:bg-[#1a3354]"
                >
                  Book a Free Call
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#eef3f8] shadow-[0_10px_28px_rgba(18,38,63,0.05)]">
                <div className="px-6 pt-6">
                  <h3 className="max-w-[16ch] text-xl font-extrabold leading-snug tracking-[-0.02em] text-[#12263f]">
                    Turn Your Passion for Technology into a Bright Career
                  </h3>
                </div>
                <div className="relative mt-4 px-4">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
                    <Image
                      src="/hero/slide-1.png"
                      alt="Student preparing for a technology career"
                      fill
                      className="object-cover object-top"
                      sizes="360px"
                    />
                  </div>
                </div>
                <div className="p-4 pt-3">
                  <ul className="space-y-3 rounded-xl bg-white p-4 text-sm font-medium text-[#12263f] shadow-sm">
                    {[
                      "Industry Relevant Curriculum",
                      "Learn from Anywhere",
                      "Career Support & Guidance",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
                            <path d="m7 12.5 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 border-b border-[var(--line)] bg-white">
        <div className="era-shell py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.18em] text-brand uppercase">Why this programme</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-navy sm:text-[2.1rem]">
              {featuresParagraph?.title || "Key Features"}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-muted">
              Designed for clarity, flexibility and career outcomes — without unnecessary complexity.
            </p>
          </div>

          <div className="mt-10 grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((card, index) => (
              <article
                key={card.title}
                className="group bg-white p-6 transition duration-300 hover:bg-[var(--surface)] sm:p-7"
              >
                <p className="text-[11px] font-bold tracking-[0.16em] text-brand/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-base font-bold text-navy">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted line-clamp-5">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      {(eligibilityParagraph?.content || course.eligibility) && (
        <section id="eligibility" className="scroll-mt-24 border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="era-shell grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] text-brand uppercase">Admission</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-navy sm:text-[2.1rem]">
                {eligibilityParagraph?.title || "Eligibility Criteria"}
              </h2>
            </div>
            <div className="border border-[var(--line)] bg-white p-7 sm:p-9">
              <p className="text-[15px] leading-7 text-muted whitespace-pre-wrap">
                {eligibilityParagraph?.content || course.eligibility}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Curriculum */}
      {curriculumRows.length > 0 && (
        <section id="curriculum" className="scroll-mt-24 border-b border-[var(--line)] bg-white">
          <div className="era-shell py-16 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold tracking-[0.18em] text-brand uppercase">Curriculum</p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-navy sm:text-[2.1rem]">
                  {curriculumTable?.title || "Programme Structure"}
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-muted">
                  A structured learning path covering foundational and advanced computer application subjects.
                </p>
              </div>
              {curriculumRows.length > 8 && (
                <button
                  type="button"
                  onClick={() => setShowAllCurriculum((v) => !v)}
                  className="inline-flex min-h-11 items-center justify-center border border-[var(--line)] bg-white px-5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
                >
                  {showAllCurriculum ? "Show less" : "View full curriculum"}
                </button>
              )}
            </div>

            <ol className="mt-10 grid gap-3 md:grid-cols-2">
              {visibleCurriculum.map((row, index) => (
                <li
                  key={row.id}
                  className="flex items-start gap-4 border border-[var(--line)] bg-[var(--surface)]/40 px-5 py-4 transition duration-300 hover:border-brand/30 hover:bg-white"
                >
                  <span className="mt-0.5 text-xs font-bold tracking-wide text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy">
                      {row.label || `Module ${index + 1}`}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">{tableValue(row)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Careers */}
      <section id="careers" className="scroll-mt-24 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="era-shell grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-brand uppercase">Outcomes</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-navy sm:text-[2.1rem]">
              Career Opportunities
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
              Graduates of {breadcrumbLabel} can pursue roles across software, analytics, infrastructure and digital services.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {careerOptions.map((role) => (
                <li
                  key={role}
                  className="flex items-center gap-3 border border-[var(--line)] bg-white px-4 py-3 text-sm font-medium text-navy"
                >
                  <span className="h-1.5 w-1.5 shrink-0 bg-brand" aria-hidden />
                  <span className="truncate">{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/hero/slide-3.png"
              alt="Career pathways after programme completion"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-sm font-semibold">Build a future-ready technology profile</p>
              <p className="mt-1 text-xs leading-5 text-white/80">
                Skills aligned with hiring needs across leading industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {course.faqs.length > 0 && (
        <section id="faqs" className="scroll-mt-24 border-b border-[var(--line)] bg-white">
          <div className="era-shell grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] text-brand uppercase">Support</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-navy sm:text-[2.1rem]">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-muted">
                Clear answers to help you decide with confidence.
              </p>
            </div>
            <FaqAccordion faqs={course.faqs} />
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="bg-[var(--surface)] py-16 lg:py-20">
        <div className="era-shell">
          <div className="relative overflow-hidden bg-navy px-7 py-12 text-white sm:px-12 lg:px-16 lg:py-16">
            <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-brand/30 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
            <div className="relative max-w-2xl">
              <p className="text-[11px] font-bold tracking-[0.18em] text-white/55 uppercase">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-[2.25rem]">
                Start your journey with expert guidance
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-white/75">
                Compare universities, understand fees, and apply to {breadcrumbLabel} with AdmissionEra counselling support.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tools/course-finder"
                  className="inline-flex min-h-12 items-center justify-center bg-white px-6 text-sm font-semibold text-navy transition hover:bg-brand-soft"
                >
                  Apply Now
                </Link>
                <Link
                  href="/tools/course-finder"
                  className="inline-flex min-h-12 items-center justify-center border border-white/25 px-6 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
