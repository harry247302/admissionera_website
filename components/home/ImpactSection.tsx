"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

type DeadlineCategory = "UG" | "PG" | "MBA" | "Engineering" | "Medical";
type DeadlineFilter = "All" | DeadlineCategory;

type Deadline = {
  title: string;
  stage: string;
  date: string;
  daysLeft: number;
  categories: DeadlineCategory[];
};

type Scholarship = {
  title: string;
  amount: string;
  eligibility: string;
  icon: ReactNode;
  iconTone: string;
};

type PopularCourse = {
  name: string;
  searches: number;
};

const DEADLINE_FILTERS: DeadlineFilter[] = ["All", "UG", "PG", "MBA", "Engineering", "Medical"];

const DEADLINES: Deadline[] = [
  { title: "DU Admission", stage: "Undergraduate", date: "15 June 2027", daysLeft: 24, categories: ["UG"] },
  { title: "CUET 2027", stage: "Registration", date: "30 June 2027", daysLeft: 30, categories: ["UG"] },
  { title: "JEE Main 2027", stage: "Application", date: "10 July 2027", daysLeft: 48, categories: ["UG", "Engineering"] },
  { title: "CAT 2027", stage: "Registration", date: "20 Sept 2027", daysLeft: 62, categories: ["PG", "MBA"] },
  { title: "NEET UG 2027", stage: "Application", date: "12 Mar 2027", daysLeft: 71, categories: ["UG", "Medical"] },
  { title: "GATE 2028", stage: "Application", date: "28 Sept 2027", daysLeft: 80, categories: ["PG", "Engineering"] },
  { title: "NEET PG 2027", stage: "Registration", date: "05 Apr 2027", daysLeft: 92, categories: ["PG", "Medical"] },
  { title: "XAT 2028", stage: "Registration", date: "30 Nov 2027", daysLeft: 104, categories: ["MBA"] },
];

const SCHOLARSHIPS: Scholarship[] = [
  {
    title: "Merit Scholarship",
    amount: "Up to ₹50,000",
    eligibility: "75%+ in 12th",
    iconTone: "bg-[#FFF1E6] text-[#F97316]",
    icon: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
      </>
    ),
  },
  {
    title: "Need Based",
    amount: "Up to ₹1,00,000",
    eligibility: "Family income < 5L",
    iconTone: "bg-[#E8F1FF] text-[#2563EB]",
    icon: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      </>
    ),
  },
  {
    title: "State Scholarship",
    amount: "Up to ₹75,000",
    eligibility: "State Government",
    iconTone: "bg-[#E6F7F4] text-[#0F9488]",
    icon: (
      <>
        <path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
        <path d="m12 2 8 5H4Z" />
      </>
    ),
  },
];

const POPULAR_COURSES: PopularCourse[] = [
  { name: "BCA", searches: 12450 },
  { name: "MBA", searches: 10820 },
  { name: "B.Tech", searches: 9540 },
  { name: "BBA", searches: 8010 },
  { name: "MBBS", searches: 7600 },
];

const searchHref = (query: string) => `/search?q=${encodeURIComponent(query)}`;

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function PanelHeader({
  title,
  subtitle,
  viewAllHref,
}: {
  title: string;
  subtitle: string;
  viewAllHref?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[17px] font-bold leading-tight text-[#172033] sm:text-lg">{title}</h2>
        <p className="mt-1 text-[12.5px] text-[#7B8494]">{subtitle}</p>
      </div>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-[#B5122A] transition hover:gap-2 hover:text-[#8F0E21]"
        >
          View All
          <Svg className="h-3.5 w-3.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </Svg>
        </Link>
      ) : null}
    </div>
  );
}

const CARD_ROW =
  "-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden";

const CARD_BASE =
  "min-w-[150px] flex-1 snap-start rounded-[11px] border border-[#E5E9F0] bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(23,32,51,0.07)] sm:min-w-0";

function DeadlineCard({ deadline }: { deadline: Deadline }) {
  return (
    <article className={`${CARD_BASE} flex flex-col`}>
      <h3 className="truncate text-[13.5px] font-bold text-[#172033]">{deadline.title}</h3>
      <p className="mt-0.5 text-[11.5px] text-[#7B8494]">{deadline.stage}</p>
      <p className="mt-1.5 text-[11.5px] text-[#7B8494]">Deadline</p>
      <p className="text-[13px] font-bold text-[#B5122A]">{deadline.date}</p>
      <p className="mt-1.5 flex items-center gap-1 text-[12px] font-semibold text-[#EA580C]">
        <Svg className="h-3.5 w-3.5">
          <path d="M6 2h12M6 22h12M7 2v4a5 5 0 0 0 10 0V2M7 22v-4a5 5 0 0 1 10 0v4" />
        </Svg>
        {deadline.daysLeft} Days Left
      </p>
      <Link
        href={searchHref(deadline.title)}
        className="mt-3 inline-flex h-8 w-full items-center justify-center rounded-[7px] border border-[#F3B7C0] bg-[#FFF1F3] text-[11.5px] font-semibold text-[#B5122A] transition hover:border-[#B5122A] hover:bg-[#FFE4E8]"
      >
        View Details
      </Link>
    </article>
  );
}

