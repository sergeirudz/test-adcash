import type { Metadata } from "next";
import type { JSX } from "react";
import Grid from "@mui/material/Grid";
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

export default function Page(): JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          xs: 12,
        }}
      >
        <Typography variant="h5" component="h1">
          Get started with Adcash:
        </Typography>
      </Grid>
      {cards.map((card) => (
        <Grid
          key={card.id}
          size={{
            xs: 12,
            sm: 4,
          }}
        >
          <DashboardCard data={card} />
        </Grid>
      ))}
    </Grid>
  );
}
