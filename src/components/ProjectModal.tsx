"use client";

import Image from "next/image";

import { IDataJSON } from "@/utils/interfaces";

interface IProjectModalProps {
  data: IDataJSON;
  onClose: () => void;
}

export default function ProjectModal({ data, onClose }: IProjectModalProps) {
  const alt = data.name_project?.trim() ? data.name_project : `${data.type_project} project image`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-darkBlue/40 p-4 dark:bg-liteLightBlue/40"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div onClick={(e) => e.stopPropagation()} className="max-w-full rounded-md bg-liteLightBlue p-2 shadow-lg dark:bg-darkBlue">
        <Image
          src={data.image_project}
          width={425}
          height={400}
          alt={alt}
          quality={85}
          sizes="(max-width: 640px) 90vw, 425px"
          className="h-auto w-full max-w-[425px]"
        />
        {data.name_project?.trim() && <p className="mt-3 text-center font-bold">{data.name_project}</p>}
      </div>
    </div>
  );
}
