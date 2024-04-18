import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { ExitModel } from "@/components/Models/ExitModel";
import { HeartsModel } from "@/components/Models/HeartsModel";
import { PracticeModal } from "@/components/Models/PracticeModel";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Word Wizard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ExitModel />
          <HeartsModel />
          <PracticeModal />
          {children}</body>
      </html>
    </ClerkProvider>
   
  );
}
