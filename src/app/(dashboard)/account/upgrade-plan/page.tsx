"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { PlanCard } from "@/components/account/PlanCard";
import { UserCountSelector } from "@/components/account/UserCountSelector";

import {
  BillingPeriod,
  BillingPeriodSelector,
} from "@/components/account/BillingPeriod";
import { PLANS } from "@/data/plan.data";

import {
  createCheckOutSession,
  verifyStripeSession,
} from "@/services/stripeService";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [processingPlan, setProcessingPlan] = useState<string>("");
  const [userCount, setUserCount] = useState(1);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const getPeriodMultiplier = (
    period: BillingPeriod,
    monthly: boolean = false
  ) => {
    const discounts = {
      monthly: { months: 1, discount: 0 },
      quarterly: { months: 3, discount: 0.1 },
      annually: { months: 12, discount: 0.2 },
    };
    const { months, discount } = discounts[period];
    if (monthly) return 1 - discount;
    return months * (1 - discount);
  };

  const calculatePrice = (basePrice: number) => {
    const periodMultiplier = getPeriodMultiplier(billingPeriod, true);
    return Math.round(basePrice * periodMultiplier);
  };

  const calculateTotalPrice = (basePrice: number) => {
    const periodMultiplier = getPeriodMultiplier(billingPeriod);
    return Math.round(basePrice * userCount * periodMultiplier);
  };

  const handleUpgrade = async (plan: typeof PLANS.BASIC) => {
    try {
      setLoading(true);
      setProcessingPlan(plan.name);

      const { sessionId, sessionUrl } = await createCheckOutSession({
        ...plan,
        price: calculateTotalPrice(plan.price),
        metadata: {
          userCount,
          billingPeriod,
          planType: plan.name,
        },
      });

      localStorage.setItem("stripeSessionId", sessionId);
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      setProcessingPlan("");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyStripeSession = async (sessionId: string) => {
    setLoading(true);
    const result = await verifyStripeSession(sessionId);
    setLoading(false);
    if (result) toast.success("Your plan upgraded successfully");
    else toast.error("Session id is not correct!");
    localStorage.removeItem("stripeSessionId");
    router.push("/account/upgrade-plan");
  };

  useEffect(() => {
    if (sessionId && sessionId === localStorage.getItem("stripeSessionId")) {
      handleVerifyStripeSession(sessionId);
    }
  }, [sessionId]);

  return (
    <div className="p-4 flex flex-1 flex-col bg-gray-100 overflow-auto">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        <UserCountSelector userCount={userCount} onChange={setUserCount} />
        <BillingPeriodSelector
          selected={billingPeriod}
          onChange={setBillingPeriod}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {Object.values(PLANS).map((plan) => (
            <PlanCard
              key={plan.name}
              plan={{
                ...plan,
                price: calculatePrice(plan.price),
              }}
              billingPeriod={billingPeriod}
              isSelected={plan.name === "Free"}
              loading={loading}
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
