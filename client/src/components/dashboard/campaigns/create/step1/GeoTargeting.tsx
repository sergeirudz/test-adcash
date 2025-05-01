"use client";

import type { JSX } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";

export default function GeoTargeting(): JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader
          title="Geotargeting"
          subheader="Select which countries, regions or cities you want to target. You can also paste a list of country codes, each on a new line or separate them using commans or semicolons."
        />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: "sm" }}>
            Geotargeting here
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
