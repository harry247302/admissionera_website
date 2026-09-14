import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-white pb-4 pt-4 lg:pb-8 lg:pt-2">
      <div className="era-shell">
        <div className="relative overflow-hidden rounded-[2rem] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16" style={{ background: "var(--era-gradient)" }}>
          <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full border border-white/15" />
          <div className="pointer-events-none absolute top-10 right-24 h-24 w-24 rotate-12 rounded-3xl border border-white/20 bg-white/5" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-pink-100 uppercase">
                Start today
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-[-0.04em] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
                Your Future Deserves the Right Direction
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-violet-50/90">
                Get expert guidance, explore top colleges and take the next step towards your future.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/tools/course-finder" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-era-primary shadow-lg transition hover:-translate-y-0.5">
                  Get Free Counselling →
                </Link>
                <Link href="/programs" className="era-btn-ghost">
                  Explore Courses
                </Link>
              </div>
            </div>

            <div className="relative mx-auto hidden w-full max-w-sm lg:block">
              <div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <p className="text-sm font-semibold text-pink-100">Why students choose us</p>
                <ul className="mt-4 space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-pink-300" /> Verified college insights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-200" /> Personal counselling
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-fuchsia-200" /> End-to-end admission help
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
