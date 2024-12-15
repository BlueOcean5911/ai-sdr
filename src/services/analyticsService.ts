import { api } from "@/utils/api";

export interface SalesMarketingStatisticsProps {
  // Email
  totalEmails: number;
  emailDelivered: number;
  emailOpened: number;
  emailOpenedFromLastWeek: number;
  emailReplied: number;
  emailRepliedFromLastWeek: number;
  emailInterested: number;
  emailInterestedFromLastWeek: number;
  // Call
  totalCalls: number;
  callConnected: number;
  callConnectedFromLastWeek: number;
  callPositive: number;
  callPositiveFromLastWeek: number;
  callAverageDuration: number;
  callAverageDurationFromLastWeek: number;
}

export const initialStateSalesMarketingStatistics: SalesMarketingStatisticsProps =
  {
    // Email
    totalEmails: 0,
    emailDelivered: 0,
    emailOpened: 0,
    emailOpenedFromLastWeek: 0,
    emailReplied: 0,
    emailRepliedFromLastWeek: 0,
    emailInterested: 0,
    emailInterestedFromLastWeek: 0,
    // Call
    totalCalls: 0,
    callConnected: 0,
    callConnectedFromLastWeek: 0,
    callPositive: 0,
    callPositiveFromLastWeek: 0,
    callAverageDuration: 0,
    callAverageDurationFromLastWeek: 0,
  };

interface ApiSalesMarketingStatisticsResponse {
  data: SalesMarketingStatisticsProps;
}

export const getSalesMarketingStatistics =
  async (): Promise<ApiSalesMarketingStatisticsResponse> => {
    const response = await api.get(
      "/api/v1/analytics/sales-marketing-statistics"
    );
    console.log("analytics", response);
    return response;
  };
