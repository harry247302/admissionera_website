export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Explore Programs",
    href: "/programs",
    children: [
      {
        label: "Undergraduate Programs",
        href: "/programs/undergraduate",
        description: "Bachelor’s degrees after 12th",
      },
      {
        label: "Postgraduate Programs",
        href: "/programs/postgraduate",
        description: "Master’s, MBA and professional degrees",
      },
      {
        label: "Online Programs",
        href: "/programs/online",
        description: "Flexible degrees you can study from anywhere",
      },
      {
        label: "Study Abroad",
        href: "/programs/study-abroad",
        description: "International universities and pathways",
      },
    ],
  },
  {
    label: "Top Universities",
    href: "/universities",
    children: [
      {
        label: "Indian Universities",
        href: "/universities/india",
        description: "IITs, NITs, central and private universities",
      },
      {
        label: "International Universities",
        href: "/universities/international",
        description: "USA, UK, Canada, Europe and more",
      },
      {
        label: "Featured Universities",
        href: "/universities/featured",
        description: "Handpicked campuses with strong outcomes",
      },
    ],
  },
 
  {
    label: "About Us",
    href: "/about",
  },
];

export const DRAWER_SECTIONS: { title: string; links: NavLink[] }[] = [
  {
    title: "Browse by stream",
    links: [
      { label: "Engineering", href: "/programs/undergraduate" },
      { label: "Management", href: "/programs/postgraduate" },
      { label: "Medical", href: "/programs/undergraduate" },
      { label: "Law", href: "/programs/undergraduate" },
      { label: "Design & Liberal Arts", href: "/programs/undergraduate" },
      { label: "Online Degrees", href: "/programs/online" },
    ],
  },
  {
    title: "Guidance",
    links: [
      { label: "Compare Universities", href: "/compare" },
      { label: "Course Finder", href: "/tools/course-finder" },
      { label: "College Predictor", href: "/tools/predictor" },
      { label: "Study Abroad", href: "/programs/study-abroad" },
      { label: "Career Tools", href: "/tools/career" },
    ],
  },
];

export const SEARCH_SUGGESTIONS = [
  { label: "MBA / PGDM", href: "/programs/postgraduate" },
  { label: "B.Tech programs", href: "/programs/undergraduate" },
  { label: "Study in the UK", href: "/programs/study-abroad" },
  { label: "Compare universities", href: "/compare" },
  { label: "Online degrees", href: "/programs/online" },
];
