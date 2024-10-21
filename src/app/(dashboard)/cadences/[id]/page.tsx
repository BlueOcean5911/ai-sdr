"use client";

import { useEffect, useState } from "react";

import CadenceStep from "@/sections/cadences/CadenceStep";
import AddStep from "@/sections/cadences/AddStep";
import { handleError, runService } from "@/utils/service_utils";
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
import { SuccessModel } from "@/types";
import { useCadence } from "@/contexts/CadenceContext";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { cadence } = useCadence();
  const [cadenceSteps, setCadenceSteps] = useState<CadenceStepModel[]>([]);
  const [template, setTemplate] = useState<TemplateModel>({});
  const [edit, setEdit] = useState(false);

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
    fetchCadenceStepsByCadenceId();
  }, []);

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
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">Edit template</h1>
              <div className="flex justify-end gap-4">
                <button
                  className="btn-secondary"
                  onClick={() => handleCancelTemplate()}
                >
                  Cancel
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => handleTestTemplate()}
                >
                  Send test to me
                </button>
                <button
                  className="btn-primary"
                  onClick={() => handleSaveTemplate()}
                >
                  Save
                </button>
              </div>
            </div>
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
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-auto">
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
