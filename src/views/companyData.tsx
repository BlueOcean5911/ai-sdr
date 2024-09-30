import ComingSoon from "@/components/coming-soon";
import UploadedFiles from "@/components/CompanyData/UploadedFiles";
import Upload from "@/components/upload";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";

const CompanyData = () => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);

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
                    placeholder="e.g., 15"
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
                    placeholder="e.g., 5"
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
                    placeholder="e.g., 10000"
                  />
                </div>
              </div>
            </div>

            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-primary-foreground hover:bg-blue-400/90 h-10 px-4 py-2 w-full text-white mb-8">
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
                  <label
                    htmlFor="testimonials"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Case Study
                  </label>
                  <UploadedFiles type="case-study" />
                  <Upload type="case-study" />
                </div>
                <div className="sm:w-full md:w-1/2 space-y-2">
                  <label
                    htmlFor="testimonials"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Testimonials
                  </label>
                  <UploadedFiles type="testimonial" />
                  <Upload type="testimonial" />
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
