"use client";

import React, { useRef } from "react";
import { Filter, Layers } from "lucide-react";

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  totalPublishedCount: number;
  categoryCounts?: Record<string, number>;
  activeSearch?: string;
  onClearSearch?: () => void;
}

export function BlogFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  totalPublishedCount,
  categoryCounts = {},
  activeSearch,
  onClearSearch,
}: BlogFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pill Buttons */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:flex">
            <Filter className="h-3.5 w-3.5 text-era-primary" />
            Categories:
          </div>

          <div
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:pb-0"
            role="tablist"
            aria-label="Filter blogs by category"
          >
            {/* All Blogs Tab */}
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => onSelectCategory("all")}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                selectedCategory === "all"
                  ? "bg-era-primary text-white shadow-md shadow-era-primary/20"
                  : "border border-slate-200/80 bg-white text-slate-600 hover:border-purple-200 hover:bg-era-lavender hover:text-era-primary"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>All Blogs</span>
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  selectedCategory === "all"
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {totalPublishedCount}
              </span>
            </button>

            {/* Dynamic Categories */}
            {categories.map((category) => {
              const count = categoryCounts[category];
              const isSelected =
                selectedCategory.toLowerCase() === category.toLowerCase();

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectCategory(category)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                    isSelected
                      ? "bg-era-primary text-white shadow-md shadow-era-primary/20"
                      : "border border-slate-200/80 bg-white text-slate-600 hover:border-purple-200 hover:bg-era-lavender hover:text-era-primary"
                  }`}
                >
                  <span>{category}</span>
                  {count !== undefined && count > 0 && (
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active search filter badge */}
        {activeSearch && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Searching for: <strong className="text-slate-800">&ldquo;{activeSearch}&rdquo;</strong>
            </span>
            {onClearSearch && (
              <button
                type="button"
                onClick={onClearSearch}
                className="text-xs font-semibold text-era-primary underline hover:text-era-magenta"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

