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
  button: string;
};

type PopularCourse = {
  name: string;
  searches: number;
};

const DEADLINE_FILTERS: DeadlineFilter[] = ["All", "UG", "PG", "MBA", "Engineering", "Medical"];

const DEADLINES: Deadline[] = [
  { title: "DU Admission", stage: "Undergraduate", date: "15 June 2027", daysLeft: 24, categories: ["UG"] },
  { title: "CUET 2027", stage: "Registration", date: "30 June 2027", daysLeft: 32, categories: ["UG"] },
  { title: "JEE Main 2027", stage: "Application", date: "10 July 2027", daysLeft: 44, categories: ["UG", "Engineering"] },
  { title: "CAT 2027", stage: "Registration", date: "20 Sept 2027", daysLeft: 62, categories: ["PG", "MBA"] },
  { title: "NEET UG 2027", stage: "Application", date: "12 Mar 2027", daysLeft: 71, categories: ["UG", "Medical"] },
  { title: "GATE 2028", stage: "Application", date: "28 Sept 2027", daysLeft: 80, categories: ["PG", "Engineering"] },
  { title: "NEET PG 2027", stage: "Registration", date: "05 Apr 2027", daysLeft: 92, categories: ["PG", "Medical"] },
  { title: "XAT 2028", stage: "Registration", date: "30 Nov 2027", daysLeft: 104, categories: ["MBA"] },
];

const PRIMARY_BUTTON = "bg-[#2A0B5C] hover:bg-[#3B1380] shadow-[0_4px_10px_rgba(42,11,92,0.22)]";
const PINK_BUTTON = "bg-[#F20D70] hover:bg-[#D40B62] shadow-[0_4px_10px_rgba(242,13,112,0.22)]";

