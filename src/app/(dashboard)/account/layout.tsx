"use client";
import TapItem from "@/components/extends/Tap/TapItem";
import { User, Shield, Users, Building2, Crown, Inbox } from "lucide-react";
import {
  ROUTE_ACCOUNT_UPGRADE_PLAN,
  ROUTE_ACCOUNT_COMPANY_DATA,
  ROUTE_ACCOUNT_PROFILE,
  ROUTE_ACCOUNT_SECURITY,
  ROUTE_ACCOUNT_USERS,
  ROUTE_ACCOUNT_INBOX,
} from "@/data/routes";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const routes = [
    {
      key: "profile",
      content: "Profile",
      link: ROUTE_ACCOUNT_PROFILE,
      icon: <User className="w-4 h-4" />,
    },
    {
      key: "security",
      content: "Security",
      link: ROUTE_ACCOUNT_SECURITY,
      icon: <Shield className="w-4 h-4" />,
    },
    {
      key: "users",
      content: "Users",
      link: ROUTE_ACCOUNT_USERS,
      icon: <Users className="w-4 h-4" />,
    },
    {
      key: "company-data",
      content: "Company Data",
      link: ROUTE_ACCOUNT_COMPANY_DATA,
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      key: "upgrade-plan",
      content: "Upgrade Plan",
      link: ROUTE_ACCOUNT_UPGRADE_PLAN,
      icon: <Crown className="w-4 h-4" />,
    },
    {
      key: "inbox",
      content: "Inbox",
      link: ROUTE_ACCOUNT_INBOX,
      icon: <Inbox className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <div className="w-full px-5 pt-2 flex items-center">
        <Link href={ROUTE_ACCOUNT_PROFILE}>
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Account
          </button>
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        {routes.map(
          (route) =>
            path === route.link && (
              <Link key={route.key} href={route.link}>
                <button className="p-1 text-sm rounded-md hover:bg-gray-100">
                  {route.content}
                </button>
              </Link>
            )
        )}
      </div>
      <div className="w-full h-8 px-5 flex items-center space-x-4 border-b border-gray-200 bg-white shadow-sm">
        {routes.map((route) => (
          <TapItem
            key={route.key}
            content={route.content}
            link={route.link}
            icon={route.icon}
            active={path === route.link}
          />
        ))}
      </div>
      {children}
    </>
  );
};

export default Layout;
