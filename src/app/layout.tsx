import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UCL NFT Claim",
  description: "Claiming page for UCL NFT",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
        <ThirdwebProvider>
          <Navbar />
          <main className="flex-grow container mx-auto px-6 py-12">
            {children}
          </main>
          <footer className="bg-zinc-900 text-neutral-500 text-sm text-center py-4">
            © {new Date().getFullYear()} UCL NFT Claim. All rights reserved.
          </footer>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
