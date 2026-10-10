import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Drums — More computer-use training on less hardware",
  description:
    "Drums builds computers that make it cheaper to train computer-use agents. Many training attempts share one running OS. Starting with macOS.",
  metadataBase: new URL("https://drums.run"),
  openGraph: {
    title: "Drums — More computer-use training on less hardware",
    description: "Virtual computers for training computer-use agents. Many training attempts share one running OS. Starting with macOS.",
    url: "https://drums.run",
    siteName: "Drums",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "More computer-use training on less hardware" }],
  },
  twitter: { card: "summary_large_image", title: "Drums — More computer-use training on less hardware", images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
