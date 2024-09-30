"use client";

import UploadFilesService from "@/services/uploadFilesService";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";

const Upload = ({ type }: { type: string }) => {
  let [isOpen, setIsOpen] = useState(false);

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
          console.log(response);
        })
        .catch((e) => {
          setProgress(0);
        })
        .finally(() => {
          setUploading(false);
        });
    } else if (type == "case-study") {
      UploadFilesService.uploadCaseStudies(selectedFiles, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          setProgress(0);
          setSelectedFiles([]);
        })
        .finally(() => {
          setUploading(false);
        });
    }
    setUploading(false);
    setSelectedFiles(undefined);
  };

  const onDrop = (files: any) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  return (
    <>
      {uploading && (
        <div className="progress mb-3">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${progress}%` }}
          >
            {progress}%
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
                  <div className="m-auto">
                    Drop {type} for training to upload
                  </div>
                )}
              </div>
            </div>
            <aside className="selected-file-wrapper space-x-2">
              <button
                disabled={!selectedFiles}
                onClick={upload}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-primary-foreground hover:bg-blue-400 h-10 px-4 py-2 cursor-pointer text-white capitalize"
              >
                <UploadIcon className="w-4 h-4 stroke-white" />
                &nbsp; Upload {type}
              </button>
              <button
                disabled={!selectedFiles}
                onClick={() => {
                  setSelectedFiles(undefined);
                }}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-100 text-primary-foreground hover:bg-gray-200 h-10 px-4 py-2 cursor-pointer text-gray-900 capitalize border-2 border-gray-400"
              >
                <div className="h-4 stroke-white" />
                Cancel
              </button>
            </aside>
          </section>
        )}
      </Dropzone>
    </>
  );
};

export default Upload;
