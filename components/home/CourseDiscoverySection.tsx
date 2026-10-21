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

type Field = {
  label: string;
  color: string;
  icon: ReactNode;
};

const programIconProps = {
  viewBox: "0 0 24 24",
  className: "h-7 w-7",
  "aria-hidden": true,
};

const fieldIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-4 w-4",
  "aria-hidden": true,
};

const GraduationCap = () => (
  <svg {...programIconProps}>
    <path fill="currentColor" d="M12 3 1.5 8.5 12 14l8.5-4.45V16h2V8.5L12 3Z" />
    <path fill="currentColor" d="M5.5 12.6v3.9c0 1.9 2.9 3.5 6.5 3.5s6.5-1.6 6.5-3.5v-3.9L12 16l-6.5-3.4Z" opacity=".85" />
  </svg>
);

const PROGRAMS: Program[] = [
  {
    title: "UG Programs",
    subtitle: "After 12th",
    href: "/programs/undergraduate",
    background: "bg-[linear-gradient(135deg,#FFF1F7_0%,#FFE4EF_100%)]",
    iconColor: "text-[#F20D70]",
    icon: <GraduationCap />,
  },
  {
    title: "PG Programs",
    subtitle: "After Graduation",
    href: "/programs/postgraduate",
    background: "bg-[linear-gradient(135deg,#F6F1FF_0%,#ECE3FF_100%)]",
    iconColor: "text-[#6D28D9]",
    icon: <GraduationCap />,
  },
  {
    title: "Diploma Courses",
    subtitle: "Short Term",
    href: "/search?q=Diploma",
    background: "bg-[linear-gradient(135deg,#F1F6FF_0%,#E3EDFF_100%)]",
    iconColor: "text-[#2563EB]",
    icon: (
      <svg {...programIconProps}>
        <path fill="currentColor" d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
        <path fill="#fff" opacity=".55" d="M14 2v6h6l-6-6Z" />
        <path stroke="#fff" strokeWidth="1.8" strokeLinecap="round" d="M8 12.5h8M8 16h5.5" />
      </svg>
    ),
  },
  {
    title: "Certification",
    subtitle: "Skill Based",
    href: "/search?q=Certification",
    background: "bg-[linear-gradient(135deg,#FFF6EC_0%,#FFEBD6_100%)]",
    iconColor: "text-[#F97316]",
    icon: (
      <svg {...programIconProps}>
        <path fill="currentColor" opacity=".8" d="m7.5 13.5-2 8 6.5-3 6.5 3-2-8h-9Z" />
        <circle cx="12" cy="9" r="6.5" fill="currentColor" />
        <circle cx="12" cy="9" r="3.6" fill="none" stroke="#fff" strokeWidth="1.6" />
      </svg>
    ),
  },
];

const FIELDS: Field[] = [
  {
    label: "Engineering",
    color: "text-[#2563EB]",
    icon: (
      <svg {...fieldIconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
      </svg>
    ),
  },
  {
    label: "Management",
    color: "text-[#4F46E5]",
    icon: (
      <svg {...fieldIconProps}>
        <circle cx="12" cy="7" r="4" />
        <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
        <path d="m12 14-1 3 1 2 1-2-1-3Z" />
      </svg>
    ),
  },
  {
    label: "Medical",
    color: "text-[#2563EB]",
    icon: (
      <svg {...fieldIconProps}>
        <path d="M6 3v6a4 4 0 0 0 8 0V3" />
        <path d="M10 13v2a5 5 0 0 0 10 0v-2" />
        <circle cx="20" cy="11" r="2" />
      </svg>
    ),
  },
  {
    label: "Commerce",
    color: "text-[#6D28D9]",
    icon: (
      <svg {...fieldIconProps}>
        <path d="M3 21h18" />
        <path d="M6 17v-5M11 17V8M16 17v-7M20 17V5" />
      </svg>
    ),
  },
  {
    label: "Law",
    color: "text-[#4F46E5]",
    icon: (
      <svg {...fieldIconProps}>
        <path d="M12 3v18M7 21h10" />
        <path d="M5 7h14" />
        <path d="m5 7-3 6a3 3 0 0 0 6 0L5 7ZM19 7l-3 6a3 3 0 0 0 6 0l-3-6Z" />
      </svg>
    ),
  },
  {
    label: "Design",
    color: "text-[#6D28D9]",
    icon: (
      <svg {...fieldIconProps}>
        <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.6 0-1.2-1-1.6-1-2.6 0-.9.7-1.3 1.6-1.3H16a5 5 0 0 0 5-5c0-4.2-4-7.5-9-7.5Z" />
        <circle cx="7.5" cy="11" r="1" />
        <circle cx="10" cy="7.5" r="1" />
        <circle cx="14.5" cy="7.5" r="1" />
      </svg>
    ),
  },
  {
    label: "Computer",
    color: "text-[#2563EB]",
    icon: (
      <svg {...fieldIconProps}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
  {
    label: "Science",
    color: "text-[#4F46E5]",
    icon: (
      <svg {...fieldIconProps}>
        <path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" />
        <path d="M7.5 15h9" />
      </svg>
    ),
  },
  {
    label: "Arts",
    color: "text-[#6D28D9]",
    icon: (
      <svg {...fieldIconProps}>
        <path d="m14 4 6 6-9.5 9.5a3 3 0 0 1-4.2 0l-1.8-1.8a3 3 0 0 1 0-4.2L14 4Z" />
        <path d="m11 7 6 6" />
      </svg>
    ),
  },
];

export function CourseDiscoverySection() {
  return (
    <section className="bg-white py-8 lg:py-10" aria-labelledby="looking-for-heading">
      <div className="era-shell grid gap-6 lg:grid-cols-[minmax(0,1.9fr)_minmax(310px,1fr)] lg:items-end">
        <div>
          <h2 id="looking-for-heading" className="text-[22px] font-extrabold tracking-[-0.02em] text-[#1F1B3A] sm:text-[26px]">
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
                className={`group flex min-h-[124px] flex-col justify-center rounded-2xl p-4 ring-1 ring-black/[0.03] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(53,6,111,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35066F] ${program.background}`}
              >
                <span className={`transition duration-200 group-hover:scale-110 ${program.iconColor}`}>{program.icon}</span>
                <span className="mt-4 text-[14.5px] font-extrabold leading-tight text-[#1F1B3A]">{program.title}</span>
                <span className="mt-1 text-[12.5px] text-[#6B6280]">{program.subtitle}</span>
              </Link>
            ))}
          </div>
        </div>

        <aside
          aria-labelledby="popular-fields-heading"
          className="rounded-2xl border border-[#EFEAF7] bg-white p-4 shadow-[0_8px_24px_rgba(53,6,111,0.06)]"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 id="popular-fields-heading" className="text-[15px] font-extrabold text-[#1F1B3A]">
              Popular Fields
            </h3>
            <Link
              href="/programs"
              className="inline-flex items-center gap-1 text-[12px] font-bold text-[#F20D70] transition hover:gap-1.5"
            >
              View All
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-1 sm:grid-cols-3">
            {FIELDS.map((field) => (
              <li key={field.label}>
                <Link
                  href={`/search?q=${encodeURIComponent(field.label)}`}
                  className="group  flex h-9 items-center gap-1.5 rounded-lg px-1.5 text-[12px] font-medium text-[#3D3550] transition bg-[#F6F2FF] hover:text-[#35066F]"
                >
                  <span className={`shrink-0 transition group-hover:scale-110 ${field.color}`}>{field.icon}</span>
                  <span className="truncate">{field.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
