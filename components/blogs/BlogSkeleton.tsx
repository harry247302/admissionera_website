import React from "react";

export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-0 shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[16/10] w-full bg-slate-200" />

      {/* Content skeleton */}
      <div className="flex flex-col p-5 sm:p-6">
        {/* Category pill */}
        <div className="h-5 w-24 rounded-full bg-slate-200" />

        {/* Title */}
        <div className="mt-4 h-6 w-11/12 rounded bg-slate-200" />
        <div className="mt-2 h-6 w-3/4 rounded bg-slate-200" />

        {/* Excerpt */}
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
          <div className="h-4 w-2/3 rounded bg-slate-100" />
        </div>

        {/* Tags */}
        <div className="mt-5 flex gap-2">
          <div className="h-5 w-14 rounded-md bg-slate-100" />
          <div className="h-5 w-16 rounded-md bg-slate-100" />
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="h-4 w-20 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <BlogCardSkeleton key={idx} />
      ))}
    </div>
  );
}

