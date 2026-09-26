"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type {
  CourseContentParagraph,
  CourseContentTable,
  CourseFaq,
} from "@/lib/courseDiscovery";

type TextBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

const BULLET = /^[-•*]\s+/;
const NUMBERED = /^\d+[.)]\s+/;

function parseRichText(content = ""): TextBlock[] {
  const normalized = String(content).replace(/\r\n/g, "\n").replace(/\\n/g, "\n").trim();
  if (!normalized) return [];

  const chunks = normalized.split(/\n\s*\n/).map((chunk) => chunk.trim()).filter(Boolean);
  const blocks: TextBlock[] = [];

  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) continue;

    const allBullets = lines.every((line) => BULLET.test(line));
    const allNumbered = lines.every((line) => NUMBERED.test(line));

    if (allBullets) {
      blocks.push({ type: "ul", items: lines.map((line) => line.replace(BULLET, "").trim()) });
      continue;
    }
    if (allNumbered) {
      blocks.push({ type: "ol", items: lines.map((line) => line.replace(NUMBERED, "").trim()) });
      continue;
    }

    let buffer: string[] = [];
    let list: { type: "ul" | "ol"; items: string[] } | null = null;

    const flushText = () => {
      const text = buffer.join(" ").trim();
      if (text) blocks.push({ type: "p", text });
      buffer = [];
    };
    const flushList = () => {
      if (list?.items.length) blocks.push(list);
      list = null;
    };

    for (const line of lines) {
      if (BULLET.test(line)) {
        flushText();
        if (list?.type !== "ul") {
          flushList();
          list = { type: "ul", items: [] };
        }
        list.items.push(line.replace(BULLET, "").trim());
        continue;
      }
      if (NUMBERED.test(line)) {
        flushText();
        if (list?.type !== "ol") {
          flushList();
          list = { type: "ol", items: [] };
        }
        list.items.push(line.replace(NUMBERED, "").trim());
        continue;
      }
      flushList();
      buffer.push(line);
    }
    flushText();
    flushList();
  }

  return blocks;
}

