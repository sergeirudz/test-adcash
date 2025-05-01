import classNames from "classnames";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdCash",
  description: "AdCash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicon.webp" sizes="32x32" />
        <meta name="theme-color" content="#ebff08" />

        <meta property="og:title" content="AdCash" />
        <meta name="twitter:title" content="AdCash" />

        <meta name="description" content="AdCash" />
        <meta property="og:description" content="AdCash" />
        <meta name="twitter:description" content="AdCash" />

        <meta
          property="og:image"
          content="https://adcash.com/wp-content/uploads/2024/11/fullHomepagePreview.png"
        />
        <meta
          name="twitter:image"
          content="https://adcash.com/wp-content/uploads/2024/11/fullHomepagePreview.png"
        />
      </head>
      <body
        className={classNames("antialiased", {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        {children}
      </body>
    </html>
  );
}
