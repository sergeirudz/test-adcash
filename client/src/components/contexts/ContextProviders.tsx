"use client";
// import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";

const ContextProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default ContextProviders;
