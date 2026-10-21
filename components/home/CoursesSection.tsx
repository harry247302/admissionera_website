import Link from "next/link";
import type { ReactNode } from "react";

type CareerCategory = {
  name: string;
  courses: [string, string, string];
  href: string;
  card: string;
  accent: string;
  dot: string;
  icon: ReactNode;
};

const iconClass = "h-[26px] w-[26px]";

const CATEGORIES: CareerCategory[] = [
  {
    name: "Engineering",
    courses: ["B.Tech", "M.Tech", "Diploma"],
    href: "/programs/undergraduate",
    card: "border-[#E3EAFB] bg-gradient-to-br from-[#F8FAFF] to-[#EAF0FE] hover:border-[#BFD0F7]",
    accent: "text-[#2563EB]",
    dot: "bg-[#2563EB]",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path
          fillRule="evenodd"
          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2ZM15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"
        />
      </svg>
    ),
  },
  {
    name: "Management",
    courses: ["BBA", "MBA", "PGDM"],
    href: "/programs/postgraduate",
    card: "border-[#FBE3E9] bg-gradient-to-br from-[#FFF9FA] to-[#FDECF0] hover:border-[#F6BFCC]",
    accent: "text-[#E11D48]",
    dot: "bg-[#E11D48]",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <circle cx="7" cy="4.5" r="2.5" />
        <path d="M3 21v-7.5A3.5 3.5 0 0 1 6.5 10h1A3.5 3.5 0 0 1 11 13.5V21H3Z" />
        <rect x="12.5" y="14" width="3" height="7" rx="0.8" />
        <rect x="17" y="10" width="3" height="11" rx="0.8" />
        <path
          d="m12 9 3.5-3.5 2 2L21.5 3.5M18.5 3.5h3v3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Medical",
    courses: ["MBBS", "BDS", "Nursing"],
    href: "/programs/undergraduate",
    card: "border-[#DDF3E6] bg-gradient-to-br from-[#F7FDF9] to-[#E6F7EE] hover:border-[#B5E5CA]",
    accent: "text-[#16A34A]",
    dot: "bg-[#16A34A]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
        <path d="M8 15a6 6 0 0 0 12 0v-3" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    ),
  },
  {
    name: "Commerce",
    courses: ["B.Com", "M.Com", "CA"],
    href: "/programs/postgraduate",
    card: "border-[#FCEBDD] bg-gradient-to-br from-[#FFFBF7] to-[#FEF1E6] hover:border-[#F8CFAE]",
    accent: "text-[#F97316]",
    dot: "bg-[#F97316]",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <circle cx="12" cy="12" r="7.2" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
        <path
          d="M9 8h6M9 10.5h6M11 8c3.2 0 3.2 5 0 5H9.5l4.5 4"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Law",
    courses: ["LLB", "LLM", "BA LLB"],
    href: "/programs/undergraduate",
    card: "border-[#E9E4FB] bg-gradient-to-br from-[#FAF9FF] to-[#EFEBFD] hover:border-[#CFC4F6]",
    accent: "text-[#7C3AED]",
    dot: "bg-[#7C3AED]",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <g transform="rotate(-45 12 10)">
          <rect x="7" y="2" width="10" height="6" rx="1.2" />
          <rect x="6" y="1" width="2.5" height="8" rx="0.8" />
          <rect x="15.5" y="1" width="2.5" height="8" rx="0.8" />
          <rect x="10.8" y="8" width="2.4" height="11" rx="1.2" />
        </g>
        <rect x="2" y="19.5" width="11" height="2.5" rx="1" />
      </svg>
    ),
  },
  {
    name: "Design",
    courses: ["B.Des", "Fashion Design", "Interior Design"],
    href: "/programs/undergraduate",
    card: "border-[#FBE2EA] bg-gradient-to-br from-[#FFF9FB] to-[#FDEBF1] hover:border-[#F5BED0]",
    accent: "text-[#E11D63]",
    dot: "bg-[#E11D63]",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3A4.7 4.7 0 0 0 22 10.7C22 5.9 17.5 2 12 2Z"
        />
        <circle cx="6.8" cy="11.5" r="1.5" fill="#fff" />
        <circle cx="9.2" cy="7" r="1.5" fill="#fff" />
        <circle cx="14.6" cy="6.8" r="1.5" fill="#fff" />
        <circle cx="17.8" cy="10.6" r="1.5" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "IT & Computer",
    courses: ["BCA", "MCA", "Data Science"],
    href: "/programs/undergraduate",
    card: "border-[#E0E8FB] bg-gradient-to-br from-[#F8FAFF] to-[#E8EFFD] hover:border-[#BCCDF5]",
    accent: "text-[#1D4ED8]",
    dot: "bg-[#1D4ED8]",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <rect x="4" y="5" width="16" height="9.5" rx="0.8" fill="#fff" opacity="0.3" />
        <rect x="10.5" y="17" width="3" height="3" />
        <rect x="7" y="19.5" width="10" height="2" rx="1" />
      </svg>
    ),
  },
  {
    name: "Arts & Humanities",
    courses: ["BA", "MA", "Psychology"],
    href: "/programs/undergraduate",
    card: "border-[#FCE7DB] bg-gradient-to-br from-[#FFFAF6] to-[#FEEFE5] hover:border-[#F8C9AE]",
    accent: "text-[#EF4444]",
    dot: "bg-[#F97316]",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="currentColor"
          d="M1.5 4.5A1.5 1.5 0 0 1 3 3h5a3.5 3.5 0 0 1 3.3 2.3V21a3 3 0 0 0-2.6-1.5H3a1.5 1.5 0 0 1-1.5-1.5v-13.5ZM22.5 4.5A1.5 1.5 0 0 0 21 3h-5a3.5 3.5 0 0 0-3.3 2.3V21a3 3 0 0 1 2.6-1.5H21a1.5 1.5 0 0 0 1.5-1.5v-13.5Z"
        />
        <path
          d="M4.5 7.5h4M4.5 10.5h4M4.5 13.5h4M15.5 7.5h4M15.5 10.5h4M15.5 13.5h4"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function CoursesSection() {
  return (
    <section className="py-10 lg:py-3" aria-labelledby="explore-courses-heading">
      <div className="era-shell">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f8035c]">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-600" aria-hidden />
              Top Courses
            </p>
            <h2
              id="explore-courses-heading"
              className="mt-1.5 text-2xl font-bold tracking-[-0.02em] text-era-dark sm:text-[1.65rem]"
            >
              Explore Courses by Career
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Find the right course that matches your interest and career goals.
            </p>
          </div>
          <Link
            href="/programs"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md text-sm font-semibold text-red-600 transition hover:gap-2.5 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:mt-5"
          >
            View All Courses <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8">
          {CATEGORIES.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                aria-label={`Explore ${category.name} courses: ${category.courses.join(", ")}`}
                className={`group relative flex h-full flex-col rounded-xl border px-3.5 pb-4 pt-[18px] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,19,74,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-era-primary focus-visible:ring-offset-2 ${category.card}`}
              >
                <span className={category.accent}>{category.icon}</span>
                <h3 className="mt-3.5 text-[12.5px] font-bold leading-snug text-era-dark">
                  {category.name}
                </h3>
                <ul className="mt-2 space-y-[7px]">
                  {category.courses.map((course) => (
                    <li
                      key={course}
                      className="flex items-center gap-[7px] text-[11.5px] leading-tight text-slate-700 last:pr-4"
                    >
                      <span className={`h-[5px] w-[5px] shrink-0 rounded-full ${category.dot}`} aria-hidden />
                      <span className="whitespace-nowrap">{course}</span>
                    </li>
                  ))}
                </ul>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`absolute bottom-[15px] right-2.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 ${category.accent}`}
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
