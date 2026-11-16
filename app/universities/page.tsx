import { UniversitiesDirectory } from "@/components/universities/UniversitiesDirectory";
import { fetchDiscoveryUniversities, type DiscoveryUniversity } from "@/lib/universities";

export default async function UniversitiesPage() {
  let universities: DiscoveryUniversity[] = [];
  try {
    universities = await fetchDiscoveryUniversities();
  } catch {
    universities = [];
  }

  return <UniversitiesDirectory universities={universities} />;
}
