import Select from "@/components/extends/Select/default";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";

const EmailSendWindow = ({ close }: { close?: () => void }) => {
  const [sendLater, setSendLater] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [values, setValues] = useState({
    from: "",
    to: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    subject: "",
    message: "",
  });

  const checkErrors = () => {
    let isValid = true;
    let newErrors = {};
    if (values.subject.length === 0) {
      newErrors = { ...newErrors, subject: "Subject is required" };
      isValid = false;
    }
    if (values.message.length === 0) {
      newErrors = { ...newErrors, message: "Message is required" };
      isValid = false;
    }

    setErrors({ ...errors, ...newErrors });
    return isValid;
  };

  const handleSendNow = () => {
    if (checkErrors()) {
      toast.success("Email sent successfully");
    }
  };

  return (
    <>
      <div className="z-20 flex flex-col fixed bottom-2 right-14 w-[500px] h-[80vh] shadow-lg bg-white border-2 border-gray-100 rounded-md">
        <div className="px-4 py-2 flex justify-between items-center border-b-2">
          Send Email
          <XMarkIcon
            className="w-5 h-5 hover:stroke-gray-600 cursor-pointer"
            onClick={close}
          />
        </div>
        <div className="px-4 py-2 flex flex-1 flex-col gap-2 bg-gray-100">
          <div className="flex justify-between items-center gap-2">
            <label className="min-w-20">From</label>
            <Select
              data={[
                {
                  id: 10,
                  name: "russell.johnson.navy@gmail.com",
                  value: "russell.johnson.navy@gmail.com",
                },
                {
                  id: 20,
                  name: "niklausanton23@gmail.com",
                  value: "niklausanton23@gmail.com",
                },
              ]}
            />
          </div>

          <div className="flex justify-between items-center gap-2">
            <label className="min-w-20">To</label>
            <Select
              data={[
                {
                  id: 10,
                  name: "russell.johnson.navy@gmail.com",
                  value: "russell.johnson.navy@gmail.com",
                },
                {
                  id: 20,
                  name: "niklausanton23@gmail.com",
                  value: "niklausanton23@gmail.com",
                },
              ]}
            />
          </div>

          <div className="flex justify-between items-center gap-2">
            <label className="min-w-20">Subject*</label>
            <input
              className="input-primary"
              value={values.subject}
              onChange={(event) => {
                setValues({ ...values, subject: event.target.value });
                if (values.subject.length > 0) {
                  setErrors({ ...errors, subject: "" });
                }
              }}
            />
          </div>
          {errors.subject.length > 0 && (
            <p className="pl-24 text-red-500 text-xs">{errors.subject}</p>
          )}
          <div className="flex flex-1 flex-col gap-2">
            <label className="">Message*</label>
            <textarea
              className="input-primary"
              value={values.message}
              onChange={(event) => {
                setValues({ ...values, message: event.target.value });
                if (errors.message.length > 0) {
                  setErrors({ ...errors, message: "" });
                }
              }}
            />
            {errors.message.length > 0 && (
              <p className="text-red-500 text-xs">{errors.message}</p>
            )}
          </div>
          <div className="min-h-12 flex justify-between gap-2">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="sendLater"
                id="sendLater"
                className="focus:ring-0 cursor-pointer"
                onChange={(e) => setSendLater(e.target.checked)}
              />
              <label htmlFor="sendLater">Send Later</label>
            </div>
            {sendLater && (
              <div className="flex items-center gap-4">
                <label htmlFor="sendDate">Send Date:</label>
                <input type="date" name="sendDate" id="sendDate" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              className="w-full p-2 rounded-md bg-gray-300 hover:bg-gray-200"
              onClick={close}
            >
              Close
            </button>
            <button
              className="w-full p-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
              onClick={handleSendNow}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSendWindow;
