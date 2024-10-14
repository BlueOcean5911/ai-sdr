import UploadedFiles from "./UploadedFiles";
import { TrainingDocument } from "@/types";
import { useEffect, useState } from "react";
import Upload from "../upload";
import { handleError, runService } from "@/utils/service_utils";
import { getCaseStudies } from "@/services/trainingDocumentService";
import { deleteTrainingDocument } from "@/services/trainingDataService";

const CaseStudy = () => {
  const [caseStudies, setCaseStudies] = useState<TrainingDocument[]>();

  useEffect(() => {
    runService(
      {},
      getCaseStudies,
      (data) => {
        setCaseStudies(data);
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  }, []);

  const handleDeleteFile = (id: string) => {
    runService(
      { id },
      deleteTrainingDocument,
      () => {
        setCaseStudies(caseStudies?.filter((file) => file.id !== id));
      },
      (status, error) => {
        console.log(status, error);
      }
    );
  };

  return (
    <>
      <label
        htmlFor="testimonials"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Case Study
      </label>
      <Upload
        type="case-study"
        description="Drop or select case study files to upload for training"
        onUpload={(caseStudies: TrainingDocument[]) =>
          setCaseStudies(caseStudies)
        }
      />
      <div className="h-8" />
      {caseStudies && caseStudies.length > 0 && (
        <UploadedFiles
          type="case-study"
          files={caseStudies}
          onDelete={(id: string) => handleDeleteFile(id)}
        />
      )}
    </>
  );
};

export default CaseStudy;
