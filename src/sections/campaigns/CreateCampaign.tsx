import Select from "@/components/extends/Select/default";
import { addCampaign, BaseCampaignModel } from "@/services/campaignService";
import { handleError, runService } from "@/utils/service_utils";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormHelperText from "@/components/extends/FormHelperText";

const campaignStatuses = [
  {
    name: "Not Started",
    value: "not-started",
  },
  { name: "Discovery", value: "discovery" },
  { name: "Value-proposition", value: "value-proposition" },
  { name: "PROPOSAL", value: "proposal" },
  { name: "NEGOTIATING", value: "negotiating" },
  { name: "CLOSED_WON", value: "closed-won" },
  { name: "CLOSED_LOST", value: "closed-lost" },
  { name: "ACCOUNT_PLAN", value: "account-plan" },
];

const CreateCampaign = ({
  close,
  click,
}: {
  close: () => void;
  click?: () => void;
}) => {
  const router = useRouter();
  const handelCreateCampaign = (campaign: BaseCampaignModel) => {
    runService(
      campaign,
      addCampaign,
      (data) => {
        if (click) {
          click();
        }
        close();
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  return (
    <>
      <Dialog
        open={true}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 bg-black/65 z-40" />
        <div className="fixed inset-0 py-10 overflow-y-auto z-40">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-xl bg-gray-100 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="px-6 py-3 flex justify-between items-center rounded-md text-lg font-semibold leading-6 bg-white text-gray-900"
              >
                <span>Create New Campaign</span>
                <div
                  className="p-1 rounded-md hover:bg-gray-100"
                  onClick={close}
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
              </DialogTitle>
              <Formik
                initialValues={{
                  title: "",
                  amount: 0,
                  description: "",
                  status: campaignStatuses[0],
                }}
                validationSchema={Yup.object().shape({
                  title: Yup.string().required("Title is required"),
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting }
                ) => {
                  setSubmitting(true);
                  handelCreateCampaign({
                    title: values.title,
                    description: values.description,
                    amount: values.amount,
                    status: values.status.value,
                  });
                  setSubmitting(false);
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="p-6 w-full flex flex-col gap-3 rounded-md bg-gray-100">
                      <label
                        htmlFor="description"
                        className="text-base text-center pb-12 text-gray-500 font-semibold"
                      >
                        Please fill out the fields below to create your new
                        campaign. Ensure that all information is accurate to
                        effectively communicate your campaign's goals and
                        attract potential supporters.
                      </label>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <label className="min-w-24 text-sm" htmlFor="title">
                            Title:
                          </label>
                          <input
                            id="title"
                            type="text"
                            className="input-primary"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        {touched.title && errors.title && (
                          <div className="pl-24">
                            <FormHelperText>{errors.title}</FormHelperText>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <label className="min-w-24 text-sm" htmlFor="amount">
                          Amount:
                        </label>
                        <input
                          id="amount"
                          type="number"
                          className="input-primary"
                          value={values.amount}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          className="min-w-24 text-sm"
                          htmlFor="description"
                        >
                          Description:
                        </label>
                        <input
                          id="description"
                          type="text"
                          className="input-primary"
                          value={values.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="min-w-24 text-sm" htmlFor="status">
                          Status:
                        </label>
                        <Select
                          data={campaignStatuses}
                          value={values.status}
                          onChange={(item) => {
                            if (item !== values.status) {
                              setFieldValue("status", item);
                            }
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-6">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full p-1 text-sm rounded-md text-white bg-blue-500 hover:bg-blue-400"
                        >
                          Save
                        </button>
                        <button
                          className="w-full p-0.5 text-sm rounded-md border-2 bg-white border-gray-300 hover:bg-gray-200"
                          onClick={close}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateCampaign;
