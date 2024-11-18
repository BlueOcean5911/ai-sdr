"use client";
import TapItem from "@/components/extends/Tap/TapItem";
import {
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
  return (
    <>
      <div className="w-full px-5 pt-2 flex items-center">
        <Link href={ROUTE_ACCOUNT_PROFILE}>
          <button className="p-1 text-sm rounded-md hover:bg-gray-100">
            Account
          </button>
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        {path === ROUTE_ACCOUNT_SECURITY && (
          <Link href={ROUTE_ACCOUNT_SECURITY}>
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              Security
            </button>
          </Link>
        )}
        {path === ROUTE_ACCOUNT_USERS && (
          <Link href={ROUTE_ACCOUNT_USERS}>
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              Users
            </button>
          </Link>
        )}
        {path === ROUTE_ACCOUNT_COMPANY_DATA && (
          <Link href={ROUTE_ACCOUNT_COMPANY_DATA}>
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              Company Data
            </button>
          </Link>
        )}
        {path === ROUTE_ACCOUNT_PROFILE && (
          <Link href={ROUTE_ACCOUNT_PROFILE}>
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              Profile
            </button>
          </Link>
        )}
      </div>
      <div className="w-full h-8 px-5 flex items-center gap-2">
        <TapItem
          key="profile"
          content="Profile"
          link={ROUTE_ACCOUNT_PROFILE}
          active={path === ROUTE_ACCOUNT_PROFILE}
        />
        <TapItem
          key="security"
          content="Security"
          link={ROUTE_ACCOUNT_SECURITY}
          active={path === ROUTE_ACCOUNT_SECURITY}
        />
        <TapItem
          key="users"
          content="Users"
          link={ROUTE_ACCOUNT_USERS}
          active={path === ROUTE_ACCOUNT_USERS}
        />
        <TapItem
          key="company-data"
          content="Company Data"
          link={ROUTE_ACCOUNT_COMPANY_DATA}
          active={path === ROUTE_ACCOUNT_COMPANY_DATA}
        />
        <TapItem
          key="inbox"
          content="Inbox"
          link={ROUTE_ACCOUNT_INBOX}
          active={path.startsWith(ROUTE_ACCOUNT_INBOX)}
        />
      </div>
      {children}
    </>
  );
};

export default Layout;
