"use client";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log(files[0]); // Log the selected file
    }
  };

  return (
    <div className="flex flex-1 flex-col lg:flex-row justify-center items-center gap-6 bg-gray-100 overflow-auto">
      <div className="max-w-[400px] p-5 flex flex-col gap-4 rounded-md bg-white">
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
            Import leads
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
              <strong>
                For accurate mapping, please include at least one of these
                fields:
              </strong>
              Company Name, Company Website, LinkedIn URL, and/or Contact Email.
              For more information, please visit our help center
            </span>
            <span className="text-xs">
              By clicking "Select CSV File" below, I acknowledge that business
              contacts data submitted from my CSV file to Apollo may be used to
              provide and improve Apollo's services as further described in our
              Terms of Service. Learn more about data sharing.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              style={{ display: "none" }} // Hide the input
              onChange={handleFileChange}
            />
            <button
              className="px-4 py-1 rounded-sm text-white bg-blue-500 hover:bg-blue-400"
              onClick={handleButtonClick}
            >
              Select CSV File
            </button>
          </div>
          <hr />
          <div className="flex justify-center">Download sample template</div>
        </div>
      </div>

      <div className="max-w-[400px] p-5 flex flex-col gap-4 rounded-md">
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
              <strong>
                For accurate mapping, please include at least one of these
                fields:
              </strong>
              Company Name, Company Website. For more information, please visit
              our help center
            </span>
            <span className="text-xs">
              By clicking "Select CSV File" below, I acknowledge that business
              contacts data submitted from my CSV file to Apollo may be used to
              provide and improve Apollo's services as further described in our
              Terms of Service. Learn more about data sharing.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              style={{ display: "none" }} // Hide the input
              onChange={handleFileChange}
            />
            <button
              className="px-4 py-1 rounded-sm text-white bg-blue-500 hover:bg-blue-400"
              onClick={handleButtonClick}
            >
              Select CSV File
            </button>
          </div>
          <hr />
          <div className="flex justify-center">Download sample template</div>
        </div>
      </div>
    </div>
  );
}
