import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Alumni_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Smart home",
  description: "Dashboard to monitor status",
};

const sans = Alumni_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.className}>
      <body>{children}</body>
    </html>
  );
}
