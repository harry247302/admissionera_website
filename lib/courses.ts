export type CourseMode = "Online" | "Offline" | "Hybrid";
export type CourseLevel =
  | "Undergraduate"
  | "Postgraduate"
  | "Doctorate"
  | "Certificate"
  | "Executive";
export type UniversityType = "Government" | "Private" | "Deemed" | "International";
export type CourseBadge = "Trending" | "Best Value" | "Popular" | "High ROI" | "New";

export type Course = {
  id: string;
  slug: string;
  title: string;
  university: string;
  universityShort: string;
  verified: boolean;
  badge?: CourseBadge;
  durationYears: number;
  durationLabel: string;
  mode: CourseMode;
  specialization: string;
  specializationCount: number;
  rating: number;
  reviews: number;
  fee: number;
  emi: boolean;
  level: CourseLevel;
  category: string;
  universityType: UniversityType;
  featured?: boolean;
  popularity: number;
};

export type CourseCategory = {
  id: string;
  label: string;
  count: number;
};

export const FILTER_OPTIONS = {
  levels: ["Undergraduate", "Postgraduate", "Doctorate", "Certificate", "Executive"] as const,
  modes: ["Online", "Offline", "Hybrid"] as const,
  durations: [
    { id: "lt1", label: "< 1 Year" },
    { id: "1-2", label: "1–2 Years" },
    { id: "2plus", label: "2+ Years" },
  ] as const,
  specializations: [
    "Management",
    "Computer Science",
    "Finance",
    "Marketing",
    "Data Science",
    "Engineering",
    "Commerce",
    "Arts",
  ] as const,
  universityTypes: ["Government", "Private", "Deemed", "International"] as const,
};

