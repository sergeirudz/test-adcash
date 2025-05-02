"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'

import { createTheme } from "@/styles/theme/create-theme";

import EmotionCache from "./emotion-cache";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): React.JSX.Element {
  const theme = createTheme();

  return (
    <EmotionCache options={{ key: "mui" }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </EmotionCache>
  );
}
