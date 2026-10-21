export type ExpertTone = "pink" | "mint" | "yellow" | "lavender";

export type AdmissionExpert = {
  slug: string;
  name: string;
  specialisation: string;
  rating?: number;
  studentsGuided?: string;
  online: boolean;
  tone: ExpertTone;
  image?: string;
  reviews?: number;
  qualification?: string;
  experienceYears?: number;
  state?: string;
  bio?: string;
  gender?: string;
  languages?: string[];
  skills?: string[];
  fee?: number;
  createdAt?: string;
};

const COUNSELLORS_API_URL = "https://backend.admissionera.com/api/counsellor";
const MEDIA_BASE_URL = "https://backend.admissionera.com";
const EXPERT_TONES: ExpertTone[] = ["pink", "mint", "yellow", "lavender"];

export type CounsellorTableRow = {
  id: string;
  label: string | null;
  content: Record<string, string> | null;
  table_id: string;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CounsellorContentTable = {
  id: string;
  title: string | null;
  rows: CounsellorTableRow[];
  course_id: string | null;
  specialization_uuid: string | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
};

/** A counsellor exactly as returned by GET /api/counsellor. */
export type Counsellor = {
  uuid: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  alternate_phone: string | null;
  password: string | null;
  status: boolean | string | null;
  profile_img: string | null;
  notes: string | null;
  qualification: string | null;
  experience_years: number | string | null;
  state: string | null;
  designation: string | null;
  ratings: string | number | null;
  response_rate: string | null;
  career_development: string | null;
  created_at: string | null;
  updated_at: string | null;
  specialization_content_tables: CounsellorContentTable[] | null;
};

type ApiCounsellor = Partial<Counsellor> & {
  gender?: string | null;
  languages?: string[] | string | null;
  fee?: number | string | null;
  rating?: number | string | null;
  reviews_count?: number | string | null;
};

export function counsellorName(counsellor: Pick<Counsellor, "first_name" | "last_name">) {
  return [counsellor.first_name, counsellor.last_name].filter(Boolean).join(" ").trim() || "Counsellor";
}

export function counsellorImage(counsellor: Pick<Counsellor, "profile_img">) {
  return resolveMediaUrl(counsellor.profile_img) || undefined;
}

export function isCounsellorOnline(counsellor: Pick<Counsellor, "status">) {
  return counsellor.status === true || counsellor.status === "true";
}

export function counsellorExperience(counsellor: Pick<Counsellor, "experience_years">) {
  const years = Number(counsellor.experience_years);
  return counsellor.experience_years !== null && Number.isFinite(years) && years > 0 ? years : undefined;
}

export function counsellorRating(counsellor: Pick<Counsellor, "ratings">) {
  if (counsellor.ratings === null || counsellor.ratings === "") return undefined;
  const rating = Number(counsellor.ratings);
  return Number.isFinite(rating) && rating > 0 ? Math.min(rating, 5) : undefined;
}

export function counsellorSpecializations(counsellor: Pick<Counsellor, "specialization_content_tables">) {
  return toList((counsellor.specialization_content_tables ?? []).map((table) => table.title ?? ""));
}

export const counsellorContactHref = (counsellor: Pick<Counsellor, "uuid">) =>
  `/tools/course-finder?expert=${encodeURIComponent(counsellor.uuid)}`;

function cleanText(value?: string | null) {
  const text = value?.trim();
  return text ? text : undefined;
}

function toNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function toList(value: ApiCounsellor["languages"]) {
  const items = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : [];
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

function resolveMediaUrl(path?: string | null) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${MEDIA_BASE_URL}${normalized}`;
}

export function isCounsellorActive(counsellor: Pick<Counsellor, "status">) {
  return counsellor.status !== false && counsellor.status !== "false";
}

export function mapCounsellor(row: ApiCounsellor, index: number): AdmissionExpert {
  const name = [row.first_name, row.last_name].filter(Boolean).join(" ").trim() || "Counsellor";
  const years = Number(row.experience_years);
  const image = resolveMediaUrl(row.profile_img);

  return {
    slug: row.uuid || name.toLowerCase().replace(/\s+/g, "-"),
    name,
    specialisation: row.qualification?.trim() || row.state?.trim() || "Admission Counsellor",
    studentsGuided: Number.isFinite(years) && years > 0 ? `${years} years experience` : undefined,
    online: row.status === true || row.status === "true",
    tone: EXPERT_TONES[index % EXPERT_TONES.length],
    image: image || undefined,
    rating: toNumber(row.rating),
    reviews: toNumber(row.reviews_count),
    qualification: cleanText(row.qualification),
    experienceYears: Number.isFinite(years) && years > 0 ? years : undefined,
    state: cleanText(row.state),
    bio: cleanText(row.notes),
    gender: cleanText(row.gender)?.toLowerCase(),
    languages: toList(row.languages),
    skills: toList((row.specialization_content_tables ?? []).map((table) => table.title ?? "")),
    fee: toNumber(row.fee),
    createdAt: cleanText(row.created_at),
  };
}

export async function fetchCounsellors(): Promise<Counsellor[]> {
  const res = await fetch(COUNSELLORS_API_URL, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load counsellors (${res.status})`);
  }

  const payload: { message?: string; counsellors?: Counsellor[] } = await res.json();
  return Array.isArray(payload?.counsellors) ? payload.counsellors : [];
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Returns the counsellor from GET /api/counsellor/:id, or null when the id is invalid or unknown. */
export async function fetchCounsellorById(id: string): Promise<Counsellor | null> {
  if (!UUID_PATTERN.test(id)) return null;

  const res = await fetch(`${COUNSELLORS_API_URL}/${encodeURIComponent(id)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (res.status === 404 || res.status === 400) return null;
  if (!res.ok) {
    throw new Error(`Failed to load counsellor (${res.status})`);
  }

  const payload: { message?: string; counsellor?: Counsellor } = await res.json();
  return payload?.counsellor ?? null;
}

export const ADMISSION_EXPERTS: AdmissionExpert[] = [
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    specialisation: "Engineering & IT",
    rating: 4.8,
    studentsGuided: "320+",
    online: true,
    tone: "pink",
  },
  {
    slug: "rohit-mehta",
    name: "Rohit Mehta",
    specialisation: "Medical & Paramedical",
    rating: 4.7,
    studentsGuided: "280+",
    online: true,
    tone: "mint",
  },
  {
    slug: "sneha-kapoor",
    name: "Sneha Kapoor",
    specialisation: "Law & Commerce",
    rating: 4.9,
    studentsGuided: "410+",
    online: true,
    tone: "yellow",
  },
  {
    slug: "arjun-verma",
    name: "Arjun Verma",
    specialisation: "Study Abroad",
    rating: 4.6,
    studentsGuided: "190+",
    online: true,
    tone: "lavender",
  },
];

export const EXPERT_PORTRAIT_DIR = "/assets/admissionera/experts";

export const expertContactHref = (expert: AdmissionExpert) =>
  `/tools/course-finder?expert=${encodeURIComponent(expert.slug)}`;
