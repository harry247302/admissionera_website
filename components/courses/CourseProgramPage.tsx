"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  CourseContentTable,
  CourseDetail,
} from "@/lib/courseDiscovery";
import { resolveMediaUrl } from "@/lib/universities";
import {
  ContentRenderer,
  FAQAccordion,
} from "@/components/courses/CourseContentBlocks";

const NAV_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "specializations", label: "Specializations" },
  { id: "features", label: "Key Features" },
  { id: "eligibility", label: "Eligibility" },
  { id: "curriculum", label: "Curriculum" },
  { id: "careers", label: "Career Opportunities" },
  { id: "faqs", label: "FAQs" },
] as const;

const FEATURE_META = [
  { title: "Flexible Learning", tone: "bg-[#e8f1ff] text-[#2f6fed]", match: /flexib|online mode|anytime/i },
  { title: "Industry-Relevant Curriculum", tone: "bg-[#e7f7f4] text-[#1aa58a]", match: /curriculum|subject|programming|market/i },
  { title: "Recognised Degree", tone: "bg-[#f3e8ff] text-[#7c3aed]", match: /ugc|aicte|deb|approv|recogn/i },
  { title: "Career Growth", tone: "bg-[#fff1e8] text-[#ea580c]", match: /career|professional|industr|skill/i },
] as const;

const specIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function SparkleIcon() {
  return (
    <svg {...specIconProps} className="h-3.5 w-3.5">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5l2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg {...specIconProps} className="h-3.5 w-3.5">
      <path d="M12 3c2.5 3 4.5 5.4 4.5 8.6A4.5 4.5 0 0 1 12 16a4.5 4.5 0 0 1-4.5-4.4c0-1.6.7-2.9 1.7-4 .2 1.4 1 2.4 2 2.9C11 8.3 11.3 5.6 12 3Z" />
      <path d="M8 18.5c1 1.6 2.4 2.5 4 2.5s3-.9 4-2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...specIconProps} className="h-4 w-4 text-[#430f74]">
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16M9 3v4M15 3v4" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg {...specIconProps} className="h-4 w-4 text-[#430f74]">
      <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.8 15.8a4.8 4.8 0 0 1 6.4 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

const SPEC_BENEFITS = [
  {
    label: "UGC Recognized",
    icon: (
      <svg {...specIconProps} className="h-5 w-5">
        <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
        <path d="M7 11.5V16c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-4.5M21 9.5V14" />
      </svg>
    ),
  },
  {
    label: "Comprehensive Curriculum",
    icon: (
      <svg {...specIconProps} className="h-5 w-5">
        <path d="M12 6.5C10.5 5.3 8.5 4.8 4 5v13c4.5-.2 6.5.3 8 1.5M12 6.5c1.5-1.2 3.5-1.7 8-1.5v13c-4.5-.2-6.5.3-8 1.5M12 6.5v13" />
      </svg>
    ),
  },
  {
    label: "Career Opportunities",
    icon: (
      <svg {...specIconProps} className="h-5 w-5">
        <path d="M6 19v-5M12 19V9M18 19V5" />
      </svg>
    ),
  },
  {
    label: "Flexible Learning",
    icon: (
      <svg {...specIconProps} className="h-5 w-5">
        <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />
      </svg>
    ),
  },
];

function stripTags(value?: string | null) {
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

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

/** Column headers from row.content keys, preferring Key Features then Details. */
function getTableColumns(rows: CourseContentTable["rows"] = []) {
  const set = new Set<string>();
  rows.forEach((row) => {
    Object.keys(row.content || {}).forEach((key) => set.add(key));
  });
  const cols = [...set];
  cols.sort((a, b) => {
    const rank = (key: string) =>
      (/key\s*feature/i.test(key) ? 0 : /detail/i.test(key) ? 1 : 2);
    return rank(a) - rank(b) || a.localeCompare(b);
  });
  return cols.length ? cols : ["Key Features", "Details"];
}

function cellValue(
  row: CourseContentTable["rows"][number],
  column: string
) {
  const fromContent = row.content?.[column];
  if (fromContent != null && String(fromContent).trim() !== "") {
    return String(fromContent);
  }
  if (/key\s*feature/i.test(column)) return row.label || "—";
  return tableValue(row) || "—";
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

export function CourseProgramPage({ course }: { course: CourseDetail }) {
  // console.log("course", course);
  const [activeSection, setActiveSection] = useState("overview");
  const [showAllCurriculum, setShowAllCurriculum] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
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
          "Network Administrator",
          "Cyber Security Analyst",
        ];
  }, [careersText]);

  const featureCards = useMemo(() => {
    const lines = splitLines(featuresParagraph?.content || "");
    return FEATURE_META.map((meta, index) => ({
      title: meta.title,
      tone: meta.tone,
      text:
        lines.find((line) => meta.match.test(line))
        || lines[index]
        || "Built for working professionals and freshers seeking practical, career-ready skills.",
    }));
  }, [featuresParagraph?.content]);

  const curriculumRows = [...(curriculumTable?.rows || [])].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );
  const visibleCurriculum = showAllCurriculum
    ? curriculumRows
    : curriculumRows.slice(0, 10);

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
  const heroBanner = resolveMediaUrl(course.banner) || "/hero/slide-2.png";
  const heroHighlights = [
    {
      title: "Flexible Learning",
      text: "Study anytime, anywhere",
      tone: "teal",
    },
    {
      title: "Industry Relevant Curriculum",
      text: "Updated as per industry trends",
      tone: "rose",
    },
    {
      title: "Build Your Tech Career",
      text: "With endless opportunities",
      tone: "violet",
    },
  ] as const;
  const activeFaqs = course.faqs.filter((faq) => faq?.is_active === true || faq?.is_active == null);
  const specializations = course.specializations ?? [];
  const navLinks = NAV_LINKS.filter(
    (link) => link.id !== "specializations" || specializations.length > 0
  );

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
      <section className="relative overflow-hidden bg-[#eef5ff]">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <Image
            src={heroBanner}
            alt=""
            fill
            priority
            unoptimized={heroBanner.startsWith("http")}
            className="object-cover object-[68%_18%]"
            sizes="62vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#eef5ff] via-[#eef5ff]/70 to-[#eef5ff]/10" />
        </div>
        <div className="pointer-events-none absolute -right-16 top-16 hidden h-72 w-72 rounded-full bg-[#d7e6ff]/80 blur-3xl lg:block" />
        <div className="pointer-events-none absolute right-[22%] bottom-10 hidden h-48 w-48 rounded-full bg-[#e4d9ff]/70 blur-2xl lg:block" />

        <div className="era-shell relative pt-4 sm:pt-5">
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="transition hover:text-[#1e3a5f]">Home</Link>
            <span aria-hidden>›</span>
            <Link href="/programs" className="transition hover:text-[#1e3a5f]">Courses</Link>
            <span aria-hidden>›</span>
            <span className="font-medium text-[#1e3a5f]">{breadcrumbLabel}</span>
          </nav>

          <div className="relative pb-10 pt-8 lg:grid lg:grid-cols-[minmax(0,1.15fr)_260px] lg:items-center lg:gap-10 lg:pb-12 lg:pt-10">
            <div className="era-reveal max-w-2xl">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[12px] font-semibold text-[#1e3a5f] shadow-sm ring-1 ring-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <DiamondIcon className="h-2.5 w-2.5 text-teal-500" />
                  {levelBadge(course.level)}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
                <span>{modeBadge}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
                <span className="max-w-[220px] truncate sm:max-w-none">{recognition}</span>
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

            <aside 
            // className="relative z-10 mt-8 hidden w-full flex-col gap-3 justify-self-end lg:mt-0 lg:flex"
            >
              <p
                className="pointer-events-none absolute  font-medium tracking-wide text-slate-400"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                aria-hidden
              >
                Learn<br />Today<br />Lead<br />Tomorrow
              </p>
              {heroHighlights.map((item) => (
                <article
                  key={item.title}
                  className=""
                >
                  <div className={` inline-flex items-center justify-center rounded-xl ${
                    item.tone === "teal"
                      ? "bg-teal-50 text-teal-600"
                      : item.tone === "rose"
                        ? "bg-rose-50 text-rose-500"
                        : "bg-violet-50 text-violet-600"
                  }`}>
                    {item.tone === "teal" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                        <path d="M4 12a8 8 0 1 0 16 0" stroke="currentColor" strokeWidth="1.7" />
                        <path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    ) : item.tone === "rose" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                        <rect x="5" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
                        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M4 16.5 9 11l4 3.5 7-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm font-bold text-[#12263f]">{item.title}</p>
                  <p className="mt-0.5 text-[12px] text-slate-500">{item.text}</p>
                </article>
              ))}
            </aside>
          </div>

          <nav
            className="sticky top-3 z-30 overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-white/90 px-2 py-1 shadow-[0_8px_24px_rgba(18,38,63,0.06)] backdrop-blur-md"
            aria-label="Programme sections"
          >
            <div className="flex min-w-max gap-1">
              {navLinks.map((link) => {
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
        </div>
      </section>

      <section className="bg-[#f7f9fc] pb-14 pt-6 lg:pb-16 lg:pt-8">
        <div className="era-shell">
          <div id="overview" className="scroll-mt-28 grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-start lg:gap-10">
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
            </div>

            {/* Right sidebar cards */}
            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[1.6rem] bg-[#eaf2ff] p-5 shadow-[0_10px_28px_rgba(18,38,63,0.05)] sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dce9ff] text-[#2f6fed]">
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
                      <circle cx="9" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.7" />
                      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M4.5 17.5c.8-2.6 2.4-3.9 4.5-3.9s3.7 1.3 4.5 3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      <path d="M14 14.2c1.4-.4 2.7-.2 4.2 1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-extrabold leading-snug text-[#12263f]">Get Free Counselling</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Talk to our experts and get guidance on admissions, eligibility and fees.
                    </p>
                  </div>
                </div>
                <Link
                  href="/tools/course-finder"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#12263f] px-5 text-sm font-bold text-white transition hover:bg-[#1a3354]"
                >
                  Book a Free Call
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="relative min-h-[325px] overflow-hidden rounded-[18px] bg-[#EAF3FF] pb-[208px] sm:min-h-[340px] sm:pb-[200px]">
                <div className="absolute right-0 top-0 z-[1] h-[190px] w-[150px] sm:h-[210px] sm:w-[170px] lg:h-[220px] lg:w-[180px]">
                  <Image
                    src="/hero/boy.png"
                    alt="Student preparing for a technology career"
                    fill
                    sizes="180px"
                    className="object-contain object-right-top"
                  />
                </div>

                <div className="relative z-10 px-5 pt-5">
                  <h3 className="max-w-[145px] text-[18px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#12263f] sm:text-[20px] lg:text-[21px]">
                    Turn Your Passion for Technology into a Bright Career
                  </h3>
                  <span className="mt-3 block h-[3px] w-8 rounded-full bg-[#2f6fed]" aria-hidden />
                </div>

                <div className="absolute inset-x-4 bottom-4 z-20 rounded-[16px] bg-white p-3.5 shadow-[0_8px_22px_rgba(18,38,63,0.08)]">
                  <ul className="space-y-3 text-[13px] font-bold leading-5 text-[#12263f] sm:text-sm sm:leading-5">
                    {[
                      { label: "Industry Relevant Curriculum", icon: "monitor" },
                      { label: "Learn from Anywhere", icon: "pin" },
                      { label: "Career Support & Guidance", icon: "support" },
                      { label: "Access to Updated Resources", icon: "people" },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7F7F4] text-[#1AA58A]">
                          {item.icon === "monitor" ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                              <rect x="4" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
                              <path d="M8 19h8M12 16v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                            </svg>
                          ) : item.icon === "pin" ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                              <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" stroke="currentColor" strokeWidth="1.7" />
                              <circle cx="12" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.7" />
                            </svg>
                          ) : item.icon === "support" ? (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                              <path d="M8 12.5 10.2 9l2.3 3 2.2-4 3.3 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4 16.5h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                              <circle cx="9" cy="8.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
                              <circle cx="16" cy="9.2" r="1.8" stroke="currentColor" strokeWidth="1.7" />
                              <path d="M4.8 17c.7-2.3 2.2-3.4 4.2-3.4s3.5 1.1 4.2 3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                            </svg>
                          )}
                        </span>
                        <span className="min-w-0 pt-1.5">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {specializations.length > 0 ? (
        <section id="specializations" className="scroll-mt-28 bg-white  py-10 lg:py-12">
          <div className="era-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#430f74] to-[#5B1A91] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_8px_20px_rgba(67,15,116,0.25)]">
                  <SparkleIcon />
                  Specializations
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-[#111827] sm:text-[2rem] sm:leading-tight">
                  Choose Your Specialization in{" "}
                  <span className="bg-gradient-to-r from-[#430f74] to-[#7c3aed] bg-clip-text text-transparent">
                    {breadcrumbLabel}
                  </span>
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#64748B] sm:text-base">
                  Explore specializations designed to match your interests and career goals.
                </p>
              </div>
              <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#E4D5F5] bg-white px-4 py-2 text-sm font-semibold text-[#111827] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" aria-hidden />
                {specializations.length}{" "}
                {specializations.length === 1 ? "Specialization" : "Specializations"} available
              </span>
            </div>

            <div className="mt-6 grid w-full max-w-[800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {specializations.map((spec, index) => {
                const detailHref = `/courses/${encodeURIComponent(course.slug || course.id)}/${encodeURIComponent(
                  spec.slug || spec.uuid
                )}`;
                // const description =
                //   stripTags(spec.description)
                //   || `Build a strong foundation in ${breadcrumbLabel} and develop versatile skills for multiple career opportunities.`;
                return (
                  <article
                    key={spec.slug}
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E4D5F5] bg-gradient-to-br from-white via-white to-[#F5EEFC] p-4 shadow-[0_10px_28px_rgba(67,15,116,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(67,15,116,0.14)]"
                  >
                    <span
                      className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-[#430f74] to-[#7c3aed] opacity-90"
                      aria-hidden
                    />

                    <div className="relative flex items-start justify-between gap-2">
                      {spec.shortName ? (
                        <span className="inline-flex rounded-full bg-[#F5EEFC] px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#430f74] ring-1 ring-[#E4D5F5]">
                          {spec.shortName}
                        </span>
                      ) : <span />}
                      {index === 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-[#430f74] shadow-sm ring-1 ring-[#E4D5F5]">
                          <FlameIcon />
                          Most Popular
                        </span>
                      ) : null}
                    </div>

                    <h3 className="relative mt-3 max-w-[85%] break-words text-base font-extrabold sm:text-lg leading-snug tracking-[-0.02em] text-[#111827]">
                      {spec.name}
                    </h3>
                    {/* <p className="relative mt-1.5 line-clamp-2 text-[13px] leading-5 text-[#64748B]">
                      {description}
                    </p> */}

                    <div className="relative mb-4 mt-3 flex flex-wrap gap-1.5 text-xs font-medium text-[#111827]">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4D5F5] bg-white px-2.5 py-1">
                        <CalendarIcon />
                        {duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4D5F5] bg-white px-2.5 py-1">
                        <WifiIcon />
                        {modeBadge}
                      </span>
                    </div>

                    

                    <Link
                      href={detailHref}
                      aria-label={`View more about ${spec.name}`}
                      className="relative mt-auto inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#430f74] to-[#5B1A91] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(67,15,116,0.25)] transition duration-200 hover:-translate-y-0.5 hover:from-[#5B1A91] hover:to-[#6d28d9] hover:shadow-[0_12px_26px_rgba(67,15,116,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#430f74] focus-visible:ring-offset-2"
                    >
                      View More
                      <span aria-hidden>→</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Paragraphs: title + content only */}
      {course.paragraphs?.length > 0 ? (
        <section className="bg-white py-12 lg:py-16">
          <div className="era-shell space-y-12 lg:space-y-14">
            {course.paragraphs
              .filter((p) => !/about/i.test(p.title || ""))
              .map((paragraph) => {
                const title = paragraph.title || "";
                const sectionId = /key feature|feature/i.test(title)
                  ? "features"
                  : /eligib/i.test(title)
                    ? "eligibility"
                    : /career/i.test(title)
                      ? "careers"
                      : undefined;

                return (
                  <article
                    key={paragraph.id}
                    id={sectionId}
                    className={sectionId ? "scroll-mt-28" : undefined}
                  >
                    <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[#12263f] sm:text-[1.85rem]">
                      {paragraph.title}
                    </h2>
                    <div className="mt-4 max-w-4xl">
                      <ContentRenderer content={paragraph.content} />
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      ) : null}


      {/* Content tables: Key Features | Details columns */}
      {course.tables?.length > 0 ? (
        <section className="bg-[#f7f9fc] py-12 lg:py-16">
          <div className="era-shell space-y-10">
            {course.tables.map((table, tableIndex) => {
              const rows = [...(table.rows || [])].sort(
                (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
              );
              if (!rows.length) return null;

              const columns = getTableColumns(rows);
              const sectionId =
                tableIndex === 0
                  ? "overview"
                  : /curriculum|semester|syllabus/i.test(table.title || "")
                    ? "curriculum"
                    : undefined;

              return (
                <div
                  key={table.id}
                  id={sectionId}
                  className={sectionId ? "scroll-mt-28" : undefined}
                >
                  <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[#12263f] sm:text-[1.85rem]">
                    {table.title}
                  </h2>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_10px_30px_rgba(18,38,63,0.04)]">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-[#f3f7fb] text-left">
                            {columns.map((column) => (
                              <th
                                key={column}
                                className="px-4 py-3.5 font-bold text-[#12263f] sm:px-5"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr
                              key={row.id}
                              className={
                                index % 2 === 1 ? "bg-[#f3f7fb]" : "bg-white"
                              }
                            >
                              {columns.map((column, colIndex) => {
                                const value = cellValue(row, column);
                                const isLabelCol =
                                  colIndex === 0 || /key\s*feature/i.test(column);

                                return (
                                  <td
                                    key={column}
                                    className={`px-4 py-3.5 sm:px-5 ${
                                      isLabelCol
                                        ? "font-semibold text-[#12263f]"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    {isLabelCol ? (
                                      <span className="inline-flex items-center gap-2.5">
                                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8eef6]">
                                          <OverviewRowIcon
                                            label={row.label || value}
                                          />
                                        </span>
                                        {value}
                                      </span>
                                    ) : (
                                      value
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
      {/* FAQs */}
      {activeFaqs.length > 0 ? (
        <section id="faqs" className="scroll-mt-28 bg-[#f7f9fc] py-12 lg:py-16">
          <div className="era-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <span className="inline-flex rounded-full bg-[#e8eef6] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2f6fed]">
                Got Questions?
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[#12263f] sm:text-[1.85rem]">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Clear answers about admissions, eligibility, fees and career outcomes for {breadcrumbLabel}.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff] text-lg font-extrabold text-[#2563eb]">
                  {activeFaqs.length}
                </span>
                <p className="text-sm leading-5 text-slate-600">
                  <span className="block font-bold text-[#12263f]">Answered questions</span>
                  Curated by our admission experts
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-[#12263f] p-5 text-white shadow-[0_10px_30px_rgba(18,38,63,0.15)]">
                <h3 className="text-base font-extrabold">Still have questions?</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Talk to a counsellor for personalised guidance — it&apos;s free.
                </p>
                <Link
                  href="/tools/course-finder"
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#12263f] transition hover:bg-slate-100"
                >
                  Talk to an Expert
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </aside>

            <div>
              <FAQAccordion faqs={showAllFaqs ? activeFaqs : activeFaqs.slice(0, 5)} />
              {activeFaqs.length > 5 ? (
                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllFaqs((prev) => !prev)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#c9d2de] bg-white px-6 text-sm font-bold text-[#12263f] transition hover:border-[#12263f]"
                  >
                    {showAllFaqs
                      ? "Show fewer questions"
                      : `View all ${activeFaqs.length} questions`}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 transition-transform ${showAllFaqs ? "rotate-180" : ""}`}
                      fill="none"
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Bottom CTA */}
      <section className="bg-white py-12 lg:py-16">
        <div className="era-shell">
          <div className="relative overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-[#eaf2ff] px-7 py-12 sm:px-12 lg:px-16 lg:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(47,111,237,0.08) 18px, rgba(47,111,237,0.08) 19px)",
              }}
              aria-hidden
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h2 className="max-w-xl text-2xl font-extrabold tracking-[-0.03em] text-[#12263f] sm:text-[2rem]">
                  Start Your Journey Towards a Successful Career
                </h2>
                <p className="mt-3 max-w-lg text-[15px] leading-7 text-slate-600">
                  Get free counselling, compare universities, and apply to {breadcrumbLabel} with expert support.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/tools/course-finder"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#12263f] px-6 text-sm font-bold text-white transition hover:bg-[#1a3354]"
                  >
                    Apply Now
                    <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href="/tools/course-finder"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#c9d2de] bg-white px-6 text-sm font-bold text-[#12263f] transition hover:border-[#12263f]"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                      <path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M8 10V8a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M4 11h2v3H4zM18 11h2v3h-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                    Talk to an Expert
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto hidden h-44 w-full max-w-xs lg:block">
                <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] border border-[#e2e8f0] bg-white">
                  <Image
                    src="/hero/slide-1.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                </div>
                <p
                  className="pointer-events-none absolute -right-2 bottom-3 text-sm font-medium text-[#64748b]"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  aria-hidden
                >
                  Your Future Awaits
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
