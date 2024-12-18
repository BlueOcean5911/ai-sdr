"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AudioPlayer } from "react-audio-player-component";
import { TrashIcon } from "@heroicons/react/24/outline";
import * as Yup from "yup";
import { Formik } from "formik";

import { useTwilioContext } from "@/contexts/TwilioContextV2";
import Select from "@/components/extends/Select/default";
import FormHelperText from "@/components/extends/FormHelperText";
import { handleError, runService } from "@/utils/service_utils";
import { getLeadById, getLeads, LeadModel } from "@/services/leadService";
import { getCallDispositions } from "@/services/callDispositionService";
import { getCallPurposes } from "@/services/callPurposeService";

interface CallDispositionProps {
  value: string;
  name: string;
}
interface CallPurposeProps {
  value: string;
  name: string;
}
export interface CallSubmitProps {
  leadId?: string;
  dispositionId?: string;
  purposeId?: string;
  note?: string;
}

export default function CallLog({
  leadId,
  depositionId,
  purposeId,
  note,
  open,
  onSubmit,
  onClose,
}: {
  leadId?: string;
  depositionId?: string;
  purposeId?: string;
  note?: string;
  open: boolean;
  onSubmit: (values: CallSubmitProps) => void;
  onClose: () => void;
}) {
  const [isReady, setIsReady] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(
    "/assets/audio/sample.mp3"
  );
  const [leadOptions, setLeadOptions] = useState<any[]>([]);
  const [lead, setLead] = useState<LeadModel | null>(null);
  const [callDispositions, setCallDispositions] = useState<
    CallDispositionProps[]
  >([]);
  const [callPurposes, setCallPurposes] = useState<CallPurposeProps[]>([]);

  useEffect(() => {
    initializeData();
    if (leadId) {
      fetchLead(leadId);
    }
  }, []);

  const fetchCallDispositions = async () => {
    await runService(
      undefined,
      getCallDispositions,
      (data: any[]) => {
        const tempCallDispositions = data.map((callDisposition) => {
          return {
            value: callDisposition.id,
            name: callDisposition.name,
          };
        });
        setCallDispositions(tempCallDispositions);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchCallPurposes = async () => {
    await runService(
      undefined,
      getCallPurposes,
      (data: any[]) => {
        const tempCallPurposes = data.map((callPurpose) => {
          return {
            value: callPurpose.id,
            name: callPurpose.name,
          };
        });
        setCallPurposes(tempCallPurposes);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const fetchLeads = async () => {
    await runService(
      undefined,
      getLeads,
      (data: any[]) => {
        const tempLeadOptions = data.map((lead) => {
          return {
            name: lead.firstName + " " + lead.lastName,
            value: lead.id,
          };
        });
        setLeadOptions([{ name: "None", value: null }, ...tempLeadOptions]);
        setIsReady(true);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  const initializeData = async () => {
    await Promise.all([
      fetchCallDispositions(),
      fetchCallPurposes(),
      fetchLeads(),
    ]);
    setIsReady(true);
  };

  const fetchLead = (leadId: string) => {
    runService(
      { id: leadId },
      getLeadById,
      (data: LeadModel) => {
        setLead(data);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={onClose}>
          <div className="fixed inset-0 bg-black/65 z-50" />
          <div className="fixed inset-0 py-10 overflow-y-auto z-50">
            <div className="flex min-h-full items-center justify-center text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="max-w-xl w-full flex flex-col rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="px-6 py-3 text-lg font-semibold leading-6 bg-white text-gray-900 rounded-md shadow-md"
                  >
                    Call
                    {lead ? (
                      <>
                        {" "}
                        With {lead.firstName} {lead?.lastName}
                      </>
                    ) : null}
                  </DialogTitle>
                  {isReady ? (
                    <Formik
                      enableReinitialize={true}
                      initialValues={{
                        contact: leadId,
                        disposition: depositionId,
                        purpose: purposeId,
                        note: note,
                      }}
                      validationSchema={Yup.object().shape({})}
                      onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        onSubmit({
                          leadId: values.contact,
                          dispositionId: values.disposition,
                          purposeId: values.purpose,
                          note: values.note,
                        });
                        onClose();
                        setSubmitting(false);
                      }}
                    >
                      {({
                        errors,
                        handleBlur,
                        handleChange,
                        setFieldValue,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        values,
                      }) => (
                        <form noValidate onSubmit={handleSubmit}>
                          <div className="flex flex-col gap-2 p-6">
                            {audioUrl && (
                              <div className="flex flex-row justify-between items-center gap-4">
                                <div className="rounded-full overflow-hidden">
                                  <AudioPlayer
                                    src={audioUrl || ""}
                                    minimal={true}
                                    width={480}
                                    trackHeight={35}
                                  />
                                </div>
                                <div
                                  className="p-1 rounded-md cursor-pointer hover:bg-white"
                                  onClick={() => {}}
                                >
                                  <TrashIcon className="w-5 h-5 stroke-red-500" />
                                </div>
                              </div>
                            )}
                            <div className="flex flex-col">
                              <label htmlFor="contact">Contact</label>
                              <Select
                                data={leadOptions}
                                defaultValue={leadOptions.find(
                                  (option) => option.value === values.contact
                                )}
                                onChange={(selectedItem) => {
                                  if (
                                    selectedItem &&
                                    selectedItem.value !== values.contact
                                  )
                                    setFieldValue(
                                      "contact",
                                      selectedItem.value
                                    );
                                }}
                              ></Select>
                              {touched.contact && errors.contact && (
                                <FormHelperText>
                                  {errors.contact}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="disposition">
                                Call Disposition
                              </label>
                              <Select
                                data={callDispositions}
                                defaultValue={callDispositions.find(
                                  (option) =>
                                    option.value === values.disposition
                                )}
                                onChange={(selectedItem) => {
                                  if (
                                    selectedItem &&
                                    selectedItem.value !== values.disposition
                                  )
                                    setFieldValue(
                                      "disposition",
                                      selectedItem.value
                                    );
                                }}
                              ></Select>
                              {touched.disposition && errors.disposition && (
                                <FormHelperText>
                                  {errors.disposition}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="purpose">Call Purpose</label>
                              <Select
                                data={callPurposes}
                                defaultValue={callPurposes.find(
                                  (option) => option.value === values.purpose
                                )}
                                onChange={(selectedItem) => {
                                  if (
                                    selectedItem &&
                                    selectedItem.value !== values.purpose
                                  )
                                    setFieldValue(
                                      "purpose",
                                      selectedItem.value
                                    );
                                }}
                              ></Select>
                              {touched.purpose && errors.purpose && (
                                <FormHelperText>
                                  {errors.purpose}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="note">Note</label>
                              <textarea
                                id="note"
                                className="input-primary"
                                value={values.note || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                            <div className="pt-2 flex justify-end gap-4">
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary"
                              >
                                Log Call
                              </button>
                              <button
                                type="button"
                                className="btn-secondary"
                                onClick={onClose}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  ) : (
                    <div className="flex-1 p-4 mt-4 flex flex-col gap-2 border rounded items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <span className="text-gray-500 mt-2">
                        Loading settings...
                      </span>
                    </div>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
