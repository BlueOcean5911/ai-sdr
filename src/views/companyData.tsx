import ComingSoon from "@/components/coming-soon";
import CaseStudy from "@/components/CompanyData/CaseStudy";
import Testimonial from "@/components/CompanyData/Testimonial";
import UploadedFiles from "@/components/CompanyData/UploadedFiles";
import Upload from "@/components/upload";
import {
  getTrainingDataMetrics,
  updateTrainingDataMetrics,
} from "@/services/trainingDataService";
import { TrainingDataMetrics } from "@/types";
import { handleError, runService } from "@/utils/service_utils";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

const CompanyData = () => {
  const [trainingDataMetrics, setTrainingDataMetrics] = useState<
    TrainingDataMetrics | undefined
  >(undefined);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

  const fetchTrainingDataMetrics = () => {
    runService(
      {},
      getTrainingDataMetrics,
      (data: TrainingDataMetrics) => {
        setTrainingDataMetrics(data);
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };

  const handleSaveTrainingDataMetrics = () => {
    runService(
      trainingDataMetrics,
      updateTrainingDataMetrics,
      (data: TrainingDataMetrics) => {
        setTrainingDataMetrics(data);
        toast.success("Successfully training data saved!");
      },
      (statusCode, error) => {
        handleError(statusCode, error);
      }
    );
  };

  useEffect(() => {
    fetchTrainingDataMetrics();
  }, []);

  const upload = () => {};

  const onDrop = (files: any) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-8">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2>Upload Defined ICP and Outbound Metrics</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Define ICP:</h3>
              <div className="grid gap-4 pl-4">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="company-size"
                  >
                    Company Size
                  </label>
                  <input
                    className="input-primary"
                    id="company-size"
                    placeholder="e.g., 50-200 employees"
                    value={trainingDataMetrics?.companySize}
                    onChange={(e) =>
                      setTrainingDataMetrics((prev) => ({
                        ...prev,
                        companySize: e.target?.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="industry"
                  >
                    Industry
                  </label>
                  <input
                    className="input-primary"
                    id="industry"
                    placeholder="e.g., SaaS, Fintech"
                    value={trainingDataMetrics?.industry}
                    onChange={(e) =>
                      setTrainingDataMetrics((prev) => ({
                        ...prev,
                        industry: e.target?.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="pain-points"
                  >
                    Key Pain Points
                  </label>
                  <textarea
                    className="input-primary"
                    placeholder="Describe the main challenges your ICP faces"
                    value={trainingDataMetrics?.keyPainPoints}
                    onChange={(e) =>
                      setTrainingDataMetrics((prev) => ({
                        ...prev,
                        keyPainPoints: e.target?.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Outbound Metrics and Sales Metrics:
              </h3>
              <div className="grid gap-4 pl-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Current Response Rate (%)
                  </label>
                  <input
                    className="input-primary"
                    id="response-rate"
                    type="number"
                    step={0.5}
                    placeholder="e.g., 15"
                    value={trainingDataMetrics?.currentResponseRate}
                    onChange={(e) =>
                      setTrainingDataMetrics((prev) => ({
                        ...prev,
                        currentResponseRate: e.target?.value
                          ? parseFloat(e.target?.value)
                          : 0,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="conversion-rate"
                  >
                    Current Conversion Rate (%)
                  </label>
                  <input
                    className="input-primary"
                    id="conversion-rate"
                    type="number"
                    step={0.5}
                    placeholder="e.g., 5"
                    value={trainingDataMetrics?.currentConversionRate}
                    onChange={(e) =>
                      setTrainingDataMetrics((prev) => ({
                        ...prev,
                        currentConversionRate: e.target?.value
                          ? parseFloat(e.target?.value)
                          : 0,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="avg-deal-size"
                  >
                    Average Deal Size ($)
                  </label>
                  <input
                    className="input-primary"
                    id="avg-deal-size"
                    type="number"
                    step={0.5}
                    placeholder="e.g., 10000"
                    value={
                      trainingDataMetrics?.averageDealSize
                        ? trainingDataMetrics?.averageDealSize
                        : 0
                    }
                    onChange={(e) =>
                      setTrainingDataMetrics((prev) => ({
                        ...prev,
                        averageDealSize: e.target?.value
                          ? parseFloat(e.target?.value)
                          : 0,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-primary-foreground hover:bg-blue-400/90 h-10 px-4 py-2 w-full text-white mb-8"
              onClick={() => handleSaveTrainingDataMetrics()}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h2>Upload Training Documents</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Case Studies and Testimonials:
              </h3>
              <div className="pl-4 flex sm:flex-col md:flex-row gap-4">
                <div className="sm:w-full md:w-1/2 space-y-2">
                  <CaseStudy />
                </div>
                <div className="sm:w-full md:w-1/2 space-y-2">
                  <Testimonial />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyData;
