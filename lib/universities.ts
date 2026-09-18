export type UniversityFilterTab =
  | "all"
  | "popular"
  | "government"
  | "private"
  | "international"
  | "state";

export type DiscoveryUniversity = {
  id: string;
  uuid: string;
  name: string;
  shortName: string;
  type: string;
  location: string;
  state: string;
  website: string;
  logo: string;
  banner: string;
  ratings: number | null;
  worldRank: number | null;
  grade: string;
  courseCount: number;
  status: string;
};

const UNIVERSITIES_API_URL =
  "https://backend.admissionera.com/api/academic/universities";
const MEDIA_BASE_URL = "https://backend.admissionera.com";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
];

type ApiUniversity = {
  id?: string | number;
  uuid?: string;
  name?: string;
  code?: string;
  short_name?: string;
  type?: string;
  location?: string;
  website?: string;
  logo?: string;
  banner?: string;
  ratings?: string | number | null;
  world_rank?: number | null;
  grade?: string;
  course_count?: number;
  status?: string;
  is_deleted?: boolean;
};

export function resolveMediaUrl(path?: string | null) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${MEDIA_BASE_URL}${normalized}`;
}

export function extractState(location = "") {
  if (!location) return "India";
  const normalized = location.replace(/\s+/g, " ").trim();
  const found = INDIAN_STATES.find((state) =>
    new RegExp(`\\b${state.replace(/\s+/g, "\\s+")}\\b`, "i").test(normalized)
  );
  if (found) return found;

  const parts = normalized
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    const candidate = parts[parts.length - 2];
    if (candidate && !/^\d+$/.test(candidate) && !/india/i.test(candidate)) {
      return candidate.replace(/\d+/g, "").trim() || "India";
    }
  }
  return parts[0] || "India";
}

function parseRating(value: string | number | null | undefined) {
  if (value == null || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function normalizeType(type = "") {
  return type.trim().toLowerCase();
}

export function mapApiUniversity(row: ApiUniversity): DiscoveryUniversity {
  const location = row.location || "";
  return {
    id: String(row.uuid || row.id || ""),
    uuid: String(row.uuid || row.id || ""),
    name: row.name || "University",
    shortName: row.short_name || row.code || "",
    type: row.type || "",
    location,
    state: extractState(location),
    website: row.website || "",
    logo: resolveMediaUrl(row.logo),
    banner: resolveMediaUrl(row.banner),
    ratings: parseRating(row.ratings),
    worldRank: row.world_rank ?? null,
    grade: row.grade || "",
    courseCount: Number(row.course_count || 0),
    status: row.status || "ACTIVE",
  };
}

export async function fetchDiscoveryUniversities(): Promise<DiscoveryUniversity[]> {
  const res = await fetch(`${UNIVERSITIES_API_URL}?limit=100`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load universities");
  }

  const payload = await res.json();
  const rows = (payload?.universities || payload?.data || []) as ApiUniversity[];

  return rows
    .filter((row) => row && row.is_deleted !== true)
    .map(mapApiUniversity)
    .filter((uni) => uni.uuid);
}

export function filterUniversities(
  universities: DiscoveryUniversity[],
  tab: UniversityFilterTab,
  search: string
) {
  const query = search.trim().toLowerCase();

  return universities.filter((uni) => {
    if (query) {
      const haystack = [uni.name, uni.shortName, uni.state, uni.location, uni.type]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    const type = normalizeType(uni.type);
    const inIndia = /india/i.test(uni.location) || INDIAN_STATES.some((state) =>
      new RegExp(`\\b${state}\\b`, "i").test(uni.location)
    );

    switch (tab) {
      case "popular":
        return (uni.ratings != null && uni.ratings >= 4) || uni.worldRank != null;
      case "government":
        return /gov|government|central|public|state university/.test(type);
      case "private":
        if (/international|abroad/.test(type)) return false;
        if (/gov|government|central|public/.test(type)) return false;
        return !type || /private|deemed/.test(type) || inIndia;
      case "international":
        return /international|abroad|foreign/.test(type) || !inIndia;
      case "state":
        return inIndia && uni.state !== "India";
      case "all":
      default:
        return true;
    }
  });
}
