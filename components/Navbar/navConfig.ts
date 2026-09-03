import type { ComponentType, SVGProps } from "react";
import {
  AboutIcon,
  HomeIcon,
  ProgramsIcon,
  ToolsIcon,
  UniversitiesIcon,
} from "@/components/icons";
import { NAV_ITEMS, type NavItem } from "@/lib/navigation";

export const NAV_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Home: HomeIcon,
  "Explore Programs": ProgramsIcon,
  "Top Universities": UniversitiesIcon,
  Tools: ToolsIcon,
  "About Us": AboutIcon,
};

export const PRIMARY_NAV: NavItem[] = [{ label: "Home", href: "/" }, ...NAV_ITEMS];
