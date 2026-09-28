"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  RichSection,
  UniversityCourse,
  UniversityDetail,
} from "@/lib/universityDetail";
import { FAQAccordion } from "@/components/courses/CourseContentBlocks";

type IconName =
  | "calendar"
  | "pin"
  | "building"
  | "award"
  | "book"
  | "rupee"
  | "trophy"
  | "star"
  | "globe"
  | "check"
  | "doc"
  | "users"
  | "briefcase"
  | "shield"
  | "heart"
  | "download"
  | "compare"
  | "arrow";

const ICON_PATHS: Record<IconName, ReactNode> = {
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
  building: (
    <>
      <path d="M4 20h16M6 20V9l6-4 6 4v11" />
      <path d="M10 20v-5h4v5M9 11h.01M15 11h.01" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13.2-1.5 7 5-2.5 5 2.5-1.5-7" />
    </>
  ),
  book: (
    <>
      <path d="M5 5.5A2 2 0 0 1 7 4h12v14H7a2 2 0 0 0-2 2V5.5Z" />
      <path d="M5 20a2 2 0 0 1 2-2h12" />
    </>
  ),
  rupee: <path d="M7 5h10M7 9h10M13.5 20 8 14h2a4.5 4.5 0 0 0 0-9" />,
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7" />
    </>
  ),
  star: <path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6L12 4Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.5 2.6 2.5 13.4 0 16M12 4c-2.5 2.6-2.5 13.4 0 16" />
    </>
  ),
  check: <path d="m5.5 12.5 4 4 9-9" />,
  doc: (
    <>
      <path d="M7 4h7l4 4v12H7V4Z" />
      <path d="M14 4v4h4M9.5 13h5M9.5 16.5h5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="2.5" />
      <circle cx="16.5" cy="9.5" r="2" />
      <path d="M4.5 18c.7-2.6 2.3-4 4.5-4s3.8 1.4 4.5 4M14.5 14.5c1.9-.4 3.6.5 4.5 3" />
    </>
  ),
  briefcase: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8M4 13h16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.2c0 4-2.8 7.3-7 8.3-4.2-1-7-4.3-7-8.3V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  heart: <path d="M12 19s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.5C19 14.6 12 19 12 19Z" />,
  download: <path d="M12 4v10m0 0 3.5-3.5M12 14l-3.5-3.5M5 18h14" />,
  compare: <path d="M7 4v16M17 4v16M4 8h6M14 16h6M4 8l3-3M20 16l-3 3" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
};

function Icon({
  name,
  className = "h-5 w-5",
  filled = false,
}: {
  name: IconName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, value - index));
        return (
          <span key={index} className="relative inline-flex h-4 w-4 text-slate-200">
            <Icon name="star" className="h-4 w-4" filled />
            <span className="absolute inset-0 overflow-hidden text-amber-400" style={{ width: `${fill * 100}%` }}>
              <Icon name="star" className="h-4 w-4" filled />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 rounded-[1.25rem] border border-[#e2e8f0] bg-white p-5 shadow-[0_8px_24px_rgba(18,38,63,0.04)] sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="text-lg font-extrabold tracking-[-0.02em] text-[#12263f] sm:text-xl">{title}</h2>
      {action}
    </div>
  );
}

function formatMoney(amount: number | null, currency = "INR") {
  if (amount == null) return "—";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-IN")}`;
  }
}

function compactMoney(amount: number | null) {
  if (amount == null) return "—";
  if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(1).replace(/\.0$/, "")} Cr`;
  if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(1).replace(/\.0$/, "")} L`;
  if (amount >= 1e3) return `₹${(amount / 1e3).toFixed(0)}K`;
  return `₹${amount}`;
}

function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.replace(/[.\s]/g, "").length > 3);
}

function sectionParagraphs(section: RichSection) {
  return section.blocks.filter((block) => block.type === "p").map((block) => block.text);
}

function sectionPoints(section: RichSection) {
  const items = section.blocks.filter((block) => block.type === "li").map((block) => block.text);
  const source = items.length ? items : sectionParagraphs(section);
  return source.flatMap(splitSentences);
}

const LEVEL_TABS: { id: UniversityCourse["levelGroup"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "UG", label: "Undergraduate" },
  { id: "PG", label: "Postgraduate" },
  { id: "Diploma", label: "Diploma" },
  { id: "Certificate", label: "Certificate" },
];

