import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";

import IconInstagram from "./icons/icons.instagram";
import IconYoutube from "./icons/icons.youtube";

const nameHeader = () => (
  <p className="font-outline-2-light dark:font-outline-2-dark mx-auto px-10 text-center text-6xl font-extrabold sm:text-8xl lg:px-0 xl:text-9xl">
    Nezon Sakamuya
  </p>
);

interface IHeaderProps {
  windowWidth: number;
}

interface IHomeData {
  about: [
    {
      title: string;
      body: { name: string; link: string }[] | string[];
    },
  ];
  exp: [
    {
      title: string;
      body: string | number;
    },
  ];
}

export default function Header({ windowWidth }: IHeaderProps) {
  const [dataAbout, setDataAbout] = useState<IHomeData>({} as IHomeData);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/home.json");
      const data: IHomeData = await response.json();
      setDataAbout(data);
    };

    getData();
  }, [setDataAbout]);

  return (
    <header className="mt-5 px-0 sm:mt-10 lg:px-10 xl:px-28">
      {nameHeader()}
      <div className="mx-auto mt-16 flex max-w-screen-2xl flex-col items-center lg:mt-24 lg:flex-row lg:justify-between">
        {windowWidth >= 1024 && (
          <div className="flex w-1/3 flex-col gap-y-10 text-start">
            {dataAbout.about &&
              dataAbout.about.map((x, i) => {
                if (x.title !== "social media") {
                  return (
                    <div key={i}>
                      <p className="text-sm font-semibold">{x.title.toUpperCase()}</p>
                      <p>{x.body.toString().replaceAll(",", "")}</p>
                    </div>
                  );
                } else {
                  return (
                    <div key={i}>
                      <p className="text-sm font-semibold">{x.title.toUpperCase()}</p>
                      <div className="flex items-center gap-x-2">
                        {(x.body as any).map((e: { name: string; link: string }, i: number) => {
                          return (
                            <Link key={i} href={`${e.link}`} target="_blank">
                              <div className="rounded-md bg-lightBlue p-1 dark:bg-blueCus">
                                {e.name.toLowerCase() === "instagram" ? <IconInstagram /> : <IconYoutube />}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        )}
        <div className="rounded-full border border-black bg-gradient-to-r from-cyan-200 to-blue-400 dark:border-liteLightBlue dark:from-cyan-500 dark:to-blue-700">
          <Image src={"/nezonProf.png"} alt="hero" width={300} height={300} quality={100} className="rounded-full p-1" />
        </div>
        <div className="my-10 w-full px-10 lg:mt-0 lg:w-1/3 lg:px-0">
          {windowWidth < 1024 && (
            <div className="flex flex-wrap justify-between gap-5 text-start">
              {dataAbout.about &&
                dataAbout.about.map((x, i) => {
                  if (x.title !== "social media") {
                    return (
                      <div key={i}>
                        <p className="text-sm font-semibold">{x.title.toUpperCase()}</p>
                        <p>{x.body.toString().replaceAll(",", "")}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div key={i}>
                        <p className="text-sm font-semibold">{x.title.toUpperCase()}</p>
                        <div className="flex items-center gap-x-2">
                          {(x.body as any).map((e: { name: string; link: string }, i: number) => {
                            return (
                              <Link key={i} href={`${e.link}`} target="_blank">
                                <div className="rounded-md bg-lightBlue p-1 dark:bg-blueCus">
                                  {e.name.toLowerCase() === "instagram" ? <IconInstagram /> : <IconYoutube />}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          )}
          <div className="mt-5 flex flex-wrap justify-between gap-10 text-start lg:mt-0 lg:flex-col lg:text-end">
            {dataAbout.exp &&
              dataAbout.exp.map((x, i) => {
                return (
                  <div key={i}>
                    <p className="text-sm font-semibold">{x.title.toUpperCase()}</p>
                    <p className="text-3xl font-light md:text-5xl">{x.body}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </header>
  );
}
