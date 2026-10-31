"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import type { Blog } from "@/lib/blogs";
import {
  formatBlogDate,
  calculateReadingTime,
  sanitizeExcerpt,
  resolveBlogImageUrl,
} from "@/lib/blogs";

interface BlogCardProps {
  blog: Blog;
  priority?: boolean;
}

export function BlogCard({ blog, priority = false }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  console.log(blog,"********* ")
  const imageUrl = resolveBlogImageUrl(blog.featured_image);
  const formattedDate = formatBlogDate(blog.published_at || blog.created_at);
  const readingTime = calculateReadingTime(blog.excerpt || blog.content);
  const excerptText = sanitizeExcerpt(blog.excerpt || blog.content);

  const fallbackImage = "/hero/slide-1.png";

  return (
    <article className="group era-card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-violet-100/80 bg-white shadow-[0_8px_24px_rgba(23,19,74,0.04)] transition-all duration-300 hover:border-purple-200 hover:shadow-[0_18px_36px_rgba(91,33,182,0.1)]">
      {/* Featured Image */}
      <Link
        href={`/blogs/${blog.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={imageError ? fallbackImage : imageUrl}
          alt={blog.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
          unoptimized={imageUrl.startsWith("http") && !imageUrl.includes("admissionera.com")}
        />
        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Category Pill floating on image */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-era-primary shadow-xs backdrop-blur-md">
            {blog.category}
          </span>
        </div>

        {/* Status Pill if not published (Preview only) */}
        {blog.status !== "published" && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center rounded-full bg-amber-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-md">
              {blog.status}
            </span>
          </div>
        )}
      </Link>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Date & Reading time */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <time dateTime={blog.published_at || blog.created_at}>
              {formattedDate}
            </time>
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{readingTime}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-bold tracking-tight text-[#17134A] transition-colors group-hover:text-era-primary sm:text-xl">
          <Link href={`/blogs/${blog.slug}`} className="line-clamp-2">
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {excerptText}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-purple-50/80 px-2 py-0.5 text-[11px] font-medium text-era-primary"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-[11px] text-slate-400">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer with Read More CTA */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-era-primary transition-all group-hover:text-era-magenta"
            aria-label={`Read more about ${blog.title}`}
          >
            <span>Read More</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {blog.author_name && (
            <span className="text-xs text-slate-400 truncate max-w-[120px]">
              By {blog.author_name}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

