"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { IDataJSON } from "@/utils/interfaces";

interface IProjectGridProps {
  items: IDataJSON[];
  onSelect: (data: IDataJSON) => void;
  overlay?: ReactNode;
}

function getAlt(data: IDataJSON): string {
  if (data.name_project?.trim()) return data.name_project;
  return `${data.type_project} project image`;
}

export default function ProjectGrid({ items, onSelect, overlay }: IProjectGridProps) {
  return (
    <div className="relative my-5 columns-1 gap-3 px-1 sm:columns-2 lg:columns-3">
      {items.map((data, i) => (
        <div key={data.image_project || i} className="mb-4 flex break-inside-avoid justify-center bg-lightBlue p-1 dark:bg-blueCus">
          <button type="button" onClick={() => onSelect(data)} aria-label={`View ${getAlt(data)}`} className="w-full">
            <Image
              src={data.image_project}
              width={625}
              height={400}
              alt={getAlt(data)}
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full"
              loading={i < 3 ? "eager" : "lazy"}
            />
          </button>
        </div>
      ))}
      {overlay}
    </div>
  );
}
