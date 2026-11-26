"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ClipboardCheck,
  Download,
  Clock3,
  GraduationCap,
  Headset,
  Laptop,
  MapPin,
  MonitorPlay,
  Phone,
  Scale,
  User,
  Users,
  Wallet,
} from "lucide-react";
import type { Blog } from "@/lib/blogs";
import { formatBlogDate, resolveBlogImageUrl } from "@/lib/blogs";
import type { CourseContentParagraph, CourseContentTable, CourseFaq, DiscoveryCourse } from "@/lib/courseDiscovery";
import { parseRichHtml, type RichBlock, type UniversityCourse, type UniversityDetail } from "@/lib/universityDetail";
import type { DiscoveryUniversity } from "@/lib/universities";

const C = {
  primary: "#5412A5",
  secondary: "#7022AD",
  magenta: "#D414A8",
  lavender: "#F7F1FC",
  page: "#FAF9FC",
  text: "#242033",
  muted: "#686477",
  border: "#EAE2F2",
};

const APPLY_HREF = "/tools/course-finder";
const HERO_FALLBACK = `linear-gradient(118deg, #3A0B78 0%, ${C.primary} 48%, ${C.magenta} 100%)`;

const APPROVAL_BLURB: Record<string, string> = {
  AIU: "Association of Indian Universities",
  AICTE: "All India Council for Technical Education",
  NAAC: "National Assessment and Accreditation Council",
  "NAAC A++": "National Assessment and Accreditation Council",
  "NAAC A+": "National Assessment and Accreditation Council",
  NIRF: "National Institutional Ranking Framework",
  UGC: "University Grants Commission",
  DEB: "Distance Education Bureau",
};

type NavTab = { id: string; label: string };

