import {
  ChartPieIcon,
  CircleStackIcon,
  CubeIcon,
  UsersIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  RectangleStackIcon,
  AdjustmentsVerticalIcon,
} from "@heroicons/react/24/outline";

import { ROUTE_ACCOUNT_PROFILE, ROUTE_LOGIN } from "./routes";
import {
  CalendarCheck,
  LucideMonitorSpeaker,
  MailIcon,
  PhoneIcon,
  PhoneIncoming,
  PuzzleIcon,
  UserCircle2,
} from "lucide-react";

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
  { name: "Your profile", href: ROUTE_ACCOUNT_PROFILE },
];

export const navigations = [
  {
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: ChartPieIcon,
        current: true,
      },
    ],
  },
  {
    name: "Data",
    items: [
      {
        name: "Leads",
        href: "/leads",
        icon: UsersIcon,
        current: false,
      },
      {
        name: "Companies",
        href: "/companies",
        icon: BuildingOffice2Icon,
        current: false,
      },
      {
        name: "Personas",
        href: "/personas",
        icon: RectangleStackIcon,
        current: false,
      },
      {
        name: "Integration",
        href: "/integration",
        icon: PuzzleIcon,
        current: false,
      },
    ],
  },
  {
    name: "Engage",
    items: [
      {
        name: "Campaigns",
        href: "/campaigns",
        icon: LucideMonitorSpeaker,
        current: false,
      },
      {
        name: "Cadences",
        href: "/cadences",
        icon: AdjustmentsVerticalIcon,
        current: false,
      },
      {
        name: "Emails",
        href: "/emails",
        icon: MailIcon,
        current: false,
      },
      {
        name: "Calls",
        href: "/calls",
        icon: PhoneIcon,
        current: false,
      },
      {
        name: "Tasks",
        href: "/tasks",
        icon: CalendarCheck,
        current: false,
      },
    ],
  },
  {
    name: "System",
    items: [
      { name: "Account", href: "/account", icon: UserCircle2, current: false },
      {
        name: "Setting",
        href: "/setting",
        icon: Cog6ToothIcon,
        current: false,
      },
    ],
  },
];
