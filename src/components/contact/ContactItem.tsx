import { AlertCircle, Check, HelpCircle, XCircle } from "lucide-react";

export type ContactStatus = "verified" | "questionable" | "invalid" | "noStatus";

export interface ContactItem {
  label: string;
  value: string;
  status: ContactStatus;
  icon: React.ElementType;
  subIcon?: React.ElementType;
}

const StatusIcon: React.FC<{ status: ContactStatus }> = ({ status }) => {
  switch (status) {
    case "verified":
      return <Check className="w-5 h-5 text-green-500" aria-label="Verified" />;
    case "questionable":
      return (
        <HelpCircle
          className="w-5 h-5 text-yellow-500"
          aria-label="Questionable"
        />
      );
    case "invalid":
      return (
        <AlertCircle className="w-5 h-5 text-red-500" aria-label="Invalid" />
      );
    default:
      return (
        <XCircle className="w-5 h-5 text-gray-500" aria-label="No status" />
      );
  }
};

const ContactInfoItem: React.FC<ContactItem> = ({
  label,
  value,
  status,
  icon: Icon,
  subIcon: SubIcon,
}) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <div className="flex items-center gap-3">
      <div className="relative">
        <Icon className="w-5 h-5 text-gray-400" />
        {SubIcon && (
          <SubIcon className="w-3 h-3 text-gray-400 absolute -bottom-1 -right-1" />
        )}
      </div>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
    <StatusIcon status={status} />
  </div>
);

export default ContactInfoItem;
