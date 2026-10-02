const STEPS = [
  {
    title: "Discover",
    description: "Find colleges & courses",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="4" y="5" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="11" cy="11" r="2.6" stroke="currentColor" strokeWidth="1.8" />
        <path d="m13 13 2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Compare",
    description: "Compare fees, eligibility, placements & facilities",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 9h5M9.5 12.5h5M9.5 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Get Guidance",
    description: "Talk to an admission expert",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <rect x="4" y="5" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m9 14 5.5-5.5M10.5 8.5H14.5V12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Apply",
    description: "Complete your application",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M7 4h7l4 4v12H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m9.5 13.5 2 2 3.5-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-white py-10 lg:py-14" aria-labelledby="how-it-works-heading">
      <div className="era-shell">
        <div className="era-reveal grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-era-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-era-primary" aria-hidden />
              How It Works
            </p>
            <h2
              id="how-it-works-heading"
              className="mt-2 text-2xl font-bold tracking-[-0.02em] text-era-dark sm:text-[1.65rem]"
            >
              From Search to Admission
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">A simple and transparent admission process.</p>
          </div>

          <ol className="relative grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              className="pointer-events-none absolute left-5 right-0 top-5 hidden border-t border-dashed border-slate-200 lg:block"
              aria-hidden
            />
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative">
                <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-era-lilac text-era-primary ring-4 ring-white">
                  {step.icon}
                </span>
                <p className="mt-3 text-xs font-bold text-era-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-0.5 text-sm font-bold text-era-dark sm:text-base">{step.title}</h3>
                <p className="mt-1 max-w-[13rem] text-xs leading-5 text-slate-500 sm:text-[13px]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
