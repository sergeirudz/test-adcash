import { getSiteURL } from "@/lib/get-site-url";
import { LogLevel } from "@/lib/logger";

export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
  server: { url: string | undefined };
  logLevel: keyof typeof LogLevel;
}

export const config: Config = {
  site: {
    name: "AdCash",
    description: "",
    themeColor: "#090a0b",
    url: getSiteURL(),
  },
  server: {
    url: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  logLevel:
    (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ??
    LogLevel.ALL,
};
