import Link from "next/link";
import { SectionHeading, SectionLead } from "./SectionHeading";

const COURSES = [
  {
    name: "Engineering",
    description: "B.Tech, M.Tech and more",
    href: "/programs/undergraduate",
    accent: "from-violet-500/15 to-fuchsia-500/10 text-violet-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M14.5 5.5 18.5 9.5 9 19H5v-4L14.5 5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m12.8 7.2 4 4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Management",
    description: "MBA, BBA and more",
    href: "/programs/postgraduate",
    accent: "from-fuchsia-500/15 to-pink-500/10 text-fuchsia-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M4 19V10h4v9M10 19V5h4v14M16 19v-7h4v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Medical",
    description: "MBBS, BAMS and more",
    href: "/programs/undergraduate",
    accent: "from-pink-500/15 to-rose-500/10 text-pink-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M8.5 4.5h7v4.2h4.2v7H15.5V20h-7v-4.3H4.3v-7h4.2V4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Law",
    description: "LLB, LLM and more",
    href: "/programs/undergraduate",
    accent: "from-indigo-500/15 to-violet-500/10 text-indigo-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M12 4v16M6.5 8.5 12 6l5.5 2.5M5 14.5c0-1.5 1.6-2.5 3.5-2.5S12 13 12 14.5 10.4 17 8.5 17 5 16 5 14.5Zm7 0c0-1.5 1.6-2.5 3.5-2.5s3.5 1 3.5 2.5S17.4 17 15.5 17 12 16 12 14.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Design",
    description: "B.Des, M.Des and more",
    href: "/programs/undergraduate",
    accent: "from-purple-500/15 to-fuchsia-500/10 text-purple-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M12 4c-3.5 2.4-5.8 5.5-5.8 8.6A5.8 5.8 0 0 0 12 18.4a5.8 5.8 0 0 0 5.8-5.8C17.8 9.5 15.5 6.4 12 4Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="10.2" cy="11.2" r="1" fill="currentColor" />
        <circle cx="13.5" cy="10.2" r="1" fill="currentColor" />
        <circle cx="12.4" cy="13.4" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Science",
    description: "B.Sc, M.Sc and more",
    href: "/programs/undergraduate",
    accent: "from-cyan-500/10 to-violet-500/10 text-cyan-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M9 4h6M10 4v5.2L5.8 18.2A2.2 2.2 0 0 0 7.7 21h8.6a2.2 2.2 0 0 0 1.9-2.8L14 9.2V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Arts",
    description: "BA, MA and more",
    href: "/programs/undergraduate",
    accent: "from-rose-500/12 to-orange-500/10 text-rose-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M6 19V7.5L12 5l6 2.5V19" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 19v-5h6v5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Commerce",
    description: "B.Com, M.Com and more",
    href: "/programs/postgraduate",
    accent: "from-amber-500/12 to-fuchsia-500/10 text-amber-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <rect x="4" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 10h16" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function CoursesSection() {
  return (
    <section className="bg-era-lavender/80 py-16 lg:py-24">
      <div className="era-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading>Popular Courses</SectionHeading>
            <SectionLead>
              Explore career-focused programs and discover the right path for your future.
            </SectionLead>
          </div>
          <Link href="/programs" className="era-link shrink-0">
            View All Courses <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course) => (
            <Link
              key={course.name}
              href={course.href}
              className="era-card-lift group rounded-3xl border border-violet-100 bg-white p-5 shadow-[0_10px_30px_rgba(23,19,74,0.04)]"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${course.accent}`}
              >
                {course.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-era-dark">{course.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{course.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-era-secondary transition-all group-hover:gap-2 group-hover:text-era-magenta">
                Explore <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
