"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Copy,
  Check,
  Tag,
  ChevronRight,
  User,
  CheckCircle2,
} from "lucide-react";
import type { Blog, BlogContentTable } from "@/lib/blogs";
import {
  formatBlogDate,
  calculateReadingTime,
  sanitizeExcerpt,
  resolveBlogImageUrl,
  blogBodyText,
} from "@/lib/blogs";

/* ─── Social share icons ───────────────────────────────────────────── */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.18 1.6 6L0 24l6.2-1.62A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52ZM12 22a9.94 9.94 0 0 1-5.08-1.39l-.36-.22-3.73.98 1-3.64-.24-.37A9.95 9.95 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10Zm5.47-7.5c-.3-.15-1.77-.87-2.04-.97s-.47-.15-.67.15c-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.08a8.18 8.18 0 0 1-2.4-1.48 9.02 9.02 0 0 1-1.67-2.08c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52s-.67-1.6-.91-2.2c-.24-.58-.49-.5-.67-.51H7.7c-.2 0-.52.08-.8.37C6.63 8.2 6 8.86 6 10.27s1.03 2.93 1.17 3.13c.15.2 2.03 3.1 4.92 4.35.69.3 1.22.47 1.64.6.69.22 1.32.19 1.81.11.55-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.255h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);

export type BlogUniversityPreview = {
  uuid: string;
  name: string;
  banner: string;
  logo?: string;
};

interface BlogDetailsProps {
  blog: Blog;
  relatedBlogs: Blog[];
  latestBlogs?: Blog[];
  universities?: BlogUniversityPreview[];
}

function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function sanitizeHtml(value: string) {
  // Remove scripts only; preserve all other HTML (bullets, headings etc.)
  return value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
}

