import ComingSoon from "@/components/coming-soon";
import NavTitle from "@/components/Nav/Title";
import { ROUTE_CAMPAIGNS } from "@/data/routes";
import Cadences from "@/views/cadences";
import Link from "next/link";

const defaultCampaign = {
  id: "M909",
  name: "New Campaign",
  creator: "John Doe",
  createdDate: "2024/08/12",
  status: "Active",
  schema: "",
};

export default function Page() {
  const campaign = defaultCampaign;

  return (
    <>
      <NavTitle>
        <Link className="hover:underline" href={ROUTE_CAMPAIGNS}>
          Campaigns
        </Link>
        &nbsp;/&nbsp;
        {campaign.name}
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col">
          <div className="flex-1 flex-center">
            <ComingSoon />
          </div>
        </div>
      </div>
    </>
  );
}
