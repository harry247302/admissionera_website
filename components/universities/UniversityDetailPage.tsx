"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  ClipboardCheck,
  GraduationCap,
  Headset,
  MapPin,
  Star,
} from "lucide-react";
import type { CourseFaq } from "@/lib/courseDiscovery";
import type { RichBlock, RichSection, UniversityDetail } from "@/lib/universityDetail";

const C = {
  primary: "#6B21A8",
  dark: "#35066F",
  accent: "#F20D70",
  magenta: "#C026D3",
  light: "#FAF7FF",
  border: "#EDE4F5",
  text: "#17134A",
  muted: "#6B6578",
};

const APPLY_HREF = "/tools/course-finder";
const HERO_FALLBACK = `linear-gradient(118deg, ${C.dark} 0%, ${C.primary} 42%, ${C.magenta} 72%, ${C.accent} 100%)`;

type NavTab = {
  id: string;
  label: string;
  Icon: typeof BookOpen;
};

function hasSection(section: RichSection) {
  return Boolean(section.title || section.blocks.length);
}

function RichContent({ blocks }: { blocks: RichBlock[] }) {
  if (!blocks.length) return null;
  const listItems = blocks.filter((block) => block.type === "li");
  const others = blocks.filter((block) => block.type !== "li");

  return (
    <div className="space-y-3 text-[14.5px] leading-7 text-[#6B6578]">
      {others.map((block, index) =>
        block.type === "heading" ? (
          <h3 key={`${block.text}-${index}`} className="pt-1 text-[16px] font-extrabold text-[#17134A]">
            {block.text}
          </h3>
        ) : (
          <p key={`${block.text.slice(0, 40)}-${index}`}>{block.text}</p>
        )
      )}
      {listItems.length ? (
        <ul className="space-y-2">
          {listItems.map((block, index) => (
            <li key={`${block.text.slice(0, 40)}-${index}`} className="flex items-start gap-2.5">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[#F20D70]" />
              <span>{block.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-[1.15rem] font-extrabold tracking-tight text-[#17134A] sm:text-2xl">
      <span
        className="inline-block h-6 w-1 shrink-0 rounded-full"
        style={{ background: `linear-gradient(180deg, ${C.primary}, ${C.accent})` }}
        aria-hidden
      />
      {children}
    </h2>
  );
}

function WhiteCard({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 rounded-2xl border border-[#EDE4F5] bg-white p-4 shadow-[0_8px_24px_rgba(53,6,111,0.06)] sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function UniversityHero({ university, lead }: { university: UniversityDetail; lead: string }) {
  const banner = university.banner;
  const stats = [
    university.location ? { label: "Location", value: university.location, Icon: MapPin } : null,
    university.established ? { label: "Established", value: university.established, Icon: Building2 } : null,
    university.grade ? { label: "Grade", value: university.grade, Icon: Award } : null,
    university.ratings != null ? { label: "Rating", value: `${university.ratings.toFixed(1)}/5`, Icon: Star } : null,
    university.state ? { label: "State", value: university.state, Icon: MapPin } : null,
  ].filter(Boolean) as { label: string; value: string; Icon: typeof MapPin }[];

  return (
    <section className="relative bg-[#1a1224] text-white">
      <div className="relative min-h-[380px] overflow-hidden sm:min-h-[440px] lg:min-h-[480px]">
        {banner ? (
          <Image
            src={banner}
            alt={`${university.name} campus`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0" style={{ background: HERO_FALLBACK }} />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(18,12,28,0.88) 0%, rgba(18,12,28,0.62) 42%, rgba(18,12,28,0.18) 72%, rgba(18,12,28,0.08) 100%)",
          }}
          aria-hidden
        />

        <div className="era-shell relative flex min-h-[380px] flex-col justify-center pb-24 pt-10 sm:min-h-[440px] sm:pb-28 lg:min-h-[480px] lg:pb-32">
          <div className="max-w-xl">
            {university.shortName ? (
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold tracking-wide text-white backdrop-blur-sm">
                {university.shortName}
              </span>
            ) : null}

            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.1rem]">
              {university.name}
            </h1>

            {lead ? (
              <p className="mt-4 max-w-lg text-[14px] leading-7 text-white/85 sm:text-[15px]">{lead}</p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {university.ratings != null ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-semibold backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {university.ratings.toFixed(1)} Rating
                </span>
              ) : null}
              {university.grade ? (
                <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-semibold backdrop-blur-sm">
                  Grade {university.grade}
                </span>
              ) : null}
              {university.established ? (
                <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-semibold backdrop-blur-sm">
                  Est. {university.established}
                </span>
              ) : null}
              {university.worldRank != null ? (
                <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-semibold backdrop-blur-sm">
                  Rank #{university.worldRank}
                </span>
              ) : null}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={APPLY_HREF}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#7A1848] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(122,24,72,0.35)] transition hover:bg-[#64133b]"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={APPLY_HREF}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Get Counselling
              </Link>
            </div>
          </div>
        </div>
      </div>

      {stats.length ? (
        <div className="era-shell relative z-10 -mt-12 sm:-mt-14">
          <div className="grid grid-cols-2 gap-4 rounded-[1.5rem] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(23,18,37,0.12)] sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF7FF] text-[#7A1848]">
                  <stat.Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-[#17134A]">{stat.label}</p>
                  <p className="mt-0.5 text-[13px] leading-5 text-[#6B6578]">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function UniversityNavigation({ activeSection, tabs }: { activeSection: string; tabs: NavTab[] }) {
  if (!tabs.length) return null;

  return (
    <nav
      className="sticky top-[64px] z-30 w-full border-b border-[#EDE4F5] bg-white/95 shadow-sm backdrop-blur-md sm:top-[72px] lg:top-[78px]"
      aria-label="University sections"
    >
      <div className="era-shell">
        <div className="-mx-1 flex snap-x snap-mandatory gap-0 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const active = activeSection === tab.id;
            const Icon = tab.Icon;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`relative flex snap-start shrink-0 items-center gap-2 px-3 py-3 text-[13px] font-semibold transition sm:px-5 sm:py-4 sm:text-sm ${
                  active ? "bg-[#FAF7FF] text-[#6B21A8]" : "text-[#6B6578] hover:text-[#17134A]"
                }`}
                style={{ borderBottom: active ? `2px solid ${C.primary}` : "2px solid transparent" }}
              >
                <Icon className="hidden h-4 w-4 sm:inline" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function ApprovalsSection({ university }: { university: UniversityDetail }) {
  if (!university.approvals.length) return null;

  return (
    <WhiteCard id="approvals">
      <SectionHeading>Approvals & Accreditations</SectionHeading>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {university.approvals.map((item) => (
          <article
            key={item.id}
            className="flex flex-col items-center rounded-2xl border border-[#EDE4F5] bg-[#FAF7FF] p-4 text-center"
          >
            {item.logo ? (
              <Image src={item.logo} alt={item.name} width={72} height={72} className="h-14 w-14 object-contain" unoptimized />
            ) : (
              <Award className="h-10 w-10 text-[#6B21A8]" />
            )}
            <p className="mt-3 text-[13px] font-extrabold text-[#17134A]">{item.name}</p>
            {item.description ? (
              <p className="mt-1 text-[12px] leading-5 text-[#6B6578]">{item.description}</p>
            ) : null}
          </article>
        ))}
      </div>
    </WhiteCard>
  );
}

function RecruitersSection({ names }: { names: string[] }) {
  if (!names.length) return null;

  return (
    <WhiteCard id="recruiters">
      <SectionHeading>Top Recruiters</SectionHeading>
      <div className="mt-5 flex flex-wrap gap-2">
        {names.map((name) => (
          <span
            key={name}
            className="rounded-full border border-[#EDE4F5] bg-[#FAF7FF] px-3 py-1.5 text-[13px] font-semibold text-[#17134A]"
          >
            {name}
          </span>
        ))}
      </div>
    </WhiteCard>
  );
}

function FAQSection({ faqs, name }: { faqs: CourseFaq[]; name: string }) {
  const active = faqs.filter((faq) => faq?.is_active !== false && faq.question);
  const [openId, setOpenId] = useState<string | null>(active[0]?.id ?? null);
  if (!active.length) return null;

  return (
    <WhiteCard id="faqs">
      <SectionHeading>Frequently Asked Questions{name ? ` about ${name}` : ""}</SectionHeading>
      <div className="mt-5 space-y-3">
        {active.map((faq, index) => {
          const open = openId === faq.id;
          return (
            <article
              key={faq.id}
              className="overflow-hidden rounded-2xl border bg-white transition"
              style={{ borderColor: open ? C.primary : C.border }}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenId(open ? null : faq.id)}
                aria-expanded={open}
              >
                <span className="text-[14px] font-semibold leading-6 text-[#17134A] sm:text-[15px]">
                  <span className="mr-1.5 font-bold text-[#6B21A8]">Q{index + 1}.</span>
                  {faq.question.replace(/^Q\d+\.\s*/i, "")}
                </span>
                <span
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{ background: open ? C.primary : C.light, color: open ? "white" : C.primary }}
                >
                  {open ? "−" : "+"}
                </span>
              </button>
              <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pr-12 text-[14px] leading-7 text-[#6B6578]">{faq.answer}</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </WhiteCard>
  );
}

function BottomCTA({ name }: { name: string }) {
  return (
    <section
      className="relative overflow-hidden py-12 text-white"
      style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.primary} 42%, ${C.magenta} 72%, ${C.accent} 100%)` }}
    >
      <div className="era-shell relative flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Ready to start at {name}?</h2>
          <p className="mt-2 max-w-xl text-white/80">Talk to a counsellor and get guidance on admissions, eligibility and next steps.</p>
        </div>
        <Link
          href={APPLY_HREF}
          className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-extrabold text-[#6B21A8] transition hover:-translate-y-0.5 sm:w-auto"
        >
          <Headset className="h-4 w-4" />
          Get Counselling
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

export function UniversityDetailPage({ university }: { university: UniversityDetail }) {
  const displayName = university.shortName || university.name;
  const aboutLead = university.about.blocks.find((block) => block.type === "p")?.text || "";
  const activeFaqs = university.faqs.filter((faq) => faq?.is_active !== false && faq.question);
  const careerWithoutRecruiters: RichSection = {
    ...university.career,
    blocks: university.career.blocks.filter(
      (block) => !university.recruiters.includes(block.text) && !/hiring partner|recruiter/i.test(block.text)
    ),
  };

  const navTabs: NavTab[] = [
    ...(hasSection(university.about) ? [{ id: "about", label: "About", Icon: BookOpen }] : []),
    ...(hasSection(university.features) ? [{ id: "features", label: "Key Features", Icon: Award }] : []),
    ...(university.approvals.length ? [{ id: "approvals", label: "Approvals", Icon: Award }] : []),
    ...(hasSection(university.admission) ? [{ id: "admission", label: "Admission", Icon: ClipboardCheck }] : []),
    ...(hasSection(careerWithoutRecruiters) ? [{ id: "career", label: "Careers", Icon: Briefcase }] : []),
    ...(university.recruiters.length ? [{ id: "recruiters", label: "Recruiters", Icon: GraduationCap }] : []),
    ...(activeFaqs.length ? [{ id: "faqs", label: "FAQ", Icon: ClipboardCheck }] : []),
  ];

  const [activeSection, setActiveSection] = useState(navTabs[0]?.id || "about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navTabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(tab.id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [navTabs.map((tab) => tab.id).join("|")]);

  return (
    <main id="main" className="bg-[#FAF7FF] text-[#17134A]">
      <UniversityHero university={university} lead={aboutLead.slice(0, 220)} />
      <UniversityNavigation activeSection={activeSection} tabs={navTabs} />

      <div className="era-shell py-6 sm:py-8 lg:py-10">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-[#6B6578]" aria-label="Breadcrumb">
          <Link href="/" className="font-medium text-[#6B21A8] hover:underline">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/universities" className="font-medium text-[#6B21A8] hover:underline">Universities</Link>
          <span aria-hidden>›</span>
          <span className="font-semibold text-[#17134A]">{university.name}</span>
        </nav>

        <div className="space-y-6 sm:space-y-8">
          {hasSection(university.about) ? (
            <WhiteCard id="about">
              <SectionHeading>{university.about.title || `About ${university.name}`}</SectionHeading>
              <div className="mt-4">
                <RichContent blocks={university.about.blocks} />
              </div>
            </WhiteCard>
          ) : null}

          {hasSection(university.features) ? (
            <WhiteCard id="features">
              <SectionHeading>{university.features.title || "Key Features"}</SectionHeading>
              <div className="mt-4">
                <RichContent blocks={university.features.blocks} />
              </div>
            </WhiteCard>
          ) : null}

          <ApprovalsSection university={university} />

          {hasSection(university.admission) ? (
            <WhiteCard id="admission">
              <SectionHeading>{university.admission.title || "Admission Process"}</SectionHeading>
              <div className="mt-4">
                <RichContent blocks={university.admission.blocks} />
              </div>
            </WhiteCard>
          ) : null}

          {hasSection(careerWithoutRecruiters) ? (
            <WhiteCard id="career">
              <SectionHeading>{university.career.title || "Career Prospects"}</SectionHeading>
              <div className="mt-4">
                <RichContent blocks={careerWithoutRecruiters.blocks} />
              </div>
            </WhiteCard>
          ) : null}

          <RecruitersSection names={university.recruiters} />
          <FAQSection faqs={activeFaqs} name={displayName} />
        </div>
      </div>

      <BottomCTA name={displayName} />
    </main>
  );
}