const DOCUMENTS = [
  "Class 10th & 12th mark sheets and certificates",
  "Graduation mark sheets (for PG programmes)",
  "Government-issued photo ID (Aadhaar / Passport)",
  "Recent passport-size photographs",
  "Migration / transfer certificate (if applicable)",
  "Category certificate (if applicable)",
];

const NAV = [
  { id: "about", label: "About" },
  { id: "courses", label: "Courses & Fees" },
  { id: "admission", label: "Admission" },
  { id: "features", label: "Key Features" },
  { id: "placements", label: "Placements" },
  { id: "faqs", label: "FAQs" },
];

export function UniversityDetailPage({ university }: { university: UniversityDetail }) {
  const [saved, setSaved] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [courseTab, setCourseTab] = useState<(typeof LEVEL_TABS)[number]["id"]>("all");
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const displayName = university.name;
  const initials = (university.shortName || university.name).slice(0, 3).toUpperCase();
  const aboutParas = sectionParagraphs(university.about);
  const aboutText = aboutParas.join(" ");
  const heroLead = splitSentences(aboutText).slice(0, 2).join(" ");

  const accreditation =
    university.approvals.find((a) => /naac/i.test(a.name))?.name
    || (university.grade ? `Grade ${university.grade}` : "—");

  const fees = university.courses
    .map((course) => course.totalFee)
    .filter((fee): fee is number => fee != null && fee > 0);
  const avgFee = fees.length ? Math.round(fees.reduce((a, b) => a + b, 0) / fees.length) : null;

  const availableTabs = LEVEL_TABS.filter(
    (tab) => tab.id === "all" || university.courses.some((course) => course.levelGroup === tab.id)
  );
  const tabCourses = university.courses.filter(
    (course) => courseTab === "all" || course.levelGroup === courseTab
  );

  const admissionSteps = useMemo(() => {
    const items = university.admission.blocks.filter((b) => b.type === "li").map((b) => b.text);
    return (items.length ? items : sectionPoints(university.admission)).slice(0, 8);
  }, [university.admission]);

  const featurePoints = useMemo(() => sectionPoints(university.features), [university.features]);
  const visibleFeatures = showAllFeatures ? featurePoints : featurePoints.slice(0, 6);

  const careerParas = sectionParagraphs(university.career);
  const careerHeadings = university.career.blocks
    .filter((b) => b.type === "heading" && !/hiring|recruit|partner/i.test(b.text))
    .map((b) => b.text);

  const visibleFaqs = showAllFaqs ? university.faqs : university.faqs.slice(0, 5);

  const stats: { icon: IconName; label: string; value: string }[] = [
    { icon: "calendar", label: "Established", value: university.established || "—" },
    { icon: "pin", label: "Location", value: university.state || "—" },
    { icon: "building", label: "University Type", value: university.type || "—" },
    { icon: "award", label: "Accreditation", value: accreditation },
    { icon: "book", label: "Total Courses", value: `${university.courses.length}` },
    { icon: "rupee", label: "Average Fees", value: compactMoney(avgFee) },
    { icon: "trophy", label: "Ranking", value: university.worldRank ? `#${university.worldRank}` : "—" },
  ];

  const highlights: { icon: IconName; value: string; label: string; tone: string }[] = [
    {
      icon: "award",
      value: accreditation,
      label: "Accreditation",
      tone: "bg-amber-50 text-amber-600",
    },
    {
      icon: "book",
      value: `${university.courses.length}+`,
      label: "Courses",
      tone: "bg-blue-50 text-[#2563eb]",
    },
    {
      icon: "star",
      value: university.ratings != null ? university.ratings.toFixed(1) : "—",
      label: "Student Rating",
      tone: "bg-rose-50 text-rose-500",
    },
    {
      icon: "shield",
      value: `${university.approvals.length}`,
      label: "Approvals",
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: "briefcase",
      value: university.recruiters.length ? `${university.recruiters.length}+` : "—",
      label: "Hiring Partners",
      tone: "bg-violet-50 text-violet-600",
    },
    {
      icon: "trophy",
      value: university.worldRank ? `#${university.worldRank}` : "—",
      label: "Ranking",
      tone: "bg-sky-50 text-sky-600",
    },
  ];

  const detailsRows: [string, ReactNode][] = [
    ["University Name", displayName],
    ["Short Name", university.shortName || "—"],
    ["Location", university.location || "—"],
    ["Established", university.established || "—"],
    ["University Type", university.type || "—"],
    ["Accreditation", accreditation],
    ["Approvals", university.approvals.map((a) => a.name).join(", ") || "—"],
    ["Grade", university.grade || "—"],
    ["Rating", university.ratings != null ? `${university.ratings.toFixed(1)} / 5` : "—"],
    ["Total Courses", `${university.courses.length}`],
    [
      "Official Website",
      university.website ? (
        <a
          href={university.website}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#2563eb] hover:underline"
        >
          {university.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </a>
      ) : (
        "—"
      ),
    ],
  ];

  return (
    <main id="main" className="bg-[#f7f9fc] pb-16 text-[#12263f]">
      <div className="era-shell pt-4 sm:pt-5">
        <nav className="flex flex-wrap items-center gap-2 text-[13px] text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="transition hover:text-[#1e3a5f]">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/universities" className="transition hover:text-[#1e3a5f]">Universities</Link>
          <span aria-hidden>›</span>
          <span className="max-w-[60vw] truncate font-medium text-[#1e3a5f]">{displayName}</span>
        </nav>

        {/* Hero */}
        <section className="mt-4 grid gap-6 overflow-hidden rounded-[1.5rem] border border-[#e2e8f0] bg-white p-5 shadow-[0_10px_30px_rgba(18,38,63,0.05)] sm:p-7 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div className="flex flex-col">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white sm:h-20 sm:w-20">
                {university.logo ? (
                  <Image
                    src={university.logo}
                    alt={`${displayName} logo`}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain p-2"
                    unoptimized
                  />
                ) : (
                  <span className="text-lg font-extrabold text-[#2563eb]">{initials}</span>
                )}
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold leading-tight tracking-[-0.03em] text-[#12263f] sm:text-[2rem]">
                  {displayName}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-slate-500">
                  {university.state ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="pin" className="h-4 w-4 text-slate-400" />
                      {university.state}, India
                    </span>
                  ) : null}
                  {university.type ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="building" className="h-4 w-4 text-slate-400" />
                      {university.type}
                    </span>
                  ) : null}
                  {university.established ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon name="calendar" className="h-4 w-4 text-slate-400" />
                      Established {university.established}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {heroLead ? (
              <p className="mt-5 text-[15px] leading-7 text-slate-600">{heroLead}</p>
            ) : null}

            {university.ratings != null ? (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="font-extrabold text-[#12263f]">{university.ratings.toFixed(1)}</span>
                <Stars value={university.ratings} />
                <span className="text-slate-500">Student rating</span>
              </div>
            ) : null}

            {university.approvals.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {university.approvals.map((approval) => (
                  <span
                    key={approval.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[12px] font-semibold text-emerald-700"
                  >
                    {approval.logo ? (
                      <Image
                        src={approval.logo}
                        alt=""
                        width={16}
                        height={16}
                        className="h-4 w-4 rounded-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <Icon name="check" className="h-3.5 w-3.5" />
                    )}
                    {approval.name} Approved
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-6">
              <Link
                href="/tools/course-finder"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-bold text-white shadow-[0_10px_22px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
              >
                Apply Now
              </Link>
              <Link
                href="/tools/course-finder"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#c9d2de] bg-white px-5 text-sm font-bold text-[#12263f] transition hover:border-[#12263f]"
              >
                <Icon name="download" className="h-4 w-4" />
                Download Brochure
              </Link>
              <Link
                href="/universities"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#c9d2de] bg-white px-5 text-sm font-bold text-[#12263f] transition hover:border-[#12263f]"
              >
                <Icon name="compare" className="h-4 w-4" />
                Compare
              </Link>
              <button
                type="button"
                onClick={() => setSaved((prev) => !prev)}
                aria-pressed={saved}
                aria-label={saved ? "Remove from saved" : "Save university"}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                  saved
                    ? "border-rose-200 bg-rose-50 text-rose-500"
                    : "border-[#c9d2de] bg-white text-slate-500 hover:border-rose-200 hover:text-rose-500"
                }`}
              >
                <Icon name="heart" className="h-5 w-5" filled={saved} />
              </button>
            </div>
          </div>

          <div className="relative min-h-[220px] overflow-hidden rounded-[1.25rem] bg-[#eaf2ff] sm:min-h-[300px]">
            {university.banner ? (
              <Image
                src={university.banner}
                alt={`${displayName} campus`}
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-5xl font-extrabold text-[#2563eb]/30">
                {initials}
              </div>
            )}
            {university.worldRank ? (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#12263f] shadow">
                <Icon name="trophy" className="h-4 w-4 text-amber-500" />
                Ranked #{university.worldRank}
              </span>
            ) : null}
          </div>
        </section>

        {/* Stats strip */}
        <section className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] border border-[#e2e8f0] bg-[#e2e8f0] sm:grid-cols-4 lg:grid-cols-7">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 bg-white px-4 py-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff] text-[#2563eb]">
                <Icon name={stat.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-500">{stat.label}</p>
                <p className="truncate text-sm font-extrabold text-[#12263f]" title={stat.value}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Section nav */}
        <nav
          className="sticky top-3 z-30 mt-5 overflow-x-auto rounded-2xl border border-[#e2e8f0] bg-white/90 px-2 py-1 shadow-[0_8px_24px_rgba(18,38,63,0.06)] backdrop-blur-md"
          aria-label="University sections"
        >
          <div className="flex min-w-max gap-1">
            {NAV.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-[#f3f7fb] hover:text-[#12263f]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* About + Highlights */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <Card id="about">
            <CardHeader title={university.about.title && !/^about\s*$/i.test(university.about.title) ? university.about.title : `About ${university.shortName || "University"}`} />
            <div className={`space-y-3 text-[15px] leading-7 text-slate-600 ${aboutExpanded ? "" : "line-clamp-6"}`}>
              {aboutParas.length ? aboutParas.map((para) => <p key={para.slice(0, 40)}>{para}</p>) : <p>Details coming soon.</p>}
            </div>
            {aboutText.length > 420 ? (
              <button
                type="button"
                onClick={() => setAboutExpanded((prev) => !prev)}
                className="mt-3 text-sm font-bold text-[#2563eb] hover:underline"
              >
                {aboutExpanded ? "Show less" : "Read more"}
              </button>
            ) : null}
          </Card>

          <Card>
            <CardHeader title="Key Highlights" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#eef2f6] bg-[#fafbfd] p-3.5">
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${item.tone}`}>
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <p className="mt-2.5 truncate text-base font-extrabold text-[#12263f]" title={item.value}>
                    {item.value}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Details + Popular courses */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.35fr]">
          <Card>
            <CardHeader title="University Details" />
            <dl className="divide-y divide-[#eef2f6] overflow-hidden rounded-xl border border-[#eef2f6] text-sm">
              {detailsRows.map(([label, value], index) => (
                <div
                  key={label}
                  className={`grid grid-cols-[42%_58%] gap-3 px-4 py-2.5 ${index % 2 ? "bg-[#fafbfd]" : "bg-white"}`}
                >
                  <dt className="font-medium text-slate-500">{label}</dt>
                  <dd className="break-words font-semibold text-[#12263f]">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <CardHeader
              title="Popular Courses"
              action={
                <a href="#courses" className="text-sm font-bold text-[#2563eb] hover:underline">
                  View All Courses →
                </a>
              }
            />
            {availableTabs.length > 2 ? (
              <div className="mb-4 flex flex-wrap gap-2">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCourseTab(tab.id)}
                    className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                      courseTab === tab.id
                        ? "bg-[#2563eb] text-white"
                        : "bg-[#f3f7fb] text-slate-600 hover:bg-[#e8eef6]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            ) : null}

            {tabCourses.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {tabCourses.slice(0, 4).map((course) => (
                  <article
                    key={course.uuid}
                    className="flex flex-col rounded-2xl border border-[#e2e8f0] p-4 transition hover:border-[#bfdbfe] hover:shadow-[0_8px_20px_rgba(37,99,235,0.06)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff] text-xs font-extrabold text-[#2563eb]">
                        {(course.code || course.name).slice(0, 3).toUpperCase()}
                      </span>
                      <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#12263f]">{course.name}</h3>
                    </div>
                    <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
                      <dt className="text-slate-500">Level</dt>
                      <dd className="font-semibold text-[#12263f]">{course.level}</dd>
                      <dt className="text-slate-500">Mode</dt>
                      <dd className="font-semibold text-[#12263f]">{course.mode}</dd>
                      <dt className="text-slate-500">Duration</dt>
                      <dd className="font-semibold text-[#12263f]">{course.duration}</dd>
                      <dt className="text-slate-500">Fees</dt>
                      <dd className="font-semibold text-[#12263f]">{formatMoney(course.totalFee, course.currency)}</dd>
                    </dl>
                    <Link
                      href={`/courses/${course.uuid}`}
                      className="mt-4 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl bg-[#eaf2ff] text-[13px] font-bold text-[#2563eb] transition hover:bg-[#dbeafe]"
                    >
                      View Details
                      <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-[#f7f9fc] px-4 py-8 text-center text-sm text-slate-500">
                Courses will be listed here soon.
              </p>
            )}
          </Card>
        </div>

        {/* Courses & fees table */}
        {university.courses.length ? (
          <Card id="courses" className="mt-5">
            <CardHeader title="Courses & Fees" />
            <div className="overflow-x-auto rounded-xl border border-[#eef2f6]">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#f3f7fb] text-[12px] font-bold uppercase tracking-wide text-[#12263f]">
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Eligibility</th>
                    <th className="px-4 py-3">Total Fees</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eef2f6]">
                  {university.courses.map((course) => (
                    <tr key={course.uuid} className="transition hover:bg-[#fafbfd]">
                      <td className="px-4 py-3.5 font-semibold text-[#12263f]">{course.name}</td>
                      <td className="px-4 py-3.5 text-slate-600">{course.level}</td>
                      <td className="px-4 py-3.5 text-slate-600">{course.duration}</td>
                      <td className="max-w-[260px] px-4 py-3.5 text-slate-600">
                        <span className="line-clamp-2" title={course.eligibility}>{course.eligibility}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-bold text-[#12263f]">{formatMoney(course.totalFee, course.currency)}</span>
                        {course.feeNote ? <span className="block text-[11px] text-slate-500">{course.feeNote}</span> : null}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Link
                          href={`/courses/${course.uuid}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#bfdbfe] px-3 py-1.5 text-[12px] font-bold text-[#2563eb] transition hover:bg-[#eaf2ff]"
                        >
                          View
                          <Icon name="arrow" className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : null}

        {/* Admission process */}
        {admissionSteps.length ? (
          <Card id="admission" className="mt-5">
            <CardHeader title={university.admission.title || "Admission Process"} />
            <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {admissionSteps.map((step, index) => (
                <li
                  key={step.slice(0, 40)}
                  className="relative rounded-2xl border border-[#e2e8f0] bg-[#fafbfd] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-extrabold text-white shadow-[0_6px_14px_rgba(37,99,235,0.3)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-[#bfdbfe] to-transparent" aria-hidden />
                  </div>
                  <p className="mt-3 text-[13px] leading-6 text-slate-600">{step}</p>
                </li>
              ))}
            </ol>
          </Card>
        ) : null}

        {/* Features + documents */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          {featurePoints.length ? (
            <Card id="features">
              <CardHeader title="Key Features" />
              <ul className="grid gap-3 sm:grid-cols-2">
                {visibleFeatures.map((point) => (
                  <li key={point.slice(0, 50)} className="flex gap-3 rounded-xl bg-[#fafbfd] p-3 text-[13px] leading-6 text-slate-600">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {featurePoints.length > 6 ? (
                <button
                  type="button"
                  onClick={() => setShowAllFeatures((prev) => !prev)}
                  className="mt-4 text-sm font-bold text-[#2563eb] hover:underline"
                >
                  {showAllFeatures ? "Show fewer" : `Show all ${featurePoints.length} features`}
                </button>
              ) : null}
            </Card>
          ) : null}

          <Card>
            <CardHeader title="Required Documents" />
            <p className="-mt-3 mb-4 text-[13px] text-slate-500">Documents typically needed at the time of admission.</p>
            <ul className="space-y-2.5">
              {DOCUMENTS.map((doc) => (
                <li key={doc} className="flex items-center gap-3 text-[13px] font-medium text-[#12263f]">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#2563eb]">
                    <Icon name="doc" className="h-4 w-4" />
                  </span>
                  {doc}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Placements */}
        {careerParas.length || university.recruiters.length ? (
          <Card id="placements" className="mt-5">
            <CardHeader title={university.career.title || "Placements"} />
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div>
                {careerHeadings[0] ? (
                  <h3 className="text-base font-bold text-[#12263f]">{careerHeadings[0]}</h3>
                ) : null}
                <div className="mt-2 space-y-3 text-[14px] leading-7 text-slate-600">
                  {careerParas.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
              </div>
              {university.recruiters.length ? (
                <div>
                  <h3 className="text-base font-bold text-[#12263f]">Top Recruiters</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {university.recruiters.map((name) => (
                      <div
                        key={name}
                        className="flex items-center gap-2.5 rounded-xl border border-[#e2e8f0] bg-white px-3 py-2.5"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f3f7fb] text-[12px] font-extrabold text-[#2563eb]">
                          {name.charAt(0)}
                        </span>
                        <span className="truncate text-[13px] font-semibold text-[#12263f]" title={name}>
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Card>
        ) : null}

        {/* FAQs */}
        {university.faqs.length ? (
          <Card id="faqs" className="mt-5">
            <CardHeader title="Frequently Asked Questions" />
            <FAQAccordion faqs={visibleFaqs} />
            {university.faqs.length > 5 ? (
              <button
                type="button"
                onClick={() => setShowAllFaqs((prev) => !prev)}
                className="mt-4 text-sm font-bold text-[#2563eb] hover:underline"
              >
                {showAllFaqs ? "Show fewer questions" : `View all ${university.faqs.length} questions`}
              </button>
            ) : null}
          </Card>
        ) : null}

        {/* Similar universities */}
        {university.similar.length ? (
          <Card className="mt-5">
            <CardHeader
              title="Similar Universities"
              action={
                <Link href="/universities" className="text-sm font-bold text-[#2563eb] hover:underline">
                  View More →
                </Link>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {university.similar.map((uni) => (
                <article key={uni.uuid} className="flex flex-col rounded-2xl border border-[#e2e8f0] p-4 transition hover:border-[#bfdbfe] hover:shadow-[0_8px_20px_rgba(37,99,235,0.06)]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eef2f6] bg-white">
                      {uni.logo ? (
                        <Image src={uni.logo} alt="" width={48} height={48} className="h-full w-full object-contain p-1" unoptimized />
                      ) : (
                        <span className="text-xs font-extrabold text-[#2563eb]">
                          {(uni.shortName || uni.name).slice(0, 3).toUpperCase()}
                        </span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#12263f]">{uni.name}</h3>
                      <p className="truncate text-[12px] text-slate-500">{uni.state}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[12px] text-slate-500">
                    {uni.ratings != null ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Stars value={uni.ratings} />
                        <span className="font-semibold text-[#12263f]">{uni.ratings.toFixed(1)}</span>
                      </span>
                    ) : <span />}
                    <span>{uni.courseCount} course{uni.courseCount === 1 ? "" : "s"}</span>
                  </div>
                  <Link
                    href={`/universities/${uni.uuid}`}
                    className="mt-4 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-[#bfdbfe] text-[13px] font-bold text-[#2563eb] transition hover:bg-[#eaf2ff]"
                  >
                    View University
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </Card>
        ) : null}

        {/* CTA */}
        <section className="relative mt-5 overflow-hidden rounded-[1.5rem] border border-[#e2e8f0] bg-[#eaf2ff] px-6 py-8 sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(47,111,237,0.08) 18px, rgba(47,111,237,0.08) 19px)",
            }}
            aria-hidden
          />
          <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[#12263f] sm:text-2xl">
                Need Help Choosing the Right University?
              </h2>
              <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-600">
                Get personalised guidance from our admission experts and find the right course and university for your career goals.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/course-finder"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
              >
                Talk to an Expert
              </Link>
              <Link
                href="/tools/course-finder"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#c9d2de] bg-white px-6 text-sm font-bold text-[#12263f] transition hover:border-[#12263f]"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
