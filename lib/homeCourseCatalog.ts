import type { DiscoveryCourse } from "@/lib/courseDiscovery";

export type CourseCardIcon =
  | "book"
  | "cap"
  | "laptop"
  | "chart"
  | "gear"
  | "briefcase"
  | "flask"
  | "users"
  | "globe"
  | "monitor"
  | "doc"
  | "calendar"
  | "award"
  | "layers";

export type CourseCardTone = "purple" | "yellow" | "blue" | "green" | "pink" | "peach";

export type HomeCourse = DiscoveryCourse & {
  universityCount?: number;
  eligibility?: string;
  icon?: CourseCardIcon;
  tone?: CourseCardTone;
  href?: string;
};

type CatalogSeed = {
  id: string;
  title: string;
  universityCount: number;
  eligibility: string;
  icon: CourseCardIcon;
  tone: CourseCardTone;
  category: DiscoveryCourse["category"];
};

const PG_SEEDS: CatalogSeed[] = [
  { id: "pg-online-ma", title: "Online MA", universityCount: 23, eligibility: "Graduation", icon: "book", tone: "purple", category: "Arts" },
  { id: "pg-online-mba", title: "Online MBA", universityCount: 37, eligibility: "Graduation", icon: "cap", tone: "yellow", category: "Management" },
  { id: "pg-online-mca", title: "Online MCA", universityCount: 26, eligibility: "Graduated with BCA", icon: "laptop", tone: "blue", category: "Engineering" },
  { id: "pg-online-mcom", title: "Online MCom", universityCount: 19, eligibility: "Graduated with B.Com", icon: "chart", tone: "green", category: "Commerce" },
  { id: "pg-mtech-wp", title: "M.Tech For Working Professionals", universityCount: 3, eligibility: "Graduation with B.Tech", icon: "gear", tone: "pink", category: "Engineering" },
  { id: "pg-emba", title: "Executive Master of Business Administration (EMBA)", universityCount: 4, eligibility: "Graduate", icon: "briefcase", tone: "blue", category: "Management" },
  { id: "pg-online-msc", title: "Online MSc", universityCount: 6, eligibility: "Graduate", icon: "flask", tone: "pink", category: "Science" },
  { id: "pg-dual-mba", title: "Dual MBA", universityCount: 6, eligibility: "Graduate", icon: "users", tone: "purple", category: "Management" },
  { id: "pg-global-mba", title: "Global MBA", universityCount: 2, eligibility: "Graduate", icon: "globe", tone: "yellow", category: "Management" },
  { id: "pg-distance-mba", title: "Distance MBA", universityCount: 1, eligibility: "Graduate", icon: "monitor", tone: "green", category: "Management" },
  { id: "pg-online-pgdm", title: "Online PGDM", universityCount: 1, eligibility: "Graduate", icon: "doc", tone: "pink", category: "Management" },
  { id: "pg-one-year-mba", title: "1 (one) Year MBA Online", universityCount: 1, eligibility: "Graduate", icon: "calendar", tone: "green", category: "Management" },
  { id: "pg-mba-doctorate", title: "Online MBA and Doctorate", universityCount: 0, eligibility: "Graduate", icon: "award", tone: "purple", category: "Management" },
  { id: "pg-integrated-mba", title: "Integrated Online MBA Program", universityCount: 1, eligibility: "10+2 Pass", icon: "layers", tone: "blue", category: "Management" },
  { id: "pg-mba-after-diploma", title: "Online MBA after Diploma", universityCount: 0, eligibility: "Graduate", icon: "cap", tone: "peach", category: "Management" },
];

/** Curated postgraduate catalogue shown on the homepage; popularity preserves listing order. */
export const HOME_PG_COURSES: HomeCourse[] = PG_SEEDS.map((seed, index) => ({
  id: seed.id,
  title: seed.title,
  description: "",
  category: seed.category,
  level: "Post Graduation",
  studyMode: "Online",
  duration: "",
  fee: 0,
  location: "Online",
  specializations: [],
  badge: "After Graduation",
  badgeTone: "violet",
  popularity: 1000 - index,
  reviewed: 0,
  createdAt: "2026-01-01",
  keywords: [seed.title.toLowerCase(), seed.eligibility.toLowerCase()],
  universityCount: seed.universityCount,
  eligibility: seed.eligibility,
  icon: seed.icon,
  tone: seed.tone,
  href: `/compare?course=${encodeURIComponent(seed.title)}`,
}));
