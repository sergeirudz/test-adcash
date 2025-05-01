import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { config } from "@/config";

export const metadata = {
  title: `Campaigns | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="column" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4" component="h1">
            Campaigns
          </Typography>
        </Stack>
        <Typography variant="h4" component="h1">
          Filter here
        </Typography>
        <Typography variant="h4" component="h1">
          Table here
        </Typography>
      </Stack>
    </Stack>
  );
}
