"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";

import IconInstagram from "./icons/icons.instagram";
import IconYoutube from "./icons/icons.youtube";
import { IHomeData, isSocialLinks } from "@/utils/interfaces";

function SiteTitle() {
  return (
    <p className="font-outline-2-light dark:font-outline-2-dark mx-auto px-10 text-center text-6xl font-extrabold sm:text-8xl lg:px-0 xl:text-9xl">
      Nezon Sakamuya
    </p>
  );
}

function AboutItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title.toUpperCase()}</p>
      {children}
    </div>
  );
}

function AboutList({ data }: { data: IHomeData | null }) {
  if (!data?.about) return null;

  return (
    <>
      {data.about.map((item, i) => {
        if (isSocialLinks(item.body)) {
          return (
            <AboutItem key={`${item.title}-${i}`} title={item.title}>
              <div className="flex items-center gap-x-2">
                {item.body.map((e, j) => (
                  <Link key={`${e.name}-${j}`} href={e.link} target="_blank" rel="noopener noreferrer" aria-label={e.name}>
                    <span className="block rounded-md bg-lightBlue p-1 dark:bg-blueCus">
                      {e.name.toLowerCase() === "instagram" ? <IconInstagram /> : <IconYoutube />}
                    </span>
                  </Link>
                ))}
              </div>
            </AboutItem>
          );
        }

        return (
          <AboutItem key={`${item.title}-${i}`} title={item.title}>
            <p>{(item.body as string[]).join(" ")}</p>
          </AboutItem>
        );
      })}
    </>
  );
}

export default function Header() {
  const [dataAbout, setDataAbout] = useState<IHomeData | null>(null);

  useEffect(() => {
    let cancelled = false;

    const getData = async () => {
      try {
        const response = await fetch("/home.json");
        if (!response.ok) return;
        const data: IHomeData = await response.json();
        if (!cancelled) setDataAbout(data);
      } catch {
        // keep null -> list renders nothing, layout stays intact
      }
    };

    getData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="mt-5 px-0 sm:mt-10 lg:px-10 xl:px-28">
      <SiteTitle />
      <div className="mx-auto mt-16 flex max-w-screen-2xl flex-col items-center lg:mt-24 lg:flex-row lg:justify-between">
        {/* Desktop left column */}
        <div className="hidden w-1/3 flex-col gap-y-10 text-start lg:flex">
          <AboutList data={dataAbout} />
        </div>

        <div className="rounded-full border border-black bg-gradient-to-r from-cyan-200 to-blue-400 dark:border-liteLightBlue dark:from-cyan-500 dark:to-blue-700">
          <Image
            src="/nezonProf.png"
            alt="Nezon Sakamuya profile photo"
            width={300}
            height={300}
            quality={85}
            sizes="(max-width: 1024px) 300px, 300px"
            priority
            className="rounded-full p-1"
          />
        </div>

        <div className="my-10 w-full px-6 sm:px-10 lg:mt-0 lg:w-1/3 lg:px-0">
          {/* Mobile/tablet about */}
          <div className="flex flex-wrap justify-between gap-5 text-start lg:hidden">
            <AboutList data={dataAbout} />
          </div>

          <div className="mt-5 flex flex-wrap justify-between gap-10 text-start lg:mt-0 lg:flex-col lg:text-end">
            {dataAbout?.exp?.map((x, i) => (
              <div key={`${x.title}-${i}`}>
                <p className="text-sm font-semibold">{x.title.toUpperCase()}</p>
                <p className="text-3xl font-light md:text-5xl">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
