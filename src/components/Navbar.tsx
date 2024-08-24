"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import useWindowWidth from "@/utils/windowWidth";

const navbarClick = {
  "/": {
    name: "home",
  },
  "/project ": {
    name: "projects",
  },
};

export default function Navbar() {
  const windowWidth = useWindowWidth();

  const [isOn, setIsOn] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [phoneNav, setPhoneNav] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phoneNav ? "hidden" : "auto";
  }, [phoneNav]);

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    const themeCookie = Cookies.get("theme");

    if (themeCookie === "dark") {
      setIsOn(true);
      html.classList.add("dark");
    } else {
      setIsOn(false);
      html.classList.remove("dark");
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const html = document.querySelector("html") as HTMLHtmlElement;
    if (isOn) {
      html.classList.add("dark");
      Cookies.set("theme", "dark", { expires: 30 });
    } else {
      html.classList.remove("dark");
      Cookies.set("theme", "light", { expires: 30 });
    }
  }, [isOn, initialized]);

  useEffect(() => {
    windowWidth <= 1600 && setPhoneNav(false);
  }, [windowWidth]);

  const themeHandler = () => {
    setIsOn(!isOn);
  };

  return (
    windowWidth <= 1600 && (
      <nav
        className={`sticky top-0 z-50 px-16 text-xl text-darkBlue transition-all dark:text-liteLightBlue ${
          scrolled ? "bg-lightBlue/90 py-5 backdrop-blur-sm dark:bg-blueCus/90" : "py-8"
        }`}
      >
        {windowWidth > 640 && (
          <div className="flex items-center justify-between">
            <ul className="flex items-center justify-center gap-x-5">
              {Object.entries(navbarClick).map(([path, { name }]) => (
                <li key={path} className="hover:text-gray-600 dark:hover:text-lightBlue">
                  <Link href={path}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
                </li>
              ))}
            </ul>
            {/* Button Theme */}
            <div className="flex items-center gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
              <button onClick={themeHandler} className="flex h-8 w-14 items-center rounded-full bg-darkBlue px-1 dark:bg-liteLightBlue">
                <div className={`block h-6 w-6 rounded-full bg-liteLightBlue transition-all dark:bg-darkBlue ${isOn ? "translate-x-6" : ""}`}></div>
              </button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </div>
          </div>
        )}
        {windowWidth <= 640 && (
          <div className={`flex justify-end`}>
            <button onClick={() => setPhoneNav(!phoneNav)} className="h-6 w-6">
              <hr className="my-2 border-t-2 border-darkBlue dark:border-liteLightBlue" />
              <hr className="my-2 border-t-2 border-darkBlue dark:border-liteLightBlue" />
              <hr className="my-2 border-t-2 border-darkBlue dark:border-liteLightBlue" />
            </button>
            {phoneNav && (
              <div className="absolute top-20 z-50 flex w-72 flex-wrap rounded-sm bg-lightBlue pb-2 dark:bg-blueCus">
                <ul className="ml-3 mt-3 flex w-32 flex-col space-y-2">
                  {Object.entries(navbarClick).map(([path, { name }]) => (
                    <li key={path} className="hover:text-gray-800 dark:hover:text-lightBlue">
                      <Link onClick={() => setPhoneNav(!phoneNav)} href={path}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Button Theme */}
                <div className="mt-4">
                  <div className="flex items-center gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      />
                    </svg>
                    <button onClick={themeHandler} className="flex h-8 w-14 items-center rounded-full bg-darkBlue px-1 dark:bg-liteLightBlue">
                      <div
                        className={`block h-6 w-6 rounded-full bg-liteLightBlue transition-all dark:bg-darkBlue ${isOn ? "translate-x-6" : ""}`}
                      ></div>
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    )
  );
}
