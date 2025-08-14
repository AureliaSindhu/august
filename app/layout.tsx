import type { Metadata } from "next";
import { IM_Fell_DW_Pica } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const imFellDW = IM_Fell_DW_Pica({
  variable: "--font-im-fell-dw",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "#myAugustMood",
  description: "a moodboard for my august, play august by Taylor Swift",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${imFellDW.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
