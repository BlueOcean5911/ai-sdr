"use client";
import CompanyData from "@/views/companyData";

const Page = () => {
  return (
    <>
      <div className="p-4 bg-gray-100 text-sm overflow-auto">
        <div className="card">
          <CompanyData />
        </div>
      </div>
    </>
  );
};

export default Page;
