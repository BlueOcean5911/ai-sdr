import { useEffect, useState } from "react";
import Upload from "../upload";
import UploadedFiles from "./UploadedFiles";
import { TrainingDocument } from "@/types";
import { handleError, runService } from "@/utils/service_utils";
import { deleteTrainingDocument } from "@/services/trainingDataService";
import { getTestimonials } from "@/services/trainingDocumentService";
import { toast } from "react-toastify";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<TrainingDocument[]>();

  const fetchTestimonials = () => {
    runService(
      {},
      getTestimonials,
      (data) => {
        setTestimonials(data);
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDeleteFile = (id: string) => {
    runService(
      { id },
      deleteTrainingDocument,
      () => {
        setTestimonials(testimonials?.filter((file) => file.id !== id));
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
        Testimonials
      </label>
      <Upload
        type="testimonial"
        description="Drop or select testimonials files to upload for training"
        onUpload={(data) => {
          if (data.success) {
            fetchTestimonials();
            toast.success("Successfully uploaded");
          } else {
            toast.error("Something goes wrong, please contact us!");
          }
        }}
      />
      <div className="h-8" />
      {testimonials && testimonials.length > 0 && (
        <UploadedFiles
          type="testimonial"
          files={testimonials}
          onDelete={(id: string) => handleDeleteFile(id)}
        />
      )}
    </>
  );
};

export default Testimonial;
