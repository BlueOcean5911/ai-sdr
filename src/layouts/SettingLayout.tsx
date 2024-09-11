"use client";
import Logo from "@/components/extends/Logo";

import { useState } from "react";

import {
  ROUTE_SETTING_APPEARANCE,
  ROUTE_SETTING_BUSINESS,
  ROUTE_SETTING_DISCOUNT,
  ROUTE_SETTING_EMAIL,
  ROUTE_SETTING_NOTIFICATION,
  ROUTE_SETTING_SECURITY,
} from "@/data/routes";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowRightIcon,
  Bars3CenterLeftIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { navigationGeneral } from "@/data/navigation.data";
import Link from "next/link";
import { classNames } from "@/utils";
import ToggleButton from "@/components/extends/Button/ToggleButton";

const settingLayoutItems = [
  {
    title: "Appearance",
    icon: ({ ...others }: { [key: string]: any }) => (
      <CircleStackIcon {...others} />
    ),
    href: ROUTE_SETTING_APPEARANCE,
    description: "Dark Mode, Light Mode, more",
  },
  {
    title: "Security",
    icon: ({ ...others }: { [key: string]: any }) => (
      <CircleStackIcon {...others} />
    ),
    href: ROUTE_SETTING_SECURITY,
    description: "Dark Mode, Light Mode, more",
  },
  {
    title: "Notification",
    icon: ({ ...others }: { [key: string]: any }) => (
      <CircleStackIcon {...others} />
    ),
    href: ROUTE_SETTING_NOTIFICATION,
    description: "Dark Mode, Light Mode, more",
  },
  {
    title: "E-mail",
    icon: ({ ...others }: { [key: string]: any }) => (
      <CircleStackIcon {...others} />
    ),
    href: ROUTE_SETTING_EMAIL,
    description: "Dark Mode, Light Mode, more",
  },
  {
    title: "Business",
    icon: ({ ...others }: { [key: string]: any }) => (
      <CircleStackIcon {...others} />
    ),
    href: ROUTE_SETTING_BUSINESS,
    description: "Dark Mode, Light Mode, more",
  },
  {
    title: "Discount",
    icon: ({ ...others }: { [key: string]: any }) => (
      <CircleStackIcon {...others} />
    ),
    href: ROUTE_SETTING_DISCOUNT,
    description: "Dark Mode, Light Mode, more",
  },
];

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex-1 flex gap-4 relative">
        <div className="lg:flex w-[360px] min-h-full flex-col gap-4">
          <div className="card bg-blue-900 flex-center justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex-center gap-2">
                <div className="w-8 h-8 flex-center bg-white rounded-md">
                  <CircleStackIcon className="w-6 h-6 stroke-blue-900" />
                </div>
                <p className="text-white">Your Plan</p>
              </div>
              <h2 className="text-white font-bold">Premium</h2>
            </div>
            <div className="btn-primary px-4 py-1 border-2 border-white cursor-pointer text-sm rounded-md text-white">
              Stop Subscribe
            </div>
          </div>
          <div className="flex-1 border-2 border-gray-150 p-2 rounded-lg">
            {settingLayoutItems.map((item) => (
              <div
                key={item.title}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-md flex items-center gap-4 "
              >
                <item.icon className="w-6 h-6" />
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-gray-150">{item.description}</p>
                </div>
                <div className="flex-center flex-1 justify-end">
                  <ArrowRightIcon className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 border-2 border-gray-100 card">
          <div className="px-2 py-8">
            <h2>Notification Settings</h2>
            <p className="text-gray-150">
              Lorem ipsum dolor sit amet consectetur. Hac amet nisi sem
              imperdiet nulla.
            </p>
            <div className="border-b-2 border-gray-100 h-1 my-2"></div>
            <div className="flex flex-col gap-4 m-auto max-w-[800px]">
              <div className="setting-group">
                <h3>Email Notifications</h3>
                <p className="text-gray-150">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <div className="flex flex-col gap-2 justify-end items-end p-2">
                  <div className="max-w-[400px] flex gap-4  border-b-2 pb-2">
                    <div className="pt-2">
                      <ToggleButton checked={true} handleChange={() => {}} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>News & Update</h3>
                      <p className="text-gray-150">
                        Lorem ipsum dolor sit amet consectetur.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="max-w-[400px] flex gap-4  border-b-2 pb-2">
                    <div className="pt-2">
                      <ToggleButton checked={true} handleChange={() => {}} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>Tips</h3>
                      <p className="text-gray-150">
                        Lorem ipsum dolor sit amet consectetur.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="max-w-[400px] flex gap-4  border-b-2 pb-2">
                    <div className="pt-2">
                      <ToggleButton checked={true} handleChange={() => {}} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>Message</h3>
                      <p className="text-gray-150">
                        Lorem ipsum dolor sit amet consectetur.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="max-w-[400px] flex gap-4  border-b-2 pb-2">
                    <div className="pt-2">
                      <ToggleButton checked={true} handleChange={() => {}} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>Other</h3>
                      <p className="text-gray-150">
                        Lorem ipsum dolor sit amet consectetur.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="setting-group">
                <h3>Email Notifications</h3>
                <p className="text-gray-150">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <div className="flex flex-col gap-2 justify-end items-end p-2">
                  <div className="max-w-[400px] flex gap-4  border-b-2 pb-2">
                    <div className="pt-2">
                      <ToggleButton checked={true} handleChange={() => {}} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>Comments</h3>
                      <p className="text-gray-150">
                        Lorem ipsum dolor sit amet consectetur.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingLayout;
