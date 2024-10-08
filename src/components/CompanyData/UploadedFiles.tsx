import { deleteTrainingDocument } from "@/services/trainingDataService";
import { TrainingDocument } from "@/types";
import { runService } from "@/utils/service_utils";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const staticFiles = [
  {
    id: "0001",
    name: "training documentation-001",
    url: "#",
  },
  {
    id: "0002",
    name: "training documentation-002",
    url: "#",
  },
  {
    id: "0003",
    name: "training documentation-003",
    url: "#",
  },
  {
    id: "0004",
    name: "training documentation-004",
    url: "#",
  },
  {
    id: "0005",
    name: "training documentation-005",
    url: "#",
  },
];

const UploadedFiles = ({
  type,
  files,
  onDelete,
}: {
  type: string;
  files: TrainingDocument[] | undefined;
  onDelete: (id: string) => void;
}) => {
  return (
    <>
      {files && files?.length > 0 && (
        <div className="flex flex-wrap gap-2 ">
          {files.map((file) => (
            <div className="flex border-2 rounded-full items-center px-4 py-1">
              <span className="text-xs selected-file  whitespace-nowrap max-w-36 text-ellipsis overflow-hidden">
                {file.fileName} &nbsp;
              </span>
              <XMarkIcon
                className="w-4 h-4 hover:cursor-pointer"
                onClick={() => onDelete(file.id)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UploadedFiles;
