import Link from "next/link";
import type { ReactNode } from "react";

type Program = {
  title: string;
  subtitle: string;
  href: string;
  background: string;
  iconColor: string;
  icon: ReactNode;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
  "aria-hidden": true,
};

const PROGRAMS: Program[] = [
  {
    title: "UG Programs",
    subtitle: "After 12th",
    href: "/programs/undergraduate",
    background: "bg-[#FFF0F6]",
    iconColor: "text-[#F20D70]",
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 10.2 12 5.2l8.5 5-8.5 5-8.5-5Z" />
        <path d="M7.2 12.2v3.6c0 .7 2.1 2 4.8 2s4.8-1.3 4.8-2v-3.6" />
      </svg>
    ),
  },
  {
    title: "PG Programs",
    subtitle: "After Graduation",
    href: "/programs/postgraduate",
    background: "bg-[#F1ECFF]",
    iconColor: "text-[#35066F]",
    icon: (
      <svg {...iconProps}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </svg>
    ),
  },
  {
    title: "Diploma Courses",
    subtitle: "Short Term",
    href: "/search?q=Diploma",
    background: "bg-[#F7F1FF]",
    iconColor: "text-[#7C3AED]",
    icon: (
      <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
      </svg>
    ),
  },
  {
    title: "Certification",
    subtitle: "Skill Based",
    href: "/search?q=Certification",
    background: "bg-[#FFF0F6]",
    iconColor: "text-[#DB2777]",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="5" />
        <path d="m8.5 12.5-1.2 7 4.7-2.4 4.7 2.4-1.2-7" />
      </svg>
    ),
  },
];

const FIELDS = ["Engineering", "Management", "Medical", "Commerce", "Law", "Design", "Computer", "Science", "Arts"];

export function CourseDiscoverySection() {
  return (
    <section className="bg-white py-8 lg:py-10" aria-labelledby="looking-for-heading">
      <div className="era-shell grid gap-5 lg:grid-cols-[minmax(0,2.1fr)_minmax(220px,0.9fr)]">
        <div>
          <h2 id="looking-for-heading" className="text-[22px] font-extrabold tracking-[-0.02em] text-[#35066F] sm:text-2xl">
            What are you looking for?
          </h2>
          <p className="mt-1 text-[13px] text-[#6B6280] sm:text-sm">
            Tell us your interest and we&apos;ll show you the best options.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {PROGRAMS.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className={`group flex min-h-[108px] flex-col justify-center rounded-2xl p-3.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(53,6,111,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35066F] ${program.background}`}
              >
                <span className={program.iconColor}>{program.icon}</span>
                <span className="mt-3 text-[13.5px] font-bold text-[#35066F]">{program.title}</span>
                <span className="mt-0.5 text-[12px] text-[#6B6280]">{program.subtitle}</span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-[#F1ECFF] bg-white p-4 shadow-[0_6px_18px_rgba(53,6,111,0.04)]">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-bold text-[#35066F]">Popular Fields</h3>
            <Link href="/programs" className="text-[12px] font-semibold text-[#F20D70]">
              View All
            </Link>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {FIELDS.map((field) => (
              <li key={field}>
                <Link
                  href={`/search?q=${encodeURIComponent(field)}`}
                  className="flex h-8 items-center rounded-lg bg-[#F7F4FC] px-2.5 text-[12px] font-medium text-[#3D3550] transition hover:bg-[#F1ECFF] hover:text-[#35066F]"
                >
                  {field}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
