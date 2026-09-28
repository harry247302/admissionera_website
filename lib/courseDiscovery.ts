export type CourseLevel =
  | "After 10th"
  | "After 12th"
  | "Graduation"
  | "Post Graduation"
  | "Doctorate / Ph.D."
  | "Diploma / Certificate"
  | "Diploma"
  | "Certificate";

export type CourseCategory =
  | "Management"
  | "Engineering"
  | "Medical"
  | "Law"
  | "Design"
  | "Science"
  | "Arts"
  | "Commerce"
  | "Others";

export type StudyMode = "Online" | "Offline" | "Hybrid";

export type SortOption =
  | "popular"
  | "newest"
  | "reviewed"
  | "fee-asc"
  | "fee-desc";

export type DiscoveryCourse = {
  id: string;
  title: string;
  code?: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  studyMode: StudyMode;
  duration: string;
  fee: number;
  location: string;
  specializations: string[];
  badge: string;
  badgeTone: "violet" | "pink" | "amber" | "emerald" | "sky";
  popularity: number;
  reviewed: number;
  createdAt: string;
  keywords: string[];
};

export const COURSE_LEVELS: CourseLevel[] = [
  "After 10th",
  "After 12th",
  "Graduation",
  "Post Graduation",
  "Doctorate / Ph.D.",
  "Diploma / Certificate",
];

export const COURSE_CATEGORIES: CourseCategory[] = [
  "Management",
  "Engineering",
  "Medical",
  "Law",
  "Design",
  "Science",
  "Arts",
  "Commerce",
  "Others",
];

export const STUDY_MODES: StudyMode[] = ["Online", "Offline", "Hybrid"];

export const SPECIALIZATIONS = [
  "Finance",
  "Marketing",
  "HR",
  "IT",
  "Business Analytics",
  "Healthcare",
  "International Business",
];

export const DURATIONS = ["6 Months", "1 Year", "2 Years", "3 Years", "4 Years+"];

export const LOCATIONS = [
  "India",
  "Delhi NCR",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Online",
];

export const FEE_MIN = 20000;
export const FEE_MAX = 500000;

