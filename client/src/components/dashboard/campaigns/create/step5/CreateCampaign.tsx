"use client";

import { useCreateCampaignMutation } from "@/lib/redux/api/campaignsApi";
import { useCreateCampaign } from "@/components/dashboard/campaigns/create/CreateCampaignContextProvider";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateCampaign = () => {
  const { campaignData, setCampaignData, reset } = useCreateCampaign();
  const router = useRouter();

  const [createCampaign, createCampaignResponse] = useCreateCampaignMutation();

  useEffect(() => {
    if (createCampaignResponse.isSuccess) {
      reset();
      router.push("/dashboard/campaigns");
    }
  }, [createCampaignResponse]);

  function handleSubmit() {
    const currentDate = new Date().toISOString();

    setCampaignData((prevData) => ({
      ...prevData,
      createdAt: currentDate,
    }));

    setTimeout(() => {
      createCampaign({
        ...campaignData,
        createdAt: currentDate,
      });
    }, 0);
  }

  return (
    <Button onClick={handleSubmit} variant="text">
      Create Campaign
    </Button>
  );
};

export default CreateCampaign;