const SCHOLARSHIPS: Scholarship[] = [
  {
    title: "Merit Scholarship",
    amount: "Up to ₹50,000",
    eligibility: "75%+ in 12th",
    button: PRIMARY_BUTTON,
    icon: (
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden>
        <circle cx="16" cy="7.5" r="5" fill="#F97316" />
        <path d="M5 30v-3.5A8.5 8.5 0 0 1 13.5 18h5a8.5 8.5 0 0 1 8.5 8.5V30Z" fill="#F97316" />
        <path d="m13 18 3 5 3-5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="16" cy="25.5" r="3.4" fill="#FBBF24" stroke="#fff" strokeWidth="1.2" />
        <path d="m16 23.8.6 1.2 1.3.2-.95.9.22 1.3-1.17-.62-1.17.62.22-1.3-.95-.9 1.3-.2Z" fill="#fff" />
      </svg>
    ),
  },
  {
    title: "Need Based",
    amount: "Up to ₹1,00,000",
    eligibility: "Family Income < 5L",
    button: PINK_BUTTON,
    icon: (
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden>
        <path d="M13 2h6v6h-6Z" fill="#1D4ED8" />
        <rect x="5.5" y="5.5" width="21" height="25" rx="3" fill="#2563EB" />
        <rect x="12" y="4" width="8" height="4" rx="1.2" fill="#93C5FD" />
        <circle cx="16" cy="15" r="3.6" fill="#fff" />
        <path d="M9.5 26a6.5 6.5 0 0 1 13 0Z" fill="#fff" />
      </svg>
    ),
  },
  {
    title: "State Scholarship",
    amount: "Up to ₹50,000",
    eligibility: "State Government",
    button: PINK_BUTTON,
    icon: (
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden>
        <path d="M16 17V10" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 11.5C16 6.5 12.5 3.5 7 3.5c0 5 3.5 8 9 8Z" fill="#22C55E" />
        <path d="M16 13c0-5 3.5-8 9-8 0 5-3.5 8-9 8Z" fill="#16A34A" />
        <path
          d="M2 20.5h4.5c1.6 0 3.1.5 4.4 1.4l1.6 1.1h5.3a2 2 0 0 1 0 4h-6.3M2 29h12.5c1.4 0 2.8-.4 4-1.1l8.8-5.3a2.2 2.2 0 0 0-2.3-3.8l-6.6 3.7"
          fill="none"
          stroke="#16A34A"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const POPULAR_COURSES: PopularCourse[] = [
  { name: "BCA", searches: 12450 },
  { name: "MBA", searches: 10320 },
  { name: "B.Tech", searches: 9560 },
  { name: "BBA", searches: 6820 },
  { name: "MBBS", searches: 7660 },
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
        <h2 className="text-[19px] font-extrabold leading-tight tracking-tight text-[#1B1446] sm:text-[21px]">
          {title}
        </h2>
        <p className="mt-0.5 text-[12.5px] text-[#667085]">{subtitle}</p>
      </div>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-[#E6176F] transition hover:gap-2 hover:text-[#C20E5C]"
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
  "min-w-[150px] flex-1 snap-start rounded-xl border p-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(27,20,70,0.07)] sm:min-w-0";

function DeadlineCard({ deadline }: { deadline: Deadline }) {
  return (
    <article className={`${CARD_BASE} flex flex-col border-[#EEEEF4] bg-[#F7F7FA]`}>
      <h3 className="truncate text-[13px] font-bold text-[#1B1446]">{deadline.title}</h3>
      <p className="text-[11.5px] text-[#667085]">{deadline.stage}</p>
      <p className="text-[12px] font-medium text-[#1B1446]">{deadline.date}</p>
      <p className="mt-1 flex items-center gap-1 text-[12px] font-bold text-[#E11D48]">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9Z" />
        </svg>
        {deadline.daysLeft} Days Left
      </p>
      <Link
        href={searchHref(deadline.title)}
        className="mt-3 inline-flex h-8 items-center justify-center self-center rounded-lg bg-[#FFE3EE] px-4 text-[11.5px] font-semibold text-[#E6176F] transition hover:bg-[#FFD0E2]"
      >
        View Details
      </Link>
    </article>
  );
}

function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <article className={`${CARD_BASE} flex flex-col items-center border-[#ECEEF3] bg-white px-2 pb-2 pt-3.5 text-center shadow-[0_2px_8px_rgba(27,20,70,0.04)]`}>
      {scholarship.icon}
      <h3 className="mt-2 whitespace-nowrap text-[12.5px] font-bold leading-snug text-[#1B1446]">{scholarship.title}</h3>
      <p className="whitespace-nowrap text-[11.5px] text-[#344054]">{scholarship.amount}</p>
      <p className="mb-2.5 whitespace-nowrap text-[11px] text-[#667085]">{scholarship.eligibility}</p>
      <Link
        href={searchHref(scholarship.title)}
        className={`mt-auto inline-flex h-8 w-full items-center justify-center rounded-md text-[11.5px] font-semibold text-white transition ${scholarship.button}`}
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
        className="flex items-center gap-3 rounded-lg px-1.5 py-1.5 transition hover:bg-[#FFF1F6]"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#FFE4EE] text-[11.5px] font-bold text-[#E11D48]">
          {rank}
        </span>
        <span className="w-14 shrink-0 text-[13px] font-bold text-[#1B1446]">{course.name}</span>
        <span className="text-[12px] text-[#667085]">
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
        className="mt-3 flex max-w-full overflow-x-auto rounded-lg border border-[#ECEEF3] bg-white p-[3px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {DEADLINE_FILTERS.map((item, index) => {
          const active = item === filter;
          const afterActive = index > 0 && DEADLINE_FILTERS[index - 1] === filter;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item)}
              className={`relative h-7 shrink-0 grow rounded-md px-3 text-[11.5px] font-medium transition ${
                active
                  ? "bg-[#F20D70] text-white shadow-[0_3px_8px_rgba(242,13,112,0.25)]"
                  : "text-[#344054] hover:text-[#E6176F]"
              } ${
                index > 0 && !active && !afterActive
                  ? "before:absolute before:left-0 before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-[#E4E7EC]"
                  : ""
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className={`mt-3 ${CARD_ROW}`}>
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
      <div className={`mt-3 ${CARD_ROW}`}>
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
      <ol className="mt-3  grid gap-1.5 md:grid-cols-2 min-[72rem]:grid-cols-1">
        {POPULAR_COURSES.map((course, index) => (
          <PopularCourseRow key={course.name} course={course} rank={index + 1} />
        ))}
      </ol>
    </div>
  );
}

export function ImpactSection() {
  return (
    <section className="py-10 sm:py-12" aria-label="Deadlines, scholarships and popular courses">
      <div className="era-shell grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2 md:gap-x-6 min-[72rem]:grid-cols-[38fr_36fr_26fr] min-[72rem]:gap-x-7">
        <UpcomingDeadlines />
        <FindScholarships />
        <div className="md:col-span-2 min-[72rem]:col-span-1">
          <PopularThisMonth />
        </div>
      </div>
    </section>
  );
}
