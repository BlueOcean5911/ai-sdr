import Select from "@/components/extends/Select/default";
import { XCircleIcon } from "@heroicons/react/24/outline";
// import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { toast } from "react-toastify";

const EmailSendWindow = ({ close }: { close?: () => void }) => {
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
      <div className="z-20 flex flex-col fixed bottom-0 right-6 w-[500px] h-[80vh] shadow-lg bg-white border-2 border-gray-100 rounded-md">
        <div className="flex-center p-2 py-4 border-b-2 border-gray-200 justify-between">
          Send Email
          <XCircleIcon
            className="w-6 h-6 stroke-gray-400 hover:stroke-gray-500 ml-auto cursor-pointer"
            onClick={close}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 p-2">
          <label>From</label>
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
          <label>To</label>
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
          <div className="flex-center gap-2">
            <label>Subject*</label>
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
            <p className="text-red-500 text-xs">{errors.subject}</p>
          )}
          <div></div>
          <label>Message*</label>
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
          <div className="flex gap-4 relative">
            <Popover>
              <PopoverButton className="btn-secondary">
                Delivery Schedule
              </PopoverButton>
              <PopoverPanel
                transition
                anchor="bottom"
                className="z-20 divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
              >
                <div className="z-50 bg-white">
                  {/* <Calendar mode="single" selected={date} onSelect={setDate} /> */}
                </div>
              </PopoverPanel>
            </Popover>
            <Menu>
              <MenuButton className="btn-primary" onClick={handleSendNow}>
                Send Now
              </MenuButton>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSendWindow;
