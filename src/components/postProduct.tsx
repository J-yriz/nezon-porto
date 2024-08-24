import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { IDataJSON } from "@/utils/interfaces";

export default function PostProduct() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dataShowModal, setDataShowModal] = useState<IDataJSON>();
  const [services, setServices] = useState<string[]>([]);
  const [dataJson, setDataJson] = useState<IDataJSON[]>([]);

  useEffect(() => {
    const getServices = async () => {
      const response = await fetch("/projects/project.files.json");
      const data: string[] = await response.json();
      setServices(data);
    };

    getServices();
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

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleShow = (data: IDataJSON) => {
    setDataShowModal(data);
    setShowModal(!showModal);
  };

  return (
    <div id="postservices" className="mt-5 px-10 lg:mt-24 xl:px-28">
      <p className="text-xl font-bold">SERVICES PROJECT</p>
      <div className="px-1 relative my-5 columns-1 gap-3 sm:columns-2 lg:columns-3">
        {dataJson.map((data, i) => {
          if (i <= 7) {
            return (
              <div key={i} className="mb-4 flex break-inside-avoid justify-center bg-lightBlue p-1 dark:bg-blueCus">
                <button
                  onClick={() => {
                    handleShow(data);
                  }}
                >
                  <Image src={`${data.image_project}`} width={625} height={400} alt="image" quality={100} property="true" className="h-auto w-full" />
                </button>
              </div>
            );
          }
        })}
        {dataJson.length > 7 && (
          <div className="absolute bottom-0 left-1/2 z-10 flex h-72 min-w-full -translate-x-1/2 transform items-center justify-center bg-gradient-to-t from-liteLightBlue from-50% to-darkBlue/0 dark:from-darkBlue">
            <Link href={`/project`} className="text-md rounded-lg bg-lightBlue px-5 py-3 font-semibold dark:bg-blueCus">
              SEE MORE
            </Link>
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
  );
}
