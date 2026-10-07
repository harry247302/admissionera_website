import type { ReactNode } from "react";
import Link from "next/link";
import { ContentRenderer } from "@/components/courses/CourseContentBlocks";
import { Icon, type IconName } from "@/components/courses/specialization/icons";

export type Crumb = { label: string; href?: string };
export type Fact = { icon: IconName; label: string; value: string };
export type Tone = "violet" | "blue" | "green" | "amber";

const TONES: Record<Tone, { card: string; icon: string; hover: string }> = {
  violet: { card: "bg-[#F6F3FF]", icon: "bg-[#E9E2FF] text-[#4F20C9]", hover: "hover:border-[#CFC2F7]" },
  blue: { card: "bg-[#F1F6FF]", icon: "bg-[#DCE8FF] text-[#2F63E0]", hover: "hover:border-[#BCD2FB]" },
  green: { card: "bg-[#F0FAF5]", icon: "bg-[#D7F2E4] text-[#14935C]", hover: "hover:border-[#B5E4CB]" },
  amber: { card: "bg-[#FFF7EE]", icon: "bg-[#FFE6CC] text-[#D9700F]", hover: "hover:border-[#F8D2A6]" },
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F20C9] focus-visible:ring-offset-2";

export const buttonStyles = {
  primary: `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F20C9] to-[#6D45E8] px-6 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(79,32,201,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(79,32,201,0.36)] ${focusRing}`,
  secondary: `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#CFC2F7] bg-white px-6 text-sm font-semibold text-[#4F20C9] transition hover:-translate-y-0.5 hover:border-[#4F20C9] hover:bg-[#F3F0FF] ${focusRing}`,
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#6B6890]">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? <Icon name="chevronRight" className="h-3.5 w-3.5 text-[#B7B2D6]" /> : null}
              {item.href && !last ? (
                <Link href={item.href} className={`inline-flex items-center gap-1 rounded transition hover:text-[#4F20C9] ${focusRing}`}>
                  {index === 0 ? <Icon name="home" className="h-3.5 w-3.5" /> : null}
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "font-semibold text-[#14123A]" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function FloatingTile({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute flex items-center justify-center rounded-2xl border border-white/70 bg-white/80 shadow-[0_18px_40px_rgba(79,32,201,0.18)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export function TechIllustration() {
  return (
    <div className="relative mx-auto h-[260px] w-full max-w-[440px] sm:h-[300px]" aria-hidden>
      <div className="absolute inset-x-6 bottom-4 h-16 rounded-[50%] bg-[#6D45E8]/15 blur-2xl" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#E4DBFF] to-[#F3F0FF]" />

      <div className="absolute left-1/2 top-[54%] w-[230px] -translate-x-1/2 -translate-y-1/2 sm:w-[260px]">
        <div className="rounded-t-2xl border-[6px] border-[#1E1A4D] bg-gradient-to-br from-[#2A2370] to-[#4F20C9] p-4 shadow-[0_24px_50px_rgba(30,26,77,0.35)]">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FF8A8A]" />
            <span className="h-2 w-2 rounded-full bg-[#FFD27A]" />
            <span className="h-2 w-2 rounded-full bg-[#7BE0A9]" />
          </div>
          <div className="flex h-[92px] items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white sm:h-[104px]">
            <Icon name="code" className="h-10 w-10" strokeWidth={2} />
          </div>
        </div>
        <div className="mx-[-18px] h-3 rounded-b-xl bg-gradient-to-b from-[#D9D4F2] to-[#B9B1E3]" />
      </div>

      <FloatingTile className="left-2 top-10 h-14 w-14 text-[#D9700F] sm:left-4">
        <Icon name="database" className="h-6 w-6" />
      </FloatingTile>
      <FloatingTile className="left-[30%] top-0 h-12 w-16 text-sm font-extrabold text-[#4F20C9]">C++</FloatingTile>
      <FloatingTile className="right-4 top-4 h-16 w-16 text-[#6D45E8]">
        <Icon name="cloud" className="h-7 w-7" />
      </FloatingTile>
      <FloatingTile className="bottom-10 right-0 h-16 w-20 gap-1 px-3 sm:right-2">
        {[10, 18, 13, 24].map((height, index) => (
          <span key={index} className="w-2 rounded-sm bg-gradient-to-t from-[#4F20C9] to-[#8E6CF5]" style={{ height }} />
        ))}
      </FloatingTile>
      <FloatingTile className="bottom-14 left-0 h-11 w-20 flex-col items-start gap-1.5 px-3">
        <span className="h-1.5 w-12 rounded-full bg-[#CFC2F7]" />
        <span className="h-1.5 w-8 rounded-full bg-[#E4DBFF]" />
      </FloatingTile>
    </div>
  );
}

export function StatsStrip({ facts }: { facts: Fact[] }) {
  return (
    <ul
      className={`grid grid-cols-1 gap-2 rounded-2xl border border-[#ECE8FA] bg-white p-3 shadow-[0_18px_44px_rgba(36,24,99,0.08)] min-[420px]:grid-cols-2 sm:p-4 lg:gap-0 lg:divide-x lg:divide-[#ECE8FA] ${
        facts.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {facts.map((fact) => (
        <li key={fact.label} className="flex items-center gap-3 rounded-xl p-2.5 lg:justify-center lg:rounded-none">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F0FF] text-[#4F20C9]">
            <Icon name={fact.icon} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-[#14123A]">{fact.value}</p>
            <p className="text-xs text-[#6B6890]">{fact.label}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[#F3F0FF] px-3 py-1 text-xs font-semibold text-[#4F20C9] ring-1 ring-[#E4DBFF]">
      {children}
    </span>
  );
}

export function HighlightsCard({ title, facts }: { title: string; facts: Fact[] }) {
  return (
    <aside className="rounded-2xl border border-[#E4DBFF] bg-gradient-to-b from-[#F6F3FF] to-[#F3F0FF] p-5 sm:p-6">
      <h3 className="flex items-center gap-2 text-base font-bold text-[#14123A]">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#4F20C9] shadow-sm">
          <Icon name="graduationCap" className="h-4 w-4" />
        </span>
        {title}
      </h3>
      <ul className="mt-4 divide-y divide-[#E4DBFF]">
        {facts.map((fact) => (
          <li key={fact.label} className="flex items-center gap-3 py-3 text-sm">
            <Icon name={fact.icon} className="h-4 w-4 shrink-0 text-[#6D45E8]" />
            <span className="text-[#6B6890]">{fact.label}</span>
            <span className="ml-auto text-right font-semibold text-[#14123A]">{fact.value}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function BenefitCard({
  icon,
  title,
  text,
  tone,
}: {
  icon: IconName;
  title: string;
  text: string;
  tone: Tone;
}) {
  const style = TONES[tone];
  return (
    <article
      className={`h-full rounded-2xl border border-transparent p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(36,24,99,0.08)] ${style.card} ${style.hover}`}
    >
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${style.icon}`}>
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-base font-bold text-[#14123A]">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-[#5D5A80]">{text}</p>
    </article>
  );
}

export function InfoCard({
  id,
  icon,
  title,
  summary,
  content,
  fallback,
  tone,
}: {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  content: string;
  fallback: ReactNode;
  tone: Tone;
}) {
  const style = TONES[tone];
  return (
    <details
      id={id}
      className={`group scroll-mt-40 rounded-2xl border border-transparent transition open:border-[#E4DBFF] open:bg-white open:shadow-[0_16px_36px_rgba(36,24,99,0.08)] ${style.card} ${style.hover}`}
    >
      <summary
        className={`flex cursor-pointer list-none items-start gap-4 rounded-2xl p-5 [&::-webkit-details-marker]:hidden ${focusRing}`}
      >
        <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${style.icon}`}>
          <Icon name={icon} className="h-6 w-6" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold text-[#14123A] sm:text-lg">{title}</span>
          <span className="mt-1 block text-sm leading-6 text-[#5D5A80]">{summary}</span>
        </span>
        <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#4F20C9] shadow-sm transition group-open:rotate-90">
          <Icon name="arrowRight" className="h-4 w-4" />
        </span>
      </summary>
      <div className="px-5 pb-5 sm:pl-[84px]">
        {content ? <ContentRenderer content={content} /> : <div className="text-[15px] leading-7 text-[#5D5A80]">{fallback}</div>}
      </div>
    </details>
  );
}

export function CtaBanner({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3A12A8] via-[#4F20C9] to-[#6D45E8] px-6 py-10 text-white shadow-[0_24px_50px_rgba(79,32,201,0.3)] sm:px-10 lg:py-12">
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-[#8E6CF5]/40 blur-2xl" aria-hidden />
      <div className="pointer-events-none absolute left-1/3 top-6 h-24 w-24 rotate-12 rounded-3xl border border-white/10" aria-hidden />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
            Take the Next Step
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/80 sm:text-base">{text}</p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
          <Link
            href={primary.href}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-[#4F20C9] shadow-[0_10px_24px_rgba(0,0,0,0.15)] transition hover:-translate-y-0.5 hover:bg-[#F3F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4F20C9]"
          >
            {primary.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link
            href={secondary.href}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Icon name="headset" className="h-4 w-4" />
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
