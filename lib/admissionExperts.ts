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
};

const COUNSELLORS_API_URL = "https://backend.admissionera.com/api/counsellor";
const MEDIA_BASE_URL = "https://backend.admissionera.com";
const EXPERT_TONES: ExpertTone[] = ["pink", "mint", "yellow", "lavender"];

type ApiCounsellor = {
  uuid?: string;
  first_name?: string | null;
  last_name?: string | null;
  status?: boolean | string | null;
  profile_img?: string | null;
  qualification?: string | null;
  experience_years?: number | string | null;
  state?: string | null;
};

function resolveMediaUrl(path?: string | null) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${MEDIA_BASE_URL}${normalized}`;
}

function isActive(status: ApiCounsellor["status"]) {
  return status !== false && status !== "false";
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
  };
}

export async function fetchCounsellors(): Promise<AdmissionExpert[]> {
  const res = await fetch(COUNSELLORS_API_URL, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load counsellors (${res.status})`);
  }

  const payload = await res.json();
  const rows: ApiCounsellor[] = Array.isArray(payload?.counsellors) ? payload.counsellors : [];

  return rows.filter((row) => isActive(row.status)).map(mapCounsellor);
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
