import { LeadModelWithCompanyModel } from "@/services/leadService";
import { PersonalizedSettingModel } from "@/types";
import { useState } from "react";

const PersonalizedSetting = ({
  lead,
  setting,
  onChange,
}: {
  lead: LeadModelWithCompanyModel;
  setting: PersonalizedSettingModel;
  onChange: (data: PersonalizedSettingModel) => void;
}) => {
  const [activeTab, setActiveTab] = useState("recipient");
  console.log(lead);
  const handlePersonalInfo = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.checked) {
      let value: string | undefined = "";
      switch (type) {
        case "companyDescription": {
          value = lead.company?.description;
          break;
        }
        case "companyIndustry": {
          value = lead.company?.industry;
          break;
        }
        case "contactName": {
          value = lead.firstName + " " + lead.lastName;
          break;
        }
        case "contactTitle": {
          value = lead?.title;
          break;
        }
        default: {
        }
      }

      onChange({
        ...setting,
        recipientInfo: {
          ...setting.recipientInfo,
          [type]: value,
        },
      });
    } else {
      onChange({
        ...setting,
        recipientInfo: {
          ...setting.recipientInfo,
          [type]: "",
        },
      });
    }
  };

  const handleProductInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    onChange({
      ...setting,
      productInfo: {
        ...setting.productInfo,
        [type]: e.target.value,
      },
    });
  };

  return (
    <div className="text-base w-full h-full bg-white rounded-lg flex flex-col">
      <div className="p-4 font-semibold">Personalization settings</div>
      <div className="flex border-b text-sm">
        <button
          className={`flex-1 py-2 px-4 font-medium ${
            activeTab === "recipient"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("recipient")}
        >
          Recipient info
        </button>
        <button
          className={`flex-1 py-2 px-4 font-medium ${
            activeTab === "product"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("product")}
        >
          Product info
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col overflow-auto">
        {activeTab === "recipient" && (
          <>
            <p className="text-sm text-gray-600 mb-2">
              Select up to 3 lead insight types to personalize your message.
            </p>
            <div className="space-y-4 border-2 rounded-md p-4 flex-1">
              <div>
                <div className="font-medium mb-2 text-sm">Company</div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="text-blue-500 focus:ring-0"
                      onChange={(e) =>
                        handlePersonalInfo(e, "companyDescription")
                      }
                    />
                    <span className="ml-2 text-sm line-clamp-2 ">
                      Company Description
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 ml-7 line-clamp-3">
                    {lead.company?.description}
                  </p>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="text-blue-500 focus:ring-0"
                      onChange={(e) => handlePersonalInfo(e, "companyIndustry")}
                    />
                    <span className="ml-2 text-sm">Industry</span>
                  </label>
                  <p className="text-xs text-gray-500 ml-7">
                    {lead.company?.industry}
                  </p>
                </div>
              </div>
              <div>
                <div className="font-medium mb-2 text-sm">Contact</div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="text-blue-500 focus:ring-0"
                      onChange={(e) => handlePersonalInfo(e, "contactName")}
                    />
                    <span className="ml-2 text-sm">Name</span>
                  </label>
                  <p className="text-xs ml-7">{`${lead.firstName} ${lead.lastName}`}</p>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="text-blue-500 focus:ring-0"
                      onChange={(e) => handlePersonalInfo(e, "contactTitle")}
                    />
                    <span className="ml-2 text-sm">Title</span>
                  </label>
                  <p className="text-xs ml-7">{lead.title}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === "product" && (
          <div className="border-2 rounded-md p-4 overflow-auto">
            <p className="text-sm text-gray-600 mb-4">
              The following is used to highlight your company and its services
              in generated emails.
            </p>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company or product name*
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="input-primary"
                  placeholder="E.g. AIVIO.io"
                  value={setting.productInfo.productName}
                  onChange={(e) => handleProductInfoChange(e, "productName")}
                />
              </div>
              <div>
                <label
                  htmlFor="painPoints"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Customer pain points*
                </label>
                <textarea
                  id="painPoints"
                  rows={3}
                  className="input-primary"
                  placeholder="E.g. Too much manual work finding prospects and creating personalized outreaches"
                  value={setting.productInfo.customerKeyPainPoints}
                  onChange={(e) =>
                    handleProductInfoChange(e, "customerKeyPainPoints")
                  }
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="valueProposition"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Value proposition*
                </label>
                <input
                  type="text"
                  id="valueProposition"
                  className="input-primary"
                  placeholder="E.g. End-to-end sales funnel automation"
                  value={setting.productInfo.valueProposition}
                  onChange={(e) =>
                    handleProductInfoChange(e, "valueProposition")
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="callToAction"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Call-to-action*
                </label>
                <input
                  type="text"
                  id="callToAction"
                  className="input-primary"
                  placeholder="E.g. Book a demo"
                  value={setting.productInfo.callToAction}
                  onChange={(e) => handleProductInfoChange(e, "callToAction")}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="companyOverview"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company overview
                  </label>
                  <textarea
                    id="companyOverview"
                    rows={3}
                    className="input-primary"
                    placeholder="E.g. The only data intelligence and sales engagement platform you'll ever need"
                    value={setting.productInfo.companyOverview}
                    onChange={(e) =>
                      handleProductInfoChange(e, "companyOverview")
                    }
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="additionalContext"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Additional context
                  </label>
                  <textarea
                    id="additionalContext"
                    rows={3}
                    className="input-primary"
                    placeholder="Any additional context you want to provide"
                    value={setting.productInfo.additionalContext}
                    onChange={(e) =>
                      handleProductInfoChange(e, "additionalContext")
                    }
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedSetting;
