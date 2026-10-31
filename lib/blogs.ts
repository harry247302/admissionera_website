export interface Blog {
  uuid: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featured_image?: string | null;
  author_id?: string | null;
  author_name?: string | null;
  category: string;
  tags: string[];
  status: "published" | "draft" | "archived" | string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[] | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogsApiResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination?: BlogPagination;
}

export interface FetchBlogsParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
  includeArchived?: boolean;
  slug?: string;
}

const DEFAULT_API_URL = "https://backend.admissionera.com/api/blogs/get";
export const BLOGS_API_URL =
  process.env.NEXT_PUBLIC_BLOGS_API_URL || DEFAULT_API_URL;
const MEDIA_BASE_URL = "https://backend.admissionera.com";

/**
 * Resolves featured image URL properly.
 * Supports relative backend paths, external absolute URLs, and fallback placeholder.
 */
export function resolveBlogImageUrl(url?: string | null): string {
  if (!url || typeof url !== "string") {
    return "/hero/slide-1.png";
  }
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${MEDIA_BASE_URL}${normalized}`;
}

/**
 * Formats ISO date string into readable format like "Oct 24, 2026".
 */
export function formatBlogDate(dateStr?: string | null): string {
  if (!dateStr) return "Recently updated";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Recently updated";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently updated";
  }
}

/**
 * Calculates estimated reading time for article content.
 */
export function calculateReadingTime(text?: string | null): string {
  if (!text) return "3 min read";
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

/**
 * Sanitizes and truncates excerpt text.
 * Strips repeated raw URLs or messy markdown if present.
 */
export function sanitizeExcerpt(text?: string | null, maxLength = 150): string {
  if (!text) return "";
  // If excerpt is a series of URLs, return clean description
  if (/^(https?:\/\/[^\s]+)+$/i.test(text.trim())) {
    return "Read the full article for in-depth insights, expert guidance, and detailed analysis from the Admission Era team.";
  }
  const clean = text
    .replace(/https?:\/\/[^\s]+/gi, "")
    .replace(/[#*`_~[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!clean) {
    return "Read the full article for in-depth insights, expert guidance, and detailed analysis from the Admission Era team.";
  }
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trim()}...`;
}

/**
 * Normalizes a blog object returned by the backend.
 */
function normalizeBlog(raw: unknown): Blog | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;

  const uuid = String(item.uuid || item.id || "");
  const title = String(item.title || "").trim();
  const slug = String(item.slug || "").trim();
  if (!uuid || !title || !slug) return null;

  const rawTags = item.tags;
  let tags: string[] = [];
  if (Array.isArray(rawTags)) {
    tags = rawTags.map(String).filter(Boolean);
  } else if (typeof rawTags === "string") {
    tags = rawTags.split(",").map((t) => t.trim()).filter(Boolean);
  }

  const rawMetaKeywords = item.meta_keywords;
  let metaKeywords: string[] = [];
  if (Array.isArray(rawMetaKeywords)) {
    metaKeywords = rawMetaKeywords.map(String).filter(Boolean);
  } else if (typeof rawMetaKeywords === "string") {
    metaKeywords = rawMetaKeywords.split(",").map((k) => k.trim()).filter(Boolean);
  }

  return {
    uuid,
    title,
    slug,
    excerpt: item.excerpt ? String(item.excerpt) : null,
    content: item.content ? String(item.content) : null,
    featured_image: item.featured_image ? String(item.featured_image) : null,
    author_id: item.author_id ? String(item.author_id) : null,
    author_name: item.author_name ? String(item.author_name) : null,
    category: String(item.category || "General Guidance"),
    tags,
    status: String(item.status || "draft").toLowerCase(),
    meta_title: item.meta_title ? String(item.meta_title) : null,
    meta_description: item.meta_description ? String(item.meta_description) : null,
    meta_keywords: metaKeywords,
    published_at: item.published_at ? String(item.published_at) : null,
    created_at: String(item.created_at || new Date().toISOString()),
    updated_at: String(item.updated_at || new Date().toISOString()),
  };
}

/**
 * Fetches blogs from backend API with optional search, category, and status filters.
 */
export async function fetchBlogs(params?: FetchBlogsParams): Promise<{
  blogs: Blog[];
  pagination: BlogPagination;
  allCategories: string[];
}> {
  try {
    const url = new URL(BLOGS_API_URL);

    // If backend supports query params, forward them
    if (params?.slug) {
      url.searchParams.set("slug", params.slug);
    }
    if (params?.page) {
      url.searchParams.set("page", String(params.page));
    }
    if (params?.limit) {
      url.searchParams.set("limit", String(params.limit));
    }

    // Call API with Next.js revalidation
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs from API: HTTP ${res.status}`);
    }

    const json: BlogsApiResponse = await res.json();
    const rawList = Array.isArray(json?.data) ? json.data : [];

    const normalizedBlogs: Blog[] = rawList
      .map(normalizeBlog)
      .filter((b): b is Blog => b !== null);

    // Extract all unique categories from all returned blogs
    const categoriesSet = new Set<string>();
    normalizedBlogs.forEach((b) => {
      if (b.category && b.category.trim()) {
        categoriesSet.add(b.category.trim());
      }
    });
    const allCategories = Array.from(categoriesSet).sort();

    // Filter by status:
    // Only display published blogs unless explicit includeArchived or status flag is passed
    let filtered = normalizedBlogs;
    if (!params?.includeArchived && params?.status !== "all") {
      const targetStatus = (params?.status || "published").toLowerCase();
      filtered = filtered.filter((b) => b.status === targetStatus);
    }

    // Filter by category
    if (params?.category && params.category !== "all") {
      const cat = params.category.toLowerCase();
      filtered = filtered.filter((b) => b.category.toLowerCase() === cat);
    }

    // Search by title, excerpt, and tags
    if (params?.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      filtered = filtered.filter((b) => {
        const titleMatch = b.title.toLowerCase().includes(q);
        const excerptMatch = b.excerpt ? b.excerpt.toLowerCase().includes(q) : false;
        const tagMatch = b.tags.some((t) => t.toLowerCase().includes(q));
        const categoryMatch = b.category.toLowerCase().includes(q);
        return titleMatch || excerptMatch || tagMatch || categoryMatch;
      });
    }

    const page = params?.page || 1;
    const limit = params?.limit || 12;
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      blogs: filtered,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
      allCategories,
    };
  } catch (err) {
    console.error("Error in fetchBlogs:", err);
    return {
      blogs: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 12,
        totalPages: 0,
      },
      allCategories: [],
    };
  }
}

