"use client";

import { SparkleIcon } from "@/components/icons";

type AIRecommendationProps = {
  onOpen: () => void;
};

export function AIRecommendation({ onOpen }: AIRecommendationProps) {
  return (
    <button type="button" className="cd-ai-card" onClick={onOpen}>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#4F46E5] shadow-sm">
        <SparkleIcon className="h-5 w-5" />
      </span>
      <span className="text-left">
        <span className="block text-sm font-bold text-[#111827]">AI Course Finder</span>
        <span className="mt-1 block text-sm text-[#667085]">
          Tell us your career goal and we’ll recommend the best programs.
        </span>
      </span>
      <span className="cd-ai-pill">Find my course</span>
    </button>
  );
}
