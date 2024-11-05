"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useBeforeUnload from "@/utils/useBeforeUnload";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";

import {
  Bars3Icon,
  ChevronDoubleRightIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import Logo from "@/components/extends/Logo";
import Logo2 from "@/components/extends/Logo2";

import { classNames } from "@/utils";

import { userNavigation } from "@/data/navigation.data";
import Link from "next/link";
import HeaderAlert from "@/components/DashboardLayout/Alert/header-alert";
import { navigations } from "@/data/navigation.data";
import { signOut } from "@/services/authService";
import { getMe } from "@/services/userService";
import { handleError, runService } from "@/utils/service_utils";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarPined, setSidebarPined] = useState(true);
  const [sidebarShow, setSidebarShow] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const pathname = usePathname();
  const section =
    pathname.split("/").length > 1 ? "/" + pathname.split("/").at(1) : "/";

  // useBeforeUnload();

  const handleMouseEnter = () => {
    setSidebarShow(true);
  };

  const handleMouseLeave = () => {
    setSidebarShow(false);
  };

  const [user, setUser] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        await runService(
          undefined,
          getMe,
          (data: any) => {
            setUser(data);
          },
          (status: number | undefined, error: any) => {
            handleError(status, error);
          }
        );
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-1 overflow-auto">
        <Dialog
          open={showPopup}
          onClose={setShowPopup}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className="-m-2.5 p-2.5 bg-transparent"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="md:flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex-center h-16 mt-4 shrink-0 gap-4 pr-12">
                  <Logo />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-3">
                    {navigations.map((group, index) => (
                      <li key={index}>
                        <div className="text-gray-150 py-2">{group?.name}</div>
                        <ul role="list" className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item.name} className="nav">
                              <Link
                                href={item.href}
                                className={classNames(
                                  section === item.href
                                    ? "bg-blue-900 text-white"
                                    : "bg-white text-gray-900 hover:bg-blue-200",
                                  "group flex gap-x-3 rounded-md p-2 font-semibold leading-5"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={classNames(
                                    section === item.href
                                      ? "stroke-white"
                                      : "text-blue-100 ",
                                    "h-5 w-5 shrink-0"
                                  )}
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                    <li className="mt-auto">
                      <Link
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-5 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Collapsed sidebar for desktop with only icon */}
        <div
          className={`hidden md:flex w-0 flex-col ${
            sidebarPined ? "" : "md:w-14"
          }`}
          onMouseEnter={handleMouseEnter}
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 bg-white px-3 pb-4">
            <div className="flex-center h-16 mt-4">
              <Logo2 />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-4">
                {navigations.map((group, index) => (
                  <li key={index} className="flex flex-col gap-y-4">
                    <hr />
                    <ul role="list" className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item.name} className="nav">
                          <Link
                            href={item.href}
                            className={classNames(
                              section === item.href
                                ? "bg-blue-900 text-white"
                                : "bg-white text-gray-900 hover:bg-blue-200",
                              "group flex rounded-md p-1.5 font-semibold leading-5"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                section === item.href
                                  ? "stroke-white"
                                  : "text-blue-100 ",
                                "h-5 w-5 shrink-0"
                              )}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Static sidebar for desktop with full content and icon */}
        <div
          className={classNames(
            "flex w-0 flex-col transition-all duration-500",
            sidebarPined ? "md:w-60" : "",
            !sidebarPined && sidebarShow
              ? "fixed left-0 top-0 bottom-0 z-50 md:w-60"
              : "",
            !sidebarPined && !sidebarShow
              ? "fixed -left-60 top-0 bottom-0 z-50"
              : ""
          )}
          onMouseLeave={handleMouseLeave}
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="hidden md:flex grow flex-col gap-y-2 overflow-y-auto border-r border-gray-200 bg-white px-3 pb-4">
            <div className="flex justify-between h-16 mt-4">
              <Logo />
              <button
                className="p-2 h-10 my-auto *:align-middle rounded-md hover:bg-slate-300"
                onClick={() => setSidebarPined(!sidebarPined)}
              >
                <ChevronDoubleRightIcon
                  className={classNames(
                    "w-4 h-4 transition-transform duration-100",
                    sidebarPined ? "transform rotate-z-180" : ""
                  )}
                />
              </button>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-3">
                {navigations.map((group, index) => (
                  <li key={index}>
                    <div className="text-gray-150 py-2">{group?.name}</div>
                    <ul role="list" className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item.name} className="nav">
                          <Link
                            href={item.href}
                            className={classNames(
                              section === item.href
                                ? "bg-blue-900 text-white"
                                : "bg-white text-gray-900 hover:bg-blue-200",
                              "group flex gap-x-3 rounded-md p-2 font-semibold leading-5"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                section === item.href
                                  ? "stroke-white"
                                  : "text-blue-100 ",
                                "h-5 w-5 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col flex-1 h-dvh overflow-auto">
          <div className="flex h-12 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white shadow-sm px-6">
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              className="-m-2.5 p-2.5 text-gray-700 md:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 md:hidden"
            />

            <div className="flex flex-1 justify-end gap-x-4 lg:gap-x-6">
              <form action="#" method="GET" className="relative hidden md:flex">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                />
                <input
                  id="search-field"
                  name="search"
                  type="search"
                  placeholder="Search..."
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <HeaderAlert />
                {/* <ThemeToggle /> */}

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="w-6 h-6" />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold leading-5 text-gray-900"
                      >
                        {user?.firstName} {user?.lastName}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-3 py-1 text-sm leading-5 text-gray-900 data-[focus]:bg-blue-200"
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                    <MenuItem key="logout">
                      <div
                        className="cursor-pointer block px-3 py-1 text-sm leading-5 text-gray-900 data-[focus]:bg-blue-200"
                        onClick={signOut}
                      >
                        Sign out
                      </div>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </>
  );
}
