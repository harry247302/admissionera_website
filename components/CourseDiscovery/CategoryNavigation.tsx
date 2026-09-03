"use client";

import type { CourseCategory } from "@/lib/courses";
import { CategoryGlyph } from "@/components/CourseDiscovery/cd-icons";

type CategoryNavigationProps = {
  categories: CourseCategory[];
  active: string | null;
  onSelect: (id: string | null) => void;
};

export function CategoryNavigation({
  categories,
  active,
  onSelect,
}: CategoryNavigationProps) {
  return (
    <div className="cd-cats" role="listbox" aria-label="Course categories">
      <button
        type="button"
        role="option"
        aria-selected={active === null}
        className={`cd-cat ${active === null ? "is-active" : ""}`}
        onClick={() => onSelect(null)}
      >
        <span className="cd-cat-icon">
          <CategoryGlyph name="All" />
        </span>
        <span>
          <span className="block text-sm font-semibold">All programs</span>
          <span className="text-xs opacity-80">
            {categories.reduce((sum, item) => sum + item.count, 0)} courses
          </span>
        </span>
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          role="option"
          aria-selected={active === category.id}
          className={`cd-cat ${active === category.id ? "is-active" : ""}`}
          onClick={() => onSelect(active === category.id ? null : category.id)}
        >
          <span className="cd-cat-icon">
            <CategoryGlyph name={category.label} />
          </span>
          <span>
            <span className="block text-sm font-semibold">{category.label}</span>
            <span className="text-xs opacity-80">{category.count} courses</span>
          </span>
        </button>
      ))}
    </div>
  );
}
