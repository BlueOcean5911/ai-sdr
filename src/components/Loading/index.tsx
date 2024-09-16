"use client";

import { MutatingDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <MutatingDots
        height="100"
        width="100"
        color="#4571B6"
        secondaryColor="#4571B6"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
