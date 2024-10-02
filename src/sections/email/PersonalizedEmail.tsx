import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { GeneratedEmailsModel, GeneratedSubjectModel } from "@/types";

const dummyEmails = {
  subjects: [
    { id: "subject1", text: "FinAdvantage's Growth Journey" },
    { id: "subject2", text: "FinAdvantage's Growth Potential" },
  ],
  bodies: [
    {
      id: "body1",
      text: `Hi Poonam,

Congratulations on FinAdvantage's impressive growth! Your team's expansion in tech-powered finance solutions is commendable and speaks volumes about your dedication to innovation.

At 123, we specialize in optimizing finance processes, enabling businesses to scale effectively. Imagine having streamlined operations that enhance your bottom line, freeing up time for strategic initiatives.

I'd love to discuss how we can support your ongoing success. Are you available for a brief call this week?`,
    },
    {
      id: "body2",
      text: `Hi Poonam,
  
Congratulations on FinAdvantage's impressive growth! Your team's expansion in tech-powered finance solutions is commendable and speaks volumes about your dedication to innovation.

At 123, we specialize in optimizing finance processes, enabling businesses to scale effectively. Imagine having streamlined operations that enhance your bottom line, freeing up time for strategic initiatives.

I'd love to discuss how we can support your ongoing success. Are you available for a brief call this week?`,
    },
  ],
};

const PersonalizedEmail = ({
  isGenerating = true,
  generatedEmails,
  onChange,
}: {
  isGenerating: boolean;
  generatedEmails: GeneratedEmailsModel;
  onChange: (text: string, type: string) => void;
}) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBody, setSelectedBody] = useState("");

  generatedEmails = dummyEmails;

  return (
    <div className="w-full max-w-md bg-white rounded-lg overflow-hidden text-base flex flex-col">
      <div className="p-4 font-semibold">Personalization email</div>
      {isGenerating ? (
        <div className="generating"></div>
      ) : (
        <div className="flex-1 p-4 space-y-4 h-[400px] overflow-y-auto text-sm">
          <div>
            <h3 className="font-medium mb-2 text-xs">Choose subject line</h3>
            <div className="space-y-2">
              {generatedEmails.subjects.map(
                (subject: GeneratedSubjectModel) => (
                  <label
                    key={subject.id}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="subject"
                        id={subject.id}
                        value={subject.id}
                        checked={selectedSubject === subject.id}
                        onChange={() => {
                          setSelectedSubject(subject.id);
                          onChange(subject.text, "subject");
                        }}
                        className="mr-2"
                      />
                      <span>{subject.text}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <ThumbsUp size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <ThumbsDown size={16} />
                      </button>
                    </div>
                  </label>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-xs">Choose body</h3>
            <div className="space-y-2">
              {generatedEmails.bodies.map((body) => (
                <label
                  key={body.id}
                  className="flex items-start justify-between p-2 border rounded-md"
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="body"
                      id={body.id}
                      value={body.id}
                      checked={selectedBody === body.id}
                      onChange={() => {
                        setSelectedBody(body.id);
                        onChange(body.text, "message");
                      }}
                      className="mr-2 mt-1"
                    />
                    <span className="whitespace-pre-wrap">{body.text}</span>
                  </div>
                  <div className="flex space-x-2 ml-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <ThumbsUp size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <ThumbsDown size={16} />
                    </button>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedEmail;
