import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { config } from "@/config";
import CreateCampaignStepper from "@/components/dashboard/campaigns/create/CreateCampaignStepper";

export const metadata = {
  title: `Create Campaign | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="column" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4" component="h1">
            Create a new Advanced Campaign
          </Typography>
          <CreateCampaignStepper />
        </Stack>
      </Stack>
    </Stack>
  );
}
