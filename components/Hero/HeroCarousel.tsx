"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";

const QUICK_LINKS = [
  { label: "Colleges", href: "/universities" },
  { label: "Courses", href: "/programs" },
  { label: "Exams", href: "/search?q=Exams" },
  { label: "Admissions", href: "/programs" },
];

const STATS = [
  { value: "10,000+", label: "Colleges" },
  { value: "50,000+", label: "Courses" },
  { value: "100+", label: "Exams" },
  { value: "1M+", label: "Students Guided" },
];

const ACTIONS = [
  { label: "Compare Colleges", href: "/compare" },
  { label: "Check Eligibility", href: "#eligibility-checker" },
  { label: "Talk to Experts", href: "/tools/course-finder" },
  { label: "Apply with Guidance", href: "/tools/course-finder" },
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
    <section className="relative overflow-hidden bg-[linear-gradient(110deg,#FFF7FB_0%,#F7F1FF_48%,#FFF5FA_100%)]" aria-labelledby="hero-heading">
      <span aria-hidden className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-[#F20D70]/10 blur-2xl" />
      <span aria-hidden className="pointer-events-none absolute right-[18%] top-0 h-56 w-56 rounded-full bg-[#35066F]/10 blur-3xl" />

      <div className="era-shell grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:py-10">
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

          <form onSubmit={onSearch} className="mt-5 flex max-w-[560px] flex-col gap-2 sm:flex-row">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Search college, course, exam or location</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search college, course, exam or location..."
                className="h-12 w-full rounded-xl border border-[#F0D7E6] bg-white px-4 text-sm text-[#35066F] outline-none transition placeholder:text-[#A394AB] focus:border-[#35066F] focus:ring-2 focus:ring-[#F1ECFF]"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#35066F] px-6 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(53,6,111,0.22)] transition hover:bg-[#4A0A96]"
            >
              Search
            </button>
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full border border-[#F3D5E6] bg-white px-3 py-1 text-[12px] font-semibold text-[#35066F] transition hover:border-[#F20D70] hover:text-[#F20D70]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((stat) => (
              <li key={stat.label}>
                <p className="text-[18px] font-extrabold text-[#35066F]">{stat.value}</p>
                <p className="text-[11.5px] text-[#6B6280]">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <p className="absolute right-2 top-2 z-10 hidden rotate-6 font-serif text-[15px] text-[#F20D70] sm:block" style={{ fontFamily: "Georgia, 'Segoe Script', cursive" }}>
            Your Future
            <span className="block">Our Guidance</span>
          </p>
          <div className="relative h-[320px] sm:h-[380px]">
            <span aria-hidden className="absolute inset-x-8 bottom-4 top-8 rounded-[40%_60%_45%_55%] bg-[linear-gradient(160deg,#FDE7F3,#E9DEFF)]" />
            <Image
              src="/hero/boy.png"
              alt="Student ready to start a college search"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-contain object-bottom"
            />
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {ACTIONS.map((action) => (
              <li key={action.label}>
                <Link
                  href={action.href}
                  className="flex items-center gap-2 rounded-xl border border-[#F3E4EE] bg-white px-3 py-2 text-[12px] font-semibold text-[#35066F] shadow-[0_4px_12px_rgba(53,6,111,0.05)] transition hover:-translate-y-px hover:border-[#F20D70]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0F6] text-[#F20D70]">
                    <ActionIcon>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </ActionIcon>
                  </span>
                  {action.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
