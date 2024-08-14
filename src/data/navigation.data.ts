import {
  CalendarIcon,
  ChartPieIcon,
  CircleStackIcon,
  CubeIcon,
  DocumentDuplicateIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { ROUTE_LOGIN } from "./routes";

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: ChartPieIcon, current: true },
  {
    name: "Integration",
    href: "/integration",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Outreach Tools",
    href: "/outreach-tools",
    icon: WrenchScrewdriverIcon,
    current: false,
  },
  {
    name: "Social Integration",
    href: "/social-integration",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Campaign Builder",
    href: "/campaign-builder",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Campaigns", href: "/campaigns", icon: CubeIcon, current: false },
  {
    name: "Data Management",
    href: "/database",
    icon: CircleStackIcon,
    current: false,
  },
];
export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: ROUTE_LOGIN },
];
