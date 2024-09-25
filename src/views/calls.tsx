"use client";
import Pagination from "@/components/extends/Pagination/Pagination";
import { useCallFilter } from "@/contexts/FilterCallContext";
import FilterCall from "@/components/Filter/filterCall";
import CallToolbar from "@/sections/calls/CallToolbar";
import CallItem from "@/sections/calls/CallItem";
import { handleError, runService } from "@/utils/service_utils";
import { getCalls, getCallTotalCount, CallModel } from "@/services/callService";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const calls: CallModel[] = [
  {
    id: "1",
    title: "Implement login functionality",
    description: "Create a login page and backend API to authenticate users",
    type: "Feature",
    priority: "High",
    status: "In Progress",
    assignee: "John Doe",
    dueDate: "2024-10-15",
  },
  {
    id: "2",
    title: "Design user profile page",
    description: "Create wireframes and mockups for the user profile page",
    type: "Design",
    priority: "Medium",
    status: "To Do",
    assignee: "Jane Smith",
    dueDate: "2024-10-20",
  },
  {
    id: "3",
    title: "Optimize database queries",
    description: "Identify and optimize slow database queries",
    type: "Optimization",
    priority: "High",
    status: "In Progress",
    assignee: "Bob Johnson",
    dueDate: "2024-10-25",
  },
  {
    id: "4",
    title: "Implement search functionality",
    description: "Allow users to search for products and content",
    type: "Feature",
    priority: "Medium",
    status: "To Do",
    assignee: "Alice Williams",
    dueDate: "2024-11-01",
  },
  {
    id: "5",
    title: "Fix mobile responsiveness",
    description: "Ensure the website is mobile-friendly across all pages",
    type: "Bug Fix",
    priority: "High",
    status: "In Progress",
    assignee: "Tom Davis",
    dueDate: "2024-11-05",
  },
  {
    id: "6",
    title: "Implement shopping cart",
    description: "Allow users to add products to a shopping cart",
    type: "Feature",
    priority: "High",
    status: "To Do",
    assignee: "Sarah Lee",
    dueDate: "2024-11-10",
  },
  {
    id: "7",
    title: "Improve error handling",
    description:
      "Enhance error handling and display more user-friendly error messages",
    type: "Improvement",
    priority: "Medium",
    status: "In Progress",
    assignee: "Michael Chen",
    dueDate: "2024-11-15",
  },
  {
    id: "8",
    title: "Implement call notifications",
    description:
      "Send call notifications to users for order confirmations and updates",
    type: "Feature",
    priority: "Low",
    status: "To Do",
    assignee: "Emily Park",
    dueDate: "2024-11-20",
  },
  {
    id: "9",
    title: "Optimize images for faster loading",
    description:
      "Compress and optimize images to improve website loading speed",
    type: "Optimization",
    priority: "High",
    status: "In Progress",
    assignee: "David Kim",
    dueDate: "2024-11-25",
  },
  {
    id: "10",
    title: "Implement user reviews",
    description: "Allow users to write reviews for products",
    type: "Feature",
    priority: "Medium",
    status: "To Do",
    assignee: "Jessica Patel",
    dueDate: "2024-12-01",
  },
  {
    id: "11",
    title: "Fix checkout process bugs",
    description: "Identify and fix any bugs in the checkout process",
    type: "Bug Fix",
    priority: "High",
    status: "In Progress",
    assignee: "Daniel Gonzalez",
    dueDate: "2024-12-05",
  },
  {
    id: "12",
    title: "Implement social media sharing",
    description: "Allow users to share products on social media platforms",
    type: "Feature",
    priority: "Low",
    status: "To Do",
    assignee: "Olivia Hernandez",
    dueDate: "2024-12-10",
  },
  {
    id: "13",
    title: "Optimize server performance",
    description: "Identify and optimize slow server processes",
    type: "Optimization",
    priority: "High",
    status: "In Progress",
    assignee: "Ethan Ramirez",
    dueDate: "2024-12-15",
  },
  {
    id: "14",
    title: "Implement user wishlists",
    description: "Allow users to create and manage wishlists",
    type: "Feature",
    priority: "Medium",
    status: "To Do",
    assignee: "Isabella Morales",
    dueDate: "2024-12-20",
  },
  {
    id: "15",
    title: "Fix broken links",
    description: "Identify and fix any broken links on the website",
    type: "Bug Fix",
    priority: "High",
    status: "In Progress",
    assignee: "Jacob Flores",
    dueDate: "2024-12-25",
  },
  {
    id: "16",
    title: "Implement user referral program",
    description:
      "Create a user referral program to incentivize new user signups",
    type: "Feature",
    priority: "Medium",
    status: "To Do",
    assignee: "Sophia Reyes",
    dueDate: "2025-01-01",
  },
  {
    id: "17",
    title: "Optimize search engine rankings",
    description:
      "Implement SEO best practices to improve search engine rankings",
    type: "Optimization",
    priority: "High",
    status: "In Progress",
    assignee: "William Castillo",
    dueDate: "2025-01-05",
  },
  {
    id: "18",
    title: "Implement user feedback system",
    description: "Allow users to provide feedback and suggestions",
    type: "Feature",
    priority: "Low",
    status: "To Do",
    assignee: "Mia Diaz",
    dueDate: "2025-01-10",
  },
  {
    id: "19",
    title: "Fix accessibility issues",
    description: "Ensure the website is accessible to users with disabilities",
    type: "Bug Fix",
    priority: "High",
    status: "In Progress",
    assignee: "Alexander Rojas",
    dueDate: "2025-01-15",
  },
  {
    id: "20",
    title: "Implement user loyalty program",
    description: "Create a user loyalty program to reward frequent customers",
    type: "Feature",
    priority: "Medium",
    status: "To Do",
    assignee: "Emma Vargas",
    dueDate: "2025-01-20",
  },
];

