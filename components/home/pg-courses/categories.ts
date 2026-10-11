import type { DiscoveryCourse } from "@/lib/courseDiscovery";

export type PgCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  match: (course: DiscoveryCourse) => boolean;
};

const textOf = (course: DiscoveryCourse) =>
  [course.title, course.description, course.code, course.badge, ...course.keywords, ...course.specializations]
    .filter(Boolean)
    .join(" ");

export const PG_CATEGORIES: PgCategory[] = [
  {
    id: "pg",
    title: "PG Courses",
    subtitle: "After Graduation",
    description:
      "Explore top PG courses from India's leading universities. Compare specializations, fees, duration and more — all in one place.",
    match: (course) => course.level === "Post Graduation",
  },
  {
    id: "executive",
    title: "Executive Education",
    subtitle: "Working Professionals & CXOs",
    description: "Programmes built for working professionals and leadership roles.",
    match: (course) => /executive|emba|cxo|working professional/i.test(textOf(course)),
  },
  {
    id: "doctorate",
    title: "Doctorate/Ph.D.",
    subtitle: "Get Dr. Title (After UG + Work Ex)",
    description: "Doctoral pathways for graduates who want to earn a Dr. title.",
    match: (course) => course.level === "Doctorate / Ph.D.",
  },
  {
    id: "genai",
    title: "Gen AI/Agentic AI",
    subtitle: "Future Proof Career",
    description: "Courses focused on artificial intelligence and future-ready skills.",
    match: (course) => /gen\s*ai|agentic|\bai\b|machine learning|data science/i.test(textOf(course)),
  },
  {
    id: "ug",
    title: "UG Courses",
    subtitle: "After 12th",
    description: "Undergraduate programmes to start after 12th.",
    match: (course) => course.level === "After 12th" || course.level === "Graduation",
  },
  {
    id: "engineering",
    title: "Engineering",
    subtitle: "Flexi Timing",
    description: "Engineering programmes with flexible study options.",
    match: (course) => course.category === "Engineering",
  },
  {
    id: "abroad",
    title: "Study Abroad",
    subtitle: "Pathway/Hybrid Mode",
    description: "Pathway and hybrid programmes with an international focus.",
    match: (course) =>
      course.studyMode === "Hybrid" || /abroad|global|international|pathway/i.test(textOf(course)),
  },
  {
    id: "skilling",
    title: "Skilling & Certificate",
    subtitle: "After 10th & 12th",
    description: "Certificate, diploma and skill programmes after 10th and 12th.",
    match: (course) =>
      course.level === "After 10th" ||
      course.level === "Diploma" ||
      course.level === "Certificate" ||
      course.level === "Diploma / Certificate",
  },
];

export const DEFAULT_CATEGORY_ID = "pg";
