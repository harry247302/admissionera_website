import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-[0.18em] text-era-magenta uppercase">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-bold tracking-[-0.04em] text-era-dark sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15] ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`mt-3 max-w-2xl text-base leading-7 text-slate-600 ${className}`}>
      {children}
    </p>
  );
}
