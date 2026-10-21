import Image from "next/image";

export function FilteredCoursesHero() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-[#E9DDF8] bg-[linear-gradient(105deg,#F7F2FF_0%,#FAF8FF_42%,#FFF1F8_100%)]"
      aria-labelledby="filtered-courses-hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-[#EC168C]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-0 h-48 w-48 rounded-full bg-[#440F76]/10 blur-3xl"
      />

      <div className="era-shell relative grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:py-10">
        <div className="relative z-10 max-w-xl">
          <h1
            id="filtered-courses-hero-heading"
            className="text-[30px] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#1B1238] sm:text-[38px] lg:text-[42px]"
          >
            Explore Your Future with the{" "}
            <span className="bg-[linear-gradient(90deg,#EC168C_0%,#8B1A96_55%,#440F76_100%)] bg-clip-text text-transparent">
              Right Course
            </span>
          </h1>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#777493] sm:text-[15px]">
            Discover the best courses from top universities and kickstart your career journey.
          </p>

          <div className="mt-5 inline-flex items-center gap-2.5 rounded-2xl border border-[#E9DDF8] bg-white/90 px-3.5 py-2.5 shadow-[0_10px_28px_rgba(68,15,118,0.08)] backdrop-blur">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF0F7] text-[#EC168C]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4.5 w-4.5 h-[18px] w-[18px]" aria-hidden>
                <path d="m12 3 10 5-10 5L2 8l10-5Z" strokeLinejoin="round" />
                <path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-[12.5px] font-semibold text-[#1B1238]">Find, Compare, Get Admission</p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
          <div className="relative aspect-[5/3.2] overflow-hidden rounded-[22px] border border-white/70 shadow-[0_18px_40px_rgba(68,15,118,0.14)]">
            <Image
              src="/hero/slide-2.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(68,15,118,0.18),rgba(236,22,140,0.12))]" />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -right-3 -top-4 h-28 w-28 rounded-full border-[10px] border-[#EC168C]/25"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-5 left-6 h-20 w-20 rounded-full border-[8px] border-[#440F76]/18"
          />
          <svg
            aria-hidden
            viewBox="0 0 180 60"
            className="pointer-events-none absolute -left-2 top-8 hidden h-12 w-40 text-[#EC168C] sm:block"
          >
            <path
              d="M4 40c30-28 70-34 120-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeDasharray="3 5"
              strokeLinecap="round"
            />
            <path d="M138 16l18-8-4 18-14-10Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_40%,#FAF8FF_100%)]"
      />
    </section>
  );
}