function cellText(value: unknown): string {
  if (value == null) return "";
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
    return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

function tableColumns(table: BlogContentTable): string[] {
  const columns: string[] = [];
  for (const row of table.rows) {
    for (const key of Object.keys(row.content || {})) {
      if (!columns.includes(key)) columns.push(key);
    }
  }
  return columns;
}

/* ─── Article Table ─────────────────────────────────────────────────── */
function ArticleTable({ table }: { table: BlogContentTable }) {
  const columns = tableColumns(table);
  const showLabel = table.rows.some((r) => r.label?.trim());
  if (!table.rows.length) return null;

  return (
    <section className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {table.title ? (
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h3 className="text-sm font-bold text-[#17134A] sm:text-base">
            {table.title}
          </h3>
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="bg-[#F8F6FF]">
              {showLabel && (
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Particulars
                </th>
              )}
              {(columns.length ? columns : ["Details"]).map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 align-top">
                {showLabel && (
                  <td className="px-4 py-3 font-semibold text-[#17134A]">
                    {row.label}
                  </td>
                )}
                {(columns.length ? columns : ["Details"]).map((col) => (
                  <td key={col} className="px-4 py-3 leading-6 text-slate-700">
                    {cellText(columns.length ? row.content?.[col] : row.label) ||
                      "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─── Rich-text body renderer ───────────────────────────────────────── */
/**
 * Renders content from a text editor.
 * - If it looks like HTML → renders via dangerouslySetInnerHTML with
 *   the `.blog-content` CSS class (defined in globals.css) which
 *   provides full bullet, heading, table, link, and blockquote styles.
 * - If it's plain text → splits on double line-breaks into paragraphs.
 */
function RichContent({ content }: { content: string }) {
  if (looksLikeHtml(content)) {
    return (
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />
    );
  }

  // Plain text: split on double newlines → paragraphs
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="blog-content space-y-4">
      {blocks.map((block, i) => {
        // Single-newline lines inside a block → treat as a list if they start with – / - / •
        const lines = block.split(/\n/);
        const isList = lines.length > 1 && lines.every((l) => /^[-–•*]\s/.test(l.trim()));

        if (isList) {
          return (
            <ul key={i} className="pl-5">
              {lines.map((line, j) => (
                <li key={j} className="mb-1 leading-7 text-slate-700">
                  {line.replace(/^[-–•*]\s+/, "")}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line leading-7 text-slate-700">
            {block}
          </p>
        );
      })}
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────────────────────────────── */
function Sidebar({
  relatedBlogs,
  latestBlogs,
}: {
  relatedBlogs: Blog[];
  latestBlogs: Blog[];
}) {
  return (
    <div className="space-y-5">
      {/* Why Choose card */}
      <div className="overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-b from-[#E8F6FF] to-white p-5 shadow-[0_10px_24px_rgba(14,116,144,0.08)]">
        <Image
          src="/logo.png"
          alt="Admission Era"
          width={140}
          height={40}
          className="h-8 w-auto object-contain"
        />
        <h2 className="mt-4 text-lg font-extrabold text-[#0B4F8A] xl:text-xl">
          Why Choose Admission Era
        </h2>
        <ul className="mt-4 space-y-2.5">
          {[
            "Free video counselling",
            "Expert admission guidance",
            "University comparison support",
            "Personalised shortlists",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              {item}
            </li>
          ))}
        </ul>
        <div
          className="mt-4 flex items-center gap-0.5 text-amber-400"
          aria-label="5 star rating"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-lg" aria-hidden>
              ★
            </span>
          ))}
        </div>
        <Link
          href="/ai-counselling"
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#F20D70] text-sm font-bold text-white shadow-[0_8px_18px_rgba(242,13,112,0.28)] transition hover:brightness-105 active:scale-95"
        >
          Get counselling
        </Link>
      </div>

      {/* Related posts */}
      {relatedBlogs.length > 0 && (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(23,19,74,0.04)]">
          <h2 className="text-base font-extrabold text-[#17134A] xl:text-lg">
            Related Posts
          </h2>
          <ol className="mt-4 space-y-4">
            {relatedBlogs.map((related, index) => (
              <li key={related.uuid} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#F20D70] text-xs font-extrabold text-[#F20D70]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <Link
                    href={`/blogs/${related.slug}`}
                    className="line-clamp-2 text-sm font-semibold leading-5 text-[#17134A] transition hover:text-era-primary"
                  >
                    {related.title}
                  </Link>
                  <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-500">
                    <Clock className="h-3 w-3" />
                    {calculateReadingTime(related.excerpt || related.content)}
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    {formatBlogDate(related.published_at || related.created_at)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {latestBlogs.length > 0 && (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(23,19,74,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-extrabold text-[#17134A] xl:text-lg">
              Latest Blogs
            </h2>
            <Link
              href="/blogs"
              className="text-xs font-semibold text-era-primary hover:text-era-magenta"
            >
              View all
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {latestBlogs.map((item) => {
              const imageUrl = resolveBlogImageUrl(item.featured_image);
              return (
                <li key={item.uuid}>
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-2 pr-3 transition hover:border-era-lilac hover:bg-white"
                  >
                    <div className="relative h-14 w-[88px] shrink-0 overflow-hidden rounded-lg bg-slate-200">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt=""
                          fill
                          sizes="88px"
                          className="object-cover transition duration-200 group-hover:scale-105"
                          unoptimized={
                            imageUrl.startsWith("http") &&
                            !imageUrl.includes("admissionera.com")
                          }
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-semibold leading-5 text-[#17134A] group-hover:text-era-primary">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {formatBlogDate(item.published_at || item.created_at)}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function BlogDetails({
  blog,
  relatedBlogs,
  latestBlogs = [],
  universities = [],
}: BlogDetailsProps) {
  const [copied, setCopied] = useState(false);

  const imageUrl = resolveBlogImageUrl(blog.featured_image);
  const formattedDate = formatBlogDate(blog.published_at || blog.created_at);
  const readingTime = calculateReadingTime(blogBodyText(blog));
  const displayExcerpt = sanitizeExcerpt(blog.excerpt, 420);

  const paragraphs = blog.contentParagraphs || [];
  const tables = blog.contentTables || [];
  const hasArticleBody =
    Boolean(blog.content) || paragraphs.length > 0 || tables.length > 0;

  // Sort mixed content blocks by sort_order
  const contentBlocks = [
    ...paragraphs.map((p) => ({
      type: "paragraph" as const,
      sort: p.sort_order ?? 0,
      id: p.id,
      data: p,
    })),
    ...tables.map((t) => ({
      type: "table" as const,
      sort: t.sort_order ?? 0,
      id: t.id,
      data: t,
    })),
  ].sort((a, b) => a.sort - b.sort || (a.type === "paragraph" ? -1 : 1));

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://admissionera.com/blogs/${blog.slug}`;

  const shareTitle = encodeURIComponent(blog.title);
  const shareUrlEncoded = encodeURIComponent(shareUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const el = document.createElement("input");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-100 bg-white">
        <div className="era-shell flex items-center gap-1 py-3 text-xs text-slate-500 sm:gap-1.5 sm:py-3.5">
          <Link href="/" className="shrink-0 transition hover:text-era-primary">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
          <Link
            href="/blogs"
            className="shrink-0 transition hover:text-era-primary"
          >
            Blogs
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 text-slate-300" />
          <span
            className="truncate font-medium text-slate-800"
            aria-current="page"
          >
            {blog.title}
          </span>
        </div>
      </nav>

      {/* ── Page body ── */}
      <div className="era-shell py-5 sm:py-7 lg:py-10">
        {/*
         * Layout:
         *   Mobile  (< md)   → single column, sidebar stacked below article
         *   Tablet  (md–lg)  → two columns: article + sidebar
         *   Desktop (lg+)    → same, wider gap + sticky sidebar
         *
         * Column proportions: article gets ~65%, sidebar gets ~35% (capped at 320px)
         */}
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,1fr)_280px] md:gap-7 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">

          {/* ════════════ LEFT — Article content ════════════ */}
          <article className="min-w-0">
            {/* Back button */}
            <Link
              href="/blogs"
              className="mb-5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-xs transition hover:border-purple-200 hover:bg-era-lavender hover:text-era-primary sm:text-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blogs
            </Link>

            {/* Featured image */}
            {imageUrl && (
              <div className="overflow-hidden rounded-xl bg-slate-100 shadow-[0_8px_24px_rgba(23,19,74,0.08)] sm:rounded-2xl">
                <div className="relative aspect-[16/7] w-full min-h-[180px] sm:min-h-[240px]">
                  <Image
                    src={imageUrl}
                    alt={blog.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 65vw, 760px"
                    className="object-cover"
                    unoptimized={
                      imageUrl.startsWith("http") &&
                      !imageUrl.includes("admissionera.com")
                    }
                  />
                </div>
              </div>
            )}

            {/* Meta: date · reading time · category */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500 sm:mt-5">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <time dateTime={blog.published_at || blog.created_at}>
                  {formattedDate}
                </time>
              </span>
              <span className="inline-flex items-center rounded-md bg-[#F20D70] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                {readingTime}
              </span>
              {blog.category && (
                <span className="inline-flex items-center rounded-full bg-era-lilac px-3 py-1 text-xs font-bold text-era-primary">
                  {blog.category}
                </span>
              )}
              {blog.status !== "published" && (
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                  {blog.status}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-3 text-[22px] font-extrabold leading-tight tracking-tight text-[#17134A] sm:text-[28px] lg:text-[30px]">
              {blog.title}
            </h1>

            {/* Excerpt / lead paragraph */}
            {displayExcerpt && (
              <p className="mt-4 text-[15px] leading-7 text-slate-600 sm:mt-5 sm:text-[16px] sm:leading-8">
                {displayExcerpt}
              </p>
            )}

            {/* ── Article body — from text editor ── */}
            {hasArticleBody && (
              <div className="mt-6 sm:mt-8">
                {/* Case 1: simple blog.content (no structured blocks) */}
                {blog.content && !paragraphs.length && (
                  <RichContent content={blog.content} />
                )}

                {/* Case 2: structured paragraph + table blocks */}
                {contentBlocks.length > 0 && (
                  <div className="space-y-6 sm:space-y-8">
                    {contentBlocks.map((block) =>
                      block.type === "paragraph" ? (
                        <section key={block.id} className="space-y-2">
                          {block.data.title && (
                            <h2 className="text-[18px] font-bold leading-snug text-[#17134A] sm:text-[20px]">
                              {block.data.title}
                            </h2>
                          )}
                          <RichContent content={block.data.content} />
                        </section>
                      ) : (
                        <ArticleTable key={block.id} table={block.data} />
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Fallback when no content at all */}
            {!hasArticleBody && !displayExcerpt && (
              <p className="mt-6 text-base leading-relaxed text-slate-500 italic">
                This article is currently being prepared. Check back shortly for
                the full content.
              </p>
            )}
            
            {blog.tags && blog.tags.length > 0 ? (
              <div className="mt-10 border-t border-slate-100 pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <Tag className="h-3.5 w-3.5" />
                    Tags:
                  </span>
                  {blog.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blogs?search=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-era-primary ring-1 ring-purple-100 transition hover:bg-era-lilac hover:ring-purple-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            {universities.length > 0 ? (
              <section className="mt-10">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-extrabold text-[#17134A]">Top Universities</h2>
                  <Link
                    href="/universities"
                    className="text-xs font-semibold text-era-primary hover:text-era-magenta"
                  >
                    View all
                  </Link>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {universities.map((university) => {
                    const imageUrl = university.banner || university.logo;
                    const initials = university.name
                      .split(/\s+/)
                      .filter((word) => /^[A-Za-z]/.test(word) && word.toLowerCase() !== "of")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("");
                    return (
                      <li key={university.uuid}>
                        <Link
                          href={`/universities/${university.uuid}`}
                          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_20px_rgba(23,19,74,0.05)] transition hover:-translate-y-0.5 hover:border-era-lilac hover:shadow-[0_12px_24px_rgba(23,19,74,0.08)]"
                        >
                          <div className="relative aspect-[16/10] w-full bg-slate-100">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt=""
                                fill
                                sizes="(max-width: 640px) 50vw, 220px"
                                className="object-cover transition duration-300 group-hover:scale-[1.03]"
                              />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center text-sm font-bold text-era-primary">
                                {initials}
                              </span>
                            )}
                          </div>
                          <p className="line-clamp-2 px-3 py-3 text-sm font-bold leading-5 text-[#17134A] group-hover:text-era-primary">
                            {university.name}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}
            {blog.author_name ? (
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-era-lilac text-lg font-bold text-era-primary">
                  {blog.author_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="inline-flex items-center gap-1.5 text-sm font-bold text-[#17134A]">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    {blog.author_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Education writer &mdash; Admission Era
                  </p>
                </div>
              </div>
            ) : null}

            {/* Share buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Share:
              </span>
              <a
                href={`https://wa.me/?text=${shareTitle}%20${shareUrlEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 text-xs font-semibold text-green-700 transition hover:bg-green-100"
              >
                <WhatsAppIcon />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <FacebookIcon />
                <span className="hidden sm:inline">Facebook</span>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrlEncoded}&title=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
              >
                <LinkedInIcon />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy link"
                className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-semibold transition ${
                  copied
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:bg-era-lavender hover:text-era-primary"
                }`}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            {/* Back to blogs bottom */}
            <div className="mt-6 sm:mt-8">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-era-primary transition hover:text-era-magenta"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all blogs
              </Link>
            </div>
          </article>

          <aside className="min-w-0 md:sticky md:top-24">
            <Sidebar relatedBlogs={relatedBlogs} latestBlogs={latestBlogs} />
          </aside>
        </div>
      </div>
    </div>
  );
}
