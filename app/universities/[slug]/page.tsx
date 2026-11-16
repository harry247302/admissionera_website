import { InnerPage } from "@/components/InnerPage";
import { UniversityDetailPage } from "@/components/universities/UniversityDetailPage";
import { fetchBlogs } from "@/lib/blogs";
import { fetchDiscoveryCourses } from "@/lib/courseDiscovery";
import { fetchUniversityDetail } from "@/lib/universityDetail";

const COPY: Record<string, { title: string; description: string }> = {
  india: {
    title: "Indian Universities",
    description:
      "Browse IITs, NITs, central, state and private universities with admissions, fees and placement context.",
  },
  international: {
    title: "International Universities",
    description:
      "Compare universities in the USA, UK, Canada, Europe and beyond for undergraduate and postgraduate study.",
  },
  featured: {
    title: "Featured Universities",
    description:
      "A shortlist of campuses with strong outcomes, recognisable programs and useful student insight.",
  },
};

export default async function UniversityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = COPY[slug];
  if (page) {
    return <InnerPage title={page.title} description={page.description} />;
  }

  try {
    const [university, blogResult, discoveryCourses] = await Promise.all([
      fetchUniversityDetail(slug),
      fetchBlogs({ status: "published", limit: 4 }).catch(() => ({ blogs: [] })),
      fetchDiscoveryCourses().catch(() => []),
    ]);
    return (
      <UniversityDetailPage
        university={university}
        blogs={blogResult.blogs.slice(0, 3)}
        suggestedCourses={discoveryCourses.slice(0, 4)}
      />
    );
  } catch {
    return (
      <InnerPage
        title="University not found"
        description="We couldn’t load this university. It may have been removed or the link is incorrect."
      />
    );
  }
}
