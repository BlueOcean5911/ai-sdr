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

import { CallModel } from "@/services/callService";

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;

export default function CallDetail({
  call,
  open,
  handleClose,
}: {
  call: CallModel | undefined;
  open: boolean;
  handleClose: () => void;
}) {
  const [audioUrl, setAudioUrl] = useState<string | null>("/assets/audio/sample.mp3");

  // useEffect(() => {
  //   if (call?.recording_url) {
  //     fetch(
  //       `${call.recording_url}.mp3`,
  //       {
  //         headers: {
  //           Authorization: `Basic ${Buffer.from(
  //             `${accountSid}:${authToken}`
  //           ).toString("base64")}`,
  //         },
  //       }
  //     )
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(
  //             "Network response was not ok " + response.statusText
  //           );
  //         }
  //         return response.blob();
  //       })
  //       .then((blob) => {
  //         const url = URL.createObjectURL(blob);
  //         setAudioUrl(url);
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "There has been a problem with your fetch operation:",
  //           error
  //         );
  //       });
  //   }
  // }, [call]);

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={handleClose}>
          <div className="fixed inset-0 bg-black/65 z-40" />
          <div className="fixed inset-0 py-10 overflow-y-auto z-40">
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
                    Call With John Doe
                  </DialogTitle>
                  {call && (
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
                      {/* <div className="flex flex-row justify-between items-center gap-4">
                        <label htmlFor="from">From:</label>
                        <input
                          id="from"
                          disabled
                          className="input-primary text-center"
                          value={call.from_formatted}
                        />
                        <label htmlFor="to">To:</label>
                        <input
                          id="to"
                          disabled
                          className="input-primary text-center"
                          value={call.to ? call.to : "Unknown"}
                        />
                        <label htmlFor="date">Date:</label>
                        <input
                          id="date"
                          disabled
                          className="input-primary text-center"
                          value={call.date_created.split("T")[0]}
                        />
                      </div> */}
                      <div className="flex flex-col gap-1 text-sm">
                        <label htmlFor="contact">Contact:</label>
                        <input
                          type="text"
                          id="contact"
                          className="input-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1 text-sm">
                        <label htmlFor="purpose">Purpose:</label>
                        <input
                          type="text"
                          id="purpose"
                          className="input-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1 text-sm">
                        <label htmlFor="disposition">Dispoisition:</label>
                        <input
                          type="text"
                          id="disposition"
                          className="input-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1 text-sm">
                        <label htmlFor="notes">Notes:</label>
                        <textarea
                          id="notes"
                          className="input-primary"
                          rows={4}
                        />
                      </div>
                      <button className="w-20 btn-primary">Save</button>
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
