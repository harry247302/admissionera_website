import Image from "next/image";
import Link from "next/link";
import { SectionEyebrow, SectionHeading, SectionLead } from "./SectionHeading";

const TRUST_POINTS = [
  {
    title: "Trusted Information",
    description: "Verified program and campus insights",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M12 3.5 19 6.5v5.2c0 4.2-2.9 7.7-7 8.8-4.1-1.1-7-4.6-7-8.8V6.5L12 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m9.2 12 1.9 1.9 3.8-3.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Personalized Guidance",
    description: "Advice tailored to your goals",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.5 19c1.1-3 3.4-4.5 6.5-4.5s5.4 1.5 6.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Student First Approach",
    description: "Support that puts your future first",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path d="M12 20s-6.5-3.9-6.5-8.2A3.7 3.7 0 0 1 12 9.2a3.7 3.7 0 0 1 6.5 2.6C18.5 16.1 12 20 12 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-fuchsia-100/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-64 w-64 rounded-full bg-violet-100/60 blur-3xl" />

      <div className="era-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="era-reveal relative order-2 lg:order-1">
          <div className="absolute -top-6 -left-4 h-28 w-28 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-400/20 blur-xl era-float" />
          <div className="absolute -right-3 bottom-10 h-20 w-20 rounded-full border border-fuchsia-200/80 bg-white/70 backdrop-blur era-float" style={{ animationDelay: "1.2s" }} />

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 p-1 shadow-[0_28px_60px_rgba(91,33,182,0.25)]">
            <div className="era-mask-frame relative min-h-[360px] overflow-hidden bg-era-lavender sm:min-h-[420px]">
              <Image
                src="/hero/slide-2.png"
                alt="Students collaborating on campus"
                fill
                className="object-cover transition duration-700 hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17134a]/45 via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute -bottom-5 left-6 max-w-[220px] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur sm:left-10">
            <p className="text-xs font-semibold tracking-wide text-era-magenta uppercase">Campus clarity</p>
            <p className="mt-1 text-sm font-bold text-era-dark">Education decisions, made calmer</p>
          </div>

          <div className="absolute top-8 right-4 rounded-full bg-era-dark px-4 py-3 text-center text-white shadow-lg sm:right-8">
            <p className="text-[10px] tracking-wide text-fuchsia-200 uppercase">Support</p>
            <p className="text-xs font-semibold">Your future,<br />our focus</p>
          </div>
        </div>

        <div className="era-reveal order-1 lg:order-2" style={{ animationDelay: "120ms" }}>
          <SectionEyebrow>About Admission ERA</SectionEyebrow>
          <SectionHeading className="mt-3">
            Guiding Students Towards the Right Path
          </SectionHeading>
          <SectionLead>
            At Admission Era, we believe every student deserves the right guidance
            and equal opportunity to build a successful future. We simplify the
            admission process, provide authentic information and connect students
            with the right educational institutions.
          </SectionLead>

          <ul className="mt-8 space-y-4">
            {TRUST_POINTS.map((point) => (
              <li
                key={point.title}
                className="flex items-start gap-4 rounded-2xl border border-violet-100 bg-era-lavender/70 p-4"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-era-primary shadow-sm">
                  {point.icon}
                </span>
                <span>
                  <p className="font-semibold text-era-dark">{point.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{point.description}</p>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link href="/about" className="era-btn">
              Know More About Us
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
