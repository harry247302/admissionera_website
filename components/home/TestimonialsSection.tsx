"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

type Testimonial = {
  name: string;
  course: string;
  quote: string;
  rating: number;
  initials: string;
  avatarTone: string;
  image?: string;
};

type Stat = { value: string; label: string; tone: string; icon: ReactNode };

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rahul Verma",
    course: "BCA Student, Delhi",
    quote:
      "I wasn't sure whether to choose BCA or B.Tech. The counsellors helped me compare colleges and I finally got into a great college. The guidance was clear, honest and really helpful!",
    rating: 5,
    initials: "RV",
    avatarTone: "from-[#DCE7FF] to-[#B9CCFF] text-[#1E4FD8]",
  },
  {
    name: "Ananya Singh",
    course: "MBA Student, Mumbai",
    quote:
      "The counselling session helped me understand my options better. Today I am studying in my dream college!",
    rating: 4.8,
    initials: "AS",
    avatarTone: "from-[#FFE1E7] to-[#FFC2CE] text-[#C2183A]",
  },
  {
    name: "Anjali Sharma",
    course: "B.Tech Student, Pune",
    quote:
      "Admission Era made my admission process so easy. Their guidance helped me choose the right college and course.",
    rating: 4.9,
    initials: "AS",
    avatarTone: "from-[#E3F6EF] to-[#BFEBD9] text-[#0F7A50]",
  },
  {
    name: "Sneha Gupta",
    course: "B.Sc Student, Jaipur",
    quote:
      "A trustworthy platform with genuine information. I am grateful for their help in shaping my future.",
    rating: 4.8,
    initials: "SG",
    avatarTone: "from-[#FFF1D6] to-[#FFE0A3] text-[#946200]",
  },
  {
    name: "Rohit Verma",
    course: "MBA Student, Bengaluru",
    quote:
      "The counselling team was supportive and always available to answer my questions. Highly recommended!",
    rating: 4.7,
    initials: "RV",
    avatarTone: "from-[#ECE8FF] to-[#D6CCFF] text-[#4B3BB5]",
  },
];

const STATS: Stat[] = [
  {
    value: "10K+",
    label: "Students Guided",
    tone: "bg-[#FFE8EC] text-[#D10F2F]",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    value: "500+",
    label: "Top Colleges",
    tone: "bg-[#E3F6EF] text-[#16A36A]",
    icon: (
      <>
        <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0Z" />
        <path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </>
    ),
  },
  {
    value: "4.8/5",
    label: "Student Rating",
    tone: "bg-[#EEEAFF] text-[#6D4AE0]",
    icon: (
      <path
        fill="currentColor"
        d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"
      />
    ),
  },
];

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1.5" aria-label={`${rating} out of 5 stars`}>
      <span className="flex gap-0.5 text-[#F5A900]" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
            <path d="M10 1.8 12.4 7l5.6.5-4.2 3.6 1.3 5.4L10 13.8 4.9 16.5l1.3-5.4L2 7.5 7.6 7 10 1.8Z" />
          </svg>
        ))}
      </span>
      <span className="text-[12px] font-medium text-[#62718A]">{rating.toFixed(1)}</span>
    </span>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <li className="flex flex-col items-start gap-2 rounded-xl border border-[#EDF0F6] bg-white p-3 shadow-[0_4px_14px_rgba(16,27,50,0.04)] sm:flex-row sm:items-center sm:gap-2.5 lg:flex-col lg:items-start lg:p-2.5 xl:flex-row xl:items-center xl:p-3">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full lg:h-8 lg:w-8 xl:h-9 xl:w-9 ${stat.tone}`}
      >
        <Svg className="h-4 w-4">{stat.icon}</Svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[17px] font-extrabold leading-tight text-[#101B32]">
          {stat.value}
        </span>
        <span className="block text-[11px] leading-snug text-[#62718A] sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">
          {stat.label}
        </span>
      </span>
    </li>
  );
}

function Avatar({ testimonial, active }: { testimonial: Testimonial; active: boolean }) {
  const size = active
    ? "h-16 w-16 min-[480px]:h-24 min-[480px]:w-24 lg:h-[104px] lg:w-[104px]"
    : "h-16 w-16 min-[480px]:h-20 min-[480px]:w-20";
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ring-4 ring-white shadow-[0_8px_20px_rgba(16,27,50,0.1)] ${size} ${testimonial.avatarTone}`}
    >
      {testimonial.image ? (
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          sizes="104px"
          className="object-cover"
        />
      ) : (
        <span className="text-xl font-bold min-[480px]:text-2xl" aria-hidden>
          {testimonial.initials}
        </span>
      )}
    </span>
  );
}

