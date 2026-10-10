import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600"] });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Drums — More computer-use training on less hardware",
  description:
    "Drums is building infrastructure to run more independent computer-use training attempts on the same hardware. Starting with macOS.",
  metadataBase: new URL("https://drums.run"),
  openGraph: { title: "Drums", description: "More computer-use training on less hardware.", url: "https://drums.run" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
