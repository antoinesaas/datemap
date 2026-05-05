import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "DateMap — Waitlist",
  description:
    "Discover real date spots near you. Join the DateMap waitlist for early access.",
  verification: {
    google: "VPULkEKHpUE0KhT_JHRU6qnOqvBD13vG_WyFn82wGgQ",
  },
  openGraph: {
    title: "DateMap — Waitlist",
    description: "Real places. Real experiences. Join the waitlist.",
  },
  icons: {
    icon: "/icon.png?v=3",
    apple: "/icon.png?v=3",
    shortcut: "/icon.png?v=3",
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
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
