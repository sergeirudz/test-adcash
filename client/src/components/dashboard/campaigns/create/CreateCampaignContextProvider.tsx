"use client";
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren, Dispatch, SetStateAction } from "react";
import { CreativeType } from "@/components/dashboard/campaigns/create/step3/Creatives";

export interface AdCreative {
  url: string;
  title: string;
  description: string;
  creativeType: CreativeType["value"];
  creative: string[];
}

export interface CampaignData {
  id?: string;
  campaignName: string;
  deviceType: { type: string; selected: boolean }[];
  geoTargeting: { country: string; targeting: string }[];
  supplySources: { source: string; selected: boolean }[];
  userInterests: { interest: string; selected: boolean }[];
  websiteCategories: { category: string; selected: boolean }[];
  deviceOsTargeting: { os: string; version: string; selected: boolean }[];
  deviceBrowserVTargeting: { browser: string; selected: boolean }[];
  deviceLanguageTargeting: { language: string; selected: boolean }[];
  contentTargeting: {
    targeting: string;
    type: string;
    [key: string]: any;
  }[];
  trafficRestrictions: { source: string; allow: boolean }[];
  connectionType: { type: string; targeting: string }[];
  connectionOrganizationsIsp: { name: string; targeting: string }[];
  adCreatives: AdCreative[];
  weeklyDistribution: {
    247: boolean;
    time: { start: string; end: string; days: number[] };
  }[];
  budget: { type: string; daily: number; total: number }[];
  campaignScheduling: { start: string; end: string }[];
  zoneCapping: { zone: string; impressions: number }[];
  statusAfterValidation: boolean;
  capping: {
    type: string;
    amount: number;
    frequencyCapping: {
      limit: number;
      periodValue: number;
      periodType: string;
    };
    applyTo: { type: string; ips: string[] };
    bidding: any[];
  };
  active: boolean;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
}

interface CreateCampaignContextType {
  campaignData: CampaignData;
  setCampaignData: Dispatch<SetStateAction<CampaignData>>;
  reset: () => void;
}

const initialCampaignData: CampaignData = {
  campaignName: "",
  deviceType: [],
  geoTargeting: [],
  supplySources: [],
  userInterests: [],
  websiteCategories: [],
  deviceOsTargeting: [],
  deviceBrowserVTargeting: [],
  deviceLanguageTargeting: [],
  contentTargeting: [],
  trafficRestrictions: [],
  connectionType: [],
  connectionOrganizationsIsp: [],
  adCreatives: [],
  weeklyDistribution: [],
  budget: [],
  campaignScheduling: [],
  zoneCapping: [],
  statusAfterValidation: false,
  capping: {
    type: "",
    amount: 0,
    frequencyCapping: { limit: 0, periodValue: 0, periodType: "" },
    applyTo: { type: "", ips: [] },
    bidding: [],
  },
  active: false,
  startDate: "",
  endDate: "",
  createdAt: "",
};

const CreateCampaignContext = createContext<CreateCampaignContextType | null>(
  null,
);

const CreateCampaignContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [campaignData, setCampaignData] =
    useState<CampaignData>(initialCampaignData);

  function reset() {
    setCampaignData(initialCampaignData);
  }

  const contextValue = {
    campaignData,
    setCampaignData,
    reset,
  };

  return (
    <CreateCampaignContext.Provider value={contextValue}>
      {children}
    </CreateCampaignContext.Provider>
  );
};

function useCreateCampaign(): CreateCampaignContextType {
  const context = useContext(CreateCampaignContext);

  if (context === null) {
    throw new Error(
      "useCreateCampaign must be used within CreateCampaignContextProvider",
    );
  }

  return context;
}

export { useCreateCampaign };
export default CreateCampaignContextProvider;
