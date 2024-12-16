import OverviewLayout from "@/layouts/OverviewLayout";
import { Building2, Calendar, Info, LinkIcon, Phone } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import ContactInfoItem, {
  ContactStatus,
} from "@/components/contact/ContactItem";
import Tag from "@/components/ui/tag";
import { CompanyModel } from "@/services/companyService";

const CompanyOverview = ({
  show,
  company,
  handleClose,
}: {
  show: boolean;
  company?: CompanyModel;
  handleClose: () => void;
}) => {
  return (
    <OverviewLayout
      show={show}
      handleClose={handleClose}
      linkHref={`/companies/${company?.id}`}
      width="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3"
    >
      <section className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{company?.name}</h2>
          <div className="flex gap-2">
            {[
              {
                href: company?.website,
                icon: LinkIcon,
                label: "Company website",
              },
              {
                href: company?.linkedin,
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
          <Tag color="bg-blue-100 text-blue-800">{company?.industry}</Tag>
          <Tag color="bg-green-100 text-green-800">
            {company?.size} employees
          </Tag>
          <Tag color="bg-purple-100 text-purple-800">
            {company?.city}, {company?.state}
          </Tag>
        </div>
        <div className="flex items-start gap-3 mb-4">
          <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
          <p className="text-sm text-gray-700">{company?.description}</p>
        </div>
        <ContactInfoItem
          label="Company Phone"
          value={company?.phone || ""}
          status={(company?.phoneStatus as ContactStatus) || "noStatus"}
          icon={Phone}
          subIcon={Building2}
        />
        <div className="mt-4">
          <h3 className="font-medium text-sm mb-2">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {company?.keywords?.split(",").map((item: string, idx: number) => (
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
              value: company?.annualRevenue,
            },
            {
              icon: Calendar,
              label: "Founded",
              value: company?.yearFounded,
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">
                <span className="font-medium">{item.label}:</span> {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </OverviewLayout>
  );
};

export default CompanyOverview;
