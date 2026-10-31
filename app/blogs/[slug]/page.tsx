import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchBlogBySlug, fetchRelatedBlogs, sanitizeExcerpt, resolveBlogImageUrl } from "@/lib/blogs";
import { BlogDetails } from "@/components/blogs/BlogDetails";

const SITE_URL = "https://admissionera.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Admission Era",
      description: "The article you are looking for could not be found.",
    };
  }

  const title = blog.meta_title?.trim() || blog.title;
  const rawExcerpt = sanitizeExcerpt(blog.excerpt, 160);
  const description =
    blog.meta_description?.trim() ||
    rawExcerpt ||
    `Read "${blog.title}" — an expert article from the Admission Era knowledge hub.`;
  const keywords = blog.meta_keywords?.length
    ? blog.meta_keywords
    : blog.tags?.length
    ? blog.tags
    : undefined;

  const imageUrl = resolveBlogImageUrl(blog.featured_image);
  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;

  const publishedTime =
    blog.published_at || blog.created_at
      ? new Date(blog.published_at || blog.created_at).toISOString()
      : undefined;
  const modifiedTime = blog.updated_at
    ? new Date(blog.updated_at).toISOString()
    : undefined;

  return {
    title: `${title} | Admission Era`,
    description,
    keywords: keywords ?? undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName: "Admission Era",
      publishedTime,
      modifiedTime,
      authors: blog.author_name ? [blog.author_name] : ["Admission Era Team"],
      tags: blog.tags,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await fetchRelatedBlogs(blog, 3);

  // Build JSON-LD structured data for the article
  const imageUrl = resolveBlogImageUrl(blog.featured_image);
  const canonicalUrl = `${SITE_URL}/blogs/${blog.slug}`;
  const cleanExcerpt = sanitizeExcerpt(blog.excerpt, 250);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.meta_title?.trim() || blog.title,
    description:
      blog.meta_description?.trim() ||
      cleanExcerpt ||
      `Expert article from Admission Era on ${blog.category}.`,
    image: imageUrl || undefined,
    url: canonicalUrl,
    datePublished:
      blog.published_at || blog.created_at
        ? new Date(blog.published_at || blog.created_at).toISOString()
        : undefined,
    dateModified: blog.updated_at
      ? new Date(blog.updated_at).toISOString()
      : undefined,
    author: {
      "@type": "Person",
      name: blog.author_name || "Admission Era Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Admission Era",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords:
      blog.meta_keywords?.join(", ") ||
      blog.tags?.join(", ") ||
      blog.category,
    articleSection: blog.category,
    inLanguage: "en-IN",
  };

  return (
    <main id="main">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BlogDetails blog={blog} relatedBlogs={relatedBlogs} />
    </main>
  );
}

