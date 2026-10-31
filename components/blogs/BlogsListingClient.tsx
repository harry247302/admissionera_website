"use client";

import React, { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Blog, BlogPagination } from "@/lib/blogs";
import { BlogHero } from "./BlogHero";
import { BlogFilters } from "./BlogFilters";
import { BlogGrid } from "./BlogGrid";

interface BlogsListingClientProps {
  initialBlogs: Blog[];
  initialCategories: string[];
  // pagination is returned from server but UI is handled client-side
  initialPagination?: BlogPagination;
}

const ITEMS_PER_PAGE = 9;

export function BlogsListingClient({
  initialBlogs,
  initialCategories,
}: BlogsListingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Derive all filter state directly from URL — no useState needed, no useEffect sync
  const selectedCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";
  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const showArchived = searchParams.get("preview") === "all";

  // Update URL search parameters smoothly without full reloads
  const updateUrl = (cat: string, q: string, page: number, preview: boolean) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (cat && cat !== "all") params.set("category", cat);
      if (q.trim()) params.set("search", q.trim());
      if (page > 1) params.set("page", String(page));
      if (preview) params.set("preview", "all");

      const qs = params.toString();
      const newPath = qs ? `/blogs?${qs}` : "/blogs";
      router.replace(newPath, { scroll: false });
    });
  };

  // Base list of blogs: strictly published blogs unless preview is toggled
  const baseBlogs = useMemo(() => {
    if (showArchived) {
      return initialBlogs;
    }
    return initialBlogs.filter((b) => b.status === "published");
  }, [initialBlogs, showArchived]);

  // Dynamic Category list from actual data
  const categories = useMemo(() => {
    const set = new Set<string>();
    baseBlogs.forEach((b) => {
      if (b.category?.trim()) set.add(b.category.trim());
    });
    initialCategories.forEach((c) => {
      if (c?.trim()) set.add(c.trim());
    });
    return Array.from(set).sort();
  }, [baseBlogs, initialCategories]);

  // Category article counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    baseBlogs.forEach((b) => {
      const cat = b.category?.trim();
      if (cat) counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [baseBlogs]);

  // Client-side search and category filtering
  const filteredBlogs = useMemo(() => {
    return baseBlogs.filter((blog) => {
      // 1. Category filter
      if (
        selectedCategory !== "all" &&
        blog.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // 2. Search query filter: checks title, excerpt, tags, and category
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = blog.title.toLowerCase().includes(q);
        const excerptMatch = blog.excerpt
          ? blog.excerpt.toLowerCase().includes(q)
          : false;
        const tagMatch = blog.tags.some((tag) =>
          tag.toLowerCase().includes(q)
        );
        const catMatch = blog.category.toLowerCase().includes(q);
        if (!titleMatch && !excerptMatch && !tagMatch && !catMatch) {
          return false;
        }
      }

      return true;
    });
  }, [baseBlogs, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalItems = filteredBlogs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedBlogs = useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, validPage]);
  
  const clientPagination: BlogPagination = {
    total: totalItems,
    page: validPage,
    limit: ITEMS_PER_PAGE,
    totalPages,
  };

  // Handlers
  const handleCategorySelect = (cat: string) => {
    updateUrl(cat, searchQuery, 1, showArchived);
  };

  const handleSearchChange = (q: string) => {
    updateUrl(selectedCategory, q, 1, showArchived);
  };

  const handlePageChange = (p: number) => {
    updateUrl(selectedCategory, searchQuery, p, showArchived);
    // Smooth scroll up to blog list
    const el = document.getElementById("blog-listing-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleResetFilters = () => {
    updateUrl("all", "", 1, showArchived);
  };

  const hasActiveFilters =
    selectedCategory !== "all" || searchQuery.trim().length > 0;

  // Count of blogs in archived status that are not published
  const hasNonPublishedBlogs = initialBlogs.some(
    (b) => b.status !== "published"
  );

  return (
    <div>
      {/* Hero with Search */}
      <BlogHero
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        onSubmitSearch={() => handlePageChange(1)}
        totalArticles={baseBlogs.length}
      />

      {/* Main Listing Section */}
      <section
        id="blog-listing-content"
        className="scroll-mt-24 bg-white py-10 sm:py-14 lg:py-16"
      >
        <div className="era-shell space-y-8">
          {/* Category Filters Bar */}
          <BlogFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            totalPublishedCount={baseBlogs.length}
            categoryCounts={categoryCounts}
            activeSearch={searchQuery}
            onClearSearch={() => handleSearchChange("")}
          />

          {/* Preview Toggle Banner (only when non-published blogs exist in DB) */}
          {hasNonPublishedBlogs && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-2.5 text-xs text-amber-800">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                <span>
                  {showArchived
                    ? "Preview mode: showing all items including archived/test posts."
                    : "Public view: displaying published articles only."}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateUrl(
                    selectedCategory,
                    searchQuery,
                    1,
                    !showArchived
                  )
                }
                className="font-bold underline hover:text-amber-950"
              >
                {showArchived
                  ? "Switch to published-only view"
                  : "Preview all (including archived)"}
              </button>
            </div>
          )}

          {/* Blog Cards Grid */}
          <BlogGrid
            blogs={initialBlogs}
            pagination={clientPagination}
            currentPage={validPage}
            onPageChange={handlePageChange}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </section>
    </div>
  );
}
