"use client";
import { useEffect, useState, useRef } from "react";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Delta } from "quill/core";
import Quill from "quill";

import { MAILING_STATE } from "@/types/enums";
import { getUsers, UserModel } from "@/services/userService";
import { addMailing, sendMailing } from "@/services/mailingService";
import { handleError, runService } from "@/utils/service_utils";
import { LeadModelWithCompanyModel } from "@/services/leadService";

import Select from "@/components/extends/Select/default";
import EmailGeneratorWindow from "./EmailGeneratorWindow";
import QuillEditor from "@/components/extends/Editor/QuillEditor";

import "quill/dist/quill.snow.css";
import { classNames } from "@/utils";
import Loading from "@/components/Loading";

interface UserForSelect {
  name: string;
  email: string;
  id: string;
}

const EmailSendWindow = ({
  close,
  lead,
  fromEmail,
  threadId,
  messageId,
  parentMailingId,
}: {
  close?: () => void;
  lead: LeadModelWithCompanyModel;
  fromEmail?: string;
  threadId?: string;
  messageId?: string;
  parentMailingId?: string;
}) => {
  const [sender, setSender] = useState<UserForSelect>({
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
  const [isSending, setIsSending] = useState(false);

  const quillRef = useRef<Quill | null>(null);

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
    sender: "",
  });

  useEffect(() => {
    setSenderId(sender ? sender.id : "");
  }, [sender]);

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
        if (fromEmail) {
          setSender(users.find((user) => user.email === fromEmail) ?? sender);
        }
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
    if (senderId === "") {
      newErrors = { ...newErrors, sender: "Sender is required" };
      isValid = false;
    }

    setErrors({ ...errors, ...newErrors });
    return isValid;
  };

  const checkSenderSelected = () => {
    let isValid = true;
    let newErrors = {};
    if (senderId === "") {
      newErrors = { ...newErrors, sender: "Sender is required" };
      isValid = false;
    }
    setErrors({ ...errors, ...newErrors });
    return isValid;
  };

  const handleSend = () => {
    if (checkErrors()) {
      setIsSending(true);
      runService(
        {
          subject: values.subject,
          message: values.message,
          leadId: lead.id,
          ownerId: sender.id,
          fromEmail: sender.email,
          toEmail: lead.email,
          scheduledAt: date,
          threadId: threadId,
          parentMessageId: messageId,
          state: sendLater ? MAILING_STATE.SCHEDULED : MAILING_STATE.DELIVERED,
        },
        addMailing,
        (data) => {
          console.log(data);
          runService(
            { id: data.id },
            sendMailing,
            (data) => {
              if (data.success) {
                toast.success("Email sent successfully");
                if (close) {
                  close();
                }
              }
              setIsSending(false);
            },
            (status, error) => {
              handleError(status, error);
            }
          );
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
        sender: sender,
        fromEma: lead.email,
        toEmail: sender.name,
        subject: values.subject,
        bodyText: values.message,
        scheduledAt: date,
        state: MAILING_STATE.SCHEDULED,
      },
      addMailing,
      () => {},
      (status, error) => {
        handleError(status, error);
      }
    );
    toast.success("Email sent successfully");
  };

  const handleBodyChange = (text: string) => {
    quillRef.current?.setContents(new Delta().insert(text));
  };

  return (
    <>
      <div
        className={
          "z-20  fixed bottom-2 right-2 w-[500px] h-[80vh] shadow-[0px_4px_24px_rgba(0,0,0,0.3)] bg-white border-2 border-gray-100 rounded-md"
        }
      >
        <div className="relative flex flex-col w-full h-full">
          {isSending && (
            <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full z-10 bg-gray-100 bg-opacity-50">
              <div>
                <Loading />
              </div>
            </div>
          )}
          <div className="px-4 py-2 flex justify-between items-center border-b-2 text-base">
            Send Email
            <XMarkIcon
              className="w-5 h-5 hover:stroke-gray-600 cursor-pointer"
              onClick={close}
            />
          </div>
          <div className="px-4 py-2 flex flex-1 flex-col gap-2 overflow-auto">
            <div className="flex flex-col justify-between">
              <label className="min-w-20 text-xs">From</label>
              {fromEmail ? (
                <span>{fromEmail}</span>
              ) : (
                <>
                  <Select
                    data={users}
                    onChange={(item) => {
                      setSender(item);
                      if (senderId && errors.sender !== "")
                        setErrors({ ...errors, sender: "" });
                    }}
                  />
                  {errors.sender.length > 0 && (
                    <p className="text-red-500 text-xs">{errors.sender}</p>
                  )}
                </>
              )}
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
              <p className="text-red-500 text-xs">{errors.subject}</p>
            )}
            <div className="flex space-x-2 justify-end">
              <button
                className="flex items-center px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                onClick={() => {
                  checkSenderSelected();
                  setIsOpenEmailGeneratorWindow(true);
                }}
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
            <div className="flex flex-1 flex-col overflow-auto">
              <label className="">Message*</label>
              <div className="flex flex-1 flex-col overflow-auto">
                <QuillEditor
                  ref={quillRef}
                  // defaultValue={new Delta().insert("Your message here\n")}
                  onTextChange={(delta) => {
                    const message = quillRef.current
                      ? quillRef.current.getSemanticHTML()
                      : "<p></p>";
                    setValues({ ...values, message: message });
                    if (message.length > 0) {
                      setErrors({ ...errors, message: "" });
                    }
                  }}
                />
              </div>
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
              <button className="w-full btn-secondary" onClick={close}>
                Close
              </button>
              <button className="w-full btn-primary" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpenEmailGeneratorWindow && senderId && (
        <EmailGeneratorWindow
          senderId={senderId}
          lead={lead}
          handleSubjectChange={(text: string) =>
            setValues({
              ...values,
              subject: text,
            })
          }
          handleBodyChange={handleBodyChange}
          close={() => setIsOpenEmailGeneratorWindow(false)}
        />
      )}
    </>
  );
};

export default EmailSendWindow;
