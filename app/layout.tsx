import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import CrispProvider from "@/components/providers/CrispProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grow Greener",
  description: "Which plants are best for your garden? Find out here!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={`relative ${inter.className}`}>
          <ToasterProvider />
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
