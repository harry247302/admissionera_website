"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { SEARCH_SUGGESTIONS } from "@/lib/navigation";

type SearchOverlayProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function SearchOverlay({
  variant = "desktop",
  onNavigate,
}: SearchOverlayProps) {
  const router = useRouter();
  const inputId = useId();
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = SEARCH_SUGGESTIONS.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        close();
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = (href?: string) => {
    const next =
      href ??
      (query.trim()
        ? `/search?q=${encodeURIComponent(query.trim())}`
        : "/search");
    close();
    onNavigate?.();
    router.push(next);
  };

  if (variant === "mobile") {
    return (
      <form
        className="relative"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label htmlFor={`${inputId}-mobile`} className="sr-only">
          Search programs and universities
        </label>
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          id={`${inputId}-mobile`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search courses, universities..."
          className="search-field w-full pl-10"
        />
      </form>
    );
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        className="nav-search-btn"
        aria-label="Search"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          setOpen((current) => !current);
          window.setTimeout(() => inputRef.current?.focus(), 20);
        }}
      >
        <SearchIcon className="h-[18px] w-[18px]" />
      </button>

      {open ? (
        <div
          id={listId}
          className="absolute right-0 z-50 mt-3 w-[min(320px,calc(100vw-2rem))] rounded-2xl border border-[#EEE7F5] bg-white p-3 shadow-[0_16px_40px_rgba(106,27,154,0.12)]"
        >
          <form
            className="relative"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <label htmlFor={inputId} className="sr-only">
              Search programs and universities
            </label>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#55556A]" />
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={query}
              placeholder="Search"
              autoComplete="off"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={open}
              aria-controls={`${listId}-options`}
              className="search-field h-11 w-full rounded-xl pl-10"
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <div id={`${listId}-options`} role="listbox" aria-label="Search suggestions">
            <p className="px-1 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#55556A]">
              Popular searches
            </p>
            {filtered.length === 0 ? (
              <p className="px-1 py-3 text-sm text-[#55556A]">No matching suggestions</p>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  role="option"
                  className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-[#17172A] hover:bg-[#F4EEFF]"
                  aria-selected={false}
                  onClick={() => submit(item.href)}
                >
                  <SearchIcon className="h-3.5 w-3.5 text-[#55556A]" />
                  {item.label}
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function MobileSearchButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      className="nav-search-btn lg:hidden"
      aria-label="Search"
      onClick={onOpen}
    >
      <SearchIcon className="h-5 w-5" />
    </button>
  );
}

export function MobileSearchPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-white lg:hidden">
      <div className="flex items-center gap-2 border-b border-line px-3 py-3">
        <form
          className="relative flex-1"
          onSubmit={(event) => {
            event.preventDefault();
            handleClose();
            router.push(
              query.trim()
                ? `/search?q=${encodeURIComponent(query.trim())}`
                : "/search",
            );
          }}
        >
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses, universities..."
            className="search-field h-11 w-full pl-10"
            aria-label="Search programs and universities"
          />
        </form>
        <button
          type="button"
          className="icon-btn"
          aria-label="Close search"
          onClick={handleClose}
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="px-3 py-3">
        <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
          Popular searches
        </p>
        {SEARCH_SUGGESTIONS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 rounded-lg px-2 py-3 text-sm text-navy hover:bg-surface"
            onClick={handleClose}
          >
            <SearchIcon className="h-3.5 w-3.5 text-muted" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
