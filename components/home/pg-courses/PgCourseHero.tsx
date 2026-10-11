import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PgCategory } from "./categories";

const DIPLOMA_IMAGE = "/assets/pg-courses/graduation-books-diploma.png";

function StatIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1EDFF] text-[#5B4DFF]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        {children}
      </svg>
    </span>
  );
}

function splitTitle(title: string) {
  const parts = title.trim().split(/\s+/);
  if (parts.length < 2) return { lead: "", accent: title };
  return { lead: parts[0], accent: parts.slice(1).join(" ") };
}

const STATS = [
  {
    label: "1000+ Universities",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="3" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    label: "92+ Specializations",
    icon: (
      <>
        <circle cx="12" cy="9" r="4" />
        <path d="m8.8 12.4-1 6.6 4.2-2.3 4.2 2.3-1-6.6" />
      </>
    ),
  },
  {
    label: "Compare Side by Side",
    icon: (
      <>
        <path d="m12 3 2.2 4.6 5 .7-3.6 3.5.9 5.1L12 14.8 7.5 16.9l.9-5.1L4.8 8.3l5-.7L12 3Z" />
      </>
    ),
  },
];

export function PgCourseHero({ category }: { category: PgCategory }) {
  const { lead, accent } = splitTitle(category.title);

  return (
    <div className="relative overflow-hidden">
      <div className="relative grid items-center gap-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-6">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="text-[12.5px] text-[#8B93A7]">
            <Link href="/" className="transition hover:text-[#5B4DFF]">Home</Link>
            <span className="mx-1.5" aria-hidden>›</span>
            <span className="font-medium text-[#5B4DFF]">{category.title}</span>
          </nav>

          <h2
            id="course-discovery-heading"
            className="mt-2 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#1B1448] sm:text-[42px]"
          >
            {lead ? <span>{lead} </span> : null}
            <span className="bg-[linear-gradient(90deg,#4F46E5_0%,#7C6BFF_55%,#60A5FA_100%)] bg-clip-text text-transparent">
              {accent}
            </span>
          </h2>
        
        </div>

      </div>
    </div>
  );
}
