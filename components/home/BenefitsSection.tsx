const BENEFITS = [
  {
    title: "Wide Range of Courses",
    description: "Explore programs across multiple career paths",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M4 7.5 12 4l8 3.5-8 3.5L4 7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M6.5 10.2v5.1c0 .8 2.4 2.4 5.5 2.4s5.5-1.6 5.5-2.4v-5.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Top Colleges Across India",
    description: "Discover trusted colleges and universities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M4 20V9.5L12 5l8 4.5V20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 20v-5h6v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Expert Counselling",
    description: "Get personalized guidance from experts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="10.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 19c.8-2.6 2.9-4 5.5-4s4.7 1.4 5.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14.2 15.2c1.5-.5 3.1-.3 4.5.8.7.6 1.2 1.4 1.5 2.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Admission Support",
    description: "Get assistance throughout your admission journey",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="5" y="11" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
];

export function BenefitsSection() {
  return (
    <section className="relative z-10 -mt-6 pb-4 sm:-mt-8 lg:-mt-10" aria-label="Key benefits">
      <div className="era-shell">
        <div className="era-reveal overflow-hidden rounded-[1.75rem] border border-violet-100/80 bg-white shadow-[0_18px_50px_rgba(23,19,74,0.08)]">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((item, index) => (
              <article
                key={item.title}
                className={`relative flex flex-col gap-3 p-5 sm:p-6 lg:p-7 ${
                  index % 2 === 1 ? "border-l border-violet-100/80" : ""
                } ${index > 1 ? "border-t border-violet-100/80 lg:border-t-0" : ""} ${
                  index > 0 ? "lg:border-l lg:border-violet-100/80" : ""
                }`}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-era-lilac text-era-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-era-dark sm:text-base">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
