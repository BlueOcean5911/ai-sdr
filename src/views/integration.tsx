"use client";

import IntegrationFilter from "@/sections/integration/IntegrationFilter";
import ToolCard from "@/sections/integration/ToolCard";
import { classNames } from "@/utils";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import HubspotIcon from "@/components/Icons/hubspot.icon";
import SalesforceIcon from "@/components/Icons/salesforce.icon";
import ExcelIcon from "@/components/Icons/excel.icon";

import { useRouter } from "next/navigation";
import {
  ROUTE_INTEGRATION_EXCEL,
  ROUTE_INTEGRATION_HUBSPOT,
} from "@/data/routes";
import OutreachIcon from "@/components/Icons/outreach.icon";
import SalesloftIcon from "@/components/Icons/salesloft.icon";
import ConquorIcon from "@/components/Icons/conquor.icon";
import { handleError, runService } from "@/utils/service_utils";
import { checkIfConnectionExists } from "@/services/integrationService";

const displayType = "grid"; // You can switch to "flex" if needed

export default function Integration() {
  const router = useRouter();

  const handleHubspotConnection = () => {
    runService(
      {},
      checkIfConnectionExists,
      (data) => {
        console.log("data", data);
        if (data.success == true) {
          router.push(ROUTE_INTEGRATION_HUBSPOT);
        } else {
          window.open(process.env.NEXT_PUBLIC_HUSPOT_OAUTH_URL);
        }
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };

  const toolCards = [
    {
      icon: <HubspotIcon className="w-12 h-12 m-2" aria-label="Hubspot" />,
      title: "Hubspot",
      description:
        "HubSpot's free CRM powers your customer support, sales, and marketing with easy-to-use features like live chat, meeting scheduling, and email tracking.",
      integrationBtn: "Connect",
      onClick: () => {
        handleHubspotConnection();
      },
    },
    {
      icon: (
        <SalesforceIcon className="w-12 h-12 m-2" aria-label="Salesforce" />
      ),
      title: "Salesforce",
      description:
        "Salesforce offers a wide variety of CRM categories and systems to meet your needs, including Sales Cloud.",
      integrationBtn: "Connect",
      onClick: () => router.push("#"),
    },
    {
      icon: (
        <ExcelIcon className="w-12 h-12 m-2" aria-label="Microsoft Excel" />
      ),
      title: "Microsoft Excel",
      description:
        "Excel learns your patterns, organizing your data to save you time.",
      integrationBtn: "Upload",
      onClick: () => router.push(ROUTE_INTEGRATION_EXCEL),
    },
    {
      icon: <OutreachIcon className="w-48 h-12 m-2" aria-label="Outreach" />,
      title: "Outreach",
      description:
        "Discover Outreach, the sales execution platform. Elevate your sales strategy, engage customers better, and drive results.",
      integrationBtn: "Connect",
      onClick: () => router.push("#"),
    },
    {
      icon: <SalesloftIcon className="w-48 h-12 m-2" aria-label="Salesloft" />,
      title: "Salesloft",
      description:
        "Salesloft helps thousands of the world's most successful selling teams drive more revenue with the Modern Revenue Platform",
      integrationBtn: "Connect",
      onClick: () => router.push("#"),
    },
    {
      icon: <ConquorIcon className="w-48 h-12 m-2" aria-label="Conquer" />,
      title: "Conquer",
      description:
        "Conquer is a Sales Engagement Platform that is native to Salesforce, making selling smarter by connecting you to buyers faster, where they want to talk.",
      integrationBtn: "Connect",
      onClick: () => router.push("#"),
    },
  ];

  return (
    <div className="p-4 min-h-full flex flex-col flex-1 gap-y-4">
      <h2 className="text-gray-500">
        Select and connect tools you use to integrate with your workflow
      </h2>
      {/* <IntegrationFilter /> */}
      <div
        className={classNames(
          displayType,
          "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        )}
      >
        {toolCards.map((card, id) => (
          <ToolCard
            key={id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            buttonName={card.integrationBtn}
            onClick={card.onClick}
          />
        ))}
      </div>
      <div className="flex-1" />
      <div className="text-center my-auto gap-2">
        <p>
          Read our <span className="underline">Terms and Conditions</span>
          <AcademicCapIcon className="w-4 h-4 inline-block" />
        </p>
      </div>
    </div>
  );
}
