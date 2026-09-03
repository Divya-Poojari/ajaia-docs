import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajaia Docs",
  description: "A lightweight collaborative document workspace."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
