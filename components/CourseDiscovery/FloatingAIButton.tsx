"use client";

import { useState } from "react";
import { COURSES, formatFee, type Course } from "@/lib/courses";
import { SparkleIcon, CloseIcon } from "@/components/icons";

type FloatingAIButtonProps = {
  open: boolean;
  raised?: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function FloatingAIButton({ open, raised = false, onOpen, onClose }: FloatingAIButtonProps) {
  const [goal, setGoal] = useState("");
  const [results, setResults] = useState<Course[] | null>(null);

  const handleClose = () => {
    setResults(null);
    setGoal("");
    onClose();
  };

  const recommend = () => {
    const q = goal.toLowerCase();
    const matches = COURSES.filter(
      (course) =>
        course.title.toLowerCase().includes(q) ||
        course.specialization.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q),
    ).slice(0, 3);
    setResults(matches.length > 0 ? matches : COURSES.slice(0, 3));
  };

  return (
    <>
      <button type="button" className={`cd-fab ${raised ? "cd-fab-raised" : ""}`} onClick={onOpen}>
        <SparkleIcon className="h-4 w-4" />
        Ask AI
      </button>
      {open ? (
        <div className="cd-modal-root">
          <button type="button" className="cd-modal-backdrop" aria-label="Close AI finder" onClick={handleClose} />
          <div className="cd-modal" role="dialog" aria-modal="true" aria-labelledby="ai-finder-title">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p id="ai-finder-title" className="text-lg font-bold text-[#111827]">
                  AI Course Finder
                </p>
                <p className="mt-1 text-sm text-[#667085]">
                  Describe a career goal, exam or program. We’ll suggest a shortlist.
                </p>
              </div>
              <button type="button" className="cd-icon-ghost" aria-label="Close" onClick={handleClose}>
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <label className="mt-5 block text-sm font-medium text-[#111827]">
              Your goal
              <input
                value={goal}
                className="cd-input mt-2"
                placeholder="e.g. data science after BCA, or a one-year MBA"
                onChange={(event) => setGoal(event.target.value)}
              />
            </label>
            <button type="button" className="cd-btn-primary mt-4 w-full" onClick={recommend}>
              Find my course
            </button>
            {results ? (
              <ul className="mt-5 space-y-3">
                {results.map((course) => (
                  <li key={course.id} className="rounded-2xl border border-[#E5E7EB] p-3">
                    <p className="font-semibold text-[#111827]">{course.title}</p>
                    <p className="text-sm text-[#667085]">
                      {course.university} · {formatFee(course.fee)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
