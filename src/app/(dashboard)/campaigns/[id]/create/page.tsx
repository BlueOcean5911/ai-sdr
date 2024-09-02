"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import NavTitle from "@/components/DashboardLayout/Nav/Title";
import { ROUTE_CAMPAIGNS, ROUTE_CATENCES, ROUTE_PERSONAS } from "@/data/routes";
import Cadences from "@/views/cadences";
import ComingSoon from "@/components/coming-soon";
import ComboBox from "@/components/extends/combobox";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PersonasTable, defaultPersonas } from "@/views/personas";
import ManagePersona from "@/sections/persona/manage-persona";
import SelectPersona from "@/sections/persona/select-persona";
import { classNames } from "@/utils";
import { useRouter } from "next/navigation";

const defaultCampaign = {
  id: "M909",
  name: "New Campaign",
  creator: "John Doe",
  createdDate: "2024/08/12",
  status: "Active",
  schema: "",
};

const cadences: any = [
  { id: 1, name: "Cadence 1" },
  { id: 2, name: "Cadence 2" },
  { id: 3, name: "Cadence 3" },
  { id: 4, name: "Cadence 4" },
  { id: 5, name: "Cadence 5" },
];
const totalStep = 2;
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [campaign, setCampaign] = useState(defaultCampaign);
  const [personas, setPersonas] = useState();

  const [step, setStep] = useState(1);

  useEffect(() => {
    console.log(step);
  }, [step]);

  const handleStepChange = (offset: number) => {
    if (step + offset > totalStep) {
      finishBuildingCampaign();
    } else if (step + offset < 1) {
      return;
    }
    setStep(step + offset);
  };

  const isFinalStep = () => {
    return step >= totalStep;
  };

  const finishBuildingCampaign = () => {
    router.push(ROUTE_CAMPAIGNS);
  };

  const isFirstStep = () => {
    return step <= 1;
  };

  return (
    <>
      <NavTitle>
        <Link className="hover:underline" href={ROUTE_CAMPAIGNS}>
          Campaigns
        </Link>
        &nbsp;/&nbsp;
        {campaign.name}
        &nbsp;/&nbsp; Create
      </NavTitle>
      <div className="relative py-10 px-8 flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full overflow-auto flex flex-col bg-gray-100">
          {step === 1 && (
            <>
              <div className="p-4 px-16 flex flex-col gap-4">
                <h2>Step 1: Align your target personas</h2>
                <p>Add your personas info</p>
                <div className=" flex gap-4">
                  <ManagePersona type="create" persona={null}>
                    <div className="btn-primary p-2">
                      <div className="flex items-center gap-2">
                        <PlusIcon className="w-4 h-4 stroke-white" />
                        Create New
                      </div>
                    </div>
                  </ManagePersona>
                  <SelectPersona>
                    <div className="btn-primary p-2">
                      <div className="flex items-center gap-2">
                        <PlusIcon className="w-4 h-4 stroke-white" />
                        Choose Existing Personas
                      </div>
                    </div>
                  </SelectPersona>
                </div>
              </div>
              <div className="card flex-1">
                <PersonasTable data={personas} />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="p-4 px-16 flex flex-col gap-4">
                <h2>Step 2 : Align your target personas</h2>
                <p>Add your configuration for campaign</p>
              </div>
              <div className="p-4 mx-auto w-3/6 flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-2 ">
                  <label>
                    <h3>Campaign Name</h3>
                  </label>
                  <input type="text" className="input-primary w-full" />
                </div>
                <div className="flex flex-col gap-2 ">
                  <label>
                    <h3>Select your goal</h3>
                  </label>
                  <input type="text" className="input-primary w-full" />
                </div>
              </div>
            </>
          )}
          <div className="p-4 flex justify-between px-24">
            <div
              className={classNames(
                "btn-primary p-2",
                isFirstStep()
                  ? "opacity-50 transition-none cursor-not-allowed "
                  : ""
              )}
              onClick={() => handleStepChange(-1)}
            >
              <div
                className={
                  "flex items-center gap-2 disabled:cursor-none disabled:opacity-50"
                }
              >
                Back
              </div>
            </div>
            <div
              className="btn-primary p-2"
              onClick={() => handleStepChange(1)}
            >
              <div
                className={classNames(
                  isFinalStep() ? "disabled" : "",
                  "flex items-center gap-2"
                )}
              >
                {isFinalStep() ? "Finish" : "Next"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
