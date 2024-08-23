import {
  ChartPieIcon,
  CircleStackIcon,
  CubeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { ROUTE_LOGIN } from "./routes";

export const navigationGeneral = [
  { name: "Home", href: "/dashboard", icon: ChartPieIcon, current: true },
  {
    name: "Integration",
    href: "/integration",
    icon: UsersIcon,
    current: false,
  },
  { name: "Campaigns", href: "/campaigns", icon: CubeIcon, current: false },
  {
    name: "Personas",
    href: "/personas",
    icon: CircleStackIcon,
    current: false,
  },
  {
    name: "Cadences",
    href: "/cadences",
    icon: CircleStackIcon,
    current: false,
  },
  {
    name: "Leads",
    href: "/leads",
    icon: UsersIcon,
    current: false,
  },
];

export const navigationSupport = [
  { name: "Account", href: "/account", icon: ChartPieIcon, current: false },
  {
    name: "Setting",
    href: "/setting",
    icon: UsersIcon,
    current: false,
  },
];
export const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: ROUTE_LOGIN },
];