export default function Calls(
  { campaignId, cadenceId }: { campaignId?: string; cadenceId?: string } = {
    cadenceId: "",
    campaignId: "",
  }
) {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { callFilterConfig, setCallFilterConfig } = useCallFilter();
  // const [calls, setCalls] = useState<CallModel[]>([]);
  const currentParams = Object.fromEntries(useSearchParams());

  // const fetchCalls = (params: { [key: string]: string }) => {
  //   runService(
  //     {
  //       offset: 0,
  //       limit: 100,
  //       campaignId: campaignId,
  //       cadenceId: cadenceId,
  //       fromUser: callFilterConfig.fromUser,
  //       search: callFilterConfig.search,
  //       params,
  //     },
  //     getCalls,
  //     (data) => {
  //       setCalls(data);
  //     },
  //     (status, error) => {
  //       handleError(status, error);
  //       console.log(status, error);
  //     }
  //   );
  // };

  // const fetchCallTotalCount = (params: { [key: string]: string }) => {
  //   runService(
  //     {
  //       campaignId: campaignId,
  //       cadenceId: cadenceId,
  //       fromUser: callFilterConfig.fromUser,
  //       search: callFilterConfig.search,
  //       params,
  //     },
  //     getCallTotalCount,
  //     (data) => {
  //       console.log("Call total", data);
  //       setTotalCount(data?.count ? data?.count : 0);
  //     },
  //     (status, error) => {
  //       handleError(status, error);
  //       console.log(status, error);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   fetchCallTotalCount(currentParams);
  //   fetchCalls(currentParams);
  // }, []);

  // useEffect(() => {
  //   fetchCallTotalCount(currentParams);
  //   fetchCalls(currentParams);
  // }, [callFilterConfig, currentPage, pageSize]);

  return (
    <div className="flex gap-2 flex-1 overflow-auto">
      {callFilterConfig.isOpen && <FilterCall />}
      <div className="card flex-1 flex flex-col overflow-auto">
        <div className="px-6 overflow-auto">
          <CallToolbar />
        </div>

        {/* Table */}
        <div className="flex flex-1 flex-col w-full py-2 align-middle sm:px-4 lg:px-6 overflow-auto">
          <div className="w-full h-full border rounded-md overflow-auto">
            {calls.length > 0 ? (
              calls.map((call: CallModel) => (
                <CallItem key={call.id} call={call} />
              ))
            ) : (
              <div className="h-full flex flex-1 justify-center items-center">
                <p>No calls</p>
              </div>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-end">
          <Pagination
            className="pagination-bar"
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(pageSize: number, currentPage: number) => {
              setPageSize(pageSize);
              setCurrentPage(currentPage);
            }}
          />
        </div>
      </div>
    </div>
  );
}
