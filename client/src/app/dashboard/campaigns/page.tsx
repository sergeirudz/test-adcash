import type { JSX } from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { config } from "@/config";
import CampaignsTable from "@/components/dashboard/campaigns/list/CampaignsTable";

export const metadata = {
  title: `Campaigns | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="column" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4" component="h1">
            Campaigns
          </Typography>
        </Stack>
        <CampaignsTable />
      </Stack>
    </Stack>
  );
}
