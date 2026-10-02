import Link from "next/link";
import type { ReactNode } from "react";

type CareerCategory = {
  name: string;
  courses: [string, string, string];
  href: string;
  card: string;
  iconBox: string;
  arrow: string;
  icon: ReactNode;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  fillOpacity: 0.18,
  className: "h-6 w-6",
  "aria-hidden": true,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CATEGORIES: CareerCategory[] = [
  {
    name: "Engineering",
    courses: ["B.Tech", "M.Tech", "Diploma"],
    href: "/programs/undergraduate",
    card: "bg-gradient-to-br from-white via-sky-50/60 to-sky-100/70 border-sky-100 hover:border-sky-300",
    iconBox: "bg-blue-100/80 text-blue-600",
    arrow: "text-blue-600",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
      </svg>
    ),
  },
  {
    name: "Management",
    courses: ["BBA", "MBA", "PGDM"],
    href: "/programs/postgraduate",
    card: "bg-gradient-to-br from-white via-rose-50/60 to-rose-100/70 border-rose-100 hover:border-rose-300",
    iconBox: "bg-red-100/80 text-red-600",
    arrow: "text-red-600",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
        <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17" />
      </svg>
    ),
  },
  {
    name: "Medical",
    courses: ["MBBS", "BDS", "Nursing"],
    href: "/programs/undergraduate",
    card: "bg-gradient-to-br from-white via-emerald-50/60 to-emerald-100/70 border-emerald-100 hover:border-emerald-300",
    iconBox: "bg-teal-100/80 text-teal-600",
    arrow: "text-teal-600",
    icon: (
      <svg {...iconProps}>
        <path d="M6 4v5a4 4 0 0 0 8 0V4" />
        <path d="M10 13v2a4 4 0 0 0 8 0v-1.5" />
        <circle cx="18" cy="11.5" r="2" />
      </svg>
    ),
  },
  {
    name: "Commerce",
    courses: ["B.Com", "M.Com", "CA"],
    href: "/programs/postgraduate",
    card: "bg-gradient-to-br from-white via-orange-50/60 to-orange-100/70 border-orange-100 hover:border-orange-300",
    iconBox: "bg-orange-100/80 text-orange-500",
    arrow: "text-orange-500",
    icon: (
      <svg {...iconProps}>
        <path d="M4 20V10M10 20V5M16 20v-7M21 20H3" />
      </svg>
    ),
  },
  {
    name: "Law",
    courses: ["LLB", "LLM", "BA LLB"],
    href: "/programs/undergraduate",
    card: "bg-gradient-to-br from-white via-violet-50/60 to-violet-100/70 border-violet-100 hover:border-violet-300",
    iconBox: "bg-violet-100/80 text-violet-600",
    arrow: "text-violet-600",
    icon: (
      <svg {...iconProps}>
        <path d="M12 4v16M8 20h8M5 7h14M5 7l-2.5 6a2.5 2.5 0 0 0 5 0L5 7ZM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7Z" />
      </svg>
    ),
  },
  {
    name: "Design",
    courses: ["B.Des", "Fashion Design", "Interior Design"],
    href: "/programs/undergraduate",
    card: "bg-gradient-to-br from-white via-red-50/60 to-orange-100/60 border-red-100 hover:border-red-300",
    iconBox: "bg-orange-100/80 text-orange-600",
    arrow: "text-orange-600",
    icon: (
      <svg {...iconProps}>
        <path d="m14.5 4.5 5 5L9 20H4v-5L14.5 4.5Z" />
        <path d="m12.5 6.5 5 5" />
      </svg>
    ),
  },
  {
    name: "IT & Computer",
    courses: ["BCA", "MCA", "Data Science"],
    href: "/programs/undergraduate",
    card: "bg-gradient-to-br from-white via-blue-50/60 to-indigo-100/70 border-blue-100 hover:border-blue-300",
    iconBox: "bg-blue-100/80 text-blue-800",
    arrow: "text-blue-800",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4.5" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16.5V20" />
      </svg>
    ),
  },
  {
    name: "Arts & Humanities",
    courses: ["BA", "MA", "Psychology"],
    href: "/programs/undergraduate",
    card: "bg-gradient-to-br from-white via-amber-50/60 to-amber-100/70 border-amber-100 hover:border-amber-300",
    iconBox: "bg-amber-100/80 text-amber-600",
    arrow: "text-amber-600",
    icon: (
      <svg {...iconProps}>
        <path d="M12 4a8 8 0 1 0 0 16c1.1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5s.8-1.5 2-1.5H17a3 3 0 0 0 3-3C20 7.4 16.4 4 12 4Z" />
        <circle cx="8" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="11" cy="7.8" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="8.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export function CoursesSection() {
  return (
    <section className="bg-white py-10 lg:py-14" aria-labelledby="explore-courses-heading">
      <div className="era-shell">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" aria-hidden />
              Explore Courses
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
                className={`group flex h-full min-h-[11.5rem] flex-col rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(23,19,74,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-era-primary focus-visible:ring-offset-2 ${category.card}`}
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${category.iconBox}`}
                >
                  {category.icon}
                </span>
                <h3 className="mt-3 text-[12px] font-bold leading-snug text-era-dark">{category.name}</h3>
                <ul className="mt-2.5 mb-3 space-y-1.5">
                  {category.courses.map((course) => (
                    <li key={course} className="flex items-center gap-2 text-[12px] text-slate-600">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden />
                      <span className="truncate">{course}</span>
                    </li>
                  ))}
                </ul>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`mt-auto h-4 w-4 self-end text-gray-600 transition-transform group-hover:translate-x-0.5`}
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
