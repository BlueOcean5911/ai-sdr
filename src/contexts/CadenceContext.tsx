import { CadenceModel } from "@/services/cadenceService";
import { SHARE_TYPE } from "@/types/enums";
import { createContext, useContext, useState, ReactNode } from "react";

const defaultCadence: CadenceModel = {
  id: "",
  ownerId: "",

  name: "",
  star: false,
  isActive: false,
  stepsCount: 0,
  shareType: SHARE_TYPE.VIEW_SHARED,

  activeCount: 0,
  pausedCount: 0,
  notSentCount: 0,
  bouncedCount: 0,
  finishedCount: 0,
  scheduledCount: 0,
  deliveredCount: 0,
  replyCount: 0,
  interestedCount: 0,
  optOutCount: 0,
};

interface CadenceModelForContext extends CadenceModel {}

interface CadenceContextType {
  cadence: CadenceModelForContext;
  setCadence: (cadence: CadenceModelForContext) => void;
}

export const CadenceContext = createContext<CadenceContextType | undefined>(
  undefined
);

export const CadenceContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cadence, setCadence] =
    useState<CadenceModelForContext>(defaultCadence);

  return (
    <CadenceContext.Provider value={{ cadence, setCadence }}>
      {children}
    </CadenceContext.Provider>
  );
};

export const useCadence = (): CadenceContextType => {
  const context = useContext(CadenceContext);
  if (context === undefined) {
    throw new Error("useCadence must be used within a CadenceContextProvider");
  }
  return context;
};
