"use client";
import {
  CampaignModel,
  getCampaign,
  updateCampaign,
} from "@/services/campaignService";
import { CAMPAIGN_STAGE } from "@/types/enums";
import { runService } from "@/utils/service_utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [campaign, setCampaign] = useState<CampaignModel>({
    id: "",
    title: "",
    amount: 0,
    description: "",
    status: "",
    star: false,
    isActive: false,
  });

  const fetchCampaign = () => {
    runService(
      id,
      getCampaign,
      (data) => {
        console.log(data);
        setCampaign(data);
      },
      (status, error) => {
        console.log(status, error);
      }
    );
  };

  useEffect(() => {
    fetchCampaign();
  }, []);

  const handleSaveCampaign = () => {
    runService(
      { id, data: campaign },
      updateCampaign,
      (data) => {
        console.log(data);
        toast.success("Successfully saved!");
      },
      (status, error) => {
        console.log(status, error);
      }
    );
  };

  return (
    <>
      <div className="p-4 flex flex-1 bg-gray-100 overflow-auto text-sm">
        <div className="card flex flex-1 justify-center items-center bg-white">
          <div className="p-8 max-w-lg w-full flex flex-col gap-5 rounded-md bg-gray-100">
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="title">
                Title:
              </label>
              <input
                id="title"
                type="text"
                className="input-primary"
                value={campaign.title}
                onChange={(e) =>
                  setCampaign((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            {/* <div className="flex items-center">
              <label className="min-w-24" htmlFor="amount">
                Amount:
              </label>
              <input
                id="amount"
                type="text"
                className="input-primary"
                value={campaign.amount}
                onChange={(e) =>
                  setCampaign((prev) => ({
                    ...prev,
                    amount: parseInt(e.target.value),
                  }))
                }
              />
            </div> */}
            <div className="flex">
              <label className="min-w-24 py-2" htmlFor="desctiption">
                Description:
              </label>
              <textarea
                id="desctiption"
                className="input-primary"
                value={campaign.description}
                onChange={(e) =>
                  setCampaign((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex items-center">
              <label className="min-w-24" htmlFor="status">
                Status:
              </label>
              <select
                className="text-xs flex-1"
                value={campaign.status}
                onChange={(e) =>
                  setCampaign((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value={CAMPAIGN_STAGE.NOT_STARTED}>Not Started</option>
                <option value={CAMPAIGN_STAGE.DISCOVERY}>Discovery</option>
                <option value={CAMPAIGN_STAGE.VALUE_PROPOSITION}>
                  Value Proposition
                </option>
                <option value={CAMPAIGN_STAGE.PROPOSAL}>Proposal</option>
                <option value={CAMPAIGN_STAGE.NEGOTIATING}>Negotiating</option>
                <option value={CAMPAIGN_STAGE.CLOSED_WON}>Closed Won</option>
                <option value={CAMPAIGN_STAGE.CLOSED_LOST}>Closed Lost</option>
                <option value={CAMPAIGN_STAGE.ACCOUNT_PLAN}>
                  Account Plan
                </option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="w-full btn-primary"
                onClick={() => {
                  handleSaveCampaign();
                }}
              >
                Save
              </button>
              <button className="w-full btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
