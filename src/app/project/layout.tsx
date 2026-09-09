import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Nezon Sakamuya",
  description: "Pixel art and Minecraft build projects by Nezon Sakamuya.",
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
