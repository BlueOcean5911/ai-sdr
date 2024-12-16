import { LeadModelWithCompanyModel } from "@/services/leadService";
import {
  Building2,
  Calendar,
  Info,
  Link,
  Mail,
  Phone,
  Smartphone,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import Tag from "@/components/ui/tag";
import ContactInfoItem, {
  ContactItem,
  ContactStatus,
} from "@/components/contact/ContactItem";

const LeadView: React.FC<{ lead?: LeadModelWithCompanyModel }> = ({
  lead = undefined,
}) => {
  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Info className="w-10 h-10 text-gray-400" />
        <p className="text-gray-400">No Lead Data</p>
      </div>
    );
  }
  const contactItems: ContactItem[] = [
    {
      label: "Email",
      value: lead.email || "",
      status: lead.emailStatus as ContactStatus,
      icon: Mail,
    },
    {
      label: "Work Email",
      value: lead.workEmail || "",
      status: lead.workEmailStatus as ContactStatus,
      icon: Mail,
    },
    {
      label: "Primary Phone",
      value: lead.primaryPhone || "",
      status: lead.primaryPhoneStatus as ContactStatus,
      icon: Phone,
    },
    {
      label: "Mobile Phone",
      value: lead.mobilePhone || "",
      status: lead.mobilePhoneStatus as ContactStatus,
      icon: Phone,
      subIcon: Smartphone,
    },
    {
      label: "Work Phone",
      value: lead.workPhone || "",
      status: lead.workPhoneStatus as ContactStatus,
      icon: Phone,
      subIcon: Building2,
    },
  ];

  return (
    <div className="flex flex-1 flex-col bg-white">
      <header className="px-6 py-3 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">
            {lead.firstName} {lead.lastName}
          </h1>
          <a
            href={lead.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            aria-label="LinkedIn profile"
          >
            <FaLinkedinIn className="w-5 h-5" />
          </a>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          {lead.title} at {lead.company?.name} • {lead.company?.city},{" "}
          {lead.company?.state} • {lead.company?.annualRevenue}
        </p>
      </header>
      <main className="p-6 grid gap-6 md:grid-cols-2">
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            {contactItems.map((item, index) => (
              <ContactInfoItem key={index} {...item} />
            ))}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Personal Notes</h2>
            <div className="space-y-4">
              {[lead.personalNote1, lead.personalNote2].map((note, index) => (
                <div key={index} className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Note {index + 1}:</p>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{lead.company?.name}</h2>
            <div className="flex gap-2">
              {[
                {
                  href: lead.company?.website,
                  icon: Link,
                  label: "Company website",
                },
                {
                  href: lead.company?.linkedin,
                  icon: FaLinkedinIn,
                  label: "Company LinkedIn",
                },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Tag color="bg-blue-100 text-blue-800">
              {lead.company?.industry}
            </Tag>
            <Tag color="bg-green-100 text-green-800">
              {lead.company?.size} employees
            </Tag>
            <Tag color="bg-purple-100 text-purple-800">
              {lead.company?.city}, {lead.company?.state}
            </Tag>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-700">{lead.company?.description}</p>
          </div>
          <ContactInfoItem
            label="Company Phone"
            value={lead.company?.phone || ""}
            status={(lead.company?.phoneStatus as ContactStatus) || "noStatus"}
            icon={Phone}
            subIcon={Building2}
          />
          <div className="mt-4">
            <h3 className="font-medium text-sm mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {lead.company?.keywords
                ?.split(",")
                .map((item: string, idx: number) => (
                  <Tag key={idx} color="bg-gray-100 text-gray-800">
                    {item.trim()}
                  </Tag>
                ))}
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {[
              {
                icon: Building2,
                label: "Annual revenue",
                value: lead.company?.annualRevenue,
              },
              {
                icon: Calendar,
                label: "Founded",
                value: lead.company?.yearFounded,
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">{item.label}:</span>{" "}
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LeadView;
