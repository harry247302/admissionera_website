"use client";

import React, { type FormEvent } from "react";
import { Search, Sparkles, X } from "lucide-react";

interface BlogHeroProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSubmitSearch?: () => void;
  totalArticles?: number;
}

export function BlogHero({
  searchValue,
  onSearchChange,
  onSubmitSearch,
  totalArticles,
}: BlogHeroProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmitSearch) onSubmitSearch();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5FF] via-[#F4EEFF]/60 to-white pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-12 -right-24 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl"
      />

      <div className="era-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/90 px-3.5 py-1.5 shadow-xs backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-era-primary animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase text-era-primary">
              Admission Era Knowledge Hub
            </span>
            {totalArticles !== undefined && totalArticles > 0 && (
              <span className="rounded-full bg-era-lilac px-2 py-0.5 text-[11px] font-semibold text-era-primary">
                {totalArticles} {totalArticles === 1 ? "Article" : "Articles"}
              </span>
            )}
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-[#17134A] sm:text-4xl lg:text-5xl">
            Explore Insights, Guides &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#5B21B6] via-[#C026D3] to-[#EC4899] bg-clip-text text-transparent">
              Latest Updates
            </span>
          </h1>

          {/* Short description about Admission Era */}
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Admission Era empowers students and families with trusted college
            admissions advice, entrance exam updates, career trends, and
            transparent course comparisons.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col items-center justify-center sm:mx-auto sm:max-w-xl"
            role="search"
          >
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <Search className="h-5 w-5 text-era-primary/70" aria-hidden />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search blogs by title, topic, excerpt, or tags..."
                className="w-full rounded-2xl border border-purple-100 bg-white py-3.5 pr-24 pl-12 text-sm text-slate-900 shadow-[0_8px_24px_rgba(91,33,182,0.08)] outline-none transition placeholder:text-slate-400 focus:border-era-primary focus:ring-4 focus:ring-era-primary/10 sm:py-4 sm:text-base"
                aria-label="Search articles"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute inset-y-0 right-14 flex items-center pr-2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search query"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute inset-y-1.5 right-1.5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-era-primary to-era-secondary px-4 text-xs font-semibold text-white shadow-xs transition hover:brightness-105 active:scale-95 sm:px-5 sm:text-sm"
              >
                Search
              </button>
            </div>

            {/* Quick search tags */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium text-slate-400">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Popular:
              </span>
              {["Universities", "Admissions", "Career", "Guidance", "Engineering"].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => onSearchChange(topic)}
                  className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-era-lilac hover:text-era-primary"
                >
                  {topic}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

