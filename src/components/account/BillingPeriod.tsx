import { classNames } from "@/utils";

interface BillingPeriodSelectorProps {
  period: string;
  onChange: (period: string) => void;
}

export const BillingPeriodSelector = ({
  period,
  onChange,
}: BillingPeriodSelectorProps) => {
  const periods = [
    { value: "annually", label: "Annually Billing", priceSuffix: "/year" },
    { value: "monthly", label: "Monthly Billing", priceSuffix: "/month" },
    // { value: "once", label: "One Time", priceSuffix: "" },
  ];

  return (
    <div className="p-6 flex justify-center bg-white rounded-lg">
      <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
        {periods.map((option) => (
          <button
            key={option.value}
            type="button"
            className={classNames(
              "relative px-6 py-2 text-sm rounded-full transition-all duration-200",
              option.value === period
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-300"
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
