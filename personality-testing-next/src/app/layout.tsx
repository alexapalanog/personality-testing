import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./index.css"; // Relative path to your CSS works perfectly

const inter = Inter({ subsets: ["latin"], display: "swap", variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Committee Personality Test",
  description: "Find your perfect committee in CSS!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}