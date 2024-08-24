"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { IDataJSON } from "@/utils/interfaces";
import useWindowWidth from "@/utils/windowWidth";

export default function Home() {
  const windowWidth = useWindowWidth();
  const [services, setServices] = useState<string[]>([]);
  const [dataShowModal, setDataShowModal] = useState<IDataJSON>();
  const [dataJson, setDataJson] = useState<IDataJSON[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(7);
  const [selected, setSelected] = useState<string>("all");

  useEffect(() => {
    const getListProject = async () => {
      const response = await fetch("/projects/project.files.json");
      const data: string[] = await response.json();
      setServices(data);
    };

    getListProject();
  }, [setServices]);

  useEffect(() => {
    const getData = async () => {
      const dataLoop: IDataJSON[] = [];
      for (const service of services) {
        const response = await fetch(`/projects/${service.toLowerCase()}.json`);
        const data: IDataJSON[] = await response.json();
        dataLoop.push(...data);
      }
      setDataJson(dataLoop);
    };

    getData();
  }, [services, setDataJson]);

  const handleShow = (data: IDataJSON) => {
    setDataShowModal(data);
    setShowModal(!showModal);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 7);
  };

  const dataFilter =
    selected !== "all"
      ? dataJson.filter((e) => {
          return e.type_project.toLowerCase() === selected;
        })
      : dataJson;

  return (
    <main>
      {windowWidth <= 1600 && (
        <>
          <div className="my-10 px-10 xl:px-28">
            <div className="flex justify-end">
              <div className="w-32">
                <select
                  onChange={(e) => {
                    const { value } = e.target;
                    setSelected(value);
                    value === 'all' && setVisibleCount(7);
                  }}
                  name="selProject"
                  id="selProject"
                  className="w-full rounded-md bg-lightBlue p-1 focus:outline-none dark:bg-blueCus"
                >
                  <option value="all" className="bg-gray-100 text-gray-900">
                    All Project
                  </option>
                  {services.map((project, i) => (
                    <option key={i} value={project} className="bg-gray-100 text-gray-900">
                      {project.charAt(0).toUpperCase() + project.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative my-5 columns-1 gap-3 px-1 sm:columns-2 lg:columns-3">
              {dataFilter.slice(0, visibleCount).map((data, i) => (
                <div key={i} className="mb-4 flex break-inside-avoid justify-center bg-lightBlue p-1 dark:bg-blueCus">
                  <button
                    onClick={() => {
                      handleShow(data);
                    }}
                  >
                    <Image
                      src={`${data.image_project}`}
                      width={625}
                      height={400}
                      alt="image"
                      quality={100}
                      property="true"
                      className="h-auto w-full"
                    />
                  </button>
                </div>
              ))}
              {visibleCount < dataFilter.length && (
                <div className="absolute bottom-0 left-1/2 z-10 flex h-72 min-w-full -translate-x-1/2 transform items-center justify-center bg-gradient-to-t from-liteLightBlue from-50% to-darkBlue/0 dark:from-darkBlue">
                  <button onClick={handleShowMore} className="text-md rounded-lg bg-lightBlue px-5 py-3 font-semibold dark:bg-blueCus">
                    SEE MORE
                  </button>
                </div>
              )}
            </div>
            {showModal && dataShowModal && (
              <div
                onClick={() => {
                  setShowModal(!showModal);
                }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-darkBlue/40 dark:bg-liteLightBlue/40"
              >
                <div onClick={(e) => e.stopPropagation()} className="rounded-md bg-liteLightBlue p-2 shadow-lg dark:bg-darkBlue">
                  <Image src={dataShowModal.image_project} width={425} height={400} alt="image" quality={100} property="true" />
                  {dataShowModal.name_project && <p className="mt-3 text-center font-bold">{dataShowModal.name_project}</p>}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {windowWidth > 1600 && (
        <>
          <div className="flex h-screen items-center justify-center">
            <p className="text-6xl font-bold">Please resize your window to less than 1600px</p>
          </div>
        </>
      )}
    </main>
  );
}
