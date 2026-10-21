"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";

const ICON_PATHS = {
  college: (
    <>
      <path d="M3 21h18" />
      <path d="M4 10h16" />
      <path d="m12 3 9 7H3l9-7Z" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5a2 2 0 0 1 4 0v5" />
    </>
  ),
  course: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  exam: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3h6v1" />
      <path d="M9 10h6M9 14h4" />
    </>
  ),
  pen: (
    <>
      <path d="m15 4 5 5L9 20H4v-5L15 4Z" />
      <path d="m12.5 6.5 5 5" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14-2 7 5-3 5 3-2-7" />
      <path d="m10 9 1.5 1.5L14.5 7.5" />
    </>
  ),
  students: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M15 14.5c.6-.3 1.3-.5 2-.5 2.5 0 4 1.8 4 4.5" />
    </>
  ),
  clipboardCheck: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3h6v1" />
      <path d="m9 13 2 2 4-4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>
  ),
  cap: (
    <>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v6" />
    </>
  ),
} satisfies Record<string, ReactNode>;

type HeroIconName = keyof typeof ICON_PATHS;

const QUICK_LINKS: { label: string; href: string; icon: HeroIconName; color: string }[] = [
  { label: "Colleges", href: "/universities", icon: "college", color: "text-[#2563EB]" },
  { label: "Courses", href: "/programs", icon: "course", color: "text-[#F20D70]" },
  { label: "Exams", href: "/search?q=Exams", icon: "exam", color: "text-[#6D28D9]" },
  { label: "Admissions", href: "/programs", icon: "badge", color: "text-[#4F46E5]" },
];

const STATS: { value: string; label: string; icon: HeroIconName }[] = [
  { value: "10,000+", label: "Colleges", icon: "home" },
  { value: "50,000+", label: "Courses", icon: "course" },
  { value: "100+", label: "Exams", icon: "pen" },
  { value: "1M+", label: "Students Guided", icon: "students" },
];

function HeroIcon({ name, className }: { name: HeroIconName; className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {ICON_PATHS[name]}
    </svg>
  );
}

const ACTIONS: { label: string; href: string; icon: HeroIconName; tile: string }[] = [
  { label: "Compare Colleges", href: "/compare", icon: "college", tile: "bg-[#FFE4F0] text-[#F20D70]" },
  { label: "Check Eligibility", href: "#eligibility-checker", icon: "clipboardCheck", tile: "bg-[#FFEFD9] text-[#F59E0B]" },
  { label: "Talk to Experts", href: "/tools/course-finder", icon: "user", tile: "bg-[#E2ECFF] text-[#2563EB]" },
  { label: "Apply with Guidance", href: "/tools/course-finder", icon: "badge", tile: "bg-[#EDE5FF] text-[#6D28D9]" },
];

function ActionIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
      {children}
    </svg>
  );
}

export function HeroCarousel() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FBF7FF]" aria-labelledby="hero-heading">
      <Image
        src="/hero/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[78%_center]"
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-white/80 lg:hidden" />

      <div className="era-shell grid items-center gap-8 py-8 lg:min-h-[460px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_230px] lg:py-10">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F20D70]">
            Your admission journey starts here
          </p>
          <h1 id="hero-heading" className="mt-2 max-w-[640px] text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#35066F] sm:text-[46px]">
            Find Your Right
            <span className="block text-[#F20D70]">College &amp; Course</span>
          </h1>
          <p className="mt-3 max-w-[520px] text-[13.5px] leading-6 text-[#5C5470] sm:text-sm">
            Discover colleges, explore courses, compare your options and get personalised admission guidance — all in one place.
          </p>

          <form
            onSubmit={onSearch}
            role="search"
            className="mt-5 flex h-14 max-w-[560px] items-center gap-2 rounded-2xl border border-[#EEE6F7] bg-white py-1.5 pl-4 pr-1.5 shadow-[0_10px_30px_rgba(53,6,111,0.08)] transition focus-within:border-[#35066F]/40 focus-within:ring-4 focus-within:ring-[#F1ECFF]"
          >
            <span className="shrink-0 text-[#35066F]">
              <ActionIcon>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </ActionIcon>
            </span>
            <label className="min-w-0 flex-1">
              <span className="sr-only">Search college, course, exam or location</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search college, course, exam or location..."
                className="h-11 w-full bg-transparent text-sm text-[#35066F] outline-none placeholder:text-[#8A8299] [&::-webkit-search-cancel-button]:hidden"
              />
            </label>
            <button
              type="submit"
              aria-label="Search"
              className="inline-flex h-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#35066F] px-4 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(53,6,111,0.25)] transition hover:bg-[#4A0A96] sm:px-6"
            >
              <ActionIcon>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </ActionIcon>
              <span className="hidden min-[380px]:inline">Search</span>
            </button>
          </form>

          <nav aria-label="Explore by" className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[12px] font-semibold text-[#1F1B3A]">Explore by</span>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#1F1B3A] transition hover:text-[#F20D70]"
              >
                <HeroIcon name={link.icon} className={`h-[18px] w-[18px] ${link.color}`} />
                {link.label}
              </Link>
            ))}
          </nav>

          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <li key={stat.label} className="flex items-center gap-2.5">
                <HeroIcon name={stat.icon} className="h-7 w-7 shrink-0 text-[#F20D70]" />
                <div className="min-w-0">
                  <p className="text-[18px] font-extrabold leading-tight text-[#1F1B3A]">{stat.value}</p>
                  <p className="text-[11.5px] leading-tight text-[#6B6280]">{stat.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p
          className="hidden -rotate-6 self-start pt-4 text-[22px] leading-tight text-[#F20D70] lg:block"
          style={{ fontFamily: "'Segoe Script', 'Brush Script MT', cursive" }}
        >
          Your
          <span className="block pl-3">Future</span>
          <span className="block">Our Guidance</span>
        </p>

        <div className="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:grid-cols-1">
          <nav aria-label="Quick actions" className="rounded-2xl bg-white/95 p-2 shadow-[0_16px_40px_rgba(53,6,111,0.16)] ring-1 ring-white/70 backdrop-blur">
            <ul className="grid grid-cols-2 gap-1 lg:grid-cols-1">
              {ACTIONS.map((action) => (
                <li key={action.label}>
                  <Link
                    href={action.href}
                    className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[12.5px] font-semibold text-[#1F1B3A] outline-none transition hover:bg-[#FFF3F8] focus-visible:ring-2 focus-visible:ring-[#F20D70]/40"
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition group-hover:scale-105 ${action.tile}`}>
                      <HeroIcon name={action.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 transition group-hover:text-[#F20D70]">{action.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#FFF0F7_0%,#FFE1EF_100%)] p-3.5 shadow-[0_16px_40px_rgba(242,13,112,0.14)] ring-1 ring-white/70">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#F20D70] shadow-[0_4px_10px_rgba(242,13,112,0.18)]">
              <HeroIcon name="cap" className="h-5 w-5" />
            </span>
            <p className="min-w-0 text-[13.5px] font-extrabold leading-tight text-[#35066F]">
              Dream College
              <span className="mt-0.5 block text-[11px] font-medium text-[#6B6280]">is Closer Than You Think</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