export const DISCOVERY_COURSES: DiscoveryCourse[] = [
  {
    id: "mba-sorted",
    title: "MBA Sorted",
    description: "Admissions made simple",
    category: "Management",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 180000,
    location: "Online",
    specializations: ["Finance", "Marketing", "HR"],
    badge: "Right MBA",
    badgeTone: "violet",
    popularity: 98,
    reviewed: 420,
    createdAt: "2025-08-01",
    keywords: ["mba", "management", "business"],
  },
  {
    id: "online-mba",
    title: "Online MBA",
    description: "Learn from anywhere",
    category: "Management",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 150000,
    location: "Online",
    specializations: ["Marketing", "Business Analytics"],
    badge: "91+ Specializations",
    badgeTone: "pink",
    popularity: 96,
    reviewed: 510,
    createdAt: "2025-07-12",
    keywords: ["mba", "online"],
  },
  {
    id: "global-mba",
    title: "Online Global MBA",
    description: "Study across borders",
    category: "Management",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 320000,
    location: "Online",
    specializations: ["International Business", "Finance"],
    badge: "Global",
    badgeTone: "sky",
    popularity: 90,
    reviewed: 280,
    createdAt: "2025-06-20",
    keywords: ["mba", "global", "international"],
  },
  {
    id: "one-year-mba",
    title: "1 Year MBA Online",
    description: "Fast track your career",
    category: "Management",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "1 Year",
    fee: 125000,
    location: "Online",
    specializations: ["HR", "Finance"],
    badge: "2 Years",
    badgeTone: "amber",
    popularity: 88,
    reviewed: 190,
    createdAt: "2025-08-18",
    keywords: ["mba", "fast", "one year"],
  },
  {
    id: "online-mca",
    title: "Online MCA",
    description: "Industry-oriented",
    category: "Engineering",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 110000,
    location: "Online",
    specializations: ["IT", "Business Analytics"],
    badge: "Trending",
    badgeTone: "pink",
    popularity: 92,
    reviewed: 340,
    createdAt: "2025-05-10",
    keywords: ["mca", "computer", "it"],
  },
  {
    id: "online-msc",
    title: "Online M.Sc",
    description: "Wide subject options",
    category: "Science",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 95000,
    location: "Online",
    specializations: ["Healthcare", "IT"],
    badge: "NEW",
    badgeTone: "emerald",
    popularity: 80,
    reviewed: 150,
    createdAt: "2025-08-22",
    keywords: ["msc", "science"],
  },
  {
    id: "ms-degree",
    title: "MS Degree Online",
    description: "Study from anywhere",
    category: "Science",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 210000,
    location: "Online",
    specializations: ["IT", "Business Analytics"],
    badge: "ROI 100%",
    badgeTone: "amber",
    popularity: 85,
    reviewed: 210,
    createdAt: "2025-04-02",
    keywords: ["ms", "masters", "science"],
  },
  {
    id: "online-ma",
    title: "Online MA",
    description: "Expand your knowledge",
    category: "Arts",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 70000,
    location: "Online",
    specializations: ["HR", "International Business"],
    badge: "Flexible",
    badgeTone: "violet",
    popularity: 74,
    reviewed: 120,
    createdAt: "2025-03-15",
    keywords: ["ma", "arts"],
  },
  {
    id: "online-mcom",
    title: "Online M.Com",
    description: "Flexible learning",
    category: "Commerce",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 65000,
    location: "Online",
    specializations: ["Finance", "Business Analytics"],
    badge: "NEW",
    badgeTone: "emerald",
    popularity: 78,
    reviewed: 160,
    createdAt: "2025-08-10",
    keywords: ["mcom", "commerce", "finance"],
  },
  {
    id: "dual-mba",
    title: "Dual MBA Online",
    description: "Get double expertise",
    category: "Management",
    level: "Post Graduation",
    studyMode: "Hybrid",
    duration: "2 Years",
    fee: 260000,
    location: "Delhi NCR",
    specializations: ["Marketing", "Finance", "International Business"],
    badge: "Dual Track",
    badgeTone: "pink",
    popularity: 87,
    reviewed: 230,
    createdAt: "2025-07-01",
    keywords: ["dual", "mba"],
  },
  {
    id: "mba-after-diploma",
    title: "Online MBA after Diploma",
    description: "Upgrade your career",
    category: "Management",
    level: "Diploma / Certificate",
    studyMode: "Online",
    duration: "2 Years",
    fee: 140000,
    location: "Online",
    specializations: ["HR", "Marketing"],
    badge: "Pathway",
    badgeTone: "sky",
    popularity: 76,
    reviewed: 95,
    createdAt: "2025-06-01",
    keywords: ["mba", "diploma"],
  },
  {
    id: "med",
    title: "Online Master of Education",
    description: "Build the future",
    category: "Arts",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 85000,
    location: "Online",
    specializations: ["HR"],
    badge: "Dr' Title",
    badgeTone: "violet",
    popularity: 70,
    reviewed: 110,
    createdAt: "2025-02-18",
    keywords: ["education", "med"],
  },
  {
    id: "global-mca",
    title: "Online Global MCA",
    description: "International exposure",
    category: "Engineering",
    level: "Post Graduation",
    studyMode: "Online",
    duration: "2 Years",
    fee: 240000,
    location: "Online",
    specializations: ["IT", "International Business"],
    badge: "Global",
    badgeTone: "sky",
    popularity: 83,
    reviewed: 175,
    createdAt: "2025-05-28",
    keywords: ["mca", "global"],
  },
  {
    id: "msw",
    title: "Online Master of Social Work",
    description: "Create social impact",
    category: "Arts",
    level: "Post Graduation",
    studyMode: "Hybrid",
    duration: "2 Years",
    fee: 90000,
    location: "Mumbai",
    specializations: ["Healthcare", "HR"],
    badge: "Impact",
    badgeTone: "emerald",
    popularity: 68,
    reviewed: 88,
    createdAt: "2025-01-20",
    keywords: ["social", "msw"],
  },
  {
    id: "mba-doctorate",
    title: "Online MBA & Doctorate",
    description: "Advance to leadership",
    category: "Management",
    level: "Doctorate / Ph.D.",
    studyMode: "Online",
    duration: "4 Years+",
    fee: 450000,
    location: "Online",
    specializations: ["Finance", "Business Analytics"],
    badge: "Leadership",
    badgeTone: "amber",
    popularity: 81,
    reviewed: 140,
    createdAt: "2025-04-25",
    keywords: ["doctorate", "mba", "phd"],
  },
  {
    id: "med-edd",
    title: "Online M.Ed & Ed.D",
    description: "Be an education leader",
    category: "Arts",
    level: "Doctorate / Ph.D.",
    studyMode: "Online",
    duration: "3 Years",
    fee: 380000,
    location: "Online",
    specializations: ["HR", "International Business"],
    badge: "Education Leader",
    badgeTone: "violet",
    popularity: 72,
    reviewed: 102,
    createdAt: "2025-03-30",
    keywords: ["education", "edd", "med"],
  },
  {
    id: "btech",
    title: "B.Tech Programs",
    description: "Build tomorrow's tech",
    category: "Engineering",
    level: "After 12th",
    studyMode: "Offline",
    duration: "4 Years+",
    fee: 420000,
    location: "Bangalore",
    specializations: ["IT"],
    badge: "Trending",
    badgeTone: "pink",
    popularity: 94,
    reviewed: 390,
    createdAt: "2025-07-20",
    keywords: ["btech", "engineering"],
  },
  {
    id: "llb",
    title: "LLB Degree",
    description: "Shape justice careers",
    category: "Law",
    level: "Graduation",
    studyMode: "Offline",
    duration: "3 Years",
    fee: 275000,
    location: "Delhi NCR",
    specializations: ["International Business"],
    badge: "Career Path",
    badgeTone: "sky",
    popularity: 79,
    reviewed: 165,
    createdAt: "2025-06-12",
    keywords: ["llb", "law"],
  },
  {
    id: "bdes",
    title: "B.Des Programs",
    description: "Design with purpose",
    category: "Design",
    level: "After 12th",
    studyMode: "Hybrid",
    duration: "4 Years+",
    fee: 350000,
    location: "Pune",
    specializations: ["Marketing"],
    badge: "Creative",
    badgeTone: "pink",
    popularity: 77,
    reviewed: 130,
    createdAt: "2025-05-05",
    keywords: ["design", "bdes"],
  },
  {
    id: "mbbs-path",
    title: "Medical Pathways",
    description: "Healthcare careers start here",
    category: "Medical",
    level: "After 12th",
    studyMode: "Offline",
    duration: "4 Years+",
    fee: 500000,
    location: "Hyderabad",
    specializations: ["Healthcare"],
    badge: "High Demand",
    badgeTone: "amber",
    popularity: 95,
    reviewed: 450,
    createdAt: "2025-08-05",
    keywords: ["medical", "mbbs", "healthcare"],
  },
];

