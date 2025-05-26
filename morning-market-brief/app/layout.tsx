import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "../components/ui/toaster";
import Head from "next/head";  // Import Head component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Financial Market Intelligence System",
  description: "Morning market brief for portfolio managers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
