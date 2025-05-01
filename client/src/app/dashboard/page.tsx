import * as React from "react";
import type { Metadata } from "next";
import Grid from "@mui/material/Unstable_Grid2";
import { config } from "@/config";
import Typography from "@mui/material/Typography";
import { DashboardCard } from "@/components/dashboard/dashboard-card";

export const metadata = {
  title: `Dashboard | ${config.site.name}`,
} satisfies Metadata;

const cards = [
  {
    id: "1",
    title: "Step 1:",
    description: "Get your campaign running",
    logo: "/assets/logo-dropbox.png",
    href: "/dashboard/create-campaign",
    buttonLabel: "Create a campaign",
  },
  {
    id: "2",
    title: "Step 2:",
    description: "Add funds to start your campaign",
    logo: "/assets/logo-dropbox.png",
    href: "#",
    buttonLabel: "Add funds",
  },
] satisfies DashboardCard[];

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Typography variant="h5" component="h1">
          Get started with Adcash:
        </Typography>
      </Grid>
      {cards.map((card) => (
        <Grid key={card.id} sm={4} xs={12}>
          <DashboardCard data={card} />
        </Grid>
      ))}
    </Grid>
  );
}
