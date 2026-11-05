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
      
    </article>
  );
}

