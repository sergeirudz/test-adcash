import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

export const navItems = [
  {
    key: "home",
    title: "Home",
    href: paths.dashboard.overview,
    icon: "house",
  },
  {
    key: "campaigns",
    title: "Campaigns",
    href: paths.dashboard.campaigns,
    icon: "speaker-none",
  },
] satisfies NavItemConfig[];
