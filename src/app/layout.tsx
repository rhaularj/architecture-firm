import type { Metadata } from "next";
import { cormorant, dmSans, dmMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://titanpro.ca"),
  title: {
    default: "Phoenix Custom Millwork — Custom Millwork & Carpentry Services",
    template: "%s | Phoenix Custom Millwork",
  },
  description:
    "Professional construction and contracting services for residential and commercial clients in Mississauga and the GTA.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Phoenix Custom Millwork",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
