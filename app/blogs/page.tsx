import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchBlogs } from "@/lib/blogs";
import { BlogsListingClient } from "@/components/blogs/BlogsListingClient";
import { BlogGridSkeleton } from "@/components/blogs/BlogSkeleton";

const SITE_URL = "https://admissionera.com";

export const metadata: Metadata = {
  title: "Admission Era Blogs | Education & Career Insights",
  description:
    "Explore expert guides, college admission tips, entrance exam updates, career insights, and university comparisons — all curated by the Admission Era team.",
  keywords: [
    "admission guidance",
    "college blogs",
    "education insights",
    "career advice",
    "university tips",
    "entrance exam updates",
    "Admission Era",
  ],
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    type: "website",
    title: "Admission Era Blogs | Education & Career Insights",
    description:
      "Read the latest articles on college admissions, entrance exams, career planning, and higher education — by Admission Era.",
    url: `${SITE_URL}/blogs`,
    siteName: "Admission Era",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Admission Era Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Admission Era Blogs | Education & Career Insights",
    description:
      "Guides, insights, and updates to help you make confident education decisions.",
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default async function BlogsPage() {
  // Server-side: fetch all blogs (including archived for category discovery)
  // Client component handles the published-only filter and all interactive state
  const { blogs, pagination, allCategories } = await fetchBlogs({
    includeArchived: true, // fetch all so client can derive categories; client filters to published
    limit: 200,
  });
  console.log(blogs,"*----------------")

  return (
    <main id="main">
      <Suspense
        fallback={
          <div className="pt-16">
            <BlogGridSkeleton count={6} />
          </div>
        }
      >
        <BlogsListingClient
          initialBlogs={blogs}
          initialCategories={allCategories}
          initialPagination={pagination}
        />
      </Suspense>
    </main>
  );
}

