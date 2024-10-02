import { LeadModelWithCompanyModel } from "@/services/leadService";
import { ArrowUturnLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import PersonalizedSetting from "./PersonalizedSetting";
import PersonalizedEmail from "./PersonalizedEmail";
import { SettingsIcon } from "lucide-react";
import { GeneratedEmailsModel, PersonalizedSettingModel } from "@/types";
import { handleError, runService } from "@/utils/service_utils";
import { generateEmail } from "@/services/mailingService";
import { toast } from "react-toastify";

enum PERSONALIZED_VIEW {
  EMAIL_VIEW = "personalized-email-vew",
  SETTING_VIEW = "personalized-setting",
}

const EmailGeneratorWindow = ({
  lead,
  onChange,
  close,
}: {
  lead: LeadModelWithCompanyModel;
  onChange: (text: string, type: string) => void;
  close: () => void;
}) => {
  const [activeView, setActiveView] = useState<string>(
    PERSONALIZED_VIEW.SETTING_VIEW
  );
  const [personalizedSetting, setPersonalizedSetting] =
    useState<PersonalizedSettingModel>({
      recipientInfo: {
        companyDescription: "",
        companyIndustry: "",
        contactName: "",
        contactTitle: "",
      },
      productInfo: {
        productName: "",
        customerKeyPainPoints: "",
        valueProposition: "",
        callToAction: "",
        companyOverview: "",
        additionalContext: "",
      },
    });
  const [generatedEmails, setGeneratedEmails] = useState<
    GeneratedEmailsModel | undefined
  >(undefined);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateEmail = () => {
    setIsGenerating(true);

    runService(
      personalizedSetting,
      generateEmail,
      (data) => {
        setGeneratedEmails(data);
        setIsGenerating(false);
        toast.success("Email generated successfully");
      },
      (statusCode, error) => {
        setIsGenerating(false);
        handleError(statusCode, error);
      }
    );

    // setTimeout(() => {
    //   setIsGenerating(false);
    // }, 5000);

    if (activeView === PERSONALIZED_VIEW.SETTING_VIEW) {
      setActiveView(PERSONALIZED_VIEW.EMAIL_VIEW);
      setGeneratedEmails({
        subjects: [],
        bodies: [],
      });
    }
  };

  useEffect(() => {
    console.log(personalizedSetting);
  }, [personalizedSetting]);

  return (
    <>
      <div className="z-20 flex flex-col fixed bottom-2 right-[524px] w-[400px] h-[80vh] shadow-[0px_4px_24px_rgba(0,0,0,0.3)] bg-white border-2 border-gray-100 rounded-md overflow-auto">
        <div className="px-4 py-2 flex justify-between items-center border-b-2 text-base">
          Write with AI
          <XMarkIcon
            className="w-5 h-5 hover:stroke-gray-600 cursor-pointer"
            onClick={close}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-auto">
          {activeView === PERSONALIZED_VIEW.EMAIL_VIEW && (
            <PersonalizedEmail
              isGenerating={isGenerating}
              generatedEmails={
                generatedEmails ? generatedEmails : { subjects: [], bodies: [] }
              }
              onChange={onChange}
            />
          )}
          {activeView === PERSONALIZED_VIEW.SETTING_VIEW && (
            <PersonalizedSetting
              lead={lead}
              setting={personalizedSetting}
              onChange={(setting) => setPersonalizedSetting(setting)}
            />
          )}
        </div>

        <div className="p-4 bg-gray-50 flex gap-4">
          {activeView === PERSONALIZED_VIEW.EMAIL_VIEW && (
            <button
              className="w-full py-1 px-2 bg-white border-2  font-medium rounded  hover:bg-gray-100 transition duration-200 flex items-center justify-center gap-2"
              onClick={() => setActiveView(PERSONALIZED_VIEW.SETTING_VIEW)}
            >
              <SettingsIcon className="w-4 h-4" />
              Setting
            </button>
          )}
          {generatedEmails && activeView === PERSONALIZED_VIEW.SETTING_VIEW && (
            <button
              className="w-full py-1 px-2 bg-white border-2  font-medium rounded  hover:bg-gray-100 transition duration-200 flex items-center justify-center gap-2"
              onClick={() => setActiveView(PERSONALIZED_VIEW.EMAIL_VIEW)}
            >
              <ArrowUturnLeftIcon className="w-4 h-4" />
              Back to email
            </button>
          )}
          <button
            className="w-full py-1 px-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-400 transition duration-200"
            onClick={() => handleGenerateEmail()}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default EmailGeneratorWindow;
