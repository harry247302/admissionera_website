import { resolveMediaUrl } from "@/lib/universities";

const SPECIALIZATIONS_API_URL = "https://backend.admissionera.com/api/academic/specializations";

export type SpecializationDetail = {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  code: string;
  shortName: string;
  description: string;
  overview: string;
  eligibility: string;
  admissionRequirements: string;
  careerOpportunities: string;
  duration: number | null;
  durationUnit: string;
  logo: string;
  banner: string;
  metaTitle: string;
  metaDescription: string;
};

function text(value: unknown) {
  return value == null ? "" : String(value).trim();
}

export function htmlToText(value: unknown) {
  return text(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|div|h[1-6]|ul|ol)>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function formatSpecializationDuration(spec: Pick<SpecializationDetail, "duration" | "durationUnit">) {
  if (!spec.duration) return "";
  const unit = spec.durationUnit.toLowerCase().replace(/s$/, "") || "year";
  const value = Number.isInteger(spec.duration) ? spec.duration : Number(spec.duration.toFixed(1));
  const label = unit.charAt(0).toUpperCase() + unit.slice(1);
  return `${value} ${label}${value === 1 ? "" : "s"}`;
}

export function excerpt(value: string, max = 120) {
  const flat = value.replace(/\s+/g, " ").replace(/^-\s*/, "").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export function mapApiSpecialization(row: Record<string, unknown>): SpecializationDetail {
  const duration = Number(row.duration);
  return {
    id: text(row.id),
    uuid: text(row.uuid),
    name: text(row.name),
    slug: text(row.slug),
    code: text(row.code),
    shortName: text(row.short_name),
    description: htmlToText(row.description),
    overview: htmlToText(row.overview),
    eligibility: htmlToText(row.eligibility),
    admissionRequirements: htmlToText(row.admission_requirements),
    careerOpportunities: htmlToText(row.career_opportunities),
    duration: Number.isFinite(duration) && duration > 0 ? duration : null,
    durationUnit: text(row.duration_unit) || "YEARS",
    logo: row.logo ? resolveMediaUrl(text(row.logo)) : "",
    banner: row.banner ? resolveMediaUrl(text(row.banner)) : "",
    metaTitle: text(row.meta_title),
    metaDescription: text(row.meta_description),
  };
}

export async function fetchSpecializationById(id: string): Promise<SpecializationDetail> {
  const res = await fetch(`${SPECIALIZATIONS_API_URL}/${encodeURIComponent(id)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load specialization (${res.status})`);
  }

  const payload = await res.json();
  const row = payload?.specialization || payload?.data;
  if (!row || row.is_deleted === true) {
    throw new Error("Specialization not found");
  }

  return mapApiSpecialization(row);
}
