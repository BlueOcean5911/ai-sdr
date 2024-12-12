"use client";
import { useCredit } from "@/contexts/CreditContext";
import { useState, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";

interface MyPlan {
  name: string;
  interval: string;
  quantity: number;
  status: string;
  startDate: number;
  endDate: number;
}

export default function Profile() {
  const { myPlan, credits, handleUpdateCredits } = useCredit() as {
    myPlan: MyPlan | null;
    credits: any;
    handleUpdateCredits: any;
  };
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format date function
  const formatDate = (timestamp: number): string => {
    return timestamp ? new Date(timestamp * 1000).toLocaleDateString() : "N/A";
  };

  const increaseCredit = (type: "email" | "mobile") => {
    if (type === "email") {
      handleUpdateCredits({ emailReg: credits.emailReg + 1 });
    } else if (type === "mobile") {
      handleUpdateCredits({ mobileReg: credits.mobileReg + 1 });
    }
  };

  const decreaseCredit = (type: "email" | "mobile") => {
    if (type === "email" && credits.emailReg > 0) {
      handleUpdateCredits({ emailReg: credits.emailReg - 1 });
    } else if (type === "mobile" && credits.mobileReg > 0) {
      handleUpdateCredits({ mobileReg: credits.mobileReg - 1 });
    } else {
      toast.error(`You spent all your ${type} credits!`);
    }
  };

  const handleMouseDown = (
    type: "email" | "mobile",
    action: "increase" | "decrease"
  ) => {
    if (action === "increase") {
      increaseCredit(type);
      intervalRef.current = setInterval(() => increaseCredit(type), 200); // Adjust the interval time as needed
    } else {
      decreaseCredit(type);
      intervalRef.current = setInterval(() => decreaseCredit(type), 200); // Adjust the interval time as needed
    }
  };

  const handleMouseUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-4xl text-center mb-4">
          My Plan:{" "}
          <span className="font-semibold">{myPlan ? myPlan.name : "Free"}</span>
        </h1>
        {myPlan ? (
          <div className="flex flex-col gap-2 text-lg capitalize">
            <p className="flex justify-between">
              <span>Interval:</span> <span>{myPlan.interval}</span>
            </p>
            <p className="flex justify-between">
              <span>Users:</span> <span>{myPlan.quantity}</span>
            </p>
            <p className="flex justify-between">
              <span>Status:</span> <span>{myPlan.status}</span>
            </p>
            <p className="flex justify-between">
              <span>Start Date:</span>{" "}
              <span>{formatDate(myPlan.startDate)}</span>
            </p>
            <p className="flex justify-between">
              <span>End Date:</span> <span>{formatDate(myPlan.endDate)}</span>
            </p>
          </div>
        ) : (
          <p className="text-lg text-center">Loading plan details...</p>
        )}
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl mb-4">Credit Usage</h1>
        <div className="flex justify-between items-center mb-4">
          <span>Email Credit:</span>
          <div className="flex items-center">
            <button
              onMouseDown={() => handleMouseDown("email", "decrease")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="p-2 bg-red-500 text-white rounded-full"
            >
              <FaMinus />
            </button>
            <input
              type="number"
              value={credits ? credits.emailReg : 0}
              readOnly
              className="mx-2 w-16 text-center border rounded"
            />
            <button
              onMouseDown={() => handleMouseDown("email", "increase")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="p-2 bg-green-500 text-white rounded-full"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>Mobile Credit:</span>
          <div className="flex items-center">
            <button
              onMouseDown={() => handleMouseDown("mobile", "decrease")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="p-2 bg-red-500 text-white rounded-full"
            >
              <FaMinus />
            </button>
            <input
              type="number"
              value={credits ? credits.mobileReg : 0}
              readOnly
              className="mx-2 w-16 text-center border rounded"
            />
            <button
              onMouseDown={() => handleMouseDown("mobile", "increase")}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="p-2 bg-green-500 text-white rounded-full"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
