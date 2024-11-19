export type BillingPeriod = "monthly" | "quarterly" | "annually";

interface BillingPeriodSelectorProps {
  selected: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
}

export const BillingPeriodSelector = ({
  selected,
  onChange,
}: BillingPeriodSelectorProps) => {
  const periods = [
    { id: "monthly", label: "Monthly", discount: 0 },
    { id: "quarterly", label: "Quarterly", discount: 10 },
    { id: "annually", label: "Annually", discount: 20 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="max-w-md mx-auto flex flex-col gap-3">
        <label className="text-lg font-medium text-gray-700">
          Select billing period
        </label>
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => onChange(period.id as BillingPeriod)}
              className={`flex-1 p-3 rounded-md border transition-colors ${
                selected === period.id
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="text-sm font-medium">{period.label}</div>
              {period.discount > 0 && (
                <div className="text-xs text-green-600">
                  Save {period.discount}%
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
