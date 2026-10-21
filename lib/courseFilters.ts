import type { DiscoveryCourse } from "@/lib/courseDiscovery";

const COURSE_FILTERS_API_URL = "https://backend.admissionera.com/api/academic/course-filters";
const COURSES_API_URL = "https://backend.admissionera.com/api/academic/courses";

export type CourseOption = {
  id: string;
  name: string;
};

export type CourseFilterOptions = {
  courses: CourseOption[];
  universities: CourseOption[];
  specializations: CourseOption[];
  sessions: CourseOption[];
  levels: string[];
  studyModes: string[];
};

export const EMPTY_FILTER_OPTIONS: CourseFilterOptions = {
  courses: [],
  universities: [],
  specializations: [],
  sessions: [],
  levels: [],
  studyModes: [],
};

export type CourseFilterQuery = {
  uuid?: string;
  course?: string;
  university?: string;
  specialization?: string;
  session?: string;
  level?: string;
  studyMode?: string;
  worldRank?: string;
  page?: string;
  limit?: string;
};

export type FilteredCourseRow = {
  course_uuid?: string;
  course_name?: string;
  degree?: string | null;
  level?: string | null;
  course_code?: string | null;
  course_slug?: string | null;
  course_description?: string | null;
  study_mode?: string | null;
  university_uuid?: string;
  university_name?: string;
  university_short_name?: string | null;
  university_logo?: string | null;
  university_location?: string | null;
  university_rating?: string | number | null;
  university_world_rank?: number | null;
  specialization_name?: string | null;
  duration?: string | number | null;
  duration_unit?: string | null;
  fee_uuid?: string;
  fee_amount?: string | number | null;
  fee_currency?: string | null;
  session_name?: string | null;
};

export type FilteredCoursesResult = {
  success: boolean;
  message: string;
  filters: CourseFilterQuery;
  options: CourseFilterOptions;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: FilteredCourseRow[];
};

const LEVEL_TO_API: Record<string, string> = {
  "Post Graduation": "POSTGRADUATE",
  Graduation: "UNDERGRADUATE",
  Certificate: "CERTIFICATE",
  Diploma: "DIPLOMA",
  "Diploma / Certificate": "DIPLOMA",
  "Doctorate / Ph.D.": "DOCTORATE",
  "After 10th": "AFTER_10TH",
  "After 12th": "AFTER_12TH",
};

const MODE_TO_API: Record<string, string> = {
  Online: "ONLINE",
  Offline: "OFFLINE",
  Hybrid: "HYBRID",
};

export function courseFilterHref(course: Pick<DiscoveryCourse, "title" | "level" | "studyMode">) {
  const params = new URLSearchParams();
  if (course.title) params.set("course", course.title);
  const level = LEVEL_TO_API[course.level] || course.level;
  const studyMode = MODE_TO_API[course.studyMode] || course.studyMode;
  if (level) params.set("level", level);
  if (studyMode) params.set("studyMode", studyMode);
  return `/courses/filtered?${params.toString()}`;
}

function pickQuery(searchParams: Record<string, string | string[] | undefined>): CourseFilterQuery {
  const read = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };
  return {
    uuid: read("uuid"),
    course: read("course") || read("courseName"),
    university: read("university") || read("universityName"),
    specialization: read("specialization"),
    session: read("session") || read("sessionId"),
    level: read("level"),
    studyMode: read("studyMode"),
    worldRank: read("worldRank"),
    page: read("page"),
    limit: read("limit"),
  };
}

export function filtersFromSearchParams(searchParams: Record<string, string | string[] | undefined>) {
  return pickQuery(searchParams);
}

export function courseFilterSearch(query: CourseFilterQuery, page?: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (key === "page" || key === "limit") continue;
    if (value !== undefined && value !== "") params.set(key, value);
  }
  if (page && page > 1) params.set("page", String(page));
  const search = params.toString();
  return search ? `/courses/filtered?${search}` : "/courses/filtered";
}

