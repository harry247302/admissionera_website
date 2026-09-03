"use client";

import Link from "next/link";

type AdvisorCTAProps = {
  onAskAI: () => void;
};

export function AdvisorCTA({ onAskAI }: AdvisorCTAProps) {
  return (
    <section className="cd-advisor">
      <div>
        <h3 className="text-xl font-bold tracking-[-0.03em] text-[#111827]">
          Not sure which program is right for you?
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#667085]">
          Get personalized recommendations from our education experts, or let AI
          shortlist programs around your goal, budget and schedule.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/signin" className="cd-btn-primary">
          Talk to an advisor
        </Link>
        <button type="button" className="cd-btn-ghost" onClick={onAskAI}>
          Let AI recommend
        </button>
      </div>
    </section>
  );
}
