"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/courses/specialization/icons";

const SAVED_KEY = "admissionera:saved-specializations";

export type SectionTab = { id: string; label: string };

function openAndScroll(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el instanceof HTMLDetailsElement) el.open = true;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function SectionTabs({ tabs }: { tabs: SectionTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);
  const lockUntil = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-160px 0px -55% 0px" }
    );
    tabs.forEach((tab) => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tabs]);

  useEffect(() => {
    const button = listRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    button?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [active]);

  return (
    <nav
      aria-label="Specialization sections"
      className="sticky top-[64px] z-30 border-b border-[#ECE8FA] bg-white/90 backdrop-blur sm:top-[72px] lg:top-[78px]"
    >
      <div className="era-shell">
        <ul ref={listRef} className="flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] lg:justify-between">
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <li key={tab.id} className="shrink-0">
                <a
                  href={`#${tab.id}`}
                  data-tab={tab.id}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    lockUntil.current = Date.now() + 1200;
                    setActive(tab.id);
                    openAndScroll(tab.id);
                  }}
                  className={`inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F20C9] focus-visible:ring-offset-2 lg:px-6 ${
                    isActive
                      ? "bg-gradient-to-r from-[#4F20C9] to-[#6D45E8] text-white shadow-[0_8px_18px_rgba(79,32,201,0.28)]"
                      : "text-[#3B3860] hover:bg-[#F3F0FF] hover:text-[#4F20C9]"
                  }`}
                >
                  {tab.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

const actionClass =
  "inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#E6E1F8] bg-white px-3 text-[13px] font-semibold text-[#14123A] shadow-sm transition hover:border-[#C9BDF3] hover:text-[#4F20C9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F20C9] focus-visible:ring-offset-2";

const SAVED_EVENT = "admissionera:saved-change";

function readSaved(): string[] {
  try {
    const list = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function subscribeSaved(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(SAVED_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SAVED_EVENT, callback);
  };
}

export function ShareSaveActions({ id, title }: { id: string; title: string }) {
  const saved = useSyncExternalStore(
    subscribeSaved,
    () => readSaved().includes(id),
    () => false
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!status) return;
    const timer = window.setTimeout(() => setStatus(""), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  const toggleSave = () => {
    try {
      const list = readSaved();
      const next = saved ? list.filter((item) => item !== id) : [...new Set([...list, id])];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(SAVED_EVENT));
      setStatus(saved ? "Removed from saved" : "Saved to this device");
    } catch {
      setStatus("Couldn’t save on this browser");
    }
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") setStatus("Couldn’t share link");
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <button type="button" onClick={toggleSave} aria-pressed={saved} className={actionClass}>
        <Icon
          name="heart"
          className={`h-4 w-4 ${saved ? "fill-[#4F20C9] text-[#4F20C9]" : ""}`}
        />
        {saved ? "Saved" : "Save"}
      </button>
      <button type="button" onClick={share} className={actionClass}>
        <Icon name="share" className="h-4 w-4" />
        Share
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`absolute right-0 top-full mt-2 whitespace-nowrap rounded-md bg-[#14123A] px-2.5 py-1 text-xs font-medium text-white transition ${
          status ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {status}
      </span>
    </div>
  );
}
