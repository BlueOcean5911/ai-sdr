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
