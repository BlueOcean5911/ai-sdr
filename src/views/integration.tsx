import IntegrationFilter from "@/sections/integration/IntegrationFilter";
import ToolCard from "@/sections/integration/ToolCard";
import { classNames } from "@/utils";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

const displayType = "grid";
// const displayType = "flex";

export default function Integration() {
  return (
    <div className="p-4 min-h-full flex flex-col flex-1 gap-y-4">
      <h2 className="text-gray-500">
        Select and connect tools you use to integrate with your workflow
      </h2>
      <IntegrationFilter />
      <div
        className={classNames(
          displayType,
          "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 flex-wrap"
        )}
      >
        <ToolCard
          icon={}
          title="Hubspot"
          description="HubSpot's free CRM powers your customer support, sales, and marketing with easy-to-use features like live chat, meeting scheduling, and email tracking."
        />
        <ToolCard
          title="Salesforce"
          description="Salesforce offers a wide variety of CRM categories and systems to meet your needs, including Sales Cloud,"
        />
        <ToolCard
          title="Mailchimp"
          description="Mailchimp makes it easy to sell stuff online, even if you don't have an e-commerce store."
        />
      </div>
      <div className="flex-1" />
      <div className="text-center flex-1 my-auto gap-2">
        <p>
          Read our <span className="underline">teams and Conditions</span>
          <AcademicCapIcon className="w-4 h-4 inline-block" />
        </p>
      </div>
    </div>
  );
}
