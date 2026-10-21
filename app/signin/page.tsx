import Image from "next/image";
import type { ReactNode } from "react";
import { SignupCard } from "@/components/auth/SignupCard";

export const metadata = {
  title: "Sign Up",
};

const FEATURES: { title: string; description: string; tile: string; icon: ReactNode }[] = [
  {
    title: "Compare Universities",
    description: "Find the best fit for you",
    tile: "bg-[#F3E8FF] text-[#7C3AED]",
    icon: (
      <>
        <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" fill="currentColor" />
        <path d="M6 11.5v4c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4" fill="currentColor" opacity="0.75" />
      </>
    ),
  },
  {
    title: "Exclusive Coupons",
    description: "Save more on admissions",
    tile: "bg-[#E0EDFF] text-[#2F5BEA]",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" />
        <path d="M8 9h8M8 12.5h8M8 16h5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M2.5 9.5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "100% Verified Universities",
    description: "Trusted & UGC approved",
    tile: "bg-[#DCF7E6] text-[#16A34A]",
    icon: (
      <>
        <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Z" fill="currentColor" />
        <path d="m8.5 12 2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Expert Guidance",
    description: "Get guidance from mentors",
    tile: "bg-[#EDE7FF] text-[#6D28D9]",
    icon: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="13" width="4.5" height="7" rx="1.8" fill="currentColor" />
        <rect x="16.5" y="13" width="4.5" height="7" rx="1.8" fill="currentColor" />
      </>
    ),
  },
];

const STATS = [
  { value: "1L+", label: "Admissions Guided" },
  { value: "500+", label: "Universities" },
  { value: "4.8", label: "Student Rating", star: true },
];

export default function SignInPage() {
  return (
    <main
      id="main"
      className="relative isolate flex-1 overflow-hidden bg-[linear-gradient(135deg,#F7F8FF_0%,#EEF2FF_55%,#F3EEFF_100%)]"
    >
      <span aria-hidden className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-[#DCE5FF]/60 blur-3xl" />

      <div className="era-shell grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-6 lg:py-10">
        <section className="relative min-w-0 lg:min-h-[660px]" aria-label="Why join AdmissionEra">
          <h2 className="relative z-10 text-[34px] font-extrabold leading-[1.12] tracking-tight text-[#0B1033] sm:text-[42px] xl:text-[46px]">
            Your
            <br />
            <span className="bg-[linear-gradient(90deg,#4F6BF6_0%,#7C3AED_100%)] bg-clip-text text-transparent">
              Education Journey
            </span>
            <br />
            Starts Here
          </h2>
          <p className="relative z-10 mt-3 max-w-[340px] text-[15px] leading-6 text-[#475467]">
            Join thousands of students who are building a brighter future with AdmissionEra.
          </p>

          <ul className="relative z-10 mt-7 space-y-5">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(60,70,160,0.10)] ring-4 ring-white/70 ${feature.tile}`}
                >
                  <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
                    {feature.icon}
                  </svg>
                </span>
                <span>
                  <span className="block text-[14.5px] font-bold text-[#0B1033]">{feature.title}</span>
                  <span className="block text-[13px] text-[#667085]">{feature.description}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute bottom-0 right-[-4%] hidden w-[58%] max-w-[330px] lg:block" aria-hidden>
            <span className="absolute bottom-[6%] left-1/2 h-[92%] w-[118%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_40%_35%,#E4E9FF_0%,#D6DCFF_45%,#F6D3EA_100%)] opacity-90" />
            <Image
              src="/assets/admissionera/auth/signup-student.webp"
              alt=""
              width={545}
              height={819}
              sizes="330px"
              priority
              className="relative h-auto w-full"
            />
          </div>

          <span
            aria-hidden
            className="pointer-events-none absolute right-[16%] top-[40%] hidden h-[72px] w-[72px] items-center justify-center rounded-full bg-white/70 shadow-[0_10px_30px_rgba(79,107,246,0.18)] backdrop-blur lg:flex"
          >
            <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden>
              <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" fill="#3B4FD8" />
              <path d="M6 11.5v4c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4" fill="#5B6CF0" />
              <path d="M20 10v5" stroke="#3B4FD8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>

          <svg
            viewBox="0 0 120 70"
            fill="none"
            className="pointer-events-none absolute right-[8%] top-2 hidden h-[70px] w-[120px] lg:block"
            aria-hidden
          >
            <path d="M4 10c18 0 22 30 44 30s26-24 46-26" stroke="#4F6BF6" strokeWidth="1.4" strokeDasharray="4 5" strokeLinecap="round" />
            <path d="m94 4 22 14-12 2-3 11-7-27Z" fill="#3B4FD8" />
            <path d="m104 20-6 2" stroke="#fff" strokeWidth="1" />
            <path d="M24 2v6M21 5h6" stroke="#4F6BF6" strokeWidth="1.4" strokeLinecap="round" />
          </svg>

          <dl className="relative z-10 mt-10 grid w-full max-w-[300px] grid-cols-3 divide-x divide-[#E8EBF5] rounded-2xl bg-white px-2 py-4 shadow-[0_14px_36px_rgba(40,60,140,0.12)] lg:absolute lg:bottom-6 lg:left-0 lg:mt-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-2 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex items-center justify-center gap-0.5 text-[20px] font-extrabold text-[#0B1033]">
                  {stat.value}
                  {stat.star ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#F5B400]" fill="currentColor" aria-hidden>
                      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" />
                    </svg>
                  ) : null}
                </dd>
                <dd className="mt-0.5 text-[11px] text-[#475467]" aria-hidden>
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="min-w-0">
          <SignupCard />
        </div>
      </div>
    </main>
  );
}