function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <article className={`${CARD_BASE} flex flex-col items-center text-center`}>
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${scholarship.iconTone}`}
      >
        <Svg className="h-6 w-6">{scholarship.icon}</Svg>
      </span>
      <h3 className="mt-2.5 text-[13px] font-bold leading-snug text-[#172033]">
        {scholarship.title}
      </h3>
      <p className="mt-1 text-[12.5px] font-bold text-[#B5122A]">{scholarship.amount}</p>
      <p className="mb-3 mt-1 text-[11px] text-[#7B8494]">{scholarship.eligibility}</p>
      <Link
        href={searchHref(scholarship.title)}
        className="mt-auto inline-flex h-8 w-full items-center justify-center rounded-[7px] bg-[#B5122A] text-[11.5px] font-semibold text-white shadow-[0_4px_10px_rgba(181,18,42,0.2)] transition hover:bg-[#9A0F24]"
      >
        Check Eligibility
      </Link>
    </article>
  );
}

function PopularCourseRow({ course, rank }: { course: PopularCourse; rank: number }) {
  return (
    <li>
      <Link
        href={searchHref(course.name)}
        className="flex items-center gap-3 rounded-lg bg-[#F7F8FB] px-3 py-2.5 transition hover:bg-[#FFF1F3]"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFE4E8] text-[11.5px] font-bold text-[#B5122A]">
          {rank}
        </span>
        <span className="text-[13px] font-bold text-[#172033]">{course.name}</span>
        <span className="text-[11.5px] text-[#7B8494]">
          {course.searches.toLocaleString("en-US")} searches
        </span>
      </Link>
    </li>
  );
}

function UpcomingDeadlines() {
  const [filter, setFilter] = useState<DeadlineFilter>("All");
  const visible = useMemo(
    () =>
      DEADLINES.filter((d) => filter === "All" || d.categories.includes(filter)).slice(0, 3),
    [filter],
  );

  return (
    <div className="min-w-0">
      <PanelHeader
        title="Upcoming Deadlines"
        subtitle="Don't miss your admission deadline."
        viewAllHref={searchHref("Admission Deadlines")}
      />

      <div
        role="tablist"
        aria-label="Filter deadlines"
        className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {DEADLINE_FILTERS.map((item) => {
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item)}
              className={`h-8 shrink-0 rounded-md px-3.5 text-[12px] font-medium transition ${
                active
                  ? "bg-[#B5122A] text-white shadow-[0_4px_10px_rgba(181,18,42,0.22)]"
                  : "bg-[#F2F4F7] text-[#344054] hover:bg-[#E7EAF0]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className={`mt-3.5 ${CARD_ROW}`}>
        {visible.map((deadline) => (
          <DeadlineCard key={deadline.title} deadline={deadline} />
        ))}
      </div>
    </div>
  );
}

function FindScholarships() {
  return (
    <div className="min-w-0">
      <PanelHeader
        title="Find Scholarships"
        subtitle="Financial support for your education."
        viewAllHref={searchHref("Scholarships")}
      />
      <div className={`mt-4 ${CARD_ROW}`}>
        {SCHOLARSHIPS.map((scholarship) => (
          <ScholarshipCard key={scholarship.title} scholarship={scholarship} />
        ))}
      </div>
    </div>
  );
}

function PopularThisMonth() {
  return (
    <div className="min-w-0">
      <PanelHeader title="Popular This Month" subtitle="What students are exploring." />
      <ol className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-1">
        {POPULAR_COURSES.map((course, index) => (
          <PopularCourseRow key={course.name} course={course} rank={index + 1} />
        ))}
      </ol>
    </div>
  );
}

export function ImpactSection() {
  return (
    <section className="bg-white py-10 sm:py-12" aria-label="Deadlines, scholarships and popular courses">
      <div className="era-shell grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2 md:gap-x-6 xl:grid-cols-[38fr_38fr_24fr] xl:gap-0">
        <div className="xl:pr-6">
          <UpcomingDeadlines />
        </div>
        <div className="md:border-l md:border-[#EEF1F5] md:pl-6 xl:px-6">
          <FindScholarships />
        </div>
        <div className="border-t border-[#EEF1F5] pt-8 md:col-span-2 xl:col-span-1 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
          <PopularThisMonth />
        </div>
      </div>
    </section>
  );
}
