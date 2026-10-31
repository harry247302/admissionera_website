"use client";

import React from "react";
import {
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import type { Blog, BlogPagination } from "@/lib/blogs";
import { BlogCard } from "./BlogCard";
import { BlogGridSkeleton } from "./BlogSkeleton";

interface BlogGridProps {
  blogs: Blog[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  pagination?: BlogPagination | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
}

export function BlogGrid({
  blogs,
  loading = false,
  error = null,
  onRetry,
  pagination,
  currentPage,
  onPageChange,
  onResetFilters,
  hasActiveFilters = false,
}: BlogGridProps) {
  // 1. Loading State
  if (loading) {
    return <BlogGridSkeleton count={6} />;
  }

  console.log(blogs,"*---------------- blog grid")

  // 2. Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-red-100 bg-red-50/50 p-8 text-center sm:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-800">
          Unable to Load Articles
        </h3>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          {error || "An error occurred while connecting to the blogs service. Please try again."}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-era-primary px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-era-secondary active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    );
  }

  // 3. Empty State
  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-violet-100/80 bg-gradient-to-b from-[#FAF7FF] to-white p-10 text-center sm:p-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-era-lilac text-era-primary shadow-xs">
          <BookOpen className="h-8 w-8" />
        </div>
        <h3 className="mt-5 text-xl font-bold text-[#17134A]">
          {hasActiveFilters ? "No Matching Articles Found" : "No Published Articles Yet"}
        </h3>
        <p className="mt-2.5 max-w-md text-sm text-slate-600">
          {hasActiveFilters
            ? "We couldn't find any articles matching your search or category filter. Try refining your keywords or resetting filters."
            : "We're currently preparing new guides, admission tips, and college reviews. Check back shortly!"}
        </p>
        {hasActiveFilters && onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-era-primary px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-era-secondary active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  // 4. Grid Display
  const totalPages = pagination?.totalPages || 1;
  const totalItems = pagination?.total ?? blogs.length;
  const itemsPerPage = pagination?.limit || 12;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="space-y-10">
      {/* Article Count Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 sm:text-sm">
        <p>
          Showing <span className="font-semibold text-slate-800">{startIndex}</span>–
          <span className="font-semibold text-slate-800">{endIndex}</span> of{" "}
          <span className="font-semibold text-slate-800">{totalItems}</span> articles
        </p>
      </div>

      {/* Responsive Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, idx) => (
          <BlogCard
            key={blog.uuid || blog.slug}
            blog={blog}
            priority={idx < 3}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row"
          aria-label="Blog pages"
        >
          <p className="text-xs text-slate-500">
            Page <span className="font-semibold text-slate-800">{currentPage}</span> of{" "}
            <span className="font-semibold text-slate-800">{totalPages}</span>
          </p>

          <div className="flex items-center gap-1.5">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Previous page"
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {/* Page number buttons */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              const isCurrent = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition ${
                    isCurrent
                      ? "bg-era-primary text-white shadow-xs"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
              className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

