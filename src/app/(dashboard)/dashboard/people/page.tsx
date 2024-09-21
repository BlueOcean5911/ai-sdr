import { InfoIcon } from "lucide-react";

export default function Page() {
  return (
    <>
      <InfoIcon className="w-4 h-4" />
      <span className="text-sm">
        Recommendations are based on prospecting activity and success. As you
        use Apollo to source leads, update contact stages, and close deals, that
        data will help us refine and improve your recommendations.
      </span>
    </>
  );
}
