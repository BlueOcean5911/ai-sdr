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

export interface CreateModelProps {
  open: boolean;
  handleSave: () => void;
  handleClose: () => void;
}

export interface CountModel {
  count?: number;
}
