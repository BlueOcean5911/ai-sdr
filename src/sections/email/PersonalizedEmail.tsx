import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { GeneratedEmailsModel, GeneratedSubjectModel } from "@/types";

const dummyEmails = {
  subjects: [
    { id: "subject1", text: "Elevate Your Sales Strategy with Aivio" },
    { id: "subject2", text: "Transform Your Sales Development with AI" },
  ],
  bodies: [
    {
      id: "body1",
      text: `Hello,

I hope this message finds you well! 

I wanted to introduce you to Aivio, our AI-powered sales development representative platform designed to streamline your sales process and boost productivity. With Aivio, you can leverage advanced AI technology to identify and engage potential leads more effectively, allowing your team to focus on closing deals rather than searching for prospects.

Key benefits of Aivio include:
- **Automated Lead Generation:** Save time by letting our AI identify high-quality leads tailored to your business.
- **Personalized Outreach:** Enhance your engagement with prospects through tailored messaging that resonates with their needs.
- **Real-Time Analytics:** Gain insights into your outreach efforts and optimize your strategy based on data-driven decisions.

I’d love to schedule a quick call to discuss how Aivio can transform your sales approach. Are you available for a brief chat this week?

Looking forward to your response!

Best regards,

[Your Name]  
[Your Position]  
Aivio  
[Your Phone Number]  
[Your Email Address]`,
    },
    {
      id: "body2",
      text: `Hello,

I hope you're having a great day!

I'm reaching out to share how Aivio, our AI-powered sales development representative platform, can revolutionize your sales efforts. In today’s competitive market, having the right tools is crucial for staying ahead, and Aivio provides exactly that.

With Aivio, you can:
- **Boost Efficiency:** Automate repetitive tasks and free up your team to focus on what they do best—selling!
- **Enhance Lead Quality:** Our AI analyzes data to ensure you’re targeting leads that are most likely to convert.
- **Track Performance:** Monitor your campaigns with real-time analytics to refine your approach continuously.

I would love the opportunity to discuss how Aivio can benefit your organization. Would you be open to a quick call this week?

Thank you for considering Aivio as your partner in sales development!

Best, 

[Your Name]  
[Your Position]  
Aivio  
[Your Phone Number]  
[Your Email Address]`,
    },
  ],
};

const PersonalizedEmail = ({
  isGenerating = true,
  generatedEmails,
  handleSubjectChange,
  handleBodyChange,
}: {
  isGenerating: boolean;
  generatedEmails: GeneratedEmailsModel;
  handleSubjectChange: (text: string) => void;
  handleBodyChange: (text: string) => void;
}) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBody, setSelectedBody] = useState("");

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
                          handleSubjectChange(subject.text);
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
                        handleBodyChange(body.text);
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
