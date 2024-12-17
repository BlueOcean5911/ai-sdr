interface PlanCardProps {
  plan: {
    name: string;
    exportCredits: string;
    mobileCredits: string;
    monthly: { priceId: string; value: number };
    annually: { priceId: string; value: number };
  };
  billingPeriod: string;
  isSelected?: boolean;
  processing?: boolean;
  processingPlan?: string;
  onUpgrade: (plan: any) => void;
}

const PlanCard = ({
  plan,
  billingPeriod,
  isSelected = false,
  processing = false,
  processingPlan,
  onUpgrade,
}: PlanCardProps) => {
  const isProcessing = processingPlan === plan.name;

  return (
    <div className="h-full w-full p-4 md:p-6 mt-8 flex flex-col gap-4 md:gap-5 border rounded-3xl hover:-translate-y-4 shadow-lg bg-white border-2 hover:border-blue-500 text-gray-700">
      <div className="p-4 md:p-8 flex flex-col gap-2 justify-center items-center">
        <p className="text-base">{plan.name}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-4xl font-semibold text-gray-700">
            $
            {billingPeriod === "monthly"
              ? plan.monthly.value
              : plan.annually.value}
          </span>
        </div>
        {plan.name !== "Free" ? (
          <>
            <p className="text-sm text-gray-500">Per user, per month</p>
            <p className="text-sm text-gray-500">Billed {billingPeriod}</p>
          </>
        ) : (
          <>
            <div className="h-10"></div>
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-3 justify-center items-center text-sm md:text-base text-gray-00">
        <p className="text-center text-gray-800 text-sm">
          {plan.exportCredits}
        </p>
        <p className="text-center  text-gray-800 text-sm">
          {plan.mobileCredits}
        </p>
      </div>

      {isSelected ? (
        <button
          className="w-full bg-gray-200 text-white p-2 rounded-md"
          disabled
        >
          Current Plan
        </button>
      ) : (
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 transition-colors disabled:bg-blue-300"
          disabled={processing || isProcessing}
          onClick={() => onUpgrade(plan)}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-4 w-4 md:h-5 md:w-5"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing
            </span>
          ) : (
            "Upgrade Plan"
          )}
        </button>
      )}
    </div>
  );
};

export default PlanCard;
