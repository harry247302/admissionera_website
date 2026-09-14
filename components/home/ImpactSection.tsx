import { SectionEyebrow, SectionHeading, SectionLead } from "./SectionHeading";

const STATS = [
  {
    value: "10K+",
    label: "Students Guided",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M4 7.5 12 4l8 3.5-8 3.5L4 7.5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6.5 10.5v5c0 .9 2.4 2.5 5.5 2.5s5.5-1.6 5.5-2.5v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "Partner Colleges",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M4 20V9l8-4 8 4v11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 20v-5h6v5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Courses",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M5 7h14v12H5V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    value: "95%",
    label: "Student Satisfaction",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="m12 4 1.9 4.8L19 10l-3.8 3.2L16.4 19 12 16.4 7.6 19l1.2-5.8L5 10l5.1-1.2L12 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24" style={{ background: "var(--era-gradient-soft)" }}>
      <div className="pointer-events-none absolute top-0 right-1/4 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="era-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="era-reveal">
          <SectionEyebrow>Our Impact</SectionEyebrow>
          <SectionHeading className="mt-3">Numbers That Create Opportunities</SectionHeading>
          <SectionLead>
            Every year, we help thousands of students find the right colleges and
            courses, making quality education more accessible across India.
          </SectionLead>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat, index) => (
            <article
              key={stat.label}
              className={`era-reveal rounded-[1.5rem] border border-white/80 bg-white/90 p-5 shadow-[0_14px_34px_rgba(23,19,74,0.06)] backdrop-blur sm:p-6 ${
                index % 2 === 1 ? "sm:translate-y-4" : ""
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-era-lilac text-era-primary">
                {stat.icon}
              </span>
              <p className="mt-4 text-3xl font-bold tracking-[-0.04em] text-era-dark sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
