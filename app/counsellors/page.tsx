import { CounsellorsDirectory } from "@/components/counsellors/CounsellorsDirectory";
import { fetchCounsellors, type Counsellor } from "@/lib/admissionExperts";

export default async function CounsellorsPage() {
  let counsellors: Counsellor[] = [];
  let error: string | undefined;
  try {
    counsellors = await fetchCounsellors();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load counsellors";
  }
  return <CounsellorsDirectory counsellors={counsellors} error={error} />;
}
