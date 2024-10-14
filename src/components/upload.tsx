"use client";

import UploadFilesService from "@/services/uploadFilesService";
import { SuccessModel, TrainingDocument } from "@/types";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";

const Upload = ({
  type,
  description,
  onUpload,
}: {
  type: string;
  description: string;
  onUpload: (data: SuccessModel) => void;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const upload = ({ type }: { type: string }) => {
    setProgress(0);
    setUploading(true);
    if (type === "testimonial") {
      UploadFilesService.uploadTestimonials(selectedFiles, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
        .then((response) => {
          onUpload(response.data);
          setSelectedFiles(undefined);
        })
        .catch((e) => {
          setProgress(0);
          setSelectedFiles(undefined);
          setUploading(false);
        });
    } else if (type == "case-study") {
      UploadFilesService.uploadCaseStudies(selectedFiles, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
        .then((response) => {
          onUpload(response.data);
          setSelectedFiles(undefined);
        })
        .catch((e) => {
          setProgress(0);
          setSelectedFiles(undefined);
          setUploading(false);
        });
    } else if (type == "leads") {
      UploadFilesService.uploadLeads(selectedFiles, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
        .then((response) => {
          onUpload(response.data);
          setSelectedFiles(undefined);
        })
        .catch((e) => {
          setProgress(0);
          setSelectedFiles(undefined);
          setUploading(false);
        });
    } else if (type == "companies") {
      UploadFilesService.uploadCompanies(selectedFiles, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
        .then((response) => {
          onUpload(response.data);
          setSelectedFiles(undefined);
        })
        .catch((e) => {
          setProgress(0);
          setSelectedFiles(undefined);
          setUploading(false);
        });
    }
  };

  const onDrop = (files: any) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  return (
    <>
      {uploading && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-4 flex items-center justify-center">
            <div
              className={`absolute top-0 bottom-0 left-0 rounded-lg bg-blue-200`}
              style={{ width: `${progress}%` }}
            ></div>
            <div className="relative text-blue-900 font-medium text-sm">
              {progress}%
            </div>
          </div>
        </div>
      )}
      <Dropzone onDrop={onDrop} multiple={true}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="flex gap-2 flex-wrap">
                {selectedFiles ? (
                  selectedFiles.map(
                    (file: any) =>
                      file?.name && (
                        <span className="text-xs selected-file border-2 px-4 py-1 rounded-full whitespace-nowrap max-w-36 text-ellipsis overflow-hidden">
                          {file && file?.name}
                        </span>
                      )
                  )
                ) : (
                  <div className="m-auto text-sm">{description}</div>
                )}
              </div>
            </div>
            {selectedFiles && (
              <aside className="selected-file-wrapper space-x-2">
                <button
                  disabled={!selectedFiles}
                  onClick={() => upload({ type })}
                  className="btn-primary"
                >
                  <UploadIcon className="w-4 h-4 stroke-white" />
                  &nbsp; Upload {type}
                </button>
                <button
                  disabled={!selectedFiles}
                  onClick={() => {
                    setSelectedFiles(undefined);
                  }}
                  className="btn-secondary"
                >
                  <XMarkIcon className="w-4 h-4 stroke-white" />
                  &nbsp; Cancel
                </button>
              </aside>
            )}
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default Upload;
