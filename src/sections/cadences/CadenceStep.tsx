import React, { useState } from "react";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { CadenceStepModel } from "@/services/cadenceStepService";
import { getFormettedInterval } from "@/utils/format";
import EditStep from "./EditStep";
import { CADENCE_STEP_TYPE } from "@/types/enums";
import PhoneCallIcon from "@/components/Icons/phonecall.icon";
import ActionItemIcon from "@/components/Icons/actionitem.icon";
import AutomaticEmailIcon from "@/components/Icons/automaticemail.icon";
import ManualEmailIcon from "@/components/Icons/manualmail.icon";

export default function CadenceStep({
  order,
  total,
  cadenceStep,
  handleTemplateOpen,
  handleDelete,
  handleUpdate,
  handleMove,
}: {
  order: number;
  total: number;
  cadenceStep: CadenceStepModel;
  handleTemplateOpen: (id: string | undefined) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (data: CadenceStepModel) => void;
  handleMove: (id: string, value: number) => void;
}) {
  const router = useRouter();
  const [isOpenUpdateView, setIsOpenUpdateView] = useState(false);

  return (
    <div className="w-full h-min-40 flex flex-col bg-white rounded-md shadow-md">
      <div className="w-full h-12 flex text-nowrap">
        <div className="w-12 flex justify-center items-center border-r">
          <span className="px-2 text-xl">{order}</span>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <div className="w-50 px-4 flex justify-between items-center gap-4">
            <div className="w-8 h-8 bg-slate-100 flex justify-center items-center rounded-full">
              <EnvelopeIcon className="w-4 h-4" />
              {cadenceStep.stepType === CADENCE_STEP_TYPE.AUTO_EMAIL && (
                <AutomaticEmailIcon />
              )}
              {cadenceStep.stepType === CADENCE_STEP_TYPE.MANUAL_EMAIL && (
                <ManualEmailIcon />
              )}
              {cadenceStep.stepType === CADENCE_STEP_TYPE.PHONE_CALL && (
                <PhoneCallIcon />
              )}
              {cadenceStep.stepType === CADENCE_STEP_TYPE.ACTION_ITEM && (
                <ActionItemIcon />
              )}
            </div>
            <span className="font-semibold">{cadenceStep.name}</span>
          </div>
        </div>
        <div className="flex px-2 gap-2 justify-end items-center">
          <div className="justify-end text-xs">
            {getFormettedInterval(cadenceStep.interval)}
          </div>
          <Menu>
            <MenuButton className="">
              <div className="p-1 border rounded-md">
                <EllipsisHorizontalIcon className="w-5 h-5 stroke-gray-500" />
              </div>
            </MenuButton>
            <MenuItems
              anchor="bottom end"
              className="flex flex-col w-24 origin-top bg-white rounded-md shadow-md border border-white/5 text-gray-900 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-20"
            >
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => setIsOpenUpdateView(true)}
                >
                  Edit
                </button>
              </MenuItem>
              {order !== 1 && (
                <MenuItem>
                  <button
                    className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                    onClick={() => handleMove(cadenceStep.id, -1)}
                  >
                    Move Up
                  </button>
                </MenuItem>
              )}
              {order !== total && (
                <MenuItem>
                  <button
                    className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                    onClick={() => handleMove(cadenceStep.id, 1)}
                  >
                    Move Down
                  </button>
                </MenuItem>
              )}
              <MenuItem>
                <button
                  className="p-2 text-xs flex w-full items-center rounded-lg data-[focus]:bg-blue-100"
                  onClick={() => handleDelete(cadenceStep.id)}
                >
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
          <button>
            <Bars2Icon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="w-full min-h-20 px-4 py-1.5 flex border-y hover:bg-gray-100 cursor-pointer">
        <div className="flex flex-1 px-2 items-center overflow-auto">
          <div className="min-w-10 flex justify-center">
            <ToggleButton checked={true} handleChange={() => {}} />
          </div>
          {/* <div className="min-w-40 px-4 flex">New Thread</div> */}
          {cadenceStep.stepType === CADENCE_STEP_TYPE.AUTO_EMAIL && (
            <div
              className="h-full min-w-60 px-4 flex flex-1 flex-col gap-1"
              onClick={() => handleTemplateOpen(cadenceStep.templateId)}
            >
              <div className="text-base font-semibold">
                {cadenceStep.template?.subject}
              </div>
              <div className="text-sm line-clamp-2">
                {cadenceStep.template?.bodyText}
              </div>
            </div>
          )}
          {cadenceStep.stepType !== CADENCE_STEP_TYPE.AUTO_EMAIL && (
            <div className="h-full min-w-60 px-4 flex flex-1 items-center gap-1">
              <div className="text-sm line-clamp-2">{cadenceStep.taskNote}</div>
            </div>
          )}
          {cadenceStep.stepType === CADENCE_STEP_TYPE.AUTO_EMAIL && (
            <div className="flex min-w-48 flex-wrap items-center">
              <div className="flex flex-col w-min-15 px-1 text-xs">
                <span>{cadenceStep.statistics.scheduledCount}</span>
                <span className="text-nowrap">Scheduled</span>
              </div>
              <div className="flex flex-col w-min-15 px-1 text-xs">
                <span>{cadenceStep.statistics.skippedCount}</span>
                <span className="text-nowrap">Skipped</span>
              </div>
              <div className="flex flex-col w-min-15 px-1 text-xs">
                <span>{cadenceStep.statistics.deliveredCount}</span>
                <span className="text-nowrap">Delivered</span>
              </div>
              <div className="flex flex-col w-min-15 px-1 text-xs">
                <span>{cadenceStep.statistics.bouncedCount}</span>
                <span className="text-nowrap">Bounced</span>
              </div>
              <div className="flex flex-col w-min-15 px-1 text-xs">
                <span>{cadenceStep.statistics.openedCount}</span>
                <span className="text-nowrap">Opened</span>
              </div>
              <div className="flex flex-col w-min-15 px-1 text-xs">
                <span>{cadenceStep.statistics.repliedCount}</span>
                <span className="text-nowrap">Replied</span>
              </div>
              <div className="flex flex-col w-min-15 px-1 text-xs">
                <span>{cadenceStep.statistics.interestedCount}</span>
                <span className="text-nowrap">Interested</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-10 px-4 flex items-center"></div>
      {isOpenUpdateView && (
        <EditStep
          cadenceStepData={cadenceStep}
          handleUpdateStep={(data) => {
            console.log("udpated!!!");
            handleUpdate(data);
          }}
          closeModal={() => setIsOpenUpdateView(false)}
        />
      )}
    </div>
  );
}
