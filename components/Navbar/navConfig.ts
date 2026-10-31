import type { ComponentType, SVGProps } from "react";
import {
  AboutIcon,
  HomeIcon,
  ProgramsIcon,
  ToolsIcon,
  UniversitiesIcon,
} from "@/components/icons";
import type { NavItem } from "@/lib/navigation";

export const NAV_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Home: HomeIcon,
  "Explore Programs": ProgramsIcon,
  "Top Universities": UniversitiesIcon,
  Tools: ToolsIcon,
  "About Us": AboutIcon,
};

export const PRIMARY_NAV: NavItem[] = [
  { label: "Colleges", href: "/universities" },
  { label: "Courses", href: "/programs" },
  { label: "Exams", href: "/search?q=Exams" },
  { label: "Admission", href: "/programs" },
  { label: "Scholarships", href: "/search?q=Scholarships" },
  { label: "Guidance", href: "/tools" },
  { label: "Blogs", href: "/blogs" },
  { label: "Resources", href: "/about" },
];
