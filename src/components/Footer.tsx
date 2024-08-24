"use client";

import Link from "next/link";

import IconInstagram from "./icons/icons.instagram";
import IconYoutube from "./icons/icons.youtube";
import IconDisocrd from "./icons/icons.discord";

import useWindowWidth from "@/utils/windowWidth";

export default function Footer() {
  const windowWidth = useWindowWidth();

  return (
    windowWidth <= 1600 && (
      <footer className="w-full bg-lightBlue px-20 py-16 dark:bg-blueCus">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Nezon[SKMY]</p>
          <div className="flex gap-x-4">
            <Link href={"https://www.instagram.com/notnezon/"} target="_blank">
              <IconInstagram />
            </Link>
            <Link href={"https://www.youtube.com/channel/UCNlSN31zKSfnmjBgRirM6NA"} target="_blank">
              <IconYoutube />
            </Link>
          </div>
        </div>
        <hr className="my-2 border-t-2 border-darkBlue dark:border-liteLightBlue" />
        <div className="flex flex-wrap gap-x-10 gap-y-5">
          <div>
            <p className="text-xl font-bold">Contact Me</p>
            <div className="flex items-center space-x-2">
              <IconDisocrd />
              <p className="select-all">.nezon</p>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold">Order Me</p>
            <div className="flex items-center space-x-2">
              <IconDisocrd />
              <Link href={`https://discord.gg/WFNPWSEjFZ`} target="_blank" className="hover:underline">
                RAZNAR.ID
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold">Pages</p>
            <ul className="flex flex-col">
              <li>
                <Link href={"/"}>Home</Link>
              </li>
              <li>
                <Link href={"/project"}>Projects</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-2 border-t-2 border-darkBlue dark:border-liteLightBlue" />
        <div className="flex items-center justify-center md:justify-end">
          <p className="text-sm font-semibold">
            &copy; {new Date().getFullYear() !== 2024 ? "2024 - " : ""} {new Date().getFullYear()}{" "}
            <span className="hover:underline">
              <Link href={`https://github.com/J-yriz`} target="_blank">
                Jariz
              </Link>
            </span>
            . All rights reserved.
          </p>
        </div>
      </footer>
    )
  );
}
