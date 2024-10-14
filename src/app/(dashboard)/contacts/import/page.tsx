"use client";
import Upload from "@/components/upload";
import { SuccessModel, TrainingDocument } from "@/types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Page() {
  return (
    <div className="flex-1 flex bg-gray-100 overflow-auto">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex-1 px-6 py-6 lg:py-24 flex flex-col lg:flex-row gap-16 lg:gap-6 max-w-4xl m-auto">
          <div className="card flex flex-col gap-4 border">
            <div className="flex justify-center items-center">
              <Image
                src={"/assets/images/icon/importlead.svg"}
                alt="import lead"
                width={90}
                height={90}
              />
            </div>
            <div className="px-4 flex flex-col gap-2">
              <span className="text-lg font-semibold text-center">
                Import Leads
              </span>
              <span className="text-center">
                You can import up to 100,000 rows at a time.
              </span>
            </div>
            <div className="flex gap-2">
              <div className="flex items-start">
                <InformationCircleIcon className="w-6 h-6 stroke-blue-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm">
                  You can import up to 100,000 rows at once. For accurate
                  mapping, include at least one of the following fields:{" "}
                  <strong>
                    Company Name, Company Website, LinkedIn URL, or Contact
                    Email
                  </strong>
                  . Ensure your file is in CSV format (.csv) and double-check
                  the data for accuracy. During the upload, you’ll map your CSV
                  fields to our system’s fields. For detailed instructions,
                  visit our{" "}
                  <strong className="hover:underline hover:cursor-pointer hover:select-none">
                    Help Center
                  </strong>
                  . Following these guidelines will streamline your lead import
                  process and enhance data management.
                </span>
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex flex-col gap-4">
              <Upload
                type="leads"
                description="Drop or select leads csv files to upload"
                onUpload={(data) => {
                  toast.success("Successfully uploaded");
                }}
              />
              <hr />
              <a
                href="/csv/sample-csv-contact.csv"
                download={true}
                className="hover:underline"
              >
                <div className="flex justify-center hover:underline hover:select-none hover:cursor-pointer text-blue-500 hover:text-blue-400">
                  Download sample template
                </div>
              </a>
            </div>
          </div>

          <div className="card flex flex-col gap-4 border">
            <div className="flex justify-center items-center">
              <Image
                src={"/assets/images/icon/importcompany.svg"}
                alt="import company"
                width={90}
                height={90}
              />
            </div>
            <div className="px-4 flex flex-col gap-2">
              <span className="text-lg font-semibold text-center">
                Import Companies
              </span>
              <span className="text-center">
                You can import up to 100,000 rows at a time.
              </span>
            </div>
            <div className="flex gap-2">
              <div className="flex items-start">
                <InformationCircleIcon className="w-6 h-6 stroke-blue-600" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm">
                  You can import up to 100,000 rows at once. For accurate
                  mapping, include at least one of the following fields:{" "}
                  <strong>Company Name, Company Website or LinkedIn URL</strong>
                  . Ensure your file is in CSV format (.csv) and double-check
                  the data for accuracy. During the upload, you’ll map your CSV
                  fields to our system’s fields. For detailed instructions,
                  visit our{" "}
                  <strong className="hover:underline hover:cursor-pointer hover:select-none">
                    Help Center
                  </strong>
                  . Following these guidelines will streamline your company
                  import process and enhance data management.
                </span>
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex flex-col gap-4">
              <Upload
                type="companies"
                description="Drop or select companies csv files to upload"
                onUpload={(data: SuccessModel) => {
                  if (data.success) {
                    toast.success("Successfully uploaded");
                  } else {
                    toast.info(
                      "Please check the guideline for more information"
                    );
                  }
                }}
              />
              <hr />
              <a href="/csv/sample-csv-company.csv" download={true}>
                <div className="flex justify-center hover:underline hover:select-none hover:cursor-pointer text-blue-500 hover:text-blue-400">
                  Download sample template
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
