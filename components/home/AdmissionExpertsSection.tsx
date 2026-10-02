"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  expertContactHref,
  type AdmissionExpert,
  type ExpertTone,
} from "@/lib/admissionExperts";

const VIEW_ALL_HREF = "/about";

const TONE_STYLES: Record<ExpertTone, { portrait: string; initials: string }> = {
  pink: { portrait: "from-[#FFE9EE] to-[#FFF6F8]", initials: "bg-[#FFD3DD] text-[#A80E27]" },
  mint: { portrait: "from-[#E3F6EF] to-[#F4FBF8]", initials: "bg-[#C9EEDF] text-[#0F7A50]" },
  yellow: { portrait: "from-[#FFF3D6] to-[#FFFAEE]", initials: "bg-[#FFE6A8] text-[#946200]" },
  lavender: { portrait: "from-[#ECE8FF] to-[#F7F5FF]", initials: "bg-[#DCD4FF] text-[#4B3BB5]" },
};

const BENEFITS: { title: string; subtitle: string; tone: string; icon: ReactNode }[] = [
  {
    title: "1:1 Guidance",
    subtitle: "Personalised support",
    tone: "bg-[#FFE8EC] text-[#D10F2F]",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />,
  },
  {
    title: "Verified Experts",
    subtitle: "Domain specialists",
    tone: "bg-[#EEEAFF] text-[#5B3FD6]",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Trusted by Students",
    subtitle: "10K+ successful admissions",
    tone: "bg-[#E3F6EF] text-[#16B86A]",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

function Svg({
  children,
  className,
  strokeWidth = 2,
}: {
  children: ReactNode;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const ArrowRight = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <Svg className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </Svg>
);

function BenefitItem({ benefit }: { benefit: (typeof BENEFITS)[number] }) {
  return (
    <li className="flex items-center gap-2.5 xl:flex-col xl:items-start xl:gap-2">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full xl:h-8 xl:w-8 ${benefit.tone}`}
      >
        <Svg className="h-4 w-4">{benefit.icon}</Svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[12.5px] font-bold leading-tight text-[#101B32]">
          {benefit.title}
        </span>
        <span className="block text-[11px] leading-snug text-[#62718A]">{benefit.subtitle}</span>
      </span>
    </li>
  );
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ExpertCard({ expert, primary }: { expert: AdmissionExpert; primary: boolean }) {
  const tone = TONE_STYLES[expert.tone];
  const contactHref = expertContactHref(expert);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#F0E5E9] bg-white shadow-[0_6px_20px_rgba(16,27,50,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(209,15,47,0.1)]">
      <div className={`relative h-[148px] bg-gradient-to-b ${tone.portrait}`}>
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60"
        />
        {expert.image ? (
          <Image
            src={expert.image}
            alt={`${expert.name}, ${expert.specialisation} counsellor`}
            fill
            sizes="(max-width: 640px) 80vw, 220px"
            className="object-contain object-bottom"
          />
        ) : (
          <span
            role="img"
            aria-label={`${expert.name}, ${expert.specialisation} counsellor`}
            className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-2xl font-bold shadow-[0_8px_20px_rgba(16,27,50,0.08)] ring-4 ring-white ${tone.initials}`}
          >
            {initialsOf(expert.name)}
          </span>
        )}

        {expert.online ? (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-semibold text-[#16B86A] shadow-[0_2px_6px_rgba(16,27,50,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16B86A]" />
            Online
          </span>
        ) : null}

        <Link
          href={contactHref}
          aria-label={`Chat with ${expert.name}`}
          className="absolute -bottom-3.5 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#F0E5E9] bg-white text-[#D10F2F] shadow-[0_4px_12px_rgba(16,27,50,0.12)] transition hover:scale-110 hover:bg-[#D10F2F] hover:text-white"
        >
          <Svg className="h-3.5 w-3.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
          </Svg>
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <h3 className="flex items-center gap-1 text-[14px] font-bold text-[#101B32]">
          <span className="truncate">{expert.name}</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-label="Verified">
            <path
              fill="#2F80ED"
              d="m12 1 2.6 2.1 3.3-.3.9 3.2 2.9 1.7-1.2 3.1 1.2 3.1-2.9 1.7-.9 3.2-3.3-.3L12 23l-2.6-2.1-3.3.3-.9-3.2-2.9-1.7 1.2-3.1L2.3 9.1l2.9-1.7.9-3.2 3.3.3Z"
            />
            <path
              d="m8 12 3 3 5-6"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </h3>
        <p className="mt-0.5 truncate text-[12px] text-[#62718A]">{expert.specialisation}</p>
        <p className="mt-1.5 flex items-center gap-1 text-[11.5px] text-[#62718A]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#F5A900]" aria-hidden>
            <path
              fill="currentColor"
              d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"
            />
          </svg>
          <span className="font-semibold text-[#101B32]">{expert.rating.toFixed(1)}</span>
          <span>({expert.studentsGuided} students)</span>
        </p>

        <Link
          href={contactHref}
          className={`mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg text-[12.5px] font-semibold transition duration-200 ${
            primary
              ? "bg-[#D10F2F] text-white shadow-[0_6px_14px_rgba(209,15,47,0.25)] hover:bg-[#A80E27]"
              : "bg-[#FFECEF] text-[#D10F2F] hover:bg-[#D10F2F] hover:text-white"
          }`}
        >
          Talk to Expert
          <ArrowRight />
        </Link>
      </div>
    </article>
  );
}

function ExpertsCarousel({ experts }: { experts: AdmissionExpert[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const frame = requestAnimationFrame(updateControls);
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 14), behavior: "smooth" });
  };

  const controlClass =
    "absolute top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F0E5E9] bg-white text-[#D10F2F] shadow-[0_6px_16px_rgba(16,27,50,0.12)] transition hover:bg-[#D10F2F] hover:text-white disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="-my-2 flex snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Admission experts"
      >
        {experts.map((expert, index) => (
          <div
            key={expert.slug}
            className="shrink-0 grow-0 basis-[82%] snap-start min-[480px]:basis-[calc((100%-14px)/2)] md:basis-[calc((100%-28px)/3)] xl:basis-[calc((100%-42px)/4)]"
          >
            <ExpertCard expert={expert} primary={index === 0} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous experts"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        className={`${controlClass} -left-3 sm:-left-5`}
      >
        <Svg className="h-4 w-4 rotate-180">
          <path d="m9 18 6-6-6-6" />
        </Svg>
      </button>
      <button
        type="button"
        aria-label="Next experts"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        className={`${controlClass} -right-3 sm:-right-5`}
      >
        <Svg className="h-4 w-4">
          <path d="m9 18 6-6-6-6" />
        </Svg>
      </button>
    </div>
  );
}

export function AdmissionExpertsSection({ experts }: { experts: AdmissionExpert[] }) {
  return (
    <section
      aria-labelledby="experts-heading"
      className="relative overflow-hidden bg-[linear-gradient(105deg,#FFFBFC_0%,#FFF3F5_55%,#FFF8F9_100%)] py-12 lg:py-14"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FFE4EA]/70 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-[20%] h-80 w-80 rounded-full border-[40px] border-[#FFEFF2]/80"
      />

      <div className="era-shell relative grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,30fr)_minmax(0,70fr)] lg:items-center lg:gap-8">
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F7D3DA] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#D10F2F] shadow-[0_2px_8px_rgba(209,15,47,0.06)]">
            <Svg className="h-3.5 w-3.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </Svg>
            Expert Counsellors
          </span>

          <h2
            id="experts-heading"
            className="mt-4 text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#101B32] sm:text-[34px] lg:text-[29px] xl:text-[38px]"
          >
            Meet Our
            <span className="block text-[#D10F2F]">Admission Experts</span>
          </h2>
          <p className="mt-3 max-w-[400px] text-[13.5px] leading-[1.6] text-[#62718A] sm:text-sm">
            Talk to our experienced counsellors and get personalised guidance for your career
            and college admissions.
          </p>

          <svg
            aria-hidden
            viewBox="0 0 90 60"
            className="pointer-events-none absolute -right-2 top-[50%] hidden h-12 w-16 text-[#D10F2F] xl:block"
            fill="none"
          >
            <path
              d="M4 52c14 2 24-6 22-16-2-8-12-6-10 2 3 10 22 10 34-4 7-8 12-18 22-24"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="m66 8 8 2-3 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <ul className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 xl:gap-3">
            {BENEFITS.map((benefit) => (
              <BenefitItem key={benefit.title} benefit={benefit} />
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex justify-end">
            <Link
              href={VIEW_ALL_HREF}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#F0E5E9] bg-white px-5 text-[13px] font-semibold text-[#D10F2F] shadow-[0_4px_14px_rgba(16,27,50,0.06)] transition hover:-translate-y-px hover:border-[#D10F2F] hover:shadow-[0_8px_20px_rgba(209,15,47,0.12)]"
            >
              View All Experts
              <ArrowRight />
            </Link>
          </div>
          <ExpertsCarousel experts={experts} />
        </div>
      </div>
    </section>
  );
}
