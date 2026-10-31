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
  ExternalLink,
} from "lucide-react";
import type { Blog } from "@/lib/blogs";
import {
  formatBlogDate,
  calculateReadingTime,
  sanitizeExcerpt,
  resolveBlogImageUrl,
} from "@/lib/blogs";
import { BlogCard } from "./BlogCard";

// Social share icons as inline SVGs (no extra dependency)
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

interface BlogDetailsProps {
  blog: Blog;
  relatedBlogs: Blog[];
}

export function BlogDetails({ blog, relatedBlogs }: BlogDetailsProps) {
  const [copied, setCopied] = useState(false);

  const imageUrl = resolveBlogImageUrl(blog.featured_image);
  const formattedDate = formatBlogDate(blog.published_at || blog.created_at);
  const readingTime = calculateReadingTime(blog.excerpt || blog.content);
  const displayExcerpt = sanitizeExcerpt(blog.excerpt, 300);

  // Derive the shareable URL
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://admissionera.com/blogs/${blog.slug}`;

  const shareTitle = encodeURIComponent(blog.title);
  const shareUrlEncoded = encodeURIComponent(shareUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("input");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-100 bg-white"
      >
        <div className="era-shell flex items-center gap-1.5 py-3.5 text-xs text-slate-500">
          <Link href="/" className="transition hover:text-era-primary">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <Link href="/blogs" className="transition hover:text-era-primary">
            Blogs
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-300" />
          <span
            className="max-w-[200px] truncate font-medium text-slate-800 sm:max-w-xs"
            aria-current="page"
          >
            {blog.title}
          </span>
        </div>
      </nav>

      {/* Article Header */}
      <header className="era-shell pt-8 pb-0 sm:pt-10 lg:pt-12">
        <div className="mx-auto max-w-3xl">
          {/* Back button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-xs transition hover:border-purple-200 hover:bg-era-lavender hover:text-era-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>

          {/* Category */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-era-lilac px-3.5 py-1 text-xs font-bold text-era-primary">
              {blog.category}
            </span>
            {blog.status !== "published" && (
              <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-700">
                {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-[#17134A] sm:text-3xl lg:text-4xl">
            {blog.title}
          </h1>

          {/* Meta row: date, reading time, author */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-slate-400" />
              <time dateTime={blog.published_at || blog.created_at}>
                {formattedDate}
              </time>
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-slate-400" />
              {readingTime}
            </span>
            {blog.author_name && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4 text-slate-400" />
                  {blog.author_name}
                </span>
              </>
            )}
          </div>

          {/* Social Share */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
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
              aria-label="Copy article link"
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
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {imageUrl && (
        <div className="era-shell mt-8">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={imageUrl}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                unoptimized={
                  imageUrl.startsWith("http") &&
                  !imageUrl.includes("admissionera.com")
                }
                onError={() => {}}
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="era-shell py-10">
        <div className="mx-auto max-w-3xl">
          {/* Main content or excerpt */}
          {blog.content ? (
            <div
              className="prose prose-slate prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[#17134A] prose-a:text-era-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              dangerouslySetInnerHTML={{
                __html: blog.content.replace(/</g, "\u003c"),
              }}
            />
          ) : displayExcerpt ? (
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-700">
                {displayExcerpt}
              </p>

              {/* Notice that full content is not yet available from API */}
              <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-[#FAF7FF] to-[#F3E8FF]/60 p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-era-lilac text-era-primary">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#17134A]">
                      Full Article Coming Soon
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      The complete article content will be available shortly.
                      This page shows a preview of the excerpt from the
                      Admission Era blog.
                    </p>
                    <Link
                      href="/blogs"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-era-primary transition hover:text-era-magenta"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Browse all articles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-slate-600">
              This article is currently being prepared. Check back shortly for
              the full content.
            </p>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-10 border-t border-slate-100 pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <Tag className="inline h-3.5 w-3.5 mr-1" />
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
          )}

          {/* Author Card (if available) */}
          {blog.author_name && (
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-era-lilac text-era-primary text-lg font-bold">
                {blog.author_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-[#17134A]">
                  {blog.author_name}
                </p>
                <p className="text-xs text-slate-500">
                  Education Content Writer &mdash; Admission Era
                </p>
              </div>
            </div>
          )}

          {/* Share again at bottom */}
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-purple-100/80 bg-gradient-to-br from-[#FAF7FF] to-white px-6 py-8 text-center">
            <p className="text-lg font-bold text-[#17134A]">
              Found this article helpful?
            </p>
            <p className="text-sm text-slate-600">
              Share it with friends or fellow students exploring their college
              journey.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <a
                href={`https://wa.me/?text=${shareTitle}%20${shareUrlEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-green-200 bg-white px-4 text-sm font-semibold text-green-700 shadow-xs transition hover:bg-green-50"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrlEncoded}&title=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 text-sm font-semibold text-sky-700 shadow-xs transition hover:bg-sky-50"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
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
          </div>

          {/* Back to Blogs CTA */}
          <div className="mt-8 flex justify-start">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-xl bg-era-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-era-secondary active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Blogs
            </Link>
          </div>
        </div>
      </article>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gradient-to-b from-[#FAF7FF] to-white py-12 sm:py-16">
          <div className="era-shell">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-era-primary">
                  Related Articles
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#17134A]">
                  You Might Also Like
                </h2>
              </div>
              <Link href="/blogs" className="era-link text-sm shrink-0">
                View all <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((rb) => (
                <BlogCard key={rb.uuid} blog={rb} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

