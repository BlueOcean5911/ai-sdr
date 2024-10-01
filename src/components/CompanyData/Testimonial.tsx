import { useState } from "react";
import Upload from "../upload";
import UploadedFiles from "./UploadedFiles";
import { TrainingDocument } from "@/types";
import { runService } from "@/utils/service_utils";
import { deleteTrainingDocument } from "@/services/trainingDataService";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<TrainingDocument[]>();

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
        onUpload={(testimonials: TrainingDocument[]) =>
          setTestimonials(testimonials)
        }
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
