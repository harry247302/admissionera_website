import Link from "next/link";
import type { ReactNode } from "react";
import { AdmissionEraAISection } from "./AdmissionEraAISection";

type IconName =
  | "graduationCap"
  | "bookOpen"
  | "fileText"
  | "award"
  | "settings"
  | "briefcase"
  | "heartPulse"
  | "wallet"
  | "scale"
  | "palette"
  | "monitor"
  | "atom"
  | "penTool";

const ICON_PATHS: Record<IconName, ReactNode> = {
  graduationCap: (
    <>
      <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0Z" />
      <path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </>
  ),
  bookOpen: (
    <>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z" />
    </>
  ),
  fileText: (
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  heartPulse: (
    <>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </>
  ),
  wallet: (
    <>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </>
  ),
  scale: (
    <>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </>
  ),
  palette: (
    <>
      <path d="M12 22a10 10 0 1 1 10-10c0 2.5-2 3.5-4 3.5h-2a2 2 0 0 0-1.5 3.3A2 2 0 0 1 12 22Z" />
      <circle cx="13.5" cy="6.5" r=".6" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".6" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".6" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".6" fill="currentColor" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  atom: (
    <>
      <circle cx="12" cy="12" r="1" />
      <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </>
  ),
  penTool: (
    <>
      <path d="M15.71 21.29a1 1 0 0 1-1.42 0l-1.58-1.58a1 1 0 0 1 0-1.42l5.58-5.58a1 1 0 0 1 1.42 0l1.58 1.58a1 1 0 0 1 0 1.42Z" />
      <path d="m18 13-1.38-6.87a1 1 0 0 0-.74-.78L3.24 2.03a1 1 0 0 0-1.21 1.21l3.32 12.64a1 1 0 0 0 .78.74L13 18M2.3 2.3l7.29 7.29" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
};

function Icon({ name, className }: { name: IconName; className?: string }) {
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
      {ICON_PATHS[name]}
    </svg>
  );
}

type Program = {
  title: string;
  subtitle: string;
  icon: IconName;
  href: string;
  background: string;
  iconColor: string;
};

const PROGRAMS: Program[] = [
  {
    title: "UG Programs",
    subtitle: "After 12th",
    icon: "graduationCap",
    href: "/programs/undergraduate",
    background: "bg-[#FDF2F8]",
    iconColor: "text-[#DB2777]",
  },
  {
    title: "PG Programs",
    subtitle: "After Graduation",
    icon: "bookOpen",
    href: "/programs/postgraduate",
    background: "bg-[#F5F0FF]",
    iconColor: "text-[#5B21B6]",
  },
  {
    title: "Diploma Courses",
    subtitle: "Short Term",
    icon: "fileText",
    href: "/search?q=Diploma",
    background: "bg-[#FAF5FF]",
    iconColor: "text-[#9333EA]",
  },
  {
    title: "Certification",
    subtitle: "Skill Based",
    icon: "award",
    href: "/search?q=Certification",
    background: "bg-[#FFF0F6]",
    iconColor: "text-[#C026D3]",
  },
];

const FIELDS: { label: string; icon: IconName }[] = [
  { label: "Engineering", icon: "settings" },
  { label: "Management", icon: "briefcase" },
  { label: "Medical", icon: "heartPulse" },
  { label: "Commerce", icon: "wallet" },
  { label: "Law", icon: "scale" },
  { label: "Design", icon: "palette" },
  { label: "Computer", icon: "monitor" },
  { label: "Science", icon: "atom" },
  { label: "Arts", icon: "penTool" },
];

function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={program.href}
      className={`group flex min-h-[104px] flex-col justify-center rounded-[14px] p-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(16,24,40,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B21B6] sm:min-h-[110px] sm:p-5 ${program.background}`}
    >
      <Icon
        name={program.icon}
        className={`h-[22px] w-[22px] sm:h-6 sm:w-6 ${program.iconColor}`}
      />
      <span className="mt-3 text-[13.5px] font-semibold leading-tight text-[#1E1250] sm:text-[15px]">
        {program.title}
      </span>
      <span className="mt-1 text-[12px] text-[#6B7280] sm:text-[13px]">
        {program.subtitle}
      </span>
    </Link>
  );
}

function PopularFields() {
  return (
    <aside className="flex h-full flex-col rounded-[14px] border border-[#EDE7F6] bg-white p-4 shadow-[0_2px_10px_rgba(16,24,40,0.04)] sm:p-5 xl:p-[18px]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-[#1E1250] sm:text-base">
          Popular Fields
        </h3>
        <Link
          href="/programs"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#5B21B6] transition hover:gap-1.5 hover:underline"
        >
          View All
          <span aria-hidden>→</span>
        </Link>
      </div>

      <ul className="mt-4 grid flex-1 grid-cols-2 content-center gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {FIELDS.map((field) => (
          <li key={field.label}>
            <Link
              href={`/search?q=${encodeURIComponent(field.label)}`}
              className="group flex h-[34px] items-center gap-1.5 rounded-lg bg-[#F8F5FD] px-2.5 text-[12px] xl:gap-[5px] xl:px-2 xl:text-[11.5px] text-[#344054] transition duration-150 hover:bg-[#F3E8FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5B21B6]"
            >
              <Icon
                name={field.icon}
                className="h-3.5 w-3.5 shrink-0 text-[#6D28D9] transition duration-150 group-hover:text-[#DB2777]"
              />
              <span className="truncate">{field.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function AboutSection() {
  return (
    <>
      <section
        className="bg-white py-10 sm:py-12 lg:py-14"
        aria-labelledby="looking-for-heading"
      >
        <div className="era-shell grid gap-5 lg:grid-cols-[2.15fr_1fr] lg:gap-6">
          <div className="min-w-0">
            <h2
              id="looking-for-heading"
              className="text-xl font-bold leading-[1.2] text-[#1E1250] sm:text-[22px] lg:text-2xl"
            >
              What are you looking for?
            </h2>
            <p className="mt-1.5 text-[13px] text-[#6B7280] sm:text-sm">
              Tell us your interest and we&apos;ll show you the best options.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 min-[769px]:grid-cols-4 min-[769px]:gap-3.5">
              {PROGRAMS.map((program) => (
                <ProgramCard key={program.title} program={program} />
              ))}
            </div>
          </div>

          <PopularFields />
        </div>
      </section>
      <AdmissionEraAISection />
    </>
  );
}
