import { InnerPage } from "@/components/InnerPage";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  return (
    <InnerPage
      title={query ? `Search results for “${query}”` : "Search"}
      description={
        query
          ? "Matching programs, universities and tools will appear here as the catalogue grows."
          : "Search for a course, university, exam or career path."
      }
    />
  );
}