export type DiscoveryFilters = {
  search: string;
  levels: CourseLevel[];
  categories: CourseCategory[];
  studyModes: StudyMode[];
  specializations: string[];
  durations: string[];
  feeMin: number;
  feeMax: number;
  locations: string[];
  activeCategory: "All Courses" | CourseCategory;
};

export const DEFAULT_FILTERS: DiscoveryFilters = {
  search: "",
  levels: [],
  categories: [],
  studyModes: [],
  specializations: [],
  durations: [],
  feeMin: FEE_MIN,
  feeMax: FEE_MAX,
  locations: [],
  activeCategory: "All Courses",
};

export function countByLevel(level: CourseLevel) {
  return DISCOVERY_COURSES.filter((course) => course.level === level).length;
}

export function formatFee(value: number) {
  if (value >= 100000) {
    const lakhs = value / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)}L`;
  }
  if (value >= 1000) return `₹${Math.round(value / 1000)}K`;
  return `₹${value}`;
}

export function filterCourses<T extends DiscoveryCourse>(courses: T[], filters: DiscoveryFilters): T[] {
  const query = filters.search.trim().toLowerCase();

  return courses.filter((course) => {
    if (filters.activeCategory !== "All Courses" && course.category !== filters.activeCategory) {
      return false;
    }
    if (filters.levels.length && !filters.levels.includes(course.level)) return false;
    if (filters.categories.length && !filters.categories.includes(course.category)) return false;
    if (filters.studyModes.length && !filters.studyModes.includes(course.studyMode)) return false;
    if (
      filters.specializations.length
      && !filters.specializations.some((item) => course.specializations.includes(item))
    ) {
      return false;
    }
    if (filters.durations.length && !filters.durations.includes(course.duration)) return false;
    if (course.fee > 0 && (course.fee < filters.feeMin || course.fee > filters.feeMax)) return false;
    if (filters.locations.length && !filters.locations.includes(course.location)) return false;

    if (!query) return true;

    const haystack = [
      course.title,
      course.description,
      course.category,
      course.level,
      course.studyMode,
      course.code,
      course.location,
      ...course.specializations,
      ...course.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function sortCourses<T extends DiscoveryCourse>(courses: T[], sortBy: SortOption): T[] {
  const next = [...courses];
  switch (sortBy) {
    case "newest":
      return next.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "reviewed":
      return next.sort((a, b) => b.reviewed - a.reviewed);
    case "fee-asc":
      return next.sort((a, b) => a.fee - b.fee);
    case "fee-desc":
      return next.sort((a, b) => b.fee - a.fee);
    case "popular":
    default:
      return next.sort((a, b) => b.popularity - a.popularity);
  }
}

const COURSES_API_URL = "https://backend.admissionera.com/api/academic/courses";

const BADGE_TONES_CYCLE: DiscoveryCourse["badgeTone"][] = [
  "violet",
  "pink",
  "amber",
  "emerald",
  "sky",
];

type ApiCourse = {
  uuid?: string;
  id?: string;
  name?: string;
  degree?: string | null;
  level?: string | null;
  code?: string | null;
  description?: string | null;
  overview?: string | null;
  
  eligibility?: string | null;
  curriculum?: string | null;
  career_opportunities?: string | null;
  careerOpportunities?: string | null;
  department?: string | null;
  faculty?: string | null;
  study_mode?: string | null;
  studyMode?: string | null;
  attendance_mode?: string | null;
  attendanceMode?: string | null;
  language?: string | null;
  currency?: string | null;
  is_active?: boolean;
  is_deleted?: boolean;
  status?: string | null;
  created_at?: string;
  createdAt?: string;
  university_name?: string | null;
  universityName?: string | null;
  university_code?: string | null;
  universityCode?: string | null;
  specializations?: Array<{ name?: string } | string>;
  specialization_content_tables?: Array<{
    title?: string;
    rows?: Array<{
      label?: string;
      content?: Record<string, string> | string;
      sort_order?: number;
    }>;
  }>;
  faqs?: Array<{ id?: string }>;
  course_content_paragraphs?: Array<{ id?: string }>;
};

function extractTableDetail(
  tables: ApiCourse["specialization_content_tables"] = [],
  labels: string[],
) {
  for (const table of tables || []) {
    for (const row of table.rows || []) {
      const hay = `${row.label || ""}`.toLowerCase();
      if (!labels.some((label) => hay.includes(label.toLowerCase()))) continue;
      const content =
        typeof row.content === "string"
          ? (() => {
            try { return JSON.parse(row.content) as Record<string, string>; }
            catch { return {}; }
          })()
          : (row.content || {});
      return content.Details || content.Value || Object.values(content).find(Boolean) || "";
    }
  }
  return "";
}

function parseFeeAmount(value: string) {
  const nums = [...value.matchAll(/([\d,.]+)/g)]
    .map((match) => Number(String(match[1]).replace(/,/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (!nums.length) return 0;
  return Math.min(...nums);
}

export type CourseFaq = {
  id: string;
  question: string;
  answer: string;
  display?: string | number;
  is_active?: boolean;
};

export type CourseContentParagraph = {
  id: string;
  title: string;
  content: string;
  sort_order: number;
};

export type CourseContentTableRow = {
  id: string;
  label: string;
  content: Record<string, string>;
  sort_order: number;
};

export type CourseContentTable = {
  id: string;
  title: string;
  sort_order: number;
  rows: CourseContentTableRow[];
};

export type CourseDetail = {
  id: string;
  name: string;
  code: string;
  degree: string;
  level: string;
  description: string;
  overview: string;
  eligibility: string;
  curriculum: string;
  careerOpportunities: string;
  department: string;
  faculty: string;
  studyMode: string;
  attendanceMode: string;
  language: string;
  currency: string;
  status: string;
  universityName: string;
  universityCode: string;
  banner: string;
  faqs: CourseFaq[];
  paragraphs: CourseContentParagraph[];
  tables: CourseContentTable[];
};

function mapApiLevel(level?: string | null): CourseLevel {
  const key = String(level || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  if (["POSTGRADUATE", "POST_GRADUATION", "PG", "MASTERS", "MASTER"].includes(key)) {
    return "Post Graduation";
  }
  if (["UNDERGRADUATE", "UNDER_GRADUATION", "UG", "BACHELOR", "GRADUATION"].includes(key)) {
    return "Graduation";
  }
  if (key === "CERTIFICATE") return "Certificate";
  if (key === "DIPLOMA") return "Diploma";
  if (["DOCTORATE", "PHD", "PH_D", "DOCTORATE_PH_D"].includes(key)) {
    return "Doctorate / Ph.D.";
  }
  if (key.includes("10")) return "After 10th";
  if (key.includes("12")) return "After 12th";
  return "Graduation";
}

function mapApiStudyMode(mode?: string | null): StudyMode {
  const key = String(mode || "").trim().toUpperCase();
  if (key === "ONLINE") return "Online";
  if (key === "HYBRID") return "Hybrid";
  if (["DISTANCE", "PART_TIME"].includes(key)) return "Online";
  return "Offline";
}

function mapApiCategory(department?: string | null, name?: string | null): CourseCategory {
  const haystack = `${department || ""} ${name || ""}`.toLowerCase();
  if (/(mba|management|business|commerce)/.test(haystack)) {
    return /commerce/.test(haystack) ? "Commerce" : "Management";
  }
  if (/(engineer|technology|it|computer)/.test(haystack)) return "Engineering";
  if (/(medical|mbbs|health|nursing)/.test(haystack)) return "Medical";
  if (/law|llb|legal/.test(haystack)) return "Law";
  if (/design|fashion/.test(haystack)) return "Design";
  if (/science|physics|chemistry|biology/.test(haystack)) return "Science";
  if (/arts|humanities/.test(haystack)) return "Arts";
  return "Others";
}

function formatLabel(value?: string | null) {
  if (!value) return "";
  return value
    .toLowerCase()
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function mapApiCourseToDiscovery(row: ApiCourse, index = 0): DiscoveryCourse {
  const title = row.name || row.degree || row.code || "Untitled Course";
  const description = row.description || row.overview || row.degree || "";
  const level = mapApiLevel(row.level);
  const studyMode = mapApiStudyMode(row.study_mode || row.studyMode || row.attendance_mode || row.attendanceMode);
  const specializations = (row.specializations || [])
    .map((spec) => (typeof spec === "string" ? spec : spec?.name || ""))
    .filter(Boolean);

  const tables = row.specialization_content_tables || [];
  const durationFromTable = extractTableDetail(tables, ["duration"]);
  const feeFromTable = extractTableDetail(tables, ["fee", "tuition"]);
  const faqCount = Array.isArray(row.faqs) ? row.faqs.length : 0;
  const paragraphCount = Array.isArray(row.course_content_paragraphs)
    ? row.course_content_paragraphs.length
    : 0;

  return {
    id: String(row.uuid || row.id || `${row.code || title}-${index}`),
    title,
    code: row.code?.trim() || "",
    description,
    category: mapApiCategory(row.department, title),
    level,
    studyMode,
    duration: durationFromTable || formatLabel(row.study_mode || row.studyMode) || "Flexible",
    fee: parseFeeAmount(feeFromTable),
    location: row.university_name || row.universityName || "India",
    specializations,
    badge:
      specializations.length > 0
        ? `${specializations.length}+ Specializations`
        : formatLabel(row.study_mode || row.studyMode || row.attendance_mode) ||
          formatLabel(row.degree) ||
          "Course",
    badgeTone:
      specializations.length > 0
        ? "pink"
        : BADGE_TONES_CYCLE[index % BADGE_TONES_CYCLE.length],
    popularity: row.is_active === false || row.status === "INACTIVE" ? 40 : 80 + faqCount,
    reviewed: Math.max(specializations.length * 10, faqCount * 5, paragraphCount * 3),
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    keywords: [
      title,
      row.code || "",
      row.degree || "",
      row.level || "",
      row.department || "",
      row.language || "",
      ...specializations,
    ].filter(Boolean),
  };
}

export function mapApiCourseToDetail(row: Record<string, unknown> = {}): CourseDetail {
  const faqs = Array.isArray(row.faqs) ? (row.faqs as CourseFaq[]) : [];
  const paragraphs = Array.isArray(row.course_content_paragraphs)
    ? (row.course_content_paragraphs as CourseContentParagraph[])
    : [];
  const rawTables = Array.isArray(row.specialization_content_tables)
    ? row.specialization_content_tables
    : Array.isArray(row.course_content_tables)
      ? row.course_content_tables
      : [];

  const tables: CourseContentTable[] = (rawTables as Array<Record<string, unknown>>).map((table) => ({
    id: String(table.id || cryptoRandom()),
    title: String(table.title || "Content Table"),
    sort_order: Number(table.sort_order) || 0,
    rows: (Array.isArray(table.rows) ? table.rows : []).map((rowItem: Record<string, unknown>, index: number) => {
      const contentRaw = rowItem.content;
      const content =
        typeof contentRaw === "string"
          ? (() => {
            try { return JSON.parse(contentRaw) as Record<string, string>; }
            catch { return {}; }
          })()
          : ((contentRaw || {}) as Record<string, string>);
      return {
        id: String(rowItem.id || `${index}`),
        label: String(rowItem.label || ""),
        content,
        sort_order: Number(rowItem.sort_order) || index,
      };
    }),
  }));

  return {
    id: String(row.uuid || row.id || ""),
    name: String(row.name || row.degree || row.code || "Untitled Course"),
    code: String(row.code || ""),
    degree: String(row.degree || ""),
    level: formatLabel(String(row.level || "")) || String(row.level || ""),
    description: String(row.description || ""),
    overview: String(row.overview || ""),
    eligibility: String(row.eligibility || ""),
    curriculum: String(row.curriculum || ""),
    careerOpportunities: String(row.careerOpportunities || row.career_opportunities || ""),
    department: String(row.department || ""),
    faculty: String(row.faculty || ""),
    studyMode: formatLabel(String(row.studyMode || row.study_mode || "")) || "",
    attendanceMode: formatLabel(String(row.attendanceMode || row.attendance_mode || "")) || "",
    language: String(row.language || ""),
    currency: String(row.currency || "INR"),
    status: String(row.status || (row.is_active === false ? "INACTIVE" : "ACTIVE")),
    universityName: String(row.universityName || row.university_name || ""),
    universityCode: String(row.universityCode || row.university_code || ""),
    banner: String(row.banner || row.cover || row.image || row.hero_image || ""),
    faqs: faqs.filter((faq) => faq?.is_active !== false),
    paragraphs: [...paragraphs].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    tables: [...tables].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
  };
}

function cryptoRandom() {
  return `tmp-${Math.random().toString(36).slice(2)}`;
}

export async function fetchDiscoveryCourses(): Promise<DiscoveryCourse[]> {
  const res = await fetch(COURSES_API_URL, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load courses (${res.status})`);
  }

  const payload = await res.json();
  const rows: ApiCourse[] = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload?.courses)
      ? payload.courses
      : [];

  return rows
    .filter((row) => row && row.is_deleted !== true)
    .map((row, index) => mapApiCourseToDiscovery(row, index));
}

export async function fetchCourseById(id: string): Promise<CourseDetail> {
  const res = await fetch(`${COURSES_API_URL}/${encodeURIComponent(id)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load course (${res.status})`);
  }

  const payload = await res.json();
  const row = payload?.data || payload?.course;
  if (!row) {
    throw new Error("Course not found");
  }

  return mapApiCourseToDetail(row);
}
