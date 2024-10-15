import { TrainingDocument } from "@/types";
import { XMarkIcon } from "@heroicons/react/24/solid";

const UploadedFiles = ({
  title,
  files,
  onDelete,
}: {
  title: string;
  files: TrainingDocument[] | undefined;
  onDelete: (id: string) => void;
}) => {
  return (
    <>
      {files && files?.length > 0 && (
        <>
          <h4>{title}</h4>
          <div className="ml-8 p-4 flex flex-wrap gap-2 border rounded">
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
        </>
      )}
    </>
  );
};

export default UploadedFiles;
