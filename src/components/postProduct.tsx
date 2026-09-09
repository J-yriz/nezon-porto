"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { IDataJSON } from "@/utils/interfaces";
import useProjects from "@/utils/useProjects";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectModal from "@/components/ProjectModal";

const PREVIEW_COUNT = 8;

export default function PostProduct() {
  const { data, loading, error } = useProjects();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataShowModal, setDataShowModal] = useState<IDataJSON | null>(null);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleShow = (data: IDataJSON) => {
    setDataShowModal(data);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const previewData = data.slice(0, PREVIEW_COUNT);

  return (
    <div id="postservices" className="mt-5 px-6 sm:px-10 lg:mt-24 xl:px-28">
      <p className="text-xl font-bold">SERVICES PROJECT</p>

      {loading && <p className="my-5 text-center opacity-70">Loading projects…</p>}
      {error && !loading && <p className="my-5 text-center text-red-500">Failed to load projects: {error}</p>}

      {!loading && !error && (
        <ProjectGrid
          items={previewData}
          onSelect={handleShow}
          overlay={
            data.length > PREVIEW_COUNT ? (
              <div className="absolute bottom-0 left-1/2 z-10 flex h-72 min-w-full -translate-x-1/2 transform items-center justify-center bg-gradient-to-t from-liteLightBlue from-50% to-darkBlue/0 dark:from-darkBlue">
                <Link href="/project" className="text-md rounded-lg bg-lightBlue px-5 py-3 font-semibold dark:bg-blueCus">
                  SEE MORE
                </Link>
              </div>
            ) : undefined
          }
        />
      )}

      {showModal && dataShowModal && <ProjectModal data={dataShowModal} onClose={handleClose} />}
    </div>
  );
}