export function ContentRenderer({ content }: { content: string }) {
  const blocks = useMemo(() => parseRichText(content), [content]);
  if (!blocks.length) return null;

  return (
    <div className="space-y-4 text-[15px] leading-[1.8] text-[#475569] sm:text-base">
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return <p key={`p-${index}`}>{block.text}</p>;
        }
        if (block.type === "ul") {
          return (
            <ul key={`ul-${index}`} className="space-y-2 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={`ol-${index}`} className="space-y-2">
            {block.items.map((item, itemIndex) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#eaf2ff] text-[11px] font-bold text-[#2563eb]">
                  {itemIndex + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}

function paragraphAnchor(paragraph: CourseContentParagraph) {
  return `paragraph-${paragraph.id}`;
}

export function CourseParagraphSection({
  paragraph,
  index,
}: {
  paragraph: CourseContentParagraph;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const blocks = useMemo(() => parseRichText(paragraph.content), [paragraph.content]);
  const needsToggle = blocks.length > 3;
  const visibleBlocks = !expanded && needsToggle ? blocks.slice(0, 3) : blocks;

  return (
    <article
      id={paragraphAnchor(paragraph)}
      className="scroll-mt-28 rounded-[20px] border border-[#dbe5f1] bg-white p-5 shadow-[0_10px_30px_rgba(18,38,63,0.04)] sm:p-7"
    >
      <div className="flex items-start gap-3">
        <span className="mt-1 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#eaf2ff] text-[11px] font-extrabold text-[#2563eb]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 shrink-0 rounded-full bg-[#2563eb]" aria-hidden />
            <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[#12263f] sm:text-2xl">
              {paragraph.title}
            </h2>
          </div>
          <div className="mt-4 h-px w-full bg-[#dbe5f1]" />
        </div>
      </div>

      <div className="mt-5">
        <div className="relative">
          <div className="space-y-4 text-[15px] leading-[1.8] text-[#475569] sm:text-base">
            {visibleBlocks.map((block, blockIndex) => {
              if (block.type === "p") return <p key={`p-${blockIndex}`}>{block.text}</p>;
              if (block.type === "ul") {
                return (
                  <ul key={`ul-${blockIndex}`} className="space-y-2 pl-1">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <ol key={`ol-${blockIndex}`} className="space-y-2">
                  {block.items.map((item, itemIndex) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#eaf2ff] text-[11px] font-bold text-[#2563eb]">
                        {itemIndex + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              );
            })}
          </div>
          {!expanded && needsToggle ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
          ) : null}
        </div>
        {needsToggle ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold text-[#2563eb] transition hover:text-[#1d4ed8]"
          >
            {expanded ? "Read Less ↑" : "Read More ↓"}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function CourseContentNav({ paragraphs }: { paragraphs: CourseContentParagraph[] }) {
  const [activeId, setActiveId] = useState(paragraphs[0] ? paragraphAnchor(paragraphs[0]) : "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    paragraphs.forEach((paragraph) => {
      const id = paragraphAnchor(paragraph);
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [paragraphs]);

  if (paragraphs.length < 2) return null;

  return (
    <nav aria-label="Course content" className="lg:sticky lg:top-28">
      <p className="mb-3 hidden text-[11px] font-extrabold tracking-[0.18em] text-[#64748b] uppercase lg:block">
        Content
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {paragraphs.map((paragraph) => {
          const id = paragraphAnchor(paragraph);
          const active = activeId === id;
          return (
            <a
              key={paragraph.id}
              href={`#${id}`}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition lg:rounded-xl lg:px-3 ${
                active
                  ? "border-[#bfdbfe] bg-white text-[#2563eb] shadow-sm"
                  : "border-transparent bg-white/60 text-[#64748b] hover:border-[#dbe5f1] hover:bg-white hover:text-[#12263f]"
              }`}
            >
              {paragraph.title}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function TableRowIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  const cls = "h-[18px] w-[18px]";
  if (/duration|year|clock/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 8v4.2l2.8 1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (/fee|tuition|inr|rupee/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path d="M7 7h8a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12 4v16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (/eligib|user/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="m8.5 12 2.3 2.3L15.5 9.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (/mode|learn|online|monitor/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <rect x="3.5" y="5" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 19h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (/career|prospect|briefcase/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 8V6.8A1.8 1.8 0 0 1 10.8 5h2.4A1.8 1.8 0 0 1 15 6.8V8" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (/recruit|building|company/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path d="M4 20V7l8-3 8 3v13" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (/approv|recogn|award|ugc/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path d="M12 3.5 19 6.2v5c0 4-2.8 7.3-7 8.3-4.2-1-7-4.3-7-8.3v-5L12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (/level|under|post/.test(key)) {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
        <path d="M5 17V9.5L12 6l7 3.5V17" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9.5 17v-4h5v4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden>
      <path d="M7 4.5h7.2L17 7.3V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V6A1.5 1.5 0 0 1 7 4.5Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M14 4.8V7.5h2.8" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function renderDynamicValue(value: unknown): ReactNode {
  if (value == null || value === "") return "—";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    const text = String(value);
    if (!text.includes("\n") && text.length < 140) {
      if (text.includes(",") && /ugc|aicte|deb|naac|tcs|infosys/i.test(text)) {
        return (
          <div className="flex flex-wrap gap-1.5">
            {text.split(/,\s*(?:and\s+)?/).map((part) => (
              <span
                key={part}
                className="inline-flex rounded-full bg-[#eaf2ff] px-2.5 py-1 text-[12px] font-semibold text-[#12263f]"
              >
                {part.replace(/\.$/, "")}
              </span>
            ))}
          </div>
        );
      }
      return text;
    }
    return <ContentRenderer content={text} />;
  }
  if (Array.isArray(value)) {
    const items = value.map((item) => (item == null ? "—" : String(item))).filter(Boolean);
    return (
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (!entries.length) return "—";
    return (
      <div className="space-y-2">
        {entries.map(([key, nested]) => (
          <div key={key}>
            <p className="text-[11px] font-bold tracking-wide text-[#64748b] uppercase">{key}</p>
            <div className="mt-0.5">{renderDynamicValue(nested)}</div>
          </div>
        ))}
      </div>
    );
  }
  return "—";
}

export function CourseInfoTable({
  table,
  index,
  total,
}: {
  table: CourseContentTable;
  index: number;
  total: number;
}) {
  const rows = [...(table.rows || [])].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  if (!rows.length) return null;

  const heading =
    table.title && !/^content table$/i.test(table.title)
      ? table.title
      : total > 1
        ? `Course Information ${String(index + 1).padStart(2, "0")}`
        : "Course Information";

  return (
    <section className="overflow-hidden rounded-[20px] border border-[#dbe5f1] bg-white shadow-[0_10px_30px_rgba(18,38,63,0.04)]">
      <div className="border-b border-[#dbe5f1] bg-[#f8fbff] px-5 py-5 sm:px-7">
        <span className="inline-flex rounded-full bg-[#eaf2ff] px-2.5 py-1 text-[10px] font-extrabold tracking-[0.16em] text-[#2563eb] uppercase">
          Course Details
        </span>
        <div className="mt-3 flex items-center gap-3">
          {total > 1 ? (
            <span className="text-sm font-extrabold text-[#2563eb]">{String(index + 1).padStart(2, "0")}</span>
          ) : null}
          <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[#12263f] sm:text-2xl">
            {heading}
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748b]">
          Explore the key details, eligibility, fees and career information for this program.
        </p>
      </div>

      <div className="divide-y divide-[#dbe5f1]">
        {rows.map((row) => {
          const entries = Object.entries(row.content || {});
          const usefulEntries = entries.filter(([, value]) => value != null && String(value).trim() !== "");
          return (
            <div
              key={row.id}
              className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] sm:items-start sm:px-7"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#eaf2ff] text-[#2563eb]">
                  <TableRowIcon label={row.label} />
                </span>
                <p className="pt-2 text-sm font-bold text-[#12263f]">{row.label || "Details"}</p>
              </div>
              <div className="min-w-0 text-[15px] leading-7 text-[#475569]">
                {usefulEntries.length <= 1
                  ? renderDynamicValue(usefulEntries[0]?.[1])
                  : (
                    <div className="space-y-3">
                      {usefulEntries.map(([key, value]) => (
                        <div key={key}>
                          {key.toLowerCase() !== "details" ? (
                            <p className="mb-1 text-[11px] font-bold tracking-wide text-[#64748b] uppercase">
                              {key}
                            </p>
                          ) : null}
                          {renderDynamicValue(value)}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FAQAccordion({ faqs }: { faqs: CourseFaq[] }) {
  const activeFaqs = faqs.filter((faq) => faq?.is_active === true || faq?.is_active == null);
  const [openId, setOpenId] = useState<string | null>(activeFaqs[0]?.id || null);
  if (!activeFaqs.length) return null;

  return (
    <div className="space-y-3">
      {activeFaqs.map((faq, index) => {
        const open = openId === faq.id;
        const panelId = `faq-panel-${faq.id}`;
        const question = faq.question.replace(/^Q\d+\.\s*/i, "");
        return (
          <article
            key={faq.id}
            className={`overflow-hidden rounded-[18px] border transition ${
              open
                ? "border-[#bfdbfe] bg-[#f8fbff] shadow-[0_8px_20px_rgba(37,99,235,0.06)]"
                : "border-[#dbe5f1] bg-white hover:border-[#bfdbfe] hover:bg-[#f8fbff]"
            }`}
          >
            <h3>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenId(open ? null : faq.id)}
                aria-expanded={open}
                aria-controls={panelId}
              >
                <span className="text-[16px] font-bold leading-6 text-[#12263f] sm:text-[17px]">
                  <span className="mr-1.5 text-[#2563eb]">Q{index + 1}.</span>
                  {question}
                </span>
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf2ff] text-lg font-semibold text-[#2563eb] transition ${
                    open ? "" : ""
                  }`}
                  aria-hidden
                >
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pr-12">
                  <ContentRenderer content={faq.answer} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
