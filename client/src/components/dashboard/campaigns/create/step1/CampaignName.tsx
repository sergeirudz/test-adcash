"use client";

import type { JSX } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useCreateCampaign } from "@/components/dashboard/campaigns/create/CreateCampaignContextProvider";

export default function CampaignName(): JSX.Element {
  const { campaignData, setCampaignData } = useCreateCampaign();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCampaignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader
          title="General Information"
          subheader="Enter the name for your AdCash campaign."
        />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: "sm" }}>
            <FormControl fullWidth>
              <InputLabel>Campaign name</InputLabel>
              <OutlinedInput
                value={campaignData.campaignName}
                onChange={handleChange}
                label="My new campaign"
                name="campaignName"
                type="text"
              />
            </FormControl>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
