import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DATEMAP — Waitlist",
  description:
    "Discover real date spots near you. Join the DATEMAP waitlist for early access.",
  verification: {
    google: "VPULkEKHpUE0KhT_JHRU6qnOqvBD13vG_WyFn82wGgQ",
  },
  openGraph: {
    title: "DATEMAP — Waitlist",
    description: "Real places. Real experiences. Join the waitlist.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
