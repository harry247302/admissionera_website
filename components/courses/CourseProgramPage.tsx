"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CourseDetail, CourseContentTable } from "@/lib/courseDiscovery";
import { resolveMediaUrl } from "@/lib/universities";

// ─── Color tokens ─────────────────────────────────────────────────────────────
const C = {
  primary: "#94143C",
  dark: "#4A1028",
  light: "#FFF5F7",
  border: "#EAE5E8",
  text: "#171421",
  muted: "#6B6578",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function stripTags(v?: string | null) {
  return String(v || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitLines(text = "") {
  return text
    .split(/\n+/)
    .map((l) => l.replace(/^\d+\.\s*/, "").replace(/^[-•*]\s*/, "").trim())
    .filter((l) => l.length > 2);
}

function splitCareerRoles(text = "") {
  return splitLines(text)
    .flatMap((l) => l.split(/,\s*/))
    .map((s) => s.trim())
    .filter((s) => s && !/more\.?$/i.test(s) && s.length < 70)
    .slice(0, 10);
}

function firstSentence(text = "") {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const m = clean.match(/^(.{40,}?[.!?])\s/);
  return m?.[1] || clean.slice(0, 180);
}

function findTableValue(tables: CourseContentTable[], labels: string[]) {
  for (const t of tables) {
    for (const row of t.rows || []) {
      const hay = `${row.label} ${Object.values(row.content || {}).join(" ")}`.toLowerCase();
      if (labels.some((l) => hay.includes(l.toLowerCase()))) {
        const v = Object.values(row.content || {}).find(Boolean);
        return v || row.label || "";
      }
    }
  }
  return "";
}

function shortLabel(course: CourseDetail) {
  if (course.code) return `Online ${course.code}`;
  const m = course.name.match(/\(([^)]+)\)/);
  if (m?.[1]) return `Online ${m[1]}`;
  return course.name.split(" ").slice(0, 3).join(" ");
}

function parseRichLines(content = "") {
  const norm = String(content).replace(/\r\n/g, "\n").replace(/\\n/g, "\n").trim();
  if (!norm) return [];
  return norm
    .split(/\n+/)
    .map((l) => l.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "").trim())
    .filter((l) => l.length > 2);
}

// ─── Tiny SVG Icons ───────────────────────────────────────────────────────────
const SvgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8 as number,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as true,
};

function Ico({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg {...SvgProps} className={className}>
      <path d={d} />
    </svg>
  );
}

function CheckCircleIco({ className = "h-5 w-5" }) {
  return (
    <svg {...SvgProps} className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.3 2.3L15.5 9.5" />
    </svg>
  );
}

function ChevronDown({ className = "h-4 w-4" }) {
  return <Ico d="m6 9 6 6 6-6" className={className} />;
}

