"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronRightIcon,
  InformationCircleIcon,
  PlusCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import ToggleButton from "@/components/extends/Button/ToggleButton";
import CadenceStep from "@/sections/cadences/CadenceStep";
import AddStep from "@/sections/cadences/AddStep";
import { useRouter } from "next/navigation";
import { handleError, runService } from "@/utils/service_utils";
import {
  BaseCadenceModel,
  FetchCadenceModel,
  getCadenceById,
  updateCadence,
} from "@/services/cadenceService";
import {
  addCadenceStep,
  BaseCadenceStepModel,
  CadenceStepModel,
  deleteCadenceStep,
  getCadenceStepsByCadenceId,
  moveCadenceStep,
  updateCadenceStep,
} from "@/services/cadenceStepService";
import {
  getTemplate,
  TemplateModel,
  updateTemplate,
} from "@/services/templatesService";
import { toast } from "react-toastify";
import { ROUTE_LEADS } from "@/data/routes";
import { SuccessModel } from "@/types";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [starred, setStarred] = useState(false);
  const [active, setActive] = useState(false);
  const [cadence, setCadence] = useState<FetchCadenceModel>();
  const [cadenceSteps, setCadenceSteps] = useState<CadenceStepModel[]>([]);
  const [template, setTemplate] = useState<TemplateModel>({});
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const handleUpdateCadence = (updatedCadence: BaseCadenceModel) => {
    runService(
      { cadenceId: cadence?.id, updatedCadence },
      updateCadence,
      (data) => {
        setCadence(data);
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  const handleUpdateActive = () => {
    const updatedActive: boolean = !active;
    setActive(updatedActive);
    handleUpdateCadence({
      isActive: updatedActive,
    });
  };

  const handleUpdateStarred = () => {
    const updatedStarred: boolean = !starred;
    setStarred(updatedStarred);
    handleUpdateCadence({ star: updatedStarred });
  };

  const fetchCadence = () => {
    runService(
      id,
      getCadenceById,
      (data) => {
        setCadence(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchCadenceStepsByCadenceId = () => {
    runService(
      { cadenceId: id },
      getCadenceStepsByCadenceId,
      (data) => {
        console.log("cadence steps", data);
        setCadenceSteps(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchCadence();
    fetchCadenceStepsByCadenceId();
  }, []);

  useEffect(() => {
    setStarred(cadence?.star ? true : false);
    setActive(cadence?.isActive ? true : false);
  }, [cadence]);

  const handleTemplateOpen = (id: string | undefined) => {
    if (!id) {
      return;
    }
    // fetch template by id
    runService(
      id,
      getTemplate,
      (data) => {
        setTemplate(data);
        setEdit(true);
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  const handleSaveTemplate = () => {
    runService(
      {
        id: template.id,
        updateData: {
          subject: template.subject,
          bodyText: template.bodyText,
          bodyHtml: template.bodyHtml,
          clonedFromId: template.clonedFromId,
          shareType: template.shareType,
        },
      },
      updateTemplate,
      (data) => {
        setCadenceSteps(
          cadenceSteps.map((step) => {
            if (step.templateId === template.id) {
              return { ...step, template: template };
            }
            return step;
          })
        );
        toast.success("Template updated successfully");
        setEdit(false);
      },
      (status, error) => {
        console.log(status, error);
        handleError(status, error);
      }
    );
  };

  const handleCancelTemplate = () => {
    setTemplate({});
    setEdit(false);
  };

  const handleTestTemplate = () => {
    toast.success("Successfully send email to test!");
  };

  const handledDeleteCadenceStep = (id: string) => {
    runService(
      { id },
      deleteCadenceStep,
      (data: SuccessModel) => {
        if (data.success) {
          setCadenceSteps(
            cadenceSteps.filter((cadenceStep) => id !== cadenceStep.id)
          );
          toast.success("Successfully deleted");
        }
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };

  const handleUpdateCadenceStep = (data: CadenceStepModel) => {
    console.log("here", data);
    runService(
      { data: data },
      updateCadenceStep,
      (res: SuccessModel) => {
        if (res.success) {
          fetchCadenceStepsByCadenceId();
          toast.success("Successfully updated");
        }
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };

  const handleCadenceStepMove = (id: string, value: number) => {
    runService(
      { id, value },
      moveCadenceStep,
      (data) => {
        fetchCadenceStepsByCadenceId();
        toast.success("Successfully moved");
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };

  return (
    <>
      {edit ? (
        <div className="p-2 flex flex-1 bg-gray-100 overflow-auto">
          <div className="p-4 flex flex-1 flex-col gap-2 rounded-md shadow-lg bg-white">
            <h4 className="font-semibold">Edit template</h4>
            <hr />
            <div className="flex flex-1 gap-4">
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Reply to previous thread</span>
                  <div className="flex items-center rounded-md border">
                    <span className="p-2 text-sm border-r">Subject</span>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={template?.subject ? template.subject : ""}
                      onChange={(e) => {
                        setTemplate({
                          ...template,
                          subject: e.target.value,
                        });
                      }}
                      className="input-primary border-none outline-none focus:ring-0"
                    />
                  </div>
                </div>
                <div className="flex flex-1 rounded-md border">
                  <textarea
                    name="message"
                    id="message"
                    value={template?.bodyText ? template.bodyText : ""}
                    onChange={(e) => {
                      setTemplate({
                        ...template,
                        bodyText: e.target.value,
                      });
                    }}
                    className="input-primary border-none outline-none focus:ring-0 overflow-hidden"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-2 py-1 rounded-md text-sm bg-gray-300 hover:bg-gray-200"
                onClick={() => handleCancelTemplate()}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 rounded-md text-sm bg-gray-300 hover:bg-gray-200"
                onClick={() => handleTestTemplate()}
              >
                Send test to me
              </button>
              <button
                className="px-2 py-1 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-400"
                onClick={() => handleSaveTemplate()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-auto">
          <div className="w-full px-5 pt-2 flex items-center">
            <button
              className="p-1 text-sm rounded-md hover:bg-gray-100"
              onClick={() => router.push("/cadences")}
            >
              Cadences
            </button>
            <ChevronRightIcon className="w-3 h-3" />
            <button className="p-1 text-sm rounded-md hover:bg-gray-100">
              {cadence?.name}
            </button>
          </div>
          <div className="w-full h-12 px-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ToggleButton
                checked={active}
                handleChange={() => handleUpdateActive()}
              />
              <span className="text-xl">{cadence?.name}</span>
              <div
                className="p-1 cursor-pointer rounded-md hover:bg-gray-100"
                onClick={() => handleUpdateStarred()}
              >
                <StarIcon
                  className={`w-5 h-5 ${
                    starred
                      ? "fill-blue-900 stroke-blue-900"
                      : "stroke-gray-500"
                  }`}
                />
              </div>
            </div>
          </div>
          <div className="w-full h-8 px-5 flex items-center gap-2">
            <Link href={`/cadences/${cadence?.id}`}>
              <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
                <span className="p-1.5 cursor-pointer font-semibold">
                  Overview
                </span>
                <span className="w-full border-b-2 border-black"></span>
              </span>
            </Link>
            <Link href={`/cadences/${cadence?.id}/contacts`}>
              <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
                <span className="p-1.5 cursor-pointer">Contacts</span>
                <span className="w-full border-b-2"></span>
              </span>
            </Link>
            <Link href={`/cadences/${cadence?.id}/emails`}>
              <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
                <span className="p-1.5 cursor-pointer">Emails</span>
                <span className="w-full border-b-2"></span>
              </span>
            </Link>
            {/* <Link href={`/cadences/${cadence?.id}/settings`}>
              <span className="flex flex-col rounded-md text-sm hover:bg-gray-100">
                <span className="p-1.5 cursor-pointer">Settings</span>
                <span className="w-full border-b-2"></span>
              </span>
            </Link> */}
          </div>
          <div className="flex flex-1 flex-col bg-gray-100 overflow-auto">
            <div className="w-full p-4 flex flex-col gap-4">
              <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Cadence Steps</h1>
                <AddStep
                  cadenceId={id}
                  order={cadence?.stepsCount ? cadence?.stepsCount + 1 : 1}
                  handleCreateStep={async (data: BaseCadenceStepModel) => {
                    runService(
                      data,
                      addCadenceStep,
                      (data) => {
                        fetchCadenceStepsByCadenceId();
                        toast.success("Successfully added!");
                      },
                      (statusCode, error) => {
                        handleError(statusCode, error);
                      }
                    );
                  }}
                />
              </div>
              {cadenceSteps?.map((cadenceStep: CadenceStepModel, id) => (
                <CadenceStep
                  order={id + 1}
                  total={cadenceSteps.length}
                  handleTemplateOpen={handleTemplateOpen}
                  cadenceStep={cadenceStep}
                  handleDelete={(id: string) => {
                    handledDeleteCadenceStep(id);
                  }}
                  handleUpdate={(data: CadenceStepModel) => {
                    handleUpdateCadenceStep(data);
                  }}
                  handleMove={(id: string, value: number) => {
                    handleCadenceStepMove(id, value);
                  }}
                />
              ))}
              <div className="h-4 w-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
