"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import BillingPeriodSelector from "@/components/account/BillingPeriod";
import PlanCard from "@/components/account/PlanCard";
import UserCountSelector from "@/components/account/UserCountSelector";

import { createCheckOutSession } from "@/services/stripeService";
import { PLANS } from "@/data/plan.data";
import { useCredit } from "@/contexts/CreditContext";

const Page = () => {
  const [processing, setIsProcessing] = useState(false);
  const [processingPlan, setProcessingPlan] = useState<string>("");
  const [userCount, setUserCount] = useState(1);
  const [billingPeriod, setBillingPeriod] = useState<string>("monthly");

  const { isLoading, myPlan } = useCredit();

  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const handleUpgrade = async (plan: typeof PLANS.BASIC) => {
    try {
      setIsProcessing(true);
      setProcessingPlan(plan.name);

      const { sessionId, sessionUrl } = await createCheckOutSession({
        price:
          billingPeriod === "monthly"
            ? plan.monthly.priceId
            : plan.annually.priceId,
        quantity: userCount,
      });

      localStorage.setItem("stripeSessionId", sessionId);
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      setProcessingPlan("");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("Payment successful!");
    } else if (status === "canceled") {
      toast.error("Payment canceled.");
    }
  }, [status]);

  return (
    <div className="flex justify-center overflow-auto">
      <div className="max-w-6xl px-4 py-12 w-full flex flex-col justify-center text-center gap-2">
        <h1 className="text-4xl font-semibold">Upgrade Your Plan</h1>
        <h3 className="text-2xl font-semibold">
          Pricing for one-person startups to Fortune 500 enterprises.
        </h3>
        <BillingPeriodSelector
          period={billingPeriod}
          onChange={setBillingPeriod}
        />
        <UserCountSelector userCount={userCount} onChange={setUserCount} />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {Object.values(PLANS).map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              billingPeriod={billingPeriod}
              isSelected={plan.name === myPlan?.name}
              processing={processing}
              processingPlan={processingPlan}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