export async function fetchAllCourses(): Promise<CourseOption[]> {
  const courses: CourseOption[] = [];
  let page = 1;
  let pages = 1;

  while (page <= pages) {
    const res = await fetch(`${COURSES_API_URL}?status=ACTIVE&limit=500&page=${page}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(payload?.message || `Failed to load courses (${res.status})`);
    }

    const rows = Array.isArray(payload?.data) ? payload.data : [];
    for (const row of rows) {
      const name = String(row?.name || "").trim();
      const id = String(row?.uuid || row?.id || name);
      if (name) courses.push({ id, name });
    }

    pages = Math.max(1, Number(payload?.pagination?.pages) || 1);
    page += 1;
  }

  const seen = new Set<string>();
  return courses.filter((course) => {
    const key = course.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const UNIVERSITIES_API_URL = "https://backend.admissionera.com/api/academic/universities";
const SPECIALIZATIONS_API_URL = "https://backend.admissionera.com/api/academic/specializations";
const SESSIONS_API_URL = "https://backend.admissionera.com/api/session";

function optionRows(payload: { data?: unknown; specializations?: unknown; sessions?: unknown; universities?: unknown }) {
  const rows = payload?.data || payload?.specializations || payload?.sessions || payload?.universities;
  return Array.isArray(rows) ? rows : [];
}

function toOptions(rows: unknown[], uniqueBy: "id" | "name" = "id"): CourseOption[] {
  const options: CourseOption[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const record = row as { uuid?: string; id?: string | number; name?: string };
    const name = String(record.name || "").trim();
    const id = String(record.uuid || record.id || "");
    const key = uniqueBy === "name" ? name.toLowerCase() : id;
    if (!name || !id || seen.has(key)) continue;
    seen.add(key);
    options.push({ id, name });
  }
  return options.sort((a, b) => a.name.localeCompare(b.name));
}

async function fetchPagedOptions(url: string) {
  const options: CourseOption[] = [];
  let page = 1;
  let pages = 1;
  while (page <= pages) {
    const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}limit=100&page=${page}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const payload = await res.json().catch(() => null);
    if (!res.ok) throw new Error(payload?.message || `Failed to load filter options (${res.status})`);
    options.push(...toOptions(optionRows(payload || {})));
    pages = Math.max(1, Number(payload?.pagination?.pages) || 1);
    page += 1;
  }
  return toOptions(
    options.map((item) => ({ name: item.name, uuid: item.id })),
    "name"
  );
}

export async function fetchFilterLookups(): Promise<Pick<CourseFilterOptions, "universities" | "specializations" | "sessions">> {
  const [universities, specializations, sessions] = await Promise.all([
    fetchPagedOptions(UNIVERSITIES_API_URL),
    fetch(`${SPECIALIZATIONS_API_URL}`, { headers: { Accept: "application/json" }, cache: "no-store" }).then(async (res) => {
      const payload = await res.json().catch(() => null);
      if (!res.ok) throw new Error(payload?.message || `Failed to load specializations (${res.status})`);
      return toOptions(optionRows(payload || {}));
    }),
    fetch(SESSIONS_API_URL, { headers: { Accept: "application/json" }, cache: "no-store" }).then(async (res) => {
      const payload = await res.json().catch(() => null);
      if (!res.ok) throw new Error(payload?.message || `Failed to load sessions (${res.status})`);
      return toOptions(optionRows(payload || {}));
    }),
  ]);

  return { universities, specializations, sessions };
}

function textList(value: unknown, key: string) {
  if (!Array.isArray(value)) return "";
  return value
    .map((item) => (item && typeof item === "object" ? String((item as Record<string, unknown>)[key] || "") : ""))
    .map((item) => item.trim())
    .filter(Boolean)
    .join(", ");
}

function mapFilteredRow(row: Record<string, unknown>): FilteredCourseRow {
  if (row.course_name || row.university_name) return row as FilteredCourseRow;
  const universities = Array.isArray(row.universities) ? row.universities : [];
  const university = (universities[0] || {}) as Record<string, unknown>;
  return {
    course_uuid: row.uuid ? String(row.uuid) : undefined,
    course_name: row.name ? String(row.name) : undefined,
    degree: (row.degree as string | null) ?? null,
    level: (row.level as string | null) ?? null,
    course_code: (row.code as string | null) ?? null,
    course_slug: (row.slug as string | null) ?? null,
    course_description: (row.description as string | null) ?? null,
    study_mode: (row.study_mode as string | null) ?? null,
    university_uuid: university.uuid ? String(university.uuid) : undefined,
    university_name: textList(universities, "name"),
    university_short_name: (university.short_name as string | null) ?? null,
    university_logo: (university.logo as string | null) ?? null,
    university_location: (university.location as string | null) ?? null,
    university_rating: (university.ratings as string | number | null) ?? null,
    university_world_rank: (university.world_rank as number | null) ?? null,
    specialization_name: textList(row.specializations, "name"),
  };
}

export async function fetchFilteredCourses(query: CourseFilterQuery): Promise<FilteredCoursesResult> {
  const worldRank = query.worldRank ? Number(query.worldRank) : null;
  const body = {
    uuid: query.uuid || null,
    course: query.course || null,
    university: query.university || null,
    specialization: query.specialization || null,
    session: query.session || null,
    level: query.level || null,
    studyMode: query.studyMode || null,
    worldRank: Number.isFinite(worldRank) ? worldRank : null,
    page: query.page ? Number(query.page) : 1,
    limit: query.limit ? Number(query.limit) : 20,
  };

  const res = await fetch(COURSE_FILTERS_API_URL, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(payload?.message || `Failed to filter courses (${res.status})`);
  }

  const rows = Array.isArray(payload?.data) ? payload.data : payload?.data ? [payload.data] : [];

  return {
    success: Boolean(payload?.success),
    message: payload?.message || "Courses fetched successfully",
    filters: query,
    options: EMPTY_FILTER_OPTIONS,
    pagination: payload?.pagination || { page: 1, limit: 20, total: rows.length, totalPages: rows.length ? 1 : 0 },
    data: rows.map((row: Record<string, unknown>) => mapFilteredRow(row)),
  };
}