function stripPreview(html = "") {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findParagraph(paragraphs: CourseContentParagraph[], matcher: RegExp) {
  return paragraphs.find((item) => matcher.test(item.title || ""));
}

function RichContent({ blocks }: { blocks: RichBlock[] }) {
  if (!blocks.length) return null;
  const listItems = blocks.filter((block) => block.type === "li");
  const others = blocks.filter((block) => block.type !== "li");

  return (
    <div className="space-y-3 text-[14.5px] leading-7 text-[#686477]">
      {others.map((block, index) =>
        block.type === "heading" ? (
          <h3 key={`${block.text}-${index}`} className="pt-1 text-[15px] font-extrabold text-[#242033]">
            {block.text}
          </h3>
        ) : (
          <p key={`${block.text.slice(0, 40)}-${index}`}>{block.text}</p>
        )
      )}
      {listItems.length ? (
        <ul className="space-y-2">
          {listItems.map((block, index) => (
            <li key={`${block.text.slice(0, 40)}-${index}`} className="flex items-start gap-2.5">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[#5412A5]" />
              <span>{block.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ParagraphBody({ content }: { content: string }) {
  const parsed = parseRichHtml(content);
  const blocks = parsed.blocks.length ? parsed.blocks : parsed.title ? [{ type: "p" as const, text: parsed.title }] : [];
  return <RichContent blocks={blocks} />;
}

function ReadMoreText({ content, limit = 420 }: { content: string; limit?: number }) {
  const [open, setOpen] = useState(false);
  const preview = stripPreview(content);
  const needsToggle = preview.length > limit;
  if (!needsToggle || open) {
    return (
      <div>
        <ParagraphBody content={content} />
        {needsToggle ? (
          <button type="button" onClick={() => setOpen(false)} className="mt-3 text-sm font-bold text-[#5412A5]">
            Read Less
          </button>
        ) : null}
      </div>
    );
  }
  return (
    <div>
      <p className="text-[14.5px] leading-7 text-[#686477]">{preview.slice(0, limit).trim()}…</p>
      <button type="button" onClick={() => setOpen(true)} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#5412A5]">
        Read More <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-[1.2rem] font-extrabold tracking-tight text-[#242033] sm:text-[1.45rem]">
      <span className="inline-block h-6 w-1 shrink-0 rounded-full bg-gradient-to-b from-[#5412A5] to-[#D414A8]" aria-hidden />
      {children}
    </h2>
  );
}

function UniversityHero({ university, lead }: { university: UniversityDetail; lead: string }) {
  const banner = university.banner;
  const brochureHref = university.website || APPLY_HREF;

  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0" aria-hidden>
        {banner ? (
          <Image src={banner} alt="" fill priority sizes="100vw" className="object-cover object-[center_30%]" unoptimized />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background: banner
              ? "linear-gradient(100deg, rgba(58,11,120,0.92) 0%, rgba(84,18,165,0.78) 46%, rgba(212,20,168,0.28) 100%)"
              : HERO_FALLBACK,
          }}
        />
      </div>

      <div className="era-shell relative py-8 sm:py-10 lg:py-12">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-white/70" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/universities" className="hover:text-white">Universities</Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-white">{university.name}</span>
        </nav>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {university.logo ? (
            <div className="inline-flex h-[84px] w-[84px] shrink-0 overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg sm:h-[96px] sm:w-[96px]">
              <Image src={university.logo} alt={`${university.name} logo`} width={96} height={96} className="h-full w-full object-contain" unoptimized />
            </div>
          ) : null}
          <div className="min-w-0">
            <h1 className="text-[1.7rem] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[2.35rem]">
              {university.name}
            </h1>
            {lead ? <p className="mt-2 max-w-2xl text-[14px] leading-6 text-white/85 sm:text-[15px]">{lead}</p> : null}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[13px] text-white/90">
              {university.location ? (
                <span className="inline-flex max-w-xl items-start gap-1.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{university.location}</span>
                </span>
              ) : null}
              {university.grade ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 font-semibold backdrop-blur-sm">
                  <Award className="h-3.5 w-3.5" />
                  Grade {university.grade}
                </span>
              ) : null}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={APPLY_HREF}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D414A8] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(212,20,168,0.28)] transition hover:bg-[#b91090]"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={brochureHref}
                target={university.website ? "_blank" : undefined}
                rel={university.website ? "noreferrer" : undefined}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/70 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
                Download Brochure
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightStrip({ items }: { items: { title: string; subtitle: string; Icon: typeof GraduationCap }[] }) {
  if (!items.length) return null;
  return (
    <div className="era-shell relative z-10 -mt-7">
      <div className="grid grid-cols-2 gap-3 rounded-[1.4rem] border border-[#EAE2F2] bg-white p-3 shadow-[0_16px_40px_rgba(84,18,165,0.08)] sm:grid-cols-2 lg:grid-cols-4 lg:px-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7F1FC] text-[#5412A5]">
              <item.Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-extrabold leading-tight text-[#242033]">{item.title}</p>
              <p className="mt-0.5 text-[12px] text-[#686477]">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UniversityNavigation({ activeSection, tabs }: { activeSection: string; tabs: NavTab[] }) {
  if (!tabs.length) return null;
  return (
    <nav
      className="sticky top-[64px] z-30 mt-6 border-b border-[#EAE2F2] bg-white/95 backdrop-blur-md sm:top-[72px] lg:top-[78px]"
      aria-label="University sections"
    >
      <div className="era-shell">
        <div className="-mx-1 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const active = activeSection === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`shrink-0 px-4 py-3.5 text-[13px] font-semibold transition sm:px-5 sm:text-sm ${
                  active ? "text-[#5412A5]" : "text-[#686477] hover:text-[#242033]"
                }`}
                style={{ borderBottom: active ? "2px solid #5412A5" : "2px solid transparent" }}
              >
                {tab.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function EnquiryForm({ university, programmes }: { university: UniversityDetail; programmes: UniversityCourse[] }) {
  const [form, setForm] = useState({ name: "", phone: "", programme: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.replace(/\D/g, "");
    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    const params = new URLSearchParams({
      name,
      phone,
      university: university.name,
      ...(form.programme ? { course: form.programme } : {}),
    });
    window.location.href = `${APPLY_HREF}?${params.toString()}`;
    setStatus("success");
  }

  return (
    <div
      className="rounded-[1.25rem] p-5 text-white shadow-[0_16px_36px_rgba(84,18,165,0.18)]"
      style={{ background: `linear-gradient(160deg, ${C.primary} 0%, ${C.secondary} 52%, ${C.magenta} 100%)` }}
    >
      <h3 className="text-[17px] font-extrabold">Get Admission Support</h3>
      <p className="mt-1 text-[13px] leading-5 text-white/80">
        Speak to our experts for course guidance, eligibility, fees and the admission process.
      </p>
      {status === "success" ? (
        <p className="mt-5 rounded-xl bg-white/15 p-4 text-sm font-semibold">Thank you. We will connect you with a counsellor.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
          <label className="relative block">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B93AE]" />
            <span className="sr-only">Full Name</span>
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Your Name"
              className="h-11 w-full rounded-xl border-0 bg-white pl-10 pr-3 text-sm text-[#242033] outline-none placeholder:text-[#9B93AE]"
            />
          </label>
          <label className="relative block">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B93AE]" />
            <span className="sr-only">Mobile Number</span>
            <input
              value={form.phone}
              onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
              placeholder="Mobile Number"
              inputMode="numeric"
              className="h-11 w-full rounded-xl border-0 bg-white pl-10 pr-3 text-sm text-[#242033] outline-none placeholder:text-[#9B93AE]"
            />
          </label>
          <label className="relative block">
            <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B93AE]" />
            <span className="sr-only">Select Programme</span>
            <select
              value={form.programme}
              onChange={(event) => setForm((prev) => ({ ...prev, programme: event.target.value }))}
              className="h-11 w-full appearance-none rounded-xl border-0 bg-white pl-10 pr-8 text-sm text-[#242033] outline-none"
            >
              {/* <option value="">Select Programme</option>
              {programmes.map((course) => (
                <option key={course.uuid || course.name} value={course.name}>
                  {course.name}
                </option>
              ))} */}
              {!programmes.length ? <option value="Counselling">Admission counselling</option> : null}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B93AE]" />
          </label>
          {error ? <p className="text-[12px] font-semibold text-pink-100">{error}</p> : null}
          <button type="submit" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-extrabold text-[#5412A5] transition hover:bg-[#F7F1FC]">
            Request a Call Back
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-white/85">
        <span>✓ Free Counselling</span>
        <span>✓ Expert Guidance</span>
        <span>✓ No Hidden Charges</span>
      </div>
    </div>
  );
}

function CompanyMark({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <span className="flex h-12 w-full items-center justify-center">
      {logo && !failed ? (
        <Image
          src={logo}
          alt={name}
          width={120}
          height={48}
          className="max-h-10 w-auto object-contain"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[12px] font-extrabold text-[#5412A5]">
          {initials || <Building2 className="h-5 w-5" />}
        </span>
      )}
    </span>
  );
}

function SidebarCard({ title, href, children }: { title: string; href: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.15rem] border border-[#EAE2F2] bg-white p-4 shadow-[0_8px_20px_rgba(84,18,165,0.05)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-[14px] font-extrabold text-[#242033]">{title}</h3>
        <Link href={href} className="text-[12px] font-bold text-[#5412A5]">View all</Link>
      </div>
      {children}
    </section>
  );
}

function programmesFromTables(tables: CourseContentTable[]): UniversityCourse[] {
  return tables.flatMap((table) => {
    const title = table.title || "";
    const levelGroup: UniversityCourse["levelGroup"] = /post|pg/i.test(title)
      ? "PG"
      : /under|ug/i.test(title)
        ? "UG"
        : "Other";
    return (table.rows || []).map((row) => {
      const values = Object.values(row.content || {}).map((value) => String(value || "").trim()).filter(Boolean);
      const name = row.label || values[0] || "Programme";
      return {
        uuid: "",
        name,
        code: values[1] && values[1] !== name ? values[1] : "",
        slug: "",
        level: levelGroup === "UG" ? "Undergraduate" : levelGroup === "PG" ? "Postgraduate" : title,
        levelGroup,
        mode: "Online",
        duration: "",
        eligibility: "",
        language: "",
        totalFee: null,
        currency: "INR",
        feeNote: "",
        paragraphs: [],
        specializations: [],
      } satisfies UniversityCourse;
    });
  });
}

function UniversityCourses({
  courses,
  tables,
  intro,
}: {
  courses: UniversityCourse[];
  tables: CourseContentTable[];
  intro?: CourseContentParagraph;
}) {
  const programmes = useMemo(() => {
    const fromTables = programmesFromTables(tables);
    const seen = new Set(courses.map((course) => course.name.trim().toLowerCase()));
    return [
      ...courses,
      ...fromTables.filter((item) => {
        const key = item.name.trim().toLowerCase();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      }),
    ];
  }, [courses, tables]);
  const tabs = useMemo(() => {
    const groups = Array.from(new Set(programmes.map((course) => course.levelGroup).filter((group) => group !== "Other")));
    const items: { id: "all" | UniversityCourse["levelGroup"]; label: string }[] = [{ id: "all", label: "All" }];
    if (groups.includes("UG")) items.push({ id: "UG", label: "Undergraduate (UG)" });
    if (groups.includes("PG")) items.push({ id: "PG", label: "Postgraduate (PG)" });
    return items;
  }, [programmes]);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const rows = programmes.filter((course) => tab === "all" || course.levelGroup === tab);

  return (
    <section id="courses" className="scroll-mt-28 rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5 sm:p-6">
      <SectionHeading>{intro?.title?.trim() || "Available UG & PG Online Programmes"}</SectionHeading>
      {intro?.content ? (
        <div className="mt-4">
          <ReadMoreText content={intro.content} />
        </div>
      ) : null}
      {/* {!programmes.length ? (
        <p className="mt-5 rounded-xl bg-[#F7F1FC] px-4 py-6 text-center text-sm text-[#686477]">
          Programmes will be updated soon.
        </p>
      ) : (
        <>
          {tabs.length > 2 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`rounded-full px-3 py-1.5 text-[12px] font-bold ${
                    tab === item.id ? "bg-[#5412A5] text-white" : "bg-[#F7F1FC] text-[#5412A5]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : null}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((course, index) => {
              const href = course.uuid ? `/courses/${course.slug || course.uuid}` : APPLY_HREF;
              return (
              <Link
                key={`${course.uuid || course.name}-${index}`}
                href={href}
                className="group flex items-center gap-3 rounded-2xl border border-[#EAE2F2] bg-[#F7F1FC] p-4 transition hover:border-[#5412A5]/30 hover:shadow-sm"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#5412A5]">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-extrabold text-[#242033]">{course.code || course.name}</span>
                  <span className="mt-0.5 block text-[12px] text-[#686477]">{course.name}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-[#5412A5] transition group-hover:translate-x-0.5" />
              </Link>
            );
            })}
          </div>
        </>
      )} */}
    </section>
  );
}

function FAQSection({ faqs, name }: { faqs: CourseFaq[]; name: string }) {
  const active = faqs.filter((faq) => faq?.is_active !== false && faq.question);
  const [openId, setOpenId] = useState<string | null>(active[0]?.id ?? null);
  if (!active.length) return null;
  const mid = Math.ceil(active.length / 2);
  const columns = [active.slice(0, mid), active.slice(mid)];

  return (
    <section id="faqs" className="scroll-mt-28 rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <p className="text-[12px] text-[#686477]">Find answers to common questions about {name}.</p>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-2">
            {column.map((faq) => {
              const open = openId === faq.id;
              return (
                <article key={faq.id} className="overflow-hidden rounded-xl border border-[#EAE2F2]">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                    onClick={() => setOpenId(open ? null : faq.id)}
                    aria-expanded={open}
                  >
                    <span className="text-[14px] font-semibold text-[#242033]">{faq.question.replace(/^Q\d+\.\s*/i, "")}</span>
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F7F1FC] text-[#5412A5]">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-4 pb-3 text-[13px] leading-6 text-[#686477]">{faq.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

type ApiCourse = {
  name: string;
  degree: string | null;
  level: string | null;
  code: string | null;
  slug: string | null;
  study_mode: string | null;
};

const COURSES_API_BASE = "https://backend.admissionera.com/api/courses/courses";

function levelBadge(level: string | null) {
  if (!level) return null;
  const upper = level.toUpperCase();
  const isUG = upper.includes("UNDER") || upper === "UG";
  const isPG = upper.includes("POST") || upper === "PG";
  const label = isUG ? "UG" : isPG ? "PG" : level;
  const cls = isUG
    ? "bg-[#EEF6FF] text-[#1D6FBF] border border-[#BFD9F5]"
    : isPG
    ? "bg-[#F0FBF0] text-[#1A7A3A] border border-[#B5E5C2]"
    : "bg-[#F7F1FC] text-[#5412A5] border border-[#D5C2F0]";
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold leading-4 ${cls}`}>
      {label}
    </span>
  );
}

function modeBadge(mode: string | null) {
  if (!mode) return <span className="text-[#686477]">—</span>;
  const isOnline = mode.toUpperCase().includes("ONLINE");
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold leading-4 ${
        isOnline
          ? "bg-[#F7F1FC] text-[#5412A5] border border-[#D5C2F0]"
          : "bg-[#FFF3E0] text-[#B45309] border border-[#FBBF24]"
      }`}
    >
      {mode}
    </span>
  );
}

function TopRatedCoursesTable({
  universityName,
  universityUuid,
}: {
  universityName: string;
  universityUuid: string;
}) {
  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [state, setState] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (!universityUuid) return;
    const controller = new AbortController();
    const apiUrl = `${COURSES_API_BASE}/${encodeURIComponent(universityUuid)}`;
    fetch(apiUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => {
        const raw: ApiCourse[] = Array.isArray(data) ? data : [];
        // Deduplicate by code + level combination
        const seen = new Set<string>();
        const unique = raw.filter((c) => {
          const key = `${c.code ?? ""}|${c.level ?? ""}|${c.study_mode ?? ""}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setCourses(unique);
        setState("done");
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setState("error");
      });
    return () => controller.abort();
  }, [universityUuid]);

  if (state === "done" && courses.length === 0) return null;

  return (
    <section
      id="top-courses"
      className="scroll-mt-28 overflow-hidden rounded-[1.15rem] border border-[#EAE2F2] bg-white"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#EAE2F2] bg-gradient-to-r from-[#F7F1FC] to-white px-5 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5412A5]/10">
          <svg className="h-4 w-4 text-[#5412A5]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422A12.083 12.083 0 0 1 20 17c0 2.21-3.582 4-8 4s-8-1.79-8-4c0-1.166.436-2.26 1.84-3.422L12 14z" />
          </svg>
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-[#242033]">
            Top High Rated Courses In{" "}
            <span className="text-[#5412A5]">{universityName}</span>
          </h2>
          {state === "done" && (
            <p className="text-[11px] text-[#686477]">{courses.length} course{courses.length !== 1 ? "s" : ""} available</p>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {state === "loading" && (
        <div className="p-5 space-y-2 animate-pulse">
          <div className="h-9 w-full rounded bg-[#F7F1FC]" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-full rounded bg-[#F7F1FC]/60" />
          ))}
        </div>
      )}

      {/* Error */}
      {state === "error" && (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <svg className="h-8 w-8 text-[#EAE2F2]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-sm font-medium text-[#686477]">Unable to load courses right now</p>
          <p className="text-xs text-[#9A93A8]">Please try refreshing the page.</p>
        </div>
      )}

      {/* Table */}
      {state === "done" && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#F7F1FC]">
                <th className="border-b border-[#EAE2F2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#5412A5]">
                  #
                </th>
                <th className="border-b border-[#EAE2F2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#5412A5]">
                  Course Name
                </th>
                <th className="border-b border-[#EAE2F2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#5412A5]">
                  Degree
                </th>
                <th className="border-b border-[#EAE2F2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#5412A5]">
                  Level
                </th>
                <th className="border-b border-[#EAE2F2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#5412A5]">
                  Code
                </th>
                <th className="border-b border-[#EAE2F2] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#5412A5]">
                  Study Mode
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={`${course.code}-${course.level}-${index}`}
                  className={`border-b border-[#EAE2F2] transition-colors last:border-0 hover:bg-[#F7F1FC]/60 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#FDFBFF]"
                  }`}
                >
                  <td className="px-4 py-3 text-xs font-semibold text-[#9A93A8]">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-[#242033]">{course.name}</span>
                  </td>
                  <td className="px-4 py-3 text-[#686477]">
                    {course.degree?.trim() || <span className="text-[#9A93A8]">—</span>}
                  </td>
                  <td className="px-4 py-3">{levelBadge(course.level)}</td>
                  <td className="px-4 py-3">
                    {course.code ? (
                      <span className="rounded bg-[#F0EDF8] px-2 py-0.5 text-xs font-mono font-semibold text-[#5412A5]">
                        {course.code}
                      </span>
                    ) : (
                      <span className="text-[#9A93A8]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{modeBadge(course.study_mode)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function UniversityDetailPage({
  university,
  blogs = [],
  suggestedCourses = [],
}: {
  university: UniversityDetail;
  blogs?: Blog[];
  suggestedCourses?: DiscoveryCourse[];
}) {
  const paragraphs = university.paragraphs.filter((item) => item.title || stripPreview(item.content));
  const aboutParagraph = findParagraph(paragraphs, /about/i);
  const highlightsParagraph = findParagraph(paragraphs, /highlight/i);
  const programmesParagraph = findParagraph(paragraphs, /available.*(ug|pg)|online programme/i);
  const eligibilityParagraph = findParagraph(paragraphs, /eligib/i);
  const lmsParagraph = findParagraph(paragraphs, /lms|learning management/i);
  const examParagraph = findParagraph(paragraphs, /exam|evaluat/i);
  const careerParagraph = findParagraph(paragraphs, /career/i);
  const aboutLead =
    university.about.blocks.find((block) => block.type === "p")?.text
    || stripPreview(aboutParagraph?.content || "")
    || "";
  const aboutContent = aboutParagraph?.content || university.about.blocks.map((block) => block.text).join("\n");
  const careerContent = careerParagraph?.content || university.career.blocks.map((block) => block.text).join("\n");
  const activeFaqs = university.faqs.filter((faq) => faq?.is_active !== false && faq.question);
  const similar = university.similar.filter((item) => item.uuid !== university.uuid).slice(0, 4);
  const approvalNames = university.approvals.map((item) => item.name).filter(Boolean);

  const highlightItems = [
    { title: "100% Online", subtitle: "Flexible Learning", Icon: GraduationCap },
    {
      title: "UG & PG Programmes",
      subtitle: "Multiple Disciplines",
      Icon: BookOpen,
    },
    {
      title: "Recognised & Accredited",
      subtitle: approvalNames.slice(0, 4).join(", ") || "Check approvals below",
      Icon: Award,
    },
    { title: "Working Professionals", subtitle: "Learn at Your Pace", Icon: Users },
  ];

  const statCards = [
    university.established ? { label: "Established", value: university.established, Icon: Calendar } : null,
    approvalNames.length ? { label: "Accreditation", value: approvalNames.join(", "), Icon: Building2 } : null,
    university.grade ? { label: "Grade", value: university.grade, Icon: Award } : null,
    { label: "Learning Mode", value: "100% Online", Icon: Laptop },
  ].filter(Boolean) as { label: string; value: string; Icon: typeof Award }[];

  const navTabs: NavTab[] = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Courses" },
    ...(eligibilityParagraph ? [{ id: "eligibility", label: "Eligibility" }] : []),
    ...(university.approvals.length ? [{ id: "approvals", label: "Approvals" }] : []),
    ...(lmsParagraph ? [{ id: "lms", label: "LMS" }] : []),
    ...(examParagraph ? [{ id: "examination", label: "Examination" }] : []),
    ...(activeFaqs.length ? [{ id: "faqs", label: "FAQs" }] : []),
  ];

  const [activeSection, setActiveSection] = useState(navTabs[0]?.id || "overview");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navTabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(tab.id);
        },
        { rootMargin: "-28% 0px -58% 0px", threshold: 0.08 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [navTabs.map((tab) => tab.id).join("|")]);

  return (
    <main id="main" className="bg-[#FAF9FC] text-[#242033]">
      <UniversityHero university={university} lead={aboutLead.slice(0, 180)} />
      <HighlightStrip items={highlightItems} />
      <UniversityNavigation activeSection={activeSection} tabs={navTabs} />

      <div className="era-shell py-8 lg:py-10">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-6 sm:space-y-7">
            {aboutContent ? (
              <section id="overview" className="scroll-mt-28 rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5 sm:p-6">
                <SectionHeading>{aboutParagraph?.title?.trim() || "About the University"}</SectionHeading>
                <div className="mt-4">
                  <ReadMoreText content={aboutContent} />
                </div>
              </section>
            ) : null}

            {statCards.length || highlightsParagraph ? (
              <section className="rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5 sm:p-6">
                <SectionHeading>{highlightsParagraph?.title?.trim() || "University Highlights"}</SectionHeading>
                {/* {statCards.length ? (
                  <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {statCards.map((card) => (
                      <article key={card.label} className="rounded-2xl border border-[#EAE2F2] bg-[#F7F1FC] px-4 py-4 text-center">
                        <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5412A5]">
                          <card.Icon className="h-5 w-5" />
                        </span>
                        <p className="mt-2 text-[12px] font-semibold text-[#686477]">{card.label}</p>
                        <p className="mt-1 text-[13px] font-extrabold leading-snug text-[#242033]">{card.value}</p>
                      </article>
                    ))}
                  </div> */}
                {/* ) : null} */}
                {highlightsParagraph?.content ? (
                  <div className={statCards.length ? "mt-5" : "mt-4"}>
                    <ReadMoreText content={highlightsParagraph.content} />
                  </div>
                ) : null}
              </section>
            ) : null}

            {university.approvals.length ? (
              <section id="approvals" className="scroll-mt-28 rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <SectionHeading>Approvals & Accreditations</SectionHeading>
                  <p className="text-[12px] text-[#686477]">Recognised by leading regulatory bodies</p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {university.approvals.map((item) => (
                    <article key={item.id} className="flex flex-col items-center rounded-2xl border border-[#EAE2F2] bg-white p-4 text-center shadow-sm">
                      {item.logo ? (
                        <Image src={item.logo} alt={item.name} width={72} height={72} className="" unoptimized />
                      ) : (
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F1FC] text-[#5412A5]">
                          <Award className="h-7 w-7" />
                        </span>
                      )}
                      {/* <p className="mt-3 text-[13px] font-extrabold text-[#242033]">{item.name}</p>
                      <p className="mt-1 text-[11px] leading-4 text-[#686477]">
                        {item.description || APPROVAL_BLURB[item.name] || "Recognised approval body"}
                      </p> */}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
            
          
            <UniversityCourses courses={university.courses} tables={university.tables} intro={programmesParagraph} />

            <div className="grid gap-4 ">
              {eligibilityParagraph ? (
                <section id="eligibility" className="scroll-mt-28 rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5">
                  <SectionHeading>Eligibility Criteria</SectionHeading>
                  <div className="mt-4">
                    <ParagraphBody content={eligibilityParagraph.content} />
                  </div>
                </section>
              ) : null}
              {lmsParagraph ? (
                <section id="lms" className="scroll-mt-28 rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5">
                  {/* <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F1FC] text-[#5412A5]"> */}
                    {/* <Laptop className="h-5 w-5" /> */}
                  {/* </div> */}
                  <SectionHeading>{lmsParagraph.title || "Learning Management System (LMS)"}</SectionHeading>
                  <div className="mt-4">
                    <ReadMoreText content={lmsParagraph.content} limit={280} />
                  </div>
                </section>
              ) : null}
              {examParagraph ? (
                <section id="examination" className="scroll-mt-28 rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5">
                  {/* <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F1FC] text-[#5412A5]">
                    <ClipboardCheck className="h-5 w-5" />
                  </div> */}
                  <SectionHeading>{examParagraph.title || "Examination & Evaluation"}</SectionHeading>
                  <div className="mt-4">
                    <ReadMoreText content={examParagraph.content} limit={280} />
                  </div>
                </section>
              ) : null}
              {stripPreview(careerContent) ? (
                <section id="career" className="scroll-mt-28 rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7F1FC] text-[#5412A5]">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <SectionHeading>Career Opportunities</SectionHeading>
                  <div className="mt-4">
                    <ReadMoreText content={careerContent} limit={240} />
                  </div>
                </section>
              ) : null}
            </div>
            <RegularVsOnlineTable universityName={university.name} />

            <TopRatedCoursesTable universityName={university.name} universityUuid={university.uuid} />
            {(university.companies.length || university.recruiters.length) ? (
              <section className="rounded-[1.15rem] border border-[#EAE2F2] bg-white p-5 sm:p-6">
                <SectionHeading>Top Recruiters</SectionHeading>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {(university.companies.length
                    ? university.companies
                    : university.recruiters.map((name) => ({ uuid: name, name, logo: "", website: "" }))
                  ).map((company) => {
                    const cardClass = "flex flex-col items-center rounded-2xl border border-[#EAE2F2] bg-[#F7F1FC] px-3 py-4 transition hover:border-[#5412A5]/30";
                    const inner = (
                      <>
                        <CompanyMark name={company.name} logo={company.logo} />
                        <span className="mt-2 line-clamp-2 text-center text-[12px] font-semibold leading-4 text-[#242033]">{company.name}</span>
                      </>
                    );
                    return company.website ? (
                      <a key={company.uuid || company.name} href={company.website} target="_blank" rel="noreferrer" className={cardClass}>
                        {inner}
                      </a>
                    ) : (
                      <div key={company.uuid || company.name} className={cardClass}>
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <FAQSection faqs={activeFaqs} name={university.name} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <EnquiryForm
              university={university}
              programmes={[...university.courses, ...programmesFromTables(university.tables)]}
            />

            {blogs.length ? (
              <SidebarCard title="Latest Blogs" href="/blogs">
                <ul className="space-y-3">
                  {blogs.map((blog) => (
                    <li key={blog.uuid}>
                      <Link href={`/blogs/${blog.slug}`} className="flex gap-3 rounded-xl p-1 transition hover:bg-[#F7F1FC]">
                        <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F7F1FC]">
                          <Image src={resolveBlogImageUrl(blog.featured_image)} alt="" fill className="object-cover" unoptimized />
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-[13px] font-bold leading-snug text-[#242033]">{blog.title}</span>
                          <span className="mt-1 block text-[11px] text-[#686477]">{formatBlogDate(blog.published_at || blog.created_at)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            ) : null}

            {similar.length ? (
              <SidebarCard title="Suggested Universities" href="/universities">
                <ul className="space-y-3">
                  {similar.map((item: DiscoveryUniversity) => (
                    <li key={item.uuid}>
                      <Link href={`/universities/${item.uuid}`} className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-[#F7F1FC]">
                        <span className="inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#F7F1FC]">
                          {item.logo ? (
                            <Image src={item.logo} alt="" width={40} height={40} className="h-full w-full object-contain p-1" unoptimized />
                          ) : (
                            <Building2 className="m-auto h-4 w-4 text-[#5412A5]" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-[13px] font-bold text-[#242033]">{item.name}</span>
                          {item.location ? <span className="mt-0.5 block truncate text-[11px] text-[#686477]">{item.state || item.location}</span> : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            ) : null}

            {suggestedCourses.length ? (
              <SidebarCard title="Suggested Courses" href="/courses/filtered">
                <ul className="space-y-3">
                  {suggestedCourses.map((course) => (
                    <li key={course.id}>
                      <Link href={`/courses/${course.slug || course.id}`} className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-[#F7F1FC]">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F7F1FC] text-[#5412A5]">
                          <BookOpen className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-[13px] font-bold text-[#242033]">{course.title}</span>
                          <span className="mt-0.5 block text-[11px] text-[#686477]">{course.level} · {course.studyMode}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            ) : null}
          </aside>
        </div>
      </div>

      <section className="relative overflow-hidden py-10 text-white" style={{ background: `linear-gradient(110deg, ${C.primary} 0%, ${C.secondary} 46%, ${C.magenta} 100%)` }}>
        <div className="era-shell relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">Ready to start at {university.name}?</h2>
            <p className="mt-2 max-w-xl text-sm text-white/85">
              Talk to a counsellor now and get guidance on programmes, eligibility and the admission process.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href={APPLY_HREF} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-[#5412A5]">
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={APPLY_HREF} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/70 px-6 text-sm font-extrabold text-white">
              <Headset className="h-4 w-4" />
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const COMPARISON_ROWS = [
  {
    label: "Learning Mode",
    Icon: Laptop,
    regular: "Classroom-based, physical attendance",
    online: "100% online, learn from anywhere",
  },
  {
    label: "Flexibility",
    Icon: Calendar,
    regular: "Fixed schedule, less flexible",
    online: "Highly flexible, study at your own pace",
  },
  {
    label: "Class Delivery",
    Icon: MonitorPlay,
    regular: "Live classes on campus",
    online: "Live + recorded classes, anytime access",
  },
  {
    label: "Program Duration",
    Icon: Clock3,
    regular: "Typically 2 years (MBA)",
    online: "2 years (MBA) – as per UGC guidelines",
  },
  {
    label: "Eligibility",
    Icon: User,
    regular: "Bachelor’s degree from a recognized university",
    online: "Bachelor’s degree from a recognized university",
  },
  {
    label: "Recognition",
    Icon: Award,
    regular: "UGC recognized",
    online: "UGC Entitled & NAAC A+ Accredited",
  },
  {
    label: "Cost",
    Icon: Wallet,
    regular: "Generally higher (tuition + hostel + other costs)",
    online: "More affordable and cost-effective",
  },
  {
    label: "Career Value",
    Icon: Briefcase,
    regular: "Good for traditional and location-specific roles",
    online: "Equally valid, widely accepted by employers",
  },
];

function RegularVsOnlineTable({ universityName }: { universityName: string }) {
  return (
    <section className="overflow-hidden rounded-[10px] border border-[#5B2A9A] bg-white shadow-sm">
      {/* <div
        className="flex items-center justify-center gap-2 px-4 py-3 text-center text-white"
        style={{ background: `linear-gradient(90deg, #5A1FA8 0%, ${C.primary} 55%, #6D28D9 100%)` }}
      >
        <Scale className="h-5 w-5 shrink-0 text-[#F6C445]" />
        <h2 className="text-[15px] font-extrabold leading-snug sm:text-lg">
          Difference Between <span className="text-[#F6C445]">Regular University</span> Vs{" "}
          <span className="text-[#F6C445]">Online University</span> Degree Program
        </h2>
      </div> */}

<div className="overflow-x-auto rounded-[10px] border border-[#E4D8F2] bg-white shadow-sm">
  <table className="w-full  border-collapse text-left text-sm">
    <thead>
      <tr className="border-b border-[#E4D8F2] bg-[#F4EEFB]">
        <th className="w-[22%] px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#5B21B6]">
          Parameters
        </th>
        <th className="w-[39%] px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#5B21B6]">
          Regular University Degree (On-Campus)
        </th>
        <th className="bg-[#5B21B6] px-5 py-4 text-xs font-bold uppercase tracking-wide text-white">
          Online University Degree
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-[#EEE6F7]">
      {COMPARISON_ROWS.map((row) => (
        <tr key={row.label} className="">
          <td className="px-5 py-4 align-top font-semibold text-[#2A2140]">
            <span className="inline-flex text-[12px] items-center gap-2.5">
              <span className="flex shrink-0 items-center justify-center rounded-md bg-[#F4EEFB]">
                <row.Icon className="h-4 w-4 text-[#5B21B6]" />
              </span>
              {row.label}
            </span>
          </td>
          <td className="px-5 py-4 align-top text-[12px] leading-relaxed text-[#6B6480]">
            {row.regular}
          </td>
          <td className="bg-[#FAF7FD] px-5 py-4 text-[12px] align-top font-medium leading-relaxed text-[#2A2140] group-hover:bg-[#F4EEFB]">
            {row.online}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </section>
  );
}
