import * as React from "react";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { paths } from "@/paths";
import { DynamicLogo } from "@/components/core/logo";
import Image from "next/image";

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: "flex", lg: "grid" },
        flexDirection: "column",
        gridTemplateColumns: "1fr 3fr",
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
          color: "var(--mui-palette-common-white)",
          display: { xs: "none", lg: "flex" },
          justifyContent: "flex-start",
          alignItems: "baseline",
          py: 12,
          px: 6,
        }}
      >
        <Stack spacing={6}>
          <Stack spacing={1}>
            <Image
              src="/images/adcash_logo_yellow_white.svg"
              alt="Adcash logo"
              width={220}
              height={33}
              style={{ display: "inline-block", marginLeft: "8px" }}
            />
          </Stack>
          <Stack direction="column" spacing={2}>
            <Typography textAlign="start" variant="h5">
              <span
                style={{
                  color: "#b0e0e6",
                }}
              >
                STAY AHEAD
              </span>{" "}
              OF THE GAME
            </Typography>{" "}
            <Typography textAlign="start" variant="h6">
              With the Adcash online advertising platform!
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ display: "flex", flex: "1 1 auto", flexDirection: "column" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flex: "1 1 auto",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: "450px", width: "100%" }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
