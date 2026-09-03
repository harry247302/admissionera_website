import type { ReactNode } from "react";
import Link from "next/link";

type InnerPageProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function InnerPage({ title, description, children }: InnerPageProps) {
  return (
    <main id="main" className="mx-auto w-full max-w-[1320px] px-4 py-12 lg:px-6 lg:py-16">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand">
        AdmissionEra
      </p>
      <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-[-0.03em] text-navy lg:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{description}</p>
      {children}
      <p className="mt-10">
        <Link href="/" className="text-sm font-semibold text-brand hover:underline">
          Back to home
        </Link>
      </p>
    </main>
  );
}
