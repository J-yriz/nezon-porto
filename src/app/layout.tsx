import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nezon Sakamuya",
  description: "Portofolio of Nezon Sakamuya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-liteLightBlue text-darkBlue dark:bg-darkBlue dark:text-liteLightBlue`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