/**
 * Fetches a single blog by its slug or uuid.
 */
export async function fetchBlogBySlug(
  slug: string,
  options?: { allowUnpublished?: boolean }
): Promise<Blog | null> {
  if (!slug) return null;
  const decodedSlug = decodeURIComponent(slug).trim();

  try {
    // 1. Try querying backend with ?slug=
    const slugUrl = new URL(BLOGS_API_URL);
    slugUrl.searchParams.set("slug", decodedSlug);

    const res = await fetch(slugUrl.toString(), {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json: BlogsApiResponse = await res.json();
      const rawList = Array.isArray(json?.data) ? json.data : [];
      const blogs = rawList.map(normalizeBlog).filter((b): b is Blog => b !== null);

      const found = blogs.find(
        (b) =>
          b.slug.toLowerCase() === decodedSlug.toLowerCase() ||
          b.uuid.toLowerCase() === decodedSlug.toLowerCase()
      );

      if (found) {
        if (!options?.allowUnpublished && found.status !== "published") {
          // If unpublished and not explicitly allowed, return it only if it's the requested slug
          // so single blog details page can still render a preview notice instead of blank 404
          return found;
        }
        return found;
      }
    }

    // 2. Fallback: fetch list and search in items
    const all = await fetchBlogs({ includeArchived: true, status: "all" });
    const match = all.blogs.find(
      (b) =>
        b.slug.toLowerCase() === decodedSlug.toLowerCase() ||
        b.uuid.toLowerCase() === decodedSlug.toLowerCase()
    );

    return match || null;
  } catch (err) {
    console.error(`Error in fetchBlogBySlug for "${slug}":`, err);
    return null;
  }
}

/**
 * Fetches related blogs for a given blog post.
 */
export async function fetchRelatedBlogs(
  currentBlog: Blog,
  limit = 3
): Promise<Blog[]> {
  try {
    // Fetch published blogs (include archived if current is archived for testing)
    const { blogs } = await fetchBlogs({
      includeArchived: currentBlog.status !== "published",
      status: currentBlog.status !== "published" ? "all" : "published",
    });

    // Exclude the current blog
    const candidates = blogs.filter((b) => b.uuid !== currentBlog.uuid && b.slug !== currentBlog.slug);

    // 1. Same category
    const sameCategory = candidates.filter(
      (b) => b.category.toLowerCase() === currentBlog.category.toLowerCase()
    );

    // 2. Shared tags
    const currentTagsSet = new Set(currentBlog.tags.map((t) => t.toLowerCase()));
    const withSharedTags = candidates.filter(
      (b) =>
        b.category.toLowerCase() !== currentBlog.category.toLowerCase() &&
        b.tags.some((t) => currentTagsSet.has(t.toLowerCase()))
    );

    // 3. Others
    const others = candidates.filter(
      (b) =>
        b.category.toLowerCase() !== currentBlog.category.toLowerCase() &&
        !b.tags.some((t) => currentTagsSet.has(t.toLowerCase()))
    );

    const ordered = [...sameCategory, ...withSharedTags, ...others];
    return ordered.slice(0, limit);
  } catch {
    return [];
  }
}