function TestimonialCard({ testimonial, active }: { testimonial: Testimonial; active: boolean }) {
  return (
    <article
      className={`relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border bg-white p-4 transition duration-500 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-5 min-[480px]:p-5 ${
        active
          ? "border-[#E8ECF4] shadow-[0_14px_36px_rgba(16,27,50,0.08)]"
          : "scale-[0.94] border-[#EEF1F6] opacity-55 shadow-none"
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-1/2 h-[62%] w-1 -translate-y-1/2 rounded-r-full ${
          active ? "bg-[#1E4FD8]" : "bg-[#9DB4F0]"
        }`}
      />
      <Avatar testimonial={testimonial} active={active} />
      <div className="relative min-w-0 flex-1">
        <span
          aria-hidden
          className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFE8EC] pt-1.5 font-serif text-2xl leading-none text-[#D10F2F]"
        >
          &ldquo;
        </span>
        <blockquote className="text-[13px] leading-[1.6] text-[#101B32] lg:text-[13.5px]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <p className="mt-3 text-[13.5px] font-bold text-[#101B32]">{testimonial.name}</p>
        <p className="text-[11.5px] text-[#62718A]">{testimonial.course}</p>
        <div className="mt-1.5">
          <Stars rating={testimonial.rating} />
        </div>
      </div>
    </article>
  );
}

function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = TESTIMONIALS.length;

  const goTo = (index: number) => setActive((index + count) % count);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const onTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) return;
    const delta = clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <div className="relative min-w-0" aria-roledescription="carousel" aria-label="Student testimonials">
      <div
        className="overflow-hidden py-3"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
      >
        <div
          className="flex gap-4 transition-transform duration-500 ease-out [--slide:88%] min-[480px]:[--slide:84%] lg:[--slide:72%]"
          style={{ transform: `translateX(calc(${-active} * (var(--slide) + 1rem)))` }}
        >
          {TESTIMONIALS.map((testimonial, index) => {
            const isActive = index === active;
            return (
              <div
                key={`${testimonial.name}-${index}`}
                className="relative shrink-0 basis-[var(--slide)]"
                aria-hidden={!isActive}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
              >
                <TestimonialCard testimonial={testimonial} active={isActive} />
                {!isActive ? (
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => goTo(index)}
                    className="absolute inset-0 cursor-pointer"
                    aria-label={`Show testimonial from ${testimonial.name}`}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={next}
        aria-label="Next testimonial"
        className="absolute right-1 top-[calc(50%-22px)] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#D10F2F] shadow-[0_8px_20px_rgba(16,27,50,0.14)] transition hover:bg-[#D10F2F] hover:text-white min-[480px]:flex"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      <div className="mt-3 flex items-center justify-center gap-3 lg:w-[72%]">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8ECF4] bg-white text-[#D10F2F] shadow-[0_2px_8px_rgba(16,27,50,0.06)] transition hover:border-[#D10F2F] hover:bg-[#D10F2F] hover:text-white"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={`dot-${testimonial.name}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === active}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === active ? "w-2.5 bg-[#D10F2F] ring-4 ring-[#FFE1E7]" : "w-2.5 bg-[#D9DEE8] hover:bg-[#B8C0CF]"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial (controls)"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8ECF4] bg-white text-[#D10F2F] shadow-[0_2px_8px_rgba(16,27,50,0.06)] transition hover:border-[#D10F2F] hover:bg-[#D10F2F] hover:text-white"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="journeys-heading"
      className="relative overflow-hidden bg-[linear-gradient(110deg,#F6F8FE_0%,#FFFFFF_48%,#FFF8F9_100%)] py-12 lg:py-14"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#E9EEFF]/70 blur-3xl"
      />
      <svg
        aria-hidden
        viewBox="0 0 40 40"
        className="pointer-events-none absolute right-[4%] top-6 hidden h-8 w-8 text-[#D10F2F] lg:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <path d="M20 4v8M32 10l-5 6M36 24h-8" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 120 50"
        className="pointer-events-none absolute bottom-6 right-[3%] hidden h-10 w-28 text-[#D10F2F] lg:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M4 10c20 30 60 34 104 26" strokeDasharray="4 5" />
        <path d="m100 28 9 8-11 4" strokeLinejoin="round" />
      </svg>

      <div className="era-shell relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E4E9F5] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#1E3A8A] shadow-[0_2px_8px_rgba(30,79,216,0.06)]">
            <Svg className="h-3.5 w-3.5 text-[#1E4FD8]">
              <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0Z" />
              <path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </Svg>
            Student Success Stories
          </span>

          <h2
            id="journeys-heading"
            className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight text-[#101B32] sm:text-[34px] lg:text-[30px] xl:text-[38px]"
          >
            Real Student{" "}
            <span className="relative inline-block text-[#1E4FD8]">
              Journeys
              <svg
                aria-hidden
                viewBox="0 0 160 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-[#F5B800]"
                fill="none"
              >
                <path
                  d="M3 10C40 3 110 2 157 7"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="mt-4 max-w-[440px] text-[13.5px] leading-[1.6] text-[#62718A] sm:text-sm">
            From confused to admitted. Hear real stories from students who achieved their dreams
            with our guidance.
          </p>

          <ul className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
            {STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </ul>
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  );
}
