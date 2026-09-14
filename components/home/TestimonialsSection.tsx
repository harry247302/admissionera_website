"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { SectionEyebrow, SectionHeading, SectionLead } from "./SectionHeading";

const TESTIMONIALS = [
  {
    name: "Anjali Sharma",
    course: "B.Tech Student",
    quote:
      "Admission Era made my admission process so easy. Their guidance helped me choose the right college and course.",
    initials: "AS",
  },
  {
    name: "Rohit Verma",
    course: "MBA Student",
    quote:
      "The counselling team was supportive and always available to answer my questions. Highly recommended!",
    initials: "RV",
  },
  {
    name: "Sneha Gupta",
    course: "B.Sc Student",
    quote:
      "A trustworthy platform with genuine information. I am grateful for their help in shaping my future.",
    initials: "SG",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.8 12.4 7l5.6.5-4.2 3.6 1.3 5.4L10 13.8 4.9 16.5l1.3-5.4L2 7.5 7.6 7 10 1.8Z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1));
  const next = () => setActive((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="era-shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Student Stories</SectionEyebrow>
            <SectionHeading className="mt-3">What Our Students Say</SectionHeading>
            <SectionLead>
              Real experiences from students who found the right path with Admission Era.
            </SectionLead>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-violet-200 bg-white text-era-dark transition hover:border-era-magenta hover:text-era-magenta"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-violet-200 bg-white text-era-dark transition hover:border-era-magenta hover:text-era-magenta"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item, index) => {
            const isActive = index === active;
            return (
              <article
                key={item.name}
                className={`era-card-lift relative rounded-[1.75rem] border bg-white p-6 shadow-[0_12px_32px_rgba(23,19,74,0.05)] transition ${
                  isActive
                    ? "border-fuchsia-200 ring-2 ring-fuchsia-100 md:scale-[1.02]"
                    : "border-violet-100 opacity-95"
                }`}
              >
                <span className="absolute top-5 right-6 text-4xl font-serif text-fuchsia-200" aria-hidden>
                  “
                </span>
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white">
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-bold text-era-dark">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.course}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Stars />
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.quote}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
