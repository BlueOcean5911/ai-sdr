import { EMAIL_STATUS } from "@/types/enums";

export const personaOptions = [
  { value: "CEO", label: "CEO" },
  { value: "Sales Manager", label: "Sales Manager" },
  { value: "Product Manager", label: "Product Manager" },
];

export const employeeOptions = [
  { value: "1-10", label: "1 - 10" },
  { value: "11-20", label: "11 - 20" },
  { value: "21-50", label: "21 - 50" },
  { value: "51-100", label: "51 - 100" },
  { value: "101-200", label: "101 - 200" },
  { value: "201-500", label: "201 - 500" },
  { value: "501-1000", label: "501 - 1000" },
  { value: "1001-2000", label: "1001 - 2000" },
  { value: "2001-5000", label: "2001 - 5000" },
  { value: "5001-10000", label: "5001 - 10000" },
  { value: "10001+", label: "10001+" },
];

export const ownedByOptions = [
  { value: "Current User", label: "Current User" },
  { value: "Nobody", label: "Nobody" },
  { value: "Anybody", label: "Anybody" },
  { value: "You", label: "You" },
];

export const fromUserOptions = [
  { value: "Current User", label: "Current User" },
  { value: "Nobody", label: "Nobody" },
  { value: "Anybody", label: "Anybody" },
  { value: "You", label: "You" },
];

export const priorityOptions = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export const stateOptions = [
  { value: "incomplete", label: "Incompleted" },
  { value: "skipped", label: "Skipped" },
  { value: "archived", label: "Archived" },
  { value: "complete", label: "Completed" },
];

export const cadenceStatusOptions = [
  { value: "Active", label: "Active" },
  { value: "Paused", label: "Paused" },
  { value: "Bounced/Spamblocked", label: "Bounced/Spamblocked" },
  { value: "Finished", label: "Finished" },
  { value: "Not Sent", label: "Not Sent" },
];

export const cadenceStepOptions = [
  { value: "1", label: "Step: 1" },
  { value: "2", label: "Step: 2" },
  { value: "3", label: "Step: 3" },
  { value: "4", label: "Step: 4" },
  { value: "5", label: "Step: 5" },
];

export const statusOptions = [
  { value: EMAIL_STATUS.VALID, label: "Verified" },
  { value: EMAIL_STATUS.QUESTIONABLE, label: "Questionable" },
  { value: EMAIL_STATUS.INVALID, label: "Invalid" },
  { value: EMAIL_STATUS.NO_STATUS, label: "No Status" },
];

export const statusOptions_2 = [
  { value: EMAIL_STATUS.VALID, name: "Verified" },
  { value: EMAIL_STATUS.QUESTIONABLE, name: "Questionable" },
  { value: EMAIL_STATUS.INVALID, name: "Invalid" },
  { value: EMAIL_STATUS.NO_STATUS, name: "No Status" },
];

export const leadStageOptions = [
  { value: "Cold", label: "Cold" },
  { value: "Approaching", label: "Approaching" },
  { value: "Replied", label: "Replied" },
  { value: "Interested", label: "Interested" },
  { value: "Not Interested", label: "Not Interested" },
  { value: "Unresponsive", label: "Unresponsive" },
  { value: "Do Not Contact", label: "Do Not Contact" },
  { value: "Bad Data", label: "Bad Data" },
  { value: "Changed Job", label: "Changed Job" },
  { value: "Open", label: "Open" },
  { value: "Open Deal", label: "Open Deal" },
  { value: "Unqualified", label: "Unqualified" },
];

export const companyStageOptions = [
  { value: "Cold", label: "Cold" },
  { value: "Current Client", label: "Current Client" },
  { value: "Active Opportunity", label: "Active Opportunity" },
  { value: "Dead Opportunity", label: "Dead Opportunity" },
  { value: "Do Not Prospect", label: "Do Not Prospect" },
  { value: "Subscriber", label: "Subscriber" },
  { value: "Marketing Qualified Lead", label: "Marketing Qualified Lead" },
  { value: "Sales Qualified Lead", label: "Sales Qualified Lead" },
  { value: "Evangelist", label: "Evangelist" },
  { value: "Other", label: "Other" },
];