export const COURSES: Course[] = [
  {
    id: "c1",
    slug: "online-mba",
    title: "Online MBA",
    university: "Amity University Online",
    universityShort: "AU",
    verified: true,
    badge: "Trending",
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Management",
    specializationCount: 15,
    rating: 4.8,
    reviews: 1250,
    fee: 45000,
    emi: true,
    level: "Postgraduate",
    category: "MBA",
    universityType: "Private",
    featured: true,
    popularity: 98,
  },
  {
    id: "c2",
    slug: "online-global-mba",
    title: "Online Global MBA",
    university: "Manipal University Jaipur",
    universityShort: "MU",
    verified: true,
    badge: "High ROI",
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Management",
    specializationCount: 12,
    rating: 4.7,
    reviews: 860,
    fee: 89000,
    emi: true,
    level: "Postgraduate",
    category: "MBA",
    universityType: "Private",
    popularity: 91,
  },
  {
    id: "c3",
    slug: "one-year-mba",
    title: "1 Year MBA",
    university: "NMIMS Global Access",
    universityShort: "NM",
    verified: true,
    badge: "Popular",
    durationYears: 1,
    durationLabel: "1 Year",
    mode: "Hybrid",
    specialization: "Management",
    specializationCount: 8,
    rating: 4.6,
    reviews: 540,
    fee: 125000,
    emi: true,
    level: "Postgraduate",
    category: "MBA",
    universityType: "Deemed",
    popularity: 88,
  },
  {
    id: "c4",
    slug: "online-mca",
    title: "Online MCA",
    university: "Jain University Online",
    universityShort: "JU",
    verified: true,
    badge: "Best Value",
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Computer Science",
    specializationCount: 9,
    rating: 4.5,
    reviews: 430,
    fee: 52000,
    emi: true,
    level: "Postgraduate",
    category: "MCA",
    universityType: "Private",
    popularity: 84,
  },
  {
    id: "c5",
    slug: "ms-degree-online",
    title: "MS Degree Online",
    university: "Liverpool John Moores University",
    universityShort: "LJ",
    verified: true,
    badge: "New",
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Data Science",
    specializationCount: 6,
    rating: 4.7,
    reviews: 210,
    fee: 280000,
    emi: true,
    level: "Postgraduate",
    category: "PG Courses",
    universityType: "International",
    popularity: 79,
  },
  {
    id: "c6",
    slug: "online-ma",
    title: "Online MA",
    university: "Chandigarh University Online",
    universityShort: "CU",
    verified: true,
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Arts",
    specializationCount: 7,
    rating: 4.4,
    reviews: 190,
    fee: 36000,
    emi: true,
    level: "Postgraduate",
    category: "PG Courses",
    universityType: "Private",
    popularity: 70,
  },
  {
    id: "c7",
    slug: "online-mcom",
    title: "Online M.Com",
    university: "LPU Online",
    universityShort: "LP",
    verified: true,
    badge: "Best Value",
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Commerce",
    specializationCount: 5,
    rating: 4.3,
    reviews: 320,
    fee: 32000,
    emi: true,
    level: "Postgraduate",
    category: "PG Courses",
    universityType: "Private",
    popularity: 73,
  },
  {
    id: "c8",
    slug: "dual-mba",
    title: "Dual MBA",
    university: "UPES Online",
    universityShort: "UP",
    verified: true,
    badge: "Trending",
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Finance",
    specializationCount: 10,
    rating: 4.6,
    reviews: 275,
    fee: 99000,
    emi: true,
    level: "Postgraduate",
    category: "MBA",
    universityType: "Private",
    popularity: 86,
  },
  {
    id: "c9",
    slug: "bba-online",
    title: "Online BBA",
    university: "Amity University Online",
    universityShort: "AU",
    verified: true,
    badge: "Popular",
    durationYears: 3,
    durationLabel: "3 Years",
    mode: "Online",
    specialization: "Management",
    specializationCount: 11,
    rating: 4.5,
    reviews: 610,
    fee: 41000,
    emi: true,
    level: "Undergraduate",
    category: "UG Courses",
    universityType: "Private",
    popularity: 82,
  },
  {
    id: "c10",
    slug: "bca-online",
    title: "Online BCA",
    university: "Manipal University Jaipur",
    universityShort: "MU",
    verified: true,
    durationYears: 3,
    durationLabel: "3 Years",
    mode: "Online",
    specialization: "Computer Science",
    specializationCount: 8,
    rating: 4.4,
    reviews: 480,
    fee: 48000,
    emi: true,
    level: "Undergraduate",
    category: "UG Courses",
    universityType: "Private",
    popularity: 80,
  },
  {
    id: "c11",
    slug: "btech-cse",
    title: "B.Tech Computer Science",
    university: "BITS Pilani WILP",
    universityShort: "BP",
    verified: true,
    badge: "High ROI",
    durationYears: 4,
    durationLabel: "4 Years",
    mode: "Hybrid",
    specialization: "Engineering",
    specializationCount: 6,
    rating: 4.8,
    reviews: 920,
    fee: 245000,
    emi: false,
    level: "Undergraduate",
    category: "Engineering",
    universityType: "Deemed",
    popularity: 93,
  },
  {
    id: "c12",
    slug: "mtech-online",
    title: "Online M.Tech",
    university: "BITS Pilani WILP",
    universityShort: "BP",
    verified: true,
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Engineering",
    specializationCount: 7,
    rating: 4.6,
    reviews: 340,
    fee: 198000,
    emi: true,
    level: "Postgraduate",
    category: "Engineering",
    universityType: "Deemed",
    popularity: 77,
  },
  {
    id: "c13",
    slug: "data-science-pg",
    title: "PG in AI & Data Science",
    university: "Great Learning × UT Austin",
    universityShort: "GL",
    verified: true,
    badge: "Trending",
    durationYears: 1,
    durationLabel: "11 Months",
    mode: "Online",
    specialization: "Data Science",
    specializationCount: 4,
    rating: 4.7,
    reviews: 710,
    fee: 175000,
    emi: true,
    level: "Certificate",
    category: "AI / Data Science",
    universityType: "International",
    popularity: 90,
  },
  {
    id: "c14",
    slug: "executive-mba",
    title: "Executive MBA",
    university: "IIM Online suite partner",
    universityShort: "IM",
    verified: true,
    badge: "Popular",
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Hybrid",
    specialization: "Management",
    specializationCount: 5,
    rating: 4.9,
    reviews: 390,
    fee: 420000,
    emi: true,
    level: "Executive",
    category: "Executive Education",
    universityType: "Government",
    popularity: 85,
  },
  {
    id: "c15",
    slug: "phd-management",
    title: "Ph.D. in Management",
    university: "Shoolini University",
    universityShort: "SU",
    verified: true,
    durationYears: 3,
    durationLabel: "3 Years",
    mode: "Hybrid",
    specialization: "Management",
    specializationCount: 3,
    rating: 4.4,
    reviews: 88,
    fee: 150000,
    emi: false,
    level: "Doctorate",
    category: "Doctorate",
    universityType: "Private",
    popularity: 61,
  },
  {
    id: "c16",
    slug: "uk-mba",
    title: "MBA (UK Pathway)",
    university: "University of London",
    universityShort: "UL",
    verified: true,
    badge: "New",
    durationYears: 1.5,
    durationLabel: "18 Months",
    mode: "Online",
    specialization: "Marketing",
    specializationCount: 6,
    rating: 4.6,
    reviews: 150,
    fee: 310000,
    emi: true,
    level: "Postgraduate",
    category: "Study Abroad",
    universityType: "International",
    popularity: 74,
  },
  {
    id: "c17",
    slug: "digital-marketing-cert",
    title: "Digital Marketing Certificate",
    university: "MICA Online",
    universityShort: "MI",
    verified: true,
    badge: "Best Value",
    durationYears: 0.5,
    durationLabel: "6 Months",
    mode: "Online",
    specialization: "Marketing",
    specializationCount: 4,
    rating: 4.5,
    reviews: 640,
    fee: 28000,
    emi: true,
    level: "Certificate",
    category: "Certifications",
    universityType: "Private",
    popularity: 81,
  },
  {
    id: "c18",
    slug: "bcom-online",
    title: "Online B.Com",
    university: "Chandigarh University Online",
    universityShort: "CU",
    verified: true,
    durationYears: 3,
    durationLabel: "3 Years",
    mode: "Online",
    specialization: "Commerce",
    specializationCount: 6,
    rating: 4.3,
    reviews: 510,
    fee: 29000,
    emi: true,
    level: "Undergraduate",
    category: "UG Courses",
    universityType: "Private",
    popularity: 76,
  },
  {
    id: "c19",
    slug: "finance-mba",
    title: "MBA in Finance",
    university: "Symbiosis Centre for Distance Learning",
    universityShort: "SC",
    verified: true,
    durationYears: 2,
    durationLabel: "2 Years",
    mode: "Online",
    specialization: "Finance",
    specializationCount: 8,
    rating: 4.5,
    reviews: 280,
    fee: 67000,
    emi: true,
    level: "Postgraduate",
    category: "MBA",
    universityType: "Deemed",
    popularity: 78,
  },
  {
    id: "c20",
    slug: "campus-btech",
    title: "B.Tech Mechanical",
    university: "Delhi Technological University",
    universityShort: "DT",
    verified: true,
    durationYears: 4,
    durationLabel: "4 Years",
    mode: "Offline",
    specialization: "Engineering",
    specializationCount: 5,
    rating: 4.7,
    reviews: 1100,
    fee: 180000,
    emi: false,
    level: "Undergraduate",
    category: "Engineering",
    universityType: "Government",
    popularity: 87,
  },
  {
    id: "c21",
    slug: "ai-ml-cert",
    title: "AI & Machine Learning Certificate",
    university: "IIT Madras Online",
    universityShort: "II",
    verified: true,
    badge: "High ROI",
    durationYears: 0.75,
    durationLabel: "9 Months",
    mode: "Online",
    specialization: "Data Science",
    specializationCount: 3,
    rating: 4.9,
    reviews: 2040,
    fee: 54000,
    emi: true,
    level: "Certificate",
    category: "AI / Data Science",
    universityType: "Government",
    popularity: 96,
  },
  {
    id: "c22",
    slug: "executive-leadership",
    title: "Executive Leadership Program",
    university: "ISB Executive Education",
    universityShort: "IS",
    verified: true,
    durationYears: 0.5,
    durationLabel: "6 Months",
    mode: "Hybrid",
    specialization: "Management",
    specializationCount: 2,
    rating: 4.8,
    reviews: 160,
    fee: 385000,
    emi: false,
    level: "Executive",
    category: "Executive Education",
    universityType: "Private",
    popularity: 72,
  },
  {
    id: "c23",
    slug: "dba-online",
    title: "Online DBA",
    university: "Swiss School of Business Research",
    universityShort: "SS",
    verified: true,
    durationYears: 3,
    durationLabel: "3 Years",
    mode: "Online",
    specialization: "Management",
    specializationCount: 4,
    rating: 4.4,
    reviews: 74,
    fee: 450000,
    emi: true,
    level: "Doctorate",
    category: "Doctorate",
    universityType: "International",
    popularity: 58,
  },
  {
    id: "c24",
    slug: "study-canada-bba",
    title: "BBA Study in Canada",
    university: "Yorkville University",
    universityShort: "YV",
    verified: true,
    badge: "New",
    durationYears: 3,
    durationLabel: "3 Years",
    mode: "Offline",
    specialization: "Management",
    specializationCount: 7,
    rating: 4.5,
    reviews: 95,
    fee: 390000,
    emi: true,
    level: "Undergraduate",
    category: "Study Abroad",
    universityType: "International",
    popularity: 69,
  },
];

