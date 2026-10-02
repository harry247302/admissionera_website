export type ExpertTone = "pink" | "mint" | "yellow" | "lavender";

export type AdmissionExpert = {
  slug: string;
  name: string;
  specialisation: string;
  rating: number;
  studentsGuided: string;
  online: boolean;
  tone: ExpertTone;
  image?: string;
};

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
