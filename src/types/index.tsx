import { TaskModel } from "@/services/taskService";
import { DOCUMENT_TYPE } from "./enums";
import { CompanyModel } from "@/services/companyService";
import { LeadModel } from "@/services/leadService";

import AutomaticEmailIcon from "@/components/Icons/automaticemail.icon";
import ManualEmailIcon from "@/components/Icons/manualmail.icon";
import PhoneCallIcon from "@/components/Icons/phonecall.icon";
import LinkedinViewIcon from "@/components/Icons/linkedinview.icon";
import LinkedinMessageIcon from "@/components/Icons/linkedinmessage.icon";
import LinkedinInteractIcon from "@/components/Icons/linkedininteract.icon";
import LinkedinRequestIcon from "@/components/Icons/linkedinrequest.icon";
import ActionItemIcon from "@/components/Icons/actionitem.icon";

export type SelectDefaultType = Array<{
  id: number;
  name: string | number | null;
}>;

export interface LeadProps {
  id: string;
  name: string;
  companyName: string;
  currentLocation: string;
  phone: string;
  origin: string;
  title: string;
}

export interface CompanyProps {
  id: string;
  name: string;
  companyName: string;
  currentLocation: string;
  phone: string;
  origin: string;
  title: string;
}

export interface CadenceItemProps {}

export interface CadenceStepProps {}

export interface EmailItemProps {}

export interface EmailStepProps {}

export interface ContactItemProps {}

export interface ContactStepProps {}

export interface CreateLeadProps {
  open: boolean;
  lead?: LeadModel;
  handleClose: () => void;
}

export interface CreateTaskProps {
  open: boolean;
  task?: TaskModel;
  handleSave: () => void;
  handleClose: () => void;
}

export interface CreateCompanyProps {
  open: boolean;
  company?: CompanyModel;
  handleSave: () => void;
  handleClose: () => void;
}

export interface InviteUserProps {
  open: boolean;
  handleInvite: (email: string) => void;
  handleClose: () => void;
}

export interface ForgotPasswordProps {
  open: boolean;
  email?: string;
  handleSend: (email: string) => void;
  handleClose: () => void;
}

export interface CountModel {
  count?: number;
}

export interface SuccessModel {
  success: boolean;
}

export interface ApiSuccessResponse {
  data: SuccessModel;
}

export interface FetchProps {
  offset?: number;
  limit?: number;
}

export interface ApiCountResponse {
  data: CountModel; // The structure of the data returned from the API;
}

export enum DML_TYPE {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface TrainingDataMetrics {
  companySize?: string; // Optional
  industry?: string; // Optional
  keyPainPoints?: string; // Optional
  currentResponseRate?: number; // Optional
  currentConversionRate?: number; // Optional
  averageDealSize?: number | null; // Optional, can be null
  // dmlId?: string | null; // Optional, can be null
  // dmlAt: Date; // Required, using Date for datetime
  // dmlType: DML_TYPE; // Required, using the DML_TYPE enum
}

export interface TrainingDataMetrics {
  companySize?: string; // Optional
  industry?: string; // Optional
  keyPainPoints?: string; // Optional
  currentResponseRate?: number; // Optional
  currentConversionRate?: number; // Optional
  averageDealSize?: number | null; // Optional, can be null
}

export interface ApiResponseTrainingDataMetrics {
  data: TrainingDataMetrics;
}

export interface TrainingDocument {
  id: string;
  type: DOCUMENT_TYPE;
  fileName?: string;
  fileType?: string;
}

export interface ApiResponseTrainingDocument {
  data: TrainingDocument;
}

export interface ApiResponseTrainingDocuments {
  data: TrainingDocument[];
}

export interface RecipientInfo {
  companyDescription: string;
  companyIndustry: string;
  contactName: string;
  contactTitle: string;
}

export interface ProductInfo {
  productName: string;
  customerKeyPainPoints: string;
  valueProposition: string;
  callToAction: string;
  companyOverview: string;
  additionalContext: string;
}

export interface PersonalizedSettingModel {
  recipientInfo: RecipientInfo;
  productInfo: ProductInfo;
  senderId: string;
}

export interface GeneratedSubjectModel {
  id: string;
  text: string;
}

export interface GeneratedBodyModel {
  id: string;
  text: string;
}

export interface GeneratedEmailsModel {
  subjects: GeneratedSubjectModel[];
  bodies: GeneratedBodyModel[];
}

export interface CadenceStatistics {
  active: number;
  paused: number;
  bounced: number;
  finished: number;
  succeeded: number;
}

export const taskTypeIcons = {
    autoEmail: <AutomaticEmailIcon />,
    phoneCall: <PhoneCallIcon />,
    manualEmail: <ManualEmailIcon />,
    linkedinConnect: <LinkedinRequestIcon />,
    linkedinSendMessage: <LinkedinMessageIcon />,
    linkedinViewProfile: <LinkedinViewIcon />,
    linkedinInteractWithPost: <LinkedinInteractIcon />,
    actionItem: <ActionItemIcon />,
};

export type TaskType =
  | "autoEmail"
  | "phoneCall"
  | "manualEmail"
  | "linkedinConnect"
  | "linkedinSendMessage"
  | "linkedinViewProfile"
  | "linkedinInteractWithPost"
  | "actionItem";
