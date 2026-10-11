import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PG_CATEGORIES } from "./categories";

const GUIDANCE_IMAGE = "/assets/pg-courses/global-learning.png";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
      {children}
    </svg>
  );
}

function CategoryGlyph({ id }: { id: string }) {
  switch (id) {
    case "executive":
      return <Icon><rect x="3.5" y="7.5" width="17" height="12" rx="2" /><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5" /></Icon>;
    case "doctorate":
      return <Icon><circle cx="12" cy="9" r="4.2" /><path d="m8.8 12.6-1 6.4 4.2-2.2 4.2 2.2-1-6.4" /></Icon>;
    case "genai":
      return <Icon><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /><circle cx="12" cy="12" r="3" /></Icon>;
    case "ug":
      return <Icon><path d="M12 6.2C10.2 4.8 7.4 4.4 4.5 5v12.2c2.8-.6 5.6-.2 7.5 1.3 1.9-1.5 4.7-1.9 7.5-1.3V5c-2.9-.6-5.7-.2-7.5 1.2Z" /><path d="M12 6.2v12.3" /></Icon>;
    case "engineering":
      return <Icon><circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.2M12 18.3V21M3.5 12h2.2M18.3 12H21M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M6.1 17.9l1.6-1.6M16.3 7.7l1.6-1.6" /></Icon>;
    case "abroad":
      return <Icon><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2.2 2.4 2.2 13.6 0 16M12 4c-2.2 2.4-2.2 13.6 0 16" /></Icon>;
    case "skilling":
      return <Icon><path d="M7 3.5h7l4 4V20.5H7V3.5Z" /><path d="M14 3.5V8h4M9 12h6M9 15.5h4" /></Icon>;
    default:
      return <Icon><path d="M3.5 10.2 12 5.2l8.5 5-8.5 5-8.5-5Z" /><path d="M7.2 12.2v3.6c0 .7 2.1 2 4.8 2s4.8-1.3 4.8-2v-3.6" /><path d="M20.5 10.2v4.2" /></Icon>;
  }
}

export function CategorySidebar({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="w-full lg:sticky lg:top-4 lg:w-[248px] lg:shrink-0">
      <nav
        aria-label="Course categories"
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:max-h-[calc(100vh-2rem)] lg:flex-col lg:gap-1 lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {PG_CATEGORIES.map((category) => {
          const active = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              aria-current={active ? "true" : undefined}
              className={`flex min-w-[220px] items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition duration-200 lg:min-w-0 ${
                active
                  ? "bg-[#5B4DFF] text-white shadow-[0_10px_22px_rgba(91,77,255,0.28)]"
                  : "bg-white text-[#1B1448] hover:bg-[#F4F2FF]"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  active ? "bg-white/15 text-white" : "bg-[#F3F0FF] text-[#6D63C7]"
                }`}
              >
                <CategoryGlyph id={category.id} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-bold leading-tight">{category.title}</span>
                <span className={`mt-0.5 block truncate text-[11px] leading-tight ${active ? "text-white/80" : "text-[#8B93A7]"}`}>
                  {category.subtitle}
                </span>
              </span>
              <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 ${active ? "text-white/80" : "text-[#C5C9D6]"}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </nav>

      <div className="mt-4 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#F7F4FF_0%,#EFE9FF_100%)] px-4 pb-4 pt-3 text-center shadow-[0_8px_24px_rgba(91,77,255,0.08)]">
        <div className="relative mx-auto h-[128px] w-full">
          <Image
            src={GUIDANCE_IMAGE}
            alt=""
            fill
            sizes="220px"
            className="object-contain"
          />
        </div>
        <p className="mt-1 text-[13px] font-bold leading-snug text-[#1B1448]">
          Not sure which course is right?
        </p>
        <Link
          href="/tools/course-finder"
          className="mt-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#5B4DFF] px-4 text-[12.5px] font-semibold text-white shadow-[0_8px_16px_rgba(91,77,255,0.28)] transition duration-200 hover:-translate-y-px hover:bg-[#4636F0]"
        >
          Get Free Guidance
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
