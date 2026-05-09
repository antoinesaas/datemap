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
  title: "DateMap — Liste d’attente",
  description:
    "Découvre de vrais lieux de rendez-vous près de chez toi. Inscris-toi sur la liste d’attente DateMap.",
  verification: {
    google: "VPULkEKHpUE0KhT_JHRU6qnOqvBD13vG_WyFn82wGgQ",
  },
  openGraph: {
    title: "DateMap — Liste d’attente",
    description: "De vrais endroits, de vraies expériences. Rejoins la liste d’attente.",
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
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
