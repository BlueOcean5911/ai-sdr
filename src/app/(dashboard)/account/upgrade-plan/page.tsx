"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { api } from "@/utils/api";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState({
    name: "Upgrade Plan",
    description: "Upgrade plan for more features",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    quantity: 12,
    price: 119,
  });

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await api.post(
      "/api/payments/create-stripe-session",
      item
    );
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result?.error) {
      alert(result.error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="p-4 flex flex-1 bg-gray-100 overflow-auto text-sm">
        <div className="flex flex-1 justify-center items-center gap-6 bg-gray-100">
          <div className="h-96 p-6 max-w-xs w-full flex flex-col gap-5 border rounded-md shadow-lg bg-white">
            <div className="p-10 flex flex-col gap-2 justify-center items-center">
              <p className="text-2xl">Free</p>
              <p className="text-4xl font-semibold">0$</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <p>10 Export Credits/Month</p>
              <p>5 Mobile Number Credits/Year</p>
            </div>
            <button className="bg-gray-200 text-white p-2 rounded-md" disabled>
              Selected
            </button>
          </div>
          <div className="h-96 p-6 max-w-xs w-full flex flex-col gap-5 border rounded-md shadow-lg bg-white">
            <div className="p-10 flex flex-col gap-2 justify-center items-center">
              <p className="text-2xl">Basic</p>
              <p className="text-4xl font-semibold">49$</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <p>1,000 Export Credits/Month</p>
              <p>75 Mobile Number Credits/Month</p>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              disabled={loading}
              onClick={createCheckOutSession}
            >
              Upgrade Plan
            </button>
          </div>
          <div className="h-96 p-6 max-w-xs w-full flex flex-col gap-5 border rounded-md shadow-lg bg-white">
            <div className="p-10 flex flex-col gap-2 justify-center items-center">
              <p className="text-2xl">Professional</p>
              <p className="text-4xl font-semibold">79$</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <p>2000 Export Credits/Year</p>
              <p>100 Mobile Number Credits/Year</p>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              disabled={loading}
              onClick={createCheckOutSession}
            >
              Upgrade Plan
            </button>
          </div>
          <div className="h-96 p-6 max-w-xs w-full flex flex-col gap-5 border rounded-md shadow-lg bg-white">
            <div className="p-10 flex flex-col gap-2 justify-center items-center">
              <p className="text-2xl">Organization</p>
              <p className="text-4xl font-semibold">119$</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <p>4000 Export Credits/Year</p>
              <p>200 Mobile Number Credits/Year</p>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              disabled={loading}
              onClick={createCheckOutSession}
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