// ─── NAV config ───────────────────────────────────────────────────────────────
const NAV_TABS = [
  { id: "overview", label: "Overview", icon: "M4 6h16M4 12h16M4 18h7" },
  { id: "eligibility", label: "Eligibility", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016Z" },
  { id: "curriculum", label: "Curriculum", icon: "M12 6.253v13m0-13c-2.493-1.046-5-1.5-7-1.5v13c2 0 4.5.454 7 1.5m0-13c2.493-1.046 5-1.5 7-1.5v13c-2 0-4.5.454-7 1.5" },
  { id: "careers", label: "Career Opportunities", icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" },
  { id: "faqs", label: "FAQ", icon: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" },
] as const;

const ADMISSION_STEPS = [
  { num: "01", label: "Check Eligibility", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016Z" },
  { num: "02", label: "Fill Online Application", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" },
  { num: "03", label: "Document Verification", icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" },
  { num: "04", label: "Pay Application Fee", icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" },
  { num: "05", label: "Get Enrollment Number", icon: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" },
];

const FEATURE_CARDS = [
  { title: "Flexible Learning", sub: "Study anytime, anywhere at your own pace", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" },
  { title: "Industry Relevant Curriculum", sub: "Updated as per latest industry trends", icon: "M12 6.253v13m0-13c-2.493-1.046-5-1.5-7-1.5v13c2 0 4.5.454 7 1.5m0-13c2.493-1.046 5-1.5 7-1.5v13c-2 0-4.5.454-7 1.5" },
  { title: "Learn from Expert Faculty", sub: "Guidance from industry practitioners", icon: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" },
  { title: "Career Support", sub: "Dedicated placement & mentoring support", icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" },
];

const CAREER_ICONS = [
  "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3",
  "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z",
  "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
  "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z",
  "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
  "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
  "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z",
  "M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-[1.3rem] font-extrabold tracking-tight text-[#171421] sm:text-2xl">
      <span
        className="inline-block h-6 w-1 shrink-0 rounded-full"
        style={{ background: C.primary }}
        aria-hidden
      />
      {children}
    </h2>
  );
}

function PrimaryBtn({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:opacity-90 ${className}`}
      style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.dark})` }}
    >
      {children}
    </Link>
  );
}

function GhostBtn({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border bg-white px-6 text-sm font-bold transition hover:border-current ${className}`}
      style={{ borderColor: C.border, color: C.text }}
    >
      {children}
    </Link>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function CourseHero({ course, duration, mode }: { course: CourseDetail; duration: string; mode: string }) {
  const banner = resolveMediaUrl(course.banner) || "/hero/slide-2.png";
  const about = course.overview || course.description || "";
  const lead = firstSentence(stripTags(about)) || "A flexible, industry-aligned programme designed for learners seeking recognised credentials and practical outcomes.";
  const langs = (course.language || "English").split(/[,/|]+/).map((s) => s.trim()).filter(Boolean);
  const displayTitle = course.code && !course.name.includes(`(${course.code})`)
    ? course.name.replace(new RegExp(`\\(${course.code}\\)`), "").trim()
    : course.name;
  const codeHighlight = course.code ? `(${course.code})` : "";

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.primary} 60%, #c0244f 100%)` }}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-10"
        style={{ background: "white" }} aria-hidden />
      <div className="pointer-events-none absolute -bottom-16 right-[30%] h-48 w-48 rounded-full opacity-10"
        style={{ background: "white" }} aria-hidden />

      <div className="era-shell relative py-8 lg:py-10">
        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-[13px] text-white/70" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/programs" className="transition hover:text-white">Courses</Link>
          <span aria-hidden>›</span>
          <span className="font-semibold text-white">{shortLabel(course)}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-10">
          {/* Left content */}
          <div>
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
              Online Degree
            </span>

            <h1 className="text-[2rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
              {displayTitle}{" "}
              {codeHighlight && (
                <span style={{ color: "#fbbf24" }}>{codeHighlight}</span>
              )}
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/80">{lead}</p>

            {/* Info row */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-medium text-white/90">
              <span className="inline-flex items-center gap-2">
                <Ico d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" className="h-4 w-4 text-white/70" />
                {course.degree || "Undergraduate Degree"}
              </span>
              <span className="inline-flex items-center gap-2">
                <Ico d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" className="h-4 w-4 text-white/70" />
                100% {mode || "Online"}
              </span>
              <span className="inline-flex items-center gap-2">
                <Ico d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" className="h-4 w-4 text-white/70" />
                {duration || "Flexible Duration"}
              </span>
              <span className="inline-flex items-center gap-2">
                <Ico d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.1-1.533.284-2.253" className="h-4 w-4 text-white/70" />
                {langs.join(", ")}
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tools/course-finder"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold transition hover:-translate-y-0.5"
                style={{ color: C.primary }}
              >
                Apply Now →
              </Link>
              <Link
                href="/tools/course-finder"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Ico d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" className="h-4 w-4" />
                Download Brochure
              </Link>
            </div>
          </div>

          {/* Right: banner image */}
          <div className="relative hidden overflow-hidden rounded-[1.5rem] lg:block" style={{ height: 360 }}>
            <Image
              src={banner}
              alt={course.name}
              fill
              priority
              sizes="420px"
              className="object-cover object-top"
              unoptimized={banner.startsWith("http")}
            />
            {/* Floating badge */}
            <div
              className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold text-white shadow-lg backdrop-blur-sm"
              style={{ background: "rgba(74,16,40,0.85)" }}
            >
              <span className="text-[20px]">&lt;/&gt;</span>
              Technology
            </div>
            {/* Overlay gradient at bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-24"
              style={{ background: `linear-gradient(to top, ${C.dark}, transparent)` }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Course Navigation Tabs ───────────────────────────────────────────────────
function CourseNavigation({ activeSection }: { activeSection: string }) {
  return (
    <nav
      className="sticky top-0 z-30 w-full border-b bg-white shadow-sm"
      style={{ borderColor: C.border }}
      aria-label="Course sections"
    >
      <div className="era-shell">
        <div className="flex overflow-x-auto">
          {NAV_TABS.map((tab) => {
            const active = activeSection === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="relative flex shrink-0 items-center gap-2 px-5 py-4 text-sm font-semibold transition"
                style={{
                  color: active ? C.primary : C.muted,
                  background: active ? C.light : "transparent",
                  borderBottom: active ? `2px solid ${C.primary}` : "2px solid transparent",
                }}
              >
                <svg {...SvgProps} className="h-4 w-4">
                  <path d={tab.icon} />
                </svg>
                {tab.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ─── Enquiry form ─────────────────────────────────────────────────────────────
function AdmissionForm({ courseName }: { courseName: string }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", university: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1200);
  }

  return (
    <div
      className="rounded-2xl p-5 shadow-[0_8px_30px_rgba(148,20,60,0.12)] sm:p-6"
      style={{ background: `linear-gradient(160deg, ${C.dark} 0%, ${C.primary} 100%)` }}
    >
      <h3 className="text-base font-extrabold text-white">Apply for {shortLabel({ name: courseName, code: "" } as CourseDetail)}</h3>
      <p className="mt-1 text-[13px] text-white/70">Fill in your details and get admission guidance from our experts.</p>

      {status === "success" ? (
        <div className="mt-5 rounded-xl bg-white/10 p-5 text-center">
          <CheckCircleIco className="mx-auto h-10 w-10 text-green-300" />
          <p className="mt-3 font-bold text-white">Thank you! We&apos;ll reach out soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
          {/* Name */}
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <Ico d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" className="h-4 w-4 text-white/50" />
            </span>
            <input
              name="name"
              type="text"
              required
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-white/50 focus:border-white/60 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white/70">
              +91
            </span>
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                <Ico d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" className="h-4 w-4 text-white/50" />
              </span>
              <input
                name="phone"
                type="tel"
                placeholder="Enter Mobile Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-white/50 focus:border-white/60 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <Ico d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" className="h-4 w-4 text-white/50" />
            </span>
            <input
              name="email"
              type="email"
              placeholder="Enter Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-white/50 focus:border-white/60 focus:outline-none"
            />
          </div>

          {/* University select */}
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <Ico d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" className="h-4 w-4 text-white/50" />
            </span>
            <select
              name="university"
              value={form.university}
              onChange={handleChange}
              className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-8 text-sm text-white/80 focus:border-white/60 focus:outline-none"
            >
              <option value="" className="text-black">Select University</option>
              <option value="any" className="text-black">Any University</option>
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
              <ChevronDown className="h-4 w-4 text-white/50" />
            </span>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 w-full rounded-xl bg-white py-3 text-sm font-extrabold transition hover:opacity-90 disabled:opacity-60"
            style={{ color: C.primary }}
          >
            {status === "loading" ? "Submitting…" : "Apply Now →"}
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Course Highlights sidebar ────────────────────────────────────────────────
function CourseHighlights({ course, duration, feeLabel }: { course: CourseDetail; duration: string; feeLabel: string }) {
  const rows = [
    { label: "Degree", value: course.degree || "—", icon: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" },
    { label: "Level", value: course.level || "—", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" },
    { label: "Study Mode", value: course.studyMode || course.attendanceMode || "Online", icon: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" },
    { label: "Duration", value: duration || "—", icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
    { label: "Language", value: course.language || "English", icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.1-1.533.284-2.253" },
    { label: "Average Fee", value: feeLabel || "—", icon: "M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
    { label: "Department", value: course.department || "—", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" },
  ];

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: C.border, background: C.light }}>
      <h3 className="mb-4 text-base font-extrabold" style={{ color: C.text }}>
        Course Highlights
      </h3>
      <ul className="space-y-3">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-3 text-sm">
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${C.primary}18`, color: C.primary }}
            >
              <Ico d={row.icon} className="h-4 w-4" />
            </span>
            <span className="font-medium" style={{ color: C.muted, minWidth: 90 }}>{row.label}</span>
            <span className="ml-auto font-semibold" style={{ color: C.text }}>{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Career Opportunities sidebar ────────────────────────────────────────────
function CareerSidebar({ roles }: { roles: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? roles : roles.slice(0, 8);

  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: C.border }}>
      <h3 className="mb-4 text-base font-extrabold" style={{ color: C.text }}>Career Opportunities</h3>
      <div className="grid grid-cols-2 gap-2">
        {visible.map((role, i) => (
          <div
            key={role}
            className="flex items-center gap-2.5 rounded-xl p-2.5 text-[13px] font-semibold"
            style={{ background: C.light, color: C.text }}
          >
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${C.primary}18`, color: C.primary }}
            >
              <Ico d={CAREER_ICONS[i % CAREER_ICONS.length]} className="h-4 w-4" />
            </span>
            <span className="line-clamp-2 leading-tight">{role}</span>
          </div>
        ))}
      </div>
      {roles.length > 8 ? (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="mt-4 w-full text-sm font-bold transition hover:underline"
          style={{ color: C.primary }}
        >
          {showAll ? "Show less ↑" : `View More Opportunities →`}
        </button>
      ) : null}
    </div>
  );
}

// ─── FAQ Accordion (burgundy theme) ──────────────────────────────────────────
function BurgundyFAQ({ faqs }: { faqs: CourseDetail["faqs"] }) {
  const active = faqs.filter((f) => f?.is_active !== false);
  const [openId, setOpenId] = useState<string | null>(active[0]?.id ?? null);
  if (!active.length) return null;

  return (
    <div className="space-y-3">
      {active.map((faq, idx) => {
        const open = openId === faq.id;
        return (
          <article
            key={faq.id}
            className="overflow-hidden rounded-2xl border transition"
            style={{ borderColor: open ? C.primary : C.border, background: "white" }}
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenId(open ? null : faq.id)}
              aria-expanded={open}
            >
              <span className="text-[15px] font-semibold leading-6" style={{ color: C.text }}>
                <span className="mr-1.5 font-bold" style={{ color: C.primary }}>Q{idx + 1}.</span>
                {faq.question.replace(/^Q\d+\.\s*/i, "")}
              </span>
              <span
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-bold transition"
                style={{
                  background: open ? C.primary : C.light,
                  color: open ? "white" : C.primary,
                }}
              >
                {open ? "−" : "+"}
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pr-12 text-[14px] leading-7" style={{ color: C.muted }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// ─── Curriculum table with semester tabs ─────────────────────────────────────
function CurriculumSection({ tables }: { tables: CourseContentTable[] }) {
  const curriculum = tables.filter(
    (t) => /curriculum|semester|syllabus|subject/i.test(t.title) && t.rows?.length
  );
  if (!curriculum.length) return null;

  const [activeIdx, setActiveIdx] = useState(0);
  const active = curriculum[activeIdx];
  const rows = [...(active?.rows || [])].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  // Try to get column keys
  const cols = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => Object.keys(r.content || {}).forEach((k) => set.add(k)));
    return [...set].length ? [...set] : ["Subject / Course", "Type"];
  }, [rows]);

  return (
    <div id="curriculum" className="scroll-mt-28">
      <SectionHeading>Comprehensive Curriculum of the {shortLabel({ name: active?.title || "Course", code: "" } as CourseDetail)}</SectionHeading>

      {/* Semester tabs */}
      {curriculum.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {curriculum.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className="rounded-lg px-4 py-2 text-sm font-semibold transition"
              style={{
                background: i === activeIdx ? C.primary : C.light,
                color: i === activeIdx ? "white" : C.text,
                border: `1px solid ${i === activeIdx ? C.primary : C.border}`,
              }}
            >
              {t.title || `Semester ${i + 1}`}
            </button>
          ))}
        </div>
      )}
      {curriculum.length === 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {/* show individual semesters extracted from rows if any */}
        </div>
      )}

      <div className="mt-5 overflow-hidden rounded-2xl border" style={{ borderColor: C.border }}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr style={{ background: C.primary }}>
                <th className="px-4 py-3 text-left font-bold text-white">S. No.</th>
                {cols.map((col) => (
                  <th key={col} className="px-4 py-3 text-left font-bold text-white">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={row.id}
                  style={{ background: idx % 2 === 0 ? "white" : C.light }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: C.muted }}>{idx + 1}</td>
                  {cols.map((col) => {
                    const val = row.content?.[col] ?? (col === cols[0] ? row.label : "—");
                    return (
                      <td key={col} className="px-4 py-3" style={{ color: C.text }}>
                        {val || "—"}
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
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function CourseProgramPage({ course }: { course: CourseDetail }) {
  const [activeSection, setActiveSection] = useState("overview");

  // Derived values
  const duration = findTableValue(course.tables, ["duration"]) || "Flexible";
  const mode = course.studyMode || course.attendanceMode || findTableValue(course.tables, ["mode"]) || "Online";
  const feeLabel = findTableValue(course.tables, ["fee", "tuition"]) || "Contact for fee details";

  const careersText = course.careerOpportunities || findTableValue(course.tables, ["career"]) || "";
  const careerRoles = useMemo(() => {
    const r = splitCareerRoles(careersText);
    return r.length
      ? r
      : ["Software Developer", "System Analyst", "Database Administrator", "Web Developer",
        "Mobile App Developer", "IT Consultant", "Business Analyst", "Cyber Security Analyst"];
  }, [careersText]);

  const activeFaqs = course.faqs.filter((f) => f?.is_active !== false);

  // About paragraph
  const aboutPara = course.paragraphs.find((p) => /about/i.test(p.title || ""));
  const aboutText = aboutPara?.content || course.overview || course.description || "";
  const aboutLines = parseRichLines(aboutText);

  // Eligibility paragraph
  const eligPara = course.paragraphs.find((p) => /eligib/i.test(p.title || ""));
  const eligText = eligPara?.content || course.eligibility || "";
  const eligLines = parseRichLines(eligText);

  // Overview paragraphs (non-about, non-eligibility)
  const contentParas = course.paragraphs.filter(
    (p) => !/about/i.test(p.title || "") && !/eligib/i.test(p.title || "")
  );

  // Intersection observer for active section
  useEffect(() => {
    const ids = NAV_TABS.map((t) => t.id);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main id="main" style={{ background: "#F9F9FB", color: C.text }}>
      {/* ── Hero ── */}
      <CourseHero course={course} duration={duration} mode={mode} />

      {/* ── Course Navigation ── */}
      <CourseNavigation activeSection={activeSection} />

      {/* ── Main two-column layout ── */}
      <div className="era-shell py-8 lg:py-10">
        <div className="grid gap-7 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">

          {/* ════════ LEFT COLUMN ════════ */}
          <div className="space-y-10 min-w-0">

            {/* About + Overview */}
            <section id="overview" className="scroll-mt-28">
              <div
                className="rounded-2xl border bg-white p-6"
                style={{ borderColor: C.border }}
              >
                <SectionHeading>About {shortLabel(course)}</SectionHeading>
                <div className="mt-4 space-y-3 text-[15px] leading-7" style={{ color: C.muted }}>
                  {aboutLines.length
                    ? aboutLines.map((l, i) => <p key={i}>{l}</p>)
                    : <p>{aboutText || "Details coming soon."}</p>
                  }
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <div className="rounded-2xl border bg-white p-6" style={{ borderColor: C.border }}>
                <SectionHeading>Key Features of {shortLabel(course)}</SectionHeading>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {FEATURE_CARDS.map((f) => (
                    <div
                      key={f.title}
                      className="flex flex-col items-center rounded-2xl p-4 text-center transition hover:shadow-md"
                      style={{ background: C.light }}
                    >
                      <span
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ background: `${C.primary}18`, color: C.primary }}
                      >
                        <Ico d={f.icon} className="h-5 w-5" />
                      </span>
                      <p className="mt-3 text-[13px] font-bold leading-tight" style={{ color: C.text }}>{f.title}</p>
                    </div>
                  ))}
                </div>

                {/* Info cards: Duration / Fee / Mode */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { label: "Duration", value: duration, sub: "", icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
                    { label: "Average Course Fee", value: feeLabel, sub: "(Depending on University)", icon: "M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" },
                    { label: "Study Mode", value: mode, sub: "(Learn from Anywhere)", icon: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="flex flex-col items-center rounded-2xl p-4 text-center"
                      style={{ background: C.light, border: `1px solid ${C.border}` }}
                    >
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: `${C.primary}18`, color: C.primary }}
                      >
                        <Ico d={card.icon} className="h-5 w-5" />
                      </span>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.muted }}>{card.label}</p>
                      <p className="mt-1 text-sm font-extrabold" style={{ color: C.text }}>{card.value}</p>
                      {card.sub && <p className="text-[11px]" style={{ color: C.muted }}>{card.sub}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Eligibility */}
            <section id="eligibility" className="scroll-mt-28">
              <div className="rounded-2xl border bg-white p-6" style={{ borderColor: C.border }}>
                <SectionHeading>Eligibility Criteria</SectionHeading>
                {eligLines.length ? (
                  <ul className="mt-5 space-y-3">
                    {eligLines.map((line, i) => (
                      <li key={i} className="flex items-start gap-3 text-[14px]" style={{ color: C.muted }}>
                        <span
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ background: C.primary, color: "white" }}
                        >
                          <svg {...SvgProps} className="h-3 w-3">
                            <path d="m5 12 4 4 7-8" />
                          </svg>
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-[14px]" style={{ color: C.muted }}>
                    {eligText || "Eligibility details will be listed here."}
                  </p>
                )}
              </div>
            </section>

            {/* Admission Process */}
            <section>
              <div className="rounded-2xl border bg-white p-6" style={{ borderColor: C.border }}>
                <SectionHeading>Admission Process</SectionHeading>
                <div className="mt-6 grid gap-3 sm:grid-cols-5">
                  {ADMISSION_STEPS.map((step, idx) => (
                    <div key={step.num} className="flex flex-col items-center text-center">
                      <div className="flex items-center gap-0 sm:w-full sm:flex-row">
                        <div
                          className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                          style={{ background: C.primary, color: "white" }}
                        >
                          <Ico d={step.icon} className="h-6 w-6" />
                          <span
                            className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
                            style={{ background: C.dark }}
                          >
                            {step.num}
                          </span>
                        </div>
                        {idx < ADMISSION_STEPS.length - 1 && (
                          <span className="hidden h-px flex-1 sm:block" style={{ background: C.border }} />
                        )}
                      </div>
                      <p className="mt-2.5 text-[12px] font-semibold leading-tight" style={{ color: C.text }}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Curriculum */}
            {course.tables.length > 0 && (
              <section className="rounded-2xl border bg-white p-6" style={{ borderColor: C.border }}>
                <CurriculumSection tables={course.tables} />
              </section>
            )}

            {/* Additional content paragraphs */}
            {contentParas.map((para) => (
              <section key={para.id} className="rounded-2xl border bg-white p-6" style={{ borderColor: C.border }}>
                <SectionHeading>{para.title}</SectionHeading>
                <div className="mt-4 text-[15px] leading-7" style={{ color: C.muted }}>
                  {parseRichLines(para.content).map((l, i) => <p key={i} className="mb-3">{l}</p>)}
                </div>
              </section>
            ))}

            {/* FAQs */}
            {activeFaqs.length > 0 && (
              <section id="faqs" className="scroll-mt-28">
                <div className="rounded-2xl border bg-white p-6" style={{ borderColor: C.border }}>
                  <SectionHeading>Frequently Asked Questions</SectionHeading>
                  <div className="mt-5">
                    <BurgundyFAQ faqs={activeFaqs} />
                  </div>
                </div>
              </section>
            )}

          </div>

          {/* ════════ RIGHT SIDEBAR ════════ */}
          <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
            <AdmissionForm courseName={course.name} />
            <CourseHighlights course={course} duration={duration} feeLabel={feeLabel} />
            {careerRoles.length > 0 && (
              <section id="careers" className="scroll-mt-28">
                <CareerSidebar roles={careerRoles} />
              </section>
            )}
          </aside>

        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section
        className="relative overflow-hidden py-14 text-white"
        style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.primary} 60%, #c0244f 100%)` }}
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full opacity-10" style={{ background: "white" }} aria-hidden />
        <div className="pointer-events-none absolute -bottom-10 right-0 h-40 w-40 rounded-full opacity-10" style={{ background: "white" }} aria-hidden />
        <div className="era-shell relative flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 mb-3">
              <Ico d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Ready to Start Your {shortLabel(course)} Journey?
            </h2>
            <p className="mt-2 max-w-xl text-white/80">
              Get expert guidance, compare universities and apply for your {shortLabel(course)} today!
            </p>
          </div>
          <Link
            href="/tools/course-finder"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-extrabold transition hover:-translate-y-0.5 hover:shadow-lg"
            style={{ color: C.primary }}
          >
            Apply Now →
          </Link>
        </div>
      </section>
    </main>
  );
}
