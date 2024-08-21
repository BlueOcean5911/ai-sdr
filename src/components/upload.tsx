"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Dropzone from "react-dropzone";

const Upload = ({ text = "Add" }: { text: string }) => {
  let [isOpen, setIsOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const onDrop = (files: any) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  return (
    <>
      <div
        className="btn-primary flex-center gap-2 p-2"
        onClick={() => setIsOpen(true)}
      >
        <PlusCircleIcon className="w-4 h-4 stroke-white" />
        {text}
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-500 opacity-75" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 card">
            <div>
              {/* {currentFile && (
        <div className="progress mb-3">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )} */}

              <Dropzone onDrop={onDrop} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                  <section className="card bg-gray-200 border-dashed border-4 border-gray-300 contain-content">
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      {selectedFiles && selectedFiles[0].name ? (
                        <div className="selected-file">
                          {selectedFiles && selectedFiles[0].name}
                        </div>
                      ) : (
                        <p>Upload or drag your file</p>
                      )}
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="description">Description</label>
              <input
                className="block w-full rounded-md py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset  sm:text-sm sm:leading-6 focus:border-gray-500 focus:border-2 border-2 border-gray-100"
                name="description"
                id="description"
              />
            </div>
            <div className="btn-primary text-center p-2">Upload</div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Upload;
