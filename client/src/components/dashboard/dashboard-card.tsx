import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import RouterLink from "next/link";

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  logo: string;
  href: string;
  buttonLabel: string;
}

export interface DashboardCardProps {
  data: DashboardCard;
}

export function DashboardCard({ data }: DashboardCardProps): React.JSX.Element {
  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", height: "100%", py: 4 }}
    >
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography align="center" variant="subtitle1">
              {data.title}
            </Typography>

            <Typography align="center" variant="body1">
              {data.description}
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar src={data.logo} variant="square" />
          </Box>
        </Stack>
      </CardContent>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ alignItems: "center", p: 2 }}
      >
        {!!data.href ? (
          <Link passHref href={data.href} component={RouterLink}>
            <Button variant="contained">{data.buttonLabel}</Button>
          </Link>
        ) : (
          <Button variant="contained" disabled={true}>
            {data.buttonLabel}
          </Button>
        )}
      </Stack>
    </Card>
  );
}
