"use client";

import { useState, useEffect, useMemo } from "react";

import { IDataJSON } from "@/utils/interfaces";
import useProjects from "@/utils/useProjects";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectModal from "@/components/ProjectModal";

const PAGE_SIZE = 7;

export default function ProjectPage() {
  const { data, services, loading, error } = useProjects();
  const [dataShowModal, setDataShowModal] = useState<IDataJSON | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [selected, setSelected] = useState<string>("all");

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

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + PAGE_SIZE);
  };

  const dataFilter = useMemo(() => {
    if (selected === "all") return data;
    return data.filter((e) => e.type_project.toLowerCase() === selected.toLowerCase());
  }, [data, selected]);

  const visibleData = dataFilter.slice(0, visibleCount);

  return (
    <main className="mx-auto w-full max-w-[1600px]">
      <div className="my-10 px-6 sm:px-10 xl:px-28">
        <div className="flex justify-end">
          <div className="w-32">
            <label htmlFor="selProject" className="sr-only">
              Filter projects
            </label>
            <select
              onChange={(e) => {
                const { value } = e.target;
                setSelected(value);
                setVisibleCount(PAGE_SIZE);
              }}
              value={selected}
              name="selProject"
              id="selProject"
              className="w-full rounded-md bg-lightBlue p-1 focus:outline-none dark:bg-blueCus"
            >
              <option value="all" className="bg-gray-100 text-gray-900">
                All Project
              </option>
              {services.map((project) => (
                <option key={project} value={project.toLowerCase()} className="bg-gray-100 text-gray-900">
                  {project.charAt(0).toUpperCase() + project.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p className="my-5 text-center opacity-70">Loading projects…</p>}
        {error && !loading && <p className="my-5 text-center text-red-500">Failed to load projects: {error}</p>}

        {!loading && !error && (
          <ProjectGrid
            items={visibleData}
            onSelect={handleShow}
            overlay={
              visibleCount < dataFilter.length ? (
                <div className="absolute bottom-0 left-1/2 z-10 flex h-72 min-w-full -translate-x-1/2 transform items-center justify-center bg-gradient-to-t from-liteLightBlue from-50% to-darkBlue/0 dark:from-darkBlue">
                  <button
                    type="button"
                    onClick={handleShowMore}
                    className="text-md rounded-lg bg-lightBlue px-5 py-3 font-semibold dark:bg-blueCus"
                  >
                    SEE MORE
                  </button>
                </div>
              ) : undefined
            }
          />
        )}

        {showModal && dataShowModal && <ProjectModal data={dataShowModal} onClose={handleClose} />}
      </div>
    </main>
  );
}
