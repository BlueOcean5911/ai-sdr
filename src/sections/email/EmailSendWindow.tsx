import Select from "@/components/extends/Select/default";
import { addMailing, sendMailing } from "@/services/mailingService";
import { getUsers, UserModel } from "@/services/userService";
import { MAILING_STATE } from "@/types/enums";
import { handleError, runService } from "@/utils/service_utils";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmailGeneratorWindow from "./EmailGeneratorWindow";
import { LeadModel, LeadModelWithCompanyModel } from "@/services/leadService";

interface UserForSelect {
  name: string;
  email: string;
  id: string;
}

const EmailSendWindow = ({ close, lead }: { close?: () => void, lead: LeadModelWithCompanyModel }) => {
  const [owner, setOwner] = useState<UserForSelect>({
    name: "",
    email: "",
    id: "",
  });
  const [senderId, setSenderId] = useState("");
  const [sendLater, setSendLater] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [users, setUsers] = useState<UserForSelect[]>([]);
  const [isOpenEmailGeneratorWindow, setIsOpenEmailGeneratorWindow] =
    useState<boolean>(false);

  useEffect(() => {
    console.log(date);
  }, [date]);

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

  useEffect(() => {
    setSenderId(owner ? owner.id : "");
  }, [owner])

  const fetchUsers = () => {
    runService(
      {},
      getUsers,
      (resUsers) => {
        const users: UserForSelect[] = resUsers.map((resUser: UserModel) => {
          return {
            name: resUser.email,
            email: resUser.email,
            id: resUser.id,
          };
        });
        setUsers([...users]);
      },
      (status, error) => {
        handleError(status, error);
      }
    );
  };

  useEffect(() => {
    fetchUsers();
    setValues({
      from: "",
      to: lead.email ? lead.email : "",
      subject: "",
      message: "",
    });
  }, []);

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

  const handleSend = () => {
    if (checkErrors()) {
      runService(
        {
          subject: values.subject,
          message: values.message,
          leadId: lead.id,
          ownerId: owner.id,
          fromEmail: owner.name,
          toEmail: lead.email,
          scheduledAt: date,
          mailingStatus: sendLater
            ? MAILING_STATE.SCHEDULED
            : MAILING_STATE.DELIVERED,
        },
        addMailing,
        (data) => {
          if (!sendLater) {
            sendMailing(data.id);
          }
          toast.success("Email sent successfully");
        },
        (status, error) => {
          handleError(status, error);
        }
      );
    }
  };

  const handleSaveAsDraft = () => {
    runService(
      {
        leadId: lead.id,
        owner: owner,
        fromEma: lead.email,
        toEmail: owner.name,
        subject: values.subject,
        bodyText: values.message,
        scheduledAt: date,
        mailingStatus: MAILING_STATE.SCHEDULED,
      },
      addMailing,
      () => {},
      (status, error) => {
        handleError(status, error);
      }
    );
    toast.success("Email sent successfully");
  };

  return (
    <>
      <div className="z-20 flex flex-col fixed bottom-2 right-2 w-[500px] h-[80vh] shadow-[0px_4px_24px_rgba(0,0,0,0.3)] bg-white border-2 border-gray-100 rounded-md">
        <div className="px-4 py-2 flex justify-between items-center border-b-2 text-base">
          Send Email
          <XMarkIcon
            className="w-5 h-5 hover:stroke-gray-600 cursor-pointer"
            onClick={close}
          />
        </div>
        <div className="px-4 py-2 flex flex-1 flex-col gap-2">
          <div className="flex flex-col justify-between">
            <label className="min-w-20 text-xs">From</label>
            <Select data={users} onChange={(item) => setOwner(item)} />
          </div>

          <div className="flex flex-col justify-between">
            <label className="min-w-20 text-xs">To</label>
            <input
              className="input-primary"
              type="text"
              placeholder=""
              value={values.to}
              onChange={(e) => setValues({ ...values, to: e.target.value })}
            />
            {/* <Select
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
            /> */}
          </div>

          <div className="flex flex-col justify-between">
            <label className="min-w-20 text-xs">Subject*</label>
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
          <div className="flex space-x-2 justify-end">
            <button
              className="flex items-center px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={() => setIsOpenEmailGeneratorWindow(true)}
            >
              <PencilSquareIcon className="w-5 h-5 mr-2 stroke-white" />
              Write with AI
            </button>
            <button className="flex items-center px-4 py-1 text-sm font-medium border-2 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
              <ArrowPathIcon className="w-5 h-5 mr-2" />
              Rephrase
            </button>
            <button className="flex items-center px-4 py-1 text-sm font-medium border-2 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              Analyze
            </button>
          </div>
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
                <input
                  type="date"
                  name="sendDate"
                  id="sendDate"
                  defaultValue={new Date().toISOString().split("T")[0]} // Set default to today
                  value={date ? date : new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              className="w-full btn-secondary"
              onClick={close}
            >
              Close
            </button>
            <button
              className="w-full btn-primary"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {isOpenEmailGeneratorWindow && senderId && (
        <EmailGeneratorWindow
          senderId={senderId}
          lead={lead}
          onChange={(text: string, type: string) =>
            setValues({
              ...values,
              [type]: text,
            })
          }
          close={() => setIsOpenEmailGeneratorWindow(false)}
        />
      )}
    </>
  );
};

export default EmailSendWindow;
