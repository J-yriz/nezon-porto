import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} bg-liteLightBlue text-darkBlue dark:bg-darkBlue dark:text-liteLightBlue`}>{children}</body>
    </html>
  );
}
