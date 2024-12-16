import OverviewLayout from "@/layouts/OverviewLayout";
import { LeadModelWithCompanyModel } from "@/services/leadService";
import LeadView from "./LeadView";

const LeadOverview = ({
  show,
  lead,
  handleClose,
}: {
  show: boolean;
  lead?: LeadModelWithCompanyModel;
  handleClose: () => void;
}) => {
  return (
    <OverviewLayout
      show={show}
      handleClose={handleClose}
      linkHref={`/leads/${lead?.id}`}
    >
      <LeadView lead={lead} />
    </OverviewLayout>
  );
};

export default LeadOverview;