export const CATEGORY_ORDER = [
  "UG Courses",
  "PG Courses",
  "MBA",
  "MCA",
  "Engineering",
  "Doctorate",
  "Executive Education",
  "Study Abroad",
  "AI / Data Science",
  "Certifications",
];

export function getUniversities(courses: Course[]) {
  return [...new Set(courses.map((course) => course.university))].sort();
}

export function getCategories(courses: Course[]): CourseCategory[] {
  return CATEGORY_ORDER.map((label) => ({
    id: label,
    label,
    count: courses.filter((course) => course.category === label).length,
  }));
}

export function formatFee(value: number) {
  if (value >= 100000) {
    const lakhs = value / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} L`;
  }
  return `₹${value.toLocaleString("en-IN")}`;
}

export type CourseFilters = {
  query: string;
  category: string | null;
  levels: string[];
  modes: string[];
  durations: string[];
  specializations: string[];
  universities: string[];
  universityTypes: string[];
  feeMin: number;
  feeMax: number;
};

export const DEFAULT_FEE_RANGE = { min: 25000, max: 450000 };

export const EMPTY_FILTERS: CourseFilters = {
  query: "",
  category: null,
  levels: [],
  modes: [],
  durations: [],
  specializations: [],
  universities: [],
  universityTypes: [],
  feeMin: DEFAULT_FEE_RANGE.min,
  feeMax: DEFAULT_FEE_RANGE.max,
};

function matchesDuration(course: Course, ids: string[]) {
  if (ids.length === 0) return true;
  return ids.some((id) => {
    if (id === "lt1") return course.durationYears < 1;
    if (id === "1-2") return course.durationYears >= 1 && course.durationYears <= 2;
    return course.durationYears > 2;
  });
}

export function filterCourses(courses: Course[], filters: CourseFilters) {
  const q = filters.query.trim().toLowerCase();
  return courses.filter((course) => {
    const matchesQuery =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.university.toLowerCase().includes(q) ||
      course.specialization.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q);
    const matchesCategory = !filters.category || course.category === filters.category;
    const matchesLevel = filters.levels.length === 0 || filters.levels.includes(course.level);
    const matchesMode = filters.modes.length === 0 || filters.modes.includes(course.mode);
    const matchesSpec =
      filters.specializations.length === 0 ||
      filters.specializations.includes(course.specialization);
    const matchesUniversity =
      filters.universities.length === 0 || filters.universities.includes(course.university);
    const matchesType =
      filters.universityTypes.length === 0 ||
      filters.universityTypes.includes(course.universityType);
    const matchesFee = course.fee >= filters.feeMin && course.fee <= filters.feeMax;
    return (
      matchesQuery &&
      matchesCategory &&
      matchesLevel &&
      matchesMode &&
      matchesDuration(course, filters.durations) &&
      matchesSpec &&
      matchesUniversity &&
      matchesType &&
      matchesFee
    );
  });
}

export type SortKey = "recommended" | "popular" | "rating" | "fees" | "duration";

export function sortCourses(courses: Course[], sort: SortKey) {
  const copy = [...courses];
  copy.sort((a, b) => {
    if (sort === "popular") return b.popularity - a.popularity;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "fees") return a.fee - b.fee;
    if (sort === "duration") return a.durationYears - b.durationYears;
    return b.popularity * b.rating - a.popularity * a.rating;
  });
  return copy;
}

export function selectedFilterCount(filters: CourseFilters) {
  const feeTouched =
    filters.feeMin !== DEFAULT_FEE_RANGE.min || filters.feeMax !== DEFAULT_FEE_RANGE.max;
  return (
    filters.levels.length +
    filters.modes.length +
    filters.durations.length +
    filters.specializations.length +
    filters.universities.length +
    filters.universityTypes.length +
    (feeTouched ? 1 : 0)
  );
}
